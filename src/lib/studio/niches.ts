import type { Question, QuestionOption } from './types';

/* ===========================================================================
   Business spheres and the questions each one actually needs.

   A restaurant is asked about cuisine and reservations; an IT company about
   stack and case studies. These questions are appended to the common core once
   the sphere is known, so no two briefs walk the same path.

   Options may carry `adds` — block ids pulled into the composition when the
   option is chosen. That is what keeps the interview honest: answering "нужна
   онлайн-бронь" actually puts a booking block on the page.
   =========================================================================== */

export interface Niche {
  id: string;
  label: string;
  group: string;
  note: string;
  /** Copy vocabulary used by the content generator. */
  domain: string;
  /** Section options offered for this sphere. */
  sections: QuestionOption[];
  /** Sphere-specific questions, asked after the common core. */
  questions: Question[];
}

const q = (
  id: string,
  title: string,
  kind: Question['kind'],
  options?: QuestionOption[],
  extra?: Partial<Question>,
): Question => ({ id, title, kind, options, ...extra });

/* ------------------------------ shared sets ------------------------------ */

const WEB_SECTIONS_BASE: QuestionOption[] = [
  { id: 'hero', label: 'Первый экран с оффером' },
  { id: 'features', label: 'Преимущества' },
  { id: 'testimonials', label: 'Отзывы' },
  { id: 'faq', label: 'Вопросы и ответы' },
  { id: 'contactForm', label: 'Форма заявки' },
  { id: 'stats', label: 'Цифры и достижения' },
];

