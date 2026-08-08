import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/cn';

/* ===========================================================================
   Small shared pieces of the concept report.
   =========================================================================== */

export function ResultCard({
  icon: Icon,
  title,
  hint,
  action,
  children,
  className,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  hint?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('panel overflow-hidden', className)}>
      <header className="flex items-start justify-between gap-4 border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/6 text-brand-400 ring-1 ring-white/10">
            <Icon size={16} />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-[15px] font-semibold tracking-tight">{title}</h2>
            {hint && <p className="mt-1 text-[13px] leading-relaxed text-white/40">{hint}</p>}
          </div>
        </div>
        {action}
      </header>
      <div className="px-5 py-5 sm:px-6">{children}</div>
    </section>
  );
}

/** Copies `value` and confirms inline for two seconds. */
export function CopyButton({
  value,
  label = 'Копировать',
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure origin / denied permission) — the value is
      // on screen anyway, so failing silently beats an alert.
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'focus-ring flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-white/50 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white',
        copied && 'text-emerald-300 ring-emerald-400/30',
        className,
      )}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Скопировано' : label}
    </button>
  );
}

export function Chip({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'good' | 'warn' | 'bad';
}) {
  const tones = {
    neutral: 'bg-white/6 text-white/60 ring-white/10',
    accent: 'bg-brand-500/15 text-brand-400 ring-brand-400/25',
    good: 'bg-emerald-500/12 text-emerald-300 ring-emerald-400/25',
    warn: 'bg-amber-500/12 text-amber-300 ring-amber-400/25',
    bad: 'bg-rose-500/12 text-rose-300 ring-rose-400/25',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ring-1',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Label / value row used by the specification lists. */
export function SpecRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/6 py-2.5 last:border-0">
      <span className="shrink-0 text-[13px] text-white/40">{label}</span>
      <span className="text-right text-[13px] text-white/80">{value}</span>
    </div>
  );
}
