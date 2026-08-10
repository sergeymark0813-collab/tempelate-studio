import { useMemo } from 'react';
import { AD_DURATION_SECONDS, AD_PLACEMENT_ON_GENERATE } from '../../lib/ads/config';
import { activeAdFor, dismissAd } from '../../lib/ads/store';
import Advertisement from './Advertisement';

/* ===========================================================================
   The advertisement that opens together with Generate.

   Deliberately decoupled from generation: it is a sibling in the layout, owns
   its own countdown, and knows nothing about whether a design is still being
   built. Closing it, or letting it run out, has no effect on the result — and
   generation finishing has no effect on the ad.
   =========================================================================== */

export default function GenerationAd({ onClose }: { onClose: () => void }) {
  // Resolved once per mount so a schedule rolling over mid-countdown can't
  // swap the creative under the viewer.
  const ad = useMemo(() => activeAdFor(AD_PLACEMENT_ON_GENERATE), []);

  const handleClose = () => {
    if (ad) dismissAd(ad.id);
    onClose();
  };

  if (ad) {
    return (
      <Advertisement
        context="пока идёт генерация"
        title={ad.title}
        text={ad.text}
        image={ad.image || undefined}
        url={ad.url || undefined}
        cta={ad.cta}
        duration={ad.closeDelay}
        onClose={handleClose}
      />
    );
  }

  // No campaign booked. Rather than fake an advertiser, the slot says what it
  // is and points at the place where a real one is created.
  return (
    <Advertisement
      context="пока идёт генерация"
      title="Это рекламное место свободно"
      text="Здесь показывается объявление, пока студия собирает дизайн. Своё можно завести в рекламном кабинете — оно появится в этом блоке по расписанию."
      url={`${window.location.origin}${window.location.pathname}#/ads`}
      cta="Рекламный кабинет"
      duration={AD_DURATION_SECONDS}
      onClose={handleClose}
    />
  );
}
