import type { CSSProperties } from 'react';
import { alpha } from '../color';
import { buildPalette, type PaletteInput } from './palette';
import { buildTypography } from './typography';
import type { Rng } from './rng';
import type { DesignSystem } from './types';

/* ===========================================================================
   The design system.

   Spacing, radii, elevation, grid and motion are rolled inside ranges each
   style permits, then frozen into one object. Everything downstream — the
   renderer, the report, the CSS export — reads only from here, which is what
   keeps a generated design internally consistent.
   =========================================================================== */

const RADIUS_RANGE: Record<string, [number, number]> = {
  minimal: [0, 10],
  premium: [2, 14],
  bold: [0, 8],
  friendly: [16, 28],
  tech: [8, 18],
  editorial: [0, 4],
  organic: [14, 26],
  brutal: [0, 2],
  retro: [8, 20],
  glass: [14, 26],
};

const RADIUS_NAME = (md: number) =>
  md === 0 ? 'Прямые углы' : md <= 6 ? 'Малое скругление' : md <= 14 ? 'Умеренное скругление' : md <= 22 ? 'Крупное скругление' : 'Максимальное скругление';

const SURFACE_BY_STYLE: Record<string, (readonly [DesignSystem['surfaceStyle'], number])[]> = {
  minimal: [['flat', 3], ['outlined', 3]],
  premium: [['outlined', 3], ['elevated', 2], ['flat', 1]],
  bold: [['flat', 3], ['outlined', 2]],
  friendly: [['elevated', 3], ['flat', 2]],
  tech: [['outlined', 3], ['glass', 2], ['gradient', 1]],
  editorial: [['flat', 4], ['outlined', 1]],
  organic: [['flat', 3], ['elevated', 2]],
  brutal: [['outlined', 4], ['flat', 1]],
  retro: [['outlined', 3], ['flat', 2]],
  glass: [['glass', 4], ['gradient', 2]],
};

const ICON_BY_STYLE: Record<string, DesignSystem['iconStyle']> = {
  minimal: 'line',
  premium: 'line',
  bold: 'solid',
  friendly: 'solid',
  tech: 'duotone',
  editorial: 'line',
  organic: 'line',
  brutal: 'solid',
  retro: 'solid',
  glass: 'duotone',
};

export interface TokenInput extends PaletteInput {
  audience: string;
  motion: 'none' | 'subtle' | 'rich';
  canvasWidth: number;
}

function pickDensity(rng: Rng, audience: string, style: string): DesignSystem['space']['density'] {
  if (audience === 'pro' || audience === 'b2b') return rng.chance(0.7) ? 'compact' : 'regular';
  if (audience === 'premium') return rng.chance(0.75) ? 'spacious' : 'regular';
  if (style === 'minimal' || style === 'editorial') return rng.chance(0.6) ? 'spacious' : 'regular';
  if (style === 'brutal' || style === 'tech') return rng.chance(0.5) ? 'compact' : 'regular';
  return 'regular';
}

