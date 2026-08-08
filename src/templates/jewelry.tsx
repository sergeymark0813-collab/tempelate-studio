import { Award, Gem, Mail, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const GUARANTEES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: 'Пробирная палата', text: 'Каждое изделие с государственным клеймом' },
  { icon: Award, title: 'Сертификаты GIA', text: 'На все камни от 0,3 карата' },
  { icon: Gem, title: 'Бесплатная чистка', text: 'Пожизненно, приносите раз в год' },
  { icon: Mail, title: 'Обмен 14 дней', text: 'Если размер не подошёл — меняем без вопросов' },
];

const COLLECTIONS = [
  ['Северный лёд', 'Белое золото и бриллианты огранки «принцесса»'],
  ['Тепло', 'Красное золото, топазы и цитрины'],
  ['Линия', 'Минимализм: гладкое золото без камней'],
];

const ITEMS = [
  ['Кольцо «Иней», 585', '0,24 ct · белое золото', '84 000 ₽'],
  ['Серьги «Капли»', '0,18 ct · красное золото', '62 000 ₽'],
  ['Подвеска «Линия»', 'без камней · 585', '28 000 ₽'],
  ['Кольцо «Тепло»', 'топаз 1,1 ct', '46 000 ₽'],
  ['Браслет «Звено»', 'красное золото 585', '71 000 ₽'],
  ['Обручальные, пара', 'гладкие, 4 мм', '96 000 ₽'],
  ['Серьги-пусеты', '0,10 ct · белое золото', '34 000 ₽'],
  ['Кольцо «Ореол»', '0,45 ct · платина', '186 000 ₽'],
];

const CUSTOM = [
  ['Эскиз', 'Обсуждаем идею и рисуем от руки. Бесплатно, до трёх вариантов.'],
  ['3D-модель', 'Показываем изделие со всех сторон до литья, вносим правки.'],
  ['Камни', 'Подбираем по сертификату GIA, вы видите их до закрепки.'],
  ['Изготовление', 'Литьё, закрепка и полировка в своей мастерской — 14–21 день.'],
];

