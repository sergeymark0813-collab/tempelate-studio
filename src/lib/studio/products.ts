import type { ProductKind } from './types';

/* ===========================================================================
   What the studio can design.

   Each kind declares its artboard, the blocks the composer may draw from and
   any additional frames worth generating (a second screen, the back of a card,
   a third slide). The composer decides which of the allowed blocks actually
   appear, in what order and in which variant — this list is a vocabulary, not
   a layout.
   =========================================================================== */

const PAGE = { kind: 'page', label: 'Десктоп 1440', width: 1440, chrome: 'browser' } as const;
const PHONE = { kind: 'mobile', label: 'Телефон 390×844', width: 390, height: 844, chrome: 'phone' } as const;
const DESKTOP_APP = { kind: 'app', label: 'Приложение 1440×900', width: 1440, height: 900, chrome: 'desktop' } as const;

export const PRODUCTS: ProductKind[] = [
  /* ------------------------------- веб ------------------------------- */
  {
    id: 'site',
    label: 'Сайт',
    group: 'Веб',
    note: 'Многостраничный сайт компании или проекта',
    canvas: PAGE,
    blocks: ['nav', 'hero', 'logos', 'features', 'showcase', 'stats', 'process', 'team', 'testimonials', 'faq', 'cta', 'contactForm', 'footer'],
    required: ['nav', 'hero', 'footer'],
    extraFrames: [{ name: 'Внутренняя страница', blocks: ['nav', 'pageHeader', 'features', 'gallery', 'cta', 'footer'] }],
  },
  {
    id: 'landing',
    label: 'Лендинг',
    group: 'Веб',
    note: 'Одностраничник под один оффер и одно действие',
    canvas: PAGE,
    blocks: ['nav', 'hero', 'logos', 'features', 'bento', 'showcase', 'stats', 'steps', 'pricing', 'testimonials', 'faq', 'cta', 'footer'],
    required: ['nav', 'hero', 'cta', 'footer'],
  },
  {
    id: 'shop',
    label: 'Интернет-магазин',
    group: 'Веб',
    note: 'Витрина, каталог и карточка товара',
    canvas: PAGE,
    blocks: ['nav', 'hero', 'categories', 'catalog', 'features', 'gallery', 'testimonials', 'cta', 'footer'],
    required: ['nav', 'hero', 'catalog', 'footer'],
    extraFrames: [{ name: 'Карточка товара', blocks: ['nav', 'productDetail', 'catalog', 'footer'] }],
  },
  {
    id: 'portfolio',
    label: 'Портфолио',
    group: 'Веб',
    note: 'Работы, подход и контакт',
    canvas: PAGE,
    blocks: ['nav', 'hero', 'showcase', 'gallery', 'bento', 'stats', 'process', 'testimonials', 'cta', 'footer'],
    required: ['nav', 'hero', 'showcase', 'footer'],
  },
  {
    id: 'auth',
    label: 'Авторизация и регистрация',
    group: 'Веб',
    note: 'Экраны входа, регистрации и восстановления',
    canvas: { kind: 'page', label: 'Десктоп 1440×900', width: 1440, height: 900, chrome: 'browser' },
    blocks: ['authForm'],
    required: ['authForm'],
    extraFrames: [{ name: 'Регистрация', blocks: ['authForm'] }],
  },

  /* ---------------------------- интерфейсы ---------------------------- */
  {
    id: 'mobileApp',
    label: 'Мобильное приложение',
    group: 'Интерфейсы',
    note: 'Экраны приложения под iOS и Android',
    canvas: PHONE,
    blocks: ['mobileHeader', 'mobileHero', 'mobileChips', 'mobileCards', 'mobileList', 'mobileStats', 'tabbar'],
    required: ['mobileHeader', 'tabbar'],
    extraFrames: [
      { name: 'Каталог', blocks: ['mobileHeader', 'mobileChips', 'mobileCards', 'tabbar'] },
      { name: 'Профиль', blocks: ['mobileHeader', 'mobileStats', 'mobileList', 'tabbar'] },
    ],
  },
  {
    id: 'dashboard',
    label: 'Панель администратора',
    group: 'Интерфейсы',
    note: 'Дашборд с метриками, графиками и таблицами',
    canvas: DESKTOP_APP,
    blocks: ['kpis', 'chart', 'table', 'activity', 'board'],
    required: ['kpis'],
    extraFrames: [{ name: 'Раздел отчётов', blocks: ['kpis', 'table', 'activity'] }],
  },
  {
    id: 'crm',
    label: 'CRM / ERP',
    group: 'Интерфейсы',
    note: 'Рабочее место оператора: списки, карточки, статусы',
    canvas: DESKTOP_APP,
    blocks: ['kpis', 'board', 'table', 'activity', 'chart'],
    required: ['table'],
    extraFrames: [{ name: 'Карточка сделки', blocks: ['board', 'activity'] }],
  },
  {
    id: 'service',
    label: 'Интерфейс сервиса',
    group: 'Интерфейсы',
    note: 'Веб-приложение с рабочей областью',
    canvas: DESKTOP_APP,
    blocks: ['kpis', 'chart', 'board', 'table', 'activity'],
    required: ['board'],
  },
  {
    id: 'uiKit',
    label: 'UI-компоненты',
    group: 'Интерфейсы',
    note: 'Библиотека элементов и состояний',
    canvas: { kind: 'kit', label: 'Лист 1280', width: 1280, chrome: 'none' },
    blocks: ['uiKit'],
    required: ['uiKit'],
  },

  /* ----------------------------- графика ----------------------------- */
  {
    id: 'logo',
    label: 'Логотип',
    group: 'Графика',
    note: 'Знак, логотип и правила построения',
    canvas: { kind: 'logo', label: 'Артборд 900×700', width: 900, height: 700, chrome: 'none' },
    blocks: ['logoMark'],
    required: ['logoMark'],
    extraFrames: [
      { name: 'Варианты и цвета', blocks: ['logoVariants'] },
      { name: 'Носители', blocks: ['logoUsage'] },
    ],
  },
  {
    id: 'banner',
    label: 'Рекламный баннер',
    group: 'Графика',
    note: 'Горизонтальный баннер для веба',
    canvas: { kind: 'poster', label: 'Баннер 1200×628', width: 1200, height: 628, chrome: 'none' },
    blocks: ['poster'],
    required: ['poster'],
    extraFrames: [{ name: 'Вертикальный формат', blocks: ['posterTall'] }],
  },
  {
    id: 'social',
    label: 'Пост для соцсетей',
    group: 'Графика',
    note: 'Квадратный пост и сторис',
    canvas: { kind: 'poster', label: 'Пост 1080×1080', width: 1080, height: 1080, chrome: 'none' },
    blocks: ['poster'],
    required: ['poster'],
    extraFrames: [{ name: 'Сторис 1080×1920', blocks: ['posterStory'] }],
  },
  {
    id: 'ad',
    label: 'Рекламные материалы',
    group: 'Графика',
    note: 'Плакат или афиша под печать и digital',
    canvas: { kind: 'poster', label: 'Плакат 1080×1350', width: 1080, height: 1350, chrome: 'none' },
    blocks: ['posterTall'],
    required: ['posterTall'],
  },
  {
    id: 'presentation',
    label: 'Презентация',
    group: 'Графика',
    note: 'Титул, содержательные слайды и финал',
    canvas: { kind: 'slide', label: 'Слайд 1600×900', width: 1600, height: 900, chrome: 'none' },
    blocks: ['slideTitle'],
    required: ['slideTitle'],
    extraFrames: [
      { name: 'Слайд с контентом', blocks: ['slideContent'] },
      { name: 'Слайд с цифрами', blocks: ['slideStats'] },
    ],
  },
  {
    id: 'businessCard',
    label: 'Визитная карточка',
    group: 'Графика',
    note: 'Лицевая и оборотная стороны, 90×50 мм',
    canvas: { kind: 'card', label: 'Визитка 1063×591', width: 1063, height: 591, chrome: 'paper' },
    blocks: ['cardFront'],
    required: ['cardFront'],
    extraFrames: [{ name: 'Оборот', blocks: ['cardBack'] }],
  },
  {
    id: 'email',
    label: 'Email-шаблон',
    group: 'Графика',
    note: 'Письмо шириной 600px под почтовые клиенты',
    canvas: { kind: 'email', label: 'Письмо 600', width: 600, chrome: 'paper' },
    blocks: ['emailHeader', 'emailHero', 'emailCards', 'emailCta', 'emailFooter'],
    required: ['emailHeader', 'emailHero', 'emailFooter'],
  },
  {
    id: 'productCard',
    label: 'Карточка товара',
    group: 'Графика',
    note: 'Карточка для маркетплейса или каталога',
    canvas: { kind: 'card', label: 'Карточка 900×1200', width: 900, height: 1200, chrome: 'none' },
    blocks: ['productCard'],
    required: ['productCard'],
  },
];

export const getProduct = (id: string): ProductKind =>
  PRODUCTS.find((product) => product.id === id) ?? PRODUCTS[0];

/** Picker groups, in display order. */
export const PRODUCT_GROUPS = ['Веб', 'Интерфейсы', 'Графика'];
