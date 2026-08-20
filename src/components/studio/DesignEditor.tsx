import { useState } from 'react';
import { ChevronDown, Eye, EyeOff, Image as ImageIcon, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { BlockInstance, Project } from '../../lib/studio/types';
import { FAMILIES } from '../../lib/studio/typography';
import { mix, readableOn } from '../../lib/color';
import ColorField from './ColorField';
import { IMAGE_BLOCKS } from './FrameView';
import { cn } from '../../lib/cn';
import { useT } from '../../lib/i18n';

/* ===========================================================================
   Editing the generated design.

   The result is data, not a picture, so everything here mutates the project
   object and the preview re-renders from it. No regeneration is involved: the
   composition the studio decided on stays put while its content, colour, type
   and section visibility are adjusted by hand.
   =========================================================================== */

const MAX_IMAGE_BYTES = 500 * 1024;

/**
 * Surfaces, borders and muted text are derived from the background and text
 * colours. Editing the background alone would otherwise leave cards from the
 * old palette floating on a new page.
 */
function reconcile(project: Project, bg: string, text: string): Project {
  const dark = readableOn(bg) === '#ffffff';
  return {
    ...project,
    ds: {
      ...project.ds,
      color: {
        ...project.ds.color,
        bg,
        text,
        surface: mix(bg, dark ? '#ffffff' : '#000000', dark ? 0.05 : 0.03),
        surface2: mix(bg, dark ? '#ffffff' : '#000000', dark ? 0.1 : 0.06),
        surface3: mix(bg, dark ? '#ffffff' : '#000000', dark ? 0.16 : 0.1),
        textMuted: mix(text, bg, 0.4),
        textFaint: mix(text, bg, 0.62),
        border: mix(bg, text, 0.14),
        borderStrong: mix(bg, text, 0.28),
      },
    },
  };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center justify-between gap-3 py-2">
      <span className="text-[13px] text-white/70">{label}</span>
      {children}
    </label>
  );
}


const sliderClass =
  'focus-ring mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-brand-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white';

const textInput =
  'focus-ring w-full rounded-lg bg-white/[0.05] px-3 py-2 text-[13px] text-white ring-1 ring-white/10 outline-none transition placeholder:text-white/25 hover:ring-white/20 focus:ring-brand-400/60';

/* ------------------------------ block editor ----------------------------- */

