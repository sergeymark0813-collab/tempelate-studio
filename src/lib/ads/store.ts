import type { Ad, AdDraft, AdPlacement } from './types';
import { statusOf } from './types';

/* ===========================================================================
   Campaign storage.

   Browser-local on purpose: there is no ad server, and pretending otherwise
   would be worse than saying so. Every read is defensive — a hand-edited or
   half-written payload must never take the app down.
   =========================================================================== */

const KEY = 'template-studio:ads';
/** Dismissals live for the tab only, so a closed ad returns on the next visit. */
const DISMISS_KEY = 'template-studio:ads:dismissed';

type Listener = () => void;
const listeners = new Set<Listener>();

/** Subscribe to campaign changes — lets slots update the moment one is saved. */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const emit = () => listeners.forEach((listener) => listener());

function isAd(value: unknown): value is Ad {
  if (!value || typeof value !== 'object') return false;
  const ad = value as Partial<Ad>;
  return (
    typeof ad.id === 'string' &&
    typeof ad.title === 'string' &&
    typeof ad.placement === 'string' &&
    typeof ad.startAt === 'string' &&
    typeof ad.endAt === 'string'
  );
}

export function listAds(): Ad[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Anything malformed is dropped rather than crashing the render.
    return parsed.filter(isAd).map((ad) => ({ ...ad, closeDelay: Number(ad.closeDelay) || 0 }));
  } catch {
    return [];
  }
}

function persist(ads: Ad[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(ads));
    emit();
    return true;
  } catch {
    // Quota exceeded (usually a large image) or private mode.
    return false;
  }
}

export function saveAd(draft: AdDraft, id?: string): { ok: boolean; ad?: Ad; error?: string } {
  const ads = listAds();

  const ad: Ad = id
    ? { ...draft, id, createdAt: ads.find((entry) => entry.id === id)?.createdAt ?? new Date().toISOString() }
    : { ...draft, id: `ad-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, createdAt: new Date().toISOString() };

  const next = id ? ads.map((entry) => (entry.id === id ? ad : entry)) : [ad, ...ads];

  if (!persist(next)) {
    return {
      ok: false,
      error:
        'Не удалось сохранить: браузер отказал в записи. Чаще всего причина — слишком большое изображение или приватный режим.',
    };
  }
  return { ok: true, ad };
}

export function deleteAd(id: string): boolean {
  return persist(listAds().filter((ad) => ad.id !== id));
}

export function toggleAd(id: string): boolean {
  return persist(listAds().map((ad) => (ad.id === id ? { ...ad, enabled: !ad.enabled } : ad)));
}

/* ------------------------------- dismissals ------------------------------ */

function dismissed(): string[] {
  try {
    const raw = sessionStorage.getItem(DISMISS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function dismissAd(id: string): void {
  try {
    sessionStorage.setItem(DISMISS_KEY, JSON.stringify([...new Set([...dismissed(), id])]));
    emit();
  } catch {
    // Closing still works for this render; it just won't survive navigation.
  }
}

export const isDismissed = (id: string): boolean => dismissed().includes(id);

/* --------------------------------- lookup -------------------------------- */

/**
 * The ad to show in a slot right now: enabled, inside its schedule, not
 * dismissed. Expired campaigns are never returned, which is what makes the
 * end date real rather than decorative.
 */
export function activeAdFor(placement: AdPlacement, now = Date.now()): Ad | null {
  const candidates = listAds().filter(
    (ad) => ad.placement === placement && statusOf(ad, now) === 'live' && !isDismissed(ad.id),
  );
  if (candidates.length === 0) return null;

  // Oldest first, so a long-running campaign isn't starved by newer ones.
  return candidates.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))[0];
}

/** `datetime-local` input value for a Date. */
export function toLocalInput(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
