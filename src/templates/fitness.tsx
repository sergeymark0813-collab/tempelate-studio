import { ArrowRight, Check, Dumbbell, Flame, HeartPulse, Timer } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const SCHEDULE = [
  ['07:00', 'Функциональный', 'Зал А', 'Ирина К.'],
  ['09:30', 'Сайклинг', 'Cycle', 'Пётр М.'],
  ['12:00', 'Йога-флоу', 'Студия', 'Алина Р.'],
  ['18:30', 'Кроссфит', 'Зал Б', 'Марк Д.'],
  ['20:00', 'Бокс', 'Ринг', 'Саид А.'],
];

const PLANS = [
  {
    name: 'Старт',
    price: '2 900',
    period: 'мес',
    perks: ['Тренажёрный зал', '4 групповых занятия', 'Открытая раздевалка'],
    featured: false,
  },
  {
    name: 'Полный',
    price: '4 900',
    period: 'мес',
    perks: [
      'Все групповые занятия',
      'Зал 24/7',
      'Персональный план питания',
      'Шкафчик и полотенца',
    ],
    featured: true,
  },
  {
    name: 'Год',
    price: '39 000',
    period: 'год',
    perks: ['Всё из «Полного»', '2 персональные тренировки', 'Заморозка на 30 дней'],
    featured: false,
  },
];

const STATS = [
  { icon: Dumbbell, value: '1 800 м²', label: 'площадь клуба' },
  { icon: Timer, value: '24/7', label: 'доступ в зал' },
  { icon: HeartPulse, value: '40+', label: 'занятий в неделю' },
  { icon: Flame, value: '12', label: 'тренеров' },
];

const TRAINERS = [
  ['Марк Дунаев', 'Кроссфит, силовые'],
  ['Ирина Ковалёва', 'Функциональный тренинг'],
  ['Алина Реут', 'Йога, мобильность'],
  ['Саид Алиев', 'Бокс, ОФП'],
];

function FitnessSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="t-head text-2xl tracking-tight">
            ПУЛЬС<span className="t-primary">.</span>
          </span>
          <nav className="hidden gap-7 text-[13px] font-semibold tracking-wide uppercase @4xl:flex">
            {['Расписание', 'Тренеры', 'Цены', 'Клуб'].map((item) => (
              <span key={item} className="t-muted">
                {item}
              </span>
            ))}
          </nav>
          <Btn size="sm">Пробная тренировка</Btn>
        </div>
      </header>

      {/* hero — asymmetric split */}
      <div className="mx-auto grid max-w-[1240px] items-stretch gap-0 px-6 @2xl:px-10 @4xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="py-16 @2xl:py-24">
          <div className="t-chip">Первая тренировка бесплатно</div>
          <h1 className="mt-7 text-[3.2rem] leading-[0.95] uppercase @2xl:text-[4.6rem] @5xl:text-[5.6rem]">
            Сильнее
            <br />
            <span className="t-grad-text">каждую</span>
            <br />
            неделю
          </h1>
          <p className="mt-7 max-w-[42ch] t-muted">
            Клуб 1 800 м² в центре: тренажёрный зал, три студии, ринг и восстановление. Работаем
            круглосуточно.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn size="lg">
              Записаться <ArrowRight size={17} />
            </Btn>
            <Btn size="lg" variant="outline">
              Экскурсия по клубу
            </Btn>
          </div>
        </div>
        <Media
          variant="stripes"
          seed={1}
          radius="none"
          className="min-h-[320px] @4xl:min-h-full"
        />
      </div>

      {/* stats strip */}
      <div className="t-bg-primary">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-10 @2xl:px-10 @xl:grid-cols-2 @4xl:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <Icon size={26} strokeWidth={1.6} />
              <div>
                <div className="t-head text-2xl">{value}</div>
                <div className="text-xs tracking-wide uppercase opacity-70">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* schedule */}
      <Section inner="max-w-[1240px]">
        <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-end @3xl:justify-between">
          <h2 className="text-[2.2rem] uppercase @2xl:text-[3rem]">Расписание на сегодня</h2>
          <Btn variant="soft" size="sm">
            Всё расписание
          </Btn>
        </div>

        <div className="t-card mt-10 overflow-hidden">
          {SCHEDULE.map(([time, name, place, coach], i) => (
            <div
              key={name}
              className={`grid items-center gap-4 px-6 py-5 @2xl:grid-cols-[110px_minmax(0,1fr)_140px_160px] @2xl:px-8 ${
                i > 0 ? 't-border-t' : ''
              }`}
            >
              <div className="t-head t-primary text-xl">{time}</div>
              <div className="text-lg font-semibold">{name}</div>
              <div className="text-sm t-muted">{place}</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm t-muted">{coach}</span>
                <Btn size="sm" variant="outline">
                  Записаться
                </Btn>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* trainers */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1240px]">
          <h2 className="text-[2.2rem] uppercase @2xl:text-[3rem]">Тренеры</h2>
          <div className="mt-10 grid gap-6 @xl:grid-cols-2 @4xl:grid-cols-4">
            {TRAINERS.map(([name, spec], i) => (
              <div key={name}>
                <Media variant="portrait" seed={i + 2} className="aspect-3/4 w-full" />
                <div className="mt-4 text-lg font-semibold">{name}</div>
                <div className="text-sm t-muted">{spec}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* pricing */}
      <Section inner="max-w-[1240px]">
        <div className="text-center">
          <h2 className="text-[2.2rem] uppercase @2xl:text-[3rem]">Клубные карты</h2>
          <p className="mx-auto mt-4 max-w-[48ch] t-muted">
            Без скрытых платежей. Заморозка и перенос — в личном кабинете.
          </p>
        </div>

        <div className="mt-12 grid gap-6 @2xl:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`t-card flex flex-col p-8 ${plan.featured ? 't-glow' : ''}`}
              style={
                plan.featured
                  ? { borderColor: 'var(--tp-primary)', background: 'var(--tp-primary-tint)' }
                  : undefined
              }
            >
              {plan.featured && <div className="t-chip mb-5 self-start">Выбирают чаще</div>}
              <div className="text-sm font-semibold tracking-widest uppercase t-muted">
                {plan.name}
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="t-head text-5xl">{plan.price}</span>
                <span className="t-muted">₽/{plan.period}</span>
              </div>
              <ul className="mt-7 grid flex-1 gap-3 text-[0.95rem]">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <Check size={16} className="t-primary mt-0.5 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              <Btn className="mt-8 w-full" variant={plan.featured ? 'solid' : 'outline'}>
                Оформить
              </Btn>
            </div>
          ))}
        </div>
      </Section>

      {/* cta */}
      <div className="t-inverse">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 px-6 py-16 text-center @2xl:px-10 @4xl:flex-row @4xl:justify-between @4xl:text-left">
          <div>
            <h2 className="text-[2rem] uppercase @2xl:text-[2.6rem]">Начните с бесплатного визита</h2>
            <p className="mt-3 opacity-70">Покажем клуб, составим план и подберём карту.</p>
          </div>
          <Btn size="lg" variant="inverse">
            Записаться на пробную
          </Btn>
        </div>
      </div>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-tight">ПУЛЬС.</span>
          <span>ул. Спортивная 8 · +7 900 000-00-00</span>
          <span>© 2026 Фитнес-клуб «Пульс»</span>
        </div>
      </footer>
    </div>
  );
}

export const fitness: TemplateDefinition = {
  id: 'fitness',
  name: 'Пульс',
  category: 'Фитнес',
  description:
    'Энергичный сайт фитнес-клуба: плакатная типографика, расписание занятий и клубные карты.',
  tags: ['фитнес', 'спорт', 'зал', 'тренировки', 'клуб'],
  defaults: {
    primary: '#d7ff3f',
    secondary: '#22d3ee',
    button: '#d7ff3f',
    background: '#0d0f12',
    text: '#f1f4f7',
    buttonShape: 'sharp',
    font: 'oswald',
    cardRadius: 4,
  },
  Component: FitnessSite,
};
