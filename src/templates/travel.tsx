import { Check, Compass, MapPin, Minus, Plane, Star, Users } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const TOURS = [
  {
    name: 'Дагестан: горы и Каспий',
    days: '7 дней',
    group: 'до 12 человек',
    price: '89 000 ₽',
    rating: '4,9',
    left: 'осталось 4 места',
    variant: 'mesh' as const,
  },
  {
    name: 'Камчатка: вулканы и океан',
    days: '10 дней',
    group: 'до 8 человек',
    price: '214 000 ₽',
    rating: '5,0',
    left: 'осталось 2 места',
    variant: 'rings' as const,
  },
  {
    name: 'Грузия: вино и Сванетия',
    days: '8 дней',
    group: 'до 14 человек',
    price: '112 000 ₽',
    rating: '4,8',
    left: 'набор открыт',
    variant: 'dots' as const,
  },
];

const DESTINATIONS = [
  ['Алтай', 'от 74 000 ₽'],
  ['Байкал', 'от 96 000 ₽'],
  ['Карелия', 'от 48 000 ₽'],
  ['Армения', 'от 88 000 ₽'],
  ['Узбекистан', 'от 104 000 ₽'],
  ['Кыргызстан', 'от 118 000 ₽'],
];

const ITINERARY = [
  ['День 1', 'Махачкала', 'Встреча в аэропорту, ужин с местной кухней, вечерняя прогулка по набережной.'],
  ['День 2–3', 'Сулакский каньон', 'Катер по каньону, барханы Сарыкум, ночь на базе с видом на горы.'],
  ['День 4', 'Гуниб и Гамсутль', 'Подъём к заброшенному аулу, обед в горском доме.'],
  ['День 5–6', 'Дербент', 'Крепость Нарын-Кала, старые кварталы, дегустация на винодельне.'],
  ['День 7', 'Каспий', 'Свободное утро на побережье и вылет домой.'],
];

const INCLUDED = [
  'Проживание в отелях и на базах',
  'Транспорт на все переезды',
  'Завтраки и 4 ужина',
  'Гид-сопровождающий на весь тур',
  'Входные билеты и катер',
];

const EXCLUDED = ['Авиабилеты до Махачкалы', 'Обеды в свободные дни', 'Личные расходы и сувениры'];

function TravelSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Compass size={21} className="t-primary" strokeWidth={1.6} />
            <span className="t-head text-xl">Компас</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Туры', 'Направления', 'Отзывы', 'О нас', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-semibold @2xl:inline">+7 900 000-00-00</span>
            <Btn size="sm">Подобрать тур</Btn>
          </div>
        </div>
      </header>

      {/* hero — text left, collage right */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Малые группы · авторские маршруты</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
              Путешествия, где не нужно ничего планировать
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Группы до 14 человек, гид на весь маршрут и логистика, продуманная до пересадки.
              Возврат 100% при отмене за 21 день.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Смотреть туры 2026</Btn>
              <Btn size="lg" variant="ghost">
                Подобрать по бюджету
              </Btn>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                ['11 лет', 'водим группы'],
                ['4 800', 'путешественников'],
                ['4,9', 'средняя оценка'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="t-head text-2xl t-primary">{v}</div>
                  <div className="text-sm t-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Media variant="mesh" seed={1} radius="card-lg" className="aspect-3/4 w-full" />
            <div className="grid gap-4">
              <Media variant="rings" seed={5} radius="card-lg" className="aspect-square w-full" />
              <Media variant="dots" seed={8} radius="card-lg" className="aspect-square w-full" />
            </div>
          </div>
        </div>
      </Section>

      {/* featured tour — one wide card */}
      <Section pad="pb-4" inner="max-w-[1200px]">
        <div className="t-card overflow-hidden @4xl:grid @4xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Media variant="stripes" seed={3} radius="none" className="min-h-[240px] w-full" />
          <div className="p-7 @2xl:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="t-r-pill px-3 py-1.5 text-xs font-bold"
                style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
              >
                Тур месяца
              </span>
              <span className="flex items-center gap-1.5 text-sm t-muted">
                <Star size={14} className="t-secondary" fill="currentColor" /> 4,9 · 62 отзыва
              </span>
            </div>
            <h2 className="mt-5 text-[1.7rem] @2xl:text-[2.2rem]">Плато Путорана: 9 дней вне сети</h2>
            <p className="mt-4 t-muted">
              Заброска вертолётом, водопады, каньоны и полное отсутствие связи. Самый требовательный
              и самый обсуждаемый маршрут в нашем расписании.
            </p>
            <div className="t-border-t mt-7 grid gap-4 pt-6 @xl:grid-cols-3">
              {[
                ['9 дней', 'длительность'],
                ['до 8 чел.', 'размер группы'],
                ['средняя', 'физподготовка'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-semibold">{v}</div>
                  <div className="text-sm t-muted">{l}</div>
                </div>
              ))}
            </div>
            <div className="t-border-t mt-6 flex flex-wrap items-center justify-between gap-4 pt-6">
              <div>
                <span className="t-head text-2xl t-primary">268 000 ₽</span>
                <span className="text-sm t-muted"> / человек</span>
              </div>
              <Btn size="lg">Забронировать место</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* tours grid */}
      <Section inner="max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Ближайшие туры</h2>
          <span className="text-sm t-muted">Набор на июнь — сентябрь</span>
        </div>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {TOURS.map((tour, i) => (
            <article key={tour.name} className="t-card flex flex-col overflow-hidden">
              <Media variant={tour.variant} seed={i + 10} radius="none" className="aspect-4/3 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-sm">
                  <Star size={14} className="t-secondary" fill="currentColor" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="t-faint">·</span>
                  <span className="t-muted">{tour.left}</span>
                </div>
                <h3 className="mt-3 text-[1.2rem]">{tour.name}</h3>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm t-muted">
                  <span className="flex items-center gap-1.5">
                    <Plane size={14} /> {tour.days}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} /> {tour.group}
                  </span>
                </div>
                <div className="t-border-t mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="t-head text-lg">{tour.price}</span>
                  <Btn size="sm">Подробнее</Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* destinations tiles */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Куда ещё возим</h2>
          <div className="mt-10 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
            {DESTINATIONS.map(([name, price], i) => (
              <div key={name} className="relative overflow-hidden t-r-card">
                <Media variant={i % 2 ? 'mesh' : 'rings'} seed={i + 16} radius="none" className="aspect-16/9 w-full" overlay />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span className="t-head text-xl text-white">{name}</span>
                  <span className="text-sm font-semibold text-white/90">{price}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* itinerary rail */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] @4xl:gap-14">
          <div>
            <div className="t-eyebrow">Пример программы</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.4rem]">Дагестан, 7 дней</h2>
            <p className="mt-5 t-muted">
              Так выглядит любой наш маршрут: по дням, с ночёвками и без «свободного времени» вместо
              программы.
            </p>
            <div className="mt-7 flex items-center gap-2 text-sm t-muted">
              <MapPin size={15} className="t-primary" /> 840 км по маршруту
            </div>
          </div>

          <ol className="relative">
            <span
              className="absolute top-2 bottom-2 left-[7px] w-px"
              style={{ background: 'var(--tp-border-strong)' }}
              aria-hidden
            />
            {ITINERARY.map(([day, place, text]) => (
              <li key={day} className="relative flex gap-6 pb-8 last:pb-0">
                <span
                  className="relative z-10 mt-1.5 h-4 w-4 shrink-0 rounded-full"
                  style={{ background: 'var(--tp-primary)', border: '3px solid var(--tp-bg)' }}
                />
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="t-head text-sm t-primary">{day}</span>
                    <h3 className="text-[1.2rem]">{place}</h3>
                  </div>
                  <p className="mt-2 text-[0.98rem] t-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* included / excluded */}
      <div style={{ background: 'var(--tp-primary-tint)' }} className="t-border-t t-border-b">
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что входит в стоимость</h2>
          <div className="mt-10 grid gap-10 @3xl:grid-cols-2 @3xl:gap-16">
            <div>
              <div className="text-sm font-bold tracking-wide uppercase t-primary">Включено</div>
              <ul className="mt-5 grid gap-3.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={17} className="t-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide uppercase t-faint">Не включено</div>
              <ul className="mt-5 grid gap-3.5">
                {EXCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 t-muted">
                    <Minus size={17} className="mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>

      {/* reviews */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-6 @3xl:grid-cols-2">
          {[
            ['«Впервые поехала в тур одна и ни секунды не пожалела: группа собралась такая, что до сих пор переписываемся.»', 'Ольга, Дагестан 2025'],
            ['«Вертолёт задержали на день из-за погоды — компания сама оплатила отель и перестроила программу.»', 'Илья, Путорана 2025'],
          ].map(([quote, author]) => (
            <blockquote key={author} className="t-card p-8">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={15} className="t-secondary" fill="currentColor" />
                ))}
              </div>
              <p className="mt-5 text-[1.05rem]">{quote}</p>
              <footer className="mt-5 text-sm t-muted">{author}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section inner="max-w-[1200px]" pad="pb-20">
        <div
          className="t-r-card-lg grid gap-8 p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center"
          style={{
            backgroundImage: 'linear-gradient(120deg, var(--tp-primary), var(--tp-secondary))',
            color: 'var(--tp-on-primary)',
          }}
        >
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Подберём маршрут под вас</h2>
            <p className="mt-4 max-w-[42ch] opacity-85">
              Расскажите про сроки, бюджет и формат — предложим три варианта в течение дня.
            </p>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            <input className="t-input" placeholder="Имя" />
            <input className="t-input" placeholder="Телефон" />
            <select className="t-input @xl:col-span-2">
              <option>Бюджет на человека: до 100 000 ₽</option>
              <option>Бюджет на человека: 100–200 000 ₽</option>
              <option>Бюджет на человека: свыше 200 000 ₽</option>
            </select>
            <Btn size="lg" variant="inverse" className="@xl:col-span-2">
              Получить подборку
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Компас</span>
            <p className="mt-3 text-sm t-muted">
              Авторские туры по России и ближнему зарубежью с 2015 года. Реестровый туроператор.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>Москва, Покровский б-р 8</div>
            <div className="mt-2">Пн–Сб 10:00–20:00</div>
          </div>
          <div className="text-sm t-muted">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">go@kompas-tour.ru</div>
            <div className="mt-4 t-faint">© 2026 Турклуб «Компас»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const travel: TemplateDefinition = {
  id: 'travel',
  name: 'Компас',
  category: 'Туризм',
  description:
    'Сайт турклуба: тур месяца широкой карточкой, программа по дням и разбор «включено / не включено».',
  tags: ['туризм', 'туры', 'путешествия', 'экскурсии', 'маршрут', 'бронирование'],
  defaults: {
    primary: '#c2410c',
    secondary: '#0ea5e9',
    button: '#c2410c',
    background: '#fffbf5',
    text: '#2a1a10',
    buttonShape: 'rounded',
    font: 'rubik',
    cardRadius: 18,
  },
  Component: TravelSite,
};
