import type { ReactNode } from 'react';
import type { MarkSpec } from '../../lib/studio/logo/spec';

/* ===========================================================================
   The mark itself.

   Every motif below is drawn geometry on a 100×100 field — not a letter, not an
   emoji, not a stock glyph. `weight`, `fill`, `rotation` and `count` come from
   the spec, so the same motif looks materially different across generations.

   Letterforms appear only in the monogram and wordmark constructions, and even
   there they are *built*: counters are cut, strokes are constructed on a grid
   and the two initials interlock.
   =========================================================================== */

export interface MotifProps {
  /** Primary and secondary ink. */
  c1: string;
  c2: string;
  /** Stroke width in viewBox units, derived from spec.weight. */
  sw: number;
  solid: boolean;
  count: number;
  cap: 'round' | 'butt';
}

type Motif = (p: MotifProps) => ReactNode;

const common = (p: MotifProps) => ({
  fill: 'none',
  stroke: p.c1,
  strokeWidth: p.sw,
  strokeLinecap: p.cap,
  strokeLinejoin: p.cap === 'round' ? ('round' as const) : ('miter' as const),
});

export const MOTIFS: Record<string, Motif> = {
  /* ------------------------------- geometry ------------------------------ */
  arcSweep: (p) =>
    p.solid ? (
      <>
        <path d="M50 8 A42 42 0 0 1 92 50 L50 50 Z" fill={p.c1} />
        <path d="M50 92 A42 42 0 0 1 8 50 L50 50 Z" fill={p.c2} />
      </>
    ) : (
      <>
        <path d="M50 12 A38 38 0 0 1 88 50" {...common(p)} />
        <path d="M50 88 A38 38 0 0 1 12 50" {...common(p)} stroke={p.c2} />
      </>
    ),

  interlock: (p) =>
    p.solid ? (
      <>
        <circle cx="38" cy="50" r="26" fill={p.c1} />
        <circle cx="62" cy="50" r="26" fill={p.c2} opacity={0.75} />
      </>
    ) : (
      <>
        <circle cx="38" cy="50" r="26" {...common(p)} />
        <circle cx="62" cy="50" r="26" {...common(p)} stroke={p.c2} />
      </>
    ),

  orbit: (p) => (
    <>
      <circle cx="50" cy="50" r={p.solid ? 14 : 11} fill={p.c1} />
      <ellipse cx="50" cy="50" rx="40" ry="18" {...common(p)} transform="rotate(-24 50 50)" />
      <ellipse cx="50" cy="50" rx="40" ry="18" {...common(p)} stroke={p.c2} transform="rotate(36 50 50)" />
    </>
  ),

  module: (p) => {
    const gap = 4;
    const size = (74 - gap) / 2;
    return (
      <>
        <rect x={13} y={13} width={size} height={size} rx={p.cap === 'round' ? 5 : 0} {...(p.solid ? {} : common(p))} fill={p.solid ? p.c1 : 'none'} />
        <rect x={13 + size + gap} y={13} width={size} height={size} rx={p.cap === 'round' ? 5 : 0} fill={p.c2} opacity={p.solid ? 1 : 0.85} />
        <rect x={13} y={13 + size + gap} width={size} height={size} rx={p.cap === 'round' ? 5 : 0} fill={p.c2} opacity={0.45} />
        <rect x={13 + size + gap} y={13 + size + gap} width={size} height={size} rx={p.cap === 'round' ? 5 : 0} {...(p.solid ? {} : common(p))} fill={p.solid ? p.c1 : 'none'} />
      </>
    );
  },

  grid: (p) => {
    const cells = 3;
    const step = 72 / cells;
    const items: ReactNode[] = [];
    for (let row = 0; row < cells; row += 1) {
      for (let col = 0; col < cells; col += 1) {
        const on = (row + col) % 2 === 0;
        items.push(
          <rect
            key={`${row}-${col}`}
            x={14 + col * step}
            y={14 + row * step}
            width={step - 4}
            height={step - 4}
            fill={on ? p.c1 : 'none'}
            stroke={on ? 'none' : p.c2}
            strokeWidth={p.sw * 0.7}
          />,
        );
      }
    }
    return <>{items}</>;
  },

  pixel: (p) => {
    const items: ReactNode[] = [];
    const map = [
      [0, 1, 1, 0],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 0],
    ];
    map.forEach((row, r) =>
      row.forEach((on, c) => {
        if (!on) return;
        items.push(
          <rect key={`${r}-${c}`} x={16 + c * 18} y={16 + r * 18} width={14} height={14} fill={(r + c) % 3 === 0 ? p.c2 : p.c1} />,
        );
      }),
    );
    return <>{items}</>;
  },

  node: (p) => {
    const points = [
      [50, 14],
      [84, 36],
      [72, 78],
      [28, 78],
      [16, 36],
    ];
    return (
      <>
        {points.map(([x, y], i) => {
          const [nx, ny] = points[(i + 2) % points.length];
          return <line key={`l${i}`} x1={x} y1={y} x2={nx} y2={ny} stroke={p.c2} strokeWidth={p.sw * 0.6} strokeLinecap={p.cap} />;
        })}
        {points.map(([x, y], i) => (
          <circle key={`n${i}`} cx={x} cy={y} r={i === 0 ? p.sw * 1.5 : p.sw} fill={p.c1} />
        ))}
      </>
    );
  },

  aperture: (p) => {
    const blades = Math.max(5, Math.min(8, p.count + 2));
    return (
      <>
        {Array.from({ length: blades }, (_, i) => (
          <path
            key={i}
            d="M50 50 L50 10 A40 40 0 0 1 78 22 Z"
            fill={i % 2 === 0 ? p.c1 : p.c2}
            opacity={i % 2 === 0 ? 1 : 0.72}
            transform={`rotate(${(360 / blades) * i} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="12" fill="#fff" opacity={0.001} />
      </>
    );
  },

  /* -------------------------------- motion ------------------------------- */
  chevron: (p) => (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <path
          key={i}
          d={`M${20 + i * 16} 26 L${44 + i * 16} 50 L${20 + i * 16} 74`}
          {...common(p)}
          stroke={i === 2 ? p.c2 : p.c1}
          strokeWidth={p.sw * (1 - i * 0.16)}
          opacity={1 - i * 0.18}
        />
      ))}
    </>
  ),

  bolt: (p) =>
    p.solid ? (
      <path d="M58 8 L26 54 L46 54 L40 92 L74 44 L54 44 Z" fill={p.c1} />
    ) : (
      <path d="M58 10 L28 54 L47 54 L42 90 L72 46 L53 46 Z" {...common(p)} />
    ),

  slash: (p) => (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <line
          key={i}
          x1={20 + i * 22}
          y1={82}
          x2={44 + i * 22}
          y2={18}
          stroke={i === 1 ? p.c2 : p.c1}
          strokeWidth={p.sw * 1.6}
          strokeLinecap={p.cap}
        />
      ))}
    </>
  ),

  peak: (p) =>
    p.solid ? (
      <>
        <path d="M14 84 L40 40 L58 68 L74 44 L90 84 Z" fill={p.c1} />
        <path d="M58 68 L74 44 L90 84 L62 84 Z" fill={p.c2} />
      </>
    ) : (
      <path d="M12 78 L34 42 L50 62 L66 30 L88 78" {...common(p)} />
    ),

  burst: (p) => (
    <>
      {Array.from({ length: Math.max(6, p.count * 2) }, (_, i) => {
        const angle = (360 / Math.max(6, p.count * 2)) * i;
        const long = i % 2 === 0;
        return (
          <line
            key={i}
            x1={50}
            y1={long ? 12 : 24}
            x2={50}
            y2={long ? 34 : 38}
            stroke={long ? p.c1 : p.c2}
            strokeWidth={p.sw}
            strokeLinecap={p.cap}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
    </>
  ),

  pulse: (p) => (
    <path d="M8 50 L30 50 L38 26 L50 74 L60 42 L68 50 L92 50" {...common(p)} />
  ),

  /* ------------------------------- organic ------------------------------- */
  leafPair: (p) =>
    p.solid ? (
      <>
        <path d="M50 90 C20 74 20 34 50 12 C50 42 50 62 50 90 Z" fill={p.c1} />
        <path d="M50 90 C80 74 80 34 50 12 C50 42 50 62 50 90 Z" fill={p.c2} opacity={0.8} />
      </>
    ) : (
      <>
        <path d="M50 88 C22 72 24 34 50 14 C76 34 78 72 50 88 Z" {...common(p)} />
        <line x1="50" y1="18" x2="50" y2="84" stroke={p.c2} strokeWidth={p.sw * 0.7} strokeLinecap={p.cap} />
      </>
    ),

  petal: (p) => (
    <>
      {Array.from({ length: Math.max(4, Math.min(6, p.count)) }, (_, i) => (
        <ellipse
          key={i}
          cx={50}
          cy={30}
          rx={13}
          ry={24}
          fill={p.solid ? (i % 2 === 0 ? p.c1 : p.c2) : 'none'}
          stroke={p.solid ? 'none' : i % 2 === 0 ? p.c1 : p.c2}
          strokeWidth={p.sw * 0.8}
          transform={`rotate(${(360 / Math.max(4, Math.min(6, p.count))) * i} 50 50)`}
        />
      ))}
    </>
  ),

  flame: (p) =>
    p.solid ? (
      <>
        <path d="M50 8 C72 34 84 48 84 62 C84 80 68 92 50 92 C32 92 16 80 16 62 C16 48 28 34 50 8 Z" fill={p.c1} />
        <path d="M50 44 C60 58 64 64 64 70 C64 79 58 86 50 86 C42 86 36 79 36 70 C36 64 40 58 50 44 Z" fill={p.c2} />
      </>
    ) : (
      <path d="M50 10 C70 36 82 50 82 63 C82 80 67 90 50 90 C33 90 18 80 18 63 C18 50 30 36 50 10 Z" {...common(p)} />
    ),

  wave: (p) => (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <path
          key={i}
          d={`M10 ${34 + i * 16} C26 ${22 + i * 16} 34 ${46 + i * 16} 50 ${34 + i * 16} C66 ${22 + i * 16} 74 ${46 + i * 16} 90 ${34 + i * 16}`}
          {...common(p)}
          stroke={i === 1 ? p.c2 : p.c1}
          strokeWidth={p.sw * (1 - i * 0.12)}
        />
      ))}
    </>
  ),

  droplet: (p) =>
    p.solid ? (
      <path d="M50 10 C70 40 80 54 80 66 C80 82 66 92 50 92 C34 92 20 82 20 66 C20 54 30 40 50 10 Z" fill={p.c1} />
    ) : (
      <path d="M50 12 C69 40 78 54 78 66 C78 81 65 90 50 90 C35 90 22 81 22 66 C22 54 31 40 50 12 Z" {...common(p)} />
    ),

  grain: (p) => (
    <>
      <line x1="50" y1="14" x2="50" y2="90" {...common(p)} />
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <path d={`M50 ${28 + i * 15} C38 ${24 + i * 15} 32 ${32 + i * 15} 34 ${42 + i * 15} C44 ${42 + i * 15} 49 ${36 + i * 15} 50 ${28 + i * 15}`} {...(p.solid ? {} : common(p))} fill={p.solid ? p.c1 : 'none'} />
          <path d={`M50 ${28 + i * 15} C62 ${24 + i * 15} 68 ${32 + i * 15} 66 ${42 + i * 15} C56 ${42 + i * 15} 51 ${36 + i * 15} 50 ${28 + i * 15}`} {...(p.solid ? {} : { ...common(p), stroke: p.c2 })} fill={p.solid ? p.c2 : 'none'} />
        </g>
      ))}
    </>
  ),

  /* -------------------------------- objects ------------------------------ */
  cup: (p) => (
    <>
      <circle cx="50" cy="50" r="34" {...common(p)} />
      <circle cx="50" cy="50" r="20" {...common(p)} stroke={p.c2} />
      <circle cx="50" cy="50" r={p.solid ? 9 : 7} fill={p.c1} />
    </>
  ),

  bean: (p) =>
    p.solid ? (
      <>
        <ellipse cx="50" cy="50" rx="26" ry="38" fill={p.c1} transform="rotate(-24 50 50)" />
        <path d="M50 14 C38 34 62 66 50 86" stroke={p.c2} strokeWidth={p.sw * 1.2} fill="none" strokeLinecap={p.cap} transform="rotate(-24 50 50)" />
      </>
    ) : (
      <>
        <ellipse cx="50" cy="50" rx="26" ry="38" {...common(p)} transform="rotate(-24 50 50)" />
        <path d="M50 14 C38 34 62 66 50 86" {...common(p)} stroke={p.c2} transform="rotate(-24 50 50)" />
      </>
    ),

  steam: (p) => (
    <>
      {[36, 50, 64].map((x, i) => (
        <path
          key={x}
          d={`M${x} 82 C${x - 10} 66 ${x + 10} 54 ${x} 34 C${x - 7} 26 ${x + 4} 20 ${x} 14`}
          {...common(p)}
          stroke={i === 1 ? p.c1 : p.c2}
          strokeWidth={p.sw * (i === 1 ? 1.1 : 0.8)}
        />
      ))}
    </>
  ),

  plate: (p) => (
    <>
      <circle cx="50" cy="50" r="38" {...common(p)} />
      <circle cx="50" cy="50" r="24" {...common(p)} stroke={p.c2} strokeWidth={p.sw * 0.7} />
      <path d="M50 26 A24 24 0 0 1 74 50" stroke={p.c1} strokeWidth={p.sw * 1.4} fill="none" strokeLinecap={p.cap} />
    </>
  ),

  knifeFork: (p) => (
    <>
      <line x1="34" y1="14" x2="34" y2="86" {...common(p)} />
      <line x1="66" y1="14" x2="66" y2="86" {...common(p)} stroke={p.c2} />
      <line x1="22" y1="30" x2="46" y2="30" {...common(p)} strokeWidth={p.sw * 0.7} />
      <line x1="54" y1="42" x2="78" y2="42" {...common(p)} stroke={p.c2} strokeWidth={p.sw * 0.7} />
    </>
  ),

  frame: (p) => (
    <>
      <rect x="14" y="14" width="52" height="52" {...common(p)} fill={p.solid ? p.c1 : 'none'} stroke={p.solid ? 'none' : p.c1} />
      <rect x="34" y="34" width="52" height="52" {...common(p)} stroke={p.c2} fill="none" />
    </>
  ),

  houseFold: (p) =>
    p.solid ? (
      <>
        <path d="M50 10 L92 44 L92 90 L58 90 L58 56 L50 56 Z" fill={p.c1} />
        <path d="M50 10 L8 44 L8 90 L42 90 L42 56 L50 56 Z" fill={p.c2} />
      </>
    ) : (
      <path d="M12 88 L12 44 L50 14 L88 44 L88 88 M38 88 L38 58 L62 58 L62 88" {...common(p)} />
    ),

  monolith: (p) => (
    <>
      <rect x="16" y="30" width="18" height="60" {...(p.solid ? {} : common(p))} fill={p.solid ? p.c1 : 'none'} />
      <rect x="41" y="14" width="18" height="76" fill={p.c2} />
      <rect x="66" y="44" width="18" height="46" {...(p.solid ? {} : common(p))} fill={p.solid ? p.c1 : 'none'} />
    </>
  ),

  shield: (p) =>
    p.solid ? (
      <>
        <path d="M50 8 L86 22 V52 C86 74 70 86 50 94 C30 86 14 74 14 52 V22 Z" fill={p.c1} />
        <path d="M50 8 L86 22 V52 C86 74 70 86 50 94 Z" fill={p.c2} opacity={0.55} />
      </>
    ) : (
      <path d="M50 10 L84 23 V52 C84 72 69 84 50 92 C31 84 16 72 16 52 V23 Z" {...common(p)} />
    ),

  crossFold: (p) =>
    p.solid ? (
      <>
        <rect x="38" y="12" width="24" height="76" fill={p.c1} />
        <rect x="12" y="38" width="76" height="24" fill={p.c2} opacity={0.85} />
      </>
    ) : (
      <path d="M38 12 H62 V38 H88 V62 H62 V88 H38 V62 H12 V38 H38 Z" {...common(p)} />
    ),

  pageFold: (p) =>
    p.solid ? (
      <>
        <path d="M20 12 H62 L80 32 V88 H20 Z" fill={p.c1} />
        <path d="M62 12 L80 32 H62 Z" fill={p.c2} />
      </>
    ) : (
      <path d="M22 14 H62 L78 32 V86 H22 Z M62 14 V32 H78" {...common(p)} />
    ),

  bagFold: (p) =>
    p.solid ? (
      <>
        <path d="M18 34 H82 L76 90 H24 Z" fill={p.c1} />
        <path d="M36 34 V26 A14 14 0 0 1 64 26 V34" stroke={p.c2} strokeWidth={p.sw * 1.2} fill="none" strokeLinecap={p.cap} />
      </>
    ) : (
      <path d="M20 34 H80 L74 88 H26 Z M36 34 V26 A14 14 0 0 1 64 26 V34" {...common(p)} />
    ),

  brush: (p) => (
    <path
      d="M14 74 C30 34 44 22 58 26 C70 30 66 46 52 52 C38 58 30 68 40 76 C50 84 72 78 88 58"
      fill="none"
      stroke={p.c1}
      strokeWidth={p.sw * 1.7}
      strokeLinecap="round"
    />
  ),
};

/* ------------------------------- constructions --------------------------- */

function Frame({ shape, color, sw, solid }: { shape: MarkSpec['frame']; color: string; sw: number; solid: boolean }) {
  const props = solid ? { fill: color, stroke: 'none' } : { fill: 'none', stroke: color, strokeWidth: sw };
  switch (shape) {
    case 'circle':
      return <circle cx="50" cy="50" r={solid ? 50 : 47} {...props} />;
    case 'square':
      return <rect x={solid ? 0 : 4} y={solid ? 0 : 4} width={solid ? 100 : 92} height={solid ? 100 : 92} rx={10} {...props} />;
    case 'hex':
      return <path d="M50 2 L92 26 V74 L50 98 L8 74 V26 Z" {...props} />;
    case 'shield':
      return <path d="M50 2 L94 18 V52 C94 76 74 90 50 98 C26 90 6 76 6 52 V18 Z" {...props} />;
    default:
      return null;
  }
}

/**
 * Monogram construction.
 *
 * Deliberately not "a letter placed in a circle": the two initials are drawn
 * overlapping on a shared optical centre, the second one knocked back and
 * clipped by a drawn counter, with a constructed bar tying them together.
 */
function Monogram({ spec, c1, c2, sw }: { spec: MarkSpec; c1: string; c2: string; sw: number }) {
  const [a, b] = [spec.letters[0] ?? 'A', spec.letters[1] ?? ''];
  const heavy = spec.fill !== 'stroke';

  return (
    <>
      <text
        x={b ? 36 : 50}
        y="72"
        textAnchor="middle"
        fontSize="72"
        fontWeight="800"
        fontFamily="inherit"
        fill={heavy ? c1 : 'none'}
        stroke={heavy ? 'none' : c1}
        strokeWidth={sw}
      >
        {a}
      </text>
      {b && (
        <text
          x="66"
          y="72"
          textAnchor="middle"
          fontSize="72"
          fontWeight="800"
          fontFamily="inherit"
          fill={heavy ? c2 : 'none'}
          stroke={heavy ? 'none' : c2}
          strokeWidth={sw}
          opacity={0.9}
        >
          {b}
        </text>
      )}
      {/* Constructed tie-bar: what turns two letters into one drawn mark. */}
      <rect x={b ? 22 : 32} y={54} width={b ? 58 : 36} height={sw * 1.3} fill={c1} />
      <path d={`M${b ? 22 : 32} 20 H${b ? 80 : 68}`} stroke={c2} strokeWidth={sw} strokeLinecap={spec.cap} />
    </>
  );
}

/* --------------------------------- public -------------------------------- */

export function LogoGlyph({
  spec,
  c1,
  c2,
  bg,
  size = 160,
}: {
  spec: MarkSpec;
  c1: string;
  c2: string;
  bg: string;
  size?: number;
}) {
  const sw = 3 + spec.weight * 11;
  const solid = spec.fill === 'solid' || (spec.fill === 'mixed' && true);
  const motif = MOTIFS[spec.motif] ?? MOTIFS.arcSweep;
  const clipId = `cut-${spec.motif}-${Math.round(spec.weight * 1000)}`;

  const props: MotifProps = { c1, c2, sw, solid, count: spec.count, cap: spec.cap };

  if (spec.construction === 'negative') {
    // The motif is punched out of a solid field: the shape reads as the gap.
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
        <defs>
          <mask id={clipId}>
            <rect x="0" y="0" width="100" height="100" fill="#fff" />
            <g transform={`rotate(${spec.rotation} 50 50) scale(0.62) translate(31 31)`}>
              {MOTIFS[spec.motif]?.({ ...props, c1: '#000', c2: '#000', solid: true })}
            </g>
          </mask>
        </defs>
        <g mask={`url(#${clipId})`}>
          <Frame shape={spec.frame === 'none' ? 'circle' : spec.frame} color={c1} sw={sw} solid />
        </g>
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {spec.frame !== 'none' && <Frame shape={spec.frame} color={spec.construction === 'enclosed' ? c2 : c1} sw={sw * 0.8} solid={false} />}
      <g transform={`rotate(${spec.rotation} 50 50)${spec.frame !== 'none' ? ' scale(0.68) translate(23 23)' : ''}`}>
        {spec.construction === 'monogram' ? (
          <Monogram spec={spec} c1={c1} c2={c2} sw={sw} />
        ) : (
          motif(props)
        )}
      </g>
      {/* A wordmark carries no separate symbol — the type is the mark. */}
      {spec.construction === 'letterform' && <rect x="8" y="86" width="84" height={sw * 0.8} fill={c2} />}
      <rect x="0" y="0" width="0" height="0" fill={bg} />
    </svg>
  );
}
