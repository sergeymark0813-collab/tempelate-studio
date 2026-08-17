import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Users } from 'lucide-react';
import type { PublishedProject } from '../lib/community/types';
import { community } from '../lib/community/store';
import { useInView } from '../hooks/useInView';
import { useI18n, useT } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';
import { useFitScale } from '../hooks/useFitScale';
import TopBar from '../components/TopBar';
import FrameView from '../components/studio/FrameView';
import StarRating from '../components/community/StarRating';
import ErrorBoundary from '../components/ErrorBoundary';

/* ===========================================================================
   The community gallery.

   Cards render the real design, not a screenshot: a published project keeps
   its full structure, so the thumbnail is the same renderer the studio uses.
   =========================================================================== */

const THUMB_WIDTH = 1280;

/** Live thumbnail of a published design, mounted only once scrolled near. */
function Thumb({ entry }: { entry: PublishedProject }) {
  const { ref, scale } = useFitScale(THUMB_WIDTH);
  const frame = entry.project.frames[0];

  return (
    <div ref={ref} className="h-full w-full overflow-hidden" aria-hidden>
      <div
        className="pointer-events-none origin-top-left select-none"
        style={{ width: THUMB_WIDTH, transform: `scale(${scale})` }}
      >
        <FrameView frame={frame} ds={entry.project.ds} deviceWidth={THUMB_WIDTH} />
      </div>
    </div>
  );
}

function useCommunity() {
  const [version, setVersion] = useState(0);
  useEffect(() => community.subscribe(() => setVersion((v) => v + 1)), []);
  return version;
}

/* --------------------------------- card ---------------------------------- */

