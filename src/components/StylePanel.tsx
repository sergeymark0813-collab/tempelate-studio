import { RotateCcw, Shuffle, X } from 'lucide-react';
import type { ButtonShape, FontId, StyleConfig } from '../types';
import { FONTS } from '../lib/fonts';
import { BUTTON_SHAPES } from '../lib/styleVars';
import { PALETTES, type PalettePreset } from '../lib/presets';
import { cn } from '../lib/cn';
import { ColorField, PanelSection, RangeField, SelectField, Segmented } from './controls';

interface StylePanelProps {
  config: StyleConfig;
  set: <K extends keyof StyleConfig>(key: K, value: StyleConfig[K]) => void;
  applyPalette: (palette: PalettePreset) => void;
  reset: () => void;
  randomize: () => void;
  activePaletteId: string | null;
  isDefault: boolean;
  /**
   * Renders a close button in the header row. Passed only by the mobile bottom
   * sheet — the desktop sidebar is always visible and has nothing to close.
   * It belongs in this row rather than floating over the panel, otherwise it
   * lands on top of the reset button.
   */
  onClose?: () => void;
}

const COLOR_FIELDS: { key: keyof StyleConfig; label: string }[] = [
  { key: 'primary', label: 'Основной цвет' },
  { key: 'secondary', label: 'Дополнительный цвет' },
  { key: 'button', label: 'Цвет кнопок' },
  { key: 'background', label: 'Цвет фона' },
  { key: 'text', label: 'Цвет текста' },
];

export default function StylePanel({
  config,
  set,
  applyPalette,
  reset,
  randomize,
  activePaletteId,
  isDefault,
  onClose,
}: StylePanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-4">
        <div className="min-w-0">
          <div className="text-sm font-semibold">Оформление</div>
          <div className="truncate text-xs text-white/40">Структура сайта не меняется</div>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={randomize}
            title="Случайное сочетание"
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg text-white/55 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
          >
            <Shuffle size={15} />
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={isDefault}
            title="Вернуть исходный стиль"
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg text-white/55 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <RotateCcw size={15} />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть панель"
              title="Закрыть"
              className="focus-ring grid h-9 w-9 place-items-center rounded-lg text-white/55 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="scroll-slim min-h-0 flex-1 divide-y divide-white/8 overflow-y-auto">
        <PanelSection title="Готовые схемы" hint="Быстрый старт — потом можно донастроить вручную.">
          <div className="grid grid-cols-3 gap-2">
            {PALETTES.map((palette) => {
              const active = palette.id === activePaletteId;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => applyPalette(palette)}
                  className={cn(
                    'focus-ring group rounded-xl p-2 text-left ring-1 transition',
                    active
                      ? 'bg-white/8 ring-brand-400/70'
                      : 'ring-white/8 hover:bg-white/5 hover:ring-white/20',
                  )}
                >
                  <span
                    className="flex h-8 items-end gap-1 overflow-hidden rounded-lg p-1"
                    style={{ background: palette.colors.background }}
                  >
                    {[palette.colors.primary, palette.colors.secondary, palette.colors.button].map(
                      (c, i) => (
                        <span
                          key={i}
                          className="h-full flex-1 rounded"
                          style={{ background: c }}
                        />
                      ),
                    )}
                  </span>
                  <span className="mt-1.5 block truncate text-[11px] text-white/55">
                    {palette.label}
                  </span>
                </button>
              );
            })}
          </div>
        </PanelSection>

        <PanelSection title="Цвета">
          <div className="grid gap-4">
            {COLOR_FIELDS.map(({ key, label }) => (
              <ColorField
                key={key}
                label={label}
                value={config[key] as string}
                onChange={(hex) => set(key, hex as StyleConfig[typeof key])}
              />
            ))}
          </div>
        </PanelSection>

        <PanelSection title="Форма элементов">
          <div className="grid gap-6">
            <div>
              <span className="text-sm text-white/80">Форма кнопок</span>
              <div className="mt-2">
                <Segmented<ButtonShape>
                  value={config.buttonShape}
                  options={BUTTON_SHAPES}
                  onChange={(id) => set('buttonShape', id)}
                />
              </div>
            </div>
            <RangeField
              label="Радиус карточек"
              value={config.cardRadius}
              min={0}
              max={36}
              onChange={(value) => set('cardRadius', value)}
            />
          </div>
        </PanelSection>

        <PanelSection title="Типографика">
          <SelectField<FontId>
            label="Шрифт"
            value={config.font}
            options={FONTS.map((f) => ({ id: f.id, label: f.label, note: f.note }))}
            onChange={(id) => set('font', id)}
          />
        </PanelSection>
      </div>
    </div>
  );
}
