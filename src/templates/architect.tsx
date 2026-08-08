import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const PROJECTS = [
  {
    title: 'Дом в сосновом лесу',
    location: 'Ленинградская обл.',
    year: '2025',
    area: '410 м²',
    status: 'Реализован',
    variant: 'mesh' as const,
  },
  {
    title: 'Реконструкция мануфактуры',
    location: 'Иваново',
    year: '2024',
    area: '6 200 м²',
    status: 'Реализован',
    variant: 'grid' as const,
  },
  {
    title: 'Общественный центр',
    location: 'Тюмень',
    year: '2026',
    area: '2 800 м²',
    status: 'В работе',
    variant: 'plan' as const,
  },
];

const PHASES = [
  ['Концепция', 'Объёмное решение, посадка на участок, инсоляция. Показываем два-три сценария.'],
  ['Эскизный проект', 'Планировки, фасады, разрезы. Согласуем принципиальные решения.'],
  ['Проектная документация', 'Стадия «П» для экспертизы и получения разрешения на строительство.'],
  ['Рабочая документация', 'Стадия «Р»: узлы, спецификации, всё, по чему строят.'],
];

const TEAM = [
  ['Илья Форманов', 'Главный архитектор, партнёр'],
  ['Вера Кац', 'Руководитель проектов'],
  ['Антон Лемех', 'Архитектор, BIM-координатор'],
  ['Саша Дубова', 'Конструктор'],
];

const AWARDS = [
  ['2025', 'Архитектон', 'Диплом за дом в сосновом лесу'],
  ['2024', 'Золотое сечение', 'Шортлист, реконструкция мануфактуры'],
  ['2024', 'Архиwood', 'Финалист в категории «Загородный дом»'],
  ['2023', 'WAF Russia', 'Публикация проекта общественного центра'],
];

function ArchitectSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-6 @2xl:px-10">
          <span className="t-head text-base tracking-[0.32em] uppercase">Форма</span>
          <nav className="hidden gap-9 text-xs tracking-[0.14em] uppercase t-muted @3xl:flex">
            {['Проекты', 'Стадии', 'Бюро', 'Награды', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className="text-xs tracking-[0.14em] uppercase t-muted">СПб · с 2014</span>
        </div>
      </header>

      {/* pure typographic hero, no imagery at all */}
      <Section pad="py-20 @2xl:py-32" inner="max-w-[1360px]">
        <h1 className="max-w-[24ch] text-[2.4rem] leading-[1.02] @2xl:text-[4rem] @5xl:text-[4.8rem]">
          Архитектурное бюро. Работаем от концепции до рабочей документации.
        </h1>
        <div className="t-border-t mt-16 grid gap-10 pt-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:gap-16">
          <p className="text-[1.05rem] t-muted">
            Двенадцать человек, свой конструкторский отдел и BIM с первой стадии. Не берём проекты,
            где нельзя влиять на планировку.
          </p>
          <div className="grid gap-6 @xl:grid-cols-3">
            {[
              ['38', 'проектов'],
              ['11', 'реализовано'],
              ['4', 'награды'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="t-head text-3xl">{v}</div>
                <div className="mt-1 text-sm t-muted">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* full-bleed projects with metadata on the side */}
      {PROJECTS.map((project, i) => (
        <section key={project.title} className="t-border-t">
          <Media variant={project.variant} seed={i + 2} radius="none" className="aspect-16/9 w-full" />
          <div className="mx-auto max-w-[1360px] px-6 py-8 @2xl:px-10">
            <div className="grid gap-6 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @3xl:items-baseline">
              <h2 className="text-[1.6rem] @2xl:text-[2.2rem]">{project.title}</h2>
              <div className="flex flex-wrap gap-x-10 gap-y-2 text-sm t-muted @3xl:justify-end">
                <span>{project.location}</span>
                <span>{project.area}</span>
                <span>{project.year}</span>
                <span className="t-primary font-semibold">{project.status}</span>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* phases */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1360px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Стадии проектирования</h2>
          <div className="mt-12 grid gap-10 @xl:grid-cols-2 @5xl:grid-cols-4">
            {PHASES.map(([title, text], i) => (
              <div key={title}>
                <div className="t-border-t pt-5">
                  <span className="t-head text-sm t-faint">0{i + 1}</span>
                  <h3 className="mt-4 text-[1.2rem]">{title}</h3>
                  <p className="mt-3 text-sm t-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm t-muted">
            Можно заказать любую стадию отдельно. Стоимость считаем от площади и сложности —
            обычно 1 800–4 200 ₽ за м².
          </p>
        </Section>
      </div>

      {/* team */}
      <Section inner="max-w-[1360px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Бюро</h2>
        <div className="mt-12 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-4">
          {TEAM.map(([name, role], i) => (
            <div key={name}>
              <Media variant="portrait" seed={i + 9} radius="none" className="aspect-4/5 w-full" />
              <h3 className="mt-4 text-[1.05rem]">{name}</h3>
              <div className="mt-1 text-sm t-muted">{role}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* awards as a list */}
      <div className="t-border-t t-border-b">
        <Section inner="max-w-[1360px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Награды и публикации</h2>
          <div className="mt-10">
            {AWARDS.map(([year, award, note]) => (
              <div
                key={`${year}-${award}`}
                className="t-border-t grid gap-1.5 py-6 @3xl:grid-cols-[100px_minmax(0,0.8fr)_minmax(0,1.2fr)] @3xl:items-baseline @3xl:gap-8"
              >
                <span className="t-head text-sm t-primary">{year}</span>
                <span className="t-head text-[1.15rem]">{award}</span>
                <span className="text-sm t-muted">{note}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* contacts — deliberately plain */}
      <Section inner="max-w-[1360px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:gap-16">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Контакты</h2>
            <div className="mt-8 grid gap-2">
              <span>Санкт-Петербург, наб. реки Мойки 58, оф. 412</span>
              <span>+7 900 000-00-00</span>
              <span>studio@forma-arch.ru</span>
            </div>
            <p className="mt-8 max-w-[44ch] text-sm t-muted">
              Пришлите исходные данные по участку или обмеры — вернёмся с оценкой сроков и стоимости
              в течение трёх рабочих дней.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Имя" />
              <input className="t-input" placeholder="Телефон или e-mail" />
            </div>
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Тип объекта" />
              <input className="t-input" placeholder="Площадь, м²" />
            </div>
            <input className="t-input" placeholder="Кратко о задаче" />
            <Btn size="lg">Отправить</Btn>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-xs tracking-[0.14em] uppercase t-muted @2xl:px-10">
          <span className="t-head text-sm tracking-[0.32em]">Форма</span>
          <span>Санкт-Петербург</span>
          <span>© 2026 Бюро «Форма»</span>
        </div>
      </footer>
    </div>
  );
}

export const architect: TemplateDefinition = {
  id: 'architect',
  name: 'Форма',
  category: 'Архитектурное бюро',
  description:
    'Минималистичный сайт архбюро: только типографика в первом экране, проекты во всю ширину, награды списком.',
  tags: ['архитектура', 'бюро', 'проектирование', 'дом', 'документация', 'bim'],
  defaults: {
    primary: '#262626',
    secondary: '#a3a3a3',
    button: '#262626',
    background: '#fafafa',
    text: '#171717',
    buttonShape: 'sharp',
    font: 'mono',
    cardRadius: 0,
  },
  Component: ArchitectSite,
};
