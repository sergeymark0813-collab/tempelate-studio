import { Eye, Glasses, MapPin, ScanEye, Sun, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, LogoMarquee, Media, Section } from './ui';

const FRAMES = [
  ['Ray-Ban RB5154', 'Клабмастер, ацетат', '14 900 ₽'],
  ['Lindberg Air 6540', 'Титан, 12 г', '38 400 ₽'],
  ['Persol PO3007', 'Ацетат, италия', '19 200 ₽'],
  ['Oakley OX8156', 'Спорт, титан', '16 700 ₽'],
  ['Etnia Barcelona', 'Цветной ацетат', '17 500 ₽'],
  ['Silhouette Titan', 'Без оправы, 8 г', '31 000 ₽'],
  ['Gucci GG0396O', 'Металл и ацетат', '27 800 ₽'],
  ['Own Label Basic', 'Собственная марка', '5 900 ₽'],
];

const LENSES: { icon: LucideIcon; name: string; price: string; text: string; perks: string[] }[] = [
  {
    icon: Eye,
    name: 'Однофокальные',
    price: 'от 3 400 ₽',
    text: 'Для постоянного ношения при близорукости или дальнозоркости',
    perks: ['Индекс 1.5–1.74', 'Антиблик в комплекте', 'Гарантия 12 месяцев'],
  },
  {
    icon: ScanEye,
    name: 'Прогрессивные',
    price: 'от 18 900 ₽',
    text: 'Три зоны в одной линзе: даль, компьютер, чтение',
    perks: ['Индивидуальный расчёт', 'Адаптация 2 недели', 'Замена, если не привыкли'],
  },
  {
    icon: Sun,
    name: 'Фотохромные',
    price: 'от 9 800 ₽',
    text: 'Темнеют на улице и светлеют в помещении за 40 секунд',
    perks: ['UV 400', 'Работают в машине', 'Любой индекс'],
  },
];

const STEPS = [
  ['Проверка зрения', '30 минут на авторефрактометре и фороптере. Бесплатно при заказе очков.'],
  ['Подбор оправы', 'Мерим межзрачковое расстояние и посадку — от этого зависит, не поедут ли линзы.'],
  ['Расчёт линз', 'Оптик считает индекс и покрытия под ваш рецепт и толщину оправы.'],
  ['Изготовление', 'Своя мастерская: однофокальные за 2 часа, прогрессивные за 5–7 дней.'],
];

const BRANDS = ['Ray-Ban', 'Lindberg', 'Persol', 'Oakley', 'Silhouette', 'Etnia Barcelona', 'Gucci', 'Zeiss'];

function OpticsSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Glasses size={22} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl">Фокус</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Оправы', 'Линзы', 'Проверка зрения', 'Салоны'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Записаться на проверку</Btn>
        </div>
      </header>

      {/* hero: free eye test + booking */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Оптика с врачом-офтальмологом · 3 салона в Москве</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.3rem]">
              Проверка зрения бесплатно, если заказываете очки у нас
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Полная диагностика за 30 минут, честный рецепт и оптик, который отговорит от лишних
              покрытий, если они вам не нужны.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Записаться на проверку</Btn>
              <Btn size="lg" variant="outline">
                Смотреть оправы
              </Btn>
            </div>
            <div className="mt-10 grid gap-6 @xl:grid-cols-3">
              {[
                ['2 часа', 'изготовление простых очков'],
                ['14 дней', 'обмен, если не подошло'],
                ['12 мес', 'гарантия на линзы'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="t-head text-2xl t-primary">{v}</div>
                  <div className="mt-1 text-sm t-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="t-card t-shadow p-6 @2xl:p-7">
            <div className="t-head text-lg">Запись на диагностику</div>
            <p className="mt-2 text-sm t-muted">Свободные окна на этой неделе</p>
            <div className="mt-5 grid gap-2.5">
              {[
                ['Сегодня', '17:30 · 18:15'],
                ['Завтра', '11:00 · 14:30 · 19:00'],
                ['Суббота', '10:30 · 12:00 · 16:45'],
              ].map(([day, slots], i) => (
                <div
                  key={day}
                  className="t-r-card-sm flex items-center justify-between gap-3 px-4 py-3"
                  style={{
                    background: i === 0 ? 'var(--tp-primary-tint)' : 'var(--tp-surface-2)',
                  }}
                >
                  <div>
                    <div className="text-xs tracking-wide uppercase t-faint">{day}</div>
                    <div className="mt-0.5 text-sm font-semibold">{slots}</div>
                  </div>
                  <Btn size="sm" variant="soft">
                    Взять
                  </Btn>
                </div>
              ))}
            </div>
            <div className="t-border-t mt-6 grid gap-3 pt-5">
              <input className="t-input" placeholder="Имя" />
              <input className="t-input" placeholder="Телефон" />
              <Btn className="w-full">Записаться</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* frames catalogue */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Оправы</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm t-muted">
              {['Все', 'Мужские', 'Женские', 'Титан', 'До 10 000 ₽'].map((f, i) => (
                <span key={f} className={i === 0 ? 'font-semibold t-primary' : undefined}>
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
            {FRAMES.map(([name, spec, price], i) => (
              <article
                key={name}
                className="t-card overflow-hidden"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Media variant="product" seed={i + 2} radius="none" className="aspect-4/3 w-full" />
                <div className="p-5">
                  <h3 className="text-[1rem]">{name}</h3>
                  <div className="mt-1 text-xs t-faint">{spec}</div>
                  <div className="mt-3.5 flex items-center justify-between gap-3">
                    <span className="t-head text-lg t-primary">{price}</span>
                    <span className="text-xs t-faint">примерить</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* lenses — a separate product type, deliberately styled differently */}
      <Section inner="max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Линзы</h2>
          <span className="text-sm t-muted">Цена за пару, включая антиблик</span>
        </div>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {LENSES.map(({ icon: Icon, name, price, text, perks }, i) => (
            <article
              key={name}
              className="t-card flex flex-col p-7"
              style={i === 1 ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' } : undefined}
            >
              <Icon size={26} className="t-primary" strokeWidth={1.6} />
              <h3 className="mt-5 text-[1.3rem]">{name}</h3>
              <div className="t-head mt-3 text-2xl t-primary">{price}</div>
              <p className="mt-4 text-sm t-muted">{text}</p>
              <ul className="mt-5 grid flex-1 gap-2 text-sm t-muted">
                {perks.map((perk) => (
                  <li key={perk}>· {perk}</li>
                ))}
              </ul>
              <Btn className="mt-6 w-full" size="sm" variant={i === 1 ? 'solid' : 'outline'}>
                Подобрать
              </Btn>
            </article>
          ))}
        </div>
      </Section>

      {/* how it works */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Как подбираем очки</h2>
          <div className="mt-10 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-4">
            {STEPS.map(([title, text], i) => (
              <div key={title}>
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold"
                  style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[1.1rem]">{title}</h3>
                <p className="mt-2 text-sm t-muted">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* brands */}
      <div className="t-border-b">
        <div className="mx-auto max-w-[1200px] px-6 @2xl:px-10">
          <LogoMarquee items={BRANDS} />
        </div>
      </div>

      {/* salons */}
      <Section inner="max-w-[1200px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Салоны</h2>
        <div className="mt-10 grid gap-6 @3xl:grid-cols-3">
          {[
            ['Маросейка 6/8', 'м. Китай-город', 'Пн–Сб 10:00–21:00'],
            ['Ленинский пр-т 34', 'м. Ленинский проспект', 'Ежедневно 10:00–22:00'],
            ['Мясницкая 24', 'м. Чистые пруды', 'Пн–Сб 11:00–20:00'],
          ].map(([address, metro, hours], i) => (
            <article key={address} className="t-card overflow-hidden">
              <Media variant="plan" seed={i + 12} radius="none" className="aspect-16/10 w-full" />
              <div className="p-6">
                <h3 className="flex items-center gap-2 text-[1.15rem]">
                  <MapPin size={16} className="t-primary shrink-0" /> {address}
                </h3>
                <div className="mt-2 text-sm t-muted">{metro}</div>
                <div className="mt-1 text-sm t-muted">{hours}</div>
                <Btn className="mt-5" size="sm" variant="outline">
                  Маршрут
                </Btn>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Фокус</span>
            <p className="mt-3 text-sm opacity-70">
              Оптика и кабинет офтальмолога. Работаем с 2013 года, лицензия на медуслуги.
            </p>
          </div>
          <div className="text-sm opacity-80">
            <div>Три салона в Москве</div>
            <div className="mt-2">+7 900 000-00-00</div>
          </div>
          <div className="text-sm opacity-80">
            <div>hello@fokus-optika.ru</div>
            <div className="mt-4 opacity-70">© 2026 Оптика «Фокус»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const optics: TemplateDefinition = {
  id: 'optics',
  name: 'Фокус',
  category: 'Оптика',
  description:
    'Сайт оптики: слоты записи на проверку зрения, каталог оправ и линзы как отдельный тип товара.',
  tags: ['оптика', 'очки', 'оправы', 'линзы', 'зрение', 'офтальмолог'],
  defaults: {
    primary: '#0369a1',
    secondary: '#f43f5e',
    button: '#0369a1',
    background: '#ffffff',
    text: '#0b1e2d',
    buttonShape: 'rounded',
    font: 'manrope',
    cardRadius: 16,
  },
  Component: OpticsSite,
};
