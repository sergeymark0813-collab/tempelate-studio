import {
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  Phone,
  ShieldCheck,
  Smile,
  type LucideIcon,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const TRUST: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: 'Гарантия 5 лет', text: 'На импланты, 2 года на пломбы и коронки' },
  { icon: CreditCard, title: 'Рассрочка 0%', text: 'На 12 месяцев, оформляем в клинике' },
  {
    icon: CalendarCheck,
    title: 'Запись на завтра',
    text: 'Обычно есть свободное время в течение суток',
  },
];

const PRICES = [
  ['Консультация и план лечения', '30 мин', 'Бесплатно'],
  ['Гигиена Air Flow + УЗ', '60 мин', '5 900 ₽'],
  ['Лечение кариеса, 1 зуб', '60 мин', 'от 7 400 ₽'],
  ['Лечение каналов, 2 канала', '90 мин', 'от 14 800 ₽'],
  ['Металлокерамическая коронка', '2 визита', 'от 21 000 ₽'],
  ['Имплант Straumann + коронка', '3 визита', 'от 74 000 ₽'],
  ['Брекеты, полный курс', '18–24 мес', 'от 165 000 ₽'],
];

const DOCTORS = [
  ['Ирина Валеева', 'Терапевт, эндодонтист', '14 лет · 4 200 пациентов'],
  ['Артур Хайров', 'Имплантолог, хирург', '17 лет · 1 900 имплантов'],
  ['Мария Гончар', 'Ортодонт', '11 лет · 800 курсов брекетов'],
  ['Павел Смирнов', 'Ортопед', '9 лет · 2 600 коронок'],
];

const FAQ = [
  ['Больно ли лечить?', 'Работаем только под анестезией, подбираем её по вашему порогу чувствительности. Аппликационный гель наносим до укола.'],
  ['Что если план дорогой?', 'Разбиваем лечение на этапы по приоритету и оформляем рассрочку 0% на 12 месяцев без банка.'],
  ['Даёте гарантию?', 'Два года на пломбы и коронки, пять лет на импланты. Гарантийные визиты бесплатны.'],
  ['Можно с ребёнком?', 'Да, есть детский приём с 3 лет. Первый визит — знакомство с кабинетом без лечения.'],
];

