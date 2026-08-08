import { Clock, Flame, MapPin, Percent, ShoppingCart, Smartphone } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const CATEGORIES = ['Хиты', 'Роллы', 'Суши', 'Сеты', 'Горячее', 'Салаты', 'Напитки', 'Соусы'];

const DISHES = [
  ['Филадельфия классик', '320 г', '690 ₽', true],
  ['Калифорния с креветкой', '300 г', '640 ₽', false],
  ['Дракон угорь', '340 г', '790 ₽', true],
  ['Запечённый с лососем', '280 г', '560 ₽', false],
  ['Спайси тунец', '260 г', '580 ₽', false],
  ['Темпура с крабом', '290 г', '620 ₽', true],
  ['Нигири лосось, 2 шт', '60 г', '220 ₽', false],
  ['Гункан с икрой', '45 г', '260 ₽', false],
];

const COMBOS = [
  {
    name: 'Сет «Вдвоём»',
    weight: '1 240 г · 48 кусочков',
    old: '2 480 ₽',
    price: '1 890 ₽',
    items: ['Филадельфия классик', 'Калифорния с креветкой', 'Спайси тунец', 'Запечённый с лососем'],
  },
  {
    name: 'Сет «Компания»',
    weight: '2 180 г · 88 кусочков',
    old: '4 260 ₽',
    price: '3 190 ₽',
    items: ['6 видов роллов', 'Нигири-ассорти', 'Гунканы с икрой', 'Соусы и васаби'],
    featured: true,
  },
  {
    name: 'Сет «Запечённый»',
    weight: '1 060 г · 40 кусочков',
    old: '2 140 ₽',
    price: '1 640 ₽',
    items: ['Три запечённых ролла', 'Темпура с крабом', 'Сырный ролл', 'Унаги соус'],
  },
];

