import { Award, HardHat, Phone, Ruler, ShieldCheck, Truck } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, Media, Section, type MediaVariant } from './ui';

const SERVICES = [
  ['Проектирование', 'Рабочая документация, согласования, сметы'],
  ['Каркас и монолит', 'Фундаменты, монолитные работы, металлокаркас'],
  ['Фасады и кровля', 'Вентфасады, металлочерепица, мембраны'],
  ['Инженерия', 'Отопление, вентиляция, электрика, слаботочка'],
  ['Отделка', 'Черновая и чистовая, коммерческие интерьеры'],
  ['Благоустройство', 'Дороги, парковки, озеленение, освещение'],
];

const PROJECTS: { title: string; meta: string; variant: MediaVariant }[] = [
  { title: 'Складской комплекс 6 400 м²', meta: 'Тульская обл., 2025', variant: 'plan' },
  { title: 'Производственный цех', meta: 'Калуга, 2025', variant: 'grid' },
  { title: 'Автосалон с СТО', meta: 'Москва, 2024', variant: 'stripes' },
  { title: 'Жилой дом 4 этажа', meta: 'Подольск, 2024', variant: 'mesh' },
];

const PROCESS = [
  ['Выезд и обмеры', 'Инженер приезжает в течение двух дней'],
  ['Смета и график', 'Фиксируем стоимость и сроки в договоре'],
  ['Строительство', 'Еженедельные фотоотчёты и технадзор'],
  ['Сдача объекта', 'Исполнительная документация и гарантия 5 лет'],
];