export function buildDesignSystem(rng: Rng, input: TokenInput): DesignSystem {
  const color = buildPalette(rng, input);
  const density = pickDensity(rng, input.audience, input.style);
  const type = buildTypography(rng, {
    style: input.style,
    density,
    canvasWidth: input.canvasWidth,
  });

  /* --- spacing -------------------------------------------------------- */
  const unit = rng.pick([4, 4, 6, 8]);
  const sectionBase = density === 'compact' ? rng.int(48, 72) : density === 'spacious' ? rng.int(104, 152) : rng.int(72, 104);
  const section = input.canvasWidth < 500 ? Math.round(sectionBase * 0.45) : sectionBase;

  /* --- radii ---------------------------------------------------------- */
  const [rMin, rMax] = RADIUS_RANGE[input.style] ?? [4, 16];
  const md = Math.round(rng.int(rMin, rMax) / 2) * 2;

  /* --- elevation ------------------------------------------------------ */
  const shadowFamily = rng.weighted(
    input.style === 'brutal'
      ? ([['hard', 4], ['none', 2]] as const)
      : input.style === 'tech' || input.style === 'glass'
        ? ([['glow', 3], ['soft', 3], ['none', 1]] as const)
        : input.style === 'minimal' || input.style === 'editorial'
          ? ([['none', 3], ['soft', 2]] as const)
          : ([['soft', 4], ['none', 1], ['glow', 1]] as const),
  );

  const shadowInk = color.scheme === 'dark' ? '#000000' : color.text;
  const shadow =
    shadowFamily === 'none'
      ? { family: 'Без теней — глубина через границы и фон', sm: 'none', md: 'none', lg: 'none', glow: 'none' }
      : shadowFamily === 'hard'
        ? {
            family: 'Жёсткая тень со смещением, без размытия',
            sm: `2px 2px 0 ${color.borderStrong}`,
            md: `5px 5px 0 ${color.borderStrong}`,
            lg: `10px 10px 0 ${color.borderStrong}`,
            glow: `5px 5px 0 ${color.primary}`,
          }
        : shadowFamily === 'glow'
          ? {
              family: 'Свечение акцентным цветом вместо чёрной тени',
              sm: `0 2px 10px -4px ${alpha(color.primary, 0.5)}`,
              md: `0 18px 40px -20px ${alpha(color.primary, 0.55)}`,
              lg: `0 40px 80px -35px ${alpha(color.primary, 0.6)}`,
              glow: `0 0 60px -12px ${alpha(color.accent, 0.65)}`,
            }
          : {
              family: 'Мягкая рассеянная тень большого радиуса',
              sm: `0 1px 2px ${alpha(shadowInk, 0.08)}`,
              md: `0 14px 34px -18px ${alpha(shadowInk, color.scheme === 'dark' ? 0.7 : 0.24)}`,
              lg: `0 40px 80px -40px ${alpha(shadowInk, color.scheme === 'dark' ? 0.85 : 0.32)}`,
              glow: `0 24px 60px -28px ${alpha(color.primary, 0.45)}`,
            };

  /* --- grid ----------------------------------------------------------- */
  const columns = input.canvasWidth < 500 ? 4 : input.canvasWidth < 900 ? 8 : rng.pick([12, 12, 16]);
  const maxWidth =
    input.canvasWidth >= 1200
      ? rng.pick([1120, 1200, 1240, 1320])
      : Math.round(input.canvasWidth * 0.88);
  const gutter = density === 'compact' ? rng.pick([16, 20]) : density === 'spacious' ? rng.pick([32, 40]) : rng.pick([24, 28]);

  /* --- motion --------------------------------------------------------- */
  const duration = input.motion === 'none' ? 120 : input.motion === 'rich' ? rng.int(420, 620) : rng.int(200, 320);
  const easing = rng.pick([
    'cubic-bezier(0.22, 1, 0.36, 1)',
    'cubic-bezier(0.16, 1, 0.3, 1)',
    'cubic-bezier(0.4, 0, 0.2, 1)',
  ]);

  return {
    color,
    type,
    space: {
      unit,
      steps: [1, 2, 3, 4, 6, 8, 12, 16].map((step) => step * unit),
      section,
      gutter,
      density,
    },
    radius: {
      family: RADIUS_NAME(md),
      sm: Math.round(md * 0.5),
      md,
      lg: Math.round(md * 1.6),
      xl: Math.round(md * 2.4),
      pill: 999,
    },
    shadow,
    grid: {
      columns,
      maxWidth,
      margin: input.canvasWidth < 500 ? 20 : rng.pick([40, 56, 72]),
      gutter,
      label: `${columns} колонок · ${gutter}px гаттер · контент до ${maxWidth}px`,
    },
    motion: {
      duration,
      easing,
      entrance:
        input.motion === 'none'
          ? 'Без появлений'
          : input.motion === 'rich'
            ? rng.pick(['Появление снизу со сдвигом 32px', 'Раскрытие по маске', 'Появление с масштабом 0.96 → 1'])
            : rng.pick(['Мягкое появление снизу на 12px', 'Плавное проявление прозрачности']),
      intensity: input.motion,
    },
    surfaceStyle: rng.weighted(SURFACE_BY_STYLE[input.style] ?? ([['flat', 1]] as const)),
    iconStyle: ICON_BY_STYLE[input.style] ?? 'line',
  };
}

/* ---------------------------------------------------------------------- */

/** CSS custom properties for the renderer and the CSS export. */
export function dsVars(ds: DesignSystem): CSSProperties {
  const { color, radius, shadow, space, type } = ds;

  return {
    '--ds-bg': color.bg,
    '--ds-surface': color.surface,
    '--ds-surface-2': color.surface2,
    '--ds-surface-3': color.surface3,
    '--ds-text': color.text,
    '--ds-text-muted': color.textMuted,
    '--ds-text-faint': color.textFaint,
    '--ds-primary': color.primary,
    '--ds-on-primary': color.onPrimary,
    '--ds-secondary': color.secondary,
    '--ds-accent': color.accent,
    '--ds-border': color.border,
    '--ds-border-strong': color.borderStrong,
    '--ds-success': color.success,
    '--ds-warning': color.warning,
    '--ds-danger': color.danger,
    '--ds-gradient': color.gradient,

    '--ds-font-display': type.display.stack,
    '--ds-font-body': type.body.stack,
    '--ds-size-body': `${type.scale.find((s) => s.id === 'body')?.size ?? 16}px`,

    '--ds-radius-sm': `${radius.sm}px`,
    '--ds-radius-md': `${radius.md}px`,
    '--ds-radius-lg': `${radius.lg}px`,
    '--ds-radius-xl': `${radius.xl}px`,
    '--ds-radius-pill': `${radius.pill}px`,

    '--ds-shadow-sm': shadow.sm,
    '--ds-shadow-md': shadow.md,
    '--ds-shadow-lg': shadow.lg,
    '--ds-shadow-glow': shadow.glow,

    '--ds-unit': `${space.unit}px`,
    '--ds-gutter': `${space.gutter}px`,
    '--ds-section': `${space.section}px`,

    '--ds-duration': `${ds.motion.duration}ms`,
    '--ds-easing': ds.motion.easing,
  } as CSSProperties;
}

/** `:root { … }` text for the export panel. */
export function cssExport(ds: DesignSystem): string {
  const vars = dsVars(ds) as unknown as Record<string, string>;
  const lines = Object.entries(vars)
    .filter(([key]) => key.startsWith('--'))
    .map(([key, value]) => `  ${key}: ${value};`);
  return `:root {\n${lines.join('\n')}\n}`;
}
