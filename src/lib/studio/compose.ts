import type { ContentPack } from './content';
import type { Locale } from '../i18n/dictionaries';
import type { Vocabulary } from './vocab';
import { VOCAB } from './vocab';
import type { Rng } from './rng';
import type { BlockInstance, DesignSystem, Frame, ProductKind } from './types';

/* ===========================================================================
   Composition.

   This is the part that replaces "pick a template". An archetype sets the
   compositional logic (where the axis sits, how weight is distributed), then
   every block is instantiated with a variant, a column count, an alignment and
   an emphasis level rolled inside what that archetype allows. Bento mosaics get
   their cell spans generated outright.
   =========================================================================== */

export interface Archetype {
  id: string;
  label: string;
  note: string;
  /** Bias applied when choosing block variants. */
  prefers: Record<string, string[]>;
  align: 'left' | 'center' | 'mixed';
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'split',
    label: 'Асимметричный сплит',
    note: 'Экран делится на неравные части: текст держит левую ось, визуал занимает большую правую.',
    prefers: { hero: ['split', 'asymmetric'], features: ['alternating', 'grid'], showcase: ['rows'] },
    align: 'left',
  },
  {
    id: 'centered',
    label: 'Центрированная ось',
    note: 'Всё выстроено по одной вертикальной оси — спокойный ритм и максимум воздуха по краям.',
    prefers: { hero: ['centered'], features: ['grid'], showcase: ['grid'], cta: ['band'] },
    align: 'center',
  },
  {
    id: 'editorial',
    label: 'Журнальная вёрстка',
    note: 'Типографика важнее картинок: крупный кегль, узкая колонка текста, изображения как врезки.',
    prefers: { hero: ['stacked'], features: ['list'], showcase: ['staggered'], gallery: ['strip'] },
    align: 'left',
  },
  {
    id: 'bento',
    label: 'Бенто-сетка',
    note: 'Модульная мозаика из плиток разного размера — плотно, но с чётким ритмом.',
    prefers: { hero: ['asymmetric'], features: ['bento'], gallery: ['mosaic'], showcase: ['grid'] },
    align: 'left',
  },
  {
    id: 'immersive',
    label: 'Полноэкранная сцена',
    note: 'Первый экран во всю высоту с наложением текста на визуал, дальше — контрастные полосы.',
    prefers: { hero: ['overlay'], gallery: ['mosaic'], cta: ['band'], stats: ['split'] },
    align: 'mixed',
  },
  {
    id: 'dense',
    label: 'Плотная информационная сетка',
    note: 'Много данных на экран: узкие отступы, четыре колонки, таблицы вместо карточек.',
    prefers: { hero: ['split'], features: ['grid'], catalog: ['grid4'], pricing: ['table'] },
    align: 'left',
  },
  {
    id: 'stacked',
    label: 'Ступенчатые полосы',
    note: 'Секции идут широкими полосами во всю ширину, каждая со своим фоном и своим ритмом.',
    prefers: { hero: ['stacked'], features: ['alternating'], cta: ['split'], footer: ['big'] },
    align: 'mixed',
  },
];

