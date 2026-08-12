import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { LOCALES, LOCALE_NAMES, useI18n } from '../lib/i18n';
import { cn } from '../lib/cn';

/* ===========================================================================
   Language selector.

   Lives in the top bar on every page. English is preselected; nothing changes
   until the visitor chooses otherwise.
   =========================================================================== */

export default function LanguageSelector() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={t('lang.label')}
        className="focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold text-white/65 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
      >
        <Globe size={15} />
        <span className="hidden sm:inline">{LOCALE_NAMES[locale]}</span>
        <span className="sm:hidden uppercase">{locale}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('lang.label')}
          className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-xl bg-shell-850 py-1 shadow-2xl ring-1 ring-white/12"
        >
          {LOCALES.map((entry) => (
            <li key={entry}>
              <button
                type="button"
                role="option"
                aria-selected={entry === locale}
                onClick={() => {
                  setLocale(entry);
                  setOpen(false);
                }}
                className={cn(
                  'focus-ring flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[13.5px] transition',
                  entry === locale ? 'text-white' : 'text-white/60 hover:bg-white/6 hover:text-white',
                )}
              >
                {LOCALE_NAMES[entry]}
                {entry === locale && <Check size={14} className="text-brand-400" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
