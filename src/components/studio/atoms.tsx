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
 * Flat tinted rectangles make a layout look unfinished, so this draws actual
 * scenes: a mesh of coloured light, depth layers, a subject, film grain and a
 * vignette. Everything comes from the palette, so the imagery belongs to the
 * design rather than sitting on top of it.
 *
 * Deterministic per `seed`, so a slot keeps its picture across re-renders.
 */

/** Shared film grain. One data URI for the whole app — no per-node filters. */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix type='saturate' values='0'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.5'/></svg>\")";

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

  const { primary, secondary, accent, surface2, surface3, bg } = ds.color;
  const inks = [primary, secondary, accent];
  const scene = Math.floor(next() * 4);
  const dark = ds.color.scheme === 'dark';

  /* A mesh of overlapping radial gradients reads as lit space rather than a
     flat fill — this is what separates "image" from "coloured block". */
  const mesh = [
    `radial-gradient(80% 70% at ${12 + next() * 26}% ${8 + next() * 24}%, ${inks[0]}, transparent 62%)`,
    `radial-gradient(70% 65% at ${62 + next() * 28}% ${14 + next() * 22}%, ${inks[1]}, transparent 58%)`,
    `radial-gradient(90% 80% at ${28 + next() * 44}% ${74 + next() * 20}%, ${inks[2]}, transparent 64%)`,
    `linear-gradient(${Math.floor(next() * 360)}deg, ${dark ? surface3 : surface2}, ${bg})`,
  ].join(', ');

  /** Out-of-focus highlights — the giveaway of a real photograph. */
  const bokeh = Array.from({ length: 3 + Math.floor(next() * 3) }, (_, i) => ({
    key: i,
    left: `${next() * 88}%`,
    top: `${next() * 84}%`,
    size: 14 + next() * 34,
    tint: inks[Math.floor(next() * inks.length)],
    opacity: 0.18 + next() * 0.34,
    blur: 6 + next() * 18,
  }));

  const horizon = 52 + next() * 22;
  const sunX = 18 + next() * 64;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        background: mesh,
        minHeight: 120,
        isolation: 'isolate',
        ...style,
      }}
    >
      {/* Depth: a horizon and layered planes give the frame a subject. */}
      {scene === 0 && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx={sunX} cy={horizon - 16} r={7 + next() * 6} fill={accent} opacity={0.85} />
          <path d={`M0 ${horizon} C 22 ${horizon - 9}, 38 ${horizon + 7}, 58 ${horizon - 3} S 86 ${horizon - 11}, 100 ${horizon - 1} L100 100 L0 100 Z`} fill={primary} opacity={0.55} />
          <path d={`M0 ${horizon + 12} C 26 ${horizon + 3}, 44 ${horizon + 19}, 66 ${horizon + 9} S 88 ${horizon + 2}, 100 ${horizon + 11} L100 100 L0 100 Z`} fill={dark ? bg : surface3} opacity={0.9} />
        </svg>
      )}

      {/* Studio: a lit subject on a seamless backdrop. */}
      {scene === 1 && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <ellipse cx="50" cy="84" rx="30" ry="6" fill={dark ? '#000' : primary} opacity={0.28} />
          <rect x="33" y="26" width="34" height="56" rx={next() > 0.5 ? 17 : 5} fill={inks[Math.floor(next() * 3)]} opacity={0.92} />
          <rect x="33" y="26" width="34" height="56" rx={next() > 0.5 ? 17 : 5} fill={`url(#lift-${seed})`} opacity={0.5} />
          <defs>
            <linearGradient id={`lift-${seed}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Architecture: planes catching light at an angle. */}
      {scene === 2 && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M0 100 L0 42 L38 22 L38 100 Z" fill={primary} opacity={0.7} />
          <path d="M38 100 L38 22 L72 38 L72 100 Z" fill={dark ? surface3 : bg} opacity={0.55} />
          <path d="M72 100 L72 38 L100 26 L100 100 Z" fill={secondary} opacity={0.6} />
          <path d="M0 42 L38 22 L72 38 L100 26" stroke={accent} strokeWidth="1.2" fill="none" opacity={0.8} />
        </svg>
      )}

      {/* Flow: soft layered curves, good behind text. */}
      {scene === 3 && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M0 ${34 + i * 18} C 24 ${22 + i * 18}, 44 ${48 + i * 18}, 68 ${34 + i * 18} S 92 ${20 + i * 18}, 100 ${32 + i * 18} L100 100 L0 100 Z`}
              fill={inks[i % 3]}
              opacity={0.28 + i * 0.16}
            />
          ))}
        </svg>
      )}

      {/* Out-of-focus highlights. */}
      {bokeh.map((dot) => (
        <span
          key={dot.key}
          style={{
            position: 'absolute',
            left: dot.left,
            top: dot.top,
            width: `${dot.size}%`,
            aspectRatio: '1',
            borderRadius: 999,
            background: dot.tint,
            opacity: dot.opacity,
            filter: `blur(${dot.blur}px)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Vignette + grain: what makes the frame read as a photograph. */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(120% 100% at 50% 40%, transparent 42%, ${dark ? '#000' : '#1a1a20'} 130%)`,
          opacity: dark ? 0.55 : 0.3,
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: GRAIN,
          opacity: 0.14,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
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
