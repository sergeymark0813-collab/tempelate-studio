import type { CSSProperties, ReactNode } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/cn';

/* ===========================================================================
   Building blocks shared by every template.

   Rules of the house:
   - never hardcode a colour, radius or font — read the `--tp-*` tokens;
   - never use viewport breakpoints (`md:`), use container ones (`@md:`), so a
     template renders correctly inside the scaled device frames.
   =========================================================================== */

/* --------------------------------- buttons -------------------------------- */

type BtnVariant =
  | 'solid'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'soft'
  | 'ghost'
  | 'inverse';

interface BtnProps {
  children: ReactNode;
  variant?: BtnVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

export function Btn({
  children,
  variant = 'solid',
  size = 'md',
  className,
  style,
}: BtnProps) {
  return (
    <span
      className={cn(
        't-btn',
        `t-btn-${variant}`,
        size === 'lg' && 't-btn-lg',
        size === 'sm' && 't-btn-sm',
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}

/* ---------------------------------- text ---------------------------------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('t-eyebrow', className)}>{children}</div>;
}

export function Section({
  children,
  className,
  inner = 'max-w-[1180px]',
  pad = 'py-16 @2xl:py-24 @5xl:py-28',
  id,
}: {
  children: ReactNode;
  className?: string;
  inner?: string | false;
  pad?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(pad, className)}>
      {inner === false ? children : <div className={cn('mx-auto px-6 @2xl:px-10', inner)}>{children}</div>}
    </section>
  );
}

/* --------------------------------- avatars -------------------------------- */

export function Avatar({
  name,
  size = 48,
  className,
  tone = 'primary',
}: {
  name: string;
  size?: number;
  className?: string;
  tone?: 'primary' | 'secondary';
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full font-semibold', className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: tone === 'primary' ? 'var(--tp-primary)' : 'var(--tp-secondary)',
        color: tone === 'primary' ? 'var(--tp-on-primary)' : 'var(--tp-on-secondary)',
      }}
    >
      {initials}
    </span>
  );
}

export function Stars({ value = 5, size = 14 }: { value?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" style={{ color: 'var(--tp-secondary)' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} strokeWidth={1.5} fill={i < value ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

/* ------------------------------- placeholders ----------------------------- */

export type MediaVariant =
  | 'mesh'
  | 'grid'
  | 'dots'
  | 'stripes'
  | 'rings'
  | 'portrait'
  | 'product'
  | 'dish'
  | 'plan';

/**
 * Decorative stand-in for photography. Everything is drawn with gradients and
 * CSS patterns derived from the palette, so previews stay on-brand, work
 * offline, and rasterise cleanly into the exported PNG/JPG.
 */
export function Media({
  variant = 'mesh',
  seed = 0,
  className,
  radius = 'card',
  children,
  overlay,
}: {
  variant?: MediaVariant;
  /** Varies gradient angles so repeated blocks don't look cloned. */
  seed?: number;
  className?: string;
  radius?: 'card' | 'card-lg' | 'card-sm' | 'pill' | 'none';
  children?: ReactNode;
  /** Darkening veil, useful when text sits on top. */
  overlay?: boolean;
}) {
  const angle = 120 + ((seed * 37) % 120);
  const base: CSSProperties = {
    backgroundImage: `
      radial-gradient(120% 100% at ${18 + ((seed * 13) % 60)}% 0%, var(--tp-primary-30), transparent 62%),
      radial-gradient(110% 90% at ${90 - ((seed * 17) % 60)}% 100%, var(--tp-secondary-15), transparent 60%),
      linear-gradient(${angle}deg, var(--tp-surface-2), var(--tp-surface))`,
  };

  const pattern: Record<MediaVariant, CSSProperties | null> = {
    mesh: null,
    grid: {
      backgroundImage: `
        linear-gradient(to right, var(--tp-border) 1px, transparent 1px),
        linear-gradient(to bottom, var(--tp-border) 1px, transparent 1px)`,
      backgroundSize: '38px 38px',
    },
    dots: {
      backgroundImage: 'radial-gradient(var(--tp-primary-30) 1.6px, transparent 1.7px)',
      backgroundSize: '18px 18px',
    },
    stripes: {
      backgroundImage: `repeating-linear-gradient(${angle}deg, var(--tp-primary-08) 0 14px, transparent 14px 28px)`,
    },
    rings: {
      backgroundImage: `repeating-radial-gradient(circle at 70% 30%, var(--tp-primary-15) 0 2px, transparent 2px 22px)`,
    },
    portrait: null,
    product: null,
    dish: null,
    plan: {
      backgroundImage: `
        linear-gradient(to right, var(--tp-border-strong) 1px, transparent 1px),
        linear-gradient(to bottom, var(--tp-border-strong) 1px, transparent 1px)`,
      backgroundSize: '26px 26px',
    },
  };

  const radiusClass =
    radius === 'none'
      ? ''
      : radius === 'pill'
        ? 't-r-pill'
        : radius === 'card-lg'
          ? 't-r-card-lg'
          : radius === 'card-sm'
            ? 't-r-card-sm'
            : 't-r-card';

  return (
    <div className={cn('relative isolate overflow-hidden', radiusClass, className)} style={base}>
      {pattern[variant] && <div className="absolute inset-0" style={pattern[variant]!} />}

      {variant === 'portrait' && (
        <>
          <div
            className="absolute bottom-[16%] left-1/2 aspect-square w-[30%] -translate-x-1/2 rounded-full"
            style={{ background: 'var(--tp-primary)', opacity: 0.42 }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-[34%] w-[64%] -translate-x-1/2"
            style={{
              background: 'var(--tp-primary)',
              opacity: 0.3,
              borderRadius: '999px 999px 0 0',
            }}
          />
        </>
      )}

      {variant === 'product' && (
        <div
          className="absolute inset-[18%] rotate-[-6deg] t-r-card-sm"
          style={{
            backgroundImage: 'linear-gradient(150deg, var(--tp-primary), var(--tp-secondary))',
            opacity: 0.72,
            boxShadow: 'var(--tp-shadow)',
          }}
        />
      )}

      {variant === 'dish' && (
        <>
          <div
            className="absolute top-1/2 left-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ border: '10px solid var(--tp-border-strong)', opacity: 0.7 }}
          />
          <div
            className="absolute top-1/2 left-1/2 aspect-square w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundImage: 'linear-gradient(140deg, var(--tp-primary), var(--tp-secondary))',
              opacity: 0.8,
            }}
          />
        </>
      )}

      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.55))' }}
        />
      )}

