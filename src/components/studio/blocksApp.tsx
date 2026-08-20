import type { BlockInstance } from '../../lib/studio/types';
import { Avatar, Btn, Chip, Field, Glyph, Stack, Surface, Type, useDs, Visual } from './atoms';

/* ===========================================================================
   Interface blocks: dashboard widgets, mobile screens and the component sheet.

   Dashboard blocks render into the content area of the desktop chrome; mobile
   blocks render inside the phone frame. Both are drawn from the same tokens as
   the marketing blocks, which is what makes a product and its landing page look
   like one system.
   =========================================================================== */

const hash = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
};

/** Deterministic pseudo-series for charts, so bars don't reshuffle on re-render. */
const series = (seed: number, count: number) =>
  Array.from({ length: count }, (_, i) => {
    const value = Math.sin(seed * 0.7 + i * 0.9) * 0.5 + Math.sin(i * 0.35) * 0.3 + 0.55;
    return Math.max(0.12, Math.min(1, value));
  });

/* -------------------------------- dashboard ------------------------------ */

export function Kpis({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))`, gap: ds.grid.gutter }}>
      {items.map((item, i) => {
        const positive = (item.meta ?? '').startsWith('+');
        return (
          <Surface key={item.title} pad={22}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Type step="small" tone="muted">
                {item.title}
              </Type>
              <Glyph seed={hash(block.id) + i} size={18} />
            </div>
            <Type step="h1" style={{ fontSize: 34, marginTop: 14 }}>
              {item.value}
            </Type>
            <Type step="small" style={{ marginTop: 8, color: positive ? ds.color.success : ds.color.danger }}>
              {item.meta} за неделю
            </Type>
          </Surface>
        );
      })}
    </div>
  );
}

export function Chart({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const data = series(seed, 14);
  const bars = block.variant === 'bars';

  const points = data.map((value, i) => `${(i / (data.length - 1)) * 100},${(1 - value) * 100}`).join(' ');

  return (
    <Surface pad={24} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Type step="h3" style={{ fontSize: 17 }}>
          {block.content.title}
        </Type>
        <div style={{ display: 'flex', gap: 8 }}>
          <Chip active>7 дней</Chip>
          <Chip>30 дней</Chip>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 190, marginTop: 22, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        {bars ? (
          data.map((value, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${value * 100}%`,
                borderRadius: `${ds.radius.sm}px ${ds.radius.sm}px 0 0`,
                background: i === data.length - 1 ? ds.color.primary : ds.color.surface3,
              }}
            />
          ))
        ) : (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: 190 }}>
            <defs>
              <linearGradient id={`fill-${seed}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ds.color.primary} stopOpacity="0.45" />
                <stop offset="100%" stopColor={ds.color.primary} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,100 ${points} 100,100`} fill={`url(#fill-${seed})`} />
            <polyline points={points} fill="none" stroke={ds.color.primary} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
      </div>
    </Surface>
  );
}

export function Table({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];
  const statuses = ['В работе', 'Новая', 'Готово', 'Пауза'];

  return (
    <Surface pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: `1px solid ${ds.color.border}` }}>
        <Type step="h3" style={{ fontSize: 17 }}>
          {block.content.title}
        </Type>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Field label="Поиск" style={{ paddingBlock: 8, minWidth: 180 }} />
          <Btn size="sm">Добавить</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.6fr 1fr 1fr', gap: 16, padding: '12px 24px', background: ds.color.surface2 }}>
        {['Название', 'Описание', 'Статус', 'Сумма'].map((title) => (
          <Type key={title} step="small" tone="faint">
            {title}
          </Type>
        ))}
      </div>

      {items.map((item, i) => (
        <div
          key={item.title}
          style={{ display: 'grid', gridTemplateColumns: '2fr 1.6fr 1fr 1fr', gap: 16, padding: '16px 24px', alignItems: 'center', borderTop: `1px solid ${ds.color.border}` }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar seed={hash(block.id) + i} name={item.title} size={28} />
            <Type step="small">{item.title}</Type>
          </div>
          <Type step="small" tone="muted">
            {item.meta}
          </Type>
          <span>
            <Chip active={i % 3 === 0}>{statuses[i % statuses.length]}</Chip>
          </span>
          <Type step="small">{item.value}</Type>
        </div>
      ))}
    </Surface>
  );
}

