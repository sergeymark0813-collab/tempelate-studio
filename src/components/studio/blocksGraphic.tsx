import type { CSSProperties } from 'react';
import type { BlockInstance } from '../../lib/studio/types';
import { Btn, Glyph, Stack, Surface, Type, useDs, Visual } from './atoms';
import { LogoGlyph } from './LogoMark';

/* ===========================================================================
   Fixed-artboard blocks: posters, slides, cards, email and logo sheets.

   These fill their canvas rather than flowing, so each one lays itself out
   against 100% height and leaves the safe margins the format needs.
   =========================================================================== */

const hash = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
};

const fill: CSSProperties = { width: '100%', height: '100%', boxSizing: 'border-box' };

/* -------------------------------- posters -------------------------------- */

export function Poster({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const centered = block.variant === 'centered';
  const corner = block.variant === 'corner';

  if (block.variant === 'split') {
    return (
      <div style={{ ...fill, display: 'grid', gridTemplateColumns: '1.05fr 1fr', background: ds.color.bg }}>
        <div style={{ padding: 64, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Type step="overline" tone="primary">
            {block.content.eyebrow}
          </Type>
          <Stack gap={18}>
            <Type step="display" style={{ fontSize: 62 }}>
              {block.content.title}
            </Type>
            <Type step="lead" tone="muted" style={{ maxWidth: 420 }}>
              {block.content.subtitle}
            </Type>
          </Stack>
          <Btn size="lg">{block.content.cta}</Btn>
        </div>
        <Visual src={block.content.image} seed={seed} radius="none" />
      </div>
    );
  }

  return (
    <div style={{ ...fill, position: 'relative', background: ds.color.bg, overflow: 'hidden' }}>
      <Visual src={block.content.image} seed={seed} radius="none" style={{ position: 'absolute', inset: 0, opacity: corner ? 1 : 0.9 }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: centered
            ? `radial-gradient(70% 70% at 50% 50%, ${ds.color.bg}f2, ${ds.color.bg}b0)`
            : `linear-gradient(to top, ${ds.color.bg} 8%, transparent 78%)`,
        }}
      />
      <div
        style={{
          position: 'relative',
          ...fill,
          padding: 64,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: centered ? 'center' : 'flex-end',
          alignItems: centered ? 'center' : 'flex-start',
          textAlign: centered ? 'center' : 'left',
          gap: 20,
        }}
      >
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <Type step="display" style={{ fontSize: 72, maxWidth: 820 }}>
          {block.content.title}
        </Type>
        <Type step="lead" tone="muted" style={{ maxWidth: 560 }}>
          {block.content.subtitle}
        </Type>
        <Btn size="lg" style={{ marginTop: 10 }}>
          {block.content.cta}
        </Btn>
      </div>
    </div>
  );
}

export function PosterTall({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const overlay = block.variant === 'overlay';

  if (overlay) {
    return (
      <div style={{ ...fill, position: 'relative', overflow: 'hidden', background: ds.color.bg }}>
        <Visual src={block.content.image} seed={seed} radius="none" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${ds.color.bg} 12%, transparent 70%)` }} />
        <div style={{ position: 'relative', ...fill, padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 18 }}>
          <Type step="overline" tone="primary">
            {block.content.eyebrow}
          </Type>
          <Type step="display" style={{ fontSize: 66 }}>
            {block.content.title}
          </Type>
          <Type tone="muted">{block.content.subtitle}</Type>
          <Btn size="lg" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
            {block.content.cta}
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...fill, background: ds.color.bg, padding: 56, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <span style={{ width: 34, height: 34, borderRadius: ds.radius.sm, background: ds.color.gradient }} />
      </div>

      <Type step="display" style={{ fontSize: 68 }}>
        {block.content.title}
      </Type>

      <Visual src={block.content.image} seed={seed} style={{ flex: 1, minHeight: 0 }} />

      <Stack gap={16}>
        <Type step="lead" tone="muted">
          {block.content.subtitle}
        </Type>
        <Btn size="lg">{block.content.cta}</Btn>
      </Stack>
    </div>
  );
}

export function PosterStory({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);

  return (
    <div style={{ ...fill, position: 'relative', background: ds.color.bg, overflow: 'hidden' }}>
      <Visual src={block.content.image} seed={seed} radius="none" style={{ position: 'absolute', inset: 0, opacity: 0.85 }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${ds.color.bg}cc 0%, transparent 35%, ${ds.color.bg} 92%)` }} />
      {/* Safe margins: interface chrome eats roughly 250px top and bottom. */}
      <div style={{ position: 'relative', ...fill, padding: '160px 64px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <Stack gap={20}>
          <Type step="display" style={{ fontSize: 84 }}>
            {block.content.title}
          </Type>
          <Type step="lead" tone="muted">
            {block.content.subtitle}
          </Type>
        </Stack>
        <Btn size="lg" style={{ alignSelf: 'flex-start' }}>
          {block.content.cta}
        </Btn>
      </div>
    </div>
  );
}

/* --------------------------------- slides -------------------------------- */

export function SlideTitle({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const centered = block.variant === 'centered';

  if (centered) {
    return (
      <div style={{ ...fill, background: ds.color.bg, padding: 90, display: 'grid', placeItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Visual seed={seed} radius="none" style={{ position: 'absolute', inset: 0, opacity: 0.16 }} />
        <Stack gap={26} align="center" style={{ position: 'relative' }}>
          <Type step="overline" tone="primary">
            {block.content.eyebrow}
          </Type>
          <Type step="display" style={{ fontSize: 82, maxWidth: 1100 }}>
            {block.content.title}
          </Type>
          <Type step="lead" tone="muted">
            {block.content.subtitle}
          </Type>
        </Stack>
      </div>
    );
  }

  return (
    <div style={{ ...fill, background: ds.color.bg, display: 'grid', gridTemplateColumns: '1.15fr 1fr' }}>
      <div style={{ padding: 90, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <Type step="display" style={{ fontSize: 76 }}>
          {block.content.title}
        </Type>
        <Type step="lead" tone="muted">
          {block.content.subtitle}
        </Type>
      </div>
      <Visual src={block.content.image} seed={seed} radius="none" />
    </div>
  );
}

export function SlideContent({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const items = block.content.items ?? [];
  const asList = block.variant === 'list';

  return (
    <div style={{ ...fill, background: ds.color.bg, padding: 90, display: 'flex', flexDirection: 'column', gap: 44 }}>
      <Stack gap={14}>
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <Type step="h1" style={{ fontSize: 54 }}>
          {block.content.title}
        </Type>
      </Stack>

      {asList ? (
        <Stack gap={0} style={{ width: '100%' }}>
          {items.map((item, i) => (
            <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1.3fr', gap: 28, alignItems: 'baseline', padding: '26px 0', borderTop: `1px solid ${ds.color.border}` }}>
              <Type step="h3" tone="faint">{`0${i + 1}`}</Type>
              <Type step="h3">{item.title}</Type>
              <Type tone="muted">{item.text}</Type>
            </div>
          ))}
        </Stack>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length || 3}, minmax(0,1fr))`, gap: 28, flex: 1 }}>
          {items.map((item, i) => (
            <Surface key={item.title} pad={34} style={{ display: 'flex', flexDirection: 'column' }}>
              <Glyph seed={seed + i} size={32} />
              <Type step="h3" style={{ marginTop: 22 }}>
                {item.title}
              </Type>
              <Type tone="muted" style={{ marginTop: 12 }}>
                {item.text}
              </Type>
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}

export function SlideStats({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  return (
    <div style={{ ...fill, background: ds.color.bg, padding: 90, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 60 }}>
      <Stack gap={14}>
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <Type step="h1" style={{ fontSize: 54 }}>
          {block.content.title}
        </Type>
      </Stack>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length || 3}, minmax(0,1fr))`, gap: 40 }}>
        {items.map((item) => (
          <div key={item.title} style={{ borderTop: `3px solid ${ds.color.primary}`, paddingTop: 24 }}>
            <Type step="display" style={{ fontSize: 92 }} tone="primary">
              {item.value}
            </Type>
            <Type step="lead" tone="muted" style={{ marginTop: 14 }}>
              {item.title}
            </Type>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ business card ---------------------------- */

export function CardFront({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const centered = block.variant === 'centered';
  const corner = block.variant === 'corner';

  return (
    <div style={{ ...fill, background: ds.color.bg, position: 'relative', overflow: 'hidden', padding: 64, display: 'flex', flexDirection: 'column', justifyContent: centered ? 'center' : 'space-between', alignItems: centered ? 'center' : 'flex-start', textAlign: centered ? 'center' : 'left' }}>
      {corner && (
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: 999, background: ds.color.gradient, opacity: 0.9 }} />
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 40, height: 40, borderRadius: ds.radius.sm, background: ds.color.gradient }} />
        <Type step="h3" style={{ fontSize: 24 }}>
          {block.content.eyebrow}
        </Type>
      </div>

      <div style={{ position: 'relative' }}>
        <Type step="display" style={{ fontSize: 46 }}>
          {block.content.title}
        </Type>
        <Type step="lead" tone="muted" style={{ marginTop: 8 }}>
          {block.content.subtitle}
        </Type>
      </div>

      {!centered && !corner && <Visual seed={seed} style={{ position: 'absolute', right: -40, bottom: -40, width: 220, height: 220, opacity: 0.5 }} />}
    </div>
  );
}

export function CardBack({ block }: { block: BlockInstance }) {
  const ds = useDs();

  return (
    <div style={{ ...fill, background: ds.color.surface, padding: 64, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Type step="h3" style={{ fontSize: 22 }}>
        {block.content.title}
      </Type>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
        <Stack gap={10}>
          {(block.content.items ?? []).map((item) => (
            <Type key={item.title} step="lead" tone="muted">
              {item.title}
            </Type>
          ))}
        </Stack>

        {/* QR stand-in — a real code is generated at production, the block reserves its footprint. */}
        <div style={{ width: 108, height: 108, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, flexShrink: 0 }}>
          {Array.from({ length: 49 }, (_, i) => (
            <span key={i} style={{ background: (i * 7 + (i % 5)) % 3 === 0 ? ds.color.text : 'transparent', borderRadius: 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- email --------------------------------- */

export function EmailHeader({ block }: { block: BlockInstance }) {
  const ds = useDs();
  return (
    <div style={{ padding: '24px 32px', borderBottom: `1px solid ${ds.color.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: ds.color.surface }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 24, height: 24, borderRadius: ds.radius.sm, background: ds.color.gradient }} />
        <Type step="h3" style={{ fontSize: 17 }}>
          {block.content.title}
        </Type>
      </div>
      <Type step="small" tone="faint">
        {block.content.subtitle}
      </Type>
    </div>
  );
}

export function EmailHero({ block }: { block: BlockInstance }) {
  const seed = hash(block.id);
  return (
    <div style={{ padding: 32 }}>
      <Visual src={block.content.image} seed={seed} style={{ height: 220, marginBottom: 26 }} />
      <Stack gap={14}>
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <Type step="h2" style={{ fontSize: 30 }}>
          {block.content.title}
        </Type>
        <Type tone="muted">{block.content.subtitle}</Type>
        <Btn size="lg" style={{ marginTop: 8 }}>
          {block.content.cta}
        </Btn>
      </Stack>
    </div>
  );
}

export function EmailCards({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);

  return (
    <div style={{ padding: '0 32px 32px' }}>
      <Type step="h3" style={{ fontSize: 18, marginBottom: 16 }}>
        {block.content.title}
      </Type>
      <Stack gap={14} style={{ width: '100%' }}>
        {(block.content.items ?? []).map((item, i) => (
          <Surface key={item.title} pad={14} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Visual seed={seed + i * 5} radius="md" style={{ width: 84, height: 84, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <Type step="h3" style={{ fontSize: 16 }}>
                {item.title}
              </Type>
              <Type step="small" tone="faint" style={{ marginTop: 4 }}>
                {item.meta}
              </Type>
              <Type step="h3" style={{ fontSize: 17, marginTop: 8, color: ds.color.primary }}>
                {item.value}
              </Type>
            </div>
          </Surface>
        ))}
      </Stack>
    </div>
  );
}

export function EmailCta({ block }: { block: BlockInstance }) {
  return (
    <div style={{ padding: '0 32px 32px' }}>
      <Surface tone="gradient" pad={28}>
        <Stack gap={14} align="center">
          <Type step="h3" style={{ fontSize: 22 }}>
            {block.content.title}
          </Type>
          <Type step="small" style={{ textAlign: 'center', opacity: 0.9 }}>
            {block.content.subtitle}
          </Type>
          <Btn variant="secondary">{block.content.cta}</Btn>
        </Stack>
      </Surface>
    </div>
  );
}

export function EmailFooter({ block }: { block: BlockInstance }) {
  const ds = useDs();
  return (
    <div style={{ padding: 32, background: ds.color.surface2, textAlign: 'center' }}>
      <Type step="small" tone="muted">
        {block.content.title}
      </Type>
      <Type step="small" tone="faint" style={{ marginTop: 8 }}>
        {block.content.subtitle}
      </Type>
      <Type step="small" tone="faint" style={{ marginTop: 12, textDecoration: 'underline' }}>
        Отписаться от рассылки
      </Type>
    </div>
  );
}

/* ---------------------------------- logo --------------------------------- */

/**
 * Primary lockup.
 *
 * The mark comes from `spec.ts` — a constructed symbol, not the brand's first
 * letter dropped into a circle. The construction grid behind it is shown
 * because the geometry really is built on one.
 */
export function LogoMark({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const spec = block.mark;
  const name = block.content.title ?? '';

  if (!spec) return null;

  const vertical = spec.lockup === 'vertical' || spec.lockup === 'markOnly';
  const showMark = spec.lockup !== 'textOnly';
  const showName = spec.lockup !== 'markOnly';

  return (
    <div style={{ ...fill, background: ds.color.bg, display: 'grid', placeItems: 'center', padding: 64 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: vertical ? 'column' : 'row',
          alignItems: 'center',
          gap: vertical ? 28 : 30,
        }}
      >
        {showMark && (
          <div style={{ position: 'relative', display: 'grid', placeItems: 'center', padding: 26 }}>
            {/* Construction field: the mark is drawn on a real grid. */}
            <div style={{ position: 'absolute', inset: 0, border: `1px dashed ${ds.color.border}` }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: ds.color.border }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: ds.color.border }} />
            <LogoGlyph spec={spec} c1={ds.color.primary} c2={ds.color.accent} bg={ds.color.bg} size={200} />
          </div>
        )}

        {showName && (
          <Stack gap={10} align={vertical ? 'center' : 'start'}>
            <Type
              step="display"
              style={{
                fontSize: vertical ? 52 : 58,
                // A wordmark is the mark: it gets tighter tracking and more weight.
                letterSpacing: spec.construction === 'letterform' ? '-0.04em' : undefined,
              }}
            >
              {name}
            </Type>
            <Type step="overline" tone="muted">
              {block.content.subtitle}
            </Type>
          </Stack>
        )}
      </div>
    </div>
  );
}

/** The four versions any real identity has to ship. */
export function LogoVariants({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const spec = block.mark;
  if (!spec) return null;

  const Variant = ({ bg, c1, c2, label }: { bg: string; c1: string; c2: string; label: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ background: bg, borderRadius: ds.radius.md, flex: 1, display: 'grid', placeItems: 'center', border: `1px solid ${ds.color.border}`, minHeight: 130 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LogoGlyph spec={spec} c1={c1} c2={c2} bg={bg} size={62} />
          {spec.lockup !== 'markOnly' && (
            <span style={{ fontFamily: ds.type.display.stack, fontWeight: 700, fontSize: 24, color: c1 }}>
              {block.content.title}
            </span>
          )}
        </div>
      </div>
      <Type step="small" tone="faint">
        {label}
      </Type>
    </div>
  );

  return (
    <div style={{ ...fill, background: ds.color.bg, padding: 64, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Stack gap={8}>
        <Type step="h1" style={{ fontSize: 36 }}>
          Варианты знака
        </Type>
        <Type step="small" tone="muted">
          Знак обязан работать в один цвет — иначе он развалится на печати и в мелком размере.
        </Type>
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: '1fr 1fr', gap: 22, flex: 1, minHeight: 0 }}>
        <Variant bg={ds.color.bg} c1={ds.color.primary} c2={ds.color.accent} label="Основная, в цвете" />
        <Variant bg={ds.color.primary} c1={ds.color.onPrimary} c2={ds.color.onPrimary} label="Инверсная, на фирменном фоне" />
        <Variant bg={ds.color.surface2} c1={ds.color.text} c2={ds.color.text} label="Монохромная" />
        <Variant bg={ds.color.text} c1={ds.color.bg} c2={ds.color.bg} label="Выворотка" />
      </div>
    </div>
  );
}

/** How the mark behaves on real carriers, plus the size and clear-space rules. */
export function LogoUsage({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const spec = block.mark;
  if (!spec) return null;

  return (
    <div style={{ ...fill, background: ds.color.bg, padding: 64, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Type step="h1" style={{ fontSize: 36 }}>
        Носители и правила
      </Type>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
        {/* Signage */}
        <div style={{ position: 'relative', borderRadius: ds.radius.md, overflow: 'hidden' }}>
          <Visual src={block.content.image} seed={seed} radius="none" style={{ position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <LogoGlyph spec={spec} c1={ds.color.onPrimary} c2={ds.color.onPrimary} bg="transparent" size={64} />
              {spec.lockup !== 'markOnly' && (
                <span style={{ fontFamily: ds.type.display.stack, fontWeight: 700, fontSize: 34, color: ds.color.onPrimary }}>
                  {block.content.title}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* App icon — the hardest test of a mark. */}
        <div style={{ background: ds.color.surface, borderRadius: ds.radius.md, display: 'grid', placeItems: 'center', border: `1px solid ${ds.color.border}`, gap: 14 }}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 24,
              background: ds.color.primary,
              display: 'grid',
              placeItems: 'center',
              boxShadow: ds.shadow.md,
            }}
          >
            <LogoGlyph spec={spec} c1={ds.color.onPrimary} c2={ds.color.onPrimary} bg={ds.color.primary} size={62} />
          </div>
          <Type step="small" tone="faint">
            Иконка приложения
          </Type>
        </div>

        {/* Rules */}
        <div style={{ background: ds.color.surface2, borderRadius: ds.radius.md, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            <LogoGlyph spec={spec} c1={ds.color.text} c2={ds.color.textMuted} bg={ds.color.surface2} size={44} />
            <LogoGlyph spec={spec} c1={ds.color.text} c2={ds.color.textMuted} bg={ds.color.surface2} size={26} />
            <LogoGlyph spec={spec} c1={ds.color.text} c2={ds.color.textMuted} bg={ds.color.surface2} size={16} />
          </div>
          <Type step="small" tone="faint">
            Знак построен на сетке {spec.grid}×{spec.grid}. Минимальная высота — 16px. Защитное поле
            равно половине высоты знака со всех сторон.
          </Type>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ product card ----------------------------- */

export function ProductCard({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const badges = block.content.items ?? [];

  return (
    <div style={{ ...fill, background: ds.color.bg, padding: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <Visual src={block.content.image} seed={seed} radius="lg" style={{ position: 'absolute', inset: 0 }} />
        <span
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            padding: '8px 16px',
            borderRadius: 999,
            background: ds.color.accent,
            color: ds.color.onPrimary,
            fontFamily: ds.type.body.stack,
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {badges[0]?.title}
        </span>
      </div>

      <Stack gap={12}>
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
        <Type step="h1" style={{ fontSize: 40 }}>
          {block.content.title}
        </Type>
        <Type step="lead" tone="muted">
          {block.content.subtitle}
        </Type>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6 }}>
          <Type step="display" style={{ fontSize: 52 }}>
            12 400 ₽
          </Type>
          <Type step="lead" tone="faint" style={{ textDecoration: 'line-through' }}>
            15 900 ₽
          </Type>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Glyph seed={seed} size={18} />
            <Type step="lead">{badges[1]?.title}</Type>
          </span>
        </div>

        <Btn size="lg" style={{ width: '100%', marginTop: 6 }}>
          {block.content.cta}
        </Btn>
      </Stack>
    </div>
  );
}
