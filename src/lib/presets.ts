import type { StyleConfig } from '../types';

/** The colour half of a `StyleConfig` — shape, font and radius stay untouched. */
export type PalettePreset = {
  id: string;
  label: string;
  colors: Pick<StyleConfig, 'primary' | 'secondary' | 'button' | 'background' | 'text'>;
};

/**
 * One-click colour schemes. They exist so a client who does not want to fiddle
 * with five colour pickers can still see the template in "their" colours.
 */
export const PALETTES: PalettePreset[] = [
  {
    id: 'indigo',
    label: 'Индиго',
    colors: {
      primary: '#4f46e5',
      secondary: '#06b6d4',
      button: '#4f46e5',
      background: '#ffffff',
      text: '#111827',
    },
  },
  {
    id: 'emerald',
    label: 'Изумруд',
    colors: {
      primary: '#0f766e',
      secondary: '#84cc16',
      button: '#0f766e',
      background: '#f7faf8',
      text: '#0f231f',
    },
  },
  {
    id: 'cobalt',
    label: 'Кобальт',
    colors: {
      primary: '#1d4ed8',
      secondary: '#38bdf8',
      button: '#1d4ed8',
      background: '#f4f7ff',
      text: '#0d1b3e',
    },
  },
  {
    id: 'terracotta',
    label: 'Терракота',
    colors: {
      primary: '#b4442b',
      secondary: '#e08a3c',
      button: '#b4442b',
      background: '#fdf7f1',
      text: '#2c1a12',
    },
  },
  {
    id: 'rose',
    label: 'Роза',
    colors: {
      primary: '#be185d',
      secondary: '#f472b6',
      button: '#be185d',
      background: '#fff7fa',
      text: '#2b0f1c',
    },
  },
  {
    id: 'sand',
    label: 'Песок',
    colors: {
      primary: '#8a6a3b',
      secondary: '#c2a878',
      button: '#3f3a32',
      background: '#faf6ee',
      text: '#2a2419',
    },
  },
  {
    id: 'mint',
    label: 'Мята',
    colors: {
      primary: '#10a37f',
      secondary: '#5eead4',
      button: '#0b7f63',
      background: '#f6fffb',
      text: '#08251d',
    },
  },
  {
    id: 'violet',
    label: 'Фиалка',
    colors: {
      primary: '#7c3aed',
      secondary: '#e879f9',
      button: '#7c3aed',
      background: '#faf7ff',
      text: '#1d1230',
    },
  },
  {
    id: 'graphite',
    label: 'Графит',
    colors: {
      primary: '#e5e7eb',
      secondary: '#9ca3af',
      button: '#f3f4f6',
      background: '#16181d',
      text: '#f3f4f6',
    },
  },
  {
    id: 'midnight',
    label: 'Полночь',
    colors: {
      primary: '#818cf8',
      secondary: '#22d3ee',
      button: '#6366f1',
      background: '#0b1020',
      text: '#e8ecf8',
    },
  },
  {
    id: 'neon',
    label: 'Неон',
    colors: {
      primary: '#a3e635',
      secondary: '#22d3ee',
      button: '#a3e635',
      background: '#0a0f0a',
      text: '#eafbe0',
    },
  },
  {
    id: 'gold',
    label: 'Золото',
    colors: {
      primary: '#d4af37',
      secondary: '#b08d57',
      button: '#d4af37',
      background: '#121110',
      text: '#f5efe2',
    },
  },
];
