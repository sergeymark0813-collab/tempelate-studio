import { useEffect, useRef, useState } from 'react';
import { Check, Pipette } from 'lucide-react';
import { hexToHsl, parseHex, readableOn } from '../../lib/color';
import { NEUTRALS, RAMPS, harmoniesFor, parseColorInput } from '../../lib/studio/swatches';
import { cn } from '../../lib/cn';

/* ===========================================================================
   Colour control for the editor.

   A swatch grid for picking quickly, harmonies computed from the current value
   for picking well, and free entry in HEX, RGB or HSL for when the brand book
   says exactly which colour it has to be.
   =========================================================================== */

type Mode = 'hex' | 'rgb' | 'hsl';

function formatValue(hex: string, mode: Mode): string {
  if (mode === 'hex') return hex.toUpperCase();
  if (mode === 'rgb') {
    const { r, g, b } = parseHex(hex);
    return `rgb(${r} ${g} ${b})`;
  }
  const { h, s, l } = hexToHsl(hex);
  return `hsl(${h} ${s}% ${l}%)`;
}

export default function ColorField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (hex: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('hex');
  const [draft, setDraft] = useState(value);
  const [invalid, setInvalid] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => setDraft(formatValue(value, mode)), [value, mode]);

  // Close on outside click and on Escape — a popover that traps the user is worse
  // than no popover.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const commit = (raw: string) => {
    const parsed = parseColorInput(raw);
    if (!parsed) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    onChange(parsed);
  };

  const Swatch = ({ hex }: { hex: string }) => (
    <button
      type="button"
      onClick={() => onChange(hex)}
      title={hex.toUpperCase()}
      aria-label={hex}
      className={cn(
        'focus-ring h-6 w-full rounded transition hover:scale-110',
        hex.toLowerCase() === value.toLowerCase() && 'ring-2 ring-white ring-offset-1 ring-offset-shell-900',
      )}
      style={{ background: hex }}
    >
      {hex.toLowerCase() === value.toLowerCase() && (
        <Check size={11} className="mx-auto" style={{ color: readableOn(hex) }} />
      )}
    </button>
  );

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="focus-ring flex items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-white/6"
      >
        <span className="font-mono text-[11px] text-white/35 uppercase">{value}</span>
        <span
          className="h-6 w-9 rounded-md ring-1 ring-white/20"
          style={{ background: value }}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-[min(19rem,calc(100vw-2.5rem))] rounded-xl bg-shell-850 p-3 shadow-2xl ring-1 ring-white/12">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
              {label}
            </span>
            <label className="focus-within:ring-brand-400/60 flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/50 ring-1 ring-white/10 transition hover:text-white">
              <Pipette size={12} />
              Свой
              <input
                type="color"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="sr-only"
              />
            </label>
          </div>

          {/* free entry */}
          <div className="flex gap-1.5">
            <input
              value={draft}
              spellCheck={false}
              onChange={(event) => setDraft(event.target.value)}
              onBlur={(event) => commit(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') commit((event.target as HTMLInputElement).value);
              }}
              className={cn(
                'focus-ring min-w-0 flex-1 rounded-lg bg-white/[0.05] px-2.5 py-1.5 font-mono text-[12px] text-white ring-1 outline-none transition',
                invalid ? 'ring-rose-400/60' : 'ring-white/10 hover:ring-white/20',
              )}
            />
            <div className="flex shrink-0 rounded-lg bg-white/[0.04] p-0.5 ring-1 ring-white/8">
              {(['hex', 'rgb', 'hsl'] as Mode[]).map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setMode(entry)}
                  className={cn(
                    'focus-ring rounded px-1.5 py-1 text-[10.5px] font-semibold uppercase transition',
                    mode === entry ? 'bg-white text-shell-950' : 'text-white/45 hover:text-white',
                  )}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>
          {invalid && (
            <p className="mt-1.5 text-[11px] text-rose-300">
              Не распознал цвет. Примеры: #2E7D32, rgb(46 125 50), hsl(123 46% 34%)
            </p>
          )}

          <div className="scroll-slim mt-3 max-h-[15rem] space-y-3 overflow-y-auto pr-1">
            {/* harmonies first: the shortest path to a combination that works */}
            <div>
              <span className="text-[10.5px] text-white/35">Гармонии с текущим</span>
              <div className="mt-1.5 space-y-1">
                {harmoniesFor(value).map((harmony) => (
                  <div key={harmony.id} className="flex items-center gap-2">
                    <span className="w-24 shrink-0 truncate text-[10.5px] text-white/30">
                      {harmony.label}
                    </span>
                    <div className="grid flex-1 grid-flow-col gap-1">
                      {harmony.colors.map((hex, index) => (
                        <Swatch key={`${harmony.id}-${index}`} hex={hex} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10.5px] text-white/35">Палитра</span>
              <div className="mt-1.5 space-y-1">
                {RAMPS.map((ramp) => (
                  <div key={ramp.id} className="grid grid-cols-9 gap-1" title={ramp.label}>
                    {ramp.shades.map((hex) => (
                      <Swatch key={hex} hex={hex} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10.5px] text-white/35">Нейтральные</span>
              <div className="mt-1.5 grid grid-cols-11 gap-1">
                {NEUTRALS.map((hex) => (
                  <Swatch key={hex} hex={hex} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
