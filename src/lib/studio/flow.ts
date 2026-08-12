import { NICHES, getNiche } from './niches';
import { PRODUCTS, getProduct } from './products';
import { buildLogoFlow } from './logo/questions';
import type { Answers, Question, QuestionOption } from './types';

/* ===========================================================================
   The question flow.

   There is no single questionnaire. The first answer picks a *track* — website,
   logo, interface or graphic — and each track asks its own things. Website
   briefs additionally splice in the chosen sphere's questions, so a restaurant
   is asked about cuisine and reservations while an IT company is asked about
   stack and case studies.

   `buildFlow` is recomputed on every answer, so the path genuinely branches as
   the user goes.
   =========================================================================== */

export const answerOf = (answers: Answers, id: string): string[] => answers[id]?.values ?? [];
export const firstAnswer = (answers: Answers, id: string): string => answerOf(answers, id)[0] ?? '';
export const customOf = (answers: Answers, id: string): string => answers[id]?.custom?.trim() ?? '';

export type Track = 'web' | 'logo' | 'interface' | 'graphic';

export function trackOf(answers: Answers): Track {
  const productId = firstAnswer(answers, 'product');
  if (!productId) return 'web';
  if (productId === 'logo') return 'logo';

  const product = getProduct(productId);
  if (product.canvas.kind === 'app' || product.canvas.kind === 'mobile' || product.canvas.kind === 'kit') {
    return 'interface';
  }
  if (product.group === 'Графика') return 'graphic';
  return 'web';
}

/* ------------------------------ shared steps ----------------------------- */

const PRODUCT_QUESTION: Question = {
  id: 'product',
  titleKey: 'q.product',
  hintKey: 'q.product.hint',
  title: 'Что вы хотите создать?',
  hint: 'От выбора зависит и артборд, и то, о чём я буду спрашивать дальше.',
  kind: 'single',
  options: PRODUCTS.map((product) => ({ id: product.id, label: product.label, note: product.note })),
};

const NICHE_QUESTION: Question = {
  id: 'niche',
  titleKey: 'q.niche',
  hintKey: 'q.niche.hint',
  title: 'Какая у вас сфера?',
  hint: 'Дальнейшие вопросы будут именно про неё — общей анкеты не будет.',
  kind: 'single',
  options: [
    ...NICHES.map((niche) => ({
      id: niche.id,
      labelKey: niche.labelKey,
      noteKey: niche.noteKey,
      label: niche.label,
      note: niche.note,
    })),
    // Any business at all: the sphere is then read from free text.
    { id: 'custom', labelKey: 'q.niche.custom', noteKey: 'q.niche.custom.note', label: 'Своя сфера', note: 'Впишу словами — списка недостаточно' },
  ],
};

/** Asked only when the user chose «Своя сфера». */
const CUSTOM_NICHE_QUESTION: Question = {
  id: 'nicheText',
  titleKey: 'q.nicheText',
  hintKey: 'q.nicheText.hint',
  placeholderKey: 'q.nicheText.placeholder',
  title: 'Опишите вашу сферу',
  hint: 'Своими словами. По описанию подберу словарь текстов и уточняющие вопросы.',
  kind: 'text',
  placeholder: 'Например: прокат туристического снаряжения, студия звукозаписи, питомник растений',
};

const nameQuestion = (title: string, placeholder: string): Question => ({
  id: 'name',
  title,
  kind: 'text',
  placeholder,
});

const STYLE_QUESTION: Question = {
  id: 'style',
  titleKey: 'q.style',
  title: 'Какой визуальный стиль вам нравится?',
  kind: 'single',
  options: [
    { id: 'minimal', labelKey: 'q.style.minimal', label: 'Минимализм', note: 'Воздух, сетка, ничего лишнего' },
    { id: 'premium', labelKey: 'q.style.premium', label: 'Премиальный', note: 'Антиква, сдержанный акцент' },
    { id: 'bold', labelKey: 'q.style.bold', label: 'Смелый', note: 'Крупная типографика, контраст' },
    { id: 'friendly', labelKey: 'q.style.friendly', label: 'Дружелюбный', note: 'Круглые формы, тёплый цвет' },
    { id: 'tech', labelKey: 'q.style.tech', label: 'Технологичный', note: 'Точная сетка, подсветка' },
    { id: 'editorial', labelKey: 'q.style.editorial', label: 'Журнальный', note: 'Текст как главный герой' },
    { id: 'organic', labelKey: 'q.style.organic', label: 'Природный', note: 'Земляная палитра, мягкость' },
    { id: 'brutal', labelKey: 'q.style.brutal', label: 'Брутальный', note: 'Жёсткие рамки, никакой полировки' },
    { id: 'retro', labelKey: 'q.style.retro', label: 'Ретро', note: 'Отсылка к печати и старому вебу' },
    { id: 'glass', labelKey: 'q.style.glass', label: 'Стеклянный', note: 'Прозрачность, размытие, слои' },
  ],
};

