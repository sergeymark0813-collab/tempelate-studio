import type { Question } from '../types';

/* ===========================================================================
   Sphere analysis for the logo generator.

   The user may type any niche at all, so this does not work from a closed list
   of businesses. It maps free text onto *semantic fields* — what a mark for
   that kind of business is actually made of — and each field carries its own
   motif vocabulary and its own follow-up question. Anything unrecognised still
   lands on a usable field rather than failing.
   =========================================================================== */

export interface SemanticField {
  id: string;
  label: string;
  keywords: string[];
  /** Motif ids this field can draw from — see `MOTIFS` in LogoMark.tsx. */
  motifs: string[];
  /** Words used when explaining the concept back to the user. */
  associations: string[];
  /** The one extra question worth asking for this kind of business. */
  followUp: Question;
}

const followUp = (title: string, hint: string, options: { id: string; label: string; note?: string }[]): Question => ({
  id: 'motifDirection',
  title,
  hint,
  kind: 'single',
  options,
});

export const SEMANTIC_FIELDS: SemanticField[] = [
  {
    id: 'food',
    label: 'еда и общественное питание',
    keywords: ['ресторан', 'кафе', 'кухн', 'еда', 'бар', 'пиццер', 'суши', 'бургер', 'пекарн', 'кондитер', 'столов', 'гастро', 'шеф', 'обед', 'доставка еды', 'банкет', 'винн', 'пивовар'],
    motifs: ['flame', 'grain', 'plate', 'leafPair', 'knifeFork', 'steam'],
    associations: ['огонь', 'сезонность', 'ремесло', 'стол', 'гостеприимство'],
    followUp: followUp(
      'Что должно считываться в знаке заведения?',
      'Это определит саму форму символа, а не только его цвет.',
      [
        { id: 'flame', label: 'Огонь, гриль, печь', note: 'Динамичная изогнутая форма' },
        { id: 'grain', label: 'Продукт, зерно, натуральность', note: 'Растительная вертикаль' },
        { id: 'plate', label: 'Подача, сервировка', note: 'Концентрические окружности' },
        { id: 'knifeFork', label: 'Ремесло, работа руками', note: 'Скрещённые оси' },
        { id: 'steam', label: 'Тепло, аромат', note: 'Волновые линии' },
      ],
    ),
  },
  {
    id: 'coffee',
    label: 'кофе и напитки',
    keywords: ['кофе', 'кофейн', 'бариста', 'чай', 'какао', 'эспрессо', 'обжарк', 'смузи', 'лимонад'],
    motifs: ['cup', 'steam', 'bean', 'circleStack', 'droplet'],
    associations: ['зерно', 'пар', 'ритуал', 'утро', 'тепло'],
    followUp: followUp(
      'Какой образ ближе для кофейного знака?',
      'Форма символа будет построена вокруг выбранного образа.',
      [
        { id: 'bean', label: 'Зерно', note: 'Овал с внутренним разрезом' },
        { id: 'cup', label: 'Чашка сверху', note: 'Вложенные окружности' },
        { id: 'steam', label: 'Пар', note: 'Мягкие волны' },
        { id: 'circleStack', label: 'Слои напитка', note: 'Горизонтальные сегменты' },
      ],
    ),
  },
  {
    id: 'sport',
    label: 'спорт и движение',
    keywords: ['фитнес', 'спорт', 'зал', 'тренировк', 'кроссфит', 'бег', 'вело', 'бокс', 'единоборств', 'йога', 'танц', 'атлет', 'gym', 'качалк', 'плаван'],
    motifs: ['chevron', 'bolt', 'peak', 'slash', 'burst'],
    associations: ['скорость', 'усилие', 'подъём', 'энергия', 'дисциплина'],
    followUp: followUp(
      'Какое движение должен передавать знак?',
      'Спортивный знак живёт за счёт направления и наклона.',
      [
        { id: 'chevron', label: 'Ускорение вперёд', note: 'Стрелочные шевроны' },
        { id: 'bolt', label: 'Взрывная сила', note: 'Угловая молния' },
        { id: 'peak', label: 'Рост, вершина', note: 'Восходящая ломаная' },
        { id: 'burst', label: 'Энергия во все стороны', note: 'Радиальная вспышка' },
        { id: 'slash', label: 'Резкость, удар', note: 'Диагональные срезы' },
      ],
    ),
  },
  {
    id: 'tech',
    label: 'технологии и цифровые продукты',
    keywords: ['айти', 'софт', 'программ', 'разработк', 'стартап', 'saas', 'платформ', 'приложени', 'digital', 'данн', 'облач', 'кибер', 'нейросет', 'автоматизац', 'интеграц', 'блокчейн', 'телеком'],
    motifs: ['node', 'orbit', 'module', 'aperture', 'pixel'],
    associations: ['связность', 'система', 'скорость', 'точность', 'масштаб'],
    followUp: followUp(
      'Какая идея точнее описывает продукт?',
      'Технологический знак строится на структуре, а не на иллюстрации.',
      [
        { id: 'node', label: 'Связи, сеть, интеграции', note: 'Узлы и рёбра' },
        { id: 'orbit', label: 'Платформа, экосистема', note: 'Орбиты вокруг ядра' },
        { id: 'module', label: 'Модульность, конструктор', note: 'Собранные блоки' },
        { id: 'aperture', label: 'Обработка данных, поток', note: 'Лопасти диафрагмы' },
        { id: 'pixel', label: 'Цифровая среда', note: 'Матрица квадратов' },
      ],
    ),
  },
  {
    id: 'beauty',
    label: 'красота и уход',
    keywords: ['салон', 'красот', 'парикмахер', 'барбершоп', 'косметолог', 'маникюр', 'бров', 'ресниц', 'спа', 'массаж', 'уход', 'визаж', 'эстетик', 'тату'],
    motifs: ['petal', 'brush', 'interlock', 'droplet', 'arcSweep'],
    associations: ['линия', 'мягкость', 'ритуал', 'преображение', 'ухоженность'],
    followUp: followUp(
      'Какой характер знака вам ближе?',
      'В этой сфере знак читается прежде всего по пластике линии.',
      [
        { id: 'petal', label: 'Растительная пластика', note: 'Лепестковые формы' },
        { id: 'brush', label: 'След инструмента', note: 'Каллиграфический штрих' },
        { id: 'interlock', label: 'Соединение, союз', note: 'Переплетённые дуги' },
        { id: 'arcSweep', label: 'Чистая геометрия', note: 'Сегменты окружности' },
      ],
    ),
  },
  {
    id: 'health',
    label: 'медицина и здоровье',
    keywords: ['клиник', 'медицин', 'врач', 'стоматолог', 'зуб', 'ветеринар', 'аптек', 'здоров', 'диагностик', 'лаборатор', 'реабилитац', 'оптик', 'психолог', 'терап'],
    motifs: ['crossFold', 'shield', 'pulse', 'droplet', 'interlock'],
    associations: ['забота', 'точность', 'защита', 'жизнь', 'доверие'],
    followUp: followUp(
      'Что важнее подчеркнуть в медицинском знаке?',
      'От этого зависит, будет знак строгим или тёплым.',
      [
        { id: 'crossFold', label: 'Помощь и медицина', note: 'Переосмысленный крест' },
        { id: 'shield', label: 'Защита и надёжность', note: 'Щитовая форма' },
        { id: 'pulse', label: 'Жизнь, динамика', note: 'Линия пульса' },
        { id: 'interlock', label: 'Забота, соединение', note: 'Сомкнутые дуги' },
      ],
    ),
  },
  {
    id: 'build',
    label: 'строительство, недвижимость и интерьер',
    keywords: ['строительств', 'ремонт', 'недвижимост', 'квартир', 'дом', 'архитект', 'интерьер', 'дизайн интерьер', 'мебел', 'столярн', 'кровл', 'фасад', 'девелоп', 'проектирован', 'инженер'],
    motifs: ['houseFold', 'monolith', 'module', 'peak', 'grid'],
    associations: ['опора', 'конструкция', 'пространство', 'основательность', 'план'],
    followUp: followUp(
      'Какая идея ближе для знака?',
      'Здесь знак почти всегда строится на конструкции.',
      [
        { id: 'houseFold', label: 'Пространство, кров', note: 'Сложенный контур дома' },
        { id: 'monolith', label: 'Основательность', note: 'Вертикальные объёмы' },
        { id: 'module', label: 'Модуль, сборка', note: 'Собранные блоки' },
        { id: 'grid', label: 'План, чертёж', note: 'Сетка и оси' },
      ],
    ),
  },
  {
    id: 'photo',
    label: 'фотография, видео и творчество',
    keywords: ['фотограф', 'фотостуди', 'видео', 'съёмк', 'съемк', 'продакшн', 'художник', 'иллюстрат', 'галере', 'арт', 'креатив', 'студия дизайна', 'музык', 'звук', 'портфолио'],
    motifs: ['aperture', 'frame', 'brush', 'arcSweep', 'burst'],
    associations: ['кадр', 'свет', 'взгляд', 'композиция', 'авторство'],
    followUp: followUp(
      'Через что выразить творческую практику?',
      'Знак должен намекать на инструмент или на результат.',
      [
        { id: 'aperture', label: 'Оптика, диафрагма', note: 'Лопасти по кругу' },
        { id: 'frame', label: 'Кадр, композиция', note: 'Смещённые рамки' },
        { id: 'brush', label: 'Авторский жест', note: 'Живой штрих' },
        { id: 'burst', label: 'Свет, вспышка', note: 'Радиальные лучи' },
      ],
    ),
  },
  {
    id: 'edu',
    label: 'образование и знания',
    keywords: ['школ', 'курс', 'обучени', 'образован', 'университет', 'академ', 'репетитор', 'детск сад', 'развива', 'тренинг', 'лекци', 'библиотек', 'наук', 'исследован'],
    motifs: ['peak', 'pageFold', 'orbit', 'module', 'burst'],
    associations: ['рост', 'ступень', 'открытие', 'структура', 'путь'],
    followUp: followUp(
      'Какую мысль должен нести знак?',
      'Образовательный знак обычно про движение вперёд.',
      [
        { id: 'peak', label: 'Рост и ступени', note: 'Восходящая ломаная' },
        { id: 'pageFold', label: 'Знание, страница', note: 'Сложенный лист' },
        { id: 'orbit', label: 'Кругозор, среда', note: 'Орбиты вокруг центра' },
        { id: 'module', label: 'Программа из модулей', note: 'Собранные блоки' },
      ],
    ),
  },
  {
    id: 'finance',
    label: 'финансы, право и консалтинг',
    keywords: ['финанс', 'банк', 'инвест', 'юрист', 'адвокат', 'право', 'консалтинг', 'аудит', 'бухгалтер', 'страхов', 'налог', 'нотариус', 'управлен', 'b2b', 'корпоратив'],
    motifs: ['monolith', 'shield', 'grid', 'interlock', 'peak'],
    associations: ['устойчивость', 'порядок', 'защита', 'рост', 'ответственность'],
    followUp: followUp(
      'Что важнее для вашего знака?',
      'Здесь знак работает на доверие, а не на выразительность.',
      [
        { id: 'monolith', label: 'Устойчивость и вес', note: 'Вертикальные объёмы' },
        { id: 'shield', label: 'Защита интересов', note: 'Щитовая форма' },
        { id: 'peak', label: 'Рост показателей', note: 'Восходящая ломаная' },
        { id: 'interlock', label: 'Партнёрство', note: 'Сомкнутые формы' },
      ],
    ),
  },
  {
    id: 'nature',
    label: 'природа, эко и сельское хозяйство',
    keywords: ['эко', 'ферм', 'сад', 'растен', 'цвет', 'озелен', 'природ', 'органик', 'био', 'питомник', 'агро', 'мёд', 'мед', 'урожай', 'зелён', 'зелен', 'переработк'],
    motifs: ['leafPair', 'grain', 'wave', 'petal', 'droplet'],
    associations: ['рост', 'цикл', 'чистота', 'земля', 'сезон'],
    followUp: followUp(
      'Какой природный образ ближе?',
      'Форма знака будет построена вокруг него.',
      [
        { id: 'leafPair', label: 'Лист, побег', note: 'Парные изогнутые формы' },
        { id: 'grain', label: 'Колос, урожай', note: 'Вертикаль с ответвлениями' },
        { id: 'wave', label: 'Вода, течение', note: 'Волновые линии' },
        { id: 'droplet', label: 'Капля, чистота', note: 'Каплевидная форма' },
      ],
    ),
  },
  {
    id: 'retail',
    label: 'торговля и товарные бренды',
    keywords: ['магазин', 'бренд одежд', 'одежд', 'обув', 'ювелир', 'украшени', 'маркетплейс', 'ритейл', 'бутик', 'товар', 'упаковк', 'косметик бренд', 'аксессуар'],
    motifs: ['bagFold', 'interlock', 'arcSweep', 'module', 'frame'],
    associations: ['выбор', 'качество', 'узнаваемость', 'полка', 'подарок'],
    followUp: followUp(
      'Как знак должен работать на упаковке и полке?',
      'Товарный знак должен читаться в мелком размере.',
      [
        { id: 'interlock', label: 'Монограмма-переплетение', note: 'Сцепленные формы' },
        { id: 'bagFold', label: 'Предметный намёк', note: 'Сложенный контур' },
        { id: 'arcSweep', label: 'Чистая геометрия', note: 'Сегменты окружности' },
        { id: 'frame', label: 'Клеймо, штамп', note: 'Обрамление' },
      ],
    ),
  },
  {
    id: 'logistics',
    label: 'логистика, транспорт и производство',
    keywords: ['логистик', 'перевозк', 'доставк', 'склад', 'транспорт', 'авто', 'сервис авт', 'завод', 'производств', 'станк', 'промышлен', 'грузов', 'такси', 'курьер'],
    motifs: ['chevron', 'module', 'grid', 'slash', 'monolith'],
    associations: ['направление', 'поток', 'точность', 'маршрут', 'надёжность'],
    followUp: followUp(
      'Что должно быть в основе знака?',
      'В этой сфере знак обычно про направление и систему.',
      [
        { id: 'chevron', label: 'Движение и маршрут', note: 'Стрелочные шевроны' },
        { id: 'module', label: 'Груз, контейнер', note: 'Блочная сборка' },
        { id: 'grid', label: 'Система и склад', note: 'Сетка ячеек' },
        { id: 'slash', label: 'Скорость', note: 'Диагональные срезы' },
      ],
    ),
  },
  {
    id: 'generic',
    label: 'услуги и бизнес',
    keywords: [],
    motifs: ['interlock', 'arcSweep', 'module', 'orbit', 'peak'],
    associations: ['ясность', 'надёжность', 'движение', 'система'],
    followUp: followUp(
      'На чём должен строиться знак?',
      'Выберите принцип — конкретную форму подберу под него.',
      [
        { id: 'interlock', label: 'Соединение, партнёрство', note: 'Переплетённые формы' },
        { id: 'arcSweep', label: 'Чистая геометрия', note: 'Сегменты окружности' },
        { id: 'module', label: 'Система из частей', note: 'Собранные блоки' },
        { id: 'peak', label: 'Рост и движение вверх', note: 'Восходящая ломаная' },
        { id: 'orbit', label: 'Охват, экосистема', note: 'Орбиты вокруг ядра' },
      ],
    ),
  },
];

