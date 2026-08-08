import { useEffect, useId, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { normalizeHex } from '../lib/color';

/* ===========================================================================
   Small, dumb form controls for the style panel. Each one is fully controlled
   and reports changes immediately so the preview updates as you drag/type.
   =========================================================================== */

export function PanelSection({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('px-5 py-6', className)}>
      <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/40 uppercase">
        {title}
      </h3>
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-white/35">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* --------------------------------- colour --------------------------------- */

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const id = useId();
  // A local draft lets the user type "#1a" without the field fighting them.
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  const commit = (raw: string) => {
    const next = normalizeHex(raw);
    onChange(next);
    setDraft(next);
  };

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-white/15 transition hover:ring-white/35"
        style={{ background: value }}
        title={label}
      >
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm text-white/80">{label}</div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit((e.target as HTMLInputElement).value);
          }}
          spellCheck={false}
          className="focus-ring mt-0.5 w-full bg-transparent font-mono text-xs tracking-wide text-white/45 uppercase outline-none"
        />
      </div>
    </div>
  );
}

/* -------------------------------- segmented ------------------------------- */

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  columns = 2,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
  columns?: number;
}) {
  return (
    <div
      className="grid gap-1.5 rounded-xl bg-white/[0.04] p-1.5 ring-1 ring-white/8"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={cn(
              'focus-ring rounded-lg px-3 py-2 text-[13px] font-medium transition',
              active
                ? 'bg-white text-shell-950 shadow-sm'
                : 'text-white/55 hover:bg-white/6 hover:text-white/85',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------- range --------------------------------- */

export function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = 'px',
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-white/80">{label}</span>
        <span className="font-mono text-xs text-white/45">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="focus-ring mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-brand-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(99,102,241,0.35)]"
      />
    </div>
  );
}

/* --------------------------------- select --------------------------------- */

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string; note?: string }[];
  onChange: (id: T) => void;
}) {
  const active = options.find((o) => o.id === value);
  return (
    <label className="block">
      <span className="text-sm text-white/80">{label}</span>
      <div className="relative mt-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="focus-ring w-full appearance-none rounded-xl bg-white/[0.05] px-3.5 py-2.5 pr-9 text-sm text-white ring-1 ring-white/10 transition hover:ring-white/20"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id} className="bg-shell-850 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {active?.note && <p className="mt-1.5 text-xs text-white/35">{active.note}</p>}
    </label>
  );
}
