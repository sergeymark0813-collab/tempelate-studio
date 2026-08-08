import type { Rng } from './rng';
import type { FontSpec, TypeStep } from './types';

/* ===========================================================================
   Type synthesis.

   A pairing is picked from families that carry Cyrillic, then the scale is
   *computed*: a modular ratio and a base size are rolled within ranges the
   style allows, and every step derives from them. Two projects in the same
   style therefore share a feel without sharing measurements.
   =========================================================================== */

const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const SERIF = 'Georgia, "Times New Roman", serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const font = (
  family: string,
  category: FontSpec['category'],
  weights: number[],
): FontSpec => ({
  family,
  category,
  weights,
  stack: `"${family}", ${category === 'serif' ? SERIF : category === 'mono' ? MONO : SANS}`,
});

/** Every family here ships Cyrillic — the studio writes in Russian. */
export const FAMILIES = {
  inter: font('Inter', 'sans', [400, 500, 600, 700, 800]),
  manrope: font('Manrope', 'sans', [400, 500, 600, 700, 800]),
  golos: font('Golos Text', 'sans', [400, 500, 600, 700, 800]),
  onest: font('Onest', 'sans', [400, 500, 600, 700, 800]),
  wix: font('Wix Madefor Display', 'sans', [400, 500, 600, 700, 800]),
  nunito: font('Nunito', 'sans', [400, 600, 700, 800]),
  raleway: font('Raleway', 'sans', [400, 500, 600, 700, 800]),
  rubik: font('Rubik', 'sans', [400, 500, 600, 700]),
  montserrat: font('Montserrat', 'sans', [400, 500, 600, 700, 800]),
  unbounded: font('Unbounded', 'display', [400, 500, 600, 700]),
  oswald: font('Oswald', 'display', [400, 500, 600, 700]),
  yeseva: font('Yeseva One', 'display', [400]),
  playfair: font('Playfair Display', 'serif', [400, 500, 600, 700, 800]),
  cormorant: font('Cormorant Garamond', 'serif', [500, 600, 700]),
  mono: font('JetBrains Mono', 'mono', [400, 500, 600, 700]),
} as const;

type FamilyId = keyof typeof FAMILIES;

interface Pairing {
  display: FamilyId;
  body: FamilyId;
  styles: string[];
  note: string;
}

const PAIRINGS: Pairing[] = [
  { display: 'unbounded', body: 'inter', styles: ['tech', 'bold', 'glass'], note: 'дисплейная геометрия против нейтрального гротеска' },
  { display: 'yeseva', body: 'golos', styles: ['premium', 'retro', 'editorial'], note: 'контрастная антиква и спокойный текстовый гротеск' },
  { display: 'playfair', body: 'inter', styles: ['premium', 'editorial'], note: 'классическая антиква с современным гротеском' },
  { display: 'cormorant', body: 'manrope', styles: ['premium', 'organic', 'editorial'], note: 'тонкая антиква и мягкий гротеск' },
  { display: 'oswald', body: 'inter', styles: ['bold', 'brutal', 'retro'], note: 'узкая плакатная гарнитура и нейтральный текст' },
  { display: 'montserrat', body: 'inter', styles: ['bold', 'tech', 'minimal'], note: 'геометрия в заголовках, читаемость в тексте' },
  { display: 'onest', body: 'onest', styles: ['minimal', 'tech', 'friendly'], note: 'одна современная гарнитура на всю иерархию' },
  { display: 'wix', body: 'inter', styles: ['minimal', 'friendly', 'tech'], note: 'дисплейная версия для крупного кегля и текстовая для мелкого' },
  { display: 'golos', body: 'golos', styles: ['minimal', 'friendly', 'editorial'], note: 'единая гарнитура, иерархия только на размере и весе' },
  { display: 'rubik', body: 'rubik', styles: ['friendly', 'retro'], note: 'мягкие скруглённые формы во всей иерархии' },
  { display: 'nunito', body: 'nunito', styles: ['friendly', 'organic'], note: 'округлый humanist для тёплой интонации' },
  { display: 'mono', body: 'inter', styles: ['brutal', 'tech'], note: 'моноширинные заголовки как инженерный акцент' },
  { display: 'raleway', body: 'inter', styles: ['minimal', 'premium'], note: 'изящный гротеск с высоким контрастом штриха' },
  { display: 'manrope', body: 'manrope', styles: ['minimal', 'tech', 'glass'], note: 'нейтральная база с широким диапазоном веса' },
];

