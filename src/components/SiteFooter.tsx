import { Link } from 'react-router-dom';
import { studio } from '../data/studio';
import { useT } from '../lib/i18n';
import { cn } from '../lib/cn';
import AdSense, { AD_SLOTS } from './AdSense';

/*
  Two jobs, both site-wide: the privacy link AdSense requires to be reachable
  from every page, and the ad unit itself.

  Putting the unit here rather than in each page is what keeps it to exactly
  one per page — a second copy of the same unit on one page is the mistake this
  arrangement makes hard to commit. The catalog is the deliberate exception: it
  places its own unit above the grid and does not render this footer.
*/
export default function SiteFooter({ className }: { className?: string }) {
  const t = useT();

  return (
    <footer className={cn('border-t border-white/8', className)}>
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <AdSense slot={AD_SLOTS.siteBottom} />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-7 text-xs text-white/30 sm:flex-row sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} {studio.brand}</span>
        <Link
          to="/privacy"
          className="focus-ring rounded transition hover:text-white/60"
        >
          {t('nav.privacy')}
        </Link>
      </div>
    </footer>
  );
}
