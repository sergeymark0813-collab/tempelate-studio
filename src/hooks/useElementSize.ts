import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

const read = (el: HTMLElement): Size => ({ width: el.offsetWidth, height: el.offsetHeight });

const same = (a: Size, b: Size) => a.width === b.width && a.height === b.height;

/**
 * Tracks the *unscaled* box of an element. The preview stage needs the natural
 * height of a template to reserve the right amount of space once the node is
 * visually scaled down with a CSS transform (transforms don't affect layout).
 *
 * Measured in a layout effect on **every** render, not only from the observer:
 * switching device changes the template's width and therefore its height in the
 * same commit, and a `ResizeObserver` callback would arrive a frame later — long
 * enough to paint a frame sized for the previous device.
 */
export function useElementSize(ref: RefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const next = read(el);
    setSize((prev) => (same(prev, next) ? prev : next));
  });

  // Late reflows the render pass can't know about: webfont swap, lazy content.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      const next = read(el);
      setSize((prev) => (same(prev, next) ? prev : next));
    };

    const observer = new ResizeObserver(sync);
    observer.observe(el);

    // Webfonts reflow the page after layout has already run, and each template
    // (or a change of pairing) can pull a family that wasn't loaded before.
    // `loadingdone` fires for every such batch; don't rely on the observer alone
    // for it, since observers are throttled in backgrounded tabs.
    const fonts = document.fonts;
    let cancelled = false;
    void fonts?.ready.then(() => {
      if (!cancelled) sync();
    });
    fonts?.addEventListener('loadingdone', sync);

    return () => {
      cancelled = true;
      observer.disconnect();
      fonts?.removeEventListener('loadingdone', sync);
    };
  }, [ref]);

  return size;
}
