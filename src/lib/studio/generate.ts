import { buildContent } from './content';
import { ARCHETYPES, composeFrames } from './compose';
import { COLOR_HUES } from './palette';
import { getProduct } from './products';
import { getNiche } from './niches';
import { VOCAB } from './vocab';
import { buildMarkSpec, type LogoType } from './logo/spec';
import { plural } from '../plural';
import { answerOf, customOf, firstAnswer, requiredBlocks, trackOf } from './flow';
import { createRng, newSeed } from './rng';
import { buildDesignSystem } from './tokens';
import type { Answers, DesignSystem, ImageDirection, Project, ProjectAnalysis } from './types';
import type { Locale } from '../i18n/dictionaries';

/* ===========================================================================
   Answers → a finished project.

   The seed is fresh on every call, so the same brief run twice produces two
   different designs — different harmony, scale, archetype, block selection and
   variants. Only the constraints the user stated are held fixed.
   =========================================================================== */

const NAME_ADJECTIVES = [
  'Ночной', 'Тихий', 'Ясный', 'Тёплый', 'Резкий', 'Плотный', 'Лёгкий',
  'Глубокий', 'Чистый', 'Первый', 'Прямой', 'Дальний',
];

const NAME_NOUNS = [
  'бархат', 'контур', 'сигнал', 'разрез', 'горизонт', 'слой', 'оттиск',
  'поток', 'каркас', 'свет', 'предел', 'проспект',
];

const PURPOSE_LABELS: Record<string, string> = {
  sell: 'продавать',
  leads: 'собирать заявки',
  present: 'презентовать',
  showcase: 'показывать работы',
  work: 'помогать работать',
  inform: 'информировать',
  engage: 'вовлекать',
};

const STYLE_LABELS: Record<string, string> = {
  minimal: 'Минимализм',
  premium: 'Премиальный',
  bold: 'Смелый',
  friendly: 'Дружелюбный',
  tech: 'Технологичный',
  editorial: 'Журнальный',
  organic: 'Природный',
  brutal: 'Брутальный',
  retro: 'Ретро',
  glass: 'Стеклянный',
};

const MOOD_LABELS: Record<string, string> = {
  calm: 'спокойное',
  energetic: 'энергичное',
  expensive: 'дорогое',
  warm: 'тёплое',
  strict: 'строгое',
  playful: 'игривое',
  futuristic: 'футуристичное',
  cozy: 'уютное',
  confident: 'уверенное',
  mysterious: 'загадочное',
};

const AUDIENCE_LABELS: Record<string, string> = {
  mass: 'массовая аудитория',
  b2b: 'бизнес, B2B',
  premium: 'премиум-сегмент',
  youth: 'молодая аудитория',
  family: 'семьи и дети',
  pro: 'профессионалы',
};

/** Styles that lean dark when the user left the scheme to the studio. */
const DARK_LEANING = ['tech', 'brutal', 'glass'];
const DARK_MOODS = ['mysterious', 'futuristic', 'expensive'];

function decideScheme(
  rng: ReturnType<typeof createRng>,
  answers: Answers,
  style: string,
  moods: string[],
): { scheme: 'dark' | 'light'; reason: string } {
  const stated = firstAnswer(answers, 'scheme');
  if (stated === 'dark') return { scheme: 'dark', reason: 'Тёмная схема — по вашему выбору.' };
  if (stated === 'light') return { scheme: 'light', reason: 'Светлая схема — по вашему выбору.' };

  let darkWeight = 0.3;
  if (DARK_LEANING.includes(style)) darkWeight += 0.3;
  if (moods.some((mood) => DARK_MOODS.includes(mood))) darkWeight += 0.25;
  if (style === 'friendly' || style === 'organic' || style === 'editorial') darkWeight -= 0.2;

  const dark = rng.chance(Math.min(0.85, Math.max(0.1, darkWeight)));
  return {
    scheme: dark ? 'dark' : 'light',
    reason: dark
      ? 'Выбрал тёмную схему: она поддерживает заявленное настроение и даёт акценту больше силы.'
      : 'Выбрал светлую схему: она читается спокойнее и лучше подходит заявленной аудитории.',
  };
}