function ProjectCard({ entry, index }: { entry: PublishedProject; index: number }) {
  const { locale } = useI18n();
  const { ref, seen } = useInView<HTMLDivElement>({ fallbackMs: index < 4 ? 0 : 1200 });
  const stats = community.statsFor(entry.id);

  return (
    <Link
      to={`/community/${entry.id}`}
      className="focus-ring group fade-up flex flex-col overflow-hidden rounded-2xl bg-shell-850 ring-1 ring-white/8 transition duration-300 hover:-translate-y-1 hover:ring-white/20"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div ref={ref} className="relative aspect-16/11 overflow-hidden bg-shell-800">
        {seen ? <Thumb entry={entry} /> : <div className="h-full w-full animate-pulse bg-white/[0.03]" />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-shell-850/80 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-white/8 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/6 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/55 uppercase">
            {entry.productLabel}
          </span>
          <time className="text-[11px] text-white/30" dateTime={entry.publishedAt}>
            {new Date(entry.publishedAt).toLocaleDateString(locale)}
          </time>
        </div>

        <h3 className="font-display text-lg font-semibold tracking-tight">{entry.title}</h3>
        <p className="line-clamp-3 text-[13.5px] leading-relaxed text-white/45">{entry.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <span className="text-[12.5px] text-white/40">{entry.authorName}</span>
          <StarRating average={stats.average} count={stats.count} mine={stats.mine} size={14} />
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------- detail --------------------------------- */

function Detail({ entry }: { entry: PublishedProject }) {
  const { t, locale } = useI18n();
  useCommunity();
  const stats = community.statsFor(entry.id);
  const user = community.currentUser();
  const isAuthor = entry.authorId === user.id;
  const captureRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  const frame = entry.project.frames[Math.min(frameIndex, entry.project.frames.length - 1)];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <Link
        to="/community"
        className="focus-ring inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-white/50 transition hover:text-white"
      >
        <ArrowLeft size={15} /> {t('community.allWork')}
      </Link>

      <header className="panel mt-4 px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-medium text-brand-400">{entry.productLabel}</span>
            <h1 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {entry.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/55">
              {entry.description}
            </p>
            <p className="mt-4 text-[13px] text-white/40">
              {t('community.author')}: <span className="text-white/70">{entry.authorName}</span>
              <span className="mx-2 text-white/20">·</span>
              {new Date(entry.publishedAt).toLocaleDateString(locale)}
            </p>
          </div>

          {isAuthor && (
            <button
              type="button"
              onClick={() => community.unpublish(entry.id)}
              className="focus-ring flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-rose-300/70 ring-1 ring-rose-400/20 transition hover:bg-rose-500/10 hover:text-rose-200"
            >
              <Trash2 size={14} /> {t('community.unpublish')}
            </button>
          )}
        </div>

        <div className="mt-5 border-t border-white/8 pt-4">
          <StarRating
            average={stats.average}
            count={stats.count}
            mine={stats.mine}
            canRate={stats.canRate}
            onRate={(stars) => community.rate(entry.id, stars)}
            size={22}
          />
          <p className="mt-2 text-[12px] text-white/30">
            {stats.canRate
              ? t('rating.rule')
              : t('rating.ownWork')}
          </p>
        </div>
      </header>

      <section className="panel mt-5 overflow-hidden">
        {entry.project.frames.length > 1 && (
          <div className="flex flex-wrap gap-1.5 border-b border-white/8 px-5 py-3">
            {entry.project.frames.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFrameIndex(index)}
                className={`focus-ring rounded-lg px-3 py-1.5 text-[12.5px] font-medium ring-1 transition ${
                  index === frameIndex
                    ? 'bg-white/10 text-white ring-white/25'
                    : 'text-white/45 ring-white/8 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        <div className="scroll-slim stage-grid max-h-[680px] overflow-y-auto bg-shell-950 p-4">
          <ErrorBoundary title={t('community.renderError')}>
            <FrameView frame={frame} ds={entry.project.ds} nodeRef={captureRef} />
          </ErrorBoundary>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- page ---------------------------------- */

export default function CommunityPage() {
  const t = useT();
  usePageMeta(t('meta.community.title'), t('meta.community.description'));

  const { id } = useParams<{ id: string }>();
  useCommunity();

  const [name, setName] = useState(() => community.currentUser().name);
  const [editing, setEditing] = useState(false);

  const save = useCallback(() => {
    community.renameUser(name);
    setEditing(false);
  }, [name]);

  const entry = id ? community.get(id) : null;
  const projects = community.list();

  return (
    <div className="min-h-dvh">
      <TopBar
        className="sticky top-0"
        right={
          <Link
            to="/"
            className="focus-ring rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
          >
            В студию
          </Link>
        }
      />

      {id && !entry && (
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <h1 className="font-display text-xl font-semibold">{t('community.notFound')}</h1>
          <p className="mt-2 text-sm text-white/45">{t('community.notFoundHint')}</p>
          <Link
            to="/community"
            className="focus-ring mt-5 inline-block rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
          >
            {t('community.allWork')}
          </Link>
        </div>
      )}

      {entry && <Detail entry={entry} />}

      {!id && (
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-xs font-medium text-white/65 ring-1 ring-white/10">
                <Users size={13} className="text-accent-400" />
                {t('community.badge')}
              </span>
              <h1 className="font-display mt-5 text-[1.9rem] leading-tight font-bold tracking-tight sm:text-4xl">
                {t('community.title')}
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/50">
{t('community.intro')}
              </p>
            </div>

            {/* Device-local identity, editable — no accounts exist yet. */}
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <input
                    value={name}
                    maxLength={40}
                    autoFocus
                    onChange={(event) => setName(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && save()}
                    className="focus-ring w-40 rounded-xl bg-white/[0.05] px-3 py-2 text-[13px] text-white ring-1 ring-white/10 outline-none"
                  />
                  <button
                    type="button"
                    onClick={save}
                    className="focus-ring rounded-xl bg-brand-500 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-600"
                  >
                    {t('community.save')}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="focus-ring flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] text-white/55 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
                >
                  <Pencil size={13} /> {t('community.you')}: {community.currentUser().name}
                </button>
              )}
            </div>
          </header>

          {projects.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-white/12 py-20 text-center">
              <p className="text-white/45">{t('community.empty')}</p>
              <p className="mt-1 text-sm text-white/30">
                {t('community.emptyHint')}
              </p>
              <Link
                to="/"
                className="focus-ring mt-5 inline-block rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
              >
                {t('community.openStudio')}
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((item, index) => (
                <ProjectCard key={item.id} entry={item} index={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