/** Variants available per block type, before the archetype biases the roll. */
const VARIANTS: Record<string, string[]> = {
  hero: ['split', 'centered', 'overlay', 'stacked', 'asymmetric'],
  features: ['grid', 'list', 'alternating', 'bento'],
  showcase: ['rows', 'grid', 'staggered'],
  catalog: ['grid3', 'grid4', 'masonry'],
  gallery: ['mosaic', 'strip', 'grid'],
  pricing: ['columns', 'table'],
  testimonials: ['cards', 'quote'],
  stats: ['row', 'cards', 'split'],
  cta: ['band', 'card', 'split'],
  footer: ['columns', 'minimal', 'big'],
  steps: ['timeline', 'numbered'],
  faq: ['accordion', 'twoColumn'],
  contactForm: ['split', 'card'],
  team: ['grid', 'rows'],
  logos: ['row', 'marquee'],
  categories: ['tiles', 'chips'],
  nav: ['inline', 'centered', 'split'],
  bento: ['mosaic'],
  pageHeader: ['plain'],
  productDetail: ['split'],
  authForm: ['split', 'centered', 'card'],
  kpis: ['row'],
  chart: ['area', 'bars'],
  table: ['plain'],
  activity: ['feed'],
  board: ['kanban'],
  mobileHeader: ['plain', 'search'],
  mobileHero: ['card', 'plain'],
  mobileChips: ['row'],
  mobileCards: ['stack', 'grid'],
  mobileList: ['rows'],
  mobileStats: ['row'],
  tabbar: ['icons'],
  poster: ['centered', 'split', 'corner'],
  posterTall: ['stacked', 'overlay'],
  posterStory: ['stacked'],
  slideTitle: ['centered', 'split'],
  slideContent: ['columns', 'list'],
  slideStats: ['row'],
  cardFront: ['centered', 'split', 'corner'],
  cardBack: ['contacts'],
  emailHeader: ['plain'],
  emailHero: ['plain'],
  emailCards: ['stack'],
  emailCta: ['band'],
  emailFooter: ['plain'],
  logoMark: ['showcase'],
  logoVariants: ['grid'],
  logoUsage: ['grid'],
  uiKit: ['sheet'],
  productCard: ['tall'],
};

/** Reading order of a marketing page, regardless of what got included. */
const PAGE_ORDER = [
  'nav', 'hero', 'logos', 'pageHeader', 'categories', 'features', 'bento', 'showcase',
  'catalog', 'productDetail', 'gallery', 'stats', 'steps', 'pricing', 'team',
  'testimonials', 'faq', 'contactForm', 'cta', 'footer',
];



const meta = (type: string, pack: Vocabulary) =>
  pack.blockMeta[type] ?? { name: type, purpose: '' };

/**
 * The same lookup, for anything outside the composer that needs to name a
 * block — the per-product landing pages list what a design of that type is
 * built from, and that list has to match what the composer actually draws.
 */
export const blockMeta = (type: string, locale: Locale) => meta(type, VOCAB[locale]);

/** Generates a bento mosaic: `count` cells of varying span on `columns`. */
function mosaicSpans(rng: Rng, count: number, columns: number): number[][] {
  const spans: number[][] = [];
  let remaining = count;

  while (remaining > 0) {
    // A wide opener, then a mix — the irregularity is the point of a bento.
    const col = spans.length === 0 ? Math.min(columns, rng.pick([2, 2, 3])) : rng.weighted([[1, 4], [2, 3], [3, 1]]);
    const row = rng.weighted([[1, 5], [2, 2]]);
    spans.push([Math.min(col, columns), row]);
    remaining -= 1;
  }
  return spans;
}

function pickVariant(rng: Rng, type: string, archetype: Archetype): string {
  const all = VARIANTS[type] ?? ['default'];
  const preferred = archetype.prefers[type]?.filter((variant) => all.includes(variant)) ?? [];
  if (preferred.length > 0 && rng.chance(0.72)) return rng.pick(preferred);
  return rng.pick(all);
}

interface ComposeInput {
  product: ProductKind;
  ds: DesignSystem;
  content: ContentPack;
  archetype: Archetype;
  /** Element ids the user explicitly required. */
  required: string[];
  /** Synthesised mark, present only for logo projects. */
  mark?: import('./logo/spec').MarkSpec;
}

