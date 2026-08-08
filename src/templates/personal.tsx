import { ArrowRight, CalendarDays, Mic, PenLine, Users } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, LogoMarquee, Media, Section, Stars } from './ui';

const OFFERS = [
  {
    icon: Users,
    title: 'Личный коучинг',
    text: 'Шесть встреч по 60 минут: цели, ограничивающие сценарии, план на квартал.',
    price: 'от 60 000 ₽',
  },
  {
    icon: Mic,
    title: 'Выступления',
    text: 'Лекции и модерация для конференций и корпоративных событий.',
    price: 'по запросу',
  },
  {
    icon: PenLine,
    title: 'Курс «Опора»',
    text: 'Восемь недель асинхронно: видео, практики и разбор в закрытом чате.',
    price: '24 000 ₽',
  },
];

const MILESTONES = [
  ['2026', 'Книга «Опора» — 40 000 экземпляров'],
  ['2024', 'Курс прошли 6 200 человек'],
  ['2022', 'TEDx: «Как перестать себя торопить»'],
  ['2019', 'Частная практика, 1 400 часов консультаций'],
];

function PersonalSite() {
  return (
    <div className="tpl">
      {/* hero */}
      <div className="t-surface">
        <div className="mx-auto max-w-[1160px] px-6 @2xl:px-10">
          <header className="flex items-center justify-between py-6">
            <span className="t-head text-lg tracking-[0.2em] uppercase">А. Реут</span>
            <nav className="hidden gap-7 text-sm t-muted @3xl:flex">
              {['О себе', 'Форматы', 'Книга', 'Блог', 'Контакты'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>
            <Btn size="sm" variant="outline">
              Записаться
            </Btn>
          </header>

          <div className="grid items-end gap-10 pb-16 @4xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] @4xl:gap-16 @4xl:pb-20">
            <Media variant="portrait" seed={2} radius="card-lg" className="aspect-4/5 w-full" />
            <div className="pb-4">
              <Eyebrow>Психолог · автор книги «Опора»</Eyebrow>
              <h1 className="mt-6 text-[2.8rem] leading-[1.03] @2xl:text-[4rem] @5xl:text-[4.6rem]">
                Анна Реут
              </h1>
              <p className="mt-7 max-w-[48ch] text-[1.08rem] t-muted">
                Помогаю взрослым людям возвращать себе устойчивость: без марафонов мотивации и
                обещаний «изменить жизнь за неделю».
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Btn size="lg">
                  Записаться на консультацию <ArrowRight size={17} />
                </Btn>
                <Btn size="lg" variant="ghost">
                  Читать блог
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* press */}
      <div className="t-border-t t-border-b">
        <div className="mx-auto max-w-[1160px] px-6 @2xl:px-10">
          <div className="pt-6 text-center text-xs tracking-[0.2em] uppercase t-faint">
            обо мне писали
          </div>
          <LogoMarquee items={['Forbes', 'РБК', 'Афиша', 'Wonderzine', 'Кинопоиск', 'Т—Ж']} />
        </div>
      </div>

      {/* offers */}
      <Section inner="max-w-[1160px]">
        <div className="mx-auto max-w-[620px] text-center">
          <Eyebrow className="text-center">Форматы работы</Eyebrow>
          <h2 className="mt-4 text-[2rem] @2xl:text-[2.7rem]">Как я могу помочь</h2>
        </div>
        <div className="mt-12 grid gap-6 @2xl:grid-cols-3">
          {OFFERS.map(({ icon: Icon, title, text, price }) => (
            <article key={title} className="t-card flex flex-col p-8">
              <Icon size={26} className="t-primary" strokeWidth={1.5} />
              <h3 className="mt-6 text-xl">{title}</h3>
              <p className="mt-3 flex-1 text-[0.96rem] t-muted">{text}</p>
              <div className="t-border-t mt-6 flex items-center justify-between pt-5">
                <span className="t-head text-lg">{price}</span>
                <span className="text-sm font-semibold t-primary">Подробнее</span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* about split */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1160px]">
          <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] @4xl:gap-16">
            <div>
              <Eyebrow>О себе</Eyebrow>
              <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
                Двенадцать лет практики и ни одного универсального совета
              </h2>
              <div className="mt-7 grid gap-4 text-[1.02rem] t-muted">
                <p>
                  Закончила психфак МГУ, прошла обучение в гештальт-подходе, супервизируюсь каждую
                  неделю. Работаю с тревогой, выгоранием и кризисами тридцати-сорока лет.
                </p>
                <p>
                  Не обещаю быстрых решений. Обещаю честный разговор, аккуратные вопросы и структуру,
                  на которую можно опереться.
                </p>
              </div>
            </div>
            <dl className="grid gap-5">
              {MILESTONES.map(([year, text]) => (
                <div key={year} className="flex gap-6 pb-5" style={{ borderBottom: '1px solid var(--tp-border)' }}>
                  <dt className="t-head w-16 shrink-0 text-lg t-primary">{year}</dt>
                  <dd className="text-[0.98rem]">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      </div>

      {/* testimonials */}
      <Section inner="max-w-[1160px]">
        <div className="grid gap-6 @3xl:grid-cols-2">
          {[
            [
              '«Впервые за годы я не ушла с сессии с чувством, что мне что-то продали. Появилось ощущение опоры.»',
              'Ольга, 34',
            ],
            [
              '«Шесть встреч — и я наконец разобрался, почему всё время бегу. Практики работают.»',
              'Дмитрий, 41',
            ],
          ].map(([quote, author]) => (
            <blockquote key={author} className="t-card p-8">
              <Stars value={5} size={15} />
              <p className="t-head mt-5 text-[1.25rem] leading-snug">{quote}</p>
              <footer className="mt-6 text-sm t-muted">{author}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* booking */}
      <Section inner="max-w-[1160px]" pad="pb-20">
        <div className="t-card t-shadow-lg grid gap-10 p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow>Запись</Eyebrow>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.4rem]">Свободные слоты на неделю</h2>
            <p className="mt-5 t-muted">
              Первая встреча — 30 минут бесплатно, чтобы понять, подходим ли мы друг другу.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm t-muted">
              <CalendarDays size={18} className="t-primary" />
              Онлайн · часовой пояс МСК
            </div>
          </div>
          <div className="grid gap-3">
            {[
              ['Вторник, 12 мая', '11:00 · 14:00 · 18:00'],
              ['Четверг, 14 мая', '10:00 · 16:00'],
              ['Пятница, 15 мая', '12:00 · 15:00 · 19:00'],
            ].map(([day, slots]) => (
              <div
                key={day}
                className="t-r-card-sm flex flex-wrap items-center justify-between gap-3 p-4"
                style={{ background: 'var(--tp-surface-2)' }}
              >
                <div>
                  <div className="font-semibold">{day}</div>
                  <div className="text-sm t-muted">{slots}</div>
                </div>
                <Btn size="sm">Выбрать</Btn>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-base tracking-[0.2em] uppercase">А. Реут</span>
          <span>hello@areut.ru · Telegram</span>
          <span>© 2026 Анна Реут</span>
        </div>
      </footer>
    </div>
  );
}

export const personal: TemplateDefinition = {
  id: 'personal',
  name: 'Анна Реут',
  category: 'Личный бренд',
  description:
    'Сайт эксперта: портрет, форматы работы, вехи карьеры и запись на свободные слоты.',
  tags: ['личный бренд', 'эксперт', 'коуч', 'психолог', 'консультации'],
  defaults: {
    primary: '#8a5a3b',
    secondary: '#c9a227',
    button: '#2f2a26',
    background: '#fbf8f4',
    text: '#241f1a',
    buttonShape: 'pill',
    font: 'playfair',
    cardRadius: 26,
  },
  Component: PersonalSite,
};
