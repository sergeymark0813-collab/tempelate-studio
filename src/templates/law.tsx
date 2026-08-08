import { ArrowRight, Phone, Scale } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const PRACTICE = [
  ['Корпоративное право', 'Сделки M&A, реорганизации, корпоративные конфликты'],
  ['Арбитраж', 'Споры с контрагентами, взыскание, банкротство'],
  ['Налоги', 'Проверки, доначисления, налоговое планирование'],
  ['Недвижимость', 'Сопровождение сделок, земельные споры, аренда'],
  ['Интеллектуальная собственность', 'Товарные знаки, лицензии, защита от копирования'],
  ['Трудовые споры', 'Увольнения, коллективные конфликты, комплаенс'],
];

const PARTNERS = [
  ['Андрей Тарасов', 'Управляющий партнёр', 'к.ю.н., 24 года практики'],
  ['Ольга Венская', 'Партнёр, арбитраж', '19 лет практики'],
  ['Максим Дорн', 'Партнёр, налоги', '16 лет практики'],
  ['Ирина Соловьёва', 'Советник, IP', '12 лет практики'],
];

const CASES = [
  ['2026', 'Оспаривание доначисления НДС', '212 млн ₽ сохранено клиенту'],
  ['2025', 'Защита доли в производственном холдинге', 'Иск отклонён полностью'],
  ['2025', 'Взыскание по договору поставки', '48 млн ₽ взыскано в первой инстанции'],
  ['2024', 'Сопровождение продажи бизнеса', 'Сделка закрыта за 11 недель'],
];

