import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { studio } from '../data/studio';
import { cn } from '../lib/cn';
import BrandMark from './BrandMark';

export default function TopBar({
  left,
  right,
  className,
}: {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'z-30 flex h-16 shrink-0 items-center gap-4 border-b border-white/8 bg-shell-900/85 px-4 backdrop-blur-xl sm:px-6',
        className,
      )}
    >
      <Link
        to="/"
        aria-label={`${studio.brand} — на главную`}
        className="focus-ring group flex shrink-0 items-center gap-3 rounded-lg"
      >
        {/* Sized to actually be seen: the mark is the only branding on the page. */}
        <BrandMark
          size={36}
          className="shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
        />
        <span className="font-display text-[17px] font-semibold tracking-tight">{studio.brand}</span>
      </Link>

      {left && <div className="min-w-0 flex-1">{left}</div>}
      {!left && <div className="flex-1" />}

      {/*
        No permanent advertising control here by design: the ad system opens by
        itself at the point in the flow where it belongs (alongside Generate).
        The manager stays reachable at #/ads.
      */}
      {right}
    </header>
  );
}
