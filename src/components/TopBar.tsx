import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Megaphone } from 'lucide-react';
import { studio } from '../data/studio';
import { cn } from '../lib/cn';

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
      <Link to="/" className="focus-ring flex shrink-0 items-center gap-2.5 rounded-lg">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-400 text-shell-950">
          <Layers size={17} strokeWidth={2.4} />
        </span>
        <span className="font-display text-[15px] font-semibold tracking-tight">{studio.brand}</span>
      </Link>

      {left && <div className="min-w-0 flex-1">{left}</div>}
      {!left && <div className="flex-1" />}

      {/* Present on every page so the advertising area is always one tap away. */}
      <Link
        to="/ads"
        className="focus-ring flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold text-white/60 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
      >
        <Megaphone size={15} />
        <span className="hidden md:inline">Реклама</span>
      </Link>

      {right}
    </header>
  );
}
