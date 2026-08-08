import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StyleConfig } from '../types';
import type { PalettePreset } from '../lib/presets';
import { PALETTES } from '../lib/presets';
import { FONTS } from '../lib/fonts';
import { BUTTON_SHAPES } from '../lib/styleVars';

/**
 * Where one template's saved look lives. Exported because the AI studio seeds
 * it before navigating, which is how a generated concept opens already applied
 * in the editor.
 */
export const storageKey = (templateId: string) => `template-studio:style:${templateId}`;

/** Guards against malformed / stale localStorage payloads. */
function readStored(templateId: string, fallback: StyleConfig): StyleConfig {
  try {
    const raw = localStorage.getItem(storageKey(templateId));
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<StyleConfig>;
    const merged: StyleConfig = { ...fallback, ...parsed };
    const valid =
      typeof merged.cardRadius === 'number' &&
      BUTTON_SHAPES.some((s) => s.id === merged.buttonShape) &&
      FONTS.some((f) => f.id === merged.font);
    return valid ? merged : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Owns the client's style choices for one template. Selections survive a
 * reload, and every template keeps its own saved variant.
 */
export function useStyleConfig(templateId: string, defaults: StyleConfig) {
  const [config, setConfig] = useState<StyleConfig>(() => readStored(templateId, defaults));

  // Switching templates swaps in that template's saved (or signature) look.
  useEffect(() => {
    setConfig(readStored(templateId, defaults));
  }, [templateId, defaults]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(templateId), JSON.stringify(config));
    } catch {
      // Private mode / quota — styling still works, it just won't persist.
    }
  }, [templateId, config]);

  const set = useCallback(
    <K extends keyof StyleConfig>(key: K, value: StyleConfig[K]) =>
      setConfig((prev) => (prev[key] === value ? prev : { ...prev, [key]: value })),
    [],
  );

  const applyPalette = useCallback(
    (palette: PalettePreset) => setConfig((prev) => ({ ...prev, ...palette.colors })),
    [],
  );

  const reset = useCallback(() => setConfig(defaults), [defaults]);

  const randomize = useCallback(() => {
    const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const font = FONTS[Math.floor(Math.random() * FONTS.length)];
    const shape = BUTTON_SHAPES[Math.floor(Math.random() * BUTTON_SHAPES.length)];
    setConfig((prev) => ({
      ...prev,
      ...palette.colors,
      font: font.id,
      buttonShape: shape.id,
      cardRadius: [0, 6, 12, 18, 24, 32][Math.floor(Math.random() * 6)],
    }));
  }, []);

  /** Which preset (if any) matches the current colours — for active states. */
  const activePaletteId = useMemo(
    () =>
      PALETTES.find(
        (p) =>
          p.colors.primary.toLowerCase() === config.primary.toLowerCase() &&
          p.colors.background.toLowerCase() === config.background.toLowerCase() &&
          p.colors.button.toLowerCase() === config.button.toLowerCase(),
      )?.id ?? null,
    [config.primary, config.background, config.button],
  );

  const isDefault = useMemo(
    () => (Object.keys(defaults) as (keyof StyleConfig)[]).every((k) => defaults[k] === config[k]),
    [config, defaults],
  );

  return { config, set, applyPalette, reset, randomize, activePaletteId, isDefault };
}