function buildImagery(
  rng: ReturnType<typeof createRng>,
  themes: string[],
  ds: DesignSystem,
  productLabel: string,
): ImageDirection[] {
  const treatment =
    ds.color.scheme === 'dark'
      ? 'Тёмная база, свет по краям кадра, глубокие тени'
      : 'Высокий ключ, мягкий рассеянный свет, светлый фон';

  const base: ImageDirection[] = themes.map((theme, index) => ({
    title: theme.charAt(0).toUpperCase() + theme.slice(1),
    kind: index === 0 ? 'Ключевой кадр' : 'Фото-серия',
    placement: index === 0 ? 'Первый экран' : 'Внутренние блоки',
    ratio: index === 0 ? rng.pick(['16:9', '3:2', '21:9']) : rng.pick(['1:1', '4:5', '3:2']),
    prompt: `${theme}, ${ds.color.scheme === 'dark' ? 'приглушённый вечерний свет' : 'естественный дневной свет'}, ${rng.pick(['фотореализм', 'документальная съёмка', 'студийный свет'])}, без текста в кадре`,
    treatment,
  }));

  base.push({
    title: 'Абстрактная графика',
    kind: 'Иллюстрация',
    placement: 'Фоны секций и пустые состояния',
    ratio: '1:1',
    prompt: `абстрактная композиция из простых геометрических форм в цветах ${ds.color.primary} и ${ds.color.accent}, много свободного пространства, без градиентных переливов`,
    treatment: 'Строго два-три цвета из палитры, никаких посторонних оттенков',
  });

  base.push({
    title: 'Набор иконок',
    kind: 'Иконки',
    placement: 'Списки, преимущества, навигация',
    ratio: '1:1',
    prompt: `набор ${ds.iconStyle === 'line' ? 'линейных' : ds.iconStyle === 'solid' ? 'сплошных' : 'двухцветных'} иконок на сетке 24×24, толщина штриха 1.5px, скруглённые окончания`,
    treatment: `Стиль ${ds.iconStyle === 'line' ? 'контурный' : ds.iconStyle === 'solid' ? 'заливкой' : 'двухцветный'} — одинаковый для всего набора`,
  });

  base.push({
    title: 'Превью для соцсетей',
    kind: 'OG-image',
    placement: `Мета-теги (${productLabel.toLowerCase()})`,
    ratio: '1200×630',
    prompt: 'обложка ссылки: знак, короткий заголовок, фирменный фон, без мелкого текста',
    treatment: 'Текст крупный — в ленте картинка размером с ладонь',
  });

  return base;
}

/**
 * `locale` is required deliberately. It was absent altogether before, so every
 * generated design came out in Russian regardless of the language the studio
 * was displaying — the choice was lost before generation even began.
 */
