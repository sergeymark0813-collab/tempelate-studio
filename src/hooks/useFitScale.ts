import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Measures a container and returns the scale factor needed to fit
 * `targetWidth` inside it. Templates always render at their true device width;
 * only the visual size changes, which keeps layout (and export) honest.
 *
 * The first measurement happens in a layout effect so a device switch never
 * paints the new width at the previous device's scale.
 */
export function useFitScale(targetWidth: number, { max = 1, gutter = 0 } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(max);

  const fit = (width: number) => {
    const available = Math.max(0, width - gutter);
    const next = Math.min(max, available / targetWidth);
    setScale((prev) => (Math.abs(prev - next) < 0.0005 ? prev : next));
  };

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) fit(el.getBoundingClientRect().width);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `fit` is derived from the args below
  }, [targetWidth, max, gutter]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) fit(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `fit` is derived from the args below
  }, [targetWidth, max, gutter]);

  return { ref, scale };
}
