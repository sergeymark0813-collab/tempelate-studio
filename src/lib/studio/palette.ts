import { alpha, contrast, ensureContrast, hslToHex, isLight, mix, readableOn } from '../color';
import type { Rng } from './rng';
import type { ColorTokens } from './types';

/* ===========================================================================
   Colour synthesis.

   Palettes are built, not chosen: a hue is decided, a harmony rule places the
   supporting hues around the wheel, and saturation/lightness curves come from
   the style and mood. Every result is then contrast-checked, so a palette can
   be unexpected without becoming unusable.
   =========================================================================== */

export const COLOR_HUES: Record<string, { hue: number; saturation?: number; label: string }> = {
  blue: { hue: 218, label: 'синий' },
  cyan: { hue: 184, label: 'бирюзовый' },
  green: { hue: 146, label: 'зелёный' },
  lime: { hue: 84, label: 'лаймовый' },
  gold: { hue: 44, saturation: 62, label: 'золотой' },
  orange: { hue: 26, label: 'оранжевый' },
  red: { hue: 4, label: 'красный' },
  pink: { hue: 336, label: 'розовый' },
  purple: { hue: 272, label: 'фиолетовый' },
  earth: { hue: 32, saturation: 30, label: 'земляной' },
  mono: { hue: 220, saturation: 5, label: 'монохромный' },
};

interface Harmony {
  id: string;
  label: string;
  /** Degrees from the base hue for [secondary, accent]. */
  offsets: [number, number];
}

const HARMONIES: Harmony[] = [
  { id: 'mono', label: 'Монохромная', offsets: [0, 0] },
  { id: 'analogous', label: 'Аналоговая', offsets: [30, -26] },
  { id: 'complementary', label: 'Комплементарная', offsets: [180, 24] },
  { id: 'split', label: 'Расщеплённая комплементарная', offsets: [156, 204] },
  { id: 'triad', label: 'Триада', offsets: [120, 240] },
  { id: 'tetrad', label: 'Тетрада', offsets: [90, 210] },
];

/** Saturation baseline per style, before mood adjustments. */
const STYLE_SATURATION: Record<string, number> = {
  minimal: 32,
  premium: 38,
  bold: 82,
  friendly: 70,
  tech: 74,
  editorial: 28,
  organic: 42,
  brutal: 88,
  retro: 58,
  glass: 66,
};

const MOOD_SATURATION: Record<string, number> = {
  calm: -12,
  energetic: 16,
  expensive: -10,
  warm: 6,
  strict: -12,
  playful: 14,
  futuristic: 10,
  cozy: -4,
  confident: 6,
  mysterious: -8,
};

/** Which harmonies suit which style — the composer still rolls within these. */
const STYLE_HARMONY: Record<string, string[]> = {
  minimal: ['mono', 'analogous'],
  premium: ['mono', 'analogous'],
  bold: ['complementary', 'split', 'triad'],
  friendly: ['analogous', 'triad', 'split'],
  tech: ['analogous', 'split', 'complementary'],
  editorial: ['mono', 'analogous'],
  organic: ['analogous', 'mono'],
  brutal: ['complementary', 'triad', 'tetrad'],
  retro: ['triad', 'split', 'tetrad'],
  glass: ['analogous', 'split'],
};

export interface PaletteInput {
  /** Hue ids the user picked, if any. */
  colorIds: string[];
  scheme: 'dark' | 'light';
  style: string;
  moods: string[];
}

