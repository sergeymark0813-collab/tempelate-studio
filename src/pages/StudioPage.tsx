import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { generateProject } from '../lib/studio/generate';
import { PRODUCTS } from '../lib/studio/products';
import type { Answers, Project } from '../lib/studio/types';
import { cn } from '../lib/cn';
import { useT } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';
import TopBar from '../components/TopBar';
import SiteFooter from '../components/SiteFooter';
import Wizard, { clearWizardDraft } from '../components/studio/Wizard';
import ProjectView from '../components/studio/ProjectView';
import ErrorBoundary from '../components/ErrorBoundary';

const STEP_KEYS = [
  'gen.step.parse',
  'gen.step.color',
  'gen.step.type',
  'gen.step.grid',
  'gen.step.compose',
  'gen.step.render',
] as const;

const STEP_MS = 260;

export default function StudioPage() {
  const t = useT();
  usePageMeta(t('meta.studio.title'), t('meta.studio.description', { count: PRODUCTS.length }));

  const [answers, setAnswers] = useState<Answers | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [step, setStep] = useState(-1);
  const [failure, setFailure] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const running = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(
    (input: Answers) => {
      // Guard against a second Generate landing while one is already in flight.
      if (running.current) return;
      running.current = true;

      clearTimers();
      setAnswers(input);
      setProject(null);
      setFailure(null);
      setStep(0);

      // Generation is synchronous, so a failure surfaces here — before the UI
      // has committed to showing a result. The brief is kept either way.
      let result: Project;
      try {
        result = generateProject(input);
      } catch (error) {
        running.current = false;
        setStep(-1);
        setFailure(
          error instanceof Error
            ? `${t('gen.failed.title')}: ${error.message}`
            : t('gen.failed.title'),
        );
        return;
      }

      STEP_KEYS.forEach((_, index) => {
        timers.current.push(window.setTimeout(() => setStep(index), index * STEP_MS));
      });
      timers.current.push(
        window.setTimeout(() => {
          setProject(result);
          setStep(-1);
          running.current = false;
          // The brief is now embodied in the project; the resume draft can go.
          clearWizardDraft();
        }, STEP_KEYS.length * STEP_MS + 140),
      );
    },
    [clearTimers],
  );

  useEffect(() => {
    if (project) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [project]);

  const busy = step >= 0;

  return (
    <div className="min-h-dvh">
      <TopBar
        className="sticky top-0"
        right={
          <div className="flex items-center gap-2">
            <Link
              to="/community"
              className={cn(
                'focus-ring shrink-0 rounded-xl px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white sm:px-3.5',
                project && 'hidden sm:inline-flex',
              )}
            >
              {t('nav.community')}
            </Link>
            {project && (
              <button
                type="button"
                onClick={() => {
                  setProject(null);
                  setAnswers(null);
                }}
                className="focus-ring shrink-0 rounded-xl px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white sm:px-3.5"
              >
                {t('nav.newProject')}
              </button>
            )}
            {/*
              Four controls do not fit a phone header — at 320px they measure
              339px against a 320px box. Once a project is on screen, «Новый
              проект» is the one that belongs there, so both secondary links
              step aside below `sm`. Nothing becomes unreachable: the result
              page links to the community itself after publishing.
            */}
            <Link
              to="/templates"
              className={cn(
                'focus-ring shrink-0 rounded-xl px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white sm:px-3.5',
                project && 'hidden sm:inline-flex',
              )}
            >
              {t('nav.catalog')}
            </Link>
          </div>
        }
      />

      {!project && !busy && (
        <section className="relative overflow-hidden border-b border-white/8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(55% 60% at 20% 0%, rgba(99,102,241,0.3), transparent 65%), radial-gradient(45% 55% at 85% 5%, rgba(52,211,192,0.16), transparent 60%)',
            }}
          />
          <div className="relative mx-auto max-w-4xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-xs font-medium text-white/65 ring-1 ring-white/10">
              <Sparkles size={13} className="text-accent-400" />
              {t('studio.badge')}
            </span>

            <h1 className="font-display mt-6 text-[2.1rem] leading-[1.08] font-bold tracking-tight sm:text-5xl">
              {t('studio.titleLine1')}
              <span className="block bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                {t('studio.titleLine2')}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
              {t('studio.intro', { count: PRODUCTS.length })}
            </p>
          </div>
        </section>
      )}

      <section ref={resultRef} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-8 sm:px-8 sm:py-10">
        {busy && (
          <div className="panel px-5 py-6 sm:px-6" role="status" aria-live="polite">
            <ul className="grid gap-2.5">
              {STEP_KEYS.map((key, index) => {
                const done = index < step;
                const active = index === step;
                return (
                  <li
                    key={key}
                    className={cn(
                      'flex items-center gap-3 text-[14px] transition-opacity duration-300',
                      done && 'text-white/45',
                      active && 'text-white',
                      !done && !active && 'opacity-35',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-full ring-1 transition',
                        done && 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
                        active && 'bg-brand-500/20 text-brand-400 ring-brand-400/40',
                        !done && !active && 'ring-white/12',
                      )}
                    >
                      {done && <Check size={11} />}
                      {active && <Loader2 size={11} className="animate-spin" />}
                    </span>
                    {t(key)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {failure && !busy && (
          <div className="panel mb-5 px-5 py-5">
            <h2 className="font-display text-base font-semibold tracking-tight">{t('gen.failed.title')}</h2>
            <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/50">
              {failure} {t('gen.failed.body')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => answers && run(answers)}
                className="focus-ring rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
              >
                {t('gen.failed.retry')}
              </button>
              <button
                type="button"
                onClick={() => setFailure(null)}
                className="focus-ring rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white/60 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
              >
                {t('gen.failed.back')}
              </button>
            </div>
          </div>
        )}

        {!busy && !project && !failure && (
          <ErrorBoundary title={t('wizard.errorTitle')}>
            <Wizard onComplete={run} />
          </ErrorBoundary>
        )}

        {!busy && project && (
          <ErrorBoundary
            title={t('result.errorTitle')}
            onReset={() => {
              setProject(null);
              running.current = false;
            }}
          >
            <ProjectView key={project.id} project={project} onRegenerate={() => answers && run(answers)} />
          </ErrorBoundary>
        )}
      </section>

      {/* The ad moved into SiteFooter, which puts it below the working area on
          every page at once. It keeps the property that mattered here: the
          footer is outside the `busy` branch, so the unit stays mounted while a
          design generates. An `ins` that unmounts and comes back asks AdSense
          for a fresh ad each time, and regenerating a dozen times would then
          bill a dozen impressions against a single page view. */}
      <SiteFooter />
    </div>
  );
}
