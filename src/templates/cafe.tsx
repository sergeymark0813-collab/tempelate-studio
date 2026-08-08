import { Coffee, Croissant, Instagram, MapPin, Music } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, Media, Section } from './ui';

const TODAY = [
  { icon: Coffee, title: 'Кения Kirinyaga', text: 'Смородина, гибискус, чистая кислотность', price: '260 ₽' },
  { icon: Croissant, title: 'Круассан с миндалём', text: 'Печём каждое утро в 7:30', price: '210 ₽' },
  { icon: Music, title: 'Винил по четвергам', text: 'Приносите свои пластинки — поставим', price: 'бесплатно' },
];

const MENU = [
  {
    group: 'Кофе',
    items: [
      ['Эспрессо', '150'],
      ['Капучино', '240'],
      ['Фильтр V60', '260'],
      ['Флэт уайт', '250'],
    ],
  },
  {
    group: 'Не кофе',
    items: [
      ['Какао на овсяном', '250'],
      ['Матча-латте', '290'],
      ['Лимонад дня', '220'],
      ['Чай листовой', '190'],
    ],
  },
  {
    group: 'Еда',
    items: [
      ['Сырники со сметаной', '390'],
      ['Овсяная каша, груша', '320'],
      ['Сэндвич с индейкой', '430'],
      ['Чизкейк', '340'],
    ],
  },
];

