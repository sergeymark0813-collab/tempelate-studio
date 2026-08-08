import type { FontId } from '../types';

export interface FontPairing {
  id: FontId;
  /** Shown in the editor dropdown. */
  label: string;
  /** Mood hint shown under the label. */
  note: string;
  /** Stack for headings. */
  heading: string;
  /** Stack for body copy. */
  body: string;
  /** Extra letter-spacing for large headings, e.g. `-0.02em`. */
  headingTracking: string;
  /**
   * Google Fonts `css2` family specs used by this pairing. Must mirror the
   * `<link>` in `index.html` — the exporter re-requests exactly these to inline
   * the faces into the PNG/JPG.
   */
  googleSpecs: string[];
}

const SANS_FALLBACK = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const SERIF_FALLBACK = 'Georgia, "Times New Roman", serif';

const INTER_SPEC = 'Inter:wght@300..800';
const MANROPE_SPEC = 'Manrope:wght@400..800';

/**
 * Every pairing here ships Cyrillic — templates are in Russian, so a font
 * without Cyrillic would silently fall back and the client would see no change.
 */
export const FONTS: FontPairing[] = [
  {
    id: 'inter',
    label: 'Inter',
    note: 'Нейтральный, универсальный',
    heading: `Inter, ${SANS_FALLBACK}`,
    body: `Inter, ${SANS_FALLBACK}`,
    headingTracking: '-0.022em',
    googleSpecs: [INTER_SPEC],
  },
  {
    id: 'manrope',
    label: 'Manrope',
    note: 'Дружелюбный гротеск',
    heading: `Manrope, ${SANS_FALLBACK}`,
    body: `Manrope, ${SANS_FALLBACK}`,
    headingTracking: '-0.02em',
    googleSpecs: [MANROPE_SPEC],
  },
  {
    id: 'golos',
    label: 'Golos Text',
    note: 'Современный, для рунета',
    heading: `"Golos Text", ${SANS_FALLBACK}`,
    body: `"Golos Text", ${SANS_FALLBACK}`,
    headingTracking: '-0.02em',
    googleSpecs: ['Golos Text:wght@400..800'],
  },
  {
    id: 'montserrat',
    label: 'Montserrat + Inter',
    note: 'Геометричный, уверенный',
    heading: `Montserrat, ${SANS_FALLBACK}`,
    body: `Inter, ${SANS_FALLBACK}`,
    headingTracking: '-0.025em',
    googleSpecs: ['Montserrat:wght@400..800', INTER_SPEC],
  },
  {
    id: 'rubik',
    label: 'Rubik',
    note: 'Мягкий, приветливый',
    heading: `Rubik, ${SANS_FALLBACK}`,
    body: `Rubik, ${SANS_FALLBACK}`,
    headingTracking: '-0.02em',
    googleSpecs: ['Rubik:wght@400..700'],
  },
  {
    id: 'unbounded',
    label: 'Unbounded + Inter',
    note: 'Дисплейный, технологичный',
    heading: `Unbounded, ${SANS_FALLBACK}`,
    body: `Inter, ${SANS_FALLBACK}`,
    headingTracking: '-0.04em',
    googleSpecs: ['Unbounded:wght@400..700', INTER_SPEC],
  },
  {
    id: 'playfair',
    label: 'Playfair + Inter',
    note: 'Премиальный, редакционный',
    heading: `"Playfair Display", ${SERIF_FALLBACK}`,
    body: `Inter, ${SANS_FALLBACK}`,
    headingTracking: '-0.015em',
    googleSpecs: ['Playfair Display:wght@400..800', INTER_SPEC],
  },
  {
    id: 'cormorant',
    label: 'Cormorant + Manrope',
    note: 'Элегантный, классический',
    heading: `"Cormorant Garamond", ${SERIF_FALLBACK}`,
    body: `Manrope, ${SANS_FALLBACK}`,
    headingTracking: '-0.005em',
    googleSpecs: ['Cormorant Garamond:wght@600;700', MANROPE_SPEC],
  },
  {
    id: 'oswald',
    label: 'Oswald + Inter',
    note: 'Плакатный, спортивный',
    heading: `Oswald, ${SANS_FALLBACK}`,
    body: `Inter, ${SANS_FALLBACK}`,
    headingTracking: '0.005em',
    googleSpecs: ['Oswald:wght@400..700', INTER_SPEC],
  },
  {
    id: 'mono',
    label: 'JetBrains Mono',
    note: 'Инженерный, брутальный',
    heading: `"JetBrains Mono", ui-monospace, monospace`,
    body: `Inter, ${SANS_FALLBACK}`,
    headingTracking: '-0.045em',
    googleSpecs: ['JetBrains Mono:wght@400..700', INTER_SPEC],
  },
];

export const getFont = (id: FontId): FontPairing => FONTS.find((f) => f.id === id) ?? FONTS[0];

/** The `<link>` URL that preloads every pairing — kept in sync with `FONTS`. */
export const googleFontsHref = (): string =>
  `https://fonts.googleapis.com/css2?${[...new Set(FONTS.flatMap((f) => f.googleSpecs))]
    .map((spec) => `family=${spec.replace(/ /g, '+')}`)
    .join('&')}&display=swap`;