      {children && <div className="relative h-full w-full">{children}</div>}
    </div>
  );
}

/* --------------------------------- brand mark ----------------------------- */

export function Logo({
  name,
  mark,
  className,
  shape = 'square',
}: {
  name: string;
  /** Single glyph inside the mark. Defaults to the first letter of `name`. */
  mark?: string;
  className?: string;
  shape?: 'square' | 'circle' | 'btn';
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center text-[15px] font-bold',
          shape === 'circle' ? 'rounded-full' : shape === 'btn' ? 't-r-btn' : 't-r-card-sm',
        )}
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--tp-primary), var(--tp-secondary))',
          color: 'var(--tp-on-primary)',
        }}
      >
        {mark ?? name[0]}
      </span>
      <span className="t-head text-[17px] font-bold tracking-tight">{name}</span>
    </span>
  );
}

/* --------------------------------- device mock ---------------------------- */

/** Browser-window chrome used by SaaS / product templates. */
export function WindowMock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('t-card t-shadow-lg overflow-hidden', className)}>
      <div className="flex items-center gap-2 px-4 py-3 t-border-b" style={{ background: 'var(--tp-surface-2)' }}>
        {['var(--tp-primary)', 'var(--tp-secondary)', 'var(--tp-border-strong)'].map((c) => (
          <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span
          className="ml-3 h-5 flex-1 max-w-[220px] t-r-pill"
          style={{ background: 'var(--tp-border)' }}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}

/* --------------------------------- misc ----------------------------------- */

/** Horizontal auto-scrolling strip of text logos. */
export function LogoMarquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-6">
      <div className="t-marquee flex w-max items-center gap-14">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="t-head text-xl whitespace-nowrap opacity-45"
            style={{ letterSpacing: '0.04em' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