export function Activity({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  return (
    <Surface pad={24} style={{ height: '100%' }}>
      <Type step="h3" style={{ fontSize: 17 }}>
        {block.content.title}
      </Type>
      <Stack gap={0} style={{ marginTop: 12 }}>
        {items.map((item, i) => (
          <div key={`${item.title}-${i}`} style={{ display: 'flex', gap: 12, paddingBlock: 14, borderTop: i === 0 ? 'none' : `1px solid ${ds.color.border}` }}>
            <Avatar seed={hash(block.id) + i * 3} name={item.title} size={32} />
            <div style={{ minWidth: 0 }}>
              <Type step="small">
                <b>{item.title}</b> {item.text}
              </Type>
              <Type step="small" tone="faint" style={{ marginTop: 4 }}>
                {item.meta}
              </Type>
            </div>
          </div>
        ))}
      </Stack>
    </Surface>
  );
}

export function Board({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);
  const columns = block.content.items ?? [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))`, gap: ds.grid.gutter, height: '100%' }}>
      {columns.map((column, ci) => (
        <div key={column.title} style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Type step="small" tone="muted">
              {column.title}
            </Type>
            <Type step="small" tone="faint">
              {2 + ((ci * 3) % 4)}
            </Type>
          </div>

          {Array.from({ length: 2 + (ci % 2) }, (_, i) => (
            <Surface key={i} pad={16}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <span style={{ width: 28, height: 4, borderRadius: 999, background: [ds.color.primary, ds.color.accent, ds.color.secondary][(ci + i) % 3] }} />
              </div>
              <Type step="small" style={{ fontWeight: 600 }}>
                Задача {ci + 1}.{i + 1}
              </Type>
              <Type step="small" tone="faint" style={{ marginTop: 6 }}>
                Обновлено сегодня
              </Type>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                <Avatar seed={seed + ci * 5 + i} name={`И${ci}`} size={24} />
                <Glyph seed={seed + i} size={14} />
              </div>
            </Surface>
          ))}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- mobile -------------------------------- */

export function MobileHeader({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const search = block.variant === 'search';

  return (
    <div style={{ padding: '8px 20px 16px', background: ds.color.bg }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Type step="small" tone="faint">
            {block.content.subtitle}
          </Type>
          <Type step="h3" style={{ fontSize: 22, marginTop: 2 }}>
            {block.content.title}
          </Type>
        </div>
        <Avatar seed={hash(block.id)} name={block.content.title ?? 'A'} size={38} />
      </div>
      {search && <Field label="Поиск" style={{ marginTop: 14, paddingBlock: 11 }} />}
    </div>
  );
}

export function MobileHero({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);

  if (block.variant === 'plain') {
    return (
      <div style={{ padding: '4px 20px 16px' }}>
        <Type step="h2" style={{ fontSize: 26 }}>
          {block.content.title}
        </Type>
        <Btn style={{ marginTop: 16, width: '100%' }}>{block.content.cta}</Btn>
      </div>
    );
  }

  return (
    <div style={{ padding: '4px 20px 16px' }}>
      <Surface tone="gradient" pad={20} style={{ position: 'relative', overflow: 'hidden' }}>
        <Visual seed={seed} radius="none" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div style={{ position: 'relative' }}>
          <Type step="overline" style={{ color: ds.color.onPrimary, opacity: 0.8 }}>
            {block.content.eyebrow}
          </Type>
          <Type step="h3" style={{ fontSize: 21, marginTop: 8, color: ds.color.onPrimary }}>
            {block.content.title}
          </Type>
          <Btn variant="secondary" size="sm" style={{ marginTop: 16 }}>
            {block.content.cta}
          </Btn>
        </div>
      </Surface>
    </div>
  );
}

export function MobileChips({ block }: { block: BlockInstance }) {
  // Chips overflow the phone width on purpose — the row scrolls horizontally.
  return (
    <div style={{ display: 'flex', gap: 8, padding: '4px 20px 14px', overflow: 'hidden' }}>
      {(block.content.items ?? []).map((item, i) => (
        <Chip key={item.title} active={i === 0}>
          {item.title}
        </Chip>
      ))}
    </div>
  );
}

export function MobileCards({ block }: { block: BlockInstance }) {
  const seed = hash(block.id);
  const items = block.content.items ?? [];
  const grid = block.variant === 'grid';

  return (
    <div style={{ padding: '4px 20px 16px' }}>
      <Type step="h3" style={{ fontSize: 18, marginBottom: 12 }}>
        {block.content.title}
      </Type>

      <div style={{ display: 'grid', gridTemplateColumns: grid ? '1fr 1fr' : '1fr', gap: 12 }}>
        {items.slice(0, grid ? 4 : 3).map((item, i) =>
          grid ? (
            <Surface key={item.title} pad={0} style={{ overflow: 'hidden' }}>
              <Visual seed={seed + i * 13} radius="none" style={{ height: 96 }} />
              <div style={{ padding: 12 }}>
                <Type step="small" style={{ fontWeight: 600 }}>
                  {item.title}
                </Type>
                <Type step="small" tone="primary" style={{ marginTop: 6 }}>
                  {item.value}
                </Type>
              </div>
            </Surface>
          ) : (
            <Surface key={item.title} pad={12} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Visual seed={seed + i * 13} radius="sm" style={{ width: 64, height: 64, flexShrink: 0, minHeight: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Type step="small" style={{ fontWeight: 600 }}>
                  {item.title}
                </Type>
                <Type step="small" tone="faint" style={{ marginTop: 4 }}>
                  {item.meta}
                </Type>
              </div>
              <Type step="small" tone="primary">
                {item.value}
              </Type>
            </Surface>
          ),
        )}
      </div>
    </div>
  );
}

export function MobileList({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  return (
    <div style={{ padding: '4px 20px 16px' }}>
      <Type step="h3" style={{ fontSize: 18, marginBottom: 8 }}>
        {block.content.title}
      </Type>
      <Stack gap={0}>
        {items.map((item, i) => (
          <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBlock: 13, borderTop: i === 0 ? 'none' : `1px solid ${ds.color.border}` }}>
            <Glyph seed={hash(block.id) + i} size={20} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Type step="small" style={{ fontWeight: 600 }}>
                {item.title}
              </Type>
              <Type step="small" tone="faint" style={{ marginTop: 2 }}>
                {item.meta}
              </Type>
            </div>
            <Type step="small" tone="faint">
              ›
            </Type>
          </div>
        ))}
      </Stack>
    </div>
  );
}

export function MobileStats({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  return (
    <div style={{ padding: '4px 20px 16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 10 }}>
        {items.map((item) => (
          <Surface key={item.title} pad={14} style={{ textAlign: 'center' }}>
            <Type step="h3" style={{ fontSize: 20, color: ds.color.primary }}>
              {item.value}
            </Type>
            <Type step="small" tone="faint" style={{ marginTop: 4, fontSize: 11 }}>
              {item.title}
            </Type>
          </Surface>
        ))}
      </div>
    </div>
  );
}

export function Tabbar({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const items = block.content.items ?? [];

  return (
    <div
      style={{
        marginTop: 'auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        padding: '12px 12px 22px',
        borderTop: `1px solid ${ds.color.border}`,
        background: ds.color.surface,
      }}
    >
      {items.map((item, i) => (
        <div key={item.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <Glyph seed={hash(block.id) + i} size={20} color={i === 0 ? ds.color.primary : ds.color.textFaint} />
          <span style={{ fontFamily: ds.type.body.stack, fontSize: 10, fontWeight: 500, color: i === 0 ? ds.color.primary : ds.color.textFaint }}>
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- ui kit -------------------------------- */

export function UiKit({ block }: { block: BlockInstance }) {
  const ds = useDs();
  const seed = hash(block.id);

  const Row = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ paddingBlock: 26, borderTop: `1px solid ${ds.color.border}` }}>
      <Type step="overline" tone="faint" style={{ marginBottom: 16 }}>
        {title}
      </Type>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>{children}</div>
    </div>
  );

  return (
    <div style={{ background: ds.color.bg, padding: 56 }}>
      <Stack gap={8}>
        <Type step="h1">{block.content.title}</Type>
        <Type step="lead" tone="muted">
          {block.content.subtitle}
        </Type>
      </Stack>

      <div style={{ marginTop: 32 }}>
        <Row title="Кнопки">
          <Btn size="lg">Основная</Btn>
          <Btn>Основная</Btn>
          <Btn size="sm">Малая</Btn>
          <Btn variant="secondary">Вторичная</Btn>
          <Btn variant="outline">Контурная</Btn>
          <Btn variant="ghost">Текстовая</Btn>
          <Btn style={{ opacity: 0.45 }}>Неактивная</Btn>
        </Row>

        <Row title="Поля ввода">
          <Field label="Обычное поле" style={{ width: 240 }} />
          <Field label="С ошибкой" style={{ width: 240, borderColor: ds.color.danger }} />
          <Field label="Активное" style={{ width: 240, borderColor: ds.color.primary }} />
        </Row>

        <Row title="Чипсы и метки">
          <Chip active>Активная</Chip>
          <Chip>Обычная</Chip>
          <Chip>С иконкой</Chip>
          <span style={{ padding: '5px 12px', borderRadius: ds.radius.pill, background: ds.color.success, color: ds.color.onPrimary, fontFamily: ds.type.body.stack, fontSize: 12, fontWeight: 600 }}>
            Успех
          </span>
          <span style={{ padding: '5px 12px', borderRadius: ds.radius.pill, background: ds.color.warning, color: ds.color.onPrimary, fontFamily: ds.type.body.stack, fontSize: 12, fontWeight: 600 }}>
            Внимание
          </span>
          <span style={{ padding: '5px 12px', borderRadius: ds.radius.pill, background: ds.color.danger, color: ds.color.onPrimary, fontFamily: ds.type.body.stack, fontSize: 12, fontWeight: 600 }}>
            Ошибка
          </span>
        </Row>

        <Row title="Карточки">
          <Surface pad={20} style={{ width: 260 }}>
            <Glyph seed={seed} size={26} />
            <Type step="h3" style={{ fontSize: 17, marginTop: 14 }}>
              Заголовок карточки
            </Type>
            <Type step="small" tone="muted" style={{ marginTop: 8 }}>
              Описание в две строки, чтобы проверить ритм текста внутри блока.
            </Type>
          </Surface>

          <Surface pad={0} style={{ width: 260, overflow: 'hidden' }}>
            <Visual src={block.content.image} seed={seed + 3} radius="none" style={{ height: 120 }} />
            <div style={{ padding: 18 }}>
              <Type step="h3" style={{ fontSize: 17 }}>
                С изображением
              </Type>
              <Type step="small" tone="muted" style={{ marginTop: 6 }}>
                Медиа сверху, текст снизу.
              </Type>
            </div>
          </Surface>

          <Surface tone="gradient" pad={20} style={{ width: 260 }}>
            <Type step="h3" style={{ fontSize: 17, color: ds.color.onPrimary }}>
              Акцентная карточка
            </Type>
            <Type step="small" style={{ marginTop: 8, color: ds.color.onPrimary, opacity: 0.85 }}>
              Для выделенного тарифа или промо.
            </Type>
          </Surface>
        </Row>

        <Row title="Иконки">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ width: 46, height: 46, borderRadius: ds.radius.sm, background: ds.color.surface2, display: 'grid', placeItems: 'center' }}>
              <Glyph seed={seed + i * 9} size={22} />
            </span>
          ))}
        </Row>

        <Row title="Аватары и статусы">
          {['Анна Реут', 'Игорь Савельев', 'Мария Долина', 'Пётр Ильин'].map((name, i) => (
            <Avatar key={name} seed={seed + i * 4} name={name} />
          ))}
        </Row>
      </div>
    </div>
  );
}