export function generateProject(answers: Answers, locale: Locale, seedInput?: number): Project {
  const seed = seedInput ?? newSeed();
  const rng = createRng(seed);

  const product = getProduct(firstAnswer(answers, 'product'));
  const track = trackOf(answers);
  const nicheId = firstAnswer(answers, 'niche');
  const customNiche = customOf(answers, 'nicheText');
  const niche = nicheId && nicheId !== 'custom' ? getNiche(nicheId) : null;
  // A free-text sphere has no preset vocabulary, so the copy engine falls back
  // to reading the description — which now leads with the user's own words.
  const nicheLabel = niche?.label ?? (customNiche || null);

  // Every track has its own free-text field; whichever exists describes the project.
  const description = [
    customOf(answers, 'domainText'),
    customOf(answers, 'message'),
    customOf(answers, 'specifics'),
    customOf(answers, 'goods'),
    customOf(answers, 'service'),
    customOf(answers, 'field'),
    customOf(answers, 'subjects'),
    customOf(answers, 'problem'),
    customOf(answers, 'extras'),
    nicheLabel ?? "",
  ]
    .filter(Boolean)
    .join('. ') || 'проект';

  const name = customOf(answers, 'name');
  const purpose = firstAnswer(answers, 'purpose') || (track === 'interface' ? 'work' : 'present');
  const style = firstAnswer(answers, 'style') || 'minimal';

  // The interface track asks about density rather than audience; both map onto
  // the same axis, so one answer feeds the other's slot.
  const audience =
    firstAnswer(answers, 'audience') ||
    ({ pro: 'pro', mass: 'mass', premium: 'premium' }[firstAnswer(answers, 'density')] ?? 'mass');

  const colorIds = answerOf(answers, 'colors');
  const motion = (firstAnswer(answers, 'motion') || 'subtle') as 'none' | 'subtle' | 'rich';
  const required = requiredBlocks(answers);

  // Logo briefs describe character instead of mood; both drive saturation.
  const moods = [...answerOf(answers, 'mood'), ...answerOf(answers, 'character')];

  const { scheme, reason: schemeReason } = decideScheme(rng, answers, style, moods);

  const ds = buildDesignSystem(rng, {
    colorIds,
    scheme,
    style,
    moods,
    audience,
    motion,
    canvasWidth: product.canvas.width,
  });

  const content = buildContent(rng, {
    description,
    purpose,
    locale,
    // An explicitly chosen sphere always beats guessing from free text.
    domainId: niche?.domain,
    name,
  });

  // Wide marketing canvases can carry any composition; small artboards only a few.
  const archetypePool =
    product.canvas.width < 700
      ? ARCHETYPES.filter((entry) => ['centered', 'stacked', 'editorial'].includes(entry.id))
      : ds.space.density === 'compact'
        ? ARCHETYPES.filter((entry) => entry.id !== 'immersive')
        : ARCHETYPES;
  const archetypeBase = rng.pick(archetypePool);
  // Label and rationale come from the language pack; the archetype itself only
  // carries layout rules, which are the same in every language.
  const archetypeCopy = VOCAB[locale].archetypes[archetypeBase.id] ?? archetypeBase;
  const archetype = { ...archetypeBase, ...archetypeCopy };

  // The logo track runs its own synthesis: a construction principle and a motif
  // chosen from the brand's meaning, never the brand's first letter.
  const mark =
    track === 'logo'
      ? buildMarkSpec(rng, {
          name,
          sphere: customOf(answers, 'sphere'),
          description: customOf(answers, 'brandDescription'),
          audience,
          style,
          logoType: (firstAnswer(answers, 'logoType') || 'combined') as LogoType,
          motifDirection: firstAnswer(answers, 'motifDirection'),
          wanted: customOf(answers, 'wantedSymbols'),
          avoided: customOf(answers, 'avoidedSymbols'),
        })
      : null;

  const frames = composeFrames(rng, { product, ds, content, archetype, required, mark: mark?.spec });

  const namedColor = colorIds.find((id) => id !== 'auto' && COLOR_HUES[id]);
  const colorLabel = namedColor
    ? COLOR_HUES[namedColor].label
    : `подобран студией (${ds.color.harmony.toLowerCase()})`;

  const decisions: string[] = mark
    ? [
        `Сфера разобрана как «${mark.sphere.field.label}»${mark.sphere.fallback ? ' — прямых совпадений не нашлось, поэтому взят универсальный визуальный язык' : `: сработали слова «${mark.sphere.matched.slice(0, 3).join('», «')}»`}.`,
        mark.spec.rationale,
        `Знак построен на сетке ${mark.spec.grid}×${mark.spec.grid}, ${mark.spec.fill === 'stroke' ? 'контурная отрисовка' : mark.spec.fill === 'solid' ? 'сплошная заливка' : 'смешанная отрисовка'}, толщина штриха от веса ${Math.round(mark.spec.weight * 100)}%.`,
        `Компоновка — ${
          { horizontal: 'знак слева от названия', vertical: 'знак над названием', markOnly: 'только знак, без текста', textOnly: 'только текст, без отдельного знака' }[mark.spec.lockup]
        }.`,
        schemeReason,
        `Цветовая гармония — ${ds.color.harmony.toLowerCase()}. Знак проверен в монохроме и в выворотке: обе версии в макете.`,
        `Типографика: ${ds.type.rationale}`,
      ]
    : [
        nicheLabel
          ? `Сфера «${nicheLabel.toLowerCase()}» задала и вопросы, и словарь: тексты, названия позиций и цифры взяты из этой отрасли, а не из общего шаблона.`
          : 'Сфера определена по описанию проекта.',
        required.length > 0
          ? `Ваши ответы напрямую добавили в макет ${required.length} ${plural(required.length, ['блок', 'блока', 'блоков'])} — остальные выбраны исходя из задачи.`
          : 'Состав блоков подобран целиком под заявленную задачу.',
        schemeReason,
        `Цветовая гармония — ${ds.color.harmony.toLowerCase()}: базовый тон и ${ds.color.hues.length - 1} поддерживающих оттенка построены по правилу, а не подобраны на глаз.`,
        `Типографика: ${ds.type.rationale}`,
        `Сетка — ${ds.grid.label}. Плотность ${ds.space.density === 'compact' ? 'компактная' : ds.space.density === 'spacious' ? 'просторная' : 'обычная'}, шаг сетки ${ds.space.unit}px.`,
        `Композиция — ${archetype.label.toLowerCase()}. ${archetype.note}`,
        `Форма и глубина: ${ds.radius.family.toLowerCase()} (${ds.radius.md}px), ${ds.shadow.family.toLowerCase()}.`,
        `Поверхности — ${
          { flat: 'плоские заливки', elevated: 'карточки с тенью', outlined: 'контурные карточки', glass: 'стекло с размытием', gradient: 'градиентные подложки' }[ds.surfaceStyle]
        }, иконки ${ds.iconStyle === 'line' ? 'контурные' : ds.iconStyle === 'solid' ? 'заливкой' : 'двухцветные'}.`,
        motion === 'none'
          ? 'Анимация отключена — только мгновенная смена состояний.'
          : `Движение: ${ds.motion.entrance.toLowerCase()}, ${ds.motion.duration}мс.`,
      ];

  const analysis: ProjectAnalysis = {
    productLabel: product.label,
    purposeLabel: PURPOSE_LABELS[purpose] ?? purpose,
    styleLabel: STYLE_LABELS[style] ?? style,
    moodLabel: moods.map((mood) => MOOD_LABELS[mood] ?? mood).join(', ') || 'не задано',
    audienceLabel: AUDIENCE_LABELS[audience] ?? audience,
    colorLabel,
    keywords: [nicheLabel ?? content.domain.label, ...content.categories.slice(0, 3)],
    decisions,
  };

  const conceptName = `${rng.pick(NAME_ADJECTIVES)} ${rng.pick(NAME_NOUNS)}`;
  const references = customOf(answers, 'extras');

  const blockCount = frames[0].blocks.length;
  const summary = [
    nicheLabel
      ? `${product.label.toLowerCase()} · ${nicheLabel.toLowerCase()} · задача «${PURPOSE_LABELS[purpose] ?? purpose}».`
      : `${product.label.toLowerCase()} для задачи «${PURPOSE_LABELS[purpose] ?? purpose}».`,
    `${STYLE_LABELS[style] ?? style} стиль, ${scheme === 'dark' ? 'тёмная' : 'светлая'} схема, ${ds.color.harmony.toLowerCase()} гармония.`,
    // Single-artboard products (logo, poster, card) have nothing to count.
    blockCount > 1
      ? `Композиция построена как ${archetype.label.toLowerCase()}: ${blockCount} ${plural(blockCount, ['блок', 'блока', 'блоков'])} на главном экране.`
      : `Композиция построена как ${archetype.label.toLowerCase()}.`,
    frames.length > 1
      ? `Всего ${frames.length} ${plural(frames.length, ['экран', 'экрана', 'экранов'])}.`
      : '',
    references ? 'Настроение референсов учтено, форма — своя.' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    id: `${seed.toString(36)}-${Date.now().toString(36)}`,
    seed,
    // Recorded so the design keeps the language it was written in. Switching
    // the interface afterwards must not silently reinterpret finished copy,
    // and a published project has to render in its own language for everyone.
    locale,
    createdAt: Date.now(),
    name: conceptName,
    tagline: `${content.brand} · ${nicheLabel ?? content.domain.label}`,
    summary,
    product,
    answers,
    analysis,
    ds,
    frames,
    imagery: buildImagery(rng, content.imagery, ds, product.label),
    archetype: archetype.label,
    archetypeNote: archetype.note,
  };
}
