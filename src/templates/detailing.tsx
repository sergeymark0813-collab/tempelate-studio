import { Check, Droplet, Shield, Sparkles, Timer, Wrench, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const PACKAGES = [
  {
    name: 'Стандарт',
    price: '9 900 ₽',
    time: '1 день',
    text: 'Комплексная мойка и защита на сезон',
    perks: ['Двухфазная мойка', 'Химчистка коврики', 'Воск на 3 месяца', 'Полировка стёкол'],
  },
  {
    name: 'Керамика',
    price: '38 000 ₽',
    time: '3 дня',
    text: 'Полировка кузова и керамическое покрытие',
    perks: [
      'Абразивная полировка в 2 шага',
      'Керамика 9H, 2 слоя',
      'Гарантия 2 года',
      'Обработка дисков и стёкол',
    ],
    featured: true,
  },
  {
    name: 'Полный',
    price: '74 000 ₽',
    time: '5–7 дней',
    text: 'Кузов, салон и антигравийная плёнка',
    perks: [
      'Всё из пакета «Керамика»',
      'Полиуретан на зоны риска',
      'Химчистка салона с паром',
      'Кожа: чистка и кондиционер',
    ],
  },
];

const STAGES = [
  ['Приёмка', 'Осматриваем при ярком свете, фиксируем все дефекты на фото'],
  ['Мойка', 'Два ведра, бесконтактная химия, глина для въевшихся частиц'],
  ['Полировка', 'Замер толщины ЛКП, снимаем минимум лака'],
  ['Покрытие', 'Керамика в боксе с контролем влажности'],
  ['Выдача', 'Проверяем вместе под лампой, отдаём отчёт с фото'],
];

const WHY: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Shield, title: 'Гарантия 2 года', text: 'На керамику. Ведём сервисную книжку по вашей машине' },
  { icon: Timer, title: 'Срок в договоре', text: 'Задержали — каждый день простоя за наш счёт' },
  { icon: Droplet, title: 'Замер толщины ЛКП', text: 'До и после полировки, цифры отдаём вам' },
  { icon: Wrench, title: 'Отдельный бокс', text: 'Пыль и влажность под контролем, без «в общем цеху»' },
];

function DetailingSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Sparkles size={20} className="t-primary" strokeWidth={1.8} />
            <span className="t-head text-xl tracking-[0.12em] uppercase">Глянец</span>
          </span>
          <nav className="hidden gap-7 text-xs tracking-[0.14em] uppercase t-muted @4xl:flex">
            {['Пакеты', 'Этапы', 'Работы', 'Гарантия', 'Запись'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Записаться</Btn>
        </div>
      </header>

      {/* hero: package + price on the left, car media right */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1220px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Детейлинг-центр · Москва, Симоновский вал</span>
            <h1 className="mt-6 text-[2.4rem] leading-[1.02] uppercase @2xl:text-[3.5rem]">
              Кузов как
              <br />
              из салона
              <br />
              <span className="t-primary">на два года</span>
            </h1>
            <p className="mt-7 max-w-[44ch] t-muted">
              Полировка с замером толщины лака и керамика 9H в отдельном боксе. Показываем результат
              под лампой до того, как вы заплатите.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Рассчитать стоимость</Btn>
              <Btn size="lg" variant="outline">
                Смотреть работы
              </Btn>
            </div>
          </div>
          <Media variant="stripes" seed={2} className="aspect-4/3 w-full" />
        </div>
      </Section>

      {/* packages */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1220px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Пакеты работ</h2>
            <span className="text-sm t-muted">Цены для седана класса D. Кроссовер +15%</span>
          </div>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {PACKAGES.map((pack) => (
              <article
                key={pack.name}
                className="t-card flex flex-col p-7"
                style={{
                  background: 'var(--tp-bg)',
                  ...(pack.featured
                    ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' }
                    : null),
                }}
              >
                {pack.featured && <span className="t-chip mb-5 self-start">Выбирают чаще</span>}
                <h3 className="text-[1.4rem] uppercase">{pack.name}</h3>
                <div className="t-head mt-4 text-3xl t-primary">{pack.price}</div>
                <div className="mt-1 text-sm t-muted">Срок: {pack.time}</div>
                <p className="mt-4 text-sm t-muted">{pack.text}</p>
                <ul className="mt-6 grid flex-1 gap-2.5 text-sm">
                  {pack.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <Check size={15} className="t-primary mt-0.5 shrink-0" /> {perk}
                    </li>
                  ))}
                </ul>
                <Btn className="mt-7 w-full" variant={pack.featured ? 'solid' : 'outline'}>
                  Записаться
                </Btn>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* before / after */}
      <Section inner="max-w-[1220px]">
        <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">До и после</h2>
        <div className="mt-10 grid gap-8 @3xl:grid-cols-2">
          {[
            ['BMW 5 · чёрный металлик', 'Полировка 2 шага + керамика · 3 дня'],
            ['Toyota Camry · белый', 'Устранение голограмм · 1 день'],
          ].map(([title, meta], i) => (
            <div key={title}>
              <div className="grid grid-cols-2 gap-2">
                {['До', 'После'].map((label, li) => (
                  <div key={label} className="relative">
                    <Media
                      variant={li === 0 ? 'grid' : 'rings'}
                      seed={i * 3 + li + 4}
                      className="aspect-4/3 w-full"
                    />
                    <span
                      className="t-r-pill absolute top-3 left-3 px-2.5 py-1 text-xs font-bold"
                      style={{
                        background: li === 0 ? 'var(--tp-surface-2)' : 'var(--tp-primary)',
                        color: li === 0 ? 'var(--tp-muted)' : 'var(--tp-on-primary)',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <h3 className="mt-4 text-[1.15rem]">{title}</h3>
              <div className="mt-1 text-sm t-muted">{meta}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* stages in a row */}
      <div className="t-bg-primary">
        <div className="mx-auto max-w-[1220px] px-6 py-16 @2xl:px-10">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Как проходит работа</h2>
          <div className="mt-10 grid gap-8 @xl:grid-cols-2 @5xl:grid-cols-5">
            {STAGES.map((stage, i) => (
              <div key={stage[0]}>
                <div className="t-head text-4xl opacity-40">0{i + 1}</div>
                <h3 className="mt-3 text-[1.1rem] uppercase">{stage[0]}</h3>
                <p className="mt-2 text-sm opacity-85">{stage[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* why us */}
      <Section inner="max-w-[1220px]">
        <div className="grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-4">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title} className="t-card p-6">
              <Icon size={24} className="t-primary" strokeWidth={1.6} />
              <h3 className="mt-4 text-[1.05rem]">{title}</h3>
              <p className="mt-2 text-sm t-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* booking */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1220px]">
          <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
            <div>
              <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Записаться</h2>
              <p className="mt-5 t-muted">
                Приезжайте на бесплатный осмотр — посмотрим ЛКП под лампой, замерим толщину лака и
                скажем, что реально нужно, а что лишнее.
              </p>
              <div className="mt-7 grid gap-2 text-sm">
                <span>Симоновский вал 26, бокс 4</span>
                <span>Пн–Сб 09:00–21:00</span>
                <span className="font-semibold t-primary">+7 900 000-00-00</span>
              </div>
            </div>
            <div className="t-card grid gap-3 p-7" style={{ background: 'var(--tp-bg)' }}>
              <div className="grid gap-3 @xl:grid-cols-2">
                <input className="t-input" placeholder="Имя" />
                <input className="t-input" placeholder="Телефон" />
              </div>
              <input className="t-input" placeholder="Марка и модель" />
              <select className="t-input">
                <option>Интересует: Стандарт</option>
                <option>Интересует: Керамика</option>
                <option>Интересует: Полный</option>
                <option>Интересует: бесплатный осмотр</option>
              </select>
              <Btn size="lg" className="w-full">
                Записаться на осмотр
              </Btn>
            </div>
          </div>
        </Section>
      </div>

      <footer>
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-[0.12em] uppercase">Глянец</span>
          <span>Симоновский вал 26 · Пн–Сб 09:00–21:00</span>
          <span>© 2026 Детейлинг-центр «Глянец»</span>
        </div>
      </footer>
    </div>
  );
}

export const detailing: TemplateDefinition = {
  id: 'detailing',
  name: 'Глянец',
  category: 'Детейлинг',
  description:
    'Тёмный сайт детейлинг-центра: три пакета работ, пары «до и после», этапы работы в один ряд.',
  tags: ['детейлинг', 'полировка', 'керамика', 'авто', 'мойка', 'химчистка'],
  defaults: {
    primary: '#22d3ee',
    secondary: '#a3a3a3',
    button: '#22d3ee',
    background: '#0b0f12',
    text: '#e8f4f8',
    buttonShape: 'sharp',
    font: 'oswald',
    cardRadius: 4,
  },
  Component: DetailingSite,
};