function SushiSite() {
  return (
    <div className="tpl">
      {/* sticky-looking cart bar — the signature of a delivery layout */}
      <div style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 py-2.5 text-sm @2xl:px-10">
          <span className="flex items-center gap-2 font-semibold">
            <Percent size={14} /> Бесплатная доставка от 1 500 ₽
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} /> Среднее время доставки — 47 минут
          </span>
        </div>
      </div>

      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-4 @2xl:px-10">
          <span className="t-head text-2xl">Сакура</span>
          <nav className="hidden gap-6 text-sm t-muted @4xl:flex">
            {['Меню', 'Сеты', 'Акции', 'Доставка', 'О нас'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold @2xl:inline">+7 900 000-00-00</span>
            <Btn size="sm">
              <ShoppingCart size={14} /> 0 ₽
            </Btn>
          </div>
        </div>
      </header>

      {/* hero with the featured combo and a delivery timer */}
      <Section pad="py-10 @2xl:py-14" inner="max-w-[1240px]">
        <div className="grid gap-8 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-12">
          <div>
            <span className="t-chip">
              <Flame size={13} /> Сет недели
            </span>
            <h1 className="mt-5 text-[2.2rem] leading-[1.06] @2xl:text-[3.2rem]">
              88 кусочков за 3 190 ₽ вместо 4 260 ₽
            </h1>
            <p className="mt-5 max-w-[44ch] t-muted">
              Готовим после оформления заказа, не держим на витрине. Рыба приходит охлаждённой два
              раза в неделю.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn size="lg">Заказать сет</Btn>
              <Btn size="lg" variant="outline">
                Смотреть меню
              </Btn>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm t-muted">
              <span className="flex items-center gap-2">
                <Clock size={15} className="t-primary" /> 47 минут в среднем
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={15} className="t-primary" /> Доставляем по всей Москве
              </span>
            </div>
          </div>
          <Media variant="dish" seed={2} radius="card-lg" className="aspect-4/3 w-full" />
        </div>
      </Section>

      {/* category chips */}
      <div className="t-border-t t-border-b t-surface">
        <div className="mx-auto max-w-[1240px] px-6 py-5 @2xl:px-10">
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat, i) => (
              <span
                key={cat}
                className="t-r-btn px-4 py-2 text-sm font-semibold"
                style={
                  i === 0
                    ? { background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }
                    : {
                        background: 'var(--tp-bg)',
                        color: 'var(--tp-muted)',
                        border: '1px solid var(--tp-border)',
                      }
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* menu grid */}
      <Section inner="max-w-[1240px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Хиты меню</h2>
        <div className="mt-10 grid gap-5 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
          {DISHES.map(([name, weight, price, hit], i) => (
            <article key={name as string} className="t-card flex flex-col overflow-hidden">
              <div className="relative">
                <Media variant="dish" seed={i + 4} radius="none" className="aspect-4/3 w-full" />
                {hit && (
                  <span
                    className="t-r-pill absolute top-3 left-3 px-2.5 py-1 text-xs font-bold"
                    style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
                  >
                    ХИТ
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[1.02rem]">{name as string}</h3>
                <div className="mt-1 text-xs t-faint">{weight as string}</div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <span className="t-head text-lg">{price as string}</span>
                  <Btn size="sm">В корзину</Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* combos with contents listed */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1240px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Сеты</h2>
            <span className="text-sm t-muted">Выгоднее, чем собирать поштучно</span>
          </div>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {COMBOS.map((combo) => (
              <article
                key={combo.name}
                className="t-card flex flex-col overflow-hidden"
                style={{
                  background: 'var(--tp-bg)',
                  ...(combo.featured
                    ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' }
                    : null),
                }}
              >
                <Media variant="dish" seed={combo.name.length + 11} radius="none" className="aspect-16/10 w-full" />
                <div className="flex flex-1 flex-col p-6">
                  {combo.featured && <span className="t-chip mb-4 self-start">Выбирают чаще</span>}
                  <h3 className="text-[1.3rem]">{combo.name}</h3>
                  <div className="mt-1.5 text-sm t-muted">{combo.weight}</div>
                  <ul className="mt-5 grid flex-1 gap-2 text-sm t-muted">
                    {combo.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                  <div className="t-border-t mt-6 flex items-center justify-between gap-3 pt-5">
                    <div>
                      <span className="text-sm t-faint line-through">{combo.old}</span>
                      <div className="t-head text-xl t-primary">{combo.price}</div>
                    </div>
                    <Btn size="sm">В корзину</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* delivery conditions */}
      <Section inner="max-w-[1240px]">
        <div className="grid gap-8 @xl:grid-cols-3">
          {[
            ['47 минут', 'Среднее время доставки по городу за последний месяц'],
            ['от 1 500 ₽', 'Бесплатная доставка. Ниже — 200 ₽ по МКАД'],
            ['до 23:30', 'Принимаем заказы. Кухня работает до 23:00'],
          ].map(([v, l]) => (
            <div key={l} className="t-card p-6">
              <div className="t-head text-2xl t-primary">{v}</div>
              <p className="mt-3 text-sm t-muted">{l}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* app banner */}
      <div className="t-inverse">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-14 @2xl:px-10 @4xl:grid-cols-[minmax(0,1fr)_auto] @4xl:items-center">
          <div>
            <span className="flex items-center gap-2 text-sm font-semibold opacity-80">
              <Smartphone size={16} /> Приложение
            </span>
            <h2 className="mt-4 text-[1.8rem] @2xl:text-[2.4rem]">
              В приложении каждый пятый ролл — в подарок
            </h2>
            <p className="mt-3 opacity-70">
              Копите наклейки за заказы, следите за курьером на карте и повторяйте прошлый заказ в
              одно касание.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn size="lg" variant="inverse">
              App Store
            </Btn>
            <Btn size="lg" variant="inverse">
              Google Play
            </Btn>
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-xl">Сакура</span>
            <p className="mt-3 text-sm t-muted">
              Доставка суши и роллов по Москве с 2016 года. Своя кухня, без дарк-китченов.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>Кухня: ул. Складочная 3</div>
            <div className="mt-2">Ежедневно 11:00–23:30</div>
          </div>
          <div className="text-sm t-muted">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">order@sakura-delivery.ru</div>
            <div className="mt-4 t-faint">© 2026 Сакура</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const sushi: TemplateDefinition = {
  id: 'sushi',
  name: 'Сакура',
  category: 'Доставка еды',
  description:
    'Сайт доставки суши: полоса с условиями и таймингом, чипсы категорий, меню сеткой и сеты с составом.',
  tags: ['доставка', 'суши', 'роллы', 'еда', 'меню', 'сеты', 'корзина'],
  defaults: {
    primary: '#dc2626',
    secondary: '#171717',
    button: '#dc2626',
    background: '#fffdfa',
    text: '#1c1917',
    buttonShape: 'soft',
    font: 'montserrat',
    cardRadius: 12,
  },
  Component: SushiSite,
};
