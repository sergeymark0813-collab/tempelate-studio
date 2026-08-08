import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { buildFlow, trackOf } from '../../lib/studio/flow';
import type { Answers, Question } from '../../lib/studio/types';
import { PRODUCT_GROUPS, PRODUCTS } from '../../lib/studio/products';
import { NICHES, NICHE_GROUPS } from '../../lib/studio/niches';
import { cn } from '../../lib/cn';

/* ===========================================================================
   The interview.

   The flow is rebuilt from the answers on every render, so choosing «Логотип»
   or «Ресторан» genuinely changes what gets asked next rather than reordering
   one universal form. Nothing is decided here — this only records what the user
   wants; every design decision happens after «Сгенерировать».
   =========================================================================== */

function optionsOf(question: Question, answers: Answers) {
  return question.optionsFor ? question.optionsFor(answers) : (question.options ?? []);
}

/** Grouped card picker, shared by the product and sphere steps. */
function GroupedPicker({
  groups,
  entries,
  value,
  onChange,
}: {
  groups: string[];
  entries: { id: string; label: string; note: string; group: string }[];
  value: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="grid gap-6">
      {groups.map((group) => (
        <div key={group}>
          <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">{group}</h3>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {entries
              .filter((entry) => entry.group === group)
              .map((entry) => {
                const active = value.includes(entry.id);
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onChange([entry.id])}
                    className={cn(
                      'focus-ring rounded-xl px-4 py-3 text-left ring-1 transition',
                      active
                        ? 'bg-brand-500/15 ring-brand-400/60'
                        : 'bg-white/[0.03] ring-white/8 hover:bg-white/[0.06] hover:ring-white/20',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-medium text-white">{entry.label}</span>
                      {active && <Check size={14} className="shrink-0 text-brand-400" />}
                    </div>
                    <span className="mt-1 block text-xs leading-relaxed text-white/40">{entry.note}</span>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

const TRACK_LABELS: Record<string, string> = {
  web: 'Анкета для сайта',
  logo: 'Анкета для логотипа',
  interface: 'Анкета для интерфейса',
  graphic: 'Анкета для макета',
};

const DRAFT_KEY = 'template-studio:wizard-draft';

/** Answers survive a reload — losing a filled-in brief to a stray refresh is unforgivable. */
function readDraft(): { answers: Answers; index: number } {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return { answers: {}, index: 0 };
    const parsed = JSON.parse(raw) as { answers?: Answers; index?: number };
    return {
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      index: typeof parsed.index === 'number' ? parsed.index : 0,
    };
  } catch {
    return { answers: {}, index: 0 };
  }
}

export function clearWizardDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Nothing to do — the draft simply isn't persisted.
  }
}

export default function Wizard({ onComplete }: { onComplete: (answers: Answers) => void }) {
  const restored = useRef(readDraft()).current;
  const [answers, setAnswers] = useState<Answers>(restored.answers);
  const [index, setIndex] = useState(restored.index);

  // Rebuilt every render: answering «Логотип» or picking a sphere swaps the
  // remaining questions out entirely.
  const questions = useMemo(() => buildFlow(answers), [answers]);
  const safeIndex = Math.min(index, questions.length - 1);
  const question = questions[safeIndex];
  const options = useMemo(() => optionsOf(question, answers), [question, answers]);
  const track = trackOf(answers);

  const current = answers[question.id];
  const values = current?.values ?? [];
  const custom = current?.custom ?? '';

  const answered =
    question.kind === 'text' ? custom.trim().length > 0 : values.length > 0;
  const canAdvance = answered || question.optional;
  const isLast = safeIndex === questions.length - 1;

  // Persist the draft, but only once something has actually been answered.
  useEffect(() => {
    if (Object.keys(answers).length === 0) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ answers, index: safeIndex }));
    } catch {
      // Private mode or quota — the wizard still works, it just won't resume.
    }
  }, [answers, safeIndex]);

  const setValues = (next: string[]) =>
    setAnswers((prev) => {
      // Switching the product switches the whole questionnaire. Answers from the
      // previous track are meaningless here and would otherwise leak into
      // generation — a logo brief inheriting a website's sections, for example.
      if (question.id === 'product' && prev.product?.values[0] !== next[0]) {
        return { product: { questionId: 'product', values: next } };
      }
      return { ...prev, [question.id]: { questionId: question.id, values: next, custom: prev[question.id]?.custom } };
    });

  const setCustom = (next: string) =>
    setAnswers((prev) => ({ ...prev, [question.id]: { questionId: question.id, values: prev[question.id]?.values ?? [], custom: next } }));

  const toggle = (id: string) => {
    if (question.kind === 'single') {
      setValues([id]);
      return;
    }
    setValues(values.includes(id) ? values.filter((value) => value !== id) : [...values, id]);
  };

  const next = () => {
    if (isLast) {
      onComplete(answers);
      return;
    }
    setIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  return (
    <div className="panel px-5 py-6 sm:px-8 sm:py-8">
      {/* progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              {TRACK_LABELS[track]} · вопрос {safeIndex + 1} из {questions.length}
            </span>
            <span className="font-mono text-xs text-white/25">
              {Math.round(((safeIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400 transition-[width] duration-500"
              style={{ width: `${((safeIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* question */}
      <div className="mt-7">
        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{question.title}</h2>
        {question.hint && <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-white/45">{question.hint}</p>}
      </div>

      <div className="mt-6">
        {question.kind === 'text' && (
          <textarea
            value={custom}
            rows={question.kind === 'text' && (question.id === 'domainText' || question.id === 'message') ? 4 : 3}
            autoFocus
            onChange={(event) => setCustom(event.target.value)}
            placeholder={question.placeholder}
            className="focus-ring w-full resize-none rounded-xl bg-white/[0.04] px-4 py-3.5 text-[15px] leading-relaxed text-white ring-1 ring-white/10 transition outline-none placeholder:text-white/25 hover:ring-white/20 focus:ring-brand-400/60"
          />
        )}

        {question.id === 'product' && (
          <GroupedPicker
            groups={PRODUCT_GROUPS}
            entries={PRODUCTS.map((entry) => ({ id: entry.id, label: entry.label, note: entry.note, group: entry.group }))}
            value={values}
            onChange={setValues}
          />
        )}

        {question.id === 'niche' && (
          <GroupedPicker
            groups={NICHE_GROUPS}
            entries={NICHES.map((entry) => ({ id: entry.id, label: entry.label, note: entry.note, group: entry.group }))}
            value={values}
            onChange={setValues}
          />
        )}

        {question.kind !== 'text' && question.id !== 'product' && question.id !== 'niche' && (
          <div className="flex flex-wrap gap-2.5">
            {options.map((option) => {
              const active = values.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggle(option.id)}
                  className={cn(
                    'focus-ring rounded-xl px-4 py-3 text-left ring-1 transition',
                    active
                      ? 'bg-brand-500/15 ring-brand-400/60'
                      : 'bg-white/[0.03] ring-white/8 hover:bg-white/[0.06] hover:ring-white/20',
                  )}
                >
                  <span className="flex items-center gap-2 text-[14px] font-medium text-white">
                    {option.label}
                    {active && <Check size={13} className="text-brand-400" />}
                  </span>
                  {option.note && <span className="mt-0.5 block text-xs text-white/40">{option.note}</span>}
                </button>
              );
            })}
          </div>
        )}

        {question.kind === 'multi' && (
          <p className="mt-3 text-xs text-white/30">Можно выбрать несколько вариантов.</p>
        )}
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/8 pt-5">
        <button
          type="button"
          onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
          disabled={safeIndex === 0}
          className="focus-ring flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white/60 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft size={15} /> Назад
        </button>

        <div className="flex items-center gap-2">
          {question.optional && !answered && (
            <button
              type="button"
              onClick={next}
              className="focus-ring rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white/45 transition hover:text-white"
            >
              Пропустить
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-40"
          >
            {isLast ? (
              <>
                <Sparkles size={15} /> Сгенерировать дизайн
              </>
            ) : (
              <>
                Далее <ArrowRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
