import { Link } from 'react-router-dom';
import { studio } from '../data/studio';
import { useT } from '../lib/i18n';
import { cn } from '../lib/cn';

/*
  Carries the privacy link, which AdSense requires to be reachable from every
  page — that is the reason this exists rather than styling alone.
*/
export default function SiteFooter({ className }: { className?: string }) {
  const t = useT();

  return (
    <footer className={cn('border-t border-white/8', className)}>
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