function CafeSite() {
  return (
    <div className="tpl">
      {/* hero */}
      <div className="relative">
        <Media variant="dots" seed={2} radius="none" className="absolute inset-0" />
        <div className="relative mx-auto max-w-[1100px] px-6 py-14 text-center @2xl:px-10 @2xl:py-20">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="t-primary" /> Гоголевский 8
            </span>
            <span className="hidden gap-6 @2xl:flex t-muted">
              {['Меню', 'О нас', 'Обжарка', 'Контакты'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
            <span className="flex items-center gap-2">
              <Instagram size={15} className="t-primary" /> @zerno
            </span>
          </div>

          <div className="mt-16 @2xl:mt-24">
            <div
              className="mx-auto grid h-20 w-20 place-items-center rounded-full"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              <Coffee size={34} strokeWidth={1.5} />
            </div>
            <h1 className="mt-8 text-[3rem] tracking-tight @2xl:text-[4.6rem]">ЗЕРНО</h1>
            <p className="mx-auto mt-5 max-w-[40ch] text-[1.05rem] t-muted">
              Маленькая кофейня и обжарка на Гоголевском. Варим на своём зерне с 2018 года.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Btn size="lg">Смотреть меню</Btn>
              <Btn size="lg" variant="outline">
                Купить зерно
              </Btn>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm t-muted">
              <span>Пн–Пт 07:30–21:00</span>
              <span>Сб–Вс 09:00–22:00</span>
              <span>Wi-Fi · розетки · веранда</span>
            </div>
          </div>
        </div>
      </div>

      {/* today */}
      <Section className="t-border-t" inner="max-w-[1100px]">
        <Eyebrow>Сегодня в кофейне</Eyebrow>
        <div className="mt-8 grid gap-5 @2xl:grid-cols-3">
          {TODAY.map(({ icon: Icon, title, text, price }) => (
            <div key={title} className="t-card p-7">
              <div className="flex items-start justify-between">
                <Icon size={24} className="t-primary" strokeWidth={1.5} />
                <span className="t-head text-lg">{price}</span>
              </div>
              <h3 className="mt-6 text-lg">{title}</h3>
              <p className="mt-2 text-sm t-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* menu board */}
      <div className="t-inverse">
        <div className="mx-auto max-w-[1100px] px-6 py-16 @2xl:px-10 @2xl:py-20">
          <div className="text-center">
            <div className="text-xs tracking-[0.25em] uppercase opacity-60">меню</div>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.7rem]">Что налить и что съесть</h2>
          </div>
          <div className="mt-12 grid gap-10 @2xl:grid-cols-3 @2xl:gap-12">
            {MENU.map(({ group, items }) => (
              <div key={group}>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase opacity-70">{group}</h3>
                <ul className="mt-5 grid gap-3.5">
                  {items.map(([name, price]) => (
                    <li key={name} className="flex items-baseline text-[0.98rem]">
                      <span>{name}</span>
                      <span
                        className="mx-3 flex-1 -translate-y-1"
                        style={{ borderBottom: '1px dashed currentColor', opacity: 0.3 }}
                      />
                      <span className="t-head shrink-0">{price} ₽</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* story */}
      <Section inner="max-w-[1100px]">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-16">
          <div className="grid grid-cols-2 gap-4">
            <Media variant="mesh" seed={4} radius="card-lg" className="aspect-3/4 w-full" />
            <Media variant="rings" seed={6} radius="card-lg" className="mt-8 aspect-3/4 w-full" />
          </div>
          <div>
            <Eyebrow>Про нас</Eyebrow>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">Обжариваем сами, в 300 метрах</h2>
            <div className="mt-6 grid gap-4 t-muted">
              <p>
                Начинали с одной кофемашины и десяти мест. Сейчас у нас своя обжарка, четыре сорта
                на фильтре и постоянная эспрессо-смесь.
              </p>
              <p>
                Зерно берём напрямую у ферм в Кении, Колумбии и Эфиопии. Каждую партию прожариваем
                небольшими объёмами — на полке всегда свежее.
              </p>
            </div>
            <div className="mt-8 grid gap-6 @xl:grid-cols-3">
              {[
                ['8 лет', 'на Гоголевском'],
                ['4 сорта', 'на фильтре'],
                ['1 200 кг', 'обжарки в год'],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="t-head text-2xl t-primary">{value}</div>
                  <div className="text-sm t-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* gallery strip */}
      <div className="grid grid-cols-2 gap-1 @3xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Media
            key={i}
            variant={(['stripes', 'dish', 'mesh', 'dots'] as const)[i]}
            seed={i + 9}
            radius="none"
            className="aspect-square w-full"
          />
        ))}
      </div>

      {/* location */}
      <Section inner="max-w-[1100px]">
        <div className="t-card grid gap-8 overflow-hidden @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="p-8 @2xl:p-12">
            <Eyebrow>Как найти</Eyebrow>
            <h2 className="mt-4 text-[1.8rem] @2xl:text-[2.3rem]">Гоголевский бульвар, 8</h2>
            <p className="mt-5 t-muted">
              Вход со двора, вторая арка от метро «Кропоткинская». Есть веранда на шесть столов и
              место для коляски.
            </p>
            <div className="mt-8 grid gap-3 text-sm">
              <span>Пн–Пт 07:30–21:00 · Сб–Вс 09:00–22:00</span>
              <span>+7 900 000-00-00</span>
              <span>hello@zerno.coffee</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn>Построить маршрут</Btn>
              <Btn variant="outline">Забронировать стол</Btn>
            </div>
          </div>
          <Media variant="plan" seed={12} radius="none" className="min-h-[280px] w-full" />
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-widest">ЗЕРНО</span>
          <span>Гоголевский бульвар 8, Москва</span>
          <span>© 2026 Зерно</span>
        </div>
      </footer>
    </div>
  );
}

export const cafe: TemplateDefinition = {
  id: 'cafe',
  name: 'Зерно',
  category: 'Кафе',
  description:
    'Уютный сайт кофейни: центрированная обложка, меню-борд на инверсном фоне и адрес с картой.',
  tags: ['кафе', 'кофейня', 'кофе', 'завтраки', 'меню'],
  defaults: {
    primary: '#7a4b28',
    secondary: '#c98a3f',
    button: '#7a4b28',
    background: '#fbf6ee',
    text: '#2a1c10',
    buttonShape: 'rounded',
    font: 'golos',
    cardRadius: 20,
  },
  Component: CafeSite,
};
