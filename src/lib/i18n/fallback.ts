import { DEFAULT_LOCALE, DICTIONARIES, LOCALES, type Locale, type TranslationKey } from './dictionaries';

/* ===========================================================================
   Translation outside React.

   `ErrorBoundary` is a class component and, more importantly, it renders when
   something has already gone wrong — reading context at that moment is exactly
   when it is least safe. It reads the stored locale directly instead, which
   works even if the provider itself is the thing that failed.

   Plain modules with no component around them — the image exporter, for one —
   use `translate` for the same reason: there is no context to read from.
   =========================================================================== */

const STORAGE_KEY = 'template-studio:locale';

function storedLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (LOCALES as readonly string[]).includes(stored ?? '')
      ? (stored as Locale)
      : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

/** Resolves one key against the stored locale, falling back to English. */
export function translate(key: TranslationKey): string {
  return DICTIONARIES[storedLocale()][key] ?? DICTIONARIES.en[key] ?? key;
}

/** Copy for the crash panel, resolved at render time so it follows the locale. */
export function errorFallbackCopy() {
  const dictionary = DICTIONARIES[storedLocale()];
  return {
    title: dictionary['error.title'],
    body: dictionary['error.body'],
    retry: dictionary['error.retry'],
  };
}
