import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import TopBar from '../components/TopBar';
import SiteFooter from '../components/SiteFooter';
import { PRODUCTS } from '../lib/studio/products';
import { blockMeta } from '../lib/studio/compose';
import { useI18n, useT } from '../lib/i18n';
import { useTr } from '../lib/i18n/engine';
import { usePageMeta } from '../lib/seo';

/* ===========================================================================
   One page per kind of design the studio makes.

   These exist for search: the studio itself is a single interactive screen
   with nothing to index, while «дизайн лендинга» and «макет визитки» are
   different queries that need different addresses to rank on.

   Everything on the page is derived from PRODUCTS and the composer's own block
   table, so the copy cannot drift away from what the generator really does.
   =========================================================================== */

export default function DesignPage() {
  const { productId } = useParams();
  const t = useT();
  const tr = useTr();
  const { locale } = useI18n();

  const product = PRODUCTS.find((entry) => entry.id === productId);

  const title = product
    ? `${tr(product.labelKey, product.label)} — ${t('design.titleSuffix')}`
    : t('design.notFound');
  const description = product ? tr(product.noteKey, product.note) : t('design.notFoundHint');

  usePageMeta(title, description);

  if (!product) {
    return (
      <div className="min-h-dvh">
        <TopBar />
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <h1 className="font-display text-xl font-semibold">{t('design.notFound')}</h1>
          <p className="mt-2 text-sm text-white/45">{t('design.notFoundHint')}</p>
          <Link
            to="/"
            className="focus-ring mt-5 inline-block rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
          >
            {t('community.openStudio')}
          </Link>
        </div>
      </div>
    );
  }

  const label = tr(product.labelKey, product.label);
  /* Frames the composer may produce: the main one plus any extra screens. */
  const frames = [label, ...(product.extraFrames?.map((frame) => frame.name) ?? [])];
  const others = PRODUCTS.filter((entry) => entry.id !== product.id);

  return (
    <div className="min-h-dvh">
      <TopBar
        right={
          <Link
            to="/"
            className="focus-ring rounded-xl bg-brand-500 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-600"
          >
            {t('design.start')}
          </Link>
        }
      />

      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <p className="text-xs font-medium tracking-[0.16em] text-brand-400 uppercase">
          {tr(product.groupKey, product.group)}
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{label}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
          {tr(product.noteKey, product.note)}
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/45">
          {t('design.intro', { product: label, count: PRODUCTS.length })}
        </p>

        <Link
          to="/"
          className="focus-ring mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-brand-600"
        >
          {t('design.start')} <ArrowRight size={16} />
        </Link>

        <section className="panel mt-12 px-5 py-6 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/6 text-brand-400 ring-1 ring-white/10">
              <Layers size={16} />
            </span>
            <h2 className="font-display text-[15px] font-semibold tracking-tight">
              {t('design.whatYouGet')}
            </h2>
          </div>

          <dl className="mt-5 grid gap-x-8 sm:grid-cols-2">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/6 py-2.5">
              <dt className="shrink-0 text-[13px] text-white/40">{t('result.artboard')}</dt>
              <dd className="text-right text-[13px] text-white/80">
                {tr(product.canvas.labelKey, product.canvas.label)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-white/6 py-2.5">
              <dt className="shrink-0 text-[13px] text-white/40">{t('design.screens')}</dt>
              <dd className="text-right text-[13px] text-white/80">{frames.length}</dd>
            </div>
          </dl>

          <h3 className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
            {t('design.blocks')}
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.blocks.map((type) => {
              const block = blockMeta(type, locale);
              return (
                <li key={type} className="rounded-xl bg-white/[0.03] px-3.5 py-2.5 ring-1 ring-white/6">
                  <span className="text-[13.5px] font-medium text-white/90">{block.name}</span>
                  {block.purpose && (
                    <p className="mt-0.5 text-xs leading-relaxed text-white/40">{block.purpose}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-[15px] font-semibold tracking-tight">
            {t('design.others')}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((entry) => (
              <Link
                key={entry.id}
                to={`/design/${entry.id}`}
                className="focus-ring rounded-xl bg-white/[0.03] px-3.5 py-2 text-[13px] text-white/65 ring-1 ring-white/8 transition hover:bg-white/[0.06] hover:text-white"
              >
                {tr(entry.labelKey, entry.label)}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
