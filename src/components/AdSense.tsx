import { useEffect, useRef } from 'react';
import { AD_SLOTS, ADSENSE_CLIENT, isAdSenseConfigured, loadAdSense } from '../lib/adsense';

/* ===========================================================================
   A single Google AdSense unit.

   Renders inline, inside the document flow — never fixed and never over the
   working area. With no publisher id or no slot id configured it renders
   nothing, which keeps the layout clean during development.
   =========================================================================== */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export interface AdSenseProps {
  /** Ad unit id from the AdSense dashboard — see `AD_SLOTS`. */
  slot: string;
  /** Responsive by default; `rectangle`/`horizontal`/`vertical` also accepted. */
  format?: string;
  /** Let AdSense pick the height for responsive units. */
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSense({
  slot,
  format = 'auto',
  responsive = true,
  className,
  style,
}: AdSenseProps) {
  const pushed = useRef(false);
  const enabled = isAdSenseConfigured() && slot.length > 0;

  useEffect(() => {
    if (!enabled || pushed.current) return;

    let cancelled = false;
    loadAdSense()
      .then(() => {
        if (cancelled || pushed.current) return;
        // One push per rendered unit; pushing twice makes AdSense throw.
        pushed.current = true;
        (window.adsbygoogle = window.adsbygoogle ?? []).push({});
      })
      .catch(() => {
        // Blocked by an extension or offline — the slot just stays empty.
      });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <ins
      className={`adsbygoogle ${className ?? ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}

export { AD_SLOTS };
