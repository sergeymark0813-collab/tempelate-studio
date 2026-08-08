import { Check, Heart, Instagram } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section, type MediaVariant } from './ui';

const TIMELINE = [
  ['Знакомство', 'Час разговора о том, какой вы хотите видеть день. Без каталогов и шаблонов.'],
  ['Концепция и смета', 'Через неделю — раскадровка дня, палитра, площадки и понятный бюджет.'],
  ['Подрядчики', 'Собираем команду: декор, флористика, музыка, фото, кейтеринг. Все проверенные.'],
  ['Репетиция', 'За два дня проходим сценарий на площадке вместе с координаторами.'],
  ['День свадьбы', 'Вы ничего не решаете. С вами два координатора и полный тайминг у каждой службы.'],
];

const EVENTS: { couple: string; meta: string; variant: MediaVariant }[] = [
  { couple: 'Аня и Марк', meta: 'Суздаль · 80 гостей', variant: 'mesh' },
  { couple: 'Лиза и Тимур', meta: 'Загородный клуб · 140 гостей', variant: 'rings' },
  { couple: 'Вера и Ян', meta: 'Крыша в центре · 40 гостей', variant: 'dots' },
];

const PACKAGES = [
  {
    name: 'Координация',
    price: '90 000 ₽',
    text: 'Вы всё придумали сами — мы проводим день без сбоев.',
    perks: ['Тайминг и репетиция', 'Два координатора', 'Работа с подрядчиками в день'],
  },
  {
    name: 'Полная организация',
    price: '280 000 ₽',
    text: 'От идеи до последнего гостя. Самый частый выбор.',
    perks: [
      'Концепция и раскадровка',
      'Подбор площадки и подрядчиков',
      'Декор и флористика под ключ',
      'Координация в день · 3 человека',
    ],
    featured: true,
  },
  {
    name: 'Свадьба за границей',
    price: 'от 450 000 ₽',
    text: 'Италия, Грузия, Турция. Логистика гостей на нас.',
    perks: ['Выездная регистрация', 'Логистика и проживание гостей', 'Локальная команда'],
  },
];

