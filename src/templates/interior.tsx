import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const PROJECTS = [
  ['Квартира в Хамовниках', '128 м²', '2025', 'Полный проект + комплектация', 'mesh'],
  ['Загородный дом, Николина Гора', '340 м²', '2025', 'Дизайн-проект, авторский надзор', 'grid'],
  ['Студия для сдачи', '32 м²', '2024', 'Планировка и рабочая документация', 'stripes'],
  ['Апартаменты в Сити', '86 м²', '2024', 'Полный проект', 'rings'],
] as const;

const CONTENTS = [
  'Обмерный план и техническое задание',
  'Три варианта планировки на выбор',
  'Коллажи и 3D-визуализации всех помещений',
  'Ведомости отделки по каждой комнате',
  'Схемы электрики и освещения',
  'Развёртки санузлов и кухни с раскладкой плитки',
  'Спецификация мебели и сантехники со ссылками',
  'Чертежи мебели на заказ для столяра',
];

const STAGES = [
  ['Планировка', '2 недели', '900 ₽/м²', 'Обмеры, зонирование, три варианта расстановки'],
  ['Дизайн-проект', '5–7 недель', '2 900 ₽/м²', 'Визуализации, ведомости, рабочие чертежи'],
  ['Комплектация', 'по проекту', '8% от закупки', 'Заказываем и принимаем всё вместо вас'],
  ['Авторский надзор', 'весь ремонт', '35 000 ₽/мес', 'Выезды на объект, контроль подрядчика'],
];

function InteriorSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 @2xl:px-10">
          <span className="t-head text-lg tracking-[0.24em] uppercase">Пространство</span>
          <nav className="hidden gap-8 text-xs tracking-[0.14em] uppercase t-muted @3xl:flex">
            {['Проекты', 'Состав', 'Этапы', 'О студии', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className="text-sm t-muted">+7 900 000-00-00</span>
        </div>
      </header>

      {/* typographic hero with one image */}
      <Section pad="py-16 @2xl:py-24" inner="max-w-[1320px]">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] @4xl:items-end @4xl:gap-16">
          <div>
            <h1 className="text-[2.4rem] leading-[1.04] @2xl:text-[3.8rem]">
              Интерьеры, в которых удобно жить через десять лет
            </h1>
            <p className="mt-8 max-w-[48ch] text-[1.05rem] t-muted">
              Студия дизайна интерьера в Москве. Делаем проекты, по которым строители не задают
              вопросов, а вы не переделываете розетки после заезда.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Обсудить проект</Btn>
              <Btn size="lg" variant="ghost">
                Смотреть работы
              </Btn>
            </div>
          </div>
          <Media variant="mesh" seed={1} className="aspect-3/4 w-full" />
        </div>

        <div className="t-border-t mt-16 grid gap-8 pt-10 @xl:grid-cols-2 @4xl:grid-cols-4">
          {[
            ['74', 'проекта с 2016 года'],
            ['12 400 м²', 'спроектировано'],
            ['5–7 недель', 'средний срок проекта'],
            ['0', 'проектов «в стол»'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="t-head text-3xl t-primary">{v}</div>
              <div className="mt-2 text-sm t-muted">{l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* projects with metadata — the signature block */}
      <div className="t-border-t t-border-b">
        <Section inner="max-w-[1320px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Проекты</h2>
          <div className="mt-12 grid gap-12 @3xl:grid-cols-2 @3xl:gap-x-8">
            {PROJECTS.map(([title, area, year, scope, variant], i) => (
              <article key={title} className={i % 2 === 1 ? '@3xl:mt-16' : undefined}>
                <Media variant={variant} seed={i + 3} className="aspect-4/3 w-full" />
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-[1.4rem] @2xl:text-[1.7rem]">{title}</h3>
                  <span className="text-sm t-faint">{year}</span>
                </div>
                <div className="t-border-t mt-4 flex flex-wrap gap-x-8 gap-y-1 pt-4 text-sm t-muted">
                  <span>{area}</span>
                  <span>{scope}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14">
            <Btn variant="outline">Все 74 проекта</Btn>
          </div>
        </Section>
      </div>

      {/* what's inside the project */}
      <Section inner="max-w-[1320px]">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] @4xl:gap-16">
          <div>
            <div className="t-eyebrow">Состав проекта</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
              Что вы получаете на выходе
            </h2>
            <p className="mt-6 t-muted">
              Полный комплект документации в печати и в PDF. По нему может работать любая бригада —
              не только наша.
            </p>
          </div>
          <ol className="grid gap-x-10 @xl:grid-cols-2">
            {CONTENTS.map((item, i) => (
              <li key={item} className="t-border-b flex gap-4 py-4">
                <span className="t-head w-6 shrink-0 text-sm t-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.98rem]">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* stages with pricing per m² */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1320px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Этапы и стоимость</h2>
          <div className="mt-10">
            <div className="hidden pb-4 text-xs tracking-[0.14em] uppercase t-faint @3xl:grid @3xl:grid-cols-[minmax(0,0.7fr)_150px_170px_minmax(0,1.2fr)] @3xl:gap-6">
              <span>Этап</span>
              <span>Срок</span>
              <span>Стоимость</span>
              <span>Что входит</span>
            </div>
            {STAGES.map(([name, time, price, text]) => (
              <div
                key={name}
                className="t-border-t grid gap-1.5 py-6 @3xl:grid-cols-[minmax(0,0.7fr)_150px_170px_minmax(0,1.2fr)] @3xl:items-center @3xl:gap-6"
              >
                <span className="t-head text-[1.15rem]">{name}</span>
                <span className="text-sm t-muted">{time}</span>
                <span className="font-semibold t-primary">{price}</span>
                <span className="text-sm t-muted">{text}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm t-faint">
            Минимальная стоимость дизайн-проекта — 180 000 ₽ независимо от площади.
          </p>
        </Section>
      </div>

      {/* about studio */}
      <Section inner="max-w-[1320px]">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-16">
          <Media variant="portrait" seed={11} className="aspect-4/5 w-full" />
          <div>
            <div className="t-eyebrow">О студии</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
              Три архитектора и один комплектатор
            </h2>
            <div className="mt-6 grid gap-4 t-muted">
              <p>
                Мы не берём больше четырёх проектов одновременно — иначе не получается вникать. Ведёт
                проект тот же человек, с которым вы познакомились на первой встрече.
              </p>
              <p>
                Не работаем с «дизайном по фотографии из интернета»: сначала разбираемся, как вы
                живёте, потом рисуем. Часто получается дешевле, чем вы рассчитывали.
              </p>
            </div>
            <div className="t-border-t mt-8 grid gap-3 pt-8 text-sm">
              {['Первая встреча — бесплатно, 1,5 часа', 'Договор с фиксированной ценой за м²', 'Правки на каждом этапе включены'].map(
                (item) => (
                  <span key={item}>{item}</span>
                ),
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* contact */}
      <div className="t-inverse">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-16 @2xl:px-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:gap-16">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Расскажите про объект</h2>
            <p className="mt-5 max-w-[42ch] opacity-70">
              Ответим в течение дня и предложим встретиться на объекте или в студии на Рочдельской.
            </p>
            <div className="mt-8 grid gap-2 text-sm opacity-80">
              <span>Москва, Рочдельская 15, стр. 17</span>
              <span>+7 900 000-00-00</span>
              <span>studio@prostranstvo.design</span>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Имя" />
              <input className="t-input" placeholder="Телефон" />
            </div>
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Площадь, м²" />
              <select className="t-input">
                <option>Квартира</option>
                <option>Загородный дом</option>
                <option>Коммерческое помещение</option>
              </select>
            </div>
            <input className="t-input" placeholder="Когда планируете начать" />
            <Btn size="lg" variant="inverse" className="w-full">
              Отправить
            </Btn>
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-base tracking-[0.24em] uppercase">Пространство</span>
          <span>Рочдельская 15 · +7 900 000-00-00</span>
          <span>© 2026 Студия «Пространство»</span>
        </div>
      </footer>
    </div>
  );
}

export const interior: TemplateDefinition = {
  id: 'interior',
  name: 'Пространство',
  category: 'Дизайн интерьера',
  description:
    'Сайт студии интерьера: проекты со смещённой сеткой и метаданными, состав проекта списком, этапы с ценой за м².',
  tags: ['дизайн', 'интерьер', 'проект', 'ремонт', 'студия', 'визуализация'],
  defaults: {
    primary: '#8a8071',
    secondary: '#c9bfae',
    button: '#2f2b26',
    background: '#f7f5f1',
    text: '#211f1b',
    buttonShape: 'sharp',
    font: 'playfair',
    cardRadius: 0,
  },
  Component: InteriorSite,
};
