import { Clock, Flower2, Gift, Heart, ShoppingBag, Truck, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const PROMISES: { icon: LucideIcon; label: string }[] = [
  { icon: Truck, label: 'Доставка 2 часа' },
  { icon: Clock, label: 'Работаем 08:00–22:00' },
  { icon: Heart, label: 'Фото букета перед выездом' },
];

const BOUQUETS = [
  ['Пионы и эустома', '2 900 ₽', '15 стеблей'],
  ['Розы Explorer', '4 200 ₽', '25 стеблей'],
  ['Гортензия и лизиантус', '5 600 ₽', 'авторский'],
  ['Тюльпаны, монобукет', '1 800 ₽', '25 стеблей'],
  ['Ранункулюсы', '3 400 ₽', '19 стеблей'],
  ['Сухоцветы в крафте', '2 200 ₽', 'стоит год'],
  ['Композиция в шляпной коробке', '6 900 ₽', 'с доставкой'],
  ['Букет дня', '1 500 ₽', 'состав сюрприз'],
];

const OCCASIONS = [
  ['День рождения', 'Яркие и крупные букеты, открытка от руки'],
  ['Свадьба', 'Букет невесты, бутоньерки и оформление зала'],
  ['Просто так', 'Небольшие букеты, которые дарят без повода'],
];

const PLANS = [
  { name: 'Раз в неделю', price: '1 400 ₽', per: 'за букет', text: 'Свежие цветы каждую пятницу', save: 'выгода 20%' },
  { name: 'Раз в две недели', price: '1 600 ₽', per: 'за букет', text: 'Оптимально для дома', save: 'выгода 12%', featured: true },
  { name: 'Раз в месяц', price: '1 900 ₽', per: 'за букет', text: 'Для офиса или подарка', save: 'выгода 5%' },
];

function FlowersSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Flower2 size={22} className="t-primary" strokeWidth={1.6} />
            <span className="t-head text-2xl">Флора</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Букеты', 'Поводы', 'Подписка', 'Доставка'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold @2xl:inline">+7 900 000-00-00</span>
            <Btn size="sm">
              <ShoppingBag size={14} /> 0
            </Btn>
          </div>
        </div>
      </header>

      {/* hero: one big bouquet with a floating price badge */}
      <Section pad="py-12 @2xl:py-16" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Доставка по Москве за 2 часа</span>
            <h1 className="mt-6 text-[2.4rem] leading-[1.04] @2xl:text-[3.5rem]">
              Букеты, которые собирают при вас
            </h1>
            <p className="mt-6 max-w-[44ch] text-[1.05rem] t-muted">
              Привозим цветы с утреннего рынка, собираем в день заказа и отправляем фото букета перед
              выездом курьера.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Выбрать букет</Btn>
              <Btn size="lg" variant="ghost">
                Собрать индивидуальный
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

          <div className="relative">
            <Media variant="mesh" seed={2} radius="card-lg" className="aspect-4/5 w-full" />
            <div
              className="t-r-card t-shadow-lg absolute bottom-6 left-6 px-5 py-4"
              style={{ background: 'var(--tp-bg)' }}
            >
              <div className="text-xs tracking-wide uppercase t-faint">Букет недели</div>
              <div className="t-head mt-1 text-xl">Пионы и эустома</div>
              <div className="t-head mt-1 text-2xl t-primary">2 900 ₽</div>
            </div>
          </div>
        </div>
      </Section>

      {/* catalogue grid */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-secondary-tint)' }}>
        <Section inner="max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Каталог</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm t-muted">
              {['Все', 'До 3 000 ₽', 'Авторские', 'Монобукеты', 'Сухоцветы'].map((f, i) => (
                <span key={f} className={i === 0 ? 'font-semibold t-primary' : undefined}>
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
            {BOUQUETS.map(([name, price, meta], i) => (
              <article
                key={name}
                className="t-card overflow-hidden"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Media
                  variant={i % 3 === 0 ? 'mesh' : i % 3 === 1 ? 'rings' : 'dots'}
                  seed={i + 5}
                  radius="none"
                  className="aspect-square w-full"
                />
                <div className="p-5">
                  <h3 className="text-[1.02rem]">{name}</h3>
                  <div className="mt-1 text-xs t-faint">{meta}</div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="t-head text-lg t-primary">{price}</span>
                    <Btn size="sm">В корзину</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* occasions */}
      <Section inner="max-w-[1200px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Повод</h2>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {OCCASIONS.map(([title, text], i) => (
            <div key={title} className="relative overflow-hidden t-r-card-lg">
              <Media variant={i === 1 ? 'rings' : 'mesh'} seed={i + 14} radius="none" className="aspect-4/3 w-full" overlay />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="t-head text-[1.4rem] text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/85">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* flower subscription — the distinctive block here */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <div className="mx-auto max-w-[620px] text-center">
            <div className="t-eyebrow">Подписка</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.6rem]">Цветы, которые приезжают сами</h2>
            <p className="mt-5 t-muted">
              Выбираете частоту — мы привозим свежий букет и забираем предыдущий, если он вам мешает.
              Отменить можно в любой момент.
            </p>
          </div>

          <div className="mt-12 grid gap-6 @2xl:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="t-card flex flex-col p-7 text-center"
                style={{
                  background: 'var(--tp-bg)',
                  ...(plan.featured
                    ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' }
                    : null),
                }}
              >
                {plan.featured && <span className="t-chip mx-auto mb-4">Популярно</span>}
                <h3 className="text-[1.3rem]">{plan.name}</h3>
                <div className="mt-4">
                  <span className="t-head text-3xl t-primary">{plan.price}</span>
                  <span className="text-sm t-muted"> {plan.per}</span>
                </div>
                <p className="mt-3 flex-1 text-sm t-muted">{plan.text}</p>
                <div className="mt-4 text-sm font-semibold t-secondary">{plan.save}</div>
                <Btn className="mt-6 w-full" variant={plan.featured ? 'solid' : 'outline'}>
                  Оформить
                </Btn>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* delivery promise */}
      <div className="t-bg-primary">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-14 @2xl:px-10 @xl:grid-cols-3">
          {[
            ['2 часа', 'Доставка внутри МКАД'],
            ['08:00–22:00', 'Принимаем заказы'],
            ['Бесплатно', 'При заказе от 5 000 ₽'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="t-head text-3xl">{v}</div>
              <div className="mt-2 text-sm opacity-85">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* order + gift note */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-8 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Заказать букет</h2>
            <p className="mt-4 t-muted">
              Позвоним, уточним состав и пришлём фото перед отправкой курьера.
            </p>
            <div className="mt-8 grid gap-3">
              <div className="grid gap-3 @xl:grid-cols-2">
                <input className="t-input" placeholder="Ваше имя" />
                <input className="t-input" placeholder="Телефон" />
              </div>
              <div className="grid gap-3 @xl:grid-cols-2">
                <input className="t-input" placeholder="Дата доставки" />
                <input className="t-input" placeholder="Бюджет" />
              </div>
              <input className="t-input" placeholder="Текст открытки" />
              <Btn size="lg">Оформить заказ</Btn>
            </div>
          </div>

          <div className="t-card flex flex-col justify-center p-8" style={{ background: 'var(--tp-primary-tint)' }}>
            <Gift size={26} className="t-primary" strokeWidth={1.6} />
            <h3 className="mt-5 text-[1.4rem]">Открытка от руки — бесплатно</h3>
            <p className="mt-3 t-muted">
              Напишем ваш текст каллиграфическим пером на плотной бумаге и вложим в букет. Курьер не
              скажет, от кого, если попросите.
            </p>
            <div className="t-border-t mt-6 grid gap-2 pt-6 text-sm">
              <span>Анонимная доставка</span>
              <span>Видео вручения по запросу</span>
              <span>Замена цветка, если не понравился</span>
            </div>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-xl">Флора</span>
            <p className="mt-3 text-sm t-muted">
              Цветочная мастерская на Патриарших. Работаем с 2017 года.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>М. Бронная 12</div>
            <div className="mt-2">Ежедневно 08:00–22:00</div>
          </div>
          <div className="text-sm t-muted">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">order@flora-shop.ru</div>
            <div className="mt-4 t-faint">© 2026 Мастерская «Флора»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const flowers: TemplateDefinition = {
  id: 'flowers',
  name: 'Флора',
  category: 'Цветы',
  description:
    'Сайт цветочной мастерской: витрина букетов, поводы плитками и подписка на регулярную доставку.',
  tags: ['цветы', 'букеты', 'доставка', 'флорист', 'подписка', 'подарок'],
  defaults: {
    primary: '#db2777',
    secondary: '#fbbf24',
    button: '#db2777',
    background: '#fffafc',
    text: '#33121f',
    buttonShape: 'rounded',
    font: 'cormorant',
    cardRadius: 22,
  },
  Component: FlowersSite,
};
