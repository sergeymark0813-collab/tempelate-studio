import type { CSSProperties } from 'react';
import type { BlockInstance } from '../../lib/studio/types';
import { Avatar, Btn, Chip, Container, Field, Glyph, Section, Stack, Surface, Type, useChrome, useDs, Visual } from './atoms';

/* ===========================================================================
   Flowing page blocks.

   Each export reads `block.variant` and `block.params` — the choices the
   composer made — and lays itself out accordingly. No block knows which
   project it belongs to; everything visual comes from the design system.
   =========================================================================== */

const hash = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
};

/** Section heading used by most blocks; respects the archetype's alignment. */
function Heading({ block, style }: { block: BlockInstance; style?: CSSProperties }) {
  const align = block.params.align ?? 'left';
  return (
    <Stack
      gap={14}
      align={align === 'center' ? 'center' : 'start'}
      style={{ textAlign: align === 'center' ? 'center' : 'left', maxWidth: 720, marginInline: align === 'center' ? 'auto' : undefined, ...style }}
    >
      {block.content.eyebrow && (
        <Type step="overline" tone="primary">
          {block.content.eyebrow}
        </Type>
      )}
      {block.content.title && (
        <Type step="h1" as="h2">
          {block.content.title}
        </Type>
      )}
      {block.content.subtitle && (
        <Type step="lead" tone="muted">
          {block.content.subtitle}
        </Type>
      )}
    </Stack>
  );
}

/* ---------------------------------- nav ---------------------------------- */

export function Nav({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];
  const centered = block.variant === 'centered';

  return (
    <div style={{ background: ds.color.bg, borderBottom: `1px solid ${ds.color.border}`, position: 'relative', zIndex: 2 }}>
      <Container
        style={{
          height: 76,
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          justifyContent: centered ? 'center' : 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: ds.radius.sm, background: ds.color.gradient }} />
          <Type step="h3" style={{ fontSize: 19 }}>
            {block.content.title}
          </Type>
        </div>

        <nav style={{ display: 'flex', gap: 28 }}>
          {items.map((item) => (
            <Type key={item.title} step="small" tone="muted">
              {item.title}
            </Type>
          ))}
        </nav>

        {!centered && <Btn size="sm">{block.content.cta}</Btn>}
      </Container>
    </div>
  );
}

/* --------------------------------- hero ---------------------------------- */

