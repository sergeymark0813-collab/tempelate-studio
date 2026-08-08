import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { generateProject } from '../lib/studio/generate';
import { PRODUCTS } from '../lib/studio/products';
import type { Answers, Project } from '../lib/studio/types';
import { cn } from '../lib/cn';
import TopBar from '../components/TopBar';
import Wizard from '../components/studio/Wizard';
import ProjectView from '../components/studio/ProjectView';

const STEPS = [
  'Разбираю ответы',
  'Строю цветовую систему',
  'Собираю типографическую шкалу',
  'Определяю сетку и ритм',
  'Компоную блоки',
  'Отрисовываю макет',
];

const STEP_MS = 260;

export default function StudioPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [step, setStep] = useState(-1);
  const timers = useRef<number[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(
    (input: Answers) => {
      clearTimers();
      setAnswers(input);
      setProject(null);
      setStep(0);

      // Generation itself is synchronous; the pacing exists so the decisions
      // arrive in a readable order rather than all at once.
      const result = generateProject(input);

      STEPS.forEach((_, index) => {
        timers.current.push(window.setTimeout(() => setStep(index), index * STEP_MS));
      });
      timers.current.push(
        window.setTimeout(() => {
          setProject(result);
          setStep(-1);
        }, STEPS.length * STEP_MS + 140),
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
            {project && (
              <button
                type="button"
                onClick={() => {
                  setProject(null);
                  setAnswers(null);
                }}
                className="focus-ring rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
              >
                Новый проект
              </button>
            )}
            <Link
              to="/templates"
              className="focus-ring rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
            >
              Каталог
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
              Генеративная дизайн-студия
            </span>

            <h1 className="font-display mt-6 text-[2.1rem] leading-[1.08] font-bold tracking-tight sm:text-5xl">
              Ответьте на вопросы —
              <span className="block bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                получите уникальный дизайн
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
              Ни одного готового шаблона: палитра, шрифтовая шкала, сетка, композиция и все блоки
              собираются с нуля под ваш проект. {PRODUCTS.length} типов продуктов — от лендинга и
              мобильного приложения до логотипа, презентации и email-рассылки.
            </p>
          </div>
        </section>
      )}

      <section ref={resultRef} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-8 sm:px-8 sm:py-10">
        {busy && (
          <div className="panel px-5 py-6 sm:px-6" role="status" aria-live="polite">
            <ul className="grid gap-2.5">
              {STEPS.map((label, index) => {
                const done = index < step;
                const active = index === step;
                return (
                  <li
                    key={label}
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
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {!busy && !project && <Wizard onComplete={run} />}

        {!busy && project && (
          <ProjectView project={project} onRegenerate={() => answers && run(answers)} />
        )}
      </section>
    </div>
  );
}
