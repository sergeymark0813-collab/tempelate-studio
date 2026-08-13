import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { studio } from '../data/studio';
import { cn } from '../lib/cn';
import { useT } from '../lib/i18n';
import BrandMark from './BrandMark';
import LanguageSelector from './LanguageSelector';

export default function TopBar({
  left,
  right,
  className,
}: {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  const t = useT();

  return (
    <header
      className={cn(
        'z-30 flex h-16 shrink-0 items-center gap-2 border-b border-white/8 bg-shell-900/85 px-3 backdrop-blur-xl sm:gap-4 sm:px-6',
        className,
      )}
    >
      <Link
        to="/"
        aria-label={`${studio.brand} — ${t('nav.home')}`}
        className="focus-ring group flex shrink-0 items-center gap-2.5 rounded-lg sm:gap-3"
      >
        {/* Sized to actually be seen: the mark is the only branding on the page. */}
        <BrandMark
          size={36}
          className="shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
        />
        {/*
          The wordmark is the first thing to go on a phone: with it, the mark,
          the language switch and two nav links, the row was 501px wide inside a
          375px header. The mark alone still identifies the product.
        */}
        <span className="font-display hidden text-[17px] font-semibold tracking-tight sm:block">
          {studio.brand}
        </span>
      </Link>

      {left && <div className="min-w-0 flex-1">{left}</div>}
      {!left && <div className="flex-1" />}

      <LanguageSelector />
      {right}
    </header>
  );
}
