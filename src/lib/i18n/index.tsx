import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LOCALE, DICTIONARIES, LOCALES, type Locale, type TranslationKey } from './dictionaries';

/* ===========================================================================
   Translation.

   Russian is the default. The browser locale is still never sniffed — that
   would surprise anyone whose system language differs from what they want to
   read — but the fallback had to stop being English: the static HTML each
   address ships with is written in Russian, so an English default meant a
   crawler running JavaScript saw a different language than one that did not,
   and the site targets Russian queries either way.

   Change DEFAULT_LOCALE to move it; nothing else depends on the value.

   The choice persists per device.
   =========================================================================== */

const STORAGE_KEY = 'template-studio:locale';

export type Translate = (key: TranslationKey, vars?: Record<string, string | number>) => string;

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translate;
}

const I18nContext = createContext<I18nValue | null>(null);

const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

function readStored(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStored);

  // The document ships with a hardcoded lang; screen readers and hyphenation
  // need it to match what is actually on screen from the first paint.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode — the choice simply won't survive a reload.
    }
  }, []);

  const t = useCallback<Translate>(
    (key, vars) => {
      // Fall back to English rather than showing a raw key if a string is ever
      // missing from a translation.
      const template = DICTIONARIES[locale][key] ?? DICTIONARIES.en[key] ?? key;
      if (!vars) return template;

      return Object.entries(vars).reduce(
        (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
        template,
      );
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}

/** Shorthand for components that only need to translate. */
export const useT = (): Translate => useI18n().t;

export { LOCALES, LOCALE_NAMES } from './dictionaries';
export type { Locale, TranslationKey } from './dictionaries';