const COLORS_QUESTION: Question = {
  id: 'colors',
  titleKey: 'q.colors',
  hintKey: 'q.colors.hint',
  title: 'Какие цвета предпочитаете?',
  hint: 'Выберите направление — остальную палитру построю по правилам цветовой гармонии.',
  kind: 'multi',
  options: [
    { id: 'auto', label: 'На ваше усмотрение', note: 'Подберу под смысл проекта' },
    { id: 'blue', labelKey: 'q.colors.blue', label: 'Синий' },
    { id: 'cyan', labelKey: 'q.colors.cyan', label: 'Бирюзовый' },
    { id: 'green', labelKey: 'q.colors.green', label: 'Зелёный' },
    { id: 'lime', labelKey: 'q.colors.lime', label: 'Лаймовый' },
    { id: 'gold', labelKey: 'q.colors.gold', label: 'Золотой' },
    { id: 'orange', labelKey: 'q.colors.orange', label: 'Оранжевый' },
    { id: 'red', labelKey: 'q.colors.red', label: 'Красный' },
    { id: 'pink', labelKey: 'q.colors.pink', label: 'Розовый' },
    { id: 'purple', labelKey: 'q.colors.purple', label: 'Фиолетовый' },
    { id: 'earth', labelKey: 'q.colors.earth', label: 'Земляные, бежевые' },
    { id: 'mono', labelKey: 'q.colors.mono', label: 'Монохром' },
  ],
};

const SCHEME_QUESTION: Question = {
  id: 'scheme',
  titleKey: 'q.scheme',
  title: 'Светлая или тёмная тема?',
  kind: 'single',
  options: [
    { id: 'auto', label: 'На ваше усмотрение' },
    { id: 'light', labelKey: 'q.scheme.light', label: 'Светлая' },
    { id: 'dark', labelKey: 'q.scheme.dark', label: 'Тёмная' },
  ],
};

const MOTION_QUESTION: Question = {
  id: 'motion',
  titleKey: 'q.motion',
  title: 'Нужны ли анимации или специальные эффекты?',
  kind: 'single',
  options: [
    { id: 'none', label: 'Без анимации', note: 'Только смена состояний' },
    { id: 'subtle', label: 'Аккуратные микро-взаимодействия', note: 'Появления, ховеры' },
    { id: 'rich', label: 'Выразительная анимация', note: 'Параллакс, сцены, переходы' },
  ],
};

const extrasQuestion = (hint: string): Question => ({
  id: 'extras',
  titleKey: 'q.extras',
  placeholderKey: 'q.extras.placeholder',
  title: 'Дополнительные пожелания',
  hint,
  kind: 'text',
  placeholder: 'Референсы, ограничения, что точно не нравится…',
  optional: true,
});

/* -------------------------------- website -------------------------------- */