export function buildPalette(rng: Rng, input: PaletteInput): ColorTokens {
  const named = input.colorIds
    .filter((id) => id !== 'auto' && COLOR_HUES[id])
    .map((id) => COLOR_HUES[id]);

  const base = named.length > 0 ? rng.pick(named) : null;
  const hue = base ? (base.hue + rng.int(-6, 6) + 360) % 360 : rng.int(0, 359);

  const styleSat = STYLE_SATURATION[input.style] ?? 55;
  const moodShift = input.moods.reduce((sum, mood) => sum + (MOOD_SATURATION[mood] ?? 0), 0);
  const saturation = Math.max(
    4,
    Math.min(96, (base?.saturation ?? styleSat) + moodShift + rng.int(-6, 6)),
  );

  // A second named colour becomes the supporting hue directly — the user asked
  // for it, so no harmony rule should overrule them.
  const secondNamed = named.length > 1 ? named.find((entry) => entry.hue !== base?.hue) : undefined;

  const allowed = STYLE_HARMONY[input.style] ?? ['analogous', 'split', 'complementary'];
  const harmony =
    saturation < 14
      ? HARMONIES[0]
      : (HARMONIES.find((entry) => entry.id === rng.pick(allowed)) ?? HARMONIES[1]);

  const hue2 = secondNamed ? secondNamed.hue : (hue + harmony.offsets[0] + rng.int(-8, 8) + 360) % 360;
  const hue3 = (hue + harmony.offsets[1] + rng.int(-10, 10) + 360) % 360;

  const dark = input.scheme === 'dark';

  /* --- surfaces ------------------------------------------------------- */
  const bgSat = Math.min(dark ? 18 : 24, saturation * (dark ? 0.22 : 0.3));
  const bg = dark
    ? hslToHex(hue, bgSat, rng.int(5, 9))
    : hslToHex(hue, bgSat, rng.int(96, 98));

  // Dark themes layer upward with light; light themes push cards to near-white
  // and let the page background carry the tint.
  const surface = dark ? hslToHex(hue, bgSat * 0.9, rng.int(11, 14)) : hslToHex(hue, bgSat * 0.35, 100);
  const surface2 = dark ? hslToHex(hue, bgSat * 0.8, 18) : hslToHex(hue, bgSat * 0.7, 93);
  const surface3 = dark ? hslToHex(hue, bgSat * 0.7, 24) : hslToHex(hue, bgSat * 0.8, 87);

  /* --- text ----------------------------------------------------------- */
  const text = dark ? hslToHex(hue, 12, rng.int(94, 97)) : hslToHex(hue, 26, rng.int(9, 14));
  const textMuted = mix(text, bg, dark ? 0.4 : 0.42);
  const textFaint = mix(text, bg, dark ? 0.62 : 0.62);

  /* --- brand ---------------------------------------------------------- */
  const primary = ensureContrast(
    hslToHex(hue, saturation, dark ? rng.int(56, 64) : rng.int(40, 48)),
    bg,
    4.5,
  );
  const secondary = ensureContrast(
    hslToHex(hue2, saturation * 0.92, dark ? 62 : 50),
    bg,
    3,
  );
  const accent = ensureContrast(
    hslToHex(hue3, Math.min(96, saturation * 1.06), dark ? 66 : 54),
    bg,
    3,
  );

  const gradient = rng.weighted([
    [`linear-gradient(135deg, ${primary}, ${accent})`, 3],
    [`linear-gradient(100deg, ${primary}, ${secondary})`, 3],
    [`linear-gradient(160deg, ${primary} 0%, ${secondary} 55%, ${accent} 100%)`, 2],
    [`radial-gradient(120% 120% at 0% 0%, ${accent}, ${primary})`, 2],
  ]);

  return {
    scheme: input.scheme,
    harmony: harmony.label,
    bg,
    surface,
    surface2,
    surface3,
    text,
    textMuted,
    textFaint,
    primary,
    onPrimary: readableOn(primary),
    secondary,
    accent,
    border: alpha(text, dark ? 0.14 : 0.12),
    borderStrong: alpha(text, dark ? 0.28 : 0.22),
    success: ensureContrast(hslToHex(148, 62, dark ? 58 : 38), bg, 3),
    warning: ensureContrast(hslToHex(38, 84, dark ? 62 : 44), bg, 3),
    danger: ensureContrast(hslToHex(357, 72, dark ? 62 : 46), bg, 3),
    gradient,
    hues: [hue, hue2, hue3],
  };
}

/** Contrast audit used by the report — same maths the tokens were built with. */
export function auditContrast(value: string, against: string) {
  const ratio = Math.round(contrast(value, against) * 100) / 100;
  if (ratio >= 7) return { ratio, grade: 'AAA', tone: 'good' as const, note: 'Читается в любом размере' };
  if (ratio >= 4.5) return { ratio, grade: 'AA', tone: 'good' as const, note: 'Годится для основного текста' };
  if (ratio >= 3) return { ratio, grade: 'AA Large', tone: 'warn' as const, note: 'Заголовки от 24px' };
  return { ratio, grade: 'Ниже нормы', tone: 'bad' as const, note: 'Только декоративное применение' };
}

export const isLightColor = isLight;
