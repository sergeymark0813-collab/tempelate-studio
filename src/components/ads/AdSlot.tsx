import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import type { Ad, AdPlacement } from '../../lib/ads/types';
import { activeAdFor, dismissAd, subscribe } from '../../lib/ads/store';
import { cn } from '../../lib/cn';

/* ===========================================================================
   One advertising slot.

   Renders inline, inside the document flow — never fixed, never over the top of
   navigation, forms, the generated result or the export controls. When no
   campaign is scheduled for this placement the component renders nothing at
   all, so an empty slot costs no space.
   =========================================================================== */

/** Ticks once a second and cleans itself up; returns seconds left. */
function useCountdown(seconds: number, key: string): number {
  const [left, setLeft] = useState(seconds);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    // Restart cleanly whenever the ad (or its delay) changes.
    startedAt.current = Date.now();
    setLeft(seconds);

    if (seconds <= 0) return;

    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt.current) / 1000);
      const remaining = Math.max(0, seconds - elapsed);
      setLeft(remaining);
      // Stop the timer the moment it reaches zero rather than running forever.
      if (remaining === 0) window.clearInterval(id);
    }, 250);

    return () => window.clearInterval(id);
  }, [seconds, key]);

  return left;
}

function AdCard({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  const left = useCountdown(ad.closeDelay, ad.id);
  const closable = left <= 0;
  const hasImage = ad.image.length > 0;

  return (
    <aside
      aria-label="Рекламный блок"
      className="relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.03]"
    >
      {/* Label + close control share one row so nothing sits over the creative. */}
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3 py-1.5">
        <span className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
          Реклама
        </span>

        {closable ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть рекламу"
            className="focus-ring flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-white/50 transition hover:bg-white/8 hover:text-white"
          >
            Закрыть <X size={12} />
          </button>
        ) : (
          <span
            aria-live="polite"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/35 tabular-nums"
          >
            Закрыть можно через
            <span className="font-mono font-semibold text-white/60">{left}</span>
          </span>
        )}
      </div>

      <a
        href={ad.url || undefined}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className={cn(
          'focus-ring block transition hover:bg-white/[0.03]',
          !ad.url && 'pointer-events-none',
        )}
      >
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
          {hasImage && (
            <img
              src={ad.image}
              alt=""
              loading="lazy"
              /* Fixed box: the image can't shift the layout as it decodes. */
              className="h-32 w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-40"
            />
          )}

          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold text-white">{ad.title}</div>
            {ad.text && (
              <p className="mt-1 text-[13px] leading-relaxed text-white/50">{ad.text}</p>
            )}
          </div>

          {ad.url && (
            <span className="flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-white sm:self-center">
              {ad.cta || 'Перейти'} <ExternalLink size={13} />
            </span>
          )}
        </div>
      </a>
    </aside>
  );
}

export default function AdSlot({
  placement,
  className,
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const [ad, setAd] = useState<Ad | null>(null);

  const refresh = useCallback(() => setAd(activeAdFor(placement)), [placement]);

  useEffect(() => {
    refresh();
    // Re-evaluate when campaigns change and as schedules roll over.
    const unsubscribe = subscribe(refresh);
    const id = window.setInterval(refresh, 30_000);
    return () => {
      unsubscribe();
      window.clearInterval(id);
    };
  }, [refresh]);

  if (!ad) return null;

  return (
    <div className={className}>
      {/*
        Keyed by ad id: when the slot rotates to a different campaign the card
        must remount. Without this it keeps the previous ad's countdown state and
        a fresh ad inherits an already-expired timer — the close button would
        appear instantly.
      */}
      <AdCard
        key={ad.id}
        ad={ad}
        onClose={() => {
          dismissAd(ad.id);
          setAd(null);
        }}
      />
    </div>
  );
}
