import {
  Box,
  Check,
  Container,
  Package,
  Snowflake,
  Truck,
  Warehouse,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const TRACK_STEPS = [
  ['Принят на складе', 'Москва · 12 июня, 09:14', true],
  ['В пути', 'Прошёл Казань · 13 июня, 21:40', true],
  ['На сортировке', 'Екатеринбург · ожидается 14 июня', false],
  ['Доставлен', 'Тюмень · ожидается 15 июня', false],
] as const;

const SERVICES = [
  {
    icon: Truck,
    title: 'Отдельная машина (FTL)',
    text: 'Груз едет без перегрузок и попутчиков — от 1 до 22 тонн.',
    specs: ['от 1 до 22 т', 'срок 1–5 суток', 'от 38 ₽/км'],
  },
  {
    icon: Box,
    title: 'Сборный груз (LTL)',
    text: 'Платите только за свои паллеты. Отправки ежедневно.',
    specs: ['от 1 паллеты', 'срок 2–7 суток', 'от 1 900 ₽/паллета'],
  },
  {
    icon: Snowflake,
    title: 'Рефрижератор',
    text: 'Режим от −20 до +12 °C, датчики температуры с выгрузкой отчёта.',
    specs: ['−20…+12 °C', 'контроль онлайн', 'от 52 ₽/км'],
  },
  {
    icon: Container,
    title: 'Негабарит',
    text: 'Спецтехника, разрешения и согласование маршрута под ключ.',
    specs: ['до 60 т', 'разрешения включены', 'по расчёту'],
  },
];

const DIRECTIONS = [
  ['Москва — Санкт-Петербург', '710 км', 'от 24 000 ₽', '1 сутки'],
  ['Москва — Казань', '820 км', 'от 27 500 ₽', '1–2 суток'],
  ['Москва — Екатеринбург', '1 790 км', 'от 52 000 ₽', '2–3 суток'],
  ['Москва — Новосибирск', '3 350 км', 'от 96 000 ₽', '4–5 суток'],
  ['Санкт-Петербург — Краснодар', '2 100 км', 'от 61 000 ₽', '3 суток'],
];

const FLEET = [
  [Truck, '84', 'тягача в парке'],
  [Warehouse, '6', 'складов класса А'],
  [Package, '19 тыс.', 'отправок в год'],
  [Container, '12', 'рефрижераторов'],
] as const;

function LogisticsSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <span
              className="t-r-btn grid h-9 w-9 place-items-center"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              <Truck size={18} />
            </span>
            <span className="t-head text-xl">ТрансЛайн</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Услуги', 'Направления', 'Парк', 'Отслеживание', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-semibold @2xl:inline">8 800 000-00-00</span>
            <Btn size="sm">Рассчитать</Btn>
          </div>
        </div>
      </header>

      {/* hero with a live tracking card */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1220px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @4xl:items-center @4xl:gap-16">
          <div>
            <span className="t-chip">Грузоперевозки по России и ЕАЭС</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
              Груз приходит в срок. Или мы платим за просрочку
            </h1>
            <p className="mt-6 max-w-[48ch] text-[1.05rem] t-muted">
              Собственный парк из 84 машин, страхование каждой отправки и один менеджер, который
              ведёт вашу перевозку от заявки до подписанных документов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Рассчитать стоимость</Btn>
              <Btn size="lg" variant="outline">
                Отследить груз
              </Btn>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {['Страховка до 30 млн ₽', 'Документы на следующий день', 'Отсрочка платежа 30 дней'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check size={15} className="t-primary" /> {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="t-card t-shadow-lg p-6 @2xl:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.14em] uppercase t-faint">Накладная</div>
                <div className="t-head mt-1 text-xl">TL-4471-092</div>
              </div>
              <span
                className="t-r-pill px-3 py-1.5 text-xs font-bold"
                style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
              >
                В ПУТИ
              </span>
            </div>

            <div className="t-border-t mt-6 pt-6">
              {TRACK_STEPS.map(([title, meta, done], i) => (
                <div key={title} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                      style={{
                        background: done ? 'var(--tp-primary)' : 'var(--tp-surface-2)',
                        color: done ? 'var(--tp-on-primary)' : 'var(--tp-faint)',
                        border: done ? 'none' : '1px solid var(--tp-border-strong)',
                      }}
                    >
                      {done ? <Check size={13} /> : <span className="text-[10px]">{i + 1}</span>}
                    </span>
                    {i < TRACK_STEPS.length - 1 && (
                      <span
                        className="mt-1 w-px flex-1"
                        style={{ background: 'var(--tp-border-strong)', minHeight: 22 }}
                      />
                    )}
                  </div>
                  <div className="pb-1">
                    <div className={done ? 'font-semibold' : 'font-semibold t-faint'}>{title}</div>
                    <div className="mt-0.5 text-sm t-muted">{meta}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="t-border-t flex items-center justify-between gap-4 pt-5">
              <span className="text-sm t-muted">Осталось 620 км</span>
              <Btn size="sm" variant="soft">
                Подробный трек
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* services as wide rows with specs */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1220px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что перевозим</h2>
          <div className="mt-10 grid gap-4">
            {SERVICES.map(({ icon: Icon, title, text, specs }) => (
              <article
                key={title}
                className="t-card grid gap-5 p-6 @2xl:p-7 @4xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.7fr)] @4xl:items-center @4xl:gap-8"
                style={{ background: 'var(--tp-bg)' }}
              >
                <span
                  className="t-r-card-sm grid h-14 w-14 shrink-0 place-items-center"
                  style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                >
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-[1.25rem]">{title}</h3>
                  <p className="mt-1.5 text-[0.95rem] t-muted">{text}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specs.map((spec) => (
                    <span
                      key={spec}
                      className="t-r-pill px-3 py-1.5 text-xs font-semibold"
                      style={{ background: 'var(--tp-surface-2)', color: 'var(--tp-muted)' }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* directions: map + price list */}
      <Section inner="max-w-[1220px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">География</h2>
            <p className="mt-5 t-muted">
              Регулярные рейсы по 74 регионам. В таблице — самые частые направления, остальные
              считаем за 20 минут.
            </p>
            <Media variant="plan" seed={5} className="mt-8 aspect-4/3 w-full" />
          </div>

          <div className="@4xl:pt-4">
            <div className="hidden pb-4 text-xs tracking-[0.14em] uppercase t-faint @2xl:grid @2xl:grid-cols-[minmax(0,1fr)_90px_110px_90px] @2xl:gap-4">
              <span>Направление</span>
              <span>Дистанция</span>
              <span>Стоимость</span>
              <span>Срок</span>
            </div>
            {DIRECTIONS.map(([route, km, price, days]) => (
              <div
                key={route}
                className="t-border-t grid gap-1 py-4 @2xl:grid-cols-[minmax(0,1fr)_90px_110px_90px] @2xl:items-center @2xl:gap-4"
              >
                <span className="font-semibold">{route}</span>
                <span className="text-sm t-muted">{km}</span>
                <span className="text-sm font-semibold t-primary">{price}</span>
                <span className="text-sm t-muted">{days}</span>
              </div>
            ))}
            <div className="t-border-t pt-6">
              <Btn variant="outline">Все направления</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* fleet numbers */}
      <div className="t-bg-primary">
        <div className="mx-auto grid max-w-[1220px] gap-8 px-6 py-14 @2xl:px-10 @xl:grid-cols-2 @4xl:grid-cols-4">
          {FLEET.map(([Icon, value, label]) => (
            <div key={label} className="flex items-center gap-4">
              <Icon size={30} strokeWidth={1.4} className="shrink-0 opacity-70" />
              <div>
                <div className="t-head text-3xl">{value}</div>
                <div className="text-sm opacity-80">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* calculator */}
      <Section inner="max-w-[1220px]">
        <div className="t-card p-8 @2xl:p-10">
          <div className="grid gap-8 @4xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] @4xl:items-center @4xl:gap-12">
            <div>
              <h2 className="text-[1.7rem] @2xl:text-[2.2rem]">Расчёт за 20 минут</h2>
              <p className="mt-4 text-sm t-muted">
                Заполните три поля — менеджер вернётся с точной ценой и свободной машиной.
              </p>
            </div>
            <div className="grid gap-3 @2xl:grid-cols-2">
              <input className="t-input" placeholder="Откуда" />
              <input className="t-input" placeholder="Куда" />
              <input className="t-input" placeholder="Вес и объём" />
              <input className="t-input" placeholder="Телефон" />
              <Btn size="lg" className="@2xl:col-span-2">
                Получить расчёт
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1220px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">ТрансЛайн</span>
            <p className="mt-3 text-sm t-muted">
              Грузоперевозки по России и ЕАЭС с 2009 года. Лицензия и страхование ответственности.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div className="font-semibold" style={{ color: 'var(--tp-text)' }}>
              Диспетчерская
            </div>
            <div className="mt-2">8 800 000-00-00 · круглосуточно</div>
            <div className="mt-1">cargo@transline.ru</div>
          </div>
          <div className="text-sm t-muted">
            <div className="font-semibold" style={{ color: 'var(--tp-text)' }}>
              Офис
            </div>
            <div className="mt-2">Москва, Шоссейная 42, стр. 3</div>
            <div className="mt-4 t-faint">© 2026 ООО «ТрансЛайн»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const logistics: TemplateDefinition = {
  id: 'logistics',
  name: 'ТрансЛайн',
  category: 'Логистика',
  description:
    'Сайт грузоперевозок: карточка отслеживания в первом экране, тарифы по направлениям, парк.',
  tags: ['логистика', 'грузоперевозки', 'доставка', 'фура', 'склад', 'отслеживание'],
  defaults: {
    primary: '#0b3d91',
    secondary: '#f5a623',
    button: '#0b3d91',
    background: '#f5f7fa',
    text: '#0e1726',
    buttonShape: 'soft',
    font: 'montserrat',
    cardRadius: 8,
  },
  Component: LogisticsSite,
};
