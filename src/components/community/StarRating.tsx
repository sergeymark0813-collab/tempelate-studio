import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useT } from '../../lib/i18n';

/* ===========================================================================
   Star rating.

   Interactive when the viewer is allowed to rate, static otherwise. The store
   enforces one rating per user per project and refuses ratings on your own
   work — this component only reflects that, it does not decide it.
   =========================================================================== */

export default function StarRating({
  average,
  count,
  mine,
  canRate = false,
  onRate,
  size = 16,
  className,
}: {
  average: number;
  count: number;
  mine?: number | null;
  canRate?: boolean;
  onRate?: (stars: number) => void;
  size?: number;
  className?: string;
}) {
  const t = useT();
  const [hover, setHover] = useState<number | null>(null);

  // While hovering show the prospective score, otherwise your own, otherwise
  // the community average.
  const shown = hover ?? mine ?? average;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="flex items-center gap-0.5"
        role={canRate ? 'radiogroup' : undefined}
        aria-label={canRate ? t('rating.label') : undefined}
        onMouseLeave={() => setHover(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(shown);
          const Wrapper = canRate ? 'button' : 'span';

          return (
            <Wrapper
              key={star}
              {...(canRate
                ? {
                    type: 'button' as const,
                    role: 'radio',
                    'aria-checked': mine === star,
                    'aria-label': t('rating.outOf', { stars: star }),
                    onMouseEnter: () => setHover(star),
                    onClick: () => onRate?.(star),
                    className:
                      'focus-ring rounded transition hover:scale-110 cursor-pointer',
                  }
                : { className: 'inline-flex' })}
            >
              <Star
                size={size}
                className={cn(
                  'transition-colors',
                  filled ? 'text-amber-300' : 'text-white/18',
                )}
                fill={filled ? 'currentColor' : 'none'}
                strokeWidth={filled ? 0 : 1.8}
              />
            </Wrapper>
          );
        })}
      </div>

      <span className="text-[12.5px] text-white/45 tabular-nums">
        {count > 0 ? (
          <>
            <span className="font-semibold text-white/70">{average.toFixed(1)}</span>
            <span className="mx-1 text-white/25">·</span>
            {count}
          </>
        ) : (
          <span className="text-white/30">{t('rating.none')}</span>
        )}
      </span>

      {mine != null && (
        <span className="rounded-full bg-amber-400/12 px-2 py-0.5 text-[11px] text-amber-200/80 ring-1 ring-amber-400/20">
          {t('rating.yours', { stars: mine })}
        </span>
      )}
    </div>
  );
}
