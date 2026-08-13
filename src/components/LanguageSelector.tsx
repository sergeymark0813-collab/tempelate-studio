import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { LOCALES, LOCALE_NAMES, useI18n } from '../lib/i18n';
import { cn } from '../lib/cn';

/* ===========================================================================
   Language selector.

   Lives in the top bar on every page. English is preselected; nothing changes
   until the visitor chooses otherwise.
   =========================================================================== */

/** Menu width in px — kept in sync with the `w-44` class below. */
const MENU_WIDTH = 176;
/** Minimum breathing room between the menu and the edge of the screen. */
const EDGE_MARGIN = 12;

export default function LanguageSelector() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<'left' | 'right'>('right');
  const root = useRef<HTMLDivElement>(null);

  /*
    The trigger sits in a different place on every page — 64px from the left in
    the studio, 191px in the catalog — so no fixed anchor works everywhere.
    Right-aligning pushed the menu to -46px on a 320px screen; left-aligning
    pushed it to 367px on the catalog. The side is therefore chosen on open,
    from the space actually available.
  */
  useEffect(() => {
    if (!open || !root.current) return;

    const rect = root.current.getBoundingClientRect();
    const fitsRightAligned = rect.right - MENU_WIDTH >= EDGE_MARGIN;
    const fitsLeftAligned = rect.left + MENU_WIDTH <= window.innerWidth - EDGE_MARGIN;

    // Prefer right alignment; fall back to left only when right would clip.
    setAlign(fitsRightAligned || !fitsLeftAligned ? 'right' : 'left');
  }, [open]);

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
          className={cn(
            'absolute z-40 mt-2 w-44 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl bg-shell-850 py-1 shadow-2xl ring-1 ring-white/12',
            align === 'right' ? 'right-0' : 'left-0',
          )}
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
