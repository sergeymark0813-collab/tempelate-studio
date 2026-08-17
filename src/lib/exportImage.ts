import { toCanvas } from 'html-to-image';
import type { FontId } from '../types';
import { fontEmbedCss, fontEmbedCssForSpecs } from './fontEmbed';
import { translate } from './i18n/fallback';

export type ExportFormat = 'png' | 'jpeg';

export const EXPORT_FORMATS: { id: ExportFormat; label: string; ext: string }[] = [
  { id: 'png', label: 'PNG', ext: 'png' },
  { id: 'jpeg', label: 'JPG', ext: 'jpg' },
];

/**
 * Upper bound on the rasterised area. A full desktop page at 2× is ~21 MP,
 * which is fine; unusually long pages get a slightly lower pixel ratio instead
 * of failing on a canvas the browser refuses to allocate.
 */
const MAX_PIXELS = 32_000_000;

const RENDER_TIMEOUT_MS = 60_000;
const ENCODE_TIMEOUT_MS = 20_000;

export interface CaptureOptions {
  format: ExportFormat;
  /** Requested device-pixel multiplier. 2 gives a retina-sharp file. */
  scale?: number;
  /** Painted behind the node — matters for JPG, which has no alpha. */
  background: string;
  /** Which pairing to inline, so exported text keeps the chosen typeface. */
  font?: FontId;
  /** Explicit Google Fonts specs — used by the studio, whose families sit outside `FONTS`. */
  fontSpecs?: string[];
}

/** Rasterises a live DOM node at its natural size. */
export async function captureNode(
  node: HTMLElement,
  { format, scale = 2, background, font, fontSpecs }: CaptureOptions,
): Promise<Blob> {
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  if (!width || !height) throw new Error(translate('result.previewNotReady'));

  const budget = Math.sqrt(MAX_PIXELS / (width * height));
  const pixelRatio = Math.max(1, Math.min(scale, budget));
  const fontEmbedCSS = fontSpecs
    ? await fontEmbedCssForSpecs(fontSpecs)
    : font
      ? await fontEmbedCss(font)
      : '';

  const canvas = await withTimeout(
    toCanvas(node, {
      pixelRatio,
      width,
      height,
      backgroundColor: background,
      fontEmbedCSS,
      // The stage scales the wrapper to fit; capture the node unscaled.
      style: { transform: 'none', transformOrigin: 'top left' },
      filter: (el) => !(el instanceof HTMLElement && el.dataset.exportIgnore === 'true'),
    }),
    RENDER_TIMEOUT_MS,
    translate('result.renderTimeout'),
  );

  return encode(canvas, format === 'png' ? 'image/png' : 'image/jpeg', 0.95);
}

/**
 * `canvas.toBlob` is asynchronous and can stall on very large canvases in
 * throttled tabs, so we race it against the synchronous `toDataURL` path.
 */
async function encode(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  try {
    return await withTimeout(
      new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('empty blob'))),
          mime,
          quality,
        );
      }),
      ENCODE_TIMEOUT_MS,
      'encode timeout',
    );
  } catch {
    return dataUrlToBlob(canvas.toDataURL(mime, quality));
  }
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, payload] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png';
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

/** Hands a blob to the browser as a download. */
export function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Give the download a tick to start before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export const exportFilename = (parts: string[], ext: string): string =>
  `${parts.filter(Boolean).join('-').replace(/[^\w.-]+/g, '-').toLowerCase()}.${ext}`;
