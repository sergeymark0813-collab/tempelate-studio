import { useRef, useState } from 'react';
import { Boxes, Brain, Download, ImageDown, Images, Layers, Loader2, Palette, RefreshCw, Ruler, Type as TypeIcon } from 'lucide-react';
import type { Project } from '../../lib/studio/types';
import { auditContrast } from '../../lib/studio/palette';
import { cssExport } from '../../lib/studio/tokens';
import { specsForFamilies } from '../../lib/studio/typography';
import { readableOn } from '../../lib/color';
import { captureNode, saveBlob } from '../../lib/exportImage';
import { cn } from '../../lib/cn';
import { Chip, CopyButton, ResultCard, SpecRow } from './primitives';
import FrameView from './FrameView';
import DeviceTabs from '../DeviceTabs';
import { getDevice } from '../../lib/devices';
import type { DeviceId } from '../../types';
import DesignEditor from './DesignEditor';
import PublishPanel from '../community/PublishPanel';
import { useT } from '../../lib/i18n';
import { useTr } from '../../lib/i18n/engine';

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
  const t = useT();
  const tr = useTr();
  const [frameIndex, setFrameIndex] = useState(0);
  const [deviceId, setDeviceId] = useState<DeviceId>('desktop');
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const artboardRef = useRef<HTMLDivElement>(null);

  /*
    The generated design is state, not an image: `draft` is what the preview and
    every export read, and the editor below writes straight into it. `project`
    is kept untouched so «Вернуть как было» is exact.
  */
  const [draft, setDraft] = useState<Project>(project);
  const edited = draft !== project;

  const { ds } = draft;
  const frame = draft.frames[Math.min(frameIndex, draft.frames.length - 1)];
  const reflows = frame.canvas.kind === 'page' || frame.canvas.kind === 'email';

  /** Rasterises the artboard at its true size — the real "download" of this app. */
  const exportImage = async () => {
    const node = artboardRef.current;
    if (!node || exporting) return;

    setExporting(true);
    setExportError('');
    try {
      const blob = await captureNode(node, {
        format: 'png',
        scale: 2,
        background: ds.color.bg,
        fontSpecs: specsForFamilies(ds.type.display.family, ds.type.body.family),
      });
      saveBlob(blob, `${draft.name.replace(/\s+/g, '-').toLowerCase()}-${frame.name.replace(/\s+/g, '-').toLowerCase()}.png`);
    } catch (error) {
      setExportError(error instanceof Error ? error.message : t('result.exportFailed'));
    } finally {
      setExporting(false);
    }
  };

  const swatches = [
    { id: 'primary', value: ds.color.primary },
    { id: 'secondary', value: ds.color.secondary },
    { id: 'accent', value: ds.color.accent },
    { id: 'bg', value: ds.color.bg },
    { id: 'surface', value: ds.color.surface },
    { id: 'surface2', value: ds.color.surface2 },
    { id: 'text', value: ds.color.text },
    { id: 'muted', value: ds.color.textMuted },
  ] as const;

  /** Artboard label — the canvas carries its own dictionary key from the generator. */
  const canvasLabel = tr(frame.canvas.labelKey, frame.canvas.label);

  return (
    <div className="fade-up grid gap-5">
      {/* header */}
      <header className="panel px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-medium text-brand-400">
              {t('result.created')} · {tr(project.product.labelKey, project.product.label)}
            </span>
            <h1 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h1>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/50">{project.summary}</p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={onRegenerate}
              className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
            >
              <RefreshCw size={15} /> {t('result.regenerate')}
            </button>
            <button
              type="button"
              onClick={exportImage}
              disabled={exporting}
              className="focus-ring flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white disabled:pointer-events-none disabled:opacity-50"
            >
              {exporting ? <Loader2 size={15} className="animate-spin" /> : <ImageDown size={15} />}
              {exporting ? t('result.exporting') : t('result.exportPng')}
            </button>
            <button
              type="button"
              onClick={() => downloadJson(draft)}
              className="focus-ring flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
            >
              <Download size={15} /> {t('result.json')}
            </button>
          </div>
        </div>

        {exportError && (
          <p className="mt-3 rounded-xl bg-rose-500/10 px-3.5 py-2.5 text-[13px] text-rose-200 ring-1 ring-rose-400/25">
            {exportError}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tone="accent">{project.archetype}</Chip>
          <Chip>{project.analysis.styleLabel}</Chip>
          <Chip>{ds.color.scheme === 'dark' ? t('result.schemeDark') : t('result.schemeLight')}</Chip>
          <Chip>{ds.color.harmony}</Chip>
          <Chip>{ds.type.display.family}</Chip>
          <Chip>{t('result.gridColumns', { count: ds.grid.columns })}</Chip>
          <Chip>seed {project.seed.toString(36)}</Chip>
        </div>
      </header>

      {/* artboards */}
      <ResultCard
        icon={Layers}
        title={t('result.artboard')}
        hint={t('result.artboardHint', { canvas: canvasLabel })}
        action={
          draft.frames.length > 1 ? (
            <div className="flex flex-wrap gap-1.5">
              {draft.frames.map((entry, index) => (
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
        {/* Reflowing artboards get a real viewport switcher; fixed ones
            (logo, poster, card) have nothing to reflow. */}
        {reflows && (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <DeviceTabs value={deviceId} onChange={setDeviceId} />
            <span className="font-mono text-xs text-white/35">
              {getDevice(deviceId).width}px
            </span>
          </div>
        )}

        <div className="scroll-slim stage-grid max-h-[680px] overflow-y-auto rounded-xl bg-shell-950 p-4">
          <FrameView
            key={`${project.id}-${frame.id}`}
            frame={frame}
            ds={ds}
            nodeRef={artboardRef}
            deviceWidth={reflows ? getDevice(deviceId).width : undefined}
          />
        </div>
        {edited && <p className="mt-3 text-xs text-white/35">{t('result.edited')}</p>}
      </ResultCard>

      {/* Editing the result — sits directly under the preview it changes. */}
      <DesignEditor draft={draft} original={project} onChange={setDraft} />

      {/* Publishing takes the edited draft, so the community sees what the
          author actually finished with — not the raw generated version. */}
      <PublishPanel project={draft} />

      {/* decisions */}
      <ResultCard
        icon={Brain}
        title={t('result.decisions')}
        hint={t('result.decisionsHint')}
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
            <SpecRow label={t('spec.product')} value={project.analysis.productLabel} />
            <SpecRow label={t('spec.purpose')} value={project.analysis.purposeLabel} />
            <SpecRow label={t('spec.audience')} value={project.analysis.audienceLabel} />
          </div>
          <div>
            <SpecRow label={t('spec.style')} value={project.analysis.styleLabel} />
            <SpecRow label={t('spec.mood')} value={project.analysis.moodLabel} />
            <SpecRow label={t('spec.color')} value={project.analysis.colorLabel} />
          </div>
        </div>
      </ResultCard>

      {/* palette */}
      <ResultCard
        icon={Palette}
        title={t('result.palette')}
        hint={t('result.paletteHint', { harmony: ds.color.harmony })}
        action={<CopyButton value={cssExport(ds)} label={t('result.cssVars')} />}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {swatches.map((swatch) => {
            const audit = ['primary', 'secondary', 'accent', 'text', 'muted'].includes(swatch.id)
              ? auditContrast(swatch.value, ds.color.bg)
              : null;
            return (
              <div key={swatch.id} className="overflow-hidden rounded-xl ring-1 ring-white/8">
                <div className="flex h-20 items-end justify-between p-3" style={{ background: swatch.value, color: readableOn(swatch.value) }}>
                  <span className="text-[13px] font-semibold">{t(`swatch.${swatch.id}`)}</span>
                  <span className="font-mono text-[11px] uppercase opacity-70">{swatch.value}</span>
                </div>
                <div className="bg-white/[0.03] px-3 py-3">
                  <p className="text-xs leading-relaxed text-white/45">{t(`swatch.${swatch.id}.role`)}</p>
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
      <ResultCard icon={TypeIcon} title={t('result.typography')} hint={ds.type.rationale}>
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
                  {step.role === 'display' ? t('result.sampleDisplay') : t('result.sampleBody')}
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
        title={t('result.structure')}
        hint={project.archetypeNote}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {draft.frames.map((entry) => (
            <div key={entry.id}>
              <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                {entry.name} · {tr(entry.canvas.labelKey, entry.canvas.label)}
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
                            {t('result.columnsShort', { count: block.params.columns })}
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
      <ResultCard icon={Ruler} title={t('result.tokens')} hint={t('result.tokensHint')}>
        <div className="grid gap-x-8 sm:grid-cols-2">
          <div>
            <SpecRow label={t('spec.grid')} value={ds.grid.label} />
            <SpecRow label={t('spec.artboardMargins')} value={`${ds.grid.margin}px`} />
            <SpecRow label={t('spec.gridStep')} value={`${ds.space.unit}px`} />
            <SpecRow label={t('spec.sectionSpacing')} value={`${ds.space.section}px`} />
            <SpecRow label={t('spec.density')} value={t(`density.${ds.space.density}`)} />
          </div>
          <div>
            <SpecRow label={t('spec.radius')} value={`${ds.radius.family} · ${ds.radius.sm}/${ds.radius.md}/${ds.radius.lg}px`} />
            <SpecRow label={t('spec.shadow')} value={ds.shadow.family} />
            <SpecRow label={t('spec.surfaces')} value={t(`surface.${ds.surfaceStyle}`)} />
            <SpecRow label={t('spec.icons')} value={t(`icons.${ds.iconStyle}`)} />
            <SpecRow label={t('spec.motion')} value={`${ds.motion.entrance} · ${ds.motion.duration}${t('unit.ms')}`} />
          </div>
        </div>
      </ResultCard>

      {/* imagery */}
      <ResultCard
        icon={Images}
        title={t('result.imagery')}
        hint={t('result.imageryHint')}
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
                  <dt className="shrink-0 text-white/30">{t('result.imageryWhere')}</dt>
                  <dd className="text-white/55">{idea.placement}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-white/30">{t('result.imageryFormat')}</dt>
                  <dd className="font-mono text-white/55">{idea.ratio}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-white/30">{t('result.imageryTreatment')}</dt>
                  <dd className="text-white/55">{idea.treatment}</dd>
                </div>
              </dl>
              <div className="mt-3 flex-1 rounded-lg bg-black/25 p-3 ring-1 ring-white/6">
                <p className="font-mono text-[11.5px] leading-relaxed text-white/50">{idea.prompt}</p>
              </div>
              <CopyButton value={idea.prompt} label={t('result.prompt')} className="mt-3 self-start" />
            </article>
          ))}
        </div>
      </ResultCard>
    </div>
  );
}