function buildBlock(rng: Rng, type: string, input: ComposeInput): BlockInstance {
  const { ds, content, archetype } = input;
  // Every literal below comes from the language pack the brief was built with.
  const S = content.vocab.sections;
  const money = (value: number) =>
    `${value.toLocaleString(content.vocab.numberLocale)} ${content.vocab.currency}`;
  const variant = pickVariant(rng, type, archetype);
  const info = meta(type, content.vocab);

  const align: 'left' | 'center' | 'right' =
    archetype.align === 'center'
      ? 'center'
      : archetype.align === 'mixed'
        ? rng.pick(['left', 'center'])
        : 'left';

  const wideCanvas = input.product.canvas.width >= 900;
  const columns = wideCanvas
    ? ds.space.density === 'compact'
      ? rng.pick([3, 4, 4])
      : rng.pick([2, 3, 3])
    : 2;

  const block: BlockInstance = {
    id: rng.id(type),
    type,
    variant,
    name: info.name,
    purpose: info.purpose,
    params: { align, columns, count: 6, emphasis: 'normal', height: 'auto' },
    content: {},
  };

  switch (type) {
    case 'nav':
      block.content = { title: content.brand, cta: content.cta, items: content.nav.map((label) => ({ title: label })) };
      break;

    case 'hero':
      block.params = {
        ...block.params,
        align: variant === 'centered' ? 'center' : variant === 'overlay' ? rng.pick(['left', 'center']) : 'left',
        height: variant === 'overlay' ? 'full' : rng.pick(['tall', 'auto']),
        emphasis: 'high',
      };
      block.content = {
        eyebrow: `${content.domain.label} · ${content.brand}`,
        title: content.headline,
        subtitle: content.subtitle,
        cta: content.cta,
        ctaSecondary: content.ctaSecondary,
        items: content.stats.slice(0, 3).map((stat) => ({ title: stat.label, value: stat.value })),
      };
      break;

    case 'logos':
      block.content = { items: rng.sample(S.logoNames, 6).map((title) => ({ title })) };
      break;

    case 'pageHeader':
      block.content = { eyebrow: S.pageHeaderEyebrow, title: rng.pick(content.categories), subtitle: content.subtitle };
      break;

    case 'categories':
      block.params = { ...block.params, columns: wideCanvas ? rng.pick([3, 4, 6]) : 2, count: 6 };
      block.content = { eyebrow: S.categories.eyebrow, title: S.categories.title, items: content.categories.map((title) => ({ title })) };
      break;

    case 'features': {
      const count = variant === 'bento' ? rng.int(5, 6) : rng.pick([3, 4, 6]);
      block.params = {
        ...block.params,
        columns: variant === 'list' ? 1 : variant === 'bento' ? 4 : rng.pick([2, 3, 3]),
        count,
        spans: variant === 'bento' ? mosaicSpans(rng, count, 4) : undefined,
      };
      block.content = {
        eyebrow: S.features.eyebrow,
        title: rng.pick(S.features.titles),
        items: content.features.slice(0, count).map((feature) => ({ title: feature.title, text: feature.text })),
      };
      break;
    }

    case 'bento': {
      const count = rng.int(5, 6);
      block.params = { ...block.params, columns: 4, count, spans: mosaicSpans(rng, count, 4) };
      block.content = {
        eyebrow: S.bento.eyebrow,
        title: S.bento.title,
        items: content.features.slice(0, count).map((feature) => ({ title: feature.title, text: feature.text })),
      };
      break;
    }

    case 'showcase': {
      // The same block shows dishes for a restaurant and case studies for an
      // agency — the heading has to follow the sphere or the page reads wrong.
      const headings: Record<string, { eyebrow: string; titles: string[]; cta: string }> = S.showcase;
      const heading = headings[content.domain.id] ?? {
        eyebrow: S.showcase.default.eyebrow,
        titles: S.showcase.default.titles,
        cta: S.showcase.default.cta,
      };

      block.params = { ...block.params, columns: variant === 'rows' ? 1 : rng.pick([2, 3]), count: variant === 'rows' ? 3 : rng.pick([4, 6]) };
      block.content = {
        eyebrow: heading.eyebrow,
        title: rng.pick(heading.titles),
        items: content.items.slice(0, 6).map((item) => ({ title: item.title, meta: item.meta })),
        cta: heading.cta,
      };
      break;
    }

    case 'catalog':
      block.params = { ...block.params, columns: variant === 'grid4' ? 4 : 3, count: variant === 'grid4' ? 8 : 6 };
      block.content = {
        eyebrow: S.catalog.eyebrow,
        title: rng.pick(S.catalog.titles),
        items: content.items.slice(0, 8).map((item, index) => ({
          title: item.title,
          meta: item.meta,
          value: money(rng.int(9, 240) * 100 + index * 50),
        })),
        cta: content.cta,
      };
      break;

    case 'productDetail':
      block.content = {
        eyebrow: rng.pick(content.categories),
        title: content.items[0].title,
        subtitle: content.items[0].meta,
        body: content.subtitle,
        cta: content.cta,
        ctaSecondary: S.catalog.ctaSecondary,
        items: content.items.slice(1, 5).map((item) => ({ title: item.title, meta: item.meta })),
      };
      break;

    case 'gallery':
      block.params = { ...block.params, count: variant === 'strip' ? 4 : rng.pick([5, 6, 7]), columns: 4 };
      block.content = { eyebrow: S.gallery.eyebrow, title: rng.pick(S.gallery.titles) };
      break;

    case 'stats':
      block.params = { ...block.params, count: 4, columns: 4 };
      block.content = {
        eyebrow: S.stats.eyebrow,
        title: S.stats.title,
        items: content.stats.slice(0, 4).map((stat) => ({ title: stat.label, value: stat.value })),
      };
      break;

    case 'steps':
      block.params = { ...block.params, count: 4, columns: 4 };
      block.content = {
        eyebrow: S.steps.eyebrow,
        title: S.steps.title,
        items: content.steps.map((step) => ({ title: step.title, text: step.text })),
      };
      break;

    case 'pricing':
      block.params = { ...block.params, count: 3, columns: 3, emphasis: 'high' };
      block.content = {
        eyebrow: S.pricing.eyebrow,
        title: S.pricing.title,
        items: [
          ...S.pricing.tiers,
        ],
        cta: content.cta,
      };
      break;

    case 'team':
      block.params = { ...block.params, count: 4, columns: 4 };
      block.content = {
        eyebrow: S.team.eyebrow,
        title: S.team.title,
        items: [
          ...S.team.members,
        ],
      };
      break;

    case 'testimonials':
      block.params = { ...block.params, count: variant === 'quote' ? 1 : 3, columns: 3 };
      block.content = {
        eyebrow: S.testimonials.eyebrow,
        title: S.testimonials.title,
        items: content.testimonials.map((entry) => ({ title: entry.name, meta: entry.role, text: entry.text })),
      };
      break;

    case 'faq':
      block.params = { ...block.params, count: 5, columns: variant === 'twoColumn' ? 2 : 1 };
      block.content = {
        eyebrow: S.faq.eyebrow,
        title: S.faq.title,
        items: content.faq.map((entry) => ({ title: entry.title, text: entry.text })),
      };
      break;

    case 'contactForm':
      block.content = {
        eyebrow: S.contactForm.eyebrow,
        title: rng.pick(S.contactForm.titles),
        subtitle: S.contactForm.subtitle,
        cta: content.cta,
        items: S.contactForm.fields.map((title) => ({ title })),
      };
      break;

    case 'cta':
      block.params = { ...block.params, emphasis: 'high', invert: rng.chance(0.6) };
      block.content = {
        title: rng.pick(S.cta.titles),
        subtitle: S.cta.subtitle,
        cta: content.cta,
        ctaSecondary: content.ctaSecondary,
      };
      break;

    case 'footer':
      block.content = {
        title: content.brand,
        subtitle: content.subtitle,
        items: content.nav.map((label) => ({ title: label })),
      };
      break;

    case 'authForm':
      block.content = {
        eyebrow: content.brand,
        title: rng.pick(S.authForm.titles),
        subtitle: S.authForm.subtitle,
        cta: S.authForm.cta,
        ctaSecondary: S.authForm.ctaSecondary,
        items: S.authForm.fields.map((title) => ({ title })),
      };
      break;

    case 'kpis':
      block.params = { ...block.params, count: 4, columns: 4 };
      block.content = {
        title: S.kpisTitle,
        items: content.stats.slice(0, 4).map((stat) => ({ title: stat.label, value: stat.value, meta: rng.chance(0.5) ? `+${rng.int(2, 24)}%` : `−${rng.int(1, 9)}%` })),
      };
      break;

    case 'chart':
      block.content = { title: rng.pick(S.chartTitles) };
      break;

    case 'table':
      block.params = { ...block.params, count: 6 };
      block.content = {
        title: rng.pick(S.tableTitles),
        items: content.items.slice(0, 6).map((item, index) => ({
          title: item.title,
          meta: item.meta,
          value: money(rng.int(5, 90) * 1000 + index),
        })),
      };
      break;

    case 'activity':
      block.params = { ...block.params, count: 5 };
      block.content = {
        title: S.activity.title,
        items: [
          ...S.activity.entries,
        ],
      };
      break;

    case 'board':
      block.params = { ...block.params, columns: 4 };
      block.content = {
        title: S.board.title,
        items: S.board.columns.map((title) => ({ title })),
      };
      break;

    case 'mobileHeader':
      block.content = { title: content.brand, subtitle: rng.pick(S.mobileGreetings) };
      break;

    case 'mobileHero':
      block.content = { eyebrow: S.mobileHeroEyebrow, title: content.headline, cta: content.cta };
      break;

    case 'mobileChips':
      block.content = { items: content.categories.slice(0, 5).map((title) => ({ title })) };
      break;

    case 'mobileCards':
      block.params = { ...block.params, count: variant === 'grid' ? 4 : 3, columns: variant === 'grid' ? 2 : 1 };
      block.content = {
        title: rng.pick(S.mobileCardTitles),
        items: content.items.slice(0, 4).map((item) => ({ title: item.title, meta: item.meta, value: money(rng.int(3, 40) * 100) })),
      };
      break;

    case 'mobileList':
      block.params = { ...block.params, count: 4 };
      block.content = {
        title: S.mobileListTitle,
        items: content.items.slice(0, 4).map((item) => ({ title: item.title, meta: item.meta })),
      };
      break;

    case 'mobileStats':
      block.params = { ...block.params, count: 3, columns: 3 };
      block.content = { items: content.stats.slice(0, 3).map((stat) => ({ title: stat.label, value: stat.value })) };
      break;

    case 'tabbar':
      block.content = { items: S.tabbar.map((title) => ({ title })) };
      break;

    case 'poster':
    case 'posterTall':
    case 'posterStory':
      block.params = { ...block.params, align: variant === 'centered' ? 'center' : 'left', emphasis: 'high' };
      block.content = {
        eyebrow: content.brand,
        title: content.headline,
        subtitle: content.subtitle,
        cta: content.cta,
      };
      break;

    case 'slideTitle':
      block.content = {
        eyebrow: new Date().getFullYear().toString(),
        title: content.headline,
        subtitle: content.brand,
      };
      break;

    case 'slideContent':
      block.params = { ...block.params, count: 3, columns: 3 };
      block.content = {
        eyebrow: S.slideContent.eyebrow,
        title: rng.pick(S.slideContent.titles),
        items: content.features.slice(0, 3).map((feature) => ({ title: feature.title, text: feature.text })),
      };
      break;

    case 'slideStats':
      block.params = { ...block.params, count: 3, columns: 3 };
      block.content = {
        eyebrow: S.slideStats.eyebrow,
        title: S.slideStats.title,
        items: content.stats.slice(0, 3).map((stat) => ({ title: stat.label, value: stat.value })),
      };
      break;

    case 'cardFront':
      block.content = { title: S.card.name, subtitle: S.card.role, eyebrow: content.brand };
      break;

    case 'cardBack':
      block.content = {
        title: content.brand,
        items: [{ title: S.card.phone }, { title: `hello@${(content.brand || 'studio').toLowerCase().replace(/[^a-z]/g, '') || 'studio'}.${S.card.emailHost}` }, { title: S.card.address }],
      };
      break;

    case 'emailHeader':
      block.content = { title: content.brand, subtitle: S.email.headerSubtitle };
      break;

    case 'emailHero':
      block.content = { eyebrow: S.email.heroEyebrow, title: content.headline, subtitle: content.subtitle, cta: content.cta };
      break;

    case 'emailCards':
      block.params = { ...block.params, count: 2, columns: 1 };
      block.content = {
        title: S.email.cardsTitle,
        items: content.items.slice(0, 2).map((item) => ({ title: item.title, meta: item.meta, value: money(rng.int(9, 60) * 100) })),
      };
      break;

    case 'emailCta':
      block.content = { title: S.email.ctaTitle, subtitle: S.email.ctaSubtitle, cta: content.cta };
      break;

    case 'emailFooter':
      block.content = { title: content.brand, subtitle: S.email.footerSubtitle };
      break;

    case 'logoMark':
    case 'logoVariants':
    case 'logoUsage':
      block.content = { title: content.brand, subtitle: content.domain.label, eyebrow: S.logoMarkEyebrow };
      block.mark = input.mark;
      break;

    case 'uiKit':
      block.content = { title: S.uiKitTitle, subtitle: content.brand };
      break;

    case 'productCard':
      block.content = {
        eyebrow: rng.pick(content.categories),
        title: content.items[0].title,
        subtitle: content.items[0].meta,
        cta: content.cta,
        items: [{ title: S.productBadge }, { title: `${rng.int(4, 5)}.${rng.int(0, 9)}` }],
      };
      break;

    default:
      block.content = { title: info.name };
  }

  return block;
}

