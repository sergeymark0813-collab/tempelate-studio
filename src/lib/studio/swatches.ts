import { hexToHsl, hslToHex } from '../color';

/* ===========================================================================
   The colour library offered in the editor.

   Generated rather than hand-listed: every hue is built from the same
   lightness/saturation curve, so any two swatches picked from the grid already
   sit in the same tonal system and read as harmonious together.
   =========================================================================== */

export interface SwatchRamp {
  id: string;
  label: string;
  hue: number;
  /** Light → dark. */
  shades: string[];
}

/**
 * Lightness and saturation per step. Saturation dips at the extremes because a
 * fully saturated near-white or near-black reads as neon rather than as a tint.
 */
const STEPS: { l: number; s: number }[] = [
  { l: 95, s: 0.5 },
  { l: 88, s: 0.72 },
  { l: 79, s: 0.86 },
  { l: 68, s: 0.96 },
  { l: 57, s: 1 },
  { l: 47, s: 1 },
  { l: 38, s: 0.94 },
  { l: 28, s: 0.84 },
  { l: 18, s: 0.7 },
];

const HUES: { id: string; label: string; hue: number; saturation: number }[] = [
  { id: 'red', label: 'Красный', hue: 2, saturation: 76 },
  { id: 'orange', label: 'Оранжевый', hue: 26, saturation: 82 },
  { id: 'amber', label: 'Янтарный', hue: 42, saturation: 84 },
  { id: 'lime', label: 'Лаймовый', hue: 82, saturation: 70 },
  { id: 'green', label: 'Зелёный', hue: 145, saturation: 60 },
  { id: 'emerald', label: 'Изумрудный', hue: 162, saturation: 62 },
  { id: 'teal', label: 'Бирюзовый', hue: 180, saturation: 62 },
  { id: 'cyan', label: 'Голубой', hue: 196, saturation: 74 },
  { id: 'blue', label: 'Синий', hue: 218, saturation: 78 },
  { id: 'indigo', label: 'Индиго', hue: 245, saturation: 70 },
  { id: 'violet', label: 'Фиолетовый', hue: 272, saturation: 66 },
  { id: 'pink', label: 'Розовый', hue: 330, saturation: 72 },
];

export const RAMPS: SwatchRamp[] = HUES.map(({ id, label, hue, saturation }) => ({
  id,
  label,
  hue,
  shades: STEPS.map((step) => hslToHex(hue, saturation * step.s, step.l)),
}));

/** Neutrals carry a trace of blue, which reads cleaner than a dead grey. */
export const NEUTRALS: string[] = [
  '#ffffff',
  ...STEPS.map((step) => hslToHex(220, 8 * step.s, step.l)),
  '#000000',
];

/* ------------------------------- harmonies ------------------------------- */

export interface Harmony {
  id: string;
  label: string;
  colors: string[];
}

/**
 * Colours that provably work with the one already chosen — the wheel relations
 * a designer would reach for, computed from the current hue.
 */
export function harmoniesFor(hex: string): Harmony[] {
  const { h, s, l } = hexToHsl(hex);
  const at = (offset: number, dl = 0) =>
    hslToHex((h + offset + 360) % 360, Math.max(12, s), Math.min(92, Math.max(12, l + dl)));

  return [
    { id: 'analogous', label: 'Аналоговая', colors: [at(-30), at(-15), hex, at(15), at(30)] },
    { id: 'complementary', label: 'Комплементарная', colors: [hex, at(180), at(180, 18), at(180, -18)] },
    { id: 'split', label: 'Расщеплённая', colors: [hex, at(150), at(210)] },
    { id: 'triad', label: 'Триада', colors: [hex, at(120), at(240)] },
    { id: 'shades', label: 'Оттенки', colors: [at(0, 26), at(0, 13), hex, at(0, -13), at(0, -26)] },
  ];
}

/* --------------------------------- parsing ------------------------------- */

/** Accepts `#abc`, `aabbcc`, `rgb(1 2 3)`, `hsl(200 50% 40%)`. Null if unusable. */
export function parseColorInput(raw: string): string | null {
  const value = raw.trim().toLowerCase();
  if (!value) return null;

  const hex = value.replace(/^#/, '');
  if (/^[0-9a-f]{3}$/.test(hex)) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  if (/^[0-9a-f]{6}$/.test(hex)) return `#${hex}`;

  const numbers = value.match(/-?\d+(\.\d+)?/g);
  if (!numbers) return null;

  if (value.startsWith('rgb') && numbers.length >= 3) {
    const [r, g, b] = numbers.slice(0, 3).map((n) => Math.min(255, Math.max(0, Number(n))));
    const part = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    return `#${part(r)}${part(g)}${part(b)}`;
  }

  if (value.startsWith('hsl') && numbers.length >= 3) {
    const [h, s, l] = numbers.slice(0, 3).map(Number);
    return hslToHex(h, s, l);
  }

  return null;
}
