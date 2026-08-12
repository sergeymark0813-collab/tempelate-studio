import { DICTIONARIES, LOCALES, type Locale } from './dictionaries';

/* ===========================================================================
   Translation outside React.

   `ErrorBoundary` is a class component and, more importantly, it renders when
   something has already gone wrong — reading context at that moment is exactly
   when it is least safe. It reads the stored locale directly instead, which
   works even if the provider itself is the thing that failed.
   =========================================================================== */

const STORAGE_KEY = 'template-studio:locale';

function storedLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (LOCALES as readonly string[]).includes(stored ?? '') ? (stored as Locale) : 'en';
  } catch {
    return 'en';
  }
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
