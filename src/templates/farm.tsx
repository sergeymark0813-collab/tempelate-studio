import { Egg, Leaf, MapPin, Milk, Truck, Wheat, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const BOXES = [
  {
    name: 'Пробный',
    price: '2 400 ₽',
    weight: '4–5 кг',
    text: 'Познакомиться и понять, нужно ли вам это',
    items: ['Молоко 1 л', 'Творог 400 г', 'Яйца 10 шт', 'Овощи 2 кг'],
  },
  {
    name: 'Недельный',
    price: '4 900 ₽',
    weight: '9–11 кг',
    text: 'Хватает семье из трёх человек на неделю',
    items: ['Молоко 3 л', 'Сыр 500 г', 'Творог и сметана', 'Яйца 20 шт', 'Овощи 5 кг', 'Курица 1,6 кг'],
    featured: true,
  },
  {
    name: 'Большой',
    price: '8 200 ₽',
    weight: '18–20 кг',
    text: 'Для большой семьи или на две недели',
    items: ['Молочка на 2 недели', 'Мясо 3 кг', 'Овощи 8 кг', 'Зелень и ягоды', 'Хлеб на закваске'],
  },
];

const CONTENTS: { icon: LucideIcon; label: string }[] = [
  { icon: Milk, label: 'Молоко и сливки' },
  { icon: Leaf, label: 'Сезонная зелень' },
  { icon: Egg, label: 'Яйца от своих кур' },
  { icon: Wheat, label: 'Хлеб на закваске' },
];

const PRODUCTS = [
  ['Молоко, 1 л', '180 ₽'],
  ['Творог 9%, 400 г', '340 ₽'],
  ['Сметана 20%, 300 г', '290 ₽'],
  ['Сыр «Качотта», 500 г', '890 ₽'],
  ['Яйца, 10 шт', '210 ₽'],
  ['Курица, 1,6 кг', '780 ₽'],
  ['Картофель, 3 кг', '260 ₽'],
  ['Мёд, 500 г', '620 ₽'],
];

const PROMISES: { icon: LucideIcon; label: string }[] = [
  { icon: Truck, label: 'Доставка на следующий день' },
  { icon: MapPin, label: 'Своя ферма, не перекупщики' },
];

const PLANS = [
  ['Раз в неделю', 'скидка 15%', 'Привозим по пятницам'],
  ['Раз в две недели', 'скидка 10%', 'Удобно, если готовите не каждый день'],
  ['Раз в месяц', 'скидка 5%', 'Только долгохранящееся'],
];

function FarmSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Leaf size={21} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl">Своё</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Боксы', 'Продукты', 'Подписка', 'О ферме', 'Доставка'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Заказать бокс</Btn>
        </div>
      </header>

      {/* hero */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1180px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Ферма в 90 км от Москвы · Тульская область</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
              Молоко, которое доили сегодня утром
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Собираем бокс и привозим на следующий день после сбора. 42 коровы, 300 кур и никаких
              посредников между нами и вашим столом.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Собрать бокс</Btn>
              <Btn size="lg" variant="ghost">
                Приехать на экскурсию
              </Btn>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {PROMISES.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2">
                  <Icon size={15} className="t-primary" /> {label}
                </span>
              ))}
            </div>
          </div>
          <Media variant="mesh" seed={1} radius="card-lg" className="aspect-4/3 w-full" />
        </div>
      </Section>

      {/* boxes */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Боксы</h2>
            <span className="text-sm t-muted">Состав меняется по сезону — пишем в письме заранее</span>
          </div>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {BOXES.map((box) => (
              <article
                key={box.name}
                className="t-card flex flex-col overflow-hidden"
                style={{
                  background: 'var(--tp-bg)',
                  ...(box.featured
                    ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' }
                    : null),
                }}
              >
                <Media variant="dots" seed={box.name.length + 2} radius="none" className="aspect-16/10 w-full" />
                <div className="flex flex-1 flex-col p-6">
                  {box.featured && <span className="t-chip mb-4 self-start">Берут чаще</span>}
                  <h3 className="text-[1.3rem]">{box.name}</h3>
                  <div className="mt-3">
                    <span className="t-head text-2xl t-primary">{box.price}</span>
                    <span className="text-sm t-muted"> · {box.weight}</span>
                  </div>
                  <p className="mt-3 text-sm t-muted">{box.text}</p>
                  <ul className="mt-5 grid flex-1 gap-2 text-sm t-muted">
                    {box.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                  <Btn className="mt-6 w-full" variant={box.featured ? 'solid' : 'outline'}>
                    Заказать
                  </Btn>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* what's inside — icon row + product price list */}
      <Section inner="max-w-[1180px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что бывает в боксе</h2>
            <div className="mt-8 grid gap-5">
              {CONTENTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                    style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm t-muted">
              Можно собрать бокс самостоятельно из отдельных позиций — цены справа.
            </p>
          </div>

          <div className="@4xl:pt-4">
            {PRODUCTS.map(([name, price]) => (
              <div key={name} className="t-border-b flex items-baseline py-4">
                <span>{name}</span>
                <span className="t-leader" />
                <span className="t-head font-semibold t-primary">{price}</span>
              </div>
            ))}
            <div className="pt-6">
              <Btn variant="outline">Полный прайс</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* subscription */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-secondary-tint)' }}>
        <Section inner="max-w-[1180px]">
          <div className="mx-auto max-w-[600px] text-center">
            <div className="t-eyebrow">Подписка</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">Привозим сами, вы не думаете</h2>
            <p className="mt-5 t-muted">
              Выбираете частоту и получаете скидку. Пропустить или отменить доставку можно за день,
              без звонков.
            </p>
          </div>
          <div className="mt-10 grid gap-5 @xl:grid-cols-3">
            {PLANS.map(([name, discount, text], i) => (
              <div
                key={name}
                className="t-card p-7 text-center"
                style={{
                  background: 'var(--tp-bg)',
                  ...(i === 0 ? { borderColor: 'var(--tp-primary)' } : null),
                }}
              >
                <h3 className="text-[1.2rem]">{name}</h3>
                <div className="t-head mt-3 text-2xl t-primary">{discount}</div>
                <p className="mt-3 text-sm t-muted">{text}</p>
                <Btn className="mt-6 w-full" size="sm" variant={i === 0 ? 'solid' : 'outline'}>
                  Оформить
                </Btn>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* about the farm */}
      <Section inner="max-w-[1180px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <Media variant="stripes" seed={7} radius="card-lg" className="aspect-4/3 w-full" />
          <div>
            <div className="t-eyebrow">О ферме</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
              Семейное хозяйство, третий год
            </h2>
            <div className="mt-6 grid gap-4 t-muted">
              <p>
                Мы с женой уехали из Москвы в 2023 году и взяли 12 гектаров под Тулой. Начали с шести
                коров — сейчас их 42, и мы всё ещё знаем каждую по имени.
              </p>
              <p>
                Приезжайте посмотреть сами: экскурсии по субботам, бесплатно, детей можно пускать к
                телятам.
              </p>
            </div>
            <div className="t-border-t mt-8 grid gap-6 pt-8 @xl:grid-cols-3">
              {[
                ['42', 'коровы'],
                ['12 га', 'своей земли'],
                ['0', 'антибиотиков'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="t-head text-2xl t-primary">{v}</div>
                  <div className="text-sm t-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* delivery */}
      <div className="t-bg-primary">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-14 @2xl:px-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center">
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.3rem]">Доставка по Москве и области</h2>
            <p className="mt-4 opacity-85">
              Возим сами, на своей машине с холодильником. По Москве бесплатно от 3 000 ₽, за МКАД —
              по договорённости.
            </p>
            <div className="mt-6 grid gap-2 text-sm opacity-90">
              <span>Пятница — Москва внутри МКАД</span>
              <span>Суббота — Новая Рига, Минское, Киевское</span>
            </div>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            <input className="t-input" placeholder="Имя" />
            <input className="t-input" placeholder="Телефон" />
            <input className="t-input @xl:col-span-2" placeholder="Адрес доставки" />
            <Btn size="lg" variant="inverse" className="@xl:col-span-2">
              Заказать первый бокс
            </Btn>
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg">Своё</span>
          <span>Тульская обл., д. Ясная · +7 900 000-00-00</span>
          <span>© 2026 Ферма «Своё»</span>
        </div>
      </footer>
    </div>
  );
}

export const farm: TemplateDefinition = {
  id: 'farm',
  name: 'Своё',
  category: 'Фермерские продукты',
  description:
    'Сайт фермы: боксы продуктов с составом, прайс отдельными позициями и подписка на доставку.',
  tags: ['ферма', 'продукты', 'эко', 'доставка', 'молоко', 'подписка'],
  defaults: {
    primary: '#4d7c0f',
    secondary: '#ca8a04',
    button: '#4d7c0f',
    background: '#fdfcf5',
    text: '#1f2410',
    buttonShape: 'rounded',
    font: 'golos',
    cardRadius: 18,
  },
  Component: FarmSite,
};
