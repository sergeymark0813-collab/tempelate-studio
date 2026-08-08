import { useState } from 'react';
import { Boxes, Brain, Download, Images, Layers, Palette, RefreshCw, Ruler, Type as TypeIcon } from 'lucide-react';
import type { Project } from '../../lib/studio/types';
import { auditContrast } from '../../lib/studio/palette';
import { cssExport } from '../../lib/studio/tokens';
import { readableOn } from '../../lib/color';
import { saveBlob } from '../../lib/exportImage';
import { cn } from '../../lib/cn';
import { Chip, CopyButton, ResultCard, SpecRow } from './primitives';
import FrameView from './FrameView';

function downloadJson(project: Project) {
  const payload = {
    название: project.name,
    продукт: project.product.label,
    резюме: project.summary,
    seed: project.seed,
    композиция: { архетип: project.archetype, описание: project.archetypeNote },
    решения: project.analysis.decisions,
    палитра: project.ds.color,
    типографика: {
      заголовки: project.ds.type.display.family,
      текст: project.ds.type.body.family,
      модульность: project.ds.type.ratio,
      база: project.ds.type.baseSize,
      шкала: project.ds.type.scale,
    },
    сетка: project.ds.grid,
    отступы: project.ds.space,
    скругления: project.ds.radius,
    тени: project.ds.shadow,
    анимация: project.ds.motion,
    экраны: project.frames.map((frame) => ({
      название: frame.name,
      артборд: frame.canvas.label,
      блоки: frame.blocks.map((block) => ({
        название: block.name,
        тип: block.type,
        вариант: block.variant,
        назначение: block.purpose,
      })),
    })),
    изображения: project.imagery,
  };

  saveBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), `design-${project.id}.json`);
}

