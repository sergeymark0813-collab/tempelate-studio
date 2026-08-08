import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Logo, LogoMarquee, Media, Section } from './ui';

const SERVICES = [
  ['Стратегия', 'Позиционирование, исследования, tone of voice'],
  ['Айдентика', 'Логотип, система, гайдлайн, носители'],
  ['Digital', 'Сайты, лендинги, интерфейсы продуктов'],
  ['Продвижение', 'Медиапланирование, креативы, аналитика'],
];

const CASES = [
  {
    client: 'Volta',
    title: 'Ребрендинг сети зарядных станций',
    result: '+64% узнаваемость за 6 месяцев',
    variant: 'grid' as const,
  },
  {
    client: 'Nord Coffee',
    title: 'Запуск D2C-платформы',
    result: '3 200 подписок в первый месяц',
    variant: 'mesh' as const,
  },
  {
    client: 'Kepler',
    title: 'Айдентика для fintech-продукта',
    result: 'Сокращение CAC на 28%',
    variant: 'rings' as const,
  },
];

const TEAM = [
  ['Артём Волошин', 'Креативный директор'],
  ['Лия Костина', 'Стратег'],
  ['Роман Дегтярёв', 'Арт-директор'],
];

function AgencySite() {
  return (
    <div className="tpl">
      <header>
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 @2xl:px-12">
          <Logo name="Форма" mark="Ф" shape="circle" />
          <nav className="hidden gap-8 text-sm @3xl:flex">
            {['Услуги', 'Кейсы', 'Команда', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm" variant="outline">
            Бриф
          </Btn>
        </div>
      </header>

      {/* oversized typographic hero */}
      <section className="mx-auto max-w-[1320px] px-6 pt-12 pb-16 @2xl:px-12 @2xl:pt-20 @2xl:pb-24">
        <h1 className="text-[2.2rem] leading-[0.94] @sm:text-[2.8rem] @2xl:text-[5.4rem] @5xl:text-[7rem]">
          Брендинговое
          <br />
          агентство
          <span className="t-primary">.</span>
          <br />
          <span className="t-grad-text">Полного цикла</span>
        </h1>

        <div className="mt-12 grid gap-10 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @3xl:items-end">
          <p className="max-w-[46ch] text-[1.1rem] t-muted">
            Собираем бренды, которые работают в продаже, а не только в презентации. 34 проекта за
            последние три года — от локальных сетей до международных продуктов.
          </p>
          <div className="flex flex-wrap gap-3 @3xl:justify-end">
            <Btn size="lg">
              Обсудить проект <ArrowRight size={17} />
            </Btn>
            <Btn size="lg" variant="soft">
              Смотреть кейсы
            </Btn>
          </div>
        </div>
      </section>

      <Media variant="mesh" seed={4} radius="none" className="h-[240px] w-full @3xl:h-[420px]" />

      <div className="t-border-b">
        <div className="mx-auto max-w-[1320px] px-6 @2xl:px-12">
          <LogoMarquee items={['VOLTA', 'NORD', 'KEPLER', 'ATLAS', 'LUME', 'RESURS']} />
        </div>
      </div>

      {/* services as numbered rows */}
      <Section inner="max-w-[1320px]">
        <div className="grid gap-10 @3xl:grid-cols-[320px_minmax(0,1fr)]">
          <h2 className="text-[2.2rem] @2xl:text-[3rem]">Что мы делаем</h2>
          <div>
            {SERVICES.map(([title, text], i) => (
              <div
                key={title}
                className={`grid gap-3 py-7 @2xl:grid-cols-[70px_240px_minmax(0,1fr)] @2xl:items-baseline ${
                  i > 0 ? 't-border-t' : ''
                }`}
              >
                <span className="t-head t-primary text-lg">0{i + 1}</span>
                <h3 className="text-[1.5rem]">{title}</h3>
                <p className="text-[0.98rem] t-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* cases — alternating rows */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[2.2rem] @2xl:text-[3rem]">Избранные кейсы</h2>
            <span className="inline-flex items-center gap-2 text-sm font-semibold t-primary">
              Все проекты <ArrowUpRight size={15} />
            </span>
          </div>

          <div className="mt-14 grid gap-14">
            {CASES.map((item, i) => (
              <article
                key={item.client}
                className={`grid items-center gap-8 @4xl:grid-cols-2 @4xl:gap-14 ${
                  i % 2 === 1 ? '@4xl:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Media variant={item.variant} seed={i + 3} radius="card-lg" className="aspect-4/3 w-full" />
                <div>
                  <div className="t-eyebrow">{item.client}</div>
                  <h3 className="mt-4 text-[1.8rem] @2xl:text-[2.3rem]">{item.title}</h3>
                  <p className="mt-5 text-[1.02rem] t-muted">{item.result}</p>
                  <div className="mt-7">
                    <Btn variant="outline">Читать кейс</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* team */}
      <Section inner="max-w-[1320px]">
        <h2 className="text-[2.2rem] @2xl:text-[3rem]">Команда</h2>
        <div className="mt-12 grid gap-10 @2xl:grid-cols-3">
          {TEAM.map(([name, role], i) => (
            <div key={name} className="text-center">
              <Media
                variant="portrait"
                seed={i + 6}
                radius="pill"
                className="mx-auto aspect-square w-[190px]"
              />
              <div className="mt-6 text-lg font-semibold">{name}</div>
              <div className="text-sm t-muted">{role}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* contact */}
      <div className="t-bg-primary">
        <div className="mx-auto max-w-[1320px] px-6 py-20 @2xl:px-12">
          <h2 className="max-w-[24ch] text-[2.4rem] @2xl:text-[4rem]">
            Расскажите, что нужно сделать
          </h2>
          <div className="mt-10 grid gap-8 @3xl:grid-cols-[minmax(0,1fr)_auto] @3xl:items-end">
            <p className="max-w-[44ch] opacity-80">
              Заполните бриф или напишите — соберём встречу на 40 минут и вернёмся с оценкой.
            </p>
            <Btn size="lg" variant="inverse">
              Заполнить бриф
            </Btn>
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-12">
          <Logo name="Форма" mark="Ф" shape="circle" />
          <span>hello@forma.agency · +7 900 000-00-00</span>
          <span>© 2026 Форма</span>
        </div>
      </footer>
    </div>
  );
}

export const agency: TemplateDefinition = {
  id: 'agency',
  name: 'Форма',
  category: 'Агентство',
  description:
    'Смелый сайт брендингового агентства: крупная типографика, кейсы в шахматном порядке.',
  tags: ['агентство', 'брендинг', 'реклама', 'кейсы', 'digital'],
  defaults: {
    primary: '#ff5722',
    secondary: '#111111',
    button: '#111111',
    background: '#ffffff',
    text: '#101010',
    buttonShape: 'pill',
    font: 'unbounded',
    cardRadius: 24,
  },
  Component: AgencySite,
};
