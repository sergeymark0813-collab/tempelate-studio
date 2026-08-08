import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** How far outside the viewport to start mounting. */
  rootMargin?: string;
  /**
   * Safety net: mount anyway after this long. `IntersectionObserver` only
   * reports while the page is actually being composited, so in a background
   * tab (or a hidden preview pane) it may never fire — and the gallery would
   * sit on skeletons forever.
   */
  fallbackMs?: number;
}

/**
 * Fires once when the element first approaches the viewport. Used to defer
 * mounting gallery previews — 15 full templates at once would be wasteful.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '300px',
  fallbackMs = 1500,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const el = ref.current;

    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setSeen(true);
      },
      { rootMargin },
    );
    observer.observe(el);

    const timer = window.setTimeout(() => setSeen(true), fallbackMs);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [rootMargin, fallbackMs, seen]);

  return { ref, seen };
}
