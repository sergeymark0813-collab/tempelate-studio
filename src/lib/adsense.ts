/* ===========================================================================
   Google AdSense — the only advertising system in this project.

   The script loads lazily and only on a route that actually renders a unit —
   never from index.html, so a page with no ad on it makes no request to Google.

   To point this at a different account, override the ids in `.env.local`
   (see `.env.example`); the defaults below are used when nothing is set.
   =========================================================================== */

/*
  Neither id is a secret. AdSense prints the publisher id and the slot id into
  the markup of every page that shows an ad, so both are readable with View
  Source on any site running it. Keeping them only in environment variables
  bought no privacy and cost a real failure: the Vercel dashboard never got the
  variables, so production quietly shipped without a publisher id and no ad
  could ever render. They are defaults now, and the env vars still win when set.
*/
const DEFAULT_CLIENT = 'ca-pub-4525460186750429';

/** The one unit created so far. Both placements point at it — see AD_SLOTS. */
const DEFAULT_SLOT = '7230761902';

/** Publisher id, e.g. `ca-pub-1234567890123456`. */
export const ADSENSE_CLIENT: string = import.meta.env.VITE_ADSENSE_CLIENT || DEFAULT_CLIENT;

/**
 * Ad unit ids, one per placement in the app. An empty value disables that
 * unit — the component renders nothing at all.
 *
 * `siteBottom` is rendered by SiteFooter, so it appears once on every page
 * carrying that footer. The catalog has its own placement above the grid and
 * deliberately does not render SiteFooter: one unit twice on a single page is
 * the thing to avoid. Both ids point at the same unit today; separate ones
 * would only be for telling the placements apart in AdSense reporting.
 */
export const AD_SLOTS = {
  siteBottom: import.meta.env.VITE_ADSENSE_SLOT_SITE_BOTTOM || DEFAULT_SLOT,
  galleryTop: import.meta.env.VITE_ADSENSE_SLOT_GALLERY_TOP || DEFAULT_SLOT,
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