function WeddingSite() {
  return (
    <div className="tpl">
      <header>
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-6 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Heart size={18} className="t-primary" fill="currentColor" />
            <span className="t-head text-xl tracking-[0.18em] uppercase">Мгновение</span>
          </span>
          <nav className="hidden gap-8 text-sm t-muted @3xl:flex">
            {['Услуги', 'Свадьбы', 'Пакеты', 'Отзывы'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm" variant="outline">
            Обсудить дату
          </Btn>
        </div>
      </header>

      {/* hero — text left, vertical strip of three narrow images right */}
      <Section pad="pt-8 pb-16 @2xl:pt-12 @2xl:pb-24" inner="max-w-[1160px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] @4xl:items-center @4xl:gap-16">
          <div>
            <div className="t-eyebrow">Свадебное агентство · Москва и выезды</div>
            <h1 className="mt-6 text-[2.4rem] leading-[1.05] @2xl:text-[3.5rem]">
              Ваш день — <span className="t-grad-text">без единой заботы</span> с вашей стороны
            </h1>
            <p className="mt-7 max-w-[46ch] text-[1.05rem] t-muted">
              Организуем свадьбы на 20 и на 200 гостей. Считаем бюджет честно и никогда не берём
              комиссию с подрядчиков втайне от вас.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Проверить свободную дату</Btn>
              <Btn size="lg" variant="ghost">
                Посмотреть свадьбы
              </Btn>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                ['180+', 'свадеб с 2016 года'],
                ['26', 'проверенных подрядчиков'],
                ['0', 'скрытых комиссий'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="t-head text-2xl t-primary">{v}</div>
                  <div className="text-sm t-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Media variant="portrait" seed={1} radius="card-lg" className="aspect-[2/5] w-full" />
            <Media variant="mesh" seed={4} radius="card-lg" className="mt-8 aspect-[2/5] w-full" />
            <Media variant="rings" seed={7} radius="card-lg" className="aspect-[2/5] w-full" />
          </div>
        </div>
      </Section>

      {/* timeline with a connector rail */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1160px]">
          <div className="mx-auto max-w-[620px] text-center">
            <div className="t-eyebrow">Путь</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.6rem]">Пять шагов до вашего дня</h2>
          </div>

          <ol className="relative mx-auto mt-14 max-w-[760px]">
            <span
              className="absolute top-2 bottom-2 left-[15px] w-px"
              style={{ background: 'var(--tp-border-strong)' }}
              aria-hidden
            />
            {TIMELINE.map(([title, text], i) => (
              <li key={title} className="relative flex gap-6 pb-10 last:pb-0">
                <span
                  className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold"
                  style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-[1.25rem]">{title}</h3>
                  <p className="mt-2 text-[0.98rem] t-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* recent weddings */}
      <Section inner="max-w-[1160px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Недавние свадьбы</h2>
          <span className="flex items-center gap-2 text-sm t-muted">
            <Instagram size={16} className="t-primary" /> @mgnovenie.wed
          </span>
        </div>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {EVENTS.map((event, i) => (
            <figure key={event.couple}>
              <Media
                variant={event.variant}
                seed={i + 9}
                radius="card-lg"
                className="aspect-4/5 w-full"
              />
              <figcaption className="mt-4">
                <div className="t-head text-lg">{event.couple}</div>
                <div className="text-sm t-muted">{event.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* packages */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1160px]">
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Форматы работы</h2>
            <p className="mt-4 t-muted">
              Стоимость организации фиксированная и не зависит от бюджета свадьбы.
            </p>
          </div>
          <div className="mt-12 grid gap-6 @2xl:grid-cols-3">
            {PACKAGES.map((pack) => (
              <div
                key={pack.name}
                className="t-card flex flex-col p-8"
                style={
                  pack.featured
                    ? { background: 'var(--tp-bg)', borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' }
                    : { background: 'var(--tp-bg)' }
                }
              >
                {pack.featured && <span className="t-chip mb-5 self-start">Выбирают чаще</span>}
                <h3 className="text-[1.4rem]">{pack.name}</h3>
                <div className="t-head mt-3 text-2xl t-primary">{pack.price}</div>
                <p className="mt-4 text-sm t-muted">{pack.text}</p>
                <ul className="mt-6 grid flex-1 gap-3 text-[0.95rem]">
                  {pack.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <Check size={16} className="t-primary mt-0.5 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Btn className="mt-8 w-full" variant={pack.featured ? 'solid' : 'outline'}>
                  Узнать подробнее
                </Btn>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* couples */}
      <Section inner="max-w-[1160px]">
        <div className="grid gap-6 @3xl:grid-cols-2">
          {[
            ['«За три месяца мы ни разу не поссорились из-за подготовки — все споры забирала на себя Катя.»', 'Аня и Марк'],
            ['«Дождь начался ровно в момент выездной. Через семь минут стоял шатёр, гости даже не заметили.»', 'Лиза и Тимур'],
          ].map(([quote, author]) => (
            <blockquote key={author} className="t-card p-8">
              <Heart size={18} className="t-primary" fill="currentColor" />
              <p className="t-head mt-5 text-[1.2rem] leading-snug">{quote}</p>
              <footer className="mt-5 text-sm t-muted">{author}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* form */}
      <Section inner="max-w-[1160px]" pad="pb-20">
        <div
          className="t-r-card-lg grid gap-10 p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          style={{
            backgroundImage: 'linear-gradient(120deg, var(--tp-primary), var(--tp-secondary))',
            color: 'var(--tp-on-primary)',
          }}
        >
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Расскажите про вашу дату</h2>
            <p className="mt-4 max-w-[42ch] opacity-85">
              Отвечаем в течение дня. Если дата занята — предложим коллег, которым доверяем.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Имена" />
              <input className="t-input" placeholder="Телефон" />
            </div>
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Дата свадьбы" />
              <input className="t-input" placeholder="Гостей" />
            </div>
            <Btn size="lg" variant="inverse" className="w-full">
              Отправить заявку
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-base tracking-[0.18em] uppercase">Мгновение</span>
          <span>hello@mgnovenie.wed · +7 900 000-00-00</span>
          <span>© 2026 Свадебное агентство «Мгновение»</span>
        </div>
      </footer>
    </div>
  );
}

export const wedding: TemplateDefinition = {
  id: 'wedding',
  name: 'Мгновение',
  category: 'Свадебное агентство',
  description:
    'Сайт свадебного агентства: вертикальный таймлайн подготовки, свадьбы, три формата работы.',
  tags: ['свадьба', 'агентство', 'event', 'организация', 'торжество'],
  defaults: {
    primary: '#a8756c',
    secondary: '#d9c2a6',
    button: '#a8756c',
    background: '#fffaf7',
    text: '#33231f',
    buttonShape: 'pill',
    font: 'cormorant',
    cardRadius: 30,
  },
  Component: WeddingSite,
};
