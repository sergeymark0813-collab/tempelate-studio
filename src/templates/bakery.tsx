import { Cake, Clock, Leaf, ShoppingBag, Truck } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const HERO_ROUNDS = [
  ['Бенто-торты', 'от 1 200 ₽'],
  ['Эклеры', 'от 180 ₽'],
  ['Чизкейки', 'от 2 400 ₽'],
];

const BESTSELLERS = [
  ['Морковный с апельсином', '1,2 кг', '2 900 ₽', 'Влажные коржи, крем-чиз, цукаты'],
  ['Фисташка и малина', '1,4 кг', '3 600 ₽', 'Фисташковый бисквит, свежая малина'],
  ['Три шоколада', '1,5 кг', '3 400 ₽', 'Бельгийский шоколад, без муки'],
];

const BUILDER = [
  ['Форма', ['Круглый', 'Квадрат', 'Бенто', 'Ярусный']],
  ['Начинка', ['Ваниль', 'Фисташка', 'Шоколад', 'Лимон']],
  ['Декор', ['Минимализм', 'Цветы', 'Фрукты', 'Надпись']],
] as const;

const DELIVERY = [
  [Truck, 'Доставка от 2 часов', 'По Москве в пределах МКАД — 400 ₽, от 4 000 ₽ бесплатно'],
  [Clock, 'Заказ на дату', 'Сложные торты просим заказывать за 2 дня'],
  [Leaf, 'Состав без спреда', 'Только сливочное масло, свежие сливки и сезонные фрукты'],
] as const;

