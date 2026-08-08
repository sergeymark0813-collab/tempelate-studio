import { Clock, MapPin, Phone, Scissors, Send } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const SERVICES = [
  ['Мужская стрижка', '2 200 ₽', '50 мин'],
  ['Стрижка машинкой', '1 500 ₽', '30 мин'],
  ['Классическое бритьё', '1 900 ₽', '45 мин'],
  ['Коррекция бороды', '1 400 ₽', '30 мин'],
  ['Стрижка + борода', '3 200 ₽', '1 ч 20 мин'],
  ['Камуфляж седины', '1 800 ₽', '40 мин'],
  ['Детская стрижка', '1 300 ₽', '30 мин'],
  ['Королевское бритьё', '2 600 ₽', '1 час'],
];

const MASTERS = [
  ['Артём', 'Топ-барбер · 11 лет', 'Сегодня свободен в 14:00'],
  ['Руслан', 'Барбер · 7 лет', 'Ближайшее окно — завтра'],
  ['Гоша', 'Барбер, бритьё · 9 лет', 'Сегодня свободен в 19:30'],
];

const RULES = [
  'Опоздание больше 15 минут — переносим запись',
  'Отмена за 3 часа, иначе визит считается состоявшимся',
  'Первый кофе или лимонад — за наш счёт',
  'Наличные и карта, без чаевых «обязательно»',
];