function webFlow(answers: Answers): Question[] {
  const nicheId = firstAnswer(answers, 'niche');
  const isCustom = nicheId === 'custom';
  const customText = customOf(answers, 'nicheText');

  // A custom sphere still gets sphere-shaped questions: the generic set from
  // «Другая сфера», which asks what is sold and what the visitor should do.
  const niche = isCustom ? (customText ? getNiche('other') : null) : nicheId ? getNiche(nicheId) : null;

  const core: Question[] = [
    PRODUCT_QUESTION,
    NICHE_QUESTION,
    ...(isCustom ? [CUSTOM_NICHE_QUESTION] : []),
    nameQuestion('Как называется проект?', 'Например: «Тракт», «Зерно», Flowdesk'),
    {
      id: 'purpose',
      titleKey: 'q.purpose',
      hintKey: 'q.purpose.hint',
      title: 'Какая главная цель сайта?',
      hint: 'Эта задача получит больше всего визуального веса.',
      kind: 'single',
      options: [
        { id: 'leads', label: 'Собирать заявки и звонки', adds: ['contactForm'] },
        { id: 'sell', label: 'Продавать онлайн', adds: ['catalog'] },
        { id: 'present', label: 'Рассказать о компании' },
        { id: 'showcase', label: 'Показать работы', adds: ['showcase'] },
        { id: 'inform', label: 'Информировать клиентов' },
        { id: 'engage', label: 'Привлечь внимание к бренду' },
      ],
    },
    {
      id: 'audience',
      titleKey: 'q.audience',
      hintKey: 'q.audience.hint',
      title: 'Кто ваша целевая аудитория?',
      hint: 'Влияет на плотность вёрстки, размер шрифта и тон оформления.',
      kind: 'single',
      options: [
        { id: 'mass', label: 'Массовая аудитория', note: 'Понятность важнее оригинальности' },
        { id: 'b2b', label: 'Компании, B2B', note: 'Факты, цифры, доверие' },
        { id: 'premium', label: 'Премиум-сегмент', note: 'Воздух, сдержанность, детали' },
        { id: 'youth', label: 'Молодая аудитория', note: 'Смелее цвет и типографика' },
        { id: 'family', label: 'Семьи с детьми', note: 'Тепло, крупные формы' },
        { id: 'pro', label: 'Профессионалы', note: 'Плотность информации' },
      ],
    },
  ];

  // Nothing sphere-specific can be asked before the sphere is known.
  if (!niche) return [...core, STYLE_QUESTION, COLORS_QUESTION, SCHEME_QUESTION];

  return [
    ...core,
    ...niche.questions,
    {
      id: 'sections',
      title: 'Какие разделы обязательно нужны?',
      hint: `Список собран под сферу «${niche.label.toLowerCase()}». Отмеченное точно попадёт в макет, остальное решу сам.`,
      kind: 'multi',
      options: niche.sections,
      optional: true,
    },
    STYLE_QUESTION,
    COLORS_QUESTION,
    SCHEME_QUESTION,
    MOTION_QUESTION,
    extrasQuestion('Всё, что не поместилось в вопросы выше.'),
  ];
}

/* ------------------------------- interface ------------------------------- */

function interfaceFlow(answers: Answers): Question[] {
  const product = getProduct(firstAnswer(answers, 'product'));
  const isMobile = product.canvas.kind === 'mobile';

  return [
    PRODUCT_QUESTION,
    nameQuestion('Как называется продукт?', 'Название сервиса или системы'),
    {
      id: 'domainText',
      title: 'Что делает этот продукт?',
      hint: 'Одно-два предложения — из них соберётся содержимое экранов.',
      kind: 'text',
      placeholder: isMobile
        ? 'Например: приложение доставки фермерских продуктов по подписке'
        : 'Например: панель для управления заявками и сделками отдела продаж',
    },
    {
      id: 'userType',
      title: 'Кто будет этим пользоваться?',
      kind: 'single',
      options: [
        { id: 'clients', label: 'Клиенты компании', note: 'Понятность важнее плотности' },
        { id: 'staff', label: 'Сотрудники', note: 'Скорость и плотность данных' },
        { id: 'admins', label: 'Администраторы', note: 'Максимум контроля' },
        { id: 'mixed', label: 'Разные роли' },
      ],
    },
    {
      id: 'scenarios',
      title: isMobile ? 'Какие сценарии главные в приложении?' : 'Что пользователь делает чаще всего?',
      hint: 'Отмеченное определит, какие блоки попадут на экран.',
      kind: 'multi',
      options: isMobile
        ? [
            { id: 'mobileCards', label: 'Просматривает каталог', adds: ['mobileCards', 'mobileChips'] },
            { id: 'mobileList', label: 'Смотрит историю и записи', adds: ['mobileList'] },
            { id: 'mobileStats', label: 'Следит за своими показателями', adds: ['mobileStats'] },
            { id: 'mobileHero', label: 'Совершает одно главное действие', adds: ['mobileHero'] },
          ]
        : [
            { id: 'kpis', label: 'Смотрит сводку и метрики', adds: ['kpis'] },
            { id: 'chart', label: 'Анализирует динамику', adds: ['chart'] },
            { id: 'table', label: 'Работает со списком записей', adds: ['table'] },
            { id: 'board', label: 'Двигает задачи по этапам', adds: ['board'] },
            { id: 'activity', label: 'Следит за активностью команды', adds: ['activity'] },
          ],
      optional: true,
    },
    {
      id: 'density',
      title: 'Насколько плотным должен быть интерфейс?',
      kind: 'single',
      options: [
        { id: 'pro', label: 'Максимум данных на экран', note: 'Для профессионалов' },
        { id: 'mass', label: 'Спокойно, с воздухом', note: 'Для широкой аудитории' },
        { id: 'premium', label: 'Просторно и дорого' },
      ],
    },
    { ...STYLE_QUESTION, title: 'Какой визуальный стиль у интерфейса?' },
    COLORS_QUESTION,
    SCHEME_QUESTION,
    MOTION_QUESTION,
    extrasQuestion('Ограничения платформы, гайдлайны, интеграции.'),
  ];
}

