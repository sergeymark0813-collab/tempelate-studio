import { Car, Clock, Gauge, ShieldCheck, Wrench } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, LogoMarquee, Media, Section, Stars } from './ui';

const PRICES = [
  ['Замена масла и фильтра', '1 200 ₽', '40 мин'],
  ['Компьютерная диагностика', '2 500 ₽', '1 час'],
  ['Замена тормозных колодок', '1 800 ₽', '1,5 часа'],
  ['Развал-сходимость 3D', '3 400 ₽', '1 час'],
  ['Замена ремня ГРМ', 'от 7 900 ₽', '4 часа'],
  ['Заправка кондиционера', '2 900 ₽', '45 мин'],
];

const WHY = [
  { icon: Gauge, title: 'Диагностика за час', text: 'Дилерское оборудование по 40 марок' },
  { icon: ShieldCheck, title: 'Гарантия 1 год', text: 'На работы и установленные запчасти' },
  { icon: Clock, title: 'Ремонт в день записи', text: 'Шесть подъёмников, без очередей' },
  { icon: Wrench, title: 'Только оригинал', text: 'Или проверенные аналоги — на выбор' },
];

function AutoServiceSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <span
              className="grid h-10 w-10 place-items-center t-r-btn"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              <Wrench size={19} />
            </span>
            <span className="t-head text-xl tracking-tight uppercase">Гараж 47</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Услуги', 'Цены', 'Марки', 'Отзывы', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-bold @2xl:inline">+7 900 000-00-00</span>
            <Btn size="sm">Записаться</Btn>
          </div>
        </div>
      </header>

      {/* hero with service picker */}
      <div className="relative">
        <Media variant="stripes" seed={2} radius="none" className="absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-6 py-16 @2xl:px-10 @2xl:py-20 @4xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @4xl:items-center">
          <div>
            <Eyebrow>Автосервис в Южном порту</Eyebrow>
            <h1 className="mt-5 text-[2.6rem] leading-[1.03] uppercase @2xl:text-[3.6rem]">
              Честный ремонт
              <br />
              <span className="t-primary">без лишних работ</span>
            </h1>
            <p className="mt-6 max-w-[48ch] t-muted">
              Показываем изношенные детали, согласовываем каждую позицию сметы и присылаем фотоотчёт
              из бокса.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Бесплатная диагностика</Btn>
              <Btn size="lg" variant="outline">
                Прайс-лист
              </Btn>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Stars value={5} />
                <span className="text-sm t-muted">4.8 · 1 340 отзывов</span>
              </div>
              <span className="text-sm t-muted">Работаем с 2011 года</span>
            </div>
          </div>

          <div className="t-card t-shadow-lg p-7 @2xl:p-8">
            <div className="flex items-center gap-3">
              <Car size={22} className="t-primary" />
              <h2 className="text-xl">Записаться на сервис</h2>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 @xl:grid-cols-2">
                <input className="t-input" placeholder="Марка" />
                <input className="t-input" placeholder="Модель и год" />
              </div>
              <select className="t-input">
                <option>Что нужно сделать?</option>
                <option>Диагностика</option>
                <option>ТО и замена масла</option>
                <option>Тормозная система</option>
                <option>Двигатель и КПП</option>
              </select>
              <input className="t-input" placeholder="Телефон" />
              <Btn size="lg" className="w-full">
                Получить время и цену
              </Btn>
              <p className="text-center text-xs t-faint">
                Перезвоним в течение 10 минут в рабочее время
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* why */}
      <Section inner="max-w-[1240px]" className="t-border-t">
        <div className="grid gap-8 @2xl:grid-cols-2 @4xl:grid-cols-4">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span
                className="grid h-12 w-12 place-items-center t-r-btn"
                style={{ background: 'var(--tp-primary-tint)' }}
              >
                <Icon size={22} className="t-primary" />
              </span>
              <h3 className="mt-5 text-lg">{title}</h3>
              <p className="mt-2 text-sm t-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* price table */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1240px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Цены</Eyebrow>
              <h2 className="mt-4 text-[2rem] uppercase @2xl:text-[2.6rem]">Популярные работы</h2>
            </div>
            <span className="text-sm t-muted">Стоимость работ без запчастей</span>
          </div>

          <div className="t-card mt-10 overflow-hidden" style={{ background: 'var(--tp-bg)' }}>
            {PRICES.map(([name, price, time], i) => (
              <div
                key={name}
                className={`grid items-center gap-3 px-6 py-5 @2xl:grid-cols-[minmax(0,1fr)_140px_120px_auto] @2xl:px-8 ${
                  i > 0 ? 't-border-t' : ''
                }`}
              >
                <span className="font-medium">{name}</span>
                <span className="t-head text-lg">{price}</span>
                <span className="text-sm t-muted">{time}</span>
                <Btn size="sm" variant="soft">
                  Записаться
                </Btn>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* brands */}
      <Section inner="max-w-[1240px]" pad="py-10">
        <div className="text-center text-xs tracking-[0.2em] uppercase t-faint">
          обслуживаем марки
        </div>
        <LogoMarquee
          items={['TOYOTA', 'VW', 'SKODA', 'BMW', 'HYUNDAI', 'KIA', 'MAZDA', 'RENAULT']}
        />
      </Section>

      {/* reviews */}
      <div className="t-border-t t-border-b">
        <Section inner="max-w-[1240px]">
          <h2 className="text-[2rem] uppercase @2xl:text-[2.6rem]">Отзывы</h2>
          <div className="mt-10 grid gap-6 @3xl:grid-cols-2">
            {[
              [
                '«Приехал с вибрацией на скорости. Нашли причину за час, показали деталь, поменяли в тот же день. Смета не выросла ни на рубль.»',
                'Андрей, Toyota Camry',
              ],
              [
                '«Единственный сервис, где не пытались продать «профилактику всего». Сделали ровно то, что нужно.»',
                'Ольга, Skoda Octavia',
              ],
            ].map(([quote, author]) => (
              <blockquote key={author} className="t-card p-8">
                <Stars value={5} size={15} />
                <p className="mt-5 text-[1.05rem]">{quote}</p>
                <footer className="mt-5 text-sm t-muted">{author}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      </div>

      {/* cta */}
      <div className="t-bg-primary">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-8 px-6 py-16 text-center @2xl:px-10 @4xl:flex-row @4xl:justify-between @4xl:text-left">
          <div>
            <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">
              Диагностика бесплатно при ремонте
            </h2>
            <p className="mt-3 opacity-80">
              Южнопортовая 47, стр. 2 · ежедневно 09:00–21:00
            </p>
          </div>
          <Btn size="lg" variant="inverse">
            Записаться сейчас
          </Btn>
        </div>
      </div>

      <footer>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg uppercase">Гараж 47</span>
          <span>Москва, Южнопортовая 47 · +7 900 000-00-00</span>
          <span>© 2026 Гараж 47</span>
        </div>
      </footer>
    </div>
  );
}

export const autoservice: TemplateDefinition = {
  id: 'autoservice',
  name: 'Гараж 47',
  category: 'Автосервис',
  description:
    'Тёмный сайт автосервиса: подбор услуги в первом экране, таблица цен и отзывы владельцев.',
  tags: ['автосервис', 'сто', 'ремонт авто', 'диагностика', 'машина'],
  defaults: {
    primary: '#ff5c1a',
    secondary: '#38bdf8',
    button: '#ff5c1a',
    background: '#101215',
    text: '#eef1f5',
    buttonShape: 'sharp',
    font: 'oswald',
    cardRadius: 6,
  },
  Component: AutoServiceSite,
};