function ConstructionSite() {
  return (
    <div className="tpl">
      {/* top contact bar */}
      <div className="t-inverse text-sm">
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-3 px-6 py-2.5 @2xl:px-10">
          <span className="opacity-75">Работаем по Москве и области с 2008 года</span>
          <span className="flex items-center gap-2 font-semibold">
            <Phone size={14} /> +7 900 000-00-00
          </span>
        </div>
      </div>

      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center t-r-card-sm"
              style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
            >
              <HardHat size={20} />
            </span>
            <span>
              <span className="t-head block text-lg leading-none">СтройБаза</span>
              <span className="text-xs t-muted">генеральный подряд</span>
            </span>
          </span>
          <nav className="hidden gap-7 text-sm font-medium @4xl:flex">
            {['Услуги', 'Объекты', 'Этапы', 'Лицензии', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Вызвать инженера</Btn>
        </div>
      </header>

      {/* hero */}
      <Section pad="py-14 @2xl:py-20">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <Eyebrow>Промышленное и коммерческое строительство</Eyebrow>
            <h1 className="mt-5 text-[2.5rem] @2xl:text-[3.4rem] @5xl:text-[3.9rem]">
              Строим объекты под ключ и сдаём в срок
            </h1>
            <p className="mt-6 max-w-[52ch] t-muted">
              Собственная техника, штат 140 человек и фиксированная смета. Берём объекты от 500 м² —
              от проекта до подключения инженерных сетей.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Рассчитать стоимость</Btn>
              <Btn size="lg" variant="outline">
                Скачать презентацию
              </Btn>
            </div>
            <div className="mt-10 grid gap-6 @xl:grid-cols-3">
              {[
                ['18 лет', 'на рынке'],
                ['240+', 'сданных объектов'],
                ['5 лет', 'гарантия'],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="t-head text-2xl t-primary">{value}</div>
                  <div className="text-sm t-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Media variant="plan" seed={1} className="col-span-2 aspect-16/10 w-full" />
            <Media variant="grid" seed={2} className="aspect-square w-full" />
            <Media variant="stripes" seed={3} className="aspect-square w-full" />
          </div>
        </div>
      </Section>

      {/* services */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1220px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Услуги</Eyebrow>
              <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Полный цикл работ</h2>
            </div>
            <Btn variant="outline" size="sm">
              Прайс-лист
            </Btn>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden t-border @2xl:grid-cols-2 @4xl:grid-cols-3"
            style={{ background: 'var(--tp-border)' }}
          >
            {SERVICES.map(([title, text], i) => (
              <div key={title} className="p-7" style={{ background: 'var(--tp-bg)' }}>
                <div className="t-head text-sm t-faint">0{i + 1}</div>
                <h3 className="mt-3 text-lg">{title}</h3>
                <p className="mt-2 text-sm t-muted">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* projects */}
      <Section inner="max-w-[1220px]">
        <Eyebrow>Объекты</Eyebrow>
        <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Что мы построили</h2>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-2 @4xl:grid-cols-4">
          {PROJECTS.map((project, i) => (
            <article key={project.title}>
              <Media variant={project.variant} seed={i + 4} className="aspect-4/3 w-full" />
              <h3 className="mt-4 text-[1.05rem] leading-snug">{project.title}</h3>
              <div className="mt-1 text-sm t-muted">{project.meta}</div>
            </article>
          ))}
        </div>
      </Section>

      {/* process */}
      <div className="t-bg-secondary">
        <div className="mx-auto max-w-[1220px] px-6 py-16 @2xl:px-10">
          <h2 className="text-[2rem] @2xl:text-[2.6rem]">Как идёт работа</h2>
          <div className="mt-12 grid gap-8 @2xl:grid-cols-2 @4xl:grid-cols-4">
            {PROCESS.map(([title, text], i) => (
              <div key={title}>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full font-bold"
                    style={{ background: 'var(--tp-bg)', color: 'var(--tp-text)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="h-px flex-1" style={{ background: 'currentColor', opacity: 0.3 }} />
                </div>
                <h3 className="mt-5 text-lg">{title}</h3>
                <p className="mt-2 text-sm opacity-80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* trust */}
      <Section inner="max-w-[1220px]">
        <div className="grid gap-8 @2xl:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'СРО и лицензии', text: 'Допуски на все виды работ, страхование ответственности' },
            { icon: Truck, title: 'Своя техника', text: '32 единицы: краны, экскаваторы, самосвалы, бетононасосы' },
            { icon: Ruler, title: 'Технадзор', text: 'Независимая приёмка каждого этапа и исполнительная съёмка' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="t-card p-7">
              <Icon size={26} className="t-primary" strokeWidth={1.6} />
              <h3 className="mt-5 text-lg">{title}</h3>
              <p className="mt-2 text-sm t-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* quote form */}
      <div className="t-surface t-border-t">
        <Section inner="max-w-[1220px]">
          <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:gap-16">
            <div>
              <Eyebrow>Смета</Eyebrow>
              <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">
                Пришлите ТЗ — посчитаем за два дня
              </h2>
              <p className="mt-5 t-muted">
                Если проекта ещё нет, приедет инженер: сделает обмеры и предложит решение.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Award size={22} className="t-primary" />
                <span className="text-sm t-muted">Фиксируем цену в договоре — без «дополнительных работ»</span>
              </div>
            </div>
            <form className="t-card grid gap-4 p-7 @2xl:p-9">
              <div className="grid gap-4 @xl:grid-cols-2">
                <input className="t-input" placeholder="Имя" />
                <input className="t-input" placeholder="Телефон" />
              </div>
              <input className="t-input" placeholder="Объект и площадь" />
              <textarea className="t-input min-h-28" placeholder="Кратко о задаче" />
              <Btn size="lg" className="w-full">
                Получить расчёт
              </Btn>
            </form>
          </div>
        </Section>
      </div>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1220px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <div className="t-head text-lg">СтройБаза</div>
            <p className="mt-3 text-sm opacity-65">
              Генеральный подряд, промышленное и коммерческое строительство.
            </p>
          </div>
          <div className="text-sm opacity-75">
            <div>Москва, Проектируемый пр-д 4</div>
            <div className="mt-2">+7 900 000-00-00</div>
            <div className="mt-2">office@stroybaza.ru</div>
          </div>
          <div className="text-sm opacity-75">
            <div>Пн–Пт 08:00–19:00</div>
            <div className="mt-2">Сб 09:00–15:00</div>
            <div className="mt-4 opacity-70">© 2026 СтройБаза</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const construction: TemplateDefinition = {
  id: 'construction',
  name: 'СтройБаза',
  category: 'Строительство',
  description:
    'Сайт строительной компании: услуги плиткой, портфолио объектов и расчёт сметы.',
  tags: ['строительство', 'подряд', 'ремонт', 'объекты', 'смета'],
  defaults: {
    primary: '#1f2937',
    secondary: '#f59e0b',
    button: '#f59e0b',
    background: '#f6f7f8',
    text: '#141a22',
    buttonShape: 'sharp',
    font: 'montserrat',
    cardRadius: 4,
  },
  Component: ConstructionSite,
};
