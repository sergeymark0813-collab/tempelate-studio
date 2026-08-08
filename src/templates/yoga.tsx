import { Flower, Leaf, MapPin, Moon, Sun, Wind, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const DIRECTIONS: { icon: LucideIcon; name: string; text: string; level: string }[] = [
  {
    icon: Sun,
    name: 'Хатха',
    text: 'Статичные асаны, много объяснений. Здесь начинают те, кто не тянется с детства.',
    level: 'с нуля',
  },
  {
    icon: Wind,
    name: 'Виньяса-флоу',
    text: 'Динамика в связке с дыханием. Потеете, но без соревнования с соседом по коврику.',
    level: 'нужен опыт',
  },
  {
    icon: Moon,
    name: 'Инь и восстановление',
    text: 'Долгие удержания и работа с фасцией. Вечерняя практика для спины и сна.',
    level: 'любой уровень',
  },
];

const SCHEDULE = [
  ['Понедельник', [['08:00', 'Хатха', 'Ольга'], ['19:00', 'Виньяса', 'Дмитрий'], ['20:45', 'Инь', 'Ольга']]],
  ['Вторник', [['10:00', 'Мягкая практика', 'Настя'], ['19:30', 'Виньяса', 'Дмитрий']]],
  ['Среда', [['08:00', 'Хатха', 'Ольга'], ['19:00', 'Пранаяма', 'Настя'], ['20:30', 'Инь', 'Настя']]],
  ['Четверг', [['10:00', 'Хатха', 'Ольга'], ['19:30', 'Виньяса', 'Дмитрий']]],
  ['Суббота', [['11:00', 'Открытый класс', 'Все преподаватели'], ['13:00', 'Йога для спины', 'Настя']]],
] as const;

const PASSES = [
  { name: 'Первое занятие', price: '500 ₽', text: 'Знакомство, коврик дадим' },
  { name: '5 занятий', price: '5 500 ₽', text: 'Действует 2 месяца' },
  { name: '10 занятий', price: '9 900 ₽', text: 'Действует 4 месяца', featured: true },
  { name: 'Месяц без лимита', price: '12 900 ₽', text: 'Все классы и открытые практики' },
];

const RETREATS = [
  ['Карелия · тишина у воды', '14–18 июля', '4 дня, 12 мест', '68 000 ₽'],
  ['Дагестан · горы и практика', '22–29 сентября', '8 дней, 10 мест', '124 000 ₽'],
];

function YogaSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Flower size={20} className="t-primary" strokeWidth={1.5} />
            <span className="t-head text-2xl tracking-[0.12em]">Прана</span>
          </span>
          <nav className="hidden gap-8 text-sm t-muted @4xl:flex">
            {['Направления', 'Расписание', 'Абонементы', 'Ретриты', 'Студия'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm" variant="outline">
            Первое занятие 500 ₽
          </Btn>
        </div>
      </header>

      {/* calm centred hero */}
      <Section pad="py-16 @2xl:py-24" inner="max-w-[1160px]">
        <div className="mx-auto max-w-[680px] text-center">
          <div className="t-eyebrow">Йога-студия в Замоскворечье</div>
          <h1 className="mt-6 text-[2.4rem] leading-[1.08] @2xl:text-[3.5rem]">
            Практика без соревнования и без «встаньте в шпагат»
          </h1>
          <p className="mx-auto mt-7 max-w-[48ch] text-[1.05rem] t-muted">
            Небольшие группы до 10 человек, преподаватели с медицинским образованием и никакой
            духовной обязательной программы.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Btn size="lg">Прийти на первое занятие</Btn>
            <Btn size="lg" variant="ghost">
              Расписание
            </Btn>
          </div>
        </div>

        <Media variant="mesh" seed={1} radius="card-lg" className="mt-14 aspect-21/9 w-full" />
      </Section>

      {/* directions */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1160px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Направления</h2>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {DIRECTIONS.map(({ icon: Icon, name, text, level }) => (
              <article
                key={name}
                className="t-card flex flex-col p-7"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Icon size={26} className="t-primary" strokeWidth={1.5} />
                <h3 className="mt-5 text-[1.35rem]">{name}</h3>
                <p className="mt-3 flex-1 text-[0.98rem] t-muted">{text}</p>
                <div className="t-border-t mt-5 pt-4">
                  <span
                    className="t-r-pill px-3 py-1.5 text-xs font-semibold"
                    style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                  >
                    {level}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* schedule as day blocks */}
      <Section inner="max-w-[1160px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Расписание</h2>
          <span className="text-sm t-muted">Запись через приложение или по телефону</span>
        </div>

        <div className="mt-10 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-3">
          {SCHEDULE.map(([day, classes]) => (
            <div key={day}>
              <div className="t-border-b pb-3 text-sm font-bold tracking-wide uppercase t-primary">
                {day}
              </div>
              <div className="mt-3 grid gap-3">
                {classes.map(([time, name, teacher]) => (
                  <div key={`${day}-${time}`} className="flex gap-4">
                    <span className="t-head w-14 shrink-0 text-sm">{time}</span>
                    <div className="min-w-0">
                      <div className="text-[0.98rem] font-semibold">{name}</div>
                      <div className="mt-0.5 text-sm t-muted">{teacher}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* passes */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-secondary-tint)' }}>
        <Section inner="max-w-[1160px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Абонементы</h2>
          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-4">
            {PASSES.map((pass) => (
              <div
                key={pass.name}
                className="t-card flex flex-col p-6 text-center"
                style={{
                  background: 'var(--tp-bg)',
                  ...(pass.featured ? { borderColor: 'var(--tp-primary)' } : null),
                }}
              >
                {pass.featured && <span className="t-chip mx-auto mb-4">Выгоднее всего</span>}
                <h3 className="text-[1.15rem]">{pass.name}</h3>
                <div className="t-head mt-3 text-2xl t-primary">{pass.price}</div>
                <p className="mt-3 flex-1 text-sm t-muted">{pass.text}</p>
                <Btn className="mt-6 w-full" size="sm" variant={pass.featured ? 'solid' : 'outline'}>
                  Купить
                </Btn>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm t-faint">
            Абонемент можно заморозить на две недели один раз за срок действия.
          </p>
        </Section>
      </div>

      {/* retreats — the distinctive block */}
      <Section inner="max-w-[1160px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="t-eyebrow">Ретриты</div>
            <h2 className="mt-3 text-[1.9rem] @2xl:text-[2.6rem]">Выездные практики</h2>
          </div>
          <span className="text-sm t-muted">Два раза в год, набор небольшой</span>
        </div>

        <div className="mt-10 grid gap-6 @3xl:grid-cols-2">
          {RETREATS.map(([title, dates, meta, price], i) => (
            <article key={title} className="t-card overflow-hidden">
              <Media variant={i === 0 ? 'rings' : 'stripes'} seed={i + 5} radius="none" className="aspect-16/9 w-full" />
              <div className="p-7">
                <div className="text-sm font-semibold t-primary">{dates}</div>
                <h3 className="mt-2 text-[1.5rem]">{title}</h3>
                <div className="mt-2 text-sm t-muted">{meta}</div>
                <div className="t-border-t mt-6 flex flex-wrap items-center justify-between gap-4 pt-5">
                  <span className="t-head text-xl">{price}</span>
                  <Btn size="sm">Забронировать</Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* teachers */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1160px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Преподаватели</h2>
          <div className="mt-10 grid gap-8 @xl:grid-cols-3">
            {[
              ['Ольга Ветрова', 'Хатха, инь', '900 часов подготовки, 12 лет практики'],
              ['Дмитрий Ланин', 'Виньяса', 'Реабилитолог, работает с травмами'],
              ['Настя Гурьева', 'Пранаяма, спина', 'Физиотерапевт, 8 лет преподавания'],
            ].map(([name, role, bio], i) => (
              <div key={name} className="text-center">
                <Media
                  variant="portrait"
                  seed={i + 9}
                  radius="pill"
                  className="mx-auto aspect-square w-full max-w-[190px]"
                />
                <h3 className="mt-5 text-[1.15rem]">{name}</h3>
                <div className="mt-1 text-sm t-primary">{role}</div>
                <p className="mx-auto mt-2 max-w-[28ch] text-sm t-muted">{bio}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* studio + trial */}
      <Section inner="max-w-[1160px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="flex items-center gap-2 text-sm font-semibold t-primary">
              <Leaf size={16} /> Студия
            </span>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
              Два зала, душ и чай после практики
            </h2>
            <p className="mt-5 t-muted">
              Коврики, болстеры и ремни есть на месте — приходить можно с пустыми руками. Есть
              шкафчики с замком и место, где можно посидеть после занятия.
            </p>
            <div className="mt-7 grid gap-2.5 text-sm">
              <span className="flex items-center gap-2.5">
                <MapPin size={15} className="t-primary" /> Москва, Пятницкая 42
              </span>
              <span>Пн–Пт 08:00–22:00 · Сб 10:00–16:00</span>
              <span>+7 900 000-00-00 · hello@prana-studio.ru</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Записаться на первое занятие</Btn>
              <Btn size="lg" variant="outline">
                Как добраться
              </Btn>
            </div>
          </div>
          <Media variant="dots" seed={14} radius="card-lg" className="aspect-4/3 w-full" />
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-[0.12em]">Прана</span>
          <span>Пятницкая 42 · +7 900 000-00-00</span>
          <span>© 2026 Йога-студия «Прана»</span>
        </div>
      </footer>
    </div>
  );
}

export const yoga: TemplateDefinition = {
  id: 'yoga',
  name: 'Прана',
  category: 'Йога-студия',
  description:
    'Спокойный сайт йога-студии: расписание блоками по дням, абонементы и выездные ретриты с датами.',
  tags: ['йога', 'студия', 'практика', 'расписание', 'абонемент', 'ретрит'],
  defaults: {
    primary: '#6b8e6f',
    secondary: '#d9c9a8',
    button: '#6b8e6f',
    background: '#fbfaf6',
    text: '#23291f',
    buttonShape: 'rounded',
    font: 'cormorant',
    cardRadius: 24,
  },
  Component: YogaSite,
};
