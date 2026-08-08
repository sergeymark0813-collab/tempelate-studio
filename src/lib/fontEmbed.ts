import type { FontId } from '../types';
import { getFont } from './fonts';

/**
 * Webfont inlining for image export.
 *
 * `html-to-image` rasterises through an SVG `<foreignObject>`, which has no
 * access to the document's fonts — they have to be inlined as data URIs. Its
 * built-in helper walks *every* loaded stylesheet and downloads all ~90 faces
 * of the preloaded pairings, which takes the better part of a minute.
 *
 * We instead fetch only the two families the current pairing actually uses, and
 * only the Latin/Cyrillic subsets, which is a handful of already-cached files.
 */

/** Subsets our templates can actually render (Russian + Latin copy). */
const SUBSETS = new Set(['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']);

/** Google's css2 output annotates each `@font-face` with its subset name. */
const FACE_RE = /\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[\s\S]*?\})/g;

const TIMEOUT_MS = 10_000;

const cache = new Map<FontId, Promise<string>>();

/** Resolves to CSS with data-URI `src`, or `''` if anything went wrong. */
export function fontEmbedCss(fontId: FontId): Promise<string> {
  let pending = cache.get(fontId);
  if (!pending) {
    pending = withTimeout(build(getFont(fontId).googleSpecs), TIMEOUT_MS).catch(() => '');
    cache.set(fontId, pending);
  }
  return pending;
}

async function build(specs: string[]): Promise<string> {
  const url = `https://fonts.googleapis.com/css2?${specs
    .map((spec) => `family=${spec.replace(/ /g, '+')}`)
    .join('&')}&display=swap`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Google Fonts responded ${response.status}`);
  const css = await response.text();

  const faces: string[] = [];
  for (const match of css.matchAll(FACE_RE)) {
    if (SUBSETS.has(match[1])) faces.push(match[2]);
  }
  // No subset comments (unexpected format) — fall back to the whole sheet.
  const blocks = faces.length > 0 ? faces : css.match(/@font-face\s*\{[\s\S]*?\}/g) ?? [];

  const inlined = await Promise.all(blocks.map(inlineFace));
  return inlined.join('\n');
}

async function inlineFace(block: string): Promise<string> {
  const match = block.match(/url\((https:\/\/[^)]+)\)/);
  if (!match) return block;
  try {
    const response = await fetch(match[1]);
    if (!response.ok) return '';
    const base64 = toBase64(await response.arrayBuffer());
    return block.replace(match[1], `data:font/woff2;base64,${base64}`);
  } catch {
    return '';
  }
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  // Chunked to stay under the argument limit of String.fromCharCode.
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('font embed timeout')), ms);
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}
