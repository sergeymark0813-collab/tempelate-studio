import { useEffect, useRef, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { AD_DURATION_SECONDS } from '../../lib/ads/config';
import { cn } from '../../lib/cn';

/* ===========================================================================
   The advertisement component.

   One presentational unit used by every slot: the scheduled placements and the
   block that opens alongside Generate. It owns nothing but its own countdown —
   it never touches generation state, never blocks, and renders inline so it
   cannot cover the editor or the result.
   =========================================================================== */

export interface AdvertisementProps {
  title: string;
  text?: string;
  /** Data URL or remote src. Omit for a text-only ad. */
  image?: string;
  url?: string;
  cta?: string;
  /** Seconds before the close control appears. Defaults to the global setting. */
  duration?: number;
  /** Omit to render an ad that cannot be dismissed. */
  onClose?: () => void;
  /** Small line above the title, e.g. «Пока идёт генерация». */
  context?: string;
  className?: string;
}

/**
 * Counts down once a second and stops at zero.
 *
 * Time is measured against a start timestamp rather than accumulated per tick,
 * so a throttled background tab resumes at the correct value instead of drifting.
 */
function useCountdown(seconds: number): number {
  const [left, setLeft] = useState(seconds);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    startedAt.current = Date.now();
    setLeft(seconds);
    if (seconds <= 0) return;

    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
      const remaining = Math.max(0, seconds - elapsed);
      setLeft(remaining);
      if (remaining === 0) window.clearInterval(id);
    }, 250);

    return () => window.clearInterval(id);
  }, [seconds]);

  return left;
}

export default function Advertisement({
  title,
  text,
  image,
  url,
  cta,
  duration = AD_DURATION_SECONDS,
  onClose,
  context,
  className,
}: AdvertisementProps) {
  const left = useCountdown(duration);
  const canClose = left <= 0;

  return (
    <aside
      aria-label="Рекламный блок"
      className={cn(
        'overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.03]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3 py-1.5">
        <span className="truncate text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
          {context ? `Реклама · ${context}` : 'Реклама'}
        </span>

        {onClose &&
          (canClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть рекламу"
              className="focus-ring flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-white/50 transition hover:bg-white/8 hover:text-white"
            >
              Закрыть рекламу <X size={12} />
            </button>
          ) : (
            <span
              aria-live="polite"
              className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/35"
            >
              <span className="hidden sm:inline">Закрыть можно через</span>
              <span className="font-mono font-semibold text-white/60 tabular-nums">{left}</span>
            </span>
          ))}
      </div>

      <a
        href={url || undefined}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className={cn('focus-ring block transition hover:bg-white/[0.03]', !url && 'pointer-events-none')}
      >
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
          {image && (
            <img
              src={image}
              alt=""
              loading="lazy"
              /* Fixed box so decoding can't shift the layout around it. */
              className="h-32 w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-40"
            />
          )}

          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold text-white">{title}</div>
            {text && <p className="mt-1 text-[13px] leading-relaxed text-white/50">{text}</p>}
          </div>

          {url && (
            <span className="flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-white sm:self-center">
              {cta || 'Перейти'} <ExternalLink size={13} />
            </span>
          )}
        </div>
      </a>
    </aside>
  );
}