export function Hero({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const { variant } = block;
  const stats = block.content.items ?? [];

  const Copy = ({ center }: { center?: boolean }) => (
    <Stack gap={22} align={center ? 'center' : 'start'} style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? 780 : 620 }}>
      <Chip>{block.content.eyebrow}</Chip>
      <Type step="display" as="h1">
        {block.content.title}
      </Type>
      <Type step="lead" tone="muted">
        {block.content.subtitle}
      </Type>
      <div style={{ display: 'flex', gap: 14, marginTop: 6, flexWrap: 'wrap', justifyContent: center ? 'center' : 'flex-start' }}>
        <Btn size="lg">{block.content.cta}</Btn>
        <Btn size="lg" variant="outline">
          {block.content.ctaSecondary}
        </Btn>
      </div>
    </Stack>
  );

  if (variant === 'overlay') {
    return (
      <div style={{ position: 'relative', minHeight: 720, display: 'grid', alignItems: 'center', overflow: 'hidden' }}>
        <Visual seed={seed} src={block.content.image} radius="none" style={{ position: 'absolute', inset: 0 }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              block.params.align === 'center'
                ? `radial-gradient(80% 80% at 50% 50%, ${ds.color.bg}e0, ${ds.color.bg}f5)`
                : `linear-gradient(90deg, ${ds.color.bg} 18%, ${ds.color.bg}cc 45%, transparent 85%)`,
          }}
        />
        <Container style={{ position: 'relative', paddingBlock: ds.space.section }}>
          <div style={{ display: 'flex', justifyContent: block.params.align === 'center' ? 'center' : 'flex-start' }}>
            <Copy center={block.params.align === 'center'} />
          </div>
        </Container>
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <Section>
        <Container>
          <Stack gap={56} align="center">
            <Copy center />
            <Visual seed={seed} src={block.content.image} radius="lg" style={{ width: '100%', height: 420, boxShadow: ds.shadow.lg }} />
          </Stack>
        </Container>
      </Section>
    );
  }

  if (variant === 'stacked') {
    return (
      <Section>
        <Container>
          <Stack gap={44}>
            <Type step="display" as="h1" style={{ maxWidth: 1000 }}>
              {block.content.title}
            </Type>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ds.grid.gutter, alignItems: 'end', borderTop: `1px solid ${ds.color.border}`, paddingTop: 32 }}>
              <Type step="lead" tone="muted" style={{ maxWidth: 480 }}>
                {block.content.subtitle}
              </Type>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end' }}>
                <Btn size="lg">{block.content.cta}</Btn>
                <Btn size="lg" variant="outline">
                  {block.content.ctaSecondary}
                </Btn>
              </div>
            </div>
            <Visual seed={seed} src={block.content.image} radius="lg" style={{ width: '100%', height: 480 }} />
          </Stack>
        </Container>
      </Section>
    );
  }

  if (variant === 'asymmetric') {
    return (
      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ds.grid.gutter, alignItems: 'stretch' }}>
            <Stack gap={24} style={{ justifyContent: 'center' }}>
              <Copy />
            </Stack>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: ds.grid.gutter / 2, minHeight: 460 }}>
              {/* The wide tile is this block's image slot; the small one stays
                  procedural so an upload does not appear twice in one mosaic. */}
              <Visual seed={seed} src={block.content.image} radius="md" style={{ gridColumn: 'span 2' }} />
              <Visual seed={seed + 7} radius="md" />
              <Surface pad={22} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Type step="display" style={{ fontSize: 40 }} tone="primary">
                  {stats[0]?.value}
                </Type>
                <Type step="small" tone="muted" style={{ marginTop: 6 }}>
                  {stats[0]?.title}
                </Type>
              </Surface>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // split — the default
  return (
    <Section>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: ds.grid.gutter * 1.6, alignItems: 'center' }}>
          <Copy />
          <Visual seed={seed} src={block.content.image} radius="lg" style={{ height: 520, boxShadow: ds.shadow.lg }} />
        </div>

        {stats.length > 0 && (
          <div style={{ display: 'flex', gap: 48, marginTop: 64, borderTop: `1px solid ${ds.color.border}`, paddingTop: 32 }}>
            {stats.map((stat) => (
              <div key={stat.title}>
                <Type step="h2" tone="primary">
                  {stat.value}
                </Type>
                <Type step="small" tone="muted" style={{ marginTop: 6 }}>
                  {stat.title}
                </Type>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

/* --------------------------------- logos --------------------------------- */

export function Logos({ block }: { block: BlockInstance }) {
  const ds = useDs();
  return (
    <div style={{ background: ds.color.bg, paddingBlock: ds.space.section * 0.45, borderBlock: `1px solid ${ds.color.border}` }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
        {(block.content.items ?? []).map((item) => (
          <Type key={item.title} step="h3" style={{ fontSize: 22, opacity: 0.4 }}>
            {item.title}
          </Type>
        ))}
      </Container>
    </div>
  );
}

/* ------------------------------- pageHeader ------------------------------ */

export function PageHeader({ block }: { block: BlockInstance }) {
  const ds = useDs();
  return (
    <div style={{ background: ds.color.surface, paddingBlock: ds.space.section * 0.7 }}>
      <Container>
        <Heading block={block} />
      </Container>
    </div>
  );
}

/* ------------------------------- categories ------------------------------ */

export function Categories({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const items = block.content.items ?? [];

  if (block.variant === 'chips') {
    return (
      <Section>
        <Container>
          <Heading block={block} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
            {items.map((item, i) => (
              <Chip key={item.title} active={i === 0}>
                {item.title}
              </Chip>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.params.columns ?? 3}, minmax(0,1fr))`, gap: ds.grid.gutter, marginTop: 44 }}>
          {items.map((item, i) => (
            <div key={item.title} style={{ position: 'relative', height: 190, borderRadius: ds.radius.md, overflow: 'hidden' }}>
              <Visual src={i === 0 ? block.content.image : undefined} seed={seed + i * 11} radius="none" style={{ position: 'absolute', inset: 0 }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${ds.color.bg}e6, transparent 65%)` }} />
              <Type step="h3" style={{ position: 'absolute', left: 20, bottom: 18 }}>
                {item.title}
              </Type>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------- features ------------------------------- */

export function Features({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const items = block.content.items ?? [];
  const { variant } = block;

  if (variant === 'bento') {
    const spans = block.params.spans ?? [];
    return (
      <Section tone="surface">
        <Container>
          <Heading block={block} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gridAutoRows: 190, gap: ds.grid.gutter, marginTop: 44 }}>
            {items.map((item, i) => {
              const [col, row] = spans[i] ?? [1, 1];
              const big = col * row >= 4;
              return (
                <Surface
                  key={item.title}
                  pad={26}
                  style={{ gridColumn: `span ${col}`, gridRow: `span ${row}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}
                >
                  <Glyph seed={seed + i} size={big ? 34 : 26} />
                  <div>
                    <Type step={big ? 'h2' : 'h3'}>{item.title}</Type>
                    <Type step="small" tone="muted" style={{ marginTop: 10 }}>
                      {item.text}
                    </Type>
                  </div>
                </Surface>
              );
            })}
          </div>
        </Container>
      </Section>
    );
  }

  if (variant === 'list') {
    return (
      <Section>
        <Container>
          <Heading block={block} />
          <Stack gap={0} style={{ marginTop: 44 }}>
            {items.map((item, i) => (
              <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1.4fr', gap: 28, alignItems: 'baseline', paddingBlock: 30, borderTop: `1px solid ${ds.color.border}` }}>
                <Type step="h3" tone="faint">{`0${i + 1}`}</Type>
                <Type step="h3">{item.title}</Type>
                <Type tone="muted">{item.text}</Type>
              </div>
            ))}
          </Stack>
        </Container>
      </Section>
    );
  }

  if (variant === 'alternating') {
    return (
      <Section>
        <Container>
          <Heading block={block} />
          <Stack gap={ds.space.section * 0.6} style={{ marginTop: 56 }}>
            {items.slice(0, 3).map((item, i) => (
              <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ds.grid.gutter * 1.5, alignItems: 'center' }}>
                <Stack gap={16} style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <Glyph seed={seed + i} size={30} />
                  <Type step="h2">{item.title}</Type>
                  <Type step="lead" tone="muted">
                    {item.text}
                  </Type>
                </Stack>
                <Visual src={i === 0 ? block.content.image : undefined} seed={seed + i * 13} radius="lg" style={{ height: 340, order: i % 2 === 0 ? 1 : 0 }} />
              </div>
            ))}
          </Stack>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="surface">
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.params.columns ?? 3}, minmax(0,1fr))`, gap: ds.grid.gutter, marginTop: 48 }}>
          {items.map((item, i) => (
            <Surface key={item.title} pad={30}>
              <Glyph seed={seed + i} size={28} />
              <Type step="h3" style={{ marginTop: 20 }}>
                {item.title}
              </Type>
              <Type tone="muted" style={{ marginTop: 10 }}>
                {item.text}
              </Type>
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export const Bento = Features;

/* -------------------------------- showcase ------------------------------- */

export function Showcase({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const items = block.content.items ?? [];

  if (block.variant === 'rows') {
    return (
      <Section>
        <Container>
          <Heading block={block} />
          <Stack gap={0} style={{ marginTop: 48 }}>
            {items.slice(0, 3).map((item, i) => (
              <div key={item.title} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: ds.grid.gutter, alignItems: 'center', paddingBlock: 34, borderTop: `1px solid ${ds.color.border}` }}>
                <Stack gap={10}>
                  <Type step="h2">{item.title}</Type>
                  <Type step="small" tone="faint">
                    {item.meta}
                  </Type>
                </Stack>
                <Visual src={i === 0 ? block.content.image : undefined} seed={seed + i * 17} radius="md" style={{ height: 260 }} />
              </div>
            ))}
          </Stack>
        </Container>
      </Section>
    );
  }

  const staggered = block.variant === 'staggered';

  return (
    <Section>
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.params.columns ?? 2}, minmax(0,1fr))`, gap: ds.grid.gutter, marginTop: 48 }}>
          {items.slice(0, block.params.count ?? 4).map((item, i) => (
            <Stack key={item.title} gap={16} style={{ marginTop: staggered && i % 2 === 1 ? 64 : 0 }}>
              <Visual src={i === 0 ? block.content.image : undefined} seed={seed + i * 19} radius="md" style={{ height: staggered ? 300 + (i % 2) * 60 : 300 }} />
              <div>
                <Type step="h3">{item.title}</Type>
                <Type step="small" tone="faint" style={{ marginTop: 6 }}>
                  {item.meta}
                </Type>
              </div>
            </Stack>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------- catalog -------------------------------- */

export function Catalog({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const items = block.content.items ?? [];
  const columns = block.params.columns ?? 3;

  return (
    <Section tone="surface">
      <Container>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <Heading block={block} />
          <Btn variant="outline" size="sm">
            Весь каталог
          </Btn>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`, gap: ds.grid.gutter, marginTop: 44 }}>
          {items.slice(0, block.params.count ?? 6).map((item, i) => (
            <Surface key={item.title} pad={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <Visual src={i === 0 ? block.content.image : undefined} seed={seed + i * 23} radius="none" style={{ height: block.variant === 'masonry' ? 210 + (i % 3) * 40 : 230 }} />
              <Stack gap={8} style={{ padding: 20, flex: 1 }}>
                <Type step="h3" style={{ fontSize: 18 }}>
                  {item.title}
                </Type>
                <Type step="small" tone="faint">
                  {item.meta}
                </Type>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 14 }}>
                  <Type step="h3" style={{ fontSize: 19 }}>
                    {item.value}
                  </Type>
                  <Btn size="sm">{block.content.cta}</Btn>
                </div>
              </Stack>
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- productDetail ----------------------------- */

export function ProductDetail({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);

  return (
    <Section>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: ds.grid.gutter * 1.6 }}>
          <Stack gap={ds.grid.gutter / 2}>
            <Visual seed={seed} src={block.content.image} radius="lg" style={{ height: 460 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: ds.grid.gutter / 2 }}>
              {[0, 1, 2].map((i) => (
                <Visual src={i === 0 ? block.content.image : undefined} key={i} seed={seed + i * 29} radius="md" style={{ height: 120 }} />
              ))}
            </div>
          </Stack>

          <Stack gap={20}>
            <Type step="overline" tone="primary">
              {block.content.eyebrow}
            </Type>
            <Type step="h1" as="h1">
              {block.content.title}
            </Type>
            <Type step="lead" tone="muted">
              {block.content.body}
            </Type>
            <Type step="display" style={{ fontSize: 46 }}>
              12 400 ₽
            </Type>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn size="lg" style={{ flex: 1 }}>
                {block.content.cta}
              </Btn>
              <Btn size="lg" variant="outline">
                {block.content.ctaSecondary}
              </Btn>
            </div>
            <Stack gap={0} style={{ marginTop: 12 }}>
              {(block.content.items ?? []).map((item) => (
                <div key={item.title} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 14, borderTop: `1px solid ${ds.color.border}` }}>
                  <Type step="small" tone="muted">
                    {item.title}
                  </Type>
                  <Type step="small">{item.meta}</Type>
                </div>
              ))}
            </Stack>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------- gallery -------------------------------- */

export function Gallery({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const count = block.params.count ?? 6;

  if (block.variant === 'strip') {
    return (
      <Section>
        <Container>
          <Heading block={block} />
        </Container>
        <div style={{ display: 'flex', gap: ds.grid.gutter / 2, marginTop: 44, paddingInline: ds.grid.margin, overflow: 'hidden' }}>
          {Array.from({ length: count }, (_, i) => (
            <Visual src={i === 0 ? block.content.image : undefined} key={i} seed={seed + i * 31} radius="md" style={{ flex: '1 0 300px', height: 380 }} />
          ))}
        </div>
      </Section>
    );
  }

  if (block.variant === 'mosaic') {
    return (
      <Section>
        <Container>
          <Heading block={block} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 180, gap: ds.grid.gutter / 2, marginTop: 44 }}>
            {Array.from({ length: count }, (_, i) => {
              const wide = i % 5 === 0;
              const tall = i % 3 === 1;
              return (
                <Visual src={i === 0 ? block.content.image : undefined}
                  key={i}
                  seed={seed + i * 37}
                  radius="md"
                  style={{ gridColumn: wide ? 'span 2' : 'span 1', gridRow: tall ? 'span 2' : 'span 1', height: '100%' }}
                />
              );
            })}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: ds.grid.gutter, marginTop: 44 }}>
          {Array.from({ length: count }, (_, i) => (
            <Visual src={i === 0 ? block.content.image : undefined} key={i} seed={seed + i * 41} radius="md" style={{ height: 280 }} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------- stats --------------------------------- */

export function Stats({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  if (block.variant === 'split') {
    return (
      <Section tone="surface">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: ds.grid.gutter * 1.5, alignItems: 'center' }}>
            <Heading block={block} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ds.grid.gutter }}>
              {items.map((item) => (
                <div key={item.title} style={{ borderLeft: `2px solid ${ds.color.primary}`, paddingLeft: 20 }}>
                  <Type step="h1" tone="primary">
                    {item.value}
                  </Type>
                  <Type step="small" tone="muted" style={{ marginTop: 8 }}>
                    {item.title}
                  </Type>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  const asCards = block.variant === 'cards';

  return (
    <Section tone={asCards ? 'bg' : 'surface'}>
      <Container>
        {block.params.align === 'center' && <Heading block={block} style={{ marginBottom: 48 }} />}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))`, gap: ds.grid.gutter }}>
          {items.map((item) =>
            asCards ? (
              <Surface key={item.title} pad={28}>
                <Type step="display" style={{ fontSize: 52 }} tone="primary">
                  {item.value}
                </Type>
                <Type step="small" tone="muted" style={{ marginTop: 12 }}>
                  {item.title}
                </Type>
              </Surface>
            ) : (
              <div key={item.title}>
                <Type step="display" style={{ fontSize: 56 }}>
                  {item.value}
                </Type>
                <Type step="small" tone="muted" style={{ marginTop: 12 }}>
                  {item.title}
                </Type>
              </div>
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}

/* --------------------------------- steps --------------------------------- */

export function Steps({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];
  const timeline = block.variant === 'timeline';

  return (
    <Section>
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))`, gap: ds.grid.gutter, marginTop: 52, position: 'relative' }}>
          {timeline && <div style={{ position: 'absolute', top: 18, left: 0, right: 0, height: 1, background: ds.color.border }} />}
          {items.map((item, i) => (
            <Stack key={item.title} gap={16} style={{ position: 'relative' }}>
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: timeline ? 999 : ds.radius.sm,
                  background: i === 0 ? ds.color.primary : ds.color.surface2,
                  color: i === 0 ? ds.color.onPrimary : ds.color.textMuted,
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: ds.type.display.stack,
                  fontWeight: 700,
                  fontSize: 16,
                  border: `1px solid ${i === 0 ? 'transparent' : ds.color.border}`,
                }}
              >
                {i + 1}
              </span>
              <Type step="h3" style={{ fontSize: 20 }}>
                {item.title}
              </Type>
              <Type step="small" tone="muted">
                {item.text}
              </Type>
            </Stack>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------- pricing -------------------------------- */

export function Pricing({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  if (block.variant === 'table') {
    return (
      <Section tone="surface">
        <Container>
          <Heading block={block} />
          <Surface pad={0} style={{ marginTop: 44, overflow: 'hidden' }}>
            {items.map((item, i) => (
              <div
                key={item.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.6fr auto auto',
                  gap: 24,
                  alignItems: 'center',
                  padding: '24px 28px',
                  borderTop: i === 0 ? 'none' : `1px solid ${ds.color.border}`,
                  background: i === 1 ? ds.color.surface2 : 'transparent',
                }}
              >
                <Type step="h3" style={{ fontSize: 19 }}>
                  {item.title}
                </Type>
                <Type step="small" tone="muted">
                  {item.text}
                </Type>
                <Type step="h3" style={{ fontSize: 21 }}>
                  {item.value}
                </Type>
                <Btn size="sm" variant={i === 1 ? 'primary' : 'outline'}>
                  {block.content.cta}
                </Btn>
              </div>
            ))}
          </Surface>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="surface">
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: ds.grid.gutter, marginTop: 48, alignItems: 'start' }}>
          {items.map((item, i) => {
            const featured = i === 1;
            return (
              <Surface
                key={item.title}
                tone={featured ? 'gradient' : 'default'}
                pad={32}
                style={featured ? { transform: 'scale(1.04)', boxShadow: ds.shadow.lg } : undefined}
              >
                <Type step="h3" style={{ fontSize: 19, color: featured ? ds.color.onPrimary : undefined }}>
                  {item.title}
                </Type>
                <Type step="display" style={{ fontSize: 42, marginTop: 16, color: featured ? ds.color.onPrimary : undefined }}>
                  {item.value}
                </Type>
                <Type step="small" tone={featured ? 'onPrimary' : 'muted'} style={{ marginTop: 12, opacity: featured ? 0.85 : 1 }}>
                  {item.text}
                </Type>
                <Btn variant={featured ? 'secondary' : 'outline'} style={{ width: '100%', marginTop: 26 }}>
                  {block.content.cta}
                </Btn>
              </Surface>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------------------------- team --------------------------------- */

export function Team({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const items = block.content.items ?? [];

  return (
    <Section>
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))`, gap: ds.grid.gutter, marginTop: 48 }}>
          {items.map((item, i) => (
            <Stack key={item.title} gap={14}>
              <Visual src={i === 0 ? block.content.image : undefined} seed={seed + i * 43} radius="md" style={{ height: 260 }} />
              <div>
                <Type step="h3" style={{ fontSize: 18 }}>
                  {item.title}
                </Type>
                <Type step="small" tone="faint" style={{ marginTop: 4 }}>
                  {item.meta}
                </Type>
              </div>
            </Stack>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------- testimonials ------------------------------ */

export function Testimonials({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const items = block.content.items ?? [];

  if (block.variant === 'quote') {
    const item = items[0];
    return (
      <Section tone="surface">
        <Container>
          <Stack gap={32} align="center" style={{ textAlign: 'center', maxWidth: 900, marginInline: 'auto' }}>
            <Type step="h1" as="p">
              «{item?.text}»
            </Type>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar seed={seed} name={item?.title ?? ''} />
              <div style={{ textAlign: 'left' }}>
                <Type step="small">{item?.title}</Type>
                <Type step="small" tone="faint">
                  {item?.meta}
                </Type>
              </div>
            </div>
          </Stack>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="surface">
      <Container>
        <Heading block={block} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))`, gap: ds.grid.gutter, marginTop: 48 }}>
          {items.map((item, i) => (
            <Surface key={item.title} pad={28} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Type tone="muted" style={{ flex: 1 }}>
                «{item.text}»
              </Type>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar seed={seed + i * 47} name={item.title} size={40} />
                <div>
                  <Type step="small">{item.title}</Type>
                  <Type step="small" tone="faint">
                    {item.meta}
                  </Type>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ----------------------------------- faq --------------------------------- */

export function Faq({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];
  const twoColumn = block.variant === 'twoColumn';

  return (
    <Section>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: twoColumn ? '0.8fr 1.2fr' : '1fr', gap: ds.grid.gutter * 1.5 }}>
          <Heading block={block} />
          <Stack gap={0}>
            {items.map((item, i) => (
              <div key={item.title} style={{ paddingBlock: 24, borderTop: i === 0 && !twoColumn ? `1px solid ${ds.color.border}` : `1px solid ${ds.color.border}`, marginTop: !twoColumn && i === 0 ? 44 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'baseline' }}>
                  <Type step="h3" style={{ fontSize: 19 }}>
                    {item.title}
                  </Type>
                  <Type step="h3" tone="faint" style={{ fontSize: 22 }}>
                    {i === 0 ? '−' : '+'}
                  </Type>
                </div>
                {i === 0 && (
                  <Type tone="muted" style={{ marginTop: 12, maxWidth: 640 }}>
                    {item.text}
                  </Type>
                )}
              </div>
            ))}
          </Stack>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------ contactForm ------------------------------ */

export function ContactForm({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const fields = block.content.items ?? [];
  const split = block.variant === 'split';

  const form = (
    <Stack gap={14}>
      {fields.map((field) => (
        <Field key={field.title} label={field.title} style={field.title.length > 14 ? { paddingBlock: 34 } : undefined} />
      ))}
      <Btn size="lg" style={{ marginTop: 6 }}>
        {block.content.cta}
      </Btn>
    </Stack>
  );

  if (split) {
    return (
      <Section tone="surface">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ds.grid.gutter * 1.6, alignItems: 'center' }}>
            <Heading block={block} />
            {form}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="surface">
      <Container>
        <Surface pad={44} style={{ maxWidth: 620, marginInline: 'auto' }}>
          <Heading block={block} />
          <div style={{ marginTop: 28 }}>{form}</div>
        </Surface>
      </Container>
    </Section>
  );
}

/* ---------------------------------- cta ---------------------------------- */

export function Cta({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const invert = block.params.invert;
  const seed = hash(block.id);

  if (block.variant === 'split') {
    return (
      <Section tone="surface">
        <Container>
          <Surface tone={invert ? 'gradient' : 'default'} pad={0} style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
            <Stack gap={18} style={{ padding: 52, justifyContent: 'center' }}>
              <Type step="h1" style={{ color: invert ? ds.color.onPrimary : undefined }}>
                {block.content.title}
              </Type>
              <Type step="lead" tone={invert ? 'onPrimary' : 'muted'} style={{ opacity: invert ? 0.88 : 1 }}>
                {block.content.subtitle}
              </Type>
              <Btn size="lg" variant={invert ? 'secondary' : 'primary'} style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                {block.content.cta}
              </Btn>
            </Stack>
            <Visual seed={seed} src={block.content.image} radius="none" style={{ minHeight: 300 }} />
          </Surface>
        </Container>
      </Section>
    );
  }

  const band = block.variant === 'band';

  return (
    <div style={{ background: invert ? ds.color.primary : ds.color.bg, paddingBlock: ds.space.section }}>
      <Container>
        <Stack gap={20} align="center" style={{ textAlign: 'center' }}>
          <Type step="display" style={{ fontSize: 52, color: invert ? ds.color.onPrimary : undefined, maxWidth: 800 }}>
            {block.content.title}
          </Type>
          <Type step="lead" tone={invert ? 'onPrimary' : 'muted'} style={{ opacity: invert ? 0.86 : 1, maxWidth: 560 }}>
            {block.content.subtitle}
          </Type>
          <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
            <Btn size="lg" variant={invert ? 'secondary' : 'primary'}>
              {block.content.cta}
            </Btn>
            {!band && (
              <Btn size="lg" variant="outline">
                {block.content.ctaSecondary}
              </Btn>
            )}
          </div>
        </Stack>
      </Container>
    </div>
  );
}

/* --------------------------------- footer -------------------------------- */

export function Footer({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const chrome = useChrome();
  const items = block.content.items ?? [];

  if (block.variant === 'minimal') {
    return (
      <div style={{ background: ds.color.bg, borderTop: `1px solid ${ds.color.border}`, paddingBlock: 32 }}>
        <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <Type step="small" tone="faint">
            © {new Date().getFullYear()} {block.content.title}
          </Type>
          <div style={{ display: 'flex', gap: 22 }}>
            {items.map((item) => (
              <Type key={item.title} step="small" tone="muted">
                {item.title}
              </Type>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  const big = block.variant === 'big';

  return (
    <div style={{ background: ds.color.surface, borderTop: `1px solid ${ds.color.border}`, paddingBlock: big ? ds.space.section * 0.9 : 56 }}>
      <Container>
        {big && (
          <Type step="display" style={{ fontSize: 88, marginBottom: 56 }}>
            {block.content.title}
          </Type>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: ds.grid.gutter }}>
          <Stack gap={14}>
            {!big && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: ds.radius.sm, background: ds.color.gradient }} />
                <Type step="h3" style={{ fontSize: 18 }}>
                  {block.content.title}
                </Type>
              </div>
            )}
            <Type step="small" tone="faint" style={{ maxWidth: 300 }}>
              {block.content.subtitle}
            </Type>
          </Stack>

          {[0, 1, 2].map((column) => (
            <Stack key={column} gap={12}>
              <Type step="overline" tone="faint">
                {chrome.footerColumns[column]}
              </Type>
              {items.slice(column, column + 3).map((item) => (
                <Type key={item.title} step="small" tone="muted">
                  {item.title}
                </Type>
              ))}
            </Stack>
          ))}
        </div>

        <div style={{ marginTop: 44, paddingTop: 24, borderTop: `1px solid ${ds.color.border}`, display: 'flex', justifyContent: 'space-between' }}>
          <Type step="small" tone="faint">
            © {new Date().getFullYear()} {block.content.title}
          </Type>
          <Type step="small" tone="faint">
            {chrome.privacy}
          </Type>
        </div>
      </Container>
    </div>
  );
}

/* -------------------------------- authForm ------------------------------- */

export function AuthForm({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const fields = block.content.items ?? [];

  const card = (
    <Surface pad={44} style={{ width: '100%', maxWidth: 440 }}>
      <Stack gap={10}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 32, height: 32, borderRadius: ds.radius.sm, background: ds.color.gradient }} />
          <Type step="h3" style={{ fontSize: 18 }}>
            {block.content.eyebrow}
          </Type>
        </div>
        <Type step="h2">{block.content.title}</Type>
        <Type step="small" tone="muted">
          {block.content.subtitle}
        </Type>
      </Stack>

      <Stack gap={12} style={{ marginTop: 28 }}>
        {fields.map((field) => (
          <Field key={field.title} label={field.title} />
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlock: 4 }}>
          <Type step="small" tone="faint">
            Запомнить меня
          </Type>
          <Type step="small" tone="primary">
            Забыли пароль?
          </Type>
        </div>
        <Btn size="lg" style={{ width: '100%' }}>
          {block.content.cta}
        </Btn>
        <Btn size="lg" variant="outline" style={{ width: '100%' }}>
          {block.content.ctaSecondary}
        </Btn>
      </Stack>
    </Surface>
  );

  if (block.variant === 'split') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 900, background: ds.color.bg }}>
        <div style={{ display: 'grid', placeItems: 'center', padding: 48 }}>{card}</div>
        <Visual src={block.content.image} seed={seed} radius="none" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: 900, background: ds.color.bg, display: 'grid', placeItems: 'center', padding: 48, position: 'relative', overflow: 'hidden' }}>
      {block.variant === 'card' && <Visual seed={seed} radius="none" style={{ position: 'absolute', inset: 0, opacity: 0.28 }} />}
      <div style={{ position: 'relative' }}>{card}</div>
    </div>
  );
}
