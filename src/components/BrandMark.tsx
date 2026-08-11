import { useId } from 'react';

/* ===========================================================================
   The Template Studio mark.

   Drawn rather than borrowed from an icon set: an empty artboard behind and a
   finished design in front, which is literally what the product does. Built on
   a 32-unit grid so it stays crisp from 20px in the header up to a favicon or
   an app icon.
   =========================================================================== */

export default function BrandMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  // Unique per instance — two marks on one page would otherwise share a
  // gradient id and the second would render with the first one's colours.
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Template Studio"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500, #6366f1)" />
          <stop offset="100%" stopColor="var(--color-accent-400, #34d3c0)" />
        </linearGradient>
      </defs>

      {/* The blank artboard, waiting to be filled. */}
      <rect
        x="2.6"
        y="2.6"
        width="19"
        height="19"
        rx="5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.2"
        opacity="0.5"
      />

      {/* The generated design, offset in front of it. */}
      <rect x="10.4" y="10.4" width="19" height="19" rx="5" fill={`url(#${gradientId})`} />

      {/* Two content lines: the design has something in it. */}
      <rect x="14.4" y="16.4" width="11" height="2.4" rx="1.2" fill="#0b0d13" opacity="0.88" />
      <rect x="14.4" y="21.2" width="6.6" height="2.4" rx="1.2" fill="#0b0d13" opacity="0.6" />
    </svg>
  );
}