export const NICHES: Niche[] = [
  /* --------------------------------- еда --------------------------------- */
  {
    id: 'restaurant',
    label: 'Ресторан, кафе, бар',
    group: 'Еда и напитки',
    note: 'Заведение с залом и меню',
    domain: 'food',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', label: 'Меню с ценами' },
      { id: 'gallery', label: 'Фотогалерея зала и блюд' },
      { id: 'team', label: 'Шеф и команда' },
      { id: 'map', label: 'Адрес и карта' },
    ],
    questions: [
      q('cuisine', 'Какой тип кухни?', 'single', [
        { id: 'author', label: 'Авторская' },
        { id: 'italian', label: 'Итальянская' },
        { id: 'asian', label: 'Азиатская' },
        { id: 'georgian', label: 'Грузинская' },
        { id: 'russian', label: 'Русская' },
        { id: 'european', label: 'Европейская' },
        { id: 'street', label: 'Стритфуд и бургеры' },
      ]),
      q('signature', 'Какие блюда или позиции обязательно показать?', 'text', undefined, {
        placeholder: 'Например: дровяная печь, сезонные закуски, винная карта на 180 позиций',
        optional: true,
      }),
      q('booking', 'Нужно ли онлайн-бронирование столиков?', 'single', [
        { id: 'tables', label: 'Да, бронь столика', adds: ['contactForm'] },
        { id: 'banquets', label: 'Да, ещё и банкеты', adds: ['contactForm', 'pricing'] },
        { id: 'phone', label: 'Нет, только телефон' },
      ]),
      q('delivery', 'Есть доставка или самовывоз?', 'single', [
        { id: 'both', label: 'Да, и то и другое', adds: ['catalog'] },
        { id: 'pickup', label: 'Только самовывоз', adds: ['catalog'] },
        { id: 'none', label: 'Нет, только зал' },
      ]),
      q('atmosphere', 'Какая атмосфера у заведения?', 'multi', [
        { id: 'family', label: 'Семейная' },
        { id: 'romantic', label: 'Романтическая' },
        { id: 'loud', label: 'Шумный бар' },
        { id: 'quiet', label: 'Тихая, камерная' },
        { id: 'view', label: 'С видом, терраса' },
        { id: 'gastro', label: 'Гастрономическая' },
      ]),
    ],
  },
  {
    id: 'bakery',
    label: 'Пекарня, кондитерская, доставка еды',
    group: 'Еда и напитки',
    note: 'Продажа продукции, а не посадка гостей',
    domain: 'food',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', label: 'Витрина продукции' },
      { id: 'categories', label: 'Категории' },
      { id: 'gallery', label: 'Галерея' },
      { id: 'steps', label: 'Как оформить заказ' },
    ],
    questions: [
      q('assortment', 'Что вы продаёте?', 'multi', [
        { id: 'bread', label: 'Хлеб на закваске' },
        { id: 'cakes', label: 'Торты на заказ', adds: ['contactForm'] },
        { id: 'desserts', label: 'Десерты и пирожные', adds: ['catalog'] },
        { id: 'coffee', label: 'Кофе с собой' },
        { id: 'sets', label: 'Готовые наборы', adds: ['catalog'] },
      ]),
      q('order', 'Как клиент оформляет заказ?', 'single', [
        { id: 'cart', label: 'Корзина и оплата на сайте', adds: ['catalog', 'steps'] },
        { id: 'form', label: 'Заявка, менеджер перезвонит', adds: ['contactForm'] },
        { id: 'messenger', label: 'Через мессенджер' },
      ]),
      q('leadTime', 'За сколько принимаете заказы?', 'single', [
        { id: 'today', label: 'В день обращения' },
        { id: 'day', label: 'За сутки' },
        { id: 'threeDays', label: 'За 2–3 дня' },
      ]),
    ],
  },

  /* ------------------------------- красота ------------------------------- */
  {
    id: 'beauty',
    label: 'Салон красоты, спа',
    group: 'Красота и здоровье',
    note: 'Уход, процедуры, мастера',
    domain: 'beauty',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', label: 'Прайс на услуги' },
      { id: 'team', label: 'Мастера' },
      { id: 'gallery', label: 'Работы «до и после»' },
      { id: 'map', label: 'Адрес и карта' },
    ],
    questions: [
      q('services', 'Какие услуги предоставляете?', 'multi', [
        { id: 'hair', label: 'Волосы: стрижка, окрашивание', adds: ['pricing'] },
        { id: 'nails', label: 'Ногтевой сервис', adds: ['pricing'] },
        { id: 'brows', label: 'Брови и ресницы' },
        { id: 'cosmetology', label: 'Косметология' },
        { id: 'spa', label: 'Массаж и спа' },
        { id: 'makeup', label: 'Макияж и укладки' },
      ]),
      q('booking', 'Нужна ли онлайн-запись?', 'single', [
        { id: 'full', label: 'Да, с выбором мастера и времени', adds: ['contactForm', 'team'] },
        { id: 'simple', label: 'Да, простая форма заявки', adds: ['contactForm'] },
        { id: 'none', label: 'Нет, записываем по телефону' },
      ]),
      q('segment', 'Какой ценовой сегмент?', 'single', [
        { id: 'economy', label: 'Доступный' },
        { id: 'middle', label: 'Средний' },
        { id: 'premium', label: 'Премиум' },
      ]),
      q('masters', 'Показывать мастеров и их работы?', 'single', [
        { id: 'yes', label: 'Да, это наш главный аргумент', adds: ['team', 'gallery'] },
        { id: 'brief', label: 'Кратко, без портфолио', adds: ['team'] },
        { id: 'no', label: 'Нет' },
      ]),
    ],
  },
  {
    id: 'barber',
    label: 'Барбершоп, тату-студия',
    group: 'Красота и здоровье',
    note: 'Характерная эстетика, сильный визуал',
    domain: 'beauty',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', label: 'Прайс' },
      { id: 'team', label: 'Мастера' },
      { id: 'gallery', label: 'Галерея работ' },
      { id: 'map', label: 'Адрес' },
    ],
    questions: [
      q('services', 'Что делаете?', 'multi', [
        { id: 'haircut', label: 'Стрижки', adds: ['pricing'] },
        { id: 'beard', label: 'Борода и бритьё', adds: ['pricing'] },
        { id: 'tattoo', label: 'Татуировки', adds: ['gallery'] },
        { id: 'piercing', label: 'Пирсинг' },
        { id: 'care', label: 'Уход и косметика', adds: ['catalog'] },
      ]),
      q('booking', 'Как записываются клиенты?', 'single', [
        { id: 'slots', label: 'Онлайн, по свободным слотам', adds: ['contactForm', 'team'] },
        { id: 'master', label: 'К конкретному мастеру', adds: ['team', 'contactForm'] },
        { id: 'phone', label: 'По телефону' },
      ]),
      q('vibe', 'Какой характер у студии?', 'multi', [
        { id: 'classic', label: 'Классический, олдскул' },
        { id: 'raw', label: 'Брутальный, сырой' },
        { id: 'modern', label: 'Современный, чистый' },
        { id: 'artistic', label: 'Артистичный' },
      ]),
    ],
  },
  {
    id: 'medical',
    label: 'Клиника, стоматология, ветклиника',
    group: 'Красота и здоровье',
    note: 'Доверие, лицензии, запись на приём',
    domain: 'health',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', label: 'Прайс на услуги' },
      { id: 'team', label: 'Врачи' },
      { id: 'steps', label: 'Как проходит приём' },
      { id: 'map', label: 'Адреса филиалов' },
    ],
    questions: [
      q('directions', 'Какие направления принимаете?', 'multi', [
        { id: 'therapy', label: 'Терапия' },
        { id: 'diagnostics', label: 'Диагностика' },
        { id: 'surgery', label: 'Хирургия' },
        { id: 'dental', label: 'Стоматология' },
        { id: 'pediatrics', label: 'Детский приём' },
        { id: 'vet', label: 'Ветеринария' },
      ]),
      q('booking', 'Нужна ли онлайн-запись на приём?', 'single', [
        { id: 'doctor', label: 'Да, с выбором врача и времени', adds: ['contactForm', 'team'] },
        { id: 'callback', label: 'Да, заявка на обратный звонок', adds: ['contactForm'] },
        { id: 'none', label: 'Нет' },
      ]),
      q('trust', 'Чем подтверждаете квалификацию?', 'multi', [
        { id: 'licenses', label: 'Лицензии и сертификаты', adds: ['stats'] },
        { id: 'equipment', label: 'Оборудование', adds: ['gallery'] },
        { id: 'experience', label: 'Стаж врачей', adds: ['team', 'stats'] },
        { id: 'reviews', label: 'Отзывы пациентов', adds: ['testimonials'] },
      ]),
      q('prices', 'Показывать цены открыто?', 'single', [
        { id: 'full', label: 'Да, полный прайс', adds: ['pricing'] },
        { id: 'from', label: 'Только «от»', adds: ['pricing'] },
        { id: 'no', label: 'Нет, по запросу' },
      ]),
    ],
  },
  {
    id: 'fitness',
    label: 'Фитнес, йога, танцы',
    group: 'Красота и здоровье',
    note: 'Расписание, абонементы, тренеры',
    domain: 'sport',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', label: 'Абонементы' },
      { id: 'team', label: 'Тренеры' },
      { id: 'gallery', label: 'Залы и фото' },
      { id: 'steps', label: 'Как начать' },
    ],
    questions: [
      q('directions', 'Какие направления?', 'multi', [
        { id: 'gym', label: 'Тренажёрный зал' },
        { id: 'group', label: 'Групповые занятия' },
        { id: 'yoga', label: 'Йога и растяжка' },
        { id: 'dance', label: 'Танцы' },
        { id: 'martial', label: 'Единоборства' },
        { id: 'personal', label: 'Персональные тренировки', adds: ['team'] },
      ]),
      q('schedule', 'Нужно ли расписание занятий?', 'single', [
        { id: 'week', label: 'Да, сетка на неделю', adds: ['catalog'] },
        { id: 'list', label: 'Да, простым списком', adds: ['catalog'] },
        { id: 'no', label: 'Нет' },
      ]),
      q('membership', 'Как продаёте доступ?', 'single', [
        { id: 'subscription', label: 'Абонементы на месяц и год', adds: ['pricing'] },
        { id: 'single', label: 'Разовые занятия', adds: ['pricing'] },
        { id: 'trial', label: 'Через пробное занятие', adds: ['contactForm'] },
      ]),
      q('level', 'На кого рассчитаны занятия?', 'multi', [
        { id: 'beginners', label: 'Новички' },
        { id: 'advanced', label: 'Продолжающие' },
        { id: 'kids', label: 'Дети' },
        { id: 'seniors', label: 'Старший возраст' },
      ]),
    ],
  },

  /* ------------------------------- цифровое ------------------------------ */
  {
    id: 'it',
    label: 'IT-компания, разработка',
    group: 'Технологии и бизнес',
    note: 'Услуги, стек, кейсы',
    domain: 'tech',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', label: 'Кейсы и проекты' },
      { id: 'logos', label: 'Логотипы клиентов' },
      { id: 'steps', label: 'Процесс работы' },
      { id: 'team', label: 'Команда' },
    ],
    questions: [
      q('services', 'Какие услуги предоставляет компания?', 'multi', [
        { id: 'web', label: 'Веб-разработка' },
        { id: 'mobile', label: 'Мобильные приложения' },
        { id: 'custom', label: 'Заказная разработка под ключ' },
        { id: 'integration', label: 'Интеграции и автоматизация' },
        { id: 'outstaff', label: 'Аутстаффинг команд', adds: ['team'] },
        { id: 'support', label: 'Поддержка и развитие продукта' },
      ]),
      q('clients', 'Какой тип клиентов?', 'single', [
        { id: 'enterprise', label: 'Крупный бизнес', adds: ['logos', 'showcase'] },
        { id: 'smb', label: 'Малый и средний бизнес' },
        { id: 'startups', label: 'Стартапы' },
        { id: 'gov', label: 'Госсектор' },
      ]),
      q('stack', 'Какие технологии и направления показать?', 'text', undefined, {
        placeholder: 'Например: React, Node.js, Kubernetes, ML-пайплайны',
        optional: true,
      }),
      q('cases', 'Показывать кейсы?', 'single', [
        { id: 'detailed', label: 'Да, с цифрами и результатом', adds: ['showcase', 'stats'] },
        { id: 'brief', label: 'Да, коротким списком', adds: ['showcase'] },
        { id: 'nda', label: 'Нет, всё под NDA' },
      ]),
      q('action', 'Какое основное действие должен совершить пользователь?', 'single', [
        { id: 'brief', label: 'Оставить заявку на проект', adds: ['contactForm'] },
        { id: 'call', label: 'Записаться на созвон', adds: ['contactForm'] },
        { id: 'estimate', label: 'Запросить оценку', adds: ['contactForm', 'pricing'] },
        { id: 'vacancy', label: 'Откликнуться на вакансию', adds: ['team'] },
      ]),
    ],
  },
  {
    id: 'saas',
    label: 'SaaS, онлайн-сервис',
    group: 'Технологии и бизнес',
    note: 'Продукт с подпиской и тарифами',
    domain: 'tech',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', label: 'Тарифы' },
      { id: 'showcase', label: 'Интерфейс продукта' },
      { id: 'logos', label: 'Клиенты и интеграции' },
      { id: 'steps', label: 'Как начать' },
    ],
    questions: [
      q('problem', 'Какую задачу решает продукт?', 'text', undefined, {
        placeholder: 'Например: собирает заявки из пяти каналов в одну воронку',
      }),
      q('model', 'Как продаётся продукт?', 'single', [
        { id: 'trial', label: 'Бесплатный период, потом подписка', adds: ['pricing', 'steps'] },
        { id: 'freemium', label: 'Freemium с платными функциями', adds: ['pricing'] },
        { id: 'demo', label: 'Через демо и переговоры', adds: ['contactForm'] },
        { id: 'license', label: 'Разовая лицензия', adds: ['pricing'] },
      ]),
      q('audienceType', 'Кто пользователь?', 'single', [
        { id: 'teams', label: 'Команды внутри компаний' },
        { id: 'solo', label: 'Отдельные специалисты' },
        { id: 'enterprise', label: 'Крупные организации', adds: ['logos'] },
      ]),
      q('proof', 'Чем доказываете, что продукт работает?', 'multi', [
        { id: 'metrics', label: 'Метрики и цифры', adds: ['stats'] },
        { id: 'screens', label: 'Скриншоты интерфейса', adds: ['showcase'] },
        { id: 'clients', label: 'Логотипы клиентов', adds: ['logos'] },
        { id: 'reviews', label: 'Отзывы пользователей', adds: ['testimonials'] },
      ]),
    ],
  },
  {
    id: 'agency',
    label: 'Агентство, студия дизайна',
    group: 'Технологии и бизнес',
    note: 'Работы, процесс, команда',
    domain: 'creative',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', label: 'Портфолио' },
      { id: 'steps', label: 'Процесс работы' },
      { id: 'team', label: 'Команда' },
      { id: 'pricing', label: 'Форматы и стоимость' },
    ],
    questions: [
      q('services', 'Чем занимается студия?', 'multi', [
        { id: 'branding', label: 'Брендинг и айдентика' },
        { id: 'web', label: 'Сайты и digital' },
        { id: 'product', label: 'Продуктовый дизайн' },
        { id: 'packaging', label: 'Упаковка' },
        { id: 'motion', label: 'Motion и видео' },
        { id: 'ads', label: 'Реклама и кампании' },
      ]),
      q('portfolio', 'Как показать работы?', 'single', [
        { id: 'big', label: 'Крупными кейсами с историей', adds: ['showcase'] },
        { id: 'grid', label: 'Плотной сеткой превью', adds: ['showcase', 'gallery'] },
        { id: 'selected', label: 'Только 3–5 избранных', adds: ['showcase'] },
      ]),
      q('positioning', 'Как себя позиционируете?', 'single', [
        { id: 'boutique', label: 'Небольшая бутиковая студия' },
        { id: 'fullcycle', label: 'Агентство полного цикла', adds: ['team', 'steps'] },
        { id: 'solo', label: 'Один сильный специалист' },
      ]),
    ],
  },

  /* ------------------------------- торговля ------------------------------ */
  {
    id: 'shop',
    label: 'Интернет-магазин, бренд',
    group: 'Торговля и услуги',
    note: 'Каталог, корзина, доставка',
    domain: 'shop',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', label: 'Каталог товаров' },
      { id: 'categories', label: 'Категории' },
      { id: 'productDetail', label: 'Карточка товара' },
      { id: 'gallery', label: 'Лукбук и галерея' },
    ],
    questions: [
      q('goods', 'Что продаёте?', 'text', undefined, {
        placeholder: 'Например: свет и предметы интерьера собственного производства',
      }),
      q('assortmentSize', 'Насколько большой ассортимент?', 'single', [
        { id: 'small', label: 'До 20 позиций', adds: ['catalog'] },
        { id: 'medium', label: '20–200 позиций', adds: ['catalog', 'categories'] },
        { id: 'large', label: 'Больше 200', adds: ['catalog', 'categories'] },
      ]),
      q('checkout', 'Как оформляется покупка?', 'single', [
        { id: 'cart', label: 'Корзина и оплата онлайн', adds: ['catalog', 'productDetail'] },
        { id: 'oneClick', label: 'Покупка в один клик', adds: ['contactForm'] },
        { id: 'request', label: 'Заявка, менеджер свяжется', adds: ['contactForm'] },
      ]),
      q('advantage', 'Чем выделяетесь среди конкурентов?', 'multi', [
        { id: 'own', label: 'Собственное производство' },
        { id: 'price', label: 'Цена' },
        { id: 'delivery', label: 'Быстрая доставка' },
        { id: 'quality', label: 'Материалы и качество' },
        { id: 'design', label: 'Дизайн и эксклюзивность' },
      ]),
    ],
  },
  {
    id: 'realestate',
    label: 'Недвижимость, ремонт, интерьер',
    group: 'Торговля и услуги',
    note: 'Объекты, сметы, портфолио',
    domain: 'home',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', label: 'Объекты и проекты' },
      { id: 'catalog', label: 'Каталог с фильтрами' },
      { id: 'steps', label: 'Этапы работы' },
      { id: 'pricing', label: 'Стоимость за м²' },
    ],
    questions: [
      q('activity', 'Чем занимаетесь?', 'single', [
        { id: 'sale', label: 'Продажа и аренда недвижимости', adds: ['catalog'] },
        { id: 'renovation', label: 'Ремонт под ключ', adds: ['showcase', 'steps'] },
        { id: 'interior', label: 'Дизайн интерьера', adds: ['showcase'] },
        { id: 'construction', label: 'Строительство домов', adds: ['showcase', 'steps'] },
      ]),
      q('objects', 'Как показывать объекты?', 'single', [
        { id: 'filters', label: 'Каталог с фильтрами по параметрам', adds: ['catalog', 'categories'] },
        { id: 'cases', label: 'Портфолио проектов с фото', adds: ['showcase', 'gallery'] },
        { id: 'few', label: 'Несколько ключевых объектов', adds: ['showcase'] },
      ]),
      q('calculator', 'Нужен ли расчёт стоимости?', 'single', [
        { id: 'yes', label: 'Да, калькулятор на сайте', adds: ['pricing', 'contactForm'] },
        { id: 'estimate', label: 'Да, заявка на смету', adds: ['contactForm'] },
        { id: 'no', label: 'Нет' },
      ]),
    ],
  },
  {
    id: 'services',
    label: 'Услуги: клининг, авто, логистика',
    group: 'Торговля и услуги',
    note: 'Понятная цена и быстрая заявка',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', label: 'Прайс' },
      { id: 'steps', label: 'Как мы работаем' },
      { id: 'showcase', label: 'Примеры работ' },
      { id: 'map', label: 'Зона обслуживания' },
    ],
    questions: [
      q('service', 'Какую услугу оказываете?', 'text', undefined, {
        placeholder: 'Например: генеральная уборка квартир и офисов после ремонта',
      }),
      q('pricing', 'Как формируется цена?', 'single', [
        { id: 'fixed', label: 'Фиксированный прайс', adds: ['pricing'] },
        { id: 'calculator', label: 'Считается от объёма', adds: ['pricing', 'contactForm'] },
        { id: 'estimate', label: 'Только после выезда', adds: ['contactForm'] },
      ]),
      q('urgency', 'Насколько срочная это услуга?', 'single', [
        { id: 'emergency', label: 'Часто нужна срочно', adds: ['contactForm'] },
        { id: 'planned', label: 'Обычно планируют заранее' },
        { id: 'regular', label: 'Регулярная, по подписке', adds: ['pricing'] },
      ]),
      q('proof', 'Чем убеждаете, что вам можно доверять?', 'multi', [
        { id: 'before', label: 'Фото «до и после»', adds: ['showcase', 'gallery'] },
        { id: 'guarantee', label: 'Гарантия на работы' },
        { id: 'staff', label: 'Свои сотрудники в штате', adds: ['team'] },
        { id: 'reviews', label: 'Отзывы клиентов', adds: ['testimonials'] },
      ]),
    ],
  },
  {
    id: 'professional',
    label: 'Юристы, консалтинг, финансы',
    group: 'Торговля и услуги',
    note: 'Экспертиза, практики, кейсы',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', label: 'Кейсы и дела' },
      { id: 'team', label: 'Партнёры и специалисты' },
      { id: 'pricing', label: 'Стоимость услуг' },
      { id: 'steps', label: 'Порядок работы' },
    ],
    questions: [
      q('practice', 'Какие направления ведёте?', 'multi', [
        { id: 'corporate', label: 'Корпоративное право' },
        { id: 'court', label: 'Судебные споры', adds: ['showcase'] },
        { id: 'tax', label: 'Налоги и бухгалтерия' },
        { id: 'realestate', label: 'Сделки с недвижимостью' },
        { id: 'consulting', label: 'Управленческий консалтинг' },
        { id: 'finance', label: 'Финансы и инвестиции' },
      ]),
      q('clientType', 'С кем работаете?', 'single', [
        { id: 'business', label: 'С компаниями', adds: ['logos'] },
        { id: 'private', label: 'С частными лицами' },
        { id: 'both', label: 'И с теми, и с другими' },
      ]),
      q('proof', 'Как доказываете экспертизу?', 'multi', [
        { id: 'cases', label: 'Выигранные дела с суммами', adds: ['showcase', 'stats'] },
        { id: 'experience', label: 'Годы практики', adds: ['stats'] },
        { id: 'publications', label: 'Публикации и рейтинги' },
        { id: 'team', label: 'Регалии партнёров', adds: ['team'] },
      ]),
    ],
  },

  /* ----------------------------- образование ----------------------------- */
  {
    id: 'education',
    label: 'Курсы, школа, обучение',
    group: 'Образование и люди',
    note: 'Программы, преподаватели, результат',
    domain: 'education',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', label: 'Каталог курсов' },
      { id: 'team', label: 'Преподаватели' },
      { id: 'steps', label: 'Программа обучения' },
      { id: 'pricing', label: 'Стоимость' },
    ],
    questions: [
      q('format', 'В каком формате учите?', 'single', [
        { id: 'online', label: 'Онлайн' },
        { id: 'offline', label: 'Очно' },
        { id: 'mixed', label: 'Смешанный формат' },
      ]),
      q('subjects', 'Чему учите?', 'text', undefined, {
        placeholder: 'Например: интерфейсный дизайн, вёрстка, аналитика для начинающих',
      }),
      q('outcome', 'Какой результат получает ученик?', 'single', [
        { id: 'job', label: 'Работу или стажировку', adds: ['stats', 'testimonials'] },
        { id: 'portfolio', label: 'Проекты в портфолио', adds: ['showcase'] },
        { id: 'certificate', label: 'Диплом или сертификат' },
        { id: 'skill', label: 'Навык для себя' },
      ]),
      q('enroll', 'Как записываются на курс?', 'single', [
        { id: 'trial', label: 'Через бесплатное занятие', adds: ['contactForm'] },
        { id: 'direct', label: 'Сразу оплата на сайте', adds: ['pricing', 'catalog'] },
        { id: 'consult', label: 'После консультации', adds: ['contactForm'] },
      ]),
    ],
  },
  {
    id: 'kids',
    label: 'Детский центр, садик',
    group: 'Образование и люди',
    note: 'Решение принимают родители',
    domain: 'education',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', label: 'Группы и занятия' },
      { id: 'team', label: 'Педагоги' },
      { id: 'gallery', label: 'Фото помещений' },
      { id: 'pricing', label: 'Стоимость' },
    ],
    questions: [
      q('age', 'С каким возрастом работаете?', 'multi', [
        { id: 'nursery', label: 'Ясли, 1–3 года' },
        { id: 'preschool', label: 'Дошкольники, 3–7 лет' },
        { id: 'school', label: 'Школьники' },
      ]),
      q('parentConcern', 'Что важнее всего родителям?', 'multi', [
        { id: 'safety', label: 'Безопасность', adds: ['gallery'] },
        { id: 'teachers', label: 'Квалификация педагогов', adds: ['team'] },
        { id: 'schedule', label: 'Режим дня', adds: ['steps'] },
        { id: 'food', label: 'Питание' },
        { id: 'development', label: 'Программа развития', adds: ['catalog'] },
      ]),
      q('tour', 'Нужна ли запись на экскурсию?', 'single', [
        { id: 'yes', label: 'Да, это главное действие', adds: ['contactForm'] },
        { id: 'no', label: 'Нет, достаточно заявки' },
      ]),
    ],
  },
  {
    id: 'photo',
    label: 'Фотограф, видеограф',
    group: 'Образование и люди',
    note: 'Портфолио, съёмки, бронирование дат',
    domain: 'creative',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'gallery', label: 'Портфолио-галерея' },
      { id: 'showcase', label: 'Избранные съёмки' },
      { id: 'pricing', label: 'Пакеты съёмок' },
      { id: 'steps', label: 'Как проходит съёмка' },
    ],
    questions: [
      q('specialization', 'Какая у вас специализация?', 'multi', [
        { id: 'portrait', label: 'Портрет', adds: ['gallery'] },
        { id: 'wedding', label: 'Свадьбы', adds: ['gallery', 'pricing'] },
        { id: 'family', label: 'Семейная и детская' },
        { id: 'commercial', label: 'Коммерческая, предметная', adds: ['showcase'] },
        { id: 'reportage', label: 'Репортаж и события' },
        { id: 'video', label: 'Видеосъёмка' },
      ]),
      q('portfolio', 'Как показывать портфолио?', 'single', [
        { id: 'wall', label: 'Стеной кадров во весь экран', adds: ['gallery'] },
        { id: 'series', label: 'Отдельными съёмками-историями', adds: ['showcase'] },
        { id: 'selected', label: 'Только 10–15 лучших кадров', adds: ['gallery'] },
      ]),
      q('packages', 'Как устроены услуги и цены?', 'single', [
        { id: 'packages', label: 'Готовые пакеты съёмок', adds: ['pricing'] },
        { id: 'hourly', label: 'Почасовая оплата', adds: ['pricing'] },
        { id: 'request', label: 'Цена по запросу', adds: ['contactForm'] },
      ]),
      q('booking', 'Нужно ли бронирование даты?', 'single', [
        { id: 'calendar', label: 'Да, с занятыми датами', adds: ['contactForm'] },
        { id: 'form', label: 'Да, простая заявка', adds: ['contactForm'] },
        { id: 'no', label: 'Нет, только контакты' },
      ]),
      q('social', 'Какие соцсети показывать?', 'text', undefined, {
        placeholder: 'Например: Instagram, Telegram-канал, VK — ссылки попадут в шапку и подвал',
        optional: true,
      }),
    ],
  },
  {
    id: 'personal',
    label: 'Личный бренд, эксперт, портфолио',
    group: 'Образование и люди',
    note: 'Один человек и его работа',
    domain: 'creative',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', label: 'Работы или проекты' },
      { id: 'steps', label: 'Как проходит работа' },
      { id: 'pricing', label: 'Форматы и цены' },
      { id: 'gallery', label: 'Галерея' },
    ],
    questions: [
      q('field', 'Чем вы занимаетесь?', 'text', undefined, {
        placeholder: 'Например: фотограф, снимаю репортажи и портреты',
      }),
      q('offer', 'Что предлагаете аудитории?', 'multi', [
        { id: 'services', label: 'Личные услуги', adds: ['pricing'] },
        { id: 'consult', label: 'Консультации', adds: ['contactForm'] },
        { id: 'courses', label: 'Обучение', adds: ['catalog'] },
        { id: 'speaking', label: 'Выступления' },
      ]),
      q('tone', 'Каким должно быть впечатление о вас?', 'single', [
        { id: 'expert', label: 'Строгий эксперт' },
        { id: 'warm', label: 'Тёплый и близкий' },
        { id: 'artist', label: 'Художник, автор' },
        { id: 'premium', label: 'Дорогой специалист' },
      ]),
    ],
  },
  {
    id: 'events',
    label: 'События, туризм, отели',
    group: 'Образование и люди',
    note: 'Впечатление и бронирование',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'gallery', label: 'Галерея' },
      { id: 'catalog', label: 'Программы и туры' },
      { id: 'steps', label: 'Программа по дням' },
      { id: 'pricing', label: 'Пакеты и цены' },
    ],
    questions: [
      q('kind', 'Что организуете?', 'single', [
        { id: 'wedding', label: 'Свадьбы и торжества', adds: ['gallery', 'steps'] },
        { id: 'corporate', label: 'Корпоративные события' },
        { id: 'tours', label: 'Туры и экскурсии', adds: ['catalog'] },
        { id: 'hotel', label: 'Отель или база отдыха', adds: ['catalog', 'gallery'] },
      ]),
      q('booking', 'Как бронируют?', 'single', [
        { id: 'online', label: 'Онлайн, с датами', adds: ['contactForm', 'catalog'] },
        { id: 'request', label: 'Заявка и обсуждение', adds: ['contactForm'] },
      ]),
      q('emotion', 'Какое впечатление важно передать?', 'multi', [
        { id: 'luxury', label: 'Роскошь' },
        { id: 'nature', label: 'Природа и покой' },
        { id: 'adventure', label: 'Приключение' },
        { id: 'family', label: 'Семейное тепло' },
      ]),
    ],
  },
  {
    id: 'other',
    label: 'Другая сфера',
    group: 'Образование и люди',
    note: 'Опишу словами',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', label: 'Работы или проекты' },
      { id: 'catalog', label: 'Каталог' },
      { id: 'pricing', label: 'Цены' },
      { id: 'team', label: 'Команда' },
      { id: 'steps', label: 'Процесс' },
      { id: 'gallery', label: 'Галерея' },
    ],
    questions: [
      q('specifics', 'Что важно знать именно про вашу сферу?', 'text', undefined, {
        placeholder: 'Особенности, сезонность, кто принимает решение о покупке…',
      }),
      q('mainAction', 'Что главное должен сделать посетитель?', 'single', [
        { id: 'request', label: 'Оставить заявку', adds: ['contactForm'] },
        { id: 'buy', label: 'Купить', adds: ['catalog'] },
        { id: 'call', label: 'Позвонить' },
        { id: 'read', label: 'Изучить информацию' },
      ]),
    ],
  },
];

export const getNiche = (id: string): Niche =>
  NICHES.find((niche) => niche.id === id) ?? NICHES[NICHES.length - 1];

export const NICHE_GROUPS = [
  'Еда и напитки',
  'Красота и здоровье',
  'Технологии и бизнес',
  'Торговля и услуги',
  'Образование и люди',
];
