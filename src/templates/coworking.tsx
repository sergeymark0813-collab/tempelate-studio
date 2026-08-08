import {
  Armchair,
  Bike,
  Building2,
  Coffee,
  Dog,
  Lock,
  Printer,
  Video,
  Wifi,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const PLANS = [
  { name: 'День', price: '900 ₽', unit: 'за визит', text: 'Любое свободное место в опенспейсе', perks: ['09:00–22:00', 'Кофе включён'] },
  { name: 'Гибкий', price: '11 900 ₽', unit: 'в месяц', text: 'Опенспейс без закрепления места', perks: ['Круглосуточно', '4 часа переговорной'], featured: true },
  { name: 'Своё место', price: '18 500 ₽', unit: 'в месяц', text: 'Закреплённый стол, монитор и тумба', perks: ['Круглосуточно', '8 часов переговорной'] },
  { name: 'Кабинет', price: 'от 62 000 ₽', unit: 'в месяц', text: 'Изолированный офис на 4–10 человек', perks: ['Своя вывеска', 'Переговорная без лимита'] },
];

const LEGEND = [
  ['Опенспейс', '64 места', 'var(--tp-primary)'],
  ['Кабинеты', '11 офисов', 'var(--tp-secondary)'],
  ['Переговорные', '4 комнаты', 'var(--tp-border-strong)'],
  ['Кухня и лаундж', '2 зоны', 'var(--tp-faint)'],
] as const;

const AMENITIES = [
  [Wifi, 'Wi-Fi 6, 1 Гбит/с'],
  [Coffee, 'Кофе и чай без лимита'],
  [Video, 'Кабинки для звонков'],
  [Printer, 'Печать и сканирование'],
  [Lock, 'Локеры с кодом'],
  [Armchair, 'Лаундж и душ'],
  [Bike, 'Велопарковка'],
  [Dog, 'Можно с собакой'],
] as const;

const EVENTS = [
  ['18 июня', 'Завтрак с юристом: договоры для фрилансера', '09:30'],
  ['25 июня', 'Демо-день резидентов: 8 проектов по 5 минут', '19:00'],
  ['02 июля', 'Воркшоп: как считать юнит-экономику', '18:30'],
];

function CoworkingSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Building2 size={20} className="t-primary" strokeWidth={1.6} />
            <span className="t-head text-xl">Этаж</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Тарифы', 'План этажа', 'Удобства', 'События', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Записаться на экскурсию</Btn>
        </div>
      </header>

      {/* hero with a live availability card */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Коворкинг на Бауманской · 1 200 м²</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
              Рабочее место, за которое не стыдно перед клиентом
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Тихий опенспейс, четыре переговорные и кофе, за который не хочется извиняться. Пробный
              день — бесплатно, без карты и подписки.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Забрать пробный день</Btn>
              <Btn size="lg" variant="outline">
                Посмотреть план этажа
              </Btn>
            </div>
          </div>

          <div className="t-card t-shadow p-6 @2xl:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="t-head text-lg">Свободно сейчас</span>
              <span className="flex items-center gap-2 text-xs font-semibold t-primary">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: 'var(--tp-primary)' }}
                />
                обновлено минуту назад
              </span>
            </div>
            <div className="mt-6 grid gap-4 @xl:grid-cols-2">
              {[
                ['17', 'мест в опенспейсе'],
                ['3', 'кабинета'],
                ['2', 'переговорные'],
                ['0', 'очередь на локеры'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="t-r-card-sm p-4"
                  style={{ background: 'var(--tp-primary-tint)' }}
                >
                  <div className="t-head text-3xl t-primary">{value}</div>
                  <div className="mt-1 text-sm t-muted">{label}</div>
                </div>
              ))}
            </div>
            <div className="t-border-t mt-6 flex flex-wrap items-center justify-between gap-3 pt-5">
              <span className="text-sm t-muted">Ближайшая экскурсия — сегодня в 16:00</span>
              <Btn size="sm" variant="soft">
                Записаться
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* plans — four compact columns */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Тарифы</h2>
            <span className="text-sm t-muted">Без депозита. Расторжение — за 14 дней</span>
          </div>
          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="t-card flex flex-col p-6"
                style={{
                  background: 'var(--tp-bg)',
                  ...(plan.featured
                    ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' }
                    : null),
                }}
              >
                {plan.featured && <span className="t-chip mb-4 self-start">Хит</span>}
                <h3 className="text-[1.25rem]">{plan.name}</h3>
                <div className="mt-3">
                  <span className="t-head text-2xl t-primary">{plan.price}</span>
                  <span className="text-sm t-muted"> {plan.unit}</span>
                </div>
                <p className="mt-3 text-sm t-muted">{plan.text}</p>
                <ul className="mt-5 grid flex-1 gap-2 text-sm">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="t-muted">
                      · {perk}
                    </li>
                  ))}
                </ul>
                <Btn className="mt-6 w-full" variant={plan.featured ? 'solid' : 'outline'} size="sm">
                  Выбрать
                </Btn>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* floor plan + legend */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">План этажа</h2>
            <Media variant="plan" seed={4} radius="card-lg" className="mt-8 aspect-16/10 w-full" />
          </div>
          <div className="@4xl:pt-24">
            <div className="grid gap-5">
              {LEGEND.map(([zone, count, color]) => (
                <div key={zone} className="t-border-b flex items-center gap-4 pb-5">
                  <span
                    className="t-r-card-sm h-8 w-8 shrink-0"
                    style={{ background: color, opacity: 0.85 }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{zone}</div>
                    <div className="text-sm t-muted">{count}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm t-muted">
              Третий этаж бизнес-центра «Бауманский». Отдельный вход, лифт и пандус.
            </p>
          </div>
        </div>
      </Section>

      {/* amenities — chip grid */}
      <div style={{ background: 'var(--tp-secondary-tint)' }} className="t-border-t t-border-b">
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Всё включено в тариф</h2>
          <div className="mt-10 grid gap-3 @xl:grid-cols-2 @4xl:grid-cols-4">
            {AMENITIES.map(([Icon, label]) => (
              <div
                key={label}
                className="t-r-btn flex items-center gap-3 px-4 py-3.5"
                style={{ background: 'var(--tp-bg)', border: '1px solid var(--tp-border)' }}
              >
                <Icon size={18} className="t-primary shrink-0" strokeWidth={1.7} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* community events */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] @4xl:gap-14">
          <div>
            <div className="t-eyebrow">Сообщество</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.4rem]">
              240 резидентов, которые здороваются
            </h2>
            <p className="mt-5 t-muted">
              Раз в неделю проводим что-то полезное. Вход для резидентов бесплатный, гостям — по
              записи.
            </p>
          </div>
          <div>
            {EVENTS.map(([date, title, time], i) => (
              <div
                key={title}
                className={`flex flex-wrap items-center gap-4 py-5 @2xl:gap-6 ${
                  i > 0 ? 't-border-t' : 't-border-t'
                }`}
              >
                <div
                  className="t-r-card-sm px-3 py-2 text-center"
                  style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                >
                  <div className="text-sm font-bold whitespace-nowrap">{date}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{title}</div>
                  <div className="mt-0.5 text-sm t-muted">Начало в {time}</div>
                </div>
                <Btn size="sm" variant="outline">
                  Прийти
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* tour CTA */}
      <div className="t-inverse">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-16 @2xl:px-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Приходите на пробный день</h2>
            <p className="mt-4 opacity-70">
              Покажем этаж, дадим место на весь день и кофе. Без обязательств — если не подойдёт,
              просто уйдёте.
            </p>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            <input className="t-input" placeholder="Имя" />
            <input className="t-input" placeholder="Телефон" />
            <select className="t-input @xl:col-span-2">
              <option>Интересует: гибкий тариф</option>
              <option>Интересует: своё место</option>
              <option>Интересует: кабинет</option>
            </select>
            <Btn size="lg" variant="inverse" className="@xl:col-span-2">
              Забронировать день
            </Btn>
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Этаж</span>
            <p className="mt-3 text-sm t-muted">
              Коворкинг на Бауманской. Работаем с 2019 года, 240 резидентов.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>Москва, Бауманская 7, 3 этаж</div>
            <div className="mt-2">Опенспейс 09:00–22:00</div>
            <div className="mt-1">Резидентам — 24/7 по карте</div>
          </div>
          <div className="text-sm t-muted">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">hello@etazh.space</div>
            <div className="mt-4 t-faint">© 2026 Коворкинг «Этаж»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const coworking: TemplateDefinition = {
  id: 'coworking',
  name: 'Этаж',
  category: 'Коворкинг',
  description:
    'Сайт коворкинга: карточка свободных мест, четыре тарифа, план этажа с легендой и события.',
  tags: ['коворкинг', 'офис', 'аренда', 'рабочее место', 'переговорная', 'резиденты'],
  defaults: {
    primary: '#16a34a',
    secondary: '#facc15',
    button: '#16a34a',
    background: '#ffffff',
    text: '#12211a',
    buttonShape: 'soft',
    font: 'manrope',
    cardRadius: 14,
  },
  Component: CoworkingSite,
};
