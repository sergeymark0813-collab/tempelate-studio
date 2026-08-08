import { Clock, MapPin, Phone, Wine } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, Media, Section, Stars } from './ui';

const NAV = ['Меню', 'Винная карта', 'О ресторане', 'Бронь'];

const HIGHLIGHTS = [
  { icon: Wine, title: 'Винная карта', text: '180 позиций, сомелье в зале каждый вечер' },
  { icon: Clock, title: 'Открытая кухня', text: 'Дровяная печь и гриль на виду у гостей' },
  { icon: MapPin, title: 'Терраса', text: 'Вид на реку, 40 мест, работает до октября' },
];

const MENU = [
  {
    group: 'Холодные закуски',
    items: [
      ['Тартар из говядины, копчёный желток', '890'],
      ['Сельдь по-домашнему, картофель, укроп', '520'],
      ['Тыква, козий сыр, кедровый орех', '640'],
    ],
  },
  {
    group: 'Из печи',
    items: [
      ['Каре ягнёнка, баклажан, мята', '1 940'],
      ['Дорада целиком, лимон, тимьян', '1 680'],
      ['Корневые овощи, сливочный соус', '780'],
    ],
  },
];

function RestaurantSite() {
  return (
    <div className="tpl">
      {/* hero */}
      <div className="relative">
        <Media variant="mesh" seed={3} radius="none" className="absolute inset-0" overlay />
        <div className="relative">
          <header className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-6 @2xl:px-10">
            <span className="t-head text-xl tracking-[0.3em] uppercase">Тракт</span>
            <nav className="hidden gap-8 text-sm @3xl:flex">
              {NAV.map((item) => (
                <span key={item} className="opacity-80">
                  {item}
                </span>
              ))}
            </nav>
            <span className="hidden items-center gap-2 text-sm @xl:flex">
              <Phone size={14} /> +7 900 000-00-00
            </span>
          </header>

          <div className="mx-auto max-w-[1180px] px-6 pt-20 pb-28 text-center @2xl:px-10 @2xl:pt-32 @2xl:pb-40">
            <Eyebrow className="text-center">Ресторан авторской кухни · с 2014</Eyebrow>
            <h1 className="mx-auto mt-6 max-w-[22ch] text-[3rem] @2xl:text-[4.2rem] @5xl:text-[5rem]">
              Огонь, дым и сезонные продукты
            </h1>
            <p className="mx-auto mt-7 max-w-[46ch] text-[1.05rem] opacity-75">
              Меню меняется каждые шесть недель — вслед за тем, что привозят фермеры и рыбаки.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Btn size="lg">Забронировать стол</Btn>
              <Btn size="lg" variant="outline">
                Смотреть меню
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {/* highlights */}
      <Section pad="py-14" className="t-border-b">
        <div className="grid gap-10 @3xl:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <Icon size={22} className="t-primary mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg">{title}</h3>
                <p className="mt-1.5 text-sm t-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* menu */}
      <Section>
        <div className="text-center">
          <Eyebrow className="text-center">Меню сезона</Eyebrow>
          <h2 className="mt-4 text-[2.2rem] @2xl:text-[3rem]">Что на столе в этом месяце</h2>
        </div>

        <div className="mt-14 grid gap-14 @3xl:grid-cols-2 @3xl:gap-20">
          {MENU.map(({ group, items }) => (
            <div key={group}>
              <h3 className="t-primary text-sm font-bold tracking-[0.2em] uppercase">{group}</h3>
              <ul className="mt-6 grid gap-5">
                {items.map(([name, price]) => (
                  <li key={name} className="flex items-baseline">
                    <span className="max-w-[26ch] text-[1.02rem]">{name}</span>
                    <span className="t-leader" />
                    <span className="t-head shrink-0 text-lg">{price} ₽</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Btn variant="outline">Полное меню · PDF</Btn>
        </div>
      </Section>

      {/* chef */}
      <div className="t-surface t-border-t t-border-b">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 py-20 @2xl:px-10 @4xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Media variant="portrait" seed={7} radius="card-lg" className="aspect-4/5 w-full" />
          <div>
            <Eyebrow>Шеф-повар</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Дмитрий Ковач</h2>
            <p className="mt-6 text-[1.05rem] t-muted">
              Десять лет в ресторанах Будапешта и Тбилиси. Готовит просто: минимум соусов, максимум
              продукта и правильный огонь.
            </p>
            <blockquote className="t-head mt-8 border-l-2 pl-6 text-[1.35rem] leading-snug"
              style={{ borderColor: 'var(--tp-primary)' }}
            >
              «Хорошая еда начинается на рынке, а не на кухне.»
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <Stars value={5} size={16} />
              <span className="text-sm t-muted">4.9 на основе 1 240 отзывов</span>
            </div>
          </div>
        </div>
      </div>

      {/* reservation */}
      <Section>
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:gap-20">
          <div>
            <Eyebrow>Бронирование</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Оставьте заявку — перезвоним</h2>
            <p className="mt-5 t-muted">
              Для компаний больше шести человек и банкетов свяжитесь с нами по телефону.
            </p>
            <dl className="mt-10 grid gap-5 text-sm">
              {[
                ['Адрес', 'Набережная 14, Москва'],
                ['Часы работы', 'Пн–Чт 12:00–23:00 · Пт–Вс 12:00–01:00'],
                ['Телефон', '+7 900 000-00-00'],
              ].map(([label, value]) => (
                <div key={label} className="t-border-b flex justify-between gap-6 pb-4">
                  <dt className="t-faint">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="t-card t-shadow p-7 @2xl:p-9">
            <div className="grid gap-4">
              <div className="grid gap-4 @xl:grid-cols-2">
                <input className="t-input" placeholder="Имя" />
                <input className="t-input" placeholder="Телефон" />
              </div>
              <div className="grid gap-4 @xl:grid-cols-2">
                <input className="t-input" placeholder="Дата" />
                <input className="t-input" placeholder="Время" />
              </div>
              <input className="t-input" placeholder="Гостей" />
              <textarea className="t-input min-h-24" placeholder="Пожелания" />
              <Btn size="lg" className="w-full">
                Забронировать
              </Btn>
              <p className="text-center text-xs t-faint">
                Нажимая кнопку, вы соглашаетесь с политикой обработки данных
              </p>
            </div>
          </div>
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-14 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <div className="t-head text-lg tracking-[0.3em] uppercase">Тракт</div>
            <p className="mt-3 text-sm opacity-60">Ресторан авторской кухни на набережной.</p>
          </div>
          <div className="text-sm opacity-70">
            <div>Набережная 14, Москва</div>
            <div className="mt-2">+7 900 000-00-00</div>
            <div className="mt-2">hello@trakt.ru</div>
          </div>
          <div className="text-sm opacity-70">
            <div>Пн–Чт 12:00–23:00</div>
            <div className="mt-2">Пт–Вс 12:00–01:00</div>
            <div className="mt-4 opacity-60">© 2026 Тракт</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const restaurant: TemplateDefinition = {
  id: 'restaurant',
  name: 'Тракт',
  category: 'Ресторан',
  description:
    'Атмосферный сайт ресторана: полноэкранная обложка, меню с ценами и форма бронирования.',
  tags: ['ресторан', 'кухня', 'меню', 'бронирование', 'еда'],
  defaults: {
    primary: '#c8a45c',
    secondary: '#8f5a3c',
    button: '#c8a45c',
    background: '#141110',
    text: '#f4ece1',
    buttonShape: 'pill',
    font: 'playfair',
    cardRadius: 6,
  },
  Component: RestaurantSite,
};