function DentalSite() {
  return (
    <div className="tpl">
      <div className="t-border-b text-sm">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-6 py-2.5 @2xl:px-10">
          <span className="t-muted">Москва, Комсомольский пр-т 14 · ежедневно 09:00–21:00</span>
          <span className="flex items-center gap-2 font-semibold">
            <Phone size={13} className="t-primary" /> +7 900 000-00-00
          </span>
        </div>
      </div>

      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Smile size={22} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl">Улыбка+</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Цены', 'Врачи', 'До и после', 'Рассрочка', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Записаться</Btn>
        </div>
      </header>

      {/* hero: promise + trust badges, no form (the price table is the hook) */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1180px]">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="t-chip">Клиника семейной стоматологии с 2011 года</span>
          <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
            Честный план лечения и цена, которая не вырастет в процессе
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-[1.05rem] t-muted">
            Составляем смету на консультации и фиксируем её в договоре. Если работы оказалось
            меньше — вы платите меньше.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn size="lg">Бесплатная консультация</Btn>
            <Btn size="lg" variant="outline">
              Смотреть цены
            </Btn>
          </div>
        </div>

        <div className="mt-14 grid gap-4 @xl:grid-cols-3">
          {TRUST.map(({ icon: Icon, title, text }) => (
            <div key={title} className="t-card flex gap-4 p-6">
              <Icon size={22} className="t-primary mt-0.5 shrink-0" strokeWidth={1.7} />
              <div>
                <h3 className="text-[1.05rem]">{title}</h3>
                <p className="mt-1.5 text-sm t-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* price table — the centrepiece of this layout */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Цены</h2>
            <span className="text-sm t-muted">Полный прайс — 180 позиций, выдаём на приёме</span>
          </div>

          <div className="mt-10">
            <div className="hidden pb-4 text-xs tracking-[0.14em] uppercase t-faint @2xl:grid @2xl:grid-cols-[minmax(0,1fr)_130px_150px] @2xl:gap-6">
              <span>Услуга</span>
              <span>Длительность</span>
              <span className="text-right">Цена</span>
            </div>
            {PRICES.map(([name, time, price]) => (
              <div
                key={name}
                className="t-border-t grid gap-1 py-5 @2xl:grid-cols-[minmax(0,1fr)_130px_150px] @2xl:items-center @2xl:gap-6"
              >
                <span className="font-semibold">{name}</span>
                <span className="text-sm t-muted">{time}</span>
                <span className="t-head text-lg t-primary @2xl:text-right">{price}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* before / after pairs */}
      <Section inner="max-w-[1180px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">До и после</h2>
        <p className="mt-4 max-w-[56ch] t-muted">
          Настоящие работы наших врачей. Пациенты дали согласие на публикацию.
        </p>
        <div className="mt-10 grid gap-8 @3xl:grid-cols-2">
          {[
            ['Реставрация фронтальных зубов', '2 визита · 34 000 ₽'],
            ['Имплантация двух зубов', '4 месяца · 148 000 ₽'],
          ].map(([title, meta], i) => (
            <div key={title}>
              <div className="grid grid-cols-2 gap-2">
                {['До', 'После'].map((label, li) => (
                  <div key={label} className="relative">
                    <Media
                      variant={li === 0 ? 'grid' : 'mesh'}
                      seed={i * 3 + li}
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

      {/* instalments strip */}
      <div className="t-bg-primary">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-14 @2xl:px-10 @4xl:grid-cols-[minmax(0,1fr)_auto] @4xl:items-center">
          <div>
            <h2 className="text-[1.7rem] @2xl:text-[2.2rem]">Рассрочка 0% на 12 месяцев</h2>
            <p className="mt-3 max-w-[54ch] opacity-85">
              Оформляем в клинике за 15 минут, без банка и справок о доходах. Лечение на 120 000 ₽ —
              это 10 000 ₽ в месяц.
            </p>
          </div>
          <Btn size="lg" variant="inverse">
            Рассчитать платёж
          </Btn>
        </div>
      </div>

      {/* doctors */}
      <Section inner="max-w-[1180px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Врачи</h2>
        <div className="mt-10 grid gap-6 @xl:grid-cols-2 @4xl:grid-cols-4">
          {DOCTORS.map(([name, role, exp], i) => (
            <article key={name} className="t-card overflow-hidden">
              <Media variant="portrait" seed={i + 7} radius="none" className="aspect-4/5 w-full" />
              <div className="p-5">
                <h3 className="text-[1.05rem]">{name}</h3>
                <div className="mt-1 text-sm t-primary">{role}</div>
                <div className="mt-1 text-sm t-muted">{exp}</div>
                <span className="mt-4 flex items-center gap-1.5 text-xs t-faint">
                  <BadgeCheck size={13} className="t-primary" /> сертификаты подтверждены
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* faq */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Частые вопросы</h2>
          <div className="mt-10 grid gap-8 @3xl:grid-cols-2 @3xl:gap-x-14">
            {FAQ.map(([q, a]) => (
              <div key={q}>
                <h3 className="text-[1.15rem]">{q}</h3>
                <p className="mt-2.5 text-[0.98rem] t-muted">{a}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* booking */}
      <Section inner="max-w-[1180px]">
        <div className="t-card grid gap-8 p-8 @2xl:p-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.3rem]">Записаться на консультацию</h2>
            <p className="mt-4 t-muted">
              Осмотр, снимок и план лечения со сметой — бесплатно. Занимает 30 минут.
            </p>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            <input className="t-input" placeholder="Имя" />
            <input className="t-input" placeholder="Телефон" />
            <select className="t-input @xl:col-span-2">
              <option>Что беспокоит: профилактика и гигиена</option>
              <option>Что беспокоит: болит зуб</option>
              <option>Что беспокоит: имплантация</option>
              <option>Что беспокоит: брекеты</option>
            </select>
            <Btn size="lg" className="@xl:col-span-2">
              Записаться
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Улыбка+</span>
            <p className="mt-3 text-sm t-muted">
              Семейная стоматология. Лицензия ЛО-77-01-000000 от 12.03.2011.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>Комсомольский пр-т 14</div>
            <div className="mt-2">Ежедневно 09:00–21:00</div>
            <div className="mt-1">+7 900 000-00-00</div>
          </div>
          <div className="text-sm t-muted">
            <div>hello@ulybka-plus.ru</div>
            <div className="mt-4 t-faint">© 2026 Клиника «Улыбка+»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const dental: TemplateDefinition = {
  id: 'dental',
  name: 'Улыбка+',
  category: 'Стоматология',
  description:
    'Сайт стоматологии: прайс таблицей как главный блок, пары «до и после», рассрочка и врачи.',
  tags: ['стоматология', 'зубы', 'имплантация', 'брекеты', 'клиника', 'цены'],
  defaults: {
    primary: '#0284c7',
    secondary: '#7dd3fc',
    button: '#0284c7',
    background: '#fbfdff',
    text: '#0c2233',
    buttonShape: 'soft',
    font: 'manrope',
    cardRadius: 14,
  },
  Component: DentalSite,
};