function BakerySite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Cake size={20} className="t-primary" strokeWidth={1.6} />
            <span className="t-head text-xl">Мука и Соль</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @3xl:flex">
            {['Торты', 'Десерты', 'Свой торт', 'Доставка'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">
            <ShoppingBag size={14} /> Корзина · 0
          </Btn>
        </div>
      </header>

      {/* hero — centred, with three round product shots */}
      <Section pad="pt-14 pb-10 @2xl:pt-20" inner="max-w-[1160px]">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="t-chip">Кондитерская · доставка по Москве</span>
          <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
            Торты, которые не приходится доедать из вежливости
          </h1>
          <p className="mt-6 t-muted">
            Печём каждый день небольшими партиями. Собираем торт под ваш повод — от бенто на двоих
            до ярусного на сто гостей.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn size="lg">Выбрать торт</Btn>
            <Btn size="lg" variant="ghost">
              Собрать свой
            </Btn>
          </div>
        </div>

        <div className="mt-14 grid gap-8 @xl:grid-cols-3">
          {HERO_ROUNDS.map(([title, price], i) => (
            <div key={title} className="text-center">
              <Media
                variant={i === 1 ? 'dish' : 'product'}
                seed={i + 2}
                radius="pill"
                className="mx-auto aspect-square w-full max-w-[240px]"
              />
              <h3 className="mt-5 text-[1.2rem]">{title}</h3>
              <div className="mt-1 text-sm t-primary font-semibold">{price}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* bestsellers */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-secondary-tint)' }}>
        <Section inner="max-w-[1160px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что заказывают чаще всего</h2>
            <span className="text-sm t-muted">Цены за торт целиком</span>
          </div>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {BESTSELLERS.map(([name, weight, price, text], i) => (
              <article
                key={name}
                className="t-card overflow-hidden"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Media variant="dish" seed={i + 6} radius="none" className="aspect-4/3 w-full" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[1.15rem]">{name}</h3>
                    <span className="shrink-0 text-xs t-faint">{weight}</span>
                  </div>
                  <p className="mt-2 text-sm t-muted">{text}</p>
                  <div className="t-border-t mt-5 flex items-center justify-between gap-3 pt-5">
                    <span className="t-head text-xl t-primary">{price}</span>
                    <Btn size="sm">В корзину</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* cake builder — chip rows */}
      <Section inner="max-w-[1160px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @4xl:gap-14">
          <div>
            <div className="t-eyebrow">Свой торт</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">Соберите за три шага</h2>
            <p className="mt-5 t-muted">
              Выберите форму, начинку и декор — кондитер перезвонит, уточнит детали и назовёт точную
              цену. Дегустация начинок в кондитерской бесплатна.
            </p>
            <div className="t-border-t mt-8 grid gap-4 pt-8 text-sm">
              {[
                ['Бенто на 2 персоны', 'от 1 200 ₽'],
                ['Торт 1,5 кг · 8–10 человек', 'от 3 200 ₽'],
                ['Ярусный · от 30 человек', 'от 9 800 ₽'],
              ].map(([label, price]) => (
                <div key={label} className="flex items-baseline">
                  <span>{label}</span>
                  <span className="t-leader" />
                  <span className="font-semibold t-primary">{price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="t-card p-7 @2xl:p-8">
            {BUILDER.map(([label, options], i) => (
              <div key={label} className={i > 0 ? 't-border-t mt-6 pt-6' : undefined}>
                <div className="text-xs tracking-[0.14em] uppercase t-faint">
                  Шаг {i + 1} · {label}
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {options.map((option, oi) => (
                    <span
                      key={option}
                      className="t-r-pill px-4 py-2 text-sm font-semibold"
                      style={
                        oi === 0
                          ? { background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }
                          : {
                              background: 'var(--tp-bg)',
                              color: 'var(--tp-muted)',
                              border: '1px solid var(--tp-border)',
                            }
                      }
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="t-border-t mt-6 grid gap-3 pt-6 @xl:grid-cols-2">
              <input className="t-input" placeholder="Дата события" />
              <input className="t-input" placeholder="Телефон" />
              <Btn size="lg" className="@xl:col-span-2">
                Рассчитать мой торт
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* delivery info */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1160px]">
          <div className="grid gap-8 @xl:grid-cols-3">
            {DELIVERY.map(([Icon, title, text]) => (
              <div key={title} className="flex gap-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                  style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                >
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1.5 text-sm t-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* photo strip */}
      <div className="grid grid-cols-2 gap-2 p-2 @3xl:grid-cols-4">
        {(['product', 'dish', 'mesh', 'dots'] as const).map((v, i) => (
          <Media key={v} variant={v} seed={i + 11} className="aspect-square w-full" />
        ))}
      </div>

      {/* reviews + address */}
      <Section inner="max-w-[1160px]">
        <div className="grid gap-6 @3xl:grid-cols-3">
          {[
            ['«Заказала бенто за день до дня рождения — привезли к 9 утра, коробка как из журнала.»', 'Настя'],
            ['«Фисташковый — лучший в городе, проверено четырьмя днями рождения подряд.»', 'Кирилл'],
            ['«Собирали ярусный на 60 человек. Уложились в бюджет и ни один гость не отказался от второго куска.»', 'Мария'],
          ].map(([quote, author]) => (
            <blockquote key={author} className="t-card p-6">
              <p className="text-[0.98rem]">{quote}</p>
              <footer className="mt-4 text-sm t-primary font-semibold">{author}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1160px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <span className="t-head text-lg">Мука и Соль</span>
            <p className="mt-3 text-sm opacity-70">
              Кондитерская на Мясницкой. Печём с 2018 года, доставляем по Москве каждый день.
            </p>
          </div>
          <div className="text-sm opacity-80">
            <div>Москва, Мясницкая 18</div>
            <div className="mt-2">Ежедневно 09:00–21:00</div>
            <div className="mt-2">+7 900 000-00-00</div>
          </div>
          <div className="text-sm opacity-80">
            <div>order@mukaisol.ru</div>
            <div className="mt-2">Telegram · WhatsApp</div>
            <div className="mt-4 opacity-70">© 2026 Мука и Соль</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const bakery: TemplateDefinition = {
  id: 'bakery',
  name: 'Мука и Соль',
  category: 'Кондитерская',
  description:
    'Сайт кондитерской с доставкой: круглые витрины, хиты продаж и конструктор торта в три шага.',
  tags: ['кондитерская', 'торты', 'десерты', 'доставка', 'выпечка', 'заказ'],
  defaults: {
    primary: '#2f7d6b',
    secondary: '#f0a5b5',
    button: '#2f7d6b',
    background: '#fffaf5',
    text: '#2c2320',
    buttonShape: 'rounded',
    font: 'golos',
    cardRadius: 24,
  },
  Component: BakerySite,
};
