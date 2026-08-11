import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Wand2 } from 'lucide-react';
import { TEMPLATES } from '../templates/registry';
import { HOW_IT_WORKS, studio } from '../data/studio';
import TopBar from '../components/TopBar';
import TemplateCard from '../components/TemplateCard';
import AdSense, { AD_SLOTS } from '../components/AdSense';

export default function GalleryPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEMPLATES;
    return TEMPLATES.filter((t) =>
      [t.name, t.category, t.description, ...t.tags].join(' ').toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-dvh">
      <TopBar
        className="sticky top-0"
        right={
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-600"
            >
              <Wand2 size={15} />
              <span className="hidden sm:inline">AI-студия</span>
            </Link>
          </div>
        }
      />

      {/* hero */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(60% 60% at 15% 0%, rgba(99,102,241,0.28), transparent 65%), radial-gradient(50% 60% at 90% 10%, rgba(52,211,192,0.18), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-xs font-medium text-white/65 ring-1 ring-white/10">
            <Sparkles size={13} className="text-accent-400" />
            {TEMPLATES.length} готовых дизайна · живая настройка стиля
          </span>

          <h1 className="font-display mt-7 max-w-3xl text-[2.4rem] leading-[1.05] font-bold tracking-tight sm:text-6xl">
            {studio.headline}
            <span className="block bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              под ваш бренд за минуту
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            {studio.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="group relative flex w-full max-w-md items-center">
              <Search
                size={17}
                className="absolute left-4 text-white/35 transition group-focus-within:text-white/60"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск: клиника, кафе, фитнес…"
                className="focus-ring w-full rounded-xl bg-white/[0.05] py-3 pr-4 pl-11 text-sm text-white ring-1 ring-white/10 transition placeholder:text-white/30 hover:ring-white/20"
              />
            </label>
            <span className="text-sm text-white/35">
              {results.length} из {TEMPLATES.length}
            </span>
          </div>

          <Link
            to="/"
            className="focus-ring group mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-white/[0.04] px-4 py-3.5 ring-1 ring-white/10 transition hover:bg-white/[0.07] hover:ring-white/20 sm:mt-8"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <Wand2 size={15} className="text-accent-400" />
              Нужен уникальный дизайн, а не шаблон?
            </span>
            <span className="text-sm text-white/45">
              Ответьте на несколько вопросов — студия соберёт макет с нуля под ваш проект.
            </span>
            <span className="text-sm font-medium text-brand-400 transition group-hover:translate-x-0.5">
              Открыть студию →
            </span>
          </Link>
        </div>
      </section>

      {/* Ad unit between sections, never over the catalog. */}
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <AdSense slot={AD_SLOTS.galleryTop} />
      </div>

      {/* catalog */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/12 py-20 text-center text-white/40">
            Ничего не найдено. Попробуйте другой запрос.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* how it works */}
      <section className="border-t border-white/8 bg-shell-900">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Как это работает
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title}>
                <div className="font-display text-3xl font-bold text-white/12">0{i + 1}</div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Нашли подходящий дизайн?
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/45">
              Напишите — обсудим содержание, соберу сайт на React и подключу домен. Срок{' '}
              {studio.turnaround}, {studio.priceFrom}.
            </p>
          </div>
        </div>
        <div className="border-t border-white/8 py-5 text-center text-xs text-white/25">
          © 2026 {studio.brand} · {studio.owner}
        </div>
      </footer>
    </div>
  );
}