function LawSite() {
  return (
    <div className="tpl">
      <div className="t-border-b text-sm">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-2.5 @2xl:px-10">
          <span className="t-muted">Москва · Санкт-Петербург · Алматы</span>
          <span className="flex items-center gap-2 font-semibold">
            <Phone size={13} className="t-primary" /> +7 900 000-00-00
          </span>
        </div>
      </div>

      {/* centred header — unusual for the catalog, deliberately formal */}
      <header className="t-border-b">
        <div className="mx-auto max-w-[1160px] px-6 py-8 text-center @2xl:px-10">
          <span className="inline-flex items-center gap-2.5">
            <Scale size={22} className="t-primary" strokeWidth={1.5} />
            <span className="t-head text-2xl tracking-[0.14em] uppercase">Тарасов и Партнёры</span>
          </span>
          <nav className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm t-muted">
            {['Практики', 'Команда', 'Дела', 'Публикации', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </div>
      </header>

      {/* hero — type only, no imagery */}
      <Section pad="py-16 @2xl:py-24" inner="max-w-[1160px]">
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[2.4rem] leading-[1.08] @2xl:text-[3.6rem]">
            Юридическая практика для бизнеса, которому есть что защищать
          </h1>
          <p className="mx-auto mt-7 max-w-[54ch] text-[1.05rem] t-muted">
            Работаем с 2004 года. Ведём дела в арбитраже, сопровождаем сделки и снимаем налоговые
            риски до того, как они станут спором.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Btn size="lg">Записаться на консультацию</Btn>
            <Btn size="lg" variant="outline">
              Практики
            </Btn>
          </div>
        </div>

        <div className="t-border-t mt-16 grid gap-8 pt-10 @2xl:grid-cols-3">
          {[
            ['22 года', 'непрерывной практики'],
            ['1 400+', 'завершённых дел'],
            ['92%', 'дел в пользу клиента'],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <div className="t-head text-4xl t-primary">{value}</div>
              <div className="mt-2 text-sm t-muted">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* practice areas — rules, not cards */}
      <div className="t-border-t t-border-b">
        <Section inner="max-w-[1160px]">
          <div className="grid gap-10 @4xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <div>
              <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Практики</h2>
              <p className="mt-5 text-sm t-muted">
                Ведём дело от анализа документов до исполнения решения. Стоимость фиксируем в
                договоре по этапам.
              </p>
            </div>
            <div>
              {PRACTICE.map(([title, text], i) => (
                <div
                  key={title}
                  className={`flex items-baseline gap-6 py-6 @2xl:gap-10 ${i > 0 ? 't-border-t' : ''}`}
                >
                  <span className="t-head w-10 shrink-0 text-sm t-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[1.3rem]">{title}</h3>
                    <p className="mt-1.5 text-[0.95rem] t-muted">{text}</p>
                  </div>
                  <ArrowRight size={17} className="t-primary shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* approach */}
      <Section inner="max-w-[1160px]">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] @4xl:gap-16">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Как мы работаем</h2>
            <div className="mt-8 grid gap-8 @xl:grid-cols-2">
              {[
                ['Оценка до договора', 'Первая встреча бесплатна. Честно скажем, если перспектив нет.'],
                ['Один партнёр на дело', 'Вашим вопросом занимается партнёр, а не помощник.'],
                ['Понятная отчётность', 'Каждые две недели — статус, следующие шаги и потраченные часы.'],
                ['Фиксированные этапы', 'Бюджет закреплён в договоре, «сюрпризов» в счёте не бывает.'],
              ].map(([title, text]) => (
                <div key={title} className="border-l-2 pl-5" style={{ borderColor: 'var(--tp-primary)' }}>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-2 text-sm t-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <Media variant="grid" seed={3} className="aspect-4/5 w-full" />
        </div>
      </Section>

      {/* partners */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1160px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Партнёры и советники</h2>
          <div className="mt-10 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-4">
            {PARTNERS.map(([name, role, exp], i) => (
              <div key={name}>
                <Media variant="portrait" seed={i + 5} className="aspect-4/5 w-full" />
                <h3 className="mt-4 text-[1.05rem]">{name}</h3>
                <div className="mt-1 text-sm t-primary">{role}</div>
                <div className="text-sm t-muted">{exp}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* cases as a table */}
      <Section inner="max-w-[1160px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Избранные дела</h2>
        <div className="mt-10">
          <div className="hidden gap-6 pb-4 text-xs tracking-[0.16em] uppercase t-faint @3xl:grid @3xl:grid-cols-[90px_minmax(0,1fr)_minmax(0,0.9fr)]">
            <span>Год</span>
            <span>Дело</span>
            <span>Результат</span>
          </div>
          {CASES.map(([year, title, result]) => (
            <div
              key={title}
              className="t-border-t grid gap-2 py-6 @3xl:grid-cols-[90px_minmax(0,1fr)_minmax(0,0.9fr)] @3xl:gap-6"
            >
              <span className="t-head text-sm t-primary">{year}</span>
              <span className="text-[1.05rem]">{title}</span>
              <span className="text-[0.95rem] t-muted">{result}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* consultation — single inline row on a dark band */}
      <div className="t-inverse">
        <div className="mx-auto max-w-[1160px] px-6 py-16 @2xl:px-10">
          <div className="grid gap-8 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-16">
            <div>
              <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Первая консультация — бесплатно</h2>
              <p className="mt-4 opacity-70">
                40 минут с партнёром: разберём ситуацию и скажем, что делать в первую очередь.
              </p>
            </div>
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Имя" />
              <input className="t-input" placeholder="Телефон" />
              <input className="t-input @xl:col-span-2" placeholder="Кратко о вопросе" />
              <Btn size="lg" variant="inverse" className="@xl:col-span-2">
                Отправить
              </Btn>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto max-w-[1160px] px-6 py-12 text-center @2xl:px-10">
          <span className="t-head text-lg tracking-[0.14em] uppercase">Тарасов и Партнёры</span>
          <div className="mt-4 text-sm t-muted">
            Москва, Романов пер. 4 · +7 900 000-00-00 · office@tarasov-partners.ru
          </div>
          <div className="mt-6 text-xs t-faint">© 2026 Адвокатское бюро «Тарасов и Партнёры»</div>
        </div>
      </footer>
    </div>
  );
}

export const law: TemplateDefinition = {
  id: 'law',
  name: 'Тарасов и Партнёры',
  category: 'Юридические услуги',
  description:
    'Строгий сайт адвокатского бюро: центрированная шапка, практики линиями, таблица дел.',
  tags: ['юрист', 'адвокат', 'право', 'арбитраж', 'консультация', 'бюро'],
  defaults: {
    primary: '#1c2e4a',
    secondary: '#a8895a',
    button: '#1c2e4a',
    background: '#ffffff',
    text: '#101828',
    buttonShape: 'sharp',
    font: 'cormorant',
    cardRadius: 2,
  },
  Component: LawSite,
};