function BarberSite() {
  return (
    <div className="tpl">
      {/* thin utility bar */}
      <div className="t-border-b text-xs tracking-[0.14em] uppercase">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-2.5 @2xl:px-10">
          <span className="t-muted">Ежедневно 10:00–22:00 · без выходных</span>
          <span className="t-primary font-bold">Запись за 10 секунд в Telegram</span>
        </div>
      </div>

      <header>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Scissors size={20} className="t-primary" />
            <span className="t-head text-2xl tracking-[0.1em] uppercase">Бритва</span>
          </span>
          <nav className="hidden gap-7 text-sm tracking-wide uppercase t-muted @4xl:flex">
            {['Услуги', 'Барберы', 'Галерея', 'Правила', 'Адрес'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">
            <Send size={14} /> Записаться
          </Btn>
        </div>
      </header>

      {/* hero */}
      <Section pad="pt-10 pb-14 @2xl:pt-14 @2xl:pb-20" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] @4xl:items-end @4xl:gap-14">
          <div>
            <h1 className="text-[2.6rem] leading-[0.98] uppercase @2xl:text-[4rem] @5xl:text-[4.8rem]">
              Барбершоп
              <br />
              на Покровке
              <br />
              <span className="t-primary">с 2015 года</span>
            </h1>
            <p className="mt-7 max-w-[44ch] t-muted">
              Шесть кресел, четыре барбера, никакой музыки на максимум. Стрижём быстро и по делу —
              средний визит 50 минут.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Записаться онлайн</Btn>
              <Btn size="lg" variant="outline">
                <Phone size={16} /> +7 900 000-00-00
              </Btn>
            </div>
          </div>
          <Media variant="stripes" seed={2} className="aspect-4/3 w-full" />
        </div>

        {/* quick-book chips */}
        <div className="mt-12 grid gap-3 @xl:grid-cols-3">
          {[
            ['Сегодня', '14:00 · 16:30 · 19:30'],
            ['Завтра', '11:00 · 13:00 · 18:00'],
            ['Суббота', '10:00 · 12:30 · 15:00'],
          ].map(([day, slots]) => (
            <div key={day} className="t-card flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-xs tracking-[0.16em] uppercase t-faint">{day}</div>
                <div className="mt-1 font-semibold">{slots}</div>
              </div>
              <Btn size="sm" variant="soft">
                Взять
              </Btn>
            </div>
          ))}
        </div>
      </Section>

      {/* price grid — two bordered columns, not a dotted menu */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-surface)' }}>
        <Section inner="max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[2rem] uppercase @2xl:text-[2.7rem]">Услуги и цены</h2>
            <span className="text-sm t-muted">Цена финальная, мойка и укладка включены</span>
          </div>

          <div className="mt-10 grid gap-x-14 @3xl:grid-cols-2">
            {SERVICES.map(([name, price, time], i) => (
              <div
                key={name}
                className="t-border-b flex items-center justify-between gap-6 py-5"
                style={i < 2 ? { borderTop: '1px solid var(--tp-border)' } : undefined}
              >
                <div>
                  <div className="text-[1.05rem] font-semibold">{name}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm t-muted">
                    <Clock size={13} /> {time}
                  </div>
                </div>
                <span className="t-head shrink-0 text-xl t-primary">{price}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* masters with availability */}
      <Section inner="max-w-[1200px]">
        <h2 className="text-[2rem] uppercase @2xl:text-[2.7rem]">Барберы</h2>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {MASTERS.map(([name, role, slot], i) => (
            <article key={name} className="t-card overflow-hidden">
              <Media variant="portrait" seed={i + 5} radius="none" className="aspect-square w-full" />
              <div className="p-6">
                <h3 className="text-xl uppercase">{name}</h3>
                <div className="mt-1 text-sm t-muted">{role}</div>
                <div
                  className="t-r-pill mt-5 inline-block px-3 py-1.5 text-xs font-bold tracking-wide uppercase"
                  style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                >
                  {slot}
                </div>
                <Btn size="sm" variant="outline" className="mt-5 w-full">
                  Выбрать барбера
                </Btn>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* gallery strip, full bleed */}
      <div className="grid grid-cols-2 gap-1 @3xl:grid-cols-4">
        {(['mesh', 'rings', 'dots', 'stripes'] as const).map((v, i) => (
          <Media key={v} variant={v} seed={i + 12} radius="none" className="aspect-square w-full" />
        ))}
      </div>

      {/* rules — numbered, on the brand colour */}
      <div className="t-bg-primary">
        <div className="mx-auto max-w-[1200px] px-6 py-16 @2xl:px-10">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Как у нас принято</h2>
          <div className="mt-10 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-4">
            {RULES.map((rule, i) => (
              <div key={rule}>
                <div className="t-head text-4xl opacity-40">0{i + 1}</div>
                <p className="mt-3 text-[0.98rem]">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* address */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-16">
          <div>
            <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Где нас найти</h2>
            <div className="mt-7 grid gap-4">
              <span className="flex items-center gap-3">
                <MapPin size={17} className="t-primary" /> Москва, Покровка 27, вход со двора
              </span>
              <span className="flex items-center gap-3">
                <Clock size={17} className="t-primary" /> Ежедневно 10:00–22:00
              </span>
              <span className="flex items-center gap-3">
                <Phone size={17} className="t-primary" /> +7 900 000-00-00
              </span>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Записаться</Btn>
              <Btn size="lg" variant="outline">
                Маршрут
              </Btn>
            </div>
          </div>
          <Media variant="plan" seed={16} className="aspect-16/10 w-full" />
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-[0.1em] uppercase">Бритва</span>
          <span>Покровка 27 · +7 900 000-00-00</span>
          <span>© 2026 Барбершоп «Бритва»</span>
        </div>
      </footer>
    </div>
  );
}

export const barber: TemplateDefinition = {
  id: 'barber',
  name: 'Бритва',
  category: 'Барбершоп',
  description:
    'Тёмный сайт барбершопа: свободные слоты в первом экране, прайс в две колонки, правила салона.',
  tags: ['барбершоп', 'стрижка', 'борода', 'бритьё', 'мужская', 'запись'],
  defaults: {
    primary: '#b03a2e',
    secondary: '#d9a441',
    button: '#b03a2e',
    background: '#141414',
    text: '#f0ece6',
    buttonShape: 'sharp',
    font: 'oswald',
    cardRadius: 2,
  },
  Component: BarberSite,
};
