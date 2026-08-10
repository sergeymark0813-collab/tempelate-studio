import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import type { DesignSystem } from '../../lib/studio/types';

/* ===========================================================================
   Rendering primitives.

   Every generated design is drawn from these. They read the design system out
   of context rather than taking props, so a block never hardcodes a colour, a
   size or a radius — change the system and the whole artboard follows.
   =========================================================================== */

const DsContext = createContext<DesignSystem | null>(null);

export function DsProvider({ ds, children }: { ds: DesignSystem; children: ReactNode }) {
  return <DsContext.Provider value={ds}>{children}</DsContext.Provider>;
}

export function useDs(): DesignSystem {
  const ds = useContext(DsContext);
  if (!ds) throw new Error('useDs must be used inside <DsProvider>');
  return ds;
}

/* --------------------------------- text ---------------------------------- */

type StepId = 'display' | 'h1' | 'h2' | 'h3' | 'lead' | 'body' | 'small' | 'overline';
type Tone = 'default' | 'muted' | 'faint' | 'primary' | 'onPrimary';

export function Type({
  step = 'body',
  tone = 'default',
  as: Tag = 'div',
  style,
  children,
}: {
  step?: StepId;
  tone?: Tone;
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ds = useDs();
  const spec = ds.type.scale.find((entry) => entry.id === step) ?? ds.type.scale[5];

  const color = {
    default: ds.color.text,
    muted: ds.color.textMuted,
    faint: ds.color.textFaint,
    primary: ds.color.primary,
    onPrimary: ds.color.onPrimary,
  }[tone];

  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: spec.role === 'display' ? ds.type.display.stack : ds.type.body.stack,
        fontSize: spec.size,
        fontWeight: spec.weight,
        lineHeight: spec.lineHeight,
        letterSpacing: spec.tracking,
        textTransform: spec.transform,
        color,
        textWrap: spec.role === 'display' ? 'balance' : 'pretty',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------- layout --------------------------------- */

export function Stack({
  gap = 16,
  align = 'stretch',
  style,
  children,
}: {
  gap?: number;
  align?: 'stretch' | 'start' | 'center' | 'end';
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const alignItems = { stretch: 'stretch', start: 'flex-start', center: 'center', end: 'flex-end' }[align];
  return <div style={{ display: 'flex', flexDirection: 'column', gap, alignItems, ...style }}>{children}</div>;
}

/** Page container honouring the generated grid's max width and margins. */
export function Container({ style, children }: { style?: CSSProperties; children?: ReactNode }) {
  const ds = useDs();
  return (
    <div
      style={{
        width: '100%',
        maxWidth: ds.grid.maxWidth,
        marginInline: 'auto',
        paddingInline: ds.grid.margin,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Full-bleed band with vertical section rhythm. */
export function Section({
  tone = 'bg',
  style,
  children,
}: {
  tone?: 'bg' | 'surface' | 'surface2' | 'primary';
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ds = useDs();
  const background = {
    bg: ds.color.bg,
    surface: ds.color.surface,
    surface2: ds.color.surface2,
    primary: ds.color.primary,
  }[tone];

  return (
    <section style={{ background, paddingBlock: ds.space.section, ...style }}>
      {children}
    </section>
  );
}

/* -------------------------------- surface -------------------------------- */

export function Surface({
  tone = 'default',
  pad,
  style,
  children,
}: {
  tone?: 'default' | 'raised' | 'gradient' | 'outline';
  pad?: number;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ds = useDs();
  const padding = pad ?? ds.space.unit * 6;

  // How a card separates itself from the page is a system-level decision, so it
  // lives here rather than in each block.
  const base: CSSProperties = {
    borderRadius: ds.radius.md,
    padding,
    boxSizing: 'border-box',
  };

  if (tone === 'gradient') {
    return (
      <div style={{ ...base, background: ds.color.gradient, color: ds.color.onPrimary, ...style }}>
        {children}
      </div>
    );
  }

  const styles: Record<string, CSSProperties> = {
    flat: { background: ds.color.surface },
    elevated: { background: ds.color.surface, boxShadow: ds.shadow.md },
    outlined: { background: 'transparent', border: `1px solid ${ds.color.border}` },
    glass: {
      background: `${ds.color.surface}b3`,
      backdropFilter: 'blur(14px) saturate(140%)',
      border: `1px solid ${ds.color.border}`,
    },
    gradient: { background: ds.color.surface, border: `1px solid ${ds.color.border}` },
  };

  const surface = tone === 'outline' ? styles.outlined : styles[ds.surfaceStyle] ?? styles.flat;
  const raised = tone === 'raised' ? { background: ds.color.surface2 } : null;

  return <div style={{ ...base, ...surface, ...raised, ...style }}>{children}</div>;
}

/* -------------------------------- controls ------------------------------- */

export function Btn({
  variant = 'primary',
  size = 'md',
  style,
  children,
}: {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ds = useDs();
  const pad = { sm: '8px 14px', md: '12px 22px', lg: '17px 32px' }[size];
  const fontSize = { sm: 13, md: 15, lg: 17 }[size];

  const variants: Record<string, CSSProperties> = {
    primary: {
      background: ds.color.primary,
      color: ds.color.onPrimary,
      boxShadow: ds.shadow.family.startsWith('Свечение') ? ds.shadow.glow : ds.shadow.sm,
    },
    secondary: { background: ds.color.text, color: ds.color.bg },
    outline: { background: 'transparent', color: ds.color.text, border: `1px solid ${ds.color.borderStrong}` },
    ghost: { background: 'transparent', color: ds.color.primary },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: pad,
        borderRadius: ds.radius.family === 'Максимальное скругление' ? ds.radius.pill : ds.radius.sm,
        fontFamily: ds.type.body.stack,
        fontWeight: 600,
        fontSize,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        border: '1px solid transparent',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Field({ label, style }: { label: string; style?: CSSProperties }) {
  const ds = useDs();
  return (
    <div
      style={{
        borderRadius: ds.radius.sm,
        border: `1px solid ${ds.color.border}`,
        background: ds.color.scheme === 'dark' ? ds.color.surface2 : ds.color.bg,
        padding: '13px 16px',
        fontFamily: ds.type.body.stack,
        fontSize: 15,
        color: ds.color.textFaint,
        ...style,
      }}
    >
      {label}
    </div>
  );
}

export function Chip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  const ds = useDs();
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '7px 14px',
        borderRadius: ds.radius.pill,
        fontFamily: ds.type.body.stack,
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        background: active ? ds.color.primary : ds.color.surface2,
        color: active ? ds.color.onPrimary : ds.color.textMuted,
        border: `1px solid ${active ? 'transparent' : ds.color.border}`,
      }}
    >
      {children}
    </span>
  );
}

/* -------------------------------- graphics ------------------------------- */

const rand = (seed: number) => {
  let state = (seed * 2654435761) >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Procedural artwork standing in for photography.
 *
 * Grey placeholder boxes make any layout look unfinished, and there is no image
 * to fetch — so the studio draws an abstract composition from its own palette.
 * Deterministic per `seed`, so a given slot keeps its picture across re-renders.
 */
export function Visual({
  seed,
  radius = 'md',
  style,
  src,
}: {
  seed: number;
  radius?: 'none' | 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  /** Real image supplied in the editor; replaces the generated artwork. */
  src?: string;
}) {
  const ds = useDs();
  const next = rand(seed);
  const borderRadius = radius === 'none' ? 0 : ds.radius[radius];

  if (src) {
    return (
      <div style={{ overflow: 'hidden', borderRadius, minHeight: 120, ...style }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }

  const palette = [ds.color.primary, ds.color.secondary, ds.color.accent];
  const mode = Math.floor(next() * 4);
  const rotate = Math.floor(next() * 360);

  const shapes = Array.from({ length: 3 + Math.floor(next() * 3) }, (_, i) => {
    const size = 24 + next() * 58;
    return {
      key: i,
      cx: 8 + next() * 84,
      cy: 8 + next() * 84,
      size,
      color: palette[Math.floor(next() * palette.length)],
      opacity: 0.35 + next() * 0.5,
      round: next() > 0.45,
      rot: Math.floor(next() * 90),
    };
  });

  const base =
    mode === 0
      ? `linear-gradient(${rotate}deg, ${ds.color.primary}, ${ds.color.accent})`
      : mode === 1
        ? `radial-gradient(120% 120% at ${20 + next() * 60}% ${10 + next() * 40}%, ${ds.color.accent}, ${ds.color.primary})`
        : mode === 2
          ? ds.color.surface2
          : `linear-gradient(${rotate}deg, ${ds.color.surface2}, ${ds.color.surface3})`;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        background: base,
        minHeight: 120,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {shapes.map((shape) =>
          shape.round ? (
            <circle key={shape.key} cx={shape.cx} cy={shape.cy} r={shape.size / 2.6} fill={shape.color} opacity={shape.opacity} />
          ) : (
            <rect
              key={shape.key}
              x={shape.cx - shape.size / 2.4}
              y={shape.cy - shape.size / 2.4}
              width={shape.size / 1.2}
              height={shape.size / 1.2}
              fill={shape.color}
              opacity={shape.opacity}
              transform={`rotate(${shape.rot} ${shape.cx} ${shape.cy})`}
            />
          ),
        )}
      </svg>
    </div>
  );
}

/** Geometric icon stand-in, drawn in the system's icon style. */
export function Glyph({ seed, size = 24, color }: { seed: number; size?: number; color?: string }) {
  const ds = useDs();
  const next = rand(seed);
  const tint = color ?? ds.color.primary;
  const shape = Math.floor(next() * 5);
  const stroke = ds.iconStyle === 'line' ? 1.6 : 0;

  const common =
    ds.iconStyle === 'line'
      ? { fill: 'none', stroke: tint, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
      : { fill: tint, stroke: 'none' };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {ds.iconStyle === 'duotone' && <circle cx="12" cy="12" r="11" fill={tint} opacity={0.18} />}
      {shape === 0 && <rect x="4" y="4" width="16" height="16" rx="4" {...common} />}
      {shape === 1 && <circle cx="12" cy="12" r="8" {...common} />}
      {shape === 2 && <path d="M12 3 L21 20 L3 20 Z" {...common} />}
      {shape === 3 && <path d="M4 14 L10 8 L14 12 L20 5" {...common} fill="none" stroke={tint} strokeWidth={2} />}
      {shape === 4 && (
        <>
          <rect x="4" y="4" width="7" height="7" rx="2" {...common} />
          <rect x="13" y="13" width="7" height="7" rx="2" {...common} />
        </>
      )}
    </svg>
  );
}

/** Avatar stand-in built from the palette, with initials. */
export function Avatar({ seed, name, size = 44 }: { seed: number; name: string; size?: number }) {
  const ds = useDs();
  const next = rand(seed);
  const tint = [ds.color.primary, ds.color.secondary, ds.color.accent][Math.floor(next() * 3)];
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return (
    <span
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: ds.radius.family === 'Прямые углы' ? ds.radius.sm : 999,
        background: tint,
        display: 'grid',
        placeItems: 'center',
        fontFamily: ds.type.body.stack,
        fontWeight: 700,
        fontSize: size * 0.36,
        color: ds.color.onPrimary,
      }}
    >
      {initials}
    </span>
  );
}