const normalize = (text: string) => text.toLowerCase().replace(/ё/g, 'е');

export interface SphereAnalysis {
  field: SemanticField;
  /** Words from the user's own text that placed it in this field. */
  matched: string[];
  /** True when nothing matched and the generic field was used. */
  fallback: boolean;
}

/**
 * Places any free-text sphere onto a semantic field. Scored by keyword length
 * so a specific word ("кофейня") outweighs a broad one that happens to appear
 * in many descriptions.
 */
export function analyzeSphere(text: string): SphereAnalysis {
  const haystack = normalize(text);

  const ranked = SEMANTIC_FIELDS.filter((field) => field.keywords.length > 0)
    .map((field) => {
      const matched = field.keywords.filter((keyword) => haystack.includes(normalize(keyword)));
      return {
        field,
        matched,
        score: matched.reduce((sum, keyword) => sum + keyword.length, 0),
      };
    })
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score === 0) {
    return { field: SEMANTIC_FIELDS[SEMANTIC_FIELDS.length - 1], matched: [], fallback: true };
  }
  return { field: best.field, matched: best.matched, fallback: false };
}

export const getField = (id: string): SemanticField =>
  SEMANTIC_FIELDS.find((field) => field.id === id) ?? SEMANTIC_FIELDS[SEMANTIC_FIELDS.length - 1];
