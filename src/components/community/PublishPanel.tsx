import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Globe, Users } from 'lucide-react';
import type { Project } from '../../lib/studio/types';
import { community } from '../../lib/community/store';
import { cn } from '../../lib/cn';
import { useT } from '../../lib/i18n';

/* ===========================================================================
   Publishing a generated design to the community.

   The description is required and enforced twice: the button stays disabled
   without one, and the store refuses the write regardless. It is stored with
   the project, so the gallery shows the author's own words rather than a
   machine-written summary.
   =========================================================================== */

const ERROR_KEYS: Record<string, 'publish.error.description' | 'publish.error.title' | 'publish.error.tooLarge' | 'publish.error.storage'> = {
  'description-required': 'publish.error.description',
  'title-required': 'publish.error.title',
  'too-large': 'publish.error.tooLarge',
  'storage-failed': 'publish.error.storage',
};

export default function PublishPanel({ project }: { project: Project }) {
  const t = useT();
  const [title, setTitle] = useState(project.name);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const user = community.currentUser();
  const missingDescription = description.trim().length === 0;

  const publish = () => {
    setTouched(true);
    const result = community.publish({ title, description, project });

    if (!result.ok) {
      setError(t(ERROR_KEYS[result.error] ?? 'publish.error.storage'));
      return;
    }
    setError('');
    setPublishedId(result.id);
  };

  if (publishedId) {
    return (
      <section className="panel px-5 py-6 sm:px-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-300" />
          <div>
            <h2 className="font-display text-[15px] font-semibold tracking-tight">
              {t('publish.done.title')}
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">
{t('publish.done.body')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to={`/community/${publishedId}`}
                className="focus-ring rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
              >
                {t('publish.done.open')}
              </Link>
              <Link
                to="/community"
                className="focus-ring rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white/65 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
              >
                {t('publish.done.all')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel overflow-hidden">
      <header className="flex items-start gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/6 text-brand-400 ring-1 ring-white/10">
          <Globe size={16} />
        </span>
        <div>
          <h2 className="font-display text-[15px] font-semibold tracking-tight">
            {t('publish.title')}
          </h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white/40">
{t('publish.subtitle')}
          </p>
        </div>
      </header>

      <div className="grid gap-4 px-5 py-5 sm:px-6">
        <label className="block">
          <span className="text-[13px] font-medium text-white/80">{t('publish.name')}</span>
          <input
            value={title}
            maxLength={80}
            onChange={(event) => setTitle(event.target.value)}
            className="focus-ring mt-2 w-full rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-sm text-white ring-1 ring-white/10 outline-none transition hover:ring-white/20 focus:ring-brand-400/60"
          />
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between">
            <span className="text-[13px] font-medium text-white/80">
              {t('publish.description')} <span className="text-rose-300">*</span>
            </span>
            <span className="font-mono text-[11px] text-white/25">{description.length}/600</span>
          </span>
          <span className="mt-0.5 block text-xs text-white/35">
            {t('publish.descriptionHint')}
          </span>
          <textarea
            value={description}
            rows={4}
            maxLength={600}
            onBlur={() => setTouched(true)}
            onChange={(event) => {
              setDescription(event.target.value);
              if (error) setError('');
            }}
            placeholder={t('publish.descriptionPlaceholder')}
            className={cn(
              'focus-ring mt-2 w-full resize-none rounded-xl bg-white/[0.05] px-3.5 py-3 text-sm leading-relaxed text-white ring-1 outline-none transition placeholder:text-white/25',
              touched && missingDescription
                ? 'ring-rose-400/60'
                : 'ring-white/10 hover:ring-white/20 focus:ring-brand-400/60',
            )}
          />
        </label>

        {touched && missingDescription && !error && (
          <p className="rounded-xl bg-rose-500/10 px-3.5 py-2.5 text-[13px] text-rose-200 ring-1 ring-rose-400/25">
            {t('publish.error.description')}
          </p>
        )}
        {error && (
          <p className="rounded-xl bg-rose-500/10 px-3.5 py-2.5 text-[13px] text-rose-200 ring-1 ring-rose-400/25">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[12.5px] text-white/40">
            <Users size={14} />
            {t('publish.author')}: <span className="text-white/70">{user.name}</span>
          </span>

          <button
            type="button"
            onClick={publish}
            disabled={missingDescription}
            title={missingDescription ? t('publish.error.description') : undefined}
            className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-40"
          >
            <Globe size={15} /> {t('publish.submit')}
          </button>
        </div>

        <p className="text-[12px] leading-relaxed text-white/30">
{t('publish.local')}
        </p>
      </div>
    </section>
  );
}
