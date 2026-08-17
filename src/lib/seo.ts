import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ===========================================================================
   Per-page metadata.

   The document ships with the title and description of the home page baked
   into index.html, so a crawler that never runs JavaScript still gets sensible
   copy. Every route then overwrites them from React, which is what a crawler
   that *does* run JavaScript — and every human sharing a link — ends up with.

   Only one language is declared. The switcher changes the copy in place
   without changing the URL, so there is no second address to point an
   `hreflang` at; claiming otherwise would be a lie to the crawler.
   =========================================================================== */

/** Canonical origin. Apex redirects here, so this is the address to publish. */
export const SITE_URL = 'https://www.temlatestudio.site';

/** Every address worth handing to a crawler, in sitemap order. */
export const INDEXABLE_PATHS = ['/', '/templates', '/community'] as const;

const setMeta = (selector: string, create: () => HTMLElement, value: string, attr = 'content') => {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = create();
    document.head.appendChild(node);
  }
  node.setAttribute(attr, value);
};

/**
 * Writes title, description, canonical and the Open Graph pair for the current
 * route. Runs on every locale change too, since the copy passed in is already
 * translated by the caller.
 */
export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    // Root keeps its trailing slash so the tag matches the one in index.html
    // character for character; two spellings of one address invite Google to
    // pick the wrong one.
    const canonical = `${SITE_URL}${pathname}`;

    setMeta('meta[name="description"]', () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      return el;
    }, description);

    setMeta('link[rel="canonical"]', () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    }, canonical, 'href');

    /* Open Graph — what a link preview in a chat or a post shows. */
    const og: [string, string][] = [
      ['og:title', title],
      ['og:description', description],
      ['og:url', canonical],
      ['og:type', 'website'],
    ];

    for (const [property, value] of og) {
      setMeta(`meta[property="${property}"]`, () => {
        const el = document.createElement('meta');
        el.setAttribute('property', property);
        return el;
      }, value);
    }
  }, [title, description, pathname]);
}
