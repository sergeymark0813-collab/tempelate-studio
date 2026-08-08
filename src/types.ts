import type { ComponentType } from 'react';

/** Shape of every interactive element (buttons, inputs, pills). */
export type ButtonShape = 'sharp' | 'soft' | 'rounded' | 'pill';

/** Id of an entry in `FONTS` (see `src/lib/fonts.ts`). */
export type FontId = string;

/**
 * The complete set of style choices a client can make.
 * This is the only thing the editor mutates — template markup never changes.
 */
export interface StyleConfig {
  /** Brand colour: headings accents, icons, highlights. */
  primary: string;
  /** Supporting colour: gradients, secondary accents, decorative shapes. */
  secondary: string;
  /** Fill colour of primary buttons. */
  button: string;
  /** Page background. */
  background: string;
  /** Body / heading text colour. */
  text: string;
  /** Corner style of buttons and inputs. */
  buttonShape: ButtonShape;
  /** Font pairing id. */
  font: FontId;
  /** Card corner radius in pixels. */
  cardRadius: number;
}

/** Viewport presets used by the preview stage and by export. */
export type DeviceId = 'desktop' | 'tablet' | 'mobile';

export interface Device {
  id: DeviceId;
  label: string;
  width: number;
  /** Minimum rendered height, so short templates still fill the frame. */
  minHeight: number;
}

/** A catalog entry. Add one of these to ship a new design. */
export interface TemplateDefinition {
  id: string;
  /** Client-facing name. */
  name: string;
  /** Short category label shown on the card and in filters. */
  category: string;
  /** One-or-two sentence pitch. */
  description: string;
  /** Free-form keywords, used by search. */
  tags: string[];
  /** The design's signature palette — the starting point in the editor. */
  defaults: StyleConfig;
  /** The template itself. Renders with no props; reads style from CSS variables. */
  Component: ComponentType;
}
