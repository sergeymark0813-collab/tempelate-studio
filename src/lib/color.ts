/**
 * Tiny colour toolkit. Everything works on `#rrggbb` strings so the values can
 * round-trip through `<input type="color">` without surprises.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const clamp = (n: number, min = 0, max = 255) => Math.min(max, Math.max(min, n));

/** Accepts `#abc`, `#aabbcc` (with or without `#`). Falls back to black. */
export function parseHex(hex: string): Rgb {
  let h = hex.trim().replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function toHex({ r, g, b }: Rgb): string {
  const part = (n: number) => clamp(Math.round(n)).toString(16).padStart(2, '0');
  return `#${part(r)}${part(g)}${part(b)}`;
}

/** Normalises any accepted input to `#rrggbb`. */
export const normalizeHex = (hex: string): string => toHex(parseHex(hex));

/** Linear blend: `t = 0` returns `a`, `t = 1` returns `b`. */
export function mix(a: string, b: string, t: number): string {
  const ca = parseHex(a);
  const cb = parseHex(b);
  return toHex({
    r: ca.r + (cb.r - ca.r) * t,
    g: ca.g + (cb.g - ca.g) * t,
    b: ca.b + (cb.b - ca.b) * t,
  });
}

/** `rgba()` string — used where we need translucency over an unknown backdrop. */
export function alpha(hex: string, a: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** WCAG relative luminance, 0 (black) → 1 (white). */
export function luminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export const isLight = (hex: string): boolean => luminance(hex) > 0.55;

/** WCAG contrast ratio between two colours (1 → identical, 21 → max). */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Picks near-black or near-white for text sitting on `bg`, whichever reads
 * better. Keeps buttons legible no matter what the client picks.
 */
export function readableOn(bg: string, dark = '#0a0d12', light = '#ffffff'): string {
  return contrast(bg, dark) >= contrast(bg, light) ? dark : light;
}

/** Nudges a colour toward white (positive) or black (negative). */
export function shift(hex: string, amount: number): string {
  return amount >= 0 ? mix(hex, '#ffffff', amount) : mix(hex, '#000000', -amount);
}

/**
 * HSL → `#rrggbb`. The AI generator reasons about palettes in HSL — hue shifts
 * and lightness steps are predictable there in a way they never are in hex.
 */
export function hslToHex(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360;
  const sat = Math.min(100, Math.max(0, s)) / 100;
  const lig = Math.min(100, Math.max(0, l)) / 100;

  const a = sat * Math.min(lig, 1 - lig);
  const channel = (n: number) => {
    const k = (n + hue / 30) % 12;
    return (lig - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255;
  };

  return toHex({ r: channel(0), g: channel(8), b: channel(4) });
}

/**
 * Walks a colour toward white or black (whichever direction the backdrop
 * allows) until it clears `target` contrast. A generated accent can be pretty
 * and still illegible; this is what keeps the output usable.
 */
export function ensureContrast(color: string, against: string, target = 4.5): string {
  const towards = isLight(against) ? '#000000' : '#ffffff';
  let result = color;

  for (let step = 0; step < 20 && contrast(result, against) < target; step += 1) {
    result = mix(result, towards, 0.06);
  }
  return result;
}
