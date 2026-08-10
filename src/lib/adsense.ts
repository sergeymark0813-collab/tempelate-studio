/* ===========================================================================
   Google AdSense — the only advertising system in this project.

   Nothing renders and no script is loaded until a real publisher id is
   supplied through the environment, so the app ships inert rather than with a
   placeholder pretending to be an ad network.

   Setup:
     1. Create `.env.local` (see `.env.example`).
     2. VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
     3. Add the per-unit slot ids issued by AdSense.
   =========================================================================== */

/** Publisher id, e.g. `ca-pub-1234567890123456`. */
export const ADSENSE_CLIENT: string = import.meta.env.VITE_ADSENSE_CLIENT ?? '';

/**
 * Ad unit ids, one per placement in the app. An empty value disables that
 * unit — the component renders nothing at all.
 */
export const AD_SLOTS = {
  studioBottom: import.meta.env.VITE_ADSENSE_SLOT_STUDIO_BOTTOM ?? '',
  galleryTop: import.meta.env.VITE_ADSENSE_SLOT_GALLERY_TOP ?? '',
} as const;

/** AdSense refuses anything that isn't a well-formed publisher id. */
export const isAdSenseConfigured = (): boolean => /^ca-pub-\d{10,}$/.test(ADSENSE_CLIENT);

const SCRIPT_SRC = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

let loading: Promise<void> | null = null;

/** Injects the AdSense loader once per page, and only when configured. */
export function loadAdSense(): Promise<void> {
  if (!isAdSenseConfigured()) return Promise.reject(new Error('AdSense client id is not configured'));
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src^="${SCRIPT_SRC}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `${SCRIPT_SRC}?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('AdSense script failed to load'));
    document.head.appendChild(script);
  });

  return loading;
}
