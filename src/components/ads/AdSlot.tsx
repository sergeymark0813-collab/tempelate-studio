import { useCallback, useEffect, useState } from 'react';
import type { Ad, AdPlacement } from '../../lib/ads/types';
import { activeAdFor, dismissAd, subscribe } from '../../lib/ads/store';
import Advertisement from './Advertisement';

/* ===========================================================================
   A scheduled advertising slot.

   Renders inline, inside the document flow — never fixed, never over the top of
   navigation, forms, the generated result or the export controls. With no
   campaign scheduled for this placement it renders nothing, so an empty slot
   costs no space.
   =========================================================================== */

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
        Keyed by ad id: rotating to another campaign must remount the card.
        Without it the new ad inherits the previous countdown and its close
        button appears immediately.
      */}
      <Advertisement
        key={ad.id}
        title={ad.title}
        text={ad.text}
        image={ad.image || undefined}
        url={ad.url || undefined}
        cta={ad.cta}
        duration={ad.closeDelay}
        onClose={() => {
          dismissAd(ad.id);
          setAd(null);
        }}
      />
    </div>
  );
}