export default function ProjectView({ project, onRegenerate }: { project: Project; onRegenerate: () => void }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const { ds } = project;
  const frame = project.frames[Math.min(frameIndex, project.frames.length - 1)];

  const swatches = [
    { id: 'primary', label: 'Основной', value: ds.color.primary, role: 'Акценты, кнопки, активные состояния' },
    { id: 'secondary', label: 'Дополнительный', value: ds.color.secondary, role: 'Второй акцент и градиенты' },
    { id: 'accent', label: 'Акцентный', value: ds.color.accent, role: 'Выделения и подсветка' },
    { id: 'bg', label: 'Фон', value: ds.color.bg, role: 'Базовый фон артборда' },
    { id: 'surface', label: 'Поверхность', value: ds.color.surface, role: 'Карточки и панели' },
    { id: 'surface2', label: 'Второй уровень', value: ds.color.surface2, role: 'Вложенные блоки, таблицы' },
    { id: 'text', label: 'Текст', value: ds.color.text, role: 'Заголовки и основной текст' },
    { id: 'muted', label: 'Второстепенный', value: ds.color.textMuted, role: 'Описания и подписи' },
  ];

  return (
    <div className="fade-up grid gap-5">
      {/* header */}
      <header className="panel px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-medium text-brand-400">Дизайн создан · {project.product.label}</span>
            <h1 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h1>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/50">{project.summary}</p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={onRegenerate}
              className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
            >
              <RefreshCw size={15} /> Другой вариант
            </button>
            <button
              type="button"
              onClick={() => downloadJson(project)}
              className="focus-ring flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
            >
              <Download size={15} /> JSON
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tone="accent">{project.archetype}</Chip>
          <Chip>{project.analysis.styleLabel}</Chip>
          <Chip>{ds.color.scheme === 'dark' ? 'Тёмная схема' : 'Светлая схема'}</Chip>
          <Chip>{ds.color.harmony}</Chip>
          <Chip>{ds.type.display.family}</Chip>
          <Chip>сетка {ds.grid.columns} колонок</Chip>
          <Chip>seed {project.seed.toString(36)}</Chip>
        </div>
      </header>

      {/* artboards */}
      <ResultCard
        icon={Layers}
        title="Макет"
        hint={`${frame.canvas.label} · каждый экран отрисован по сгенерированной системе, а не выбран из готовых.`}
        action={
          project.frames.length > 1 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.frames.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setFrameIndex(index)}
                  className={cn(
                    'focus-ring rounded-lg px-3 py-1.5 text-[12.5px] font-medium ring-1 transition',
                    index === frameIndex
                      ? 'bg-white/10 text-white ring-white/25'
                      : 'text-white/45 ring-white/8 hover:bg-white/5 hover:text-white/80',
                  )}
                >
                  {entry.name}
                </button>
              ))}
            </div>
          ) : undefined
        }
      >
        <div className="scroll-slim stage-grid max-h-[680px] overflow-y-auto rounded-xl bg-shell-950 p-4">
          <FrameView key={`${project.id}-${frame.id}`} frame={frame} ds={ds} />
        </div>
      </ResultCard>

      {/* decisions */}
      <ResultCard
        icon={Brain}
        title="Решения студии"
        hint="Что было решено самостоятельно после ваших ответов — и почему именно так."
      >
        <ol className="grid gap-3">
          {project.analysis.decisions.map((decision, index) => (
            <li key={decision} className="flex gap-3.5 rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/6">
              <span className="font-mono text-[11px] text-white/25 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <p className="text-[13.5px] leading-relaxed text-white/70">{decision}</p>
            </li>
          ))}
        </ol>

        <div className="mt-5 grid gap-x-8 sm:grid-cols-2">
          <div>
            <SpecRow label="Тип проекта" value={project.analysis.productLabel} />
            <SpecRow label="Задача" value={project.analysis.purposeLabel} />
            <SpecRow label="Аудитория" value={project.analysis.audienceLabel} />
          </div>
          <div>
            <SpecRow label="Стиль" value={project.analysis.styleLabel} />
            <SpecRow label="Настроение" value={project.analysis.moodLabel} />
            <SpecRow label="Цвет" value={project.analysis.colorLabel} />
          </div>
        </div>
      </ResultCard>

      {/* palette */}
      <ResultCard
        icon={Palette}
        title="Цветовая палитра"
        hint={`${ds.color.harmony} гармония. Оттенки построены по кругу от базового тона, контраст проверен по WCAG.`}
        action={<CopyButton value={cssExport(ds)} label="CSS-переменные" />}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {swatches.map((swatch) => {
            const audit = ['primary', 'secondary', 'accent', 'text', 'muted'].includes(swatch.id)
              ? auditContrast(swatch.value, ds.color.bg)
              : null;
            return (
              <div key={swatch.id} className="overflow-hidden rounded-xl ring-1 ring-white/8">
                <div className="flex h-20 items-end justify-between p-3" style={{ background: swatch.value, color: readableOn(swatch.value) }}>
                  <span className="text-[13px] font-semibold">{swatch.label}</span>
                  <span className="font-mono text-[11px] uppercase opacity-70">{swatch.value}</span>
                </div>
                <div className="bg-white/[0.03] px-3 py-3">
                  <p className="text-xs leading-relaxed text-white/45">{swatch.role}</p>
                  {audit && (
                    <div className="mt-2.5">
                      <Chip tone={audit.tone}>
                        {audit.grade} · {audit.ratio.toFixed(2)}:1
                      </Chip>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ResultCard>

      {/* typography */}
      <ResultCard icon={TypeIcon} title="Типографика" hint={ds.type.rationale}>
        <div className="grid gap-4">
          {ds.type.scale.map((step) => (
            <div key={step.id} className="grid gap-2 border-b border-white/6 pb-4 last:border-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
              <div className="min-w-0">
                <div
                  className="truncate text-white"
                  style={{
                    fontFamily: step.role === 'display' ? ds.type.display.stack : ds.type.body.stack,
                    fontSize: `min(${step.size}px, 11vw)`,
                    fontWeight: step.weight,
                    letterSpacing: step.tracking,
                    lineHeight: step.lineHeight,
                    textTransform: step.transform,
                  }}
                >
                  {step.role === 'display' ? 'Заголовок в сгенерированной шкале' : 'Основной текст проекта в выбранной гарнитуре'}
                </div>
                <div className="mt-1.5 text-xs text-white/35">{step.usage}</div>
              </div>
              <div className="shrink-0 font-mono text-[11px] text-white/35 sm:text-right">
                <div>
                  {step.label} · {step.size}px
                </div>
                <div className="mt-0.5">
                  {step.weight} · {step.lineHeight.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* structure */}
      <ResultCard
        icon={Boxes}
        title="Структура и композиция"
        hint={`${project.archetypeNote}`}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {project.frames.map((entry) => (
            <div key={entry.id}>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                {entry.name} · {entry.canvas.label}
              </h3>
              <ol className="mt-3 grid gap-2">
                {entry.blocks.map((block, index) => (
                  <li key={block.id} className="flex gap-3 rounded-xl bg-white/[0.03] px-3.5 py-2.5 ring-1 ring-white/6">
                    <span className="font-mono text-[11px] text-white/25 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13.5px] font-medium text-white/90">{block.name}</span>
                        <span className="rounded bg-white/6 px-1.5 py-0.5 font-mono text-[10.5px] text-white/45">{block.variant}</span>
                        {block.params.columns && block.params.columns > 1 && (
                          <span className="rounded bg-white/6 px-1.5 py-0.5 font-mono text-[10.5px] text-white/45">
                            {block.params.columns} кол.
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-white/40">{block.purpose}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* tokens */}
      <ResultCard icon={Ruler} title="Сетка, размеры и элементы" hint="Числовые решения, на которых держится макет.">
        <div className="grid gap-x-8 sm:grid-cols-2">
          <div>
            <SpecRow label="Сетка" value={ds.grid.label} />
            <SpecRow label="Поля артборда" value={`${ds.grid.margin}px`} />
            <SpecRow label="Шаг сетки" value={`${ds.space.unit}px`} />
            <SpecRow label="Отступ секции" value={`${ds.space.section}px`} />
            <SpecRow label="Плотность" value={ds.space.density === 'compact' ? 'компактная' : ds.space.density === 'spacious' ? 'просторная' : 'обычная'} />
          </div>
          <div>
            <SpecRow label="Скругления" value={`${ds.radius.family} · ${ds.radius.sm}/${ds.radius.md}/${ds.radius.lg}px`} />
            <SpecRow label="Тени" value={ds.shadow.family} />
            <SpecRow label="Поверхности" value={{ flat: 'плоские заливки', elevated: 'карточки с тенью', outlined: 'контурные карточки', glass: 'стекло с размытием', gradient: 'градиентные подложки' }[ds.surfaceStyle]} />
            <SpecRow label="Иконки" value={ds.iconStyle === 'line' ? 'контурные' : ds.iconStyle === 'solid' ? 'заливкой' : 'двухцветные'} />
            <SpecRow label="Анимация" value={`${ds.motion.entrance} · ${ds.motion.duration}мс`} />
          </div>
        </div>
      </ResultCard>

      {/* imagery */}
      <ResultCard
        icon={Images}
        title="Изображения и иллюстрации"
        hint="В макете стоит процедурная графика из палитры. Вот что поставить на её место."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {project.imagery.map((idea) => (
            <article key={idea.title} className="flex flex-col rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[14px] font-medium text-white/90">{idea.title}</h3>
                <Chip>{idea.kind}</Chip>
              </div>
              <dl className="mt-3 grid gap-1.5 text-xs">
                <div className="flex gap-2">
                  <dt className="shrink-0 text-white/30">Где:</dt>
                  <dd className="text-white/55">{idea.placement}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-white/30">Формат:</dt>
                  <dd className="font-mono text-white/55">{idea.ratio}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-white/30">Обработка:</dt>
                  <dd className="text-white/55">{idea.treatment}</dd>
                </div>
              </dl>
              <div className="mt-3 flex-1 rounded-lg bg-black/25 p-3 ring-1 ring-white/6">
                <p className="font-mono text-[11.5px] leading-relaxed text-white/50">{idea.prompt}</p>
              </div>
              <CopyButton value={idea.prompt} label="Промпт" className="mt-3 self-start" />
            </article>
          ))}
        </div>
      </ResultCard>
    </div>
  );
}
