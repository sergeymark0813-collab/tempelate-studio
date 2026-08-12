import type { Question, QuestionOption } from './types';
import { stampNicheKeys } from './nicheKeys';

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
  /** Engine dictionary keys; each falls back to its literal when absent. */
  labelKey?: string;
  noteKey?: string;
  groupKey?: string;
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
  { id: 'hero', labelKey: 'sec.hero', label: 'Первый экран с оффером' },
  { id: 'features', labelKey: 'sec.features', label: 'Преимущества' },
  { id: 'testimonials', labelKey: 'sec.testimonials', label: 'Отзывы' },
  { id: 'faq', labelKey: 'sec.faq', label: 'Вопросы и ответы' },
  { id: 'contactForm', labelKey: 'sec.contactForm', label: 'Форма заявки' },
  { id: 'stats', labelKey: 'sec.stats', label: 'Цифры и достижения' },
];

export const NICHES: Niche[] = [
  /* --------------------------------- еда --------------------------------- */
  {
    id: 'restaurant',
    labelKey: 'niche.restaurant',
    noteKey: 'niche.restaurant.note',
    label: 'Ресторан, кафе, бар',
    group: 'Еда и напитки',
    groupKey: 'niche.group.food',
    note: 'Заведение с залом и меню',
    domain: 'food',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', labelKey: 'sec.restaurant.catalog', label: 'Меню с ценами' },
      { id: 'gallery', labelKey: 'sec.restaurant.gallery', label: 'Фотогалерея зала и блюд' },
      { id: 'team', labelKey: 'sec.restaurant.team', label: 'Шеф и команда' },
      { id: 'map', labelKey: 'sec.restaurant.map', label: 'Адрес и карта' },
    ],
    questions: [
      q('cuisine', 'Какой тип кухни?', 'single', [
        { id: 'author', labelKey: 'nq.restaurant.cuisine.author', label: 'Авторская' },
        { id: 'italian', labelKey: 'nq.restaurant.cuisine.italian', label: 'Итальянская' },
        { id: 'asian', labelKey: 'nq.restaurant.cuisine.asian', label: 'Азиатская' },
        { id: 'georgian', labelKey: 'nq.restaurant.cuisine.georgian', label: 'Грузинская' },
        { id: 'russian', labelKey: 'nq.restaurant.cuisine.russian', label: 'Русская' },
        { id: 'european', labelKey: 'nq.restaurant.cuisine.european', label: 'Европейская' },
        { id: 'street', labelKey: 'nq.restaurant.cuisine.street', label: 'Стритфуд и бургеры' },
      ]),
      q('signature', 'Какие блюда или позиции обязательно показать?', 'text', undefined, {
        placeholder: 'Например: дровяная печь, сезонные закуски, винная карта на 180 позиций',
        optional: true,
      }),
      q('booking', 'Нужно ли онлайн-бронирование столиков?', 'single', [
        { id: 'tables', labelKey: 'nq.restaurant.booking.tables', label: 'Да, бронь столика', adds: ['contactForm'] },
        { id: 'banquets', labelKey: 'nq.restaurant.booking.banquets', label: 'Да, ещё и банкеты', adds: ['contactForm', 'pricing'] },
        { id: 'phone', labelKey: 'nq.restaurant.booking.phone', label: 'Нет, только телефон' },
      ]),
      q('delivery', 'Есть доставка или самовывоз?', 'single', [
        { id: 'both', labelKey: 'nq.restaurant.delivery.both', label: 'Да, и то и другое', adds: ['catalog'] },
        { id: 'pickup', labelKey: 'nq.restaurant.delivery.pickup', label: 'Только самовывоз', adds: ['catalog'] },
        { id: 'none', labelKey: 'nq.restaurant.delivery.none', label: 'Нет, только зал' },
      ]),
      q('atmosphere', 'Какая атмосфера у заведения?', 'multi', [
        { id: 'family', labelKey: 'nq.restaurant.atmosphere.family', label: 'Семейная' },
        { id: 'romantic', labelKey: 'nq.restaurant.atmosphere.romantic', label: 'Романтическая' },
        { id: 'loud', labelKey: 'nq.restaurant.atmosphere.loud', label: 'Шумный бар' },
        { id: 'quiet', labelKey: 'nq.restaurant.atmosphere.quiet', label: 'Тихая, камерная' },
        { id: 'view', labelKey: 'nq.restaurant.atmosphere.view', label: 'С видом, терраса' },
        { id: 'gastro', labelKey: 'nq.restaurant.atmosphere.gastro', label: 'Гастрономическая' },
      ]),
    ],
  },
  {
    id: 'bakery',
    labelKey: 'niche.bakery',
    noteKey: 'niche.bakery.note',
    label: 'Пекарня, кондитерская, доставка еды',
    group: 'Еда и напитки',
    groupKey: 'niche.group.food',
    note: 'Продажа продукции, а не посадка гостей',
    domain: 'food',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', labelKey: 'sec.bakery.catalog', label: 'Витрина продукции' },
      { id: 'categories', labelKey: 'sec.bakery.categories', label: 'Категории' },
      { id: 'gallery', labelKey: 'sec.bakery.gallery', label: 'Галерея' },
      { id: 'steps', labelKey: 'sec.bakery.steps', label: 'Как оформить заказ' },
    ],
    questions: [
      q('assortment', 'Что вы продаёте?', 'multi', [
        { id: 'bread', labelKey: 'nq.bakery.assortment.bread', label: 'Хлеб на закваске' },
        { id: 'cakes', labelKey: 'nq.bakery.assortment.cakes', label: 'Торты на заказ', adds: ['contactForm'] },
        { id: 'desserts', labelKey: 'nq.bakery.assortment.desserts', label: 'Десерты и пирожные', adds: ['catalog'] },
        { id: 'coffee', labelKey: 'nq.bakery.assortment.coffee', label: 'Кофе с собой' },
        { id: 'sets', labelKey: 'nq.bakery.assortment.sets', label: 'Готовые наборы', adds: ['catalog'] },
      ]),
      q('order', 'Как клиент оформляет заказ?', 'single', [
        { id: 'cart', labelKey: 'nq.bakery.order.cart', label: 'Корзина и оплата на сайте', adds: ['catalog', 'steps'] },
        { id: 'form', labelKey: 'nq.bakery.order.form', label: 'Заявка, менеджер перезвонит', adds: ['contactForm'] },
        { id: 'messenger', labelKey: 'nq.bakery.order.messenger', label: 'Через мессенджер' },
      ]),
      q('leadTime', 'За сколько принимаете заказы?', 'single', [
        { id: 'today', labelKey: 'nq.bakery.leadTime.today', label: 'В день обращения' },
        { id: 'day', labelKey: 'nq.bakery.leadTime.day', label: 'За сутки' },
        { id: 'threeDays', labelKey: 'nq.bakery.leadTime.threeDays', label: 'За 2–3 дня' },
      ]),
    ],
  },

  /* ------------------------------- красота ------------------------------- */
  {
    id: 'beauty',
    labelKey: 'niche.beauty',
    noteKey: 'niche.beauty.note',
    label: 'Салон красоты, спа',
    group: 'Красота и здоровье',
    groupKey: 'niche.group.health',
    note: 'Уход, процедуры, мастера',
    domain: 'beauty',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', labelKey: 'sec.beauty.pricing', label: 'Прайс на услуги' },
      { id: 'team', labelKey: 'sec.beauty.team', label: 'Мастера' },
      { id: 'gallery', labelKey: 'sec.beauty.gallery', label: 'Работы «до и после»' },
      { id: 'map', labelKey: 'sec.beauty.map', label: 'Адрес и карта' },
    ],
    questions: [
      q('services', 'Какие услуги предоставляете?', 'multi', [
        { id: 'hair', labelKey: 'nq.beauty.services.hair', label: 'Волосы: стрижка, окрашивание', adds: ['pricing'] },
        { id: 'nails', labelKey: 'nq.beauty.services.nails', label: 'Ногтевой сервис', adds: ['pricing'] },
        { id: 'brows', labelKey: 'nq.beauty.services.brows', label: 'Брови и ресницы' },
        { id: 'cosmetology', labelKey: 'nq.beauty.services.cosmetology', label: 'Косметология' },
        { id: 'spa', labelKey: 'nq.beauty.services.spa', label: 'Массаж и спа' },
        { id: 'makeup', labelKey: 'nq.beauty.services.makeup', label: 'Макияж и укладки' },
      ]),
      q('booking', 'Нужна ли онлайн-запись?', 'single', [
        { id: 'full', labelKey: 'nq.beauty.booking.full', label: 'Да, с выбором мастера и времени', adds: ['contactForm', 'team'] },
        { id: 'simple', labelKey: 'nq.beauty.booking.simple', label: 'Да, простая форма заявки', adds: ['contactForm'] },
        { id: 'none', labelKey: 'nq.beauty.booking.none', label: 'Нет, записываем по телефону' },
      ]),
      q('segment', 'Какой ценовой сегмент?', 'single', [
        { id: 'economy', labelKey: 'nq.beauty.segment.economy', label: 'Доступный' },
        { id: 'middle', labelKey: 'nq.beauty.segment.middle', label: 'Средний' },
        { id: 'premium', labelKey: 'nq.beauty.segment.premium', label: 'Премиум' },
      ]),
      q('masters', 'Показывать мастеров и их работы?', 'single', [
        { id: 'yes', labelKey: 'nq.beauty.masters.yes', label: 'Да, это наш главный аргумент', adds: ['team', 'gallery'] },
        { id: 'brief', labelKey: 'nq.beauty.masters.brief', label: 'Кратко, без портфолио', adds: ['team'] },
        { id: 'no', labelKey: 'nq.beauty.masters.no', label: 'Нет' },
      ]),
    ],
  },
  {
    id: 'barber',
    labelKey: 'niche.barber',
    noteKey: 'niche.barber.note',
    label: 'Барбершоп, тату-студия',
    group: 'Красота и здоровье',
    groupKey: 'niche.group.health',
    note: 'Характерная эстетика, сильный визуал',
    domain: 'beauty',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', labelKey: 'sec.barber.pricing', label: 'Прайс' },
      { id: 'team', labelKey: 'sec.barber.team', label: 'Мастера' },
      { id: 'gallery', labelKey: 'sec.barber.gallery', label: 'Галерея работ' },
      { id: 'map', labelKey: 'sec.barber.map', label: 'Адрес' },
    ],
    questions: [
      q('services', 'Что делаете?', 'multi', [
        { id: 'haircut', labelKey: 'nq.barber.services.haircut', label: 'Стрижки', adds: ['pricing'] },
        { id: 'beard', labelKey: 'nq.barber.services.beard', label: 'Борода и бритьё', adds: ['pricing'] },
        { id: 'tattoo', labelKey: 'nq.barber.services.tattoo', label: 'Татуировки', adds: ['gallery'] },
        { id: 'piercing', labelKey: 'nq.barber.services.piercing', label: 'Пирсинг' },
        { id: 'care', labelKey: 'nq.barber.services.care', label: 'Уход и косметика', adds: ['catalog'] },
      ]),
      q('booking', 'Как записываются клиенты?', 'single', [
        { id: 'slots', labelKey: 'nq.barber.booking.slots', label: 'Онлайн, по свободным слотам', adds: ['contactForm', 'team'] },
        { id: 'master', labelKey: 'nq.barber.booking.master', label: 'К конкретному мастеру', adds: ['team', 'contactForm'] },
        { id: 'phone', labelKey: 'nq.barber.booking.phone', label: 'По телефону' },
      ]),
      q('vibe', 'Какой характер у студии?', 'multi', [
        { id: 'classic', labelKey: 'nq.barber.vibe.classic', label: 'Классический, олдскул' },
        { id: 'raw', labelKey: 'nq.barber.vibe.raw', label: 'Брутальный, сырой' },
        { id: 'modern', labelKey: 'nq.barber.vibe.modern', label: 'Современный, чистый' },
        { id: 'artistic', labelKey: 'nq.barber.vibe.artistic', label: 'Артистичный' },
      ]),
    ],
  },
  {
    id: 'medical',
    labelKey: 'niche.medical',
    noteKey: 'niche.medical.note',
    label: 'Клиника, стоматология, ветклиника',
    group: 'Красота и здоровье',
    groupKey: 'niche.group.health',
    note: 'Доверие, лицензии, запись на приём',
    domain: 'health',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', labelKey: 'sec.medical.pricing', label: 'Прайс на услуги' },
      { id: 'team', labelKey: 'sec.medical.team', label: 'Врачи' },
      { id: 'steps', labelKey: 'sec.medical.steps', label: 'Как проходит приём' },
      { id: 'map', labelKey: 'sec.medical.map', label: 'Адреса филиалов' },
    ],
    questions: [
      q('directions', 'Какие направления принимаете?', 'multi', [
        { id: 'therapy', labelKey: 'nq.medical.directions.therapy', label: 'Терапия' },
        { id: 'diagnostics', labelKey: 'nq.medical.directions.diagnostics', label: 'Диагностика' },
        { id: 'surgery', labelKey: 'nq.medical.directions.surgery', label: 'Хирургия' },
        { id: 'dental', labelKey: 'nq.medical.directions.dental', label: 'Стоматология' },
        { id: 'pediatrics', labelKey: 'nq.medical.directions.pediatrics', label: 'Детский приём' },
        { id: 'vet', labelKey: 'nq.medical.directions.vet', label: 'Ветеринария' },
      ]),
      q('booking', 'Нужна ли онлайн-запись на приём?', 'single', [
        { id: 'doctor', labelKey: 'nq.medical.booking.doctor', label: 'Да, с выбором врача и времени', adds: ['contactForm', 'team'] },
        { id: 'callback', labelKey: 'nq.medical.booking.callback', label: 'Да, заявка на обратный звонок', adds: ['contactForm'] },
        { id: 'none', labelKey: 'nq.medical.booking.none', label: 'Нет' },
      ]),
      q('trust', 'Чем подтверждаете квалификацию?', 'multi', [
        { id: 'licenses', labelKey: 'nq.medical.trust.licenses', label: 'Лицензии и сертификаты', adds: ['stats'] },
        { id: 'equipment', labelKey: 'nq.medical.trust.equipment', label: 'Оборудование', adds: ['gallery'] },
        { id: 'experience', labelKey: 'nq.medical.trust.experience', label: 'Стаж врачей', adds: ['team', 'stats'] },
        { id: 'reviews', labelKey: 'nq.medical.trust.reviews', label: 'Отзывы пациентов', adds: ['testimonials'] },
      ]),
      q('prices', 'Показывать цены открыто?', 'single', [
        { id: 'full', labelKey: 'nq.medical.prices.full', label: 'Да, полный прайс', adds: ['pricing'] },
        { id: 'from', labelKey: 'nq.medical.prices.from', label: 'Только «от»', adds: ['pricing'] },
        { id: 'no', labelKey: 'nq.medical.prices.no', label: 'Нет, по запросу' },
      ]),
    ],
  },
  {
    id: 'fitness',
    labelKey: 'niche.fitness',
    noteKey: 'niche.fitness.note',
    label: 'Фитнес, йога, танцы',
    group: 'Красота и здоровье',
    groupKey: 'niche.group.health',
    note: 'Расписание, абонементы, тренеры',
    domain: 'sport',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', labelKey: 'sec.fitness.pricing', label: 'Абонементы' },
      { id: 'team', labelKey: 'sec.fitness.team', label: 'Тренеры' },
      { id: 'gallery', labelKey: 'sec.fitness.gallery', label: 'Залы и фото' },
      { id: 'steps', labelKey: 'sec.fitness.steps', label: 'Как начать' },
    ],
    questions: [
      q('directions', 'Какие направления?', 'multi', [
        { id: 'gym', labelKey: 'nq.fitness.directions.gym', label: 'Тренажёрный зал' },
        { id: 'group', labelKey: 'nq.fitness.directions.group', label: 'Групповые занятия' },
        { id: 'yoga', labelKey: 'nq.fitness.directions.yoga', label: 'Йога и растяжка' },
        { id: 'dance', labelKey: 'nq.fitness.directions.dance', label: 'Танцы' },
        { id: 'martial', labelKey: 'nq.fitness.directions.martial', label: 'Единоборства' },
        { id: 'personal', labelKey: 'nq.fitness.directions.personal', label: 'Персональные тренировки', adds: ['team'] },
      ]),
      q('schedule', 'Нужно ли расписание занятий?', 'single', [
        { id: 'week', labelKey: 'nq.fitness.schedule.week', label: 'Да, сетка на неделю', adds: ['catalog'] },
        { id: 'list', labelKey: 'nq.fitness.schedule.list', label: 'Да, простым списком', adds: ['catalog'] },
        { id: 'no', labelKey: 'nq.fitness.schedule.no', label: 'Нет' },
      ]),
      q('membership', 'Как продаёте доступ?', 'single', [
        { id: 'subscription', labelKey: 'nq.fitness.membership.subscription', label: 'Абонементы на месяц и год', adds: ['pricing'] },
        { id: 'single', labelKey: 'nq.fitness.membership.single', label: 'Разовые занятия', adds: ['pricing'] },
        { id: 'trial', labelKey: 'nq.fitness.membership.trial', label: 'Через пробное занятие', adds: ['contactForm'] },
      ]),
      q('level', 'На кого рассчитаны занятия?', 'multi', [
        { id: 'beginners', labelKey: 'nq.fitness.level.beginners', label: 'Новички' },
        { id: 'advanced', labelKey: 'nq.fitness.level.advanced', label: 'Продолжающие' },
        { id: 'kids', labelKey: 'nq.fitness.level.kids', label: 'Дети' },
        { id: 'seniors', labelKey: 'nq.fitness.level.seniors', label: 'Старший возраст' },
      ]),
    ],
  },

  /* ------------------------------- цифровое ------------------------------ */
  {
    id: 'it',
    labelKey: 'niche.it',
    noteKey: 'niche.it.note',
    label: 'IT-компания, разработка',
    group: 'Технологии и бизнес',
    groupKey: 'niche.group.tech',
    note: 'Услуги, стек, кейсы',
    domain: 'tech',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', labelKey: 'sec.it.showcase', label: 'Кейсы и проекты' },
      { id: 'logos', labelKey: 'sec.it.logos', label: 'Логотипы клиентов' },
      { id: 'steps', labelKey: 'sec.it.steps', label: 'Процесс работы' },
      { id: 'team', labelKey: 'sec.it.team', label: 'Команда' },
    ],
    questions: [
      q('services', 'Какие услуги предоставляет компания?', 'multi', [
        { id: 'web', labelKey: 'nq.it.services.web', label: 'Веб-разработка' },
        { id: 'mobile', labelKey: 'nq.it.services.mobile', label: 'Мобильные приложения' },
        { id: 'custom', labelKey: 'nq.it.services.custom', label: 'Заказная разработка под ключ' },
        { id: 'integration', labelKey: 'nq.it.services.integration', label: 'Интеграции и автоматизация' },
        { id: 'outstaff', labelKey: 'nq.it.services.outstaff', label: 'Аутстаффинг команд', adds: ['team'] },
        { id: 'support', labelKey: 'nq.it.services.support', label: 'Поддержка и развитие продукта' },
      ]),
      q('clients', 'Какой тип клиентов?', 'single', [
        { id: 'enterprise', labelKey: 'nq.it.clients.enterprise', label: 'Крупный бизнес', adds: ['logos', 'showcase'] },
        { id: 'smb', labelKey: 'nq.it.clients.smb', label: 'Малый и средний бизнес' },
        { id: 'startups', labelKey: 'nq.it.clients.startups', label: 'Стартапы' },
        { id: 'gov', labelKey: 'nq.it.clients.gov', label: 'Госсектор' },
      ]),
      q('stack', 'Какие технологии и направления показать?', 'text', undefined, {
        placeholder: 'Например: React, Node.js, Kubernetes, ML-пайплайны',
        optional: true,
      }),
      q('cases', 'Показывать кейсы?', 'single', [
        { id: 'detailed', labelKey: 'nq.it.cases.detailed', label: 'Да, с цифрами и результатом', adds: ['showcase', 'stats'] },
        { id: 'brief', labelKey: 'nq.it.cases.brief', label: 'Да, коротким списком', adds: ['showcase'] },
        { id: 'nda', labelKey: 'nq.it.cases.nda', label: 'Нет, всё под NDA' },
      ]),
      q('action', 'Какое основное действие должен совершить пользователь?', 'single', [
        { id: 'brief', labelKey: 'nq.it.action.brief', label: 'Оставить заявку на проект', adds: ['contactForm'] },
        { id: 'call', labelKey: 'nq.it.action.call', label: 'Записаться на созвон', adds: ['contactForm'] },
        { id: 'estimate', labelKey: 'nq.it.action.estimate', label: 'Запросить оценку', adds: ['contactForm', 'pricing'] },
        { id: 'vacancy', labelKey: 'nq.it.action.vacancy', label: 'Откликнуться на вакансию', adds: ['team'] },
      ]),
    ],
  },
  {
    id: 'saas',
    labelKey: 'niche.saas',
    noteKey: 'niche.saas.note',
    label: 'SaaS, онлайн-сервис',
    group: 'Технологии и бизнес',
    groupKey: 'niche.group.tech',
    note: 'Продукт с подпиской и тарифами',
    domain: 'tech',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', labelKey: 'sec.saas.pricing', label: 'Тарифы' },
      { id: 'showcase', labelKey: 'sec.saas.showcase', label: 'Интерфейс продукта' },
      { id: 'logos', labelKey: 'sec.saas.logos', label: 'Клиенты и интеграции' },
      { id: 'steps', labelKey: 'sec.saas.steps', label: 'Как начать' },
    ],
    questions: [
      q('problem', 'Какую задачу решает продукт?', 'text', undefined, {
        placeholder: 'Например: собирает заявки из пяти каналов в одну воронку',
      }),
      q('model', 'Как продаётся продукт?', 'single', [
        { id: 'trial', labelKey: 'nq.saas.model.trial', label: 'Бесплатный период, потом подписка', adds: ['pricing', 'steps'] },
        { id: 'freemium', labelKey: 'nq.saas.model.freemium', label: 'Freemium с платными функциями', adds: ['pricing'] },
        { id: 'demo', labelKey: 'nq.saas.model.demo', label: 'Через демо и переговоры', adds: ['contactForm'] },
        { id: 'license', labelKey: 'nq.saas.model.license', label: 'Разовая лицензия', adds: ['pricing'] },
      ]),
      q('audienceType', 'Кто пользователь?', 'single', [
        { id: 'teams', labelKey: 'nq.saas.audienceType.teams', label: 'Команды внутри компаний' },
        { id: 'solo', labelKey: 'nq.saas.audienceType.solo', label: 'Отдельные специалисты' },
        { id: 'enterprise', labelKey: 'nq.saas.audienceType.enterprise', label: 'Крупные организации', adds: ['logos'] },
      ]),
      q('proof', 'Чем доказываете, что продукт работает?', 'multi', [
        { id: 'metrics', labelKey: 'nq.saas.proof.metrics', label: 'Метрики и цифры', adds: ['stats'] },
        { id: 'screens', labelKey: 'nq.saas.proof.screens', label: 'Скриншоты интерфейса', adds: ['showcase'] },
        { id: 'clients', labelKey: 'nq.saas.proof.clients', label: 'Логотипы клиентов', adds: ['logos'] },
        { id: 'reviews', labelKey: 'nq.saas.proof.reviews', label: 'Отзывы пользователей', adds: ['testimonials'] },
      ]),
    ],
  },
  {
    id: 'agency',
    labelKey: 'niche.agency',
    noteKey: 'niche.agency.note',
    label: 'Агентство, студия дизайна',
    group: 'Технологии и бизнес',
    groupKey: 'niche.group.tech',
    note: 'Работы, процесс, команда',
    domain: 'creative',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', labelKey: 'sec.agency.showcase', label: 'Портфолио' },
      { id: 'steps', labelKey: 'sec.agency.steps', label: 'Процесс работы' },
      { id: 'team', labelKey: 'sec.agency.team', label: 'Команда' },
      { id: 'pricing', labelKey: 'sec.agency.pricing', label: 'Форматы и стоимость' },
    ],
    questions: [
      q('services', 'Чем занимается студия?', 'multi', [
        { id: 'branding', labelKey: 'nq.agency.services.branding', label: 'Брендинг и айдентика' },
        { id: 'web', labelKey: 'nq.agency.services.web', label: 'Сайты и digital' },
        { id: 'product', labelKey: 'nq.agency.services.product', label: 'Продуктовый дизайн' },
        { id: 'packaging', labelKey: 'nq.agency.services.packaging', label: 'Упаковка' },
        { id: 'motion', labelKey: 'nq.agency.services.motion', label: 'Motion и видео' },
        { id: 'ads', labelKey: 'nq.agency.services.ads', label: 'Реклама и кампании' },
      ]),
      q('portfolio', 'Как показать работы?', 'single', [
        { id: 'big', labelKey: 'nq.agency.portfolio.big', label: 'Крупными кейсами с историей', adds: ['showcase'] },
        { id: 'grid', labelKey: 'nq.agency.portfolio.grid', label: 'Плотной сеткой превью', adds: ['showcase', 'gallery'] },
        { id: 'selected', labelKey: 'nq.agency.portfolio.selected', label: 'Только 3–5 избранных', adds: ['showcase'] },
      ]),
      q('positioning', 'Как себя позиционируете?', 'single', [
        { id: 'boutique', labelKey: 'nq.agency.positioning.boutique', label: 'Небольшая бутиковая студия' },
        { id: 'fullcycle', labelKey: 'nq.agency.positioning.fullcycle', label: 'Агентство полного цикла', adds: ['team', 'steps'] },
        { id: 'solo', labelKey: 'nq.agency.positioning.solo', label: 'Один сильный специалист' },
      ]),
    ],
  },

  /* ------------------------------- торговля ------------------------------ */
  {
    id: 'shop',
    labelKey: 'niche.shop',
    noteKey: 'niche.shop.note',
    label: 'Интернет-магазин, бренд',
    group: 'Торговля и услуги',
    groupKey: 'niche.group.trade',
    note: 'Каталог, корзина, доставка',
    domain: 'shop',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', labelKey: 'sec.shop.catalog', label: 'Каталог товаров' },
      { id: 'categories', labelKey: 'sec.shop.categories', label: 'Категории' },
      { id: 'productDetail', labelKey: 'sec.shop.productDetail', label: 'Карточка товара' },
      { id: 'gallery', labelKey: 'sec.shop.gallery', label: 'Лукбук и галерея' },
    ],
    questions: [
      q('goods', 'Что продаёте?', 'text', undefined, {
        placeholder: 'Например: свет и предметы интерьера собственного производства',
      }),
      q('assortmentSize', 'Насколько большой ассортимент?', 'single', [
        { id: 'small', labelKey: 'nq.shop.assortmentSize.small', label: 'До 20 позиций', adds: ['catalog'] },
        { id: 'medium', labelKey: 'nq.shop.assortmentSize.medium', label: '20–200 позиций', adds: ['catalog', 'categories'] },
        { id: 'large', labelKey: 'nq.shop.assortmentSize.large', label: 'Больше 200', adds: ['catalog', 'categories'] },
      ]),
      q('checkout', 'Как оформляется покупка?', 'single', [
        { id: 'cart', labelKey: 'nq.shop.checkout.cart', label: 'Корзина и оплата онлайн', adds: ['catalog', 'productDetail'] },
        { id: 'oneClick', labelKey: 'nq.shop.checkout.oneClick', label: 'Покупка в один клик', adds: ['contactForm'] },
        { id: 'request', labelKey: 'nq.shop.checkout.request', label: 'Заявка, менеджер свяжется', adds: ['contactForm'] },
      ]),
      q('advantage', 'Чем выделяетесь среди конкурентов?', 'multi', [
        { id: 'own', labelKey: 'nq.shop.advantage.own', label: 'Собственное производство' },
        { id: 'price', labelKey: 'nq.shop.advantage.price', label: 'Цена' },
        { id: 'delivery', labelKey: 'nq.shop.advantage.delivery', label: 'Быстрая доставка' },
        { id: 'quality', labelKey: 'nq.shop.advantage.quality', label: 'Материалы и качество' },
        { id: 'design', labelKey: 'nq.shop.advantage.design', label: 'Дизайн и эксклюзивность' },
      ]),
    ],
  },
  {
    id: 'realestate',
    labelKey: 'niche.realestate',
    noteKey: 'niche.realestate.note',
    label: 'Недвижимость, ремонт, интерьер',
    group: 'Торговля и услуги',
    groupKey: 'niche.group.trade',
    note: 'Объекты, сметы, портфолио',
    domain: 'home',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', labelKey: 'sec.realestate.showcase', label: 'Объекты и проекты' },
      { id: 'catalog', labelKey: 'sec.realestate.catalog', label: 'Каталог с фильтрами' },
      { id: 'steps', labelKey: 'sec.realestate.steps', label: 'Этапы работы' },
      { id: 'pricing', labelKey: 'sec.realestate.pricing', label: 'Стоимость за м²' },
    ],
    questions: [
      q('activity', 'Чем занимаетесь?', 'single', [
        { id: 'sale', labelKey: 'nq.realestate.activity.sale', label: 'Продажа и аренда недвижимости', adds: ['catalog'] },
        { id: 'renovation', labelKey: 'nq.realestate.activity.renovation', label: 'Ремонт под ключ', adds: ['showcase', 'steps'] },
        { id: 'interior', labelKey: 'nq.realestate.activity.interior', label: 'Дизайн интерьера', adds: ['showcase'] },
        { id: 'construction', labelKey: 'nq.realestate.activity.construction', label: 'Строительство домов', adds: ['showcase', 'steps'] },
      ]),
      q('objects', 'Как показывать объекты?', 'single', [
        { id: 'filters', labelKey: 'nq.realestate.objects.filters', label: 'Каталог с фильтрами по параметрам', adds: ['catalog', 'categories'] },
        { id: 'cases', labelKey: 'nq.realestate.objects.cases', label: 'Портфолио проектов с фото', adds: ['showcase', 'gallery'] },
        { id: 'few', labelKey: 'nq.realestate.objects.few', label: 'Несколько ключевых объектов', adds: ['showcase'] },
      ]),
      q('calculator', 'Нужен ли расчёт стоимости?', 'single', [
        { id: 'yes', labelKey: 'nq.realestate.calculator.yes', label: 'Да, калькулятор на сайте', adds: ['pricing', 'contactForm'] },
        { id: 'estimate', labelKey: 'nq.realestate.calculator.estimate', label: 'Да, заявка на смету', adds: ['contactForm'] },
        { id: 'no', labelKey: 'nq.realestate.calculator.no', label: 'Нет' },
      ]),
    ],
  },
  {
    id: 'services',
    labelKey: 'niche.services',
    noteKey: 'niche.services.note',
    label: 'Услуги: клининг, авто, логистика',
    group: 'Торговля и услуги',
    groupKey: 'niche.group.trade',
    note: 'Понятная цена и быстрая заявка',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'pricing', labelKey: 'sec.services.pricing', label: 'Прайс' },
      { id: 'steps', labelKey: 'sec.services.steps', label: 'Как мы работаем' },
      { id: 'showcase', labelKey: 'sec.services.showcase', label: 'Примеры работ' },
      { id: 'map', labelKey: 'sec.services.map', label: 'Зона обслуживания' },
    ],
    questions: [
      q('service', 'Какую услугу оказываете?', 'text', undefined, {
        placeholder: 'Например: генеральная уборка квартир и офисов после ремонта',
      }),
      q('pricing', 'Как формируется цена?', 'single', [
        { id: 'fixed', labelKey: 'nq.services.pricing.fixed', label: 'Фиксированный прайс', adds: ['pricing'] },
        { id: 'calculator', labelKey: 'nq.services.pricing.calculator', label: 'Считается от объёма', adds: ['pricing', 'contactForm'] },
        { id: 'estimate', labelKey: 'nq.services.pricing.estimate', label: 'Только после выезда', adds: ['contactForm'] },
      ]),
      q('urgency', 'Насколько срочная это услуга?', 'single', [
        { id: 'emergency', labelKey: 'nq.services.urgency.emergency', label: 'Часто нужна срочно', adds: ['contactForm'] },
        { id: 'planned', labelKey: 'nq.services.urgency.planned', label: 'Обычно планируют заранее' },
        { id: 'regular', labelKey: 'nq.services.urgency.regular', label: 'Регулярная, по подписке', adds: ['pricing'] },
      ]),
      q('proof', 'Чем убеждаете, что вам можно доверять?', 'multi', [
        { id: 'before', labelKey: 'nq.services.proof.before', label: 'Фото «до и после»', adds: ['showcase', 'gallery'] },
        { id: 'guarantee', labelKey: 'nq.services.proof.guarantee', label: 'Гарантия на работы' },
        { id: 'staff', labelKey: 'nq.services.proof.staff', label: 'Свои сотрудники в штате', adds: ['team'] },
        { id: 'reviews', labelKey: 'nq.services.proof.reviews', label: 'Отзывы клиентов', adds: ['testimonials'] },
      ]),
    ],
  },
  {
    id: 'professional',
    labelKey: 'niche.professional',
    noteKey: 'niche.professional.note',
    label: 'Юристы, консалтинг, финансы',
    group: 'Торговля и услуги',
    groupKey: 'niche.group.trade',
    note: 'Экспертиза, практики, кейсы',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', labelKey: 'sec.professional.showcase', label: 'Кейсы и дела' },
      { id: 'team', labelKey: 'sec.professional.team', label: 'Партнёры и специалисты' },
      { id: 'pricing', labelKey: 'sec.professional.pricing', label: 'Стоимость услуг' },
      { id: 'steps', labelKey: 'sec.professional.steps', label: 'Порядок работы' },
    ],
    questions: [
      q('practice', 'Какие направления ведёте?', 'multi', [
        { id: 'corporate', labelKey: 'nq.professional.practice.corporate', label: 'Корпоративное право' },
        { id: 'court', labelKey: 'nq.professional.practice.court', label: 'Судебные споры', adds: ['showcase'] },
        { id: 'tax', labelKey: 'nq.professional.practice.tax', label: 'Налоги и бухгалтерия' },
        { id: 'realestate', labelKey: 'nq.professional.practice.realestate', label: 'Сделки с недвижимостью' },
        { id: 'consulting', labelKey: 'nq.professional.practice.consulting', label: 'Управленческий консалтинг' },
        { id: 'finance', labelKey: 'nq.professional.practice.finance', label: 'Финансы и инвестиции' },
      ]),
      q('clientType', 'С кем работаете?', 'single', [
        { id: 'business', labelKey: 'nq.professional.clientType.business', label: 'С компаниями', adds: ['logos'] },
        { id: 'private', labelKey: 'nq.professional.clientType.private', label: 'С частными лицами' },
        { id: 'both', labelKey: 'nq.professional.clientType.both', label: 'И с теми, и с другими' },
      ]),
      q('proof', 'Как доказываете экспертизу?', 'multi', [
        { id: 'cases', labelKey: 'nq.professional.proof.cases', label: 'Выигранные дела с суммами', adds: ['showcase', 'stats'] },
        { id: 'experience', labelKey: 'nq.professional.proof.experience', label: 'Годы практики', adds: ['stats'] },
        { id: 'publications', labelKey: 'nq.professional.proof.publications', label: 'Публикации и рейтинги' },
        { id: 'team', labelKey: 'nq.professional.proof.team', label: 'Регалии партнёров', adds: ['team'] },
      ]),
    ],
  },

  /* ----------------------------- образование ----------------------------- */
  {
    id: 'education',
    labelKey: 'niche.education',
    noteKey: 'niche.education.note',
    label: 'Курсы, школа, обучение',
    group: 'Образование и люди',
    groupKey: 'niche.group.people',
    note: 'Программы, преподаватели, результат',
    domain: 'education',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', labelKey: 'sec.education.catalog', label: 'Каталог курсов' },
      { id: 'team', labelKey: 'sec.education.team', label: 'Преподаватели' },
      { id: 'steps', labelKey: 'sec.education.steps', label: 'Программа обучения' },
      { id: 'pricing', labelKey: 'sec.education.pricing', label: 'Стоимость' },
    ],
    questions: [
      q('format', 'В каком формате учите?', 'single', [
        { id: 'online', labelKey: 'nq.education.format.online', label: 'Онлайн' },
        { id: 'offline', labelKey: 'nq.education.format.offline', label: 'Очно' },
        { id: 'mixed', labelKey: 'nq.education.format.mixed', label: 'Смешанный формат' },
      ]),
      q('subjects', 'Чему учите?', 'text', undefined, {
        placeholder: 'Например: интерфейсный дизайн, вёрстка, аналитика для начинающих',
      }),
      q('outcome', 'Какой результат получает ученик?', 'single', [
        { id: 'job', labelKey: 'nq.education.outcome.job', label: 'Работу или стажировку', adds: ['stats', 'testimonials'] },
        { id: 'portfolio', labelKey: 'nq.education.outcome.portfolio', label: 'Проекты в портфолио', adds: ['showcase'] },
        { id: 'certificate', labelKey: 'nq.education.outcome.certificate', label: 'Диплом или сертификат' },
        { id: 'skill', labelKey: 'nq.education.outcome.skill', label: 'Навык для себя' },
      ]),
      q('enroll', 'Как записываются на курс?', 'single', [
        { id: 'trial', labelKey: 'nq.education.enroll.trial', label: 'Через бесплатное занятие', adds: ['contactForm'] },
        { id: 'direct', labelKey: 'nq.education.enroll.direct', label: 'Сразу оплата на сайте', adds: ['pricing', 'catalog'] },
        { id: 'consult', labelKey: 'nq.education.enroll.consult', label: 'После консультации', adds: ['contactForm'] },
      ]),
    ],
  },
  {
    id: 'kids',
    labelKey: 'niche.kids',
    noteKey: 'niche.kids.note',
    label: 'Детский центр, садик',
    group: 'Образование и люди',
    groupKey: 'niche.group.people',
    note: 'Решение принимают родители',
    domain: 'education',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'catalog', labelKey: 'sec.kids.catalog', label: 'Группы и занятия' },
      { id: 'team', labelKey: 'sec.kids.team', label: 'Педагоги' },
      { id: 'gallery', labelKey: 'sec.kids.gallery', label: 'Фото помещений' },
      { id: 'pricing', labelKey: 'sec.kids.pricing', label: 'Стоимость' },
    ],
    questions: [
      q('age', 'С каким возрастом работаете?', 'multi', [
        { id: 'nursery', labelKey: 'nq.kids.age.nursery', label: 'Ясли, 1–3 года' },
        { id: 'preschool', labelKey: 'nq.kids.age.preschool', label: 'Дошкольники, 3–7 лет' },
        { id: 'school', labelKey: 'nq.kids.age.school', label: 'Школьники' },
      ]),
      q('parentConcern', 'Что важнее всего родителям?', 'multi', [
        { id: 'safety', labelKey: 'nq.kids.parentConcern.safety', label: 'Безопасность', adds: ['gallery'] },
        { id: 'teachers', labelKey: 'nq.kids.parentConcern.teachers', label: 'Квалификация педагогов', adds: ['team'] },
        { id: 'schedule', labelKey: 'nq.kids.parentConcern.schedule', label: 'Режим дня', adds: ['steps'] },
        { id: 'food', labelKey: 'nq.kids.parentConcern.food', label: 'Питание' },
        { id: 'development', labelKey: 'nq.kids.parentConcern.development', label: 'Программа развития', adds: ['catalog'] },
      ]),
      q('tour', 'Нужна ли запись на экскурсию?', 'single', [
        { id: 'yes', labelKey: 'nq.kids.tour.yes', label: 'Да, это главное действие', adds: ['contactForm'] },
        { id: 'no', labelKey: 'nq.kids.tour.no', label: 'Нет, достаточно заявки' },
      ]),
    ],
  },
  {
    id: 'photo',
    labelKey: 'niche.photo',
    noteKey: 'niche.photo.note',
    label: 'Фотограф, видеограф',
    group: 'Образование и люди',
    groupKey: 'niche.group.people',
    note: 'Портфолио, съёмки, бронирование дат',
    domain: 'creative',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'gallery', labelKey: 'sec.photo.gallery', label: 'Портфолио-галерея' },
      { id: 'showcase', labelKey: 'sec.photo.showcase', label: 'Избранные съёмки' },
      { id: 'pricing', labelKey: 'sec.photo.pricing', label: 'Пакеты съёмок' },
      { id: 'steps', labelKey: 'sec.photo.steps', label: 'Как проходит съёмка' },
    ],
    questions: [
      q('specialization', 'Какая у вас специализация?', 'multi', [
        { id: 'portrait', labelKey: 'nq.photo.specialization.portrait', label: 'Портрет', adds: ['gallery'] },
        { id: 'wedding', labelKey: 'nq.photo.specialization.wedding', label: 'Свадьбы', adds: ['gallery', 'pricing'] },
        { id: 'family', labelKey: 'nq.photo.specialization.family', label: 'Семейная и детская' },
        { id: 'commercial', labelKey: 'nq.photo.specialization.commercial', label: 'Коммерческая, предметная', adds: ['showcase'] },
        { id: 'reportage', labelKey: 'nq.photo.specialization.reportage', label: 'Репортаж и события' },
        { id: 'video', labelKey: 'nq.photo.specialization.video', label: 'Видеосъёмка' },
      ]),
      q('portfolio', 'Как показывать портфолио?', 'single', [
        { id: 'wall', labelKey: 'nq.photo.portfolio.wall', label: 'Стеной кадров во весь экран', adds: ['gallery'] },
        { id: 'series', labelKey: 'nq.photo.portfolio.series', label: 'Отдельными съёмками-историями', adds: ['showcase'] },
        { id: 'selected', labelKey: 'nq.photo.portfolio.selected', label: 'Только 10–15 лучших кадров', adds: ['gallery'] },
      ]),
      q('packages', 'Как устроены услуги и цены?', 'single', [
        { id: 'packages', labelKey: 'nq.photo.packages.packages', label: 'Готовые пакеты съёмок', adds: ['pricing'] },
        { id: 'hourly', labelKey: 'nq.photo.packages.hourly', label: 'Почасовая оплата', adds: ['pricing'] },
        { id: 'request', labelKey: 'nq.photo.packages.request', label: 'Цена по запросу', adds: ['contactForm'] },
      ]),
      q('booking', 'Нужно ли бронирование даты?', 'single', [
        { id: 'calendar', labelKey: 'nq.photo.booking.calendar', label: 'Да, с занятыми датами', adds: ['contactForm'] },
        { id: 'form', labelKey: 'nq.photo.booking.form', label: 'Да, простая заявка', adds: ['contactForm'] },
        { id: 'no', labelKey: 'nq.photo.booking.no', label: 'Нет, только контакты' },
      ]),
      q('social', 'Какие соцсети показывать?', 'text', undefined, {
        placeholder: 'Например: Instagram, Telegram-канал, VK — ссылки попадут в шапку и подвал',
        optional: true,
      }),
    ],
  },
  {
    id: 'personal',
    labelKey: 'niche.personal',
    noteKey: 'niche.personal.note',
    label: 'Личный бренд, эксперт, портфолио',
    group: 'Образование и люди',
    groupKey: 'niche.group.people',
    note: 'Один человек и его работа',
    domain: 'creative',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', labelKey: 'sec.personal.showcase', label: 'Работы или проекты' },
      { id: 'steps', labelKey: 'sec.personal.steps', label: 'Как проходит работа' },
      { id: 'pricing', labelKey: 'sec.personal.pricing', label: 'Форматы и цены' },
      { id: 'gallery', labelKey: 'sec.personal.gallery', label: 'Галерея' },
    ],
    questions: [
      q('field', 'Чем вы занимаетесь?', 'text', undefined, {
        placeholder: 'Например: фотограф, снимаю репортажи и портреты',
      }),
      q('offer', 'Что предлагаете аудитории?', 'multi', [
        { id: 'services', labelKey: 'nq.personal.offer.services', label: 'Личные услуги', adds: ['pricing'] },
        { id: 'consult', labelKey: 'nq.personal.offer.consult', label: 'Консультации', adds: ['contactForm'] },
        { id: 'courses', labelKey: 'nq.personal.offer.courses', label: 'Обучение', adds: ['catalog'] },
        { id: 'speaking', labelKey: 'nq.personal.offer.speaking', label: 'Выступления' },
      ]),
      q('tone', 'Каким должно быть впечатление о вас?', 'single', [
        { id: 'expert', labelKey: 'nq.personal.tone.expert', label: 'Строгий эксперт' },
        { id: 'warm', labelKey: 'nq.personal.tone.warm', label: 'Тёплый и близкий' },
        { id: 'artist', labelKey: 'nq.personal.tone.artist', label: 'Художник, автор' },
        { id: 'premium', labelKey: 'nq.personal.tone.premium', label: 'Дорогой специалист' },
      ]),
    ],
  },
  {
    id: 'events',
    labelKey: 'niche.events',
    noteKey: 'niche.events.note',
    label: 'События, туризм, отели',
    group: 'Образование и люди',
    groupKey: 'niche.group.people',
    note: 'Впечатление и бронирование',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'gallery', labelKey: 'sec.events.gallery', label: 'Галерея' },
      { id: 'catalog', labelKey: 'sec.events.catalog', label: 'Программы и туры' },
      { id: 'steps', labelKey: 'sec.events.steps', label: 'Программа по дням' },
      { id: 'pricing', labelKey: 'sec.events.pricing', label: 'Пакеты и цены' },
    ],
    questions: [
      q('kind', 'Что организуете?', 'single', [
        { id: 'wedding', labelKey: 'nq.events.kind.wedding', label: 'Свадьбы и торжества', adds: ['gallery', 'steps'] },
        { id: 'corporate', labelKey: 'nq.events.kind.corporate', label: 'Корпоративные события' },
        { id: 'tours', labelKey: 'nq.events.kind.tours', label: 'Туры и экскурсии', adds: ['catalog'] },
        { id: 'hotel', labelKey: 'nq.events.kind.hotel', label: 'Отель или база отдыха', adds: ['catalog', 'gallery'] },
      ]),
      q('booking', 'Как бронируют?', 'single', [
        { id: 'online', labelKey: 'nq.events.booking.online', label: 'Онлайн, с датами', adds: ['contactForm', 'catalog'] },
        { id: 'request', labelKey: 'nq.events.booking.request', label: 'Заявка и обсуждение', adds: ['contactForm'] },
      ]),
      q('emotion', 'Какое впечатление важно передать?', 'multi', [
        { id: 'luxury', labelKey: 'nq.events.emotion.luxury', label: 'Роскошь' },
        { id: 'nature', labelKey: 'nq.events.emotion.nature', label: 'Природа и покой' },
        { id: 'adventure', labelKey: 'nq.events.emotion.adventure', label: 'Приключение' },
        { id: 'family', labelKey: 'nq.events.emotion.family', label: 'Семейное тепло' },
      ]),
    ],
  },
  {
    id: 'other',
    labelKey: 'niche.other',
    noteKey: 'niche.other.note',
    label: 'Другая сфера',
    group: 'Образование и люди',
    groupKey: 'niche.group.people',
    note: 'Опишу словами',
    domain: 'generic',
    sections: [
      ...WEB_SECTIONS_BASE,
      { id: 'showcase', labelKey: 'sec.other.showcase', label: 'Работы или проекты' },
      { id: 'catalog', labelKey: 'sec.other.catalog', label: 'Каталог' },
      { id: 'pricing', labelKey: 'sec.other.pricing', label: 'Цены' },
      { id: 'team', labelKey: 'sec.other.team', label: 'Команда' },
      { id: 'steps', labelKey: 'sec.other.steps', label: 'Процесс' },
      { id: 'gallery', labelKey: 'sec.other.gallery', label: 'Галерея' },
    ],
    questions: [
      q('specifics', 'Что важно знать именно про вашу сферу?', 'text', undefined, {
        placeholder: 'Особенности, сезонность, кто принимает решение о покупке…',
      }),
      q('mainAction', 'Что главное должен сделать посетитель?', 'single', [
        { id: 'request', labelKey: 'nq.other.mainAction.request', label: 'Оставить заявку', adds: ['contactForm'] },
        { id: 'buy', labelKey: 'nq.other.mainAction.buy', label: 'Купить', adds: ['catalog'] },
        { id: 'call', labelKey: 'nq.other.mainAction.call', label: 'Позвонить' },
        { id: 'read', labelKey: 'nq.other.mainAction.read', label: 'Изучить информацию' },
      ]),
    ],
  },
];

stampNicheKeys(NICHES);

export const getNiche = (id: string): Niche =>
  NICHES.find((niche) => niche.id === id) ?? NICHES[NICHES.length - 1];

export const NICHE_GROUPS = [
  'Еда и напитки',
  'Красота и здоровье',
  'Технологии и бизнес',
  'Торговля и услуги',
  'Образование и люди',
];
