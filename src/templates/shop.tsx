import { Heart, RotateCcw, Search, ShieldCheck, ShoppingBag, Truck, User } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section, Stars, type MediaVariant } from './ui';

const CATEGORIES: { title: string; count: string; variant: MediaVariant }[] = [
  { title: 'Освещение', count: '48 товаров', variant: 'rings' },
  { title: 'Текстиль', count: '132 товара', variant: 'stripes' },
  { title: 'Посуда', count: '96 товаров', variant: 'dish' },
  { title: 'Декор', count: '77 товаров', variant: 'mesh' },
];

const PRODUCTS = [
  { title: 'Настольная лампа Orbit', price: '6 490', old: '7 900', badge: '-18%', rating: 5 },
  { title: 'Плед из мериноса', price: '4 200', badge: 'Новинка', rating: 5 },
  { title: 'Керамическая ваза Sand', price: '2 850', rating: 4 },
  { title: 'Набор бокалов, 4 шт', price: '3 400', old: '3 900', badge: '-13%', rating: 5 },
  { title: 'Торшер Linea', price: '11 900', rating: 5 },
  { title: 'Кашпо из бетона', price: '1 990', rating: 4 },
  { title: 'Полотенца, 2 шт', price: '2 100', rating: 4 },
  { title: 'Подсвечник Arc', price: '1 450', badge: 'Хит', rating: 5 },
];

const BENEFITS = [
  { icon: Truck, title: 'Доставка за 1 день', text: 'По Москве бесплатно от 5 000 ₽' },
  { icon: RotateCcw, title: 'Возврат 30 дней', text: 'Без объяснения причин' },
  { icon: ShieldCheck, title: 'Гарантия 2 года', text: 'На всю светотехнику' },
];