/** Modular ratios, from a calm minor third to a dramatic golden section. */
const RATIOS: Record<string, number[]> = {
  minimal: [1.2, 1.25, 1.333],
  premium: [1.25, 1.333, 1.414],
  bold: [1.414, 1.5, 1.618],
  friendly: [1.2, 1.25, 1.333],
  tech: [1.25, 1.333, 1.414],
  editorial: [1.333, 1.414, 1.5],
  organic: [1.2, 1.25, 1.333],
  brutal: [1.5, 1.618, 1.618],
  retro: [1.333, 1.414, 1.5],
  glass: [1.25, 1.333, 1.414],
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export interface TypeInput {
  style: string;
  density: 'compact' | 'regular' | 'spacious';
  /** Small canvases (phones, cards) need a smaller base size. */
  canvasWidth: number;
}

export function buildTypography(rng: Rng, input: TypeInput) {
  const candidates = PAIRINGS.filter((pairing) => pairing.styles.includes(input.style));
  const pairing = candidates.length > 0 ? rng.pick(candidates) : rng.pick(PAIRINGS);

  const display = FAMILIES[pairing.display];
  const body = FAMILIES[pairing.body];

  const ratio = rng.pick(RATIOS[input.style] ?? RATIOS.minimal);
  const scaleForCanvas = input.canvasWidth < 500 ? 0.86 : input.canvasWidth < 900 ? 0.94 : 1;
  const baseSize = Math.round(
    (input.density === 'compact' ? rng.int(14, 15) : input.density === 'spacious' ? rng.int(17, 19) : rng.int(15, 17)) *
      scaleForCanvas,
  );

  const step = (power: number) => baseSize * ratio ** power;

  // Heavy display faces need less weight to read as bold; light ones need more.
  const displayWeight = display.weights.includes(800)
    ? rng.pick([700, 800])
    : display.weights[display.weights.length - 1];
  const headingTracking =
    display.category === 'serif' ? '-0.01em' : display.category === 'mono' ? '-0.04em' : `-0.0${rng.int(2, 4)}em`;
  const displayLh = clamp(1.16 - ratio * 0.06, 0.98, 1.12);

  const scale: TypeStep[] = [
    {
      id: 'display',
      label: 'Display',
      size: Math.round(clamp(step(5), 40, input.canvasWidth < 500 ? 44 : 112)),
      weight: displayWeight,
      lineHeight: displayLh,
      tracking: headingTracking,
      transform: 'none',
      role: 'display',
      usage: 'Главный заголовок первого экрана',
    },
    {
      id: 'h1',
      label: 'H1',
      size: Math.round(clamp(step(4), 30, input.canvasWidth < 500 ? 34 : 76)),
      weight: displayWeight,
      lineHeight: clamp(displayLh + 0.04, 1.02, 1.18),
      tracking: headingTracking,
      transform: 'none',
      role: 'display',
      usage: 'Заголовки секций',
    },
    {
      id: 'h2',
      label: 'H2',
      size: Math.round(clamp(step(3), 24, 52)),
      weight: displayWeight,
      lineHeight: 1.2,
      tracking: headingTracking,
      transform: 'none',
      role: 'display',
      usage: 'Подзаголовки и крупные карточки',
    },
    {
      id: 'h3',
      label: 'H3',
      size: Math.round(clamp(step(2), 18, 34)),
      weight: Math.max(600, displayWeight - 100),
      lineHeight: 1.28,
      tracking: '-0.01em',
      transform: 'none',
      role: 'display',
      usage: 'Заголовки карточек',
    },
    {
      id: 'lead',
      label: 'Lead',
      size: Math.round(clamp(step(1), 16, 26)),
      weight: 400,
      lineHeight: 1.5,
      tracking: '0',
      transform: 'none',
      role: 'body',
      usage: 'Вводный абзац под заголовком',
    },
    {
      id: 'body',
      label: 'Body',
      size: baseSize,
      weight: 400,
      lineHeight: input.density === 'compact' ? 1.5 : 1.65,
      tracking: '0',
      transform: 'none',
      role: 'body',
      usage: 'Основной текст',
    },
    {
      id: 'small',
      label: 'Small',
      size: Math.round(clamp(step(-0.8), 11, 16)),
      weight: 500,
      lineHeight: 1.45,
      tracking: '0',
      transform: 'none',
      role: 'body',
      usage: 'Подписи, метки, вспомогательные строки',
    },
    {
      id: 'overline',
      label: 'Overline',
      size: Math.round(clamp(step(-1.4), 10, 14)),
      weight: 600,
      lineHeight: 1.4,
      tracking: '0.16em',
      transform: 'uppercase',
      role: 'body',
      usage: 'Надзаголовки секций',
    },
  ];

  const rationale =
    display.family === body.family
      ? `${display.family}: ${pairing.note}. Модульная шкала ${ratio.toFixed(3)} от базовых ${baseSize}px.`
      : `${display.family} + ${body.family}: ${pairing.note}. Модульная шкала ${ratio.toFixed(3)} от базовых ${baseSize}px.`;

  return { display, body, ratio, baseSize, scale, rationale };
}

/** Google Fonts specs for the two families a project actually uses — for export. */
export function specsForFamilies(...families: string[]): string[] {
  const wanted = new Set(families);
  return STUDIO_FONT_SPECS.filter((spec) => wanted.has(spec.split(':')[0]));
}

/** `<link>` spec for every family the studio can use. */
export const STUDIO_FONT_SPECS = [
  'Inter:wght@300..800',
  'Manrope:wght@400..800',
  'Golos Text:wght@400..800',
  'Onest:wght@400..800',
  'Wix Madefor Display:wght@400..800',
  'Nunito:wght@400..800',
  'Raleway:wght@400..800',
  'Rubik:wght@400..700',
  'Montserrat:wght@400..800',
  'Unbounded:wght@400..700',
  'Oswald:wght@400..700',
  'Yeseva One',
  'Playfair Display:wght@400..800',
  'Cormorant Garamond:wght@600;700',
  'JetBrains Mono:wght@400..700',
];