/** Chooses which optional blocks make the cut for a marketing page. */
function selectPageBlocks(rng: Rng, product: ProductKind, required: string[]): string[] {
  const chosen = new Set<string>([...product.required, ...required.filter((id) => product.blocks.includes(id))]);

  const optional = product.blocks.filter((type) => !chosen.has(type));
  // A page needs enough substance to read as designed, but not every block ever
  // invented — six to nine sections is the range a real designer lands in.
  const target = rng.int(6, 9);
  for (const type of rng.shuffle(optional)) {
    if (chosen.size >= target) break;
    chosen.add(type);
  }

  return [...chosen].sort((a, b) => {
    const ai = PAGE_ORDER.indexOf(a);
    const bi = PAGE_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export function composeFrames(rng: Rng, input: ComposeInput): Frame[] {
  const { product } = input;
  const isPage = product.canvas.kind === 'page' || product.canvas.kind === 'email';

  const mainTypes = isPage
    ? selectPageBlocks(rng, product, input.required)
    : [
        ...product.required,
        ...product.blocks.filter(
          (type) => !product.required.includes(type) && (input.required.includes(type) || rng.chance(0.65)),
        ),
      ].filter((type, index, list) => list.indexOf(type) === index);

  const frames: Frame[] = [
    {
      id: rng.id('frame'),
      name: product.extraFrames?.length ? input.content.vocab.sections.mainFrame : product.label,
      canvas: product.canvas,
      blocks: mainTypes.map((type) => buildBlock(rng, type, input)),
    },
  ];

  for (const extra of product.extraFrames ?? []) {
    frames.push({
      id: rng.id('frame'),
      name: extra.name,
      canvas: product.canvas,
      blocks: extra.blocks.map((type) => buildBlock(rng, type, input)),
    });
  }

  return frames;
}