function ShopSite() {
  return (
    <div className="tpl">
      {/* promo bar */}
      <div className="t-bg-primary text-center text-sm">
        <div className="mx-auto max-w-[1280px] px-6 py-2.5">
          Бесплатная доставка при заказе от 5 000 ₽ · промокод <strong>DOM10</strong> даёт −10%
        </div>
      </div>

      {/* header */}
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-4 @2xl:px-10">
          <span className="t-head shrink-0 text-xl tracking-tight">ДОМ&nbsp;И&nbsp;СВЕТ</span>
          <div className="relative hidden flex-1 @2xl:block">
            <Search
              size={17}
              className="t-faint absolute top-1/2 left-4 -translate-y-1/2"
            />
            <input className="t-input pl-11" placeholder="Поиск по 1 200 товарам" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Heart size={20} className="t-muted" strokeWidth={1.6} />
            <User size={20} className="t-muted" strokeWidth={1.6} />
            <span className="relative">
              <ShoppingBag size={20} strokeWidth={1.6} />
              <span
                className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold"
                style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
              >
                3
              </span>
            </span>
          </div>
        </div>
        <div className="t-border-t">
          <div className="mx-auto flex max-w-[1280px] gap-7 overflow-hidden px-6 py-3 text-sm @2xl:px-10">
            {['Новинки', 'Освещение', 'Текстиль', 'Посуда', 'Декор', 'Мебель', 'Распродажа'].map(
              (item, i) => (
                <span key={item} className={i === 6 ? 'font-semibold t-secondary' : 't-muted'}>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </header>

      {/* hero banner */}
      <Section pad="py-8 @2xl:py-10" inner="max-w-[1280px]">
        <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Media variant="mesh" seed={2} radius="card-lg" className="min-h-[300px] p-8 @2xl:p-12">
            <div className="flex h-full max-w-[26ch] flex-col justify-end">
              <span className="t-chip self-start">Коллекция «Тепло»</span>
              <h1 className="mt-5 text-[2.2rem] @2xl:text-[3rem]">Свет, который меняет вечер</h1>
              <div className="mt-7">
                <Btn size="lg">Смотреть коллекцию</Btn>
              </div>
            </div>
          </Media>
          <div className="grid gap-4">
            <Media variant="product" seed={4} radius="card-lg" className="min-h-[140px] p-7">
              <div className="flex h-full flex-col justify-between">
                <div className="t-head text-xl">Скидки до 40%</div>
                <span className="text-sm t-muted">на прошлые коллекции</span>
              </div>
            </Media>
            <Media variant="dots" seed={6} radius="card-lg" className="min-h-[140px] p-7">
              <div className="flex h-full flex-col justify-between">
                <div className="t-head text-xl">Подарочные наборы</div>
                <span className="text-sm t-muted">собираем под ваш бюджет</span>
              </div>
            </Media>
          </div>
        </div>
      </Section>

      {/* categories */}
      <Section pad="py-10" inner="max-w-[1280px]">
        <h2 className="text-[1.7rem] @2xl:text-[2.2rem]">Категории</h2>
        <div className="mt-7 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <div key={category.title} className="t-card overflow-hidden">
              <Media
                variant={category.variant}
                seed={i + 8}
                radius="none"
                className="aspect-4/3 w-full"
              />
              <div className="flex items-center justify-between p-5">
                <div>
                  <div className="font-semibold">{category.title}</div>
                  <div className="text-sm t-muted">{category.count}</div>
                </div>
                <span className="t-primary text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* products */}
      <Section pad="py-10" inner="max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.7rem] @2xl:text-[2.2rem]">Популярное</h2>
          <div className="flex gap-2 text-sm">
            {['Все', 'Освещение', 'Текстиль', 'Декор'].map((tab, i) => (
              <span
                key={tab}
                className="t-r-pill px-3.5 py-1.5"
                style={
                  i === 0
                    ? { background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }
                    : { border: '1px solid var(--tp-border)', color: 'var(--tp-muted)' }
                }
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <article key={product.title} className="t-card group overflow-hidden">
              <div className="relative">
                <Media variant="product" seed={i} radius="none" className="aspect-square w-full" />
                {product.badge && (
                  <span
                    className="t-r-pill absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold"
                    style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
                  >
                    {product.badge}
                  </span>
                )}
                <span
                  className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full"
                  style={{ background: 'var(--tp-bg)' }}
                >
                  <Heart size={15} className="t-muted" />
                </span>
              </div>
              <div className="p-5">
                <Stars value={product.rating} size={12} />
                <h3 className="mt-2.5 text-[0.98rem] leading-snug font-semibold">{product.title}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="t-head text-lg">{product.price} ₽</span>
                  {product.old && (
                    <span className="text-sm line-through t-faint">{product.old} ₽</span>
                  )}
                </div>
                <Btn size="sm" className="mt-4 w-full">
                  В корзину
                </Btn>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* benefits */}
      <div className="t-surface t-border-t t-border-b">
        <Section pad="py-12" inner="max-w-[1280px]">
          <div className="grid gap-8 @3xl:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <Icon size={24} className="t-primary shrink-0" strokeWidth={1.6} />
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="mt-1 text-sm t-muted">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* newsletter */}
      <Section inner="max-w-[1280px]">
        <div className="t-r-card-lg grid gap-8 p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center"
          style={{ background: 'var(--tp-primary-tint)' }}
        >
          <div>
            <h2 className="text-[1.7rem] @2xl:text-[2.2rem]">−10% на первый заказ</h2>
            <p className="mt-3 t-muted">
              Подпишитесь на рассылку: новинки, распродажи и подборки для дома. Не чаще раза в
              неделю.
            </p>
          </div>
          <div className="flex flex-col gap-3 @xl:flex-row">
            <input className="t-input" placeholder="Ваш e-mail" />
            <Btn size="lg" className="shrink-0">
              Подписаться
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-4">
          <div>
            <div className="t-head text-lg">ДОМ И СВЕТ</div>
            <p className="mt-3 text-sm opacity-65">Предметы для дома с 2016 года.</p>
          </div>
          {[
            ['Покупателям', ['Доставка', 'Оплата', 'Возврат', 'Гарантия']],
            ['Каталог', ['Освещение', 'Текстиль', 'Посуда', 'Декор']],
            ['Контакты', ['+7 900 000-00-00', 'shop@domisvet.ru', 'Пн–Вс 10:00–20:00']],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="text-sm font-semibold">{title as string}</div>
              <ul className="mt-4 grid gap-2 text-sm opacity-70">
                {(items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[1280px] px-6 pb-8 text-xs opacity-50 @2xl:px-10">
          © 2026 Дом и Свет · ИП Иванов И. И.
        </div>
      </footer>
    </div>
  );
}

export const shop: TemplateDefinition = {
  id: 'shop',
  name: 'Дом и Свет',
  category: 'Интернет-магазин',
  description:
    'Витрина магазина: баннеры, категории, карточки товаров с ценами и рейтингом, корзина.',
  tags: ['магазин', 'ecommerce', 'товары', 'корзина', 'каталог'],
  defaults: {
    primary: '#111827',
    secondary: '#ef4444',
    button: '#111827',
    background: '#ffffff',
    text: '#111827',
    buttonShape: 'soft',
    font: 'rubik',
    cardRadius: 12,
  },
  Component: ShopSite,
};