/* -------------------------------- graphic -------------------------------- */

function graphicFlow(answers: Answers): Question[] {
  const product = getProduct(firstAnswer(answers, 'product'));

  return [
    PRODUCT_QUESTION,
    { ...NICHE_QUESTION, title: 'Для какой сферы макет?' },
    nameQuestion('Название бренда или проекта?', 'Оно будет на макете'),
    {
      id: 'message',
      title: 'Какое одно сообщение должен донести макет?',
      hint: 'Именно одно — макет такого формата не удержит больше.',
      kind: 'text',
      placeholder:
        product.id === 'presentation'
          ? 'Например: мы выросли втрое за год и готовы к раунду'
          : 'Например: скидка 30% на первую подписку до конца недели',
    },
    {
      id: 'elements',
      title: 'Что обязательно должно быть на макете?',
      kind: 'multi',
      options: [
        { id: 'logo', label: 'Логотип' },
        { id: 'headline', label: 'Крупный заголовок' },
        { id: 'visual', label: 'Изображение или иллюстрация' },
        { id: 'price', label: 'Цена или спецпредложение' },
        { id: 'cta', label: 'Кнопка действия' },
        { id: 'contacts', label: 'Контакты' },
        { id: 'qr', label: 'QR-код' },
        { id: 'legal', label: 'Мелкий шрифт, дисклеймер' },
      ],
      optional: true,
    },
    {
      id: 'audience',
      title: 'Кто увидит этот макет?',
      kind: 'single',
      options: [
        { id: 'mass', label: 'Широкая аудитория' },
        { id: 'b2b', label: 'Партнёры и бизнес' },
        { id: 'premium', label: 'Премиум-сегмент' },
        { id: 'youth', label: 'Молодая аудитория' },
      ],
    },
    { ...STYLE_QUESTION, title: 'Какая стилистика нужна?' },
    COLORS_QUESTION,
    SCHEME_QUESTION,
    extrasQuestion('Требования площадки, обязательные надписи, ограничения.'),
  ];
}

/* --------------------------------- public -------------------------------- */

export function buildFlow(answers: Answers): Question[] {
  switch (trackOf(answers)) {
    case 'logo':
      // Entirely separate questionnaire — see `logo/questions.ts`.
      return buildLogoFlow(answers, PRODUCT_QUESTION);
    case 'interface':
      return interfaceFlow(answers);
    case 'graphic':
      return graphicFlow(answers);
    default:
      return webFlow(answers);
  }
}

/** Every option the user selected, across the whole flow. */
export function selectedOptions(answers: Answers): QuestionOption[] {
  const flow = buildFlow(answers);
  const picked: QuestionOption[] = [];

  for (const question of flow) {
    const values = answerOf(answers, question.id);
    if (values.length === 0) continue;
    for (const option of question.options ?? []) {
      if (values.includes(option.id)) picked.push(option);
    }
  }
  return picked;
}

/** Block ids the answers demand — the layout consequence of the interview. */
export function requiredBlocks(answers: Answers): string[] {
  const fromOptions = selectedOptions(answers).flatMap((option) => option.adds ?? []);
  // The sections question lists block ids directly as option ids.
  const fromSections = [...answerOf(answers, 'sections'), ...answerOf(answers, 'elements'), ...answerOf(answers, 'scenarios')];
  return [...new Set([...fromOptions, ...fromSections])];
}
