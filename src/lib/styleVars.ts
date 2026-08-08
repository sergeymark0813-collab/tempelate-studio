import type { CSSProperties } from 'react';
import type { ButtonShape, StyleConfig } from '../types';
import { alpha, isLight, mix, normalizeHex, readableOn, shift } from './color';
import { getFont } from './fonts';

/** Corner radius in px for each button shape. */
export const BUTTON_RADIUS: Record<ButtonShape, number> = {
  sharp: 0,
  soft: 10,
  rounded: 20,
  pill: 999,
};

export const BUTTON_SHAPES: { id: ButtonShape; label: string }[] = [
  { id: 'sharp', label: 'Прямые' },
  { id: 'soft', label: 'Мягкие' },
  { id: 'rounded', label: 'Скруглённые' },
  { id: 'pill', label: 'Капсула' },
];

/**
 * Turns the five client-picked colours into the full token set the templates
 * consume. Everything a template needs — surfaces, borders, muted text,
 * on-colour text, translucent tints — is derived here, so any palette the
 * client invents still produces a design that holds together.
 */
export function styleVars(config: StyleConfig): CSSProperties {
  const bg = normalizeHex(config.background);
  const text = normalizeHex(config.text);
  const primary = normalizeHex(config.primary);
  const secondary = normalizeHex(config.secondary);
  const button = normalizeHex(config.button);

  const dark = !isLight(bg);
  const font = getFont(config.font);

  // Surfaces step away from the background toward white on light themes and
  // toward white-overlay on dark ones, which mimics how real UIs layer.
  const lift = dark ? '#ffffff' : '#000000';
  const surface = mix(bg, lift, dark ? 0.06 : 0.035);
  const surfaceStrong = mix(bg, lift, dark ? 0.12 : 0.075);
  const inverse = mix(text, bg, dark ? 0.06 : 0.04);

  const cardRadius = Math.round(config.cardRadius);
  const btnRadius = BUTTON_RADIUS[config.buttonShape];

  return {
    '--tp-bg': bg,
    '--tp-text': text,
    '--tp-primary': primary,
    '--tp-secondary': secondary,
    '--tp-button': button,

    '--tp-surface': surface,
    '--tp-surface-2': surfaceStrong,
    '--tp-border': alpha(text, dark ? 0.16 : 0.13),
    '--tp-border-strong': alpha(text, dark ? 0.3 : 0.24),
    '--tp-muted': mix(bg, text, 0.6),
    '--tp-faint': mix(bg, text, 0.38),

    // Inverted band (dark strip on a light page and vice versa).
    '--tp-inverse': inverse,
    '--tp-on-inverse': bg,

    '--tp-on-primary': readableOn(primary),
    '--tp-on-secondary': readableOn(secondary),
    '--tp-on-button': readableOn(button),

    '--tp-primary-tint': mix(bg, primary, 0.14),
    '--tp-secondary-tint': mix(bg, secondary, 0.14),
    '--tp-button-tint': mix(bg, button, 0.14),
    '--tp-primary-08': alpha(primary, 0.08),
    '--tp-primary-15': alpha(primary, 0.15),
    '--tp-primary-30': alpha(primary, 0.3),
    '--tp-secondary-15': alpha(secondary, 0.15),
    '--tp-button-hover': shift(button, dark ? 0.12 : -0.1),

    '--tp-radius-card': `${cardRadius}px`,
    '--tp-radius-card-lg': `${Math.round(cardRadius * 1.4)}px`,
    '--tp-radius-card-sm': `${Math.round(cardRadius * 0.55)}px`,
    '--tp-radius-btn': `${btnRadius}px`,

    '--tp-font-head': font.heading,
    '--tp-font-body': font.body,
    '--tp-track-head': font.headingTracking,

    '--tp-shadow-sm': `0 1px 2px ${alpha(dark ? '#000000' : text, dark ? 0.4 : 0.06)}`,
    '--tp-shadow': `0 10px 30px -12px ${alpha(dark ? '#000000' : text, dark ? 0.6 : 0.16)}`,
    '--tp-shadow-lg': `0 30px 70px -30px ${alpha(dark ? '#000000' : text, dark ? 0.75 : 0.24)}`,
    '--tp-glow': `0 20px 60px -22px ${alpha(primary, dark ? 0.65 : 0.4)}`,

    backgroundColor: 'var(--tp-bg)',
    color: 'var(--tp-text)',
    fontFamily: 'var(--tp-font-body)',
  } as CSSProperties;
}