function BlockRow({
  block,
  onChange,
}: {
  block: BlockInstance;
  onChange: (next: BlockInstance) => void;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState('');

  const setContent = (patch: Partial<BlockInstance['content']>) =>
    onChange({ ...block, content: { ...block.content, ...patch } });

  const upload = (file: File | undefined) => {
    setImageError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError(t('editor.imageWrongType'));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError(t('editor.imageTooLarge', { size: Math.round(MAX_IMAGE_BYTES / 1024) }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setContent({ image: String(reader.result ?? '') });
    reader.onerror = () => setImageError(t('editor.imageUnreadable'));
    reader.readAsDataURL(file);
  };

  return (
    <li className={cn('rounded-xl ring-1 transition', block.hidden ? 'bg-white/[0.01] ring-white/6' : 'bg-white/[0.03] ring-white/8')}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          onClick={() => onChange({ ...block, hidden: !block.hidden })}
          title={block.hidden ? t('editor.showSection') : t('editor.hideSection')}
          aria-pressed={!block.hidden}
          className="focus-ring grid h-7 w-7 shrink-0 place-items-center rounded-md text-white/45 transition hover:bg-white/8 hover:text-white"
        >
          {block.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="focus-ring flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md py-1 text-left"
        >
          <span className={cn('truncate text-[13.5px]', block.hidden ? 'text-white/35 line-through' : 'text-white/85')}>
            {block.name}
          </span>
          <ChevronDown size={14} className={cn('shrink-0 text-white/30 transition', open && 'rotate-180')} />
        </button>
      </div>

      {open && (
        <div className="grid gap-2.5 border-t border-white/6 px-3 py-3">
          {block.content.title !== undefined && (
            <input
              className={textInput}
              value={block.content.title ?? ''}
              onChange={(e) => setContent({ title: e.target.value })}
              placeholder={t('editor.fieldTitle')}
            />
          )}
          {block.content.subtitle !== undefined && (
            <textarea
              className={cn(textInput, 'resize-none')}
              rows={2}
              value={block.content.subtitle ?? ''}
              onChange={(e) => setContent({ subtitle: e.target.value })}
              placeholder={t('editor.fieldSubtitle')}
            />
          )}
          {block.content.cta !== undefined && (
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                className={textInput}
                value={block.content.cta ?? ''}
                onChange={(e) => setContent({ cta: e.target.value })}
                placeholder={t('editor.fieldCta')}
              />
              <input
                className={textInput}
                value={block.content.ctaHref ?? ''}
                onChange={(e) => setContent({ ctaHref: e.target.value })}
                placeholder={t('editor.fieldCtaHref')}
                inputMode="url"
              />
            </div>
          )}

          {/* Offered only where the renderer has an image slot. Everywhere else
              the upload used to succeed, store the picture on the block and
              show nothing — the file went in and vanished. */}
          <div className="flex flex-wrap items-center gap-2">
            {IMAGE_BLOCKS.has(block.type) && (
              <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/[0.05] px-3 py-2 text-[12.5px] text-white/65 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white">
                <ImageIcon size={13} />
                {t('editor.image')}
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => upload(e.target.files?.[0])} />
              </label>
            )}
            {block.content.image && (
              <>
                <img src={block.content.image} alt="" className="h-8 w-12 rounded object-cover ring-1 ring-white/10" />
                <button
                  type="button"
                  onClick={() => setContent({ image: undefined })}
                  className="focus-ring rounded px-2 py-1 text-[12px] text-white/40 transition hover:text-white"
                >
                  {t('editor.imageRemove')}
                </button>
              </>
            )}
          </div>

          {imageError && <p className="text-[12px] text-rose-300">{imageError}</p>}
        </div>
      )}
    </li>
  );
}

/* --------------------------------- editor -------------------------------- */

export default function DesignEditor({
  draft,
  original,
  onChange,
}: {
  draft: Project;
  original: Project;
  onChange: (next: Project) => void;
}) {
  const t = useT();
  const [frameIndex, setFrameIndex] = useState(0);
  const { ds } = draft;
  const frame = draft.frames[Math.min(frameIndex, draft.frames.length - 1)];

  const setColor = (key: 'primary' | 'secondary' | 'accent', value: string) =>
    onChange({
      ...draft,
      ds: {
        ...ds,
        color: {
          ...ds.color,
          [key]: value,
          ...(key === 'primary' ? { onPrimary: readableOn(value) } : {}),
          gradient: `linear-gradient(135deg, ${key === 'primary' ? value : ds.color.primary}, ${key === 'accent' ? value : ds.color.accent})`,
        },
      },
    });

  const setFamily = (role: 'display' | 'body', familyKey: string) => {
    const family = FAMILIES[familyKey as keyof typeof FAMILIES];
    if (!family) return;
    onChange({ ...draft, ds: { ...ds, type: { ...ds.type, [role]: family } } });
  };

  const setRadius = (md: number) =>
    onChange({
      ...draft,
      ds: {
        ...ds,
        radius: { ...ds.radius, md, sm: Math.round(md * 0.5), lg: Math.round(md * 1.6), xl: Math.round(md * 2.4) },
      },
    });

  const setSection = (section: number) =>
    onChange({ ...draft, ds: { ...ds, space: { ...ds.space, section } } });

  const setMargin = (margin: number) =>
    onChange({ ...draft, ds: { ...ds, grid: { ...ds.grid, margin } } });

  /**
   * Rescales the whole type ramp around a new base size. Editing one step in
   * isolation would break the modular relationship the generator established,
   * so every step moves by the same ratio.
   */
  const setBaseSize = (baseSize: number) => {
    const factor = baseSize / ds.type.baseSize;
    onChange({
      ...draft,
      ds: {
        ...ds,
        type: {
          ...ds.type,
          baseSize,
          scale: ds.type.scale.map((step) => ({ ...step, size: Math.round(step.size * factor) })),
        },
      },
    });
  };

  const setBlock = (next: BlockInstance) =>
    onChange({
      ...draft,
      frames: draft.frames.map((entry) =>
        entry.id === frame.id
          ? { ...entry, blocks: entry.blocks.map((b) => (b.id === next.id ? next : b)) }
          : entry,
      ),
    });

  const familyKey = (family: string) =>
    Object.entries(FAMILIES).find(([, spec]) => spec.family === family)?.[0] ?? 'inter';

  return (
    <section className="panel overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/6 text-brand-400 ring-1 ring-white/10">
            <SlidersHorizontal size={16} />
          </span>
          <div>
            <h2 className="font-display text-[15px] font-semibold tracking-tight">
              {t('editor.title')}
            </h2>
            <p className="mt-0.5 text-[12.5px] text-white/40">{t('editor.subtitle')}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onChange(original)}
          className="focus-ring flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-medium text-white/55 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
        >
          <RotateCcw size={13} /> {t('editor.reset')}
        </button>
      </header>

      <div className="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        {/* ------------------------------ tokens ----------------------------- */}
        <div className="grid gap-5 self-start">
          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              {t('editor.colors')}
            </h3>
            <div className="mt-2 divide-y divide-white/6">
              <Row label={t('color.primary')}>
                <ColorField label={t('color.primary')} value={ds.color.primary} onChange={(v) => setColor('primary', v)} />
              </Row>
              <Row label={t('color.secondary')}>
                <ColorField label={t('color.secondary')} value={ds.color.secondary} onChange={(v) => setColor('secondary', v)} />
              </Row>
              <Row label={t('color.accent')}>
                <ColorField label={t('color.accent')} value={ds.color.accent} onChange={(v) => setColor('accent', v)} />
              </Row>
              <Row label={t('color.background')}>
                <ColorField label={t('color.background')} value={ds.color.bg} onChange={(v) => onChange(reconcile(draft, v, ds.color.text))} />
              </Row>
              <Row label={t('color.text')}>
                <ColorField label={t('color.text')} value={ds.color.text} onChange={(v) => onChange(reconcile(draft, ds.color.bg, v))} />
              </Row>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              {t('editor.fonts')}
            </h3>
            <div className="mt-2 grid gap-2.5">
              {(['display', 'body'] as const).map((role) => (
                <label key={role} className="block">
                  <span className="text-[12.5px] text-white/50">
                    {role === 'display' ? t('editor.headings') : t('editor.body')}
                  </span>
                  <select
                    value={familyKey(ds.type[role].family)}
                    onChange={(e) => setFamily(role, e.target.value)}
                    className="focus-ring mt-1 w-full appearance-none rounded-lg bg-white/[0.05] px-3 py-2 text-[13px] text-white ring-1 ring-white/10 outline-none transition hover:ring-white/20"
                  >
                    {Object.entries(FAMILIES).map(([key, spec]) => (
                      <option key={key} value={key} className="bg-shell-850">
                        {spec.family}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              {t('editor.shape')}
            </h3>
            <label className="mt-2 block">
              <span className="flex items-baseline justify-between text-[12.5px] text-white/50">
                {t('editor.radius')} <span className="font-mono text-white/40">{ds.radius.md}px</span>
              </span>
              <input
                type="range"
                min={0}
                max={32}
                value={ds.radius.md}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="focus-ring mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-brand-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </label>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              {t('editor.spacing')}
            </h3>

            <label className="mt-2 block">
              <span className="flex items-baseline justify-between text-[12.5px] text-white/50">
                {t('editor.sectionGap')} <span className="font-mono text-white/40">{ds.space.section}px</span>
              </span>
              <input
                type="range"
                min={24}
                max={180}
                step={4}
                value={ds.space.section}
                onChange={(e) => setSection(Number(e.target.value))}
                className={sliderClass}
              />
            </label>

            <label className="mt-3 block">
              <span className="flex items-baseline justify-between text-[12.5px] text-white/50">
                {t('editor.innerMargins')} <span className="font-mono text-white/40">{ds.grid.margin}px</span>
              </span>
              <input
                type="range"
                min={12}
                max={120}
                step={4}
                value={ds.grid.margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className={sliderClass}
              />
            </label>

            <label className="mt-3 block">
              <span className="flex items-baseline justify-between text-[12.5px] text-white/50">
                {t('editor.baseSize')} <span className="font-mono text-white/40">{ds.type.baseSize}px</span>
              </span>
              <input
                type="range"
                min={13}
                max={22}
                value={ds.type.baseSize}
                onChange={(e) => setBaseSize(Number(e.target.value))}
                className={sliderClass}
              />
            </label>
          </div>
        </div>

        {/* ------------------------------ sections --------------------------- */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              {t('editor.sections')}
            </h3>
            {draft.frames.length > 1 && (
              <div className="flex flex-wrap gap-1.5">
                {draft.frames.map((entry, index) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setFrameIndex(index)}
                    className={cn(
                      'focus-ring rounded-lg px-2.5 py-1.5 text-[12px] font-medium ring-1 transition',
                      index === frameIndex
                        ? 'bg-white/10 text-white ring-white/25'
                        : 'text-white/45 ring-white/8 hover:bg-white/5 hover:text-white/80',
                    )}
                  >
                    {entry.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ul className="mt-3 grid gap-2">
            {frame.blocks.map((block) => (
              <BlockRow key={block.id} block={block} onChange={setBlock} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