function JewelrySite() {
  return (
    <div className="tpl">
      {/* thin centred header — editorial, not commercial */}
      <header className="t-border-b">
        <div className="mx-auto max-w-[1280px] px-6 py-7 text-center @2xl:px-10">
          <span className="inline-flex items-center gap-2.5">
            <Gem size={19} className="t-primary" strokeWidth={1.4} />
            <span className="t-head text-2xl tracking-[0.3em] uppercase">Карат</span>
          </span>
          <nav className="mt-6 flex flex-wrap justify-center gap-x-9 gap-y-2 text-xs tracking-[0.16em] uppercase t-muted">
            {['Коллекции', 'Изделия', 'Свой проект', 'Гарантия', 'Бутик'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </div>
      </header>

      {/* full-bleed editorial hero */}
      <div className="relative">
        <Media variant="rings" seed={2} radius="none" className="min-h-[520px] w-full" overlay />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-[26ch] text-center">
            <div className="text-xs tracking-[0.24em] text-white/75 uppercase">Коллекция 2026</div>
            <h1 className="mt-5 text-[2.4rem] leading-[1.06] text-white @2xl:text-[3.6rem]">
              Северный лёд
            </h1>
            <p className="mx-auto mt-5 max-w-[34ch] text-white/80">
              Белое золото, бриллианты огранки «принцесса» и ни одной лишней детали.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn size="lg">Смотреть коллекцию</Btn>
              <Btn
                size="lg"
                variant="outline"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.45)' }}
              >
                Записаться в бутик
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {/* collections as three large tiles */}
      <Section inner="max-w-[1280px]" pad="py-16 @2xl:py-24">
        <div className="mx-auto max-w-[620px] text-center">
          <div className="t-eyebrow">Коллекции</div>
          <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.6rem]">Три линии, одна мастерская</h2>
        </div>
        <div className="mt-12 grid gap-6 @2xl:grid-cols-3">
          {COLLECTIONS.map(([name, text], i) => (
            <figure key={name}>
              <Media variant={i === 2 ? 'mesh' : 'rings'} seed={i + 4} className="aspect-4/5 w-full" />
              <figcaption className="mt-5 text-center">
                <h3 className="t-head text-[1.35rem]">{name}</h3>
                <p className="mx-auto mt-2 max-w-[30ch] text-sm t-muted">{text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* items grid */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Изделия</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-[0.14em] uppercase t-muted">
              {['Всё', 'Кольца', 'Серьги', 'Подвески', 'Обручальные'].map((f, i) => (
                <span key={f} className={i === 0 ? 'font-bold t-primary' : undefined}>
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
            {ITEMS.map(([name, spec, price], i) => (
              <article key={name}>
                <Media
                  variant="product"
                  seed={i + 8}
                  className="aspect-square w-full"
                />
                <h3 className="mt-4 text-[1.02rem]">{name}</h3>
                <div className="mt-1 text-sm t-muted">{spec}</div>
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <span className="t-head text-lg">{price}</span>
                  <span className="text-xs tracking-[0.14em] uppercase t-primary">Подробнее</span>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* bespoke process */}
      <Section inner="max-w-[1280px]">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @4xl:gap-16">
          <div>
            <div className="t-eyebrow">Свой проект</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
              Изделие, которого больше ни у кого не будет
            </h2>
            <p className="mt-6 t-muted">
              Делаем на заказ кольца для помолвки, обручальные пары и подарки к датам. Работаем с
              вашими камнями и переплавляем старое золото в зачёт стоимости.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Обсудить проект</Btn>
              <Btn size="lg" variant="outline">
                Примеры работ
              </Btn>
            </div>
          </div>

          <div>
            {CUSTOM.map(([title, text], i) => (
              <div key={title} className={`flex gap-6 py-6 ${i > 0 ? 't-border-t' : ''}`}>
                <span className="t-head w-8 shrink-0 text-sm t-primary">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.15rem]">{title}</h3>
                  <p className="mt-1.5 text-[0.95rem] t-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* guarantees strip */}
      <div className="t-inverse">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-14 @2xl:px-10 @xl:grid-cols-2 @4xl:grid-cols-4">
          {GUARANTEES.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon size={22} strokeWidth={1.4} className="opacity-70" />
              <h3 className="mt-4 text-[1.05rem]">{title}</h3>
              <p className="mt-2 text-sm opacity-65">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* boutique */}
      <Section inner="max-w-[1280px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-16">
          <Media variant="mesh" seed={17} className="aspect-4/3 w-full" />
          <div>
            <div className="t-eyebrow">Бутик</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">Столешников переулок, 9</h2>
            <p className="mt-5 t-muted">
              Приходите примерить без записи или забронируйте персональный визит — подготовим
              изделия заранее и никого больше в зале не будет.
            </p>
            <div className="mt-7 grid gap-2 text-sm">
              <span>Ежедневно 11:00–21:00</span>
              <span>+7 900 000-00-00</span>
              <span>boutique@karat-jewelry.ru</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Записаться на визит</Btn>
              <Btn size="lg" variant="ghost">
                Как добраться
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto max-w-[1280px] px-6 py-12 text-center @2xl:px-10">
          <span className="t-head text-lg tracking-[0.3em] uppercase">Карат</span>
          <div className="mt-4 text-sm t-muted">
            Ювелирная мастерская и бутик · Столешников пер. 9 · +7 900 000-00-00
          </div>
          <div className="mt-6 text-xs t-faint">© 2026 Ювелирный дом «Карат»</div>
        </div>
      </footer>
    </div>
  );
}

export const jewelry: TemplateDefinition = {
  id: 'jewelry',
  name: 'Карат',
  category: 'Ювелирный бутик',
  description:
    'Люксовый сайт ювелирного дома: обложка во весь экран, коллекции крупными плитками, работа на заказ.',
  tags: ['ювелирный', 'украшения', 'золото', 'бриллианты', 'бутик', 'на заказ'],
  defaults: {
    primary: '#b8860b',
    secondary: '#e8dcc8',
    button: '#1a1a1a',
    background: '#fcfaf6',
    text: '#1c1814',
    buttonShape: 'sharp',
    font: 'cormorant',
    cardRadius: 2,
  },
  Component: JewelrySite,
};
