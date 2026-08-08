import { Aperture, Instagram, Mail } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section, type MediaVariant } from './ui';

/** Masonry-ish wall: each column gets its own set of aspect ratios. */
const COLUMNS: { variant: MediaVariant; ratio: string; caption: string }[][] = [
  [
    { variant: 'portrait', ratio: 'aspect-3/4', caption: 'Портрет · студия' },
    { variant: 'mesh', ratio: 'aspect-square', caption: 'Лукбук Ferra' },
    { variant: 'stripes', ratio: 'aspect-4/5', caption: 'Репортаж · конференция' },
  ],
  [
    { variant: 'rings', ratio: 'aspect-square', caption: 'Предметная съёмка' },
    { variant: 'portrait', ratio: 'aspect-4/5', caption: 'Семейная съёмка' },
    { variant: 'dots', ratio: 'aspect-3/4', caption: 'Интерьер кафе' },
  ],
  [
    { variant: 'mesh', ratio: 'aspect-4/5', caption: 'Свадьба · Суздаль' },
    { variant: 'grid', ratio: 'aspect-3/4', caption: 'Архитектура' },
    { variant: 'product', ratio: 'aspect-square', caption: 'Каталог украшений' },
  ],
];

const STEPS = [
  ['Знакомство', 'Обсуждаем идею, референсы и место. 20 минут в мессенджере.'],
  ['Подготовка', 'Собираю мудборд, помогаю с образом, бронирую студию или локацию.'],
  ['Съёмка', 'От одного до четырёх часов. Показываю кадры сразу, на месте.'],
  ['Обработка', 'Отбор и цветокоррекция. Готовая галерея — через 7 рабочих дней.'],
];

const PACKAGES = [
  { name: 'Портрет', time: '1 час', photos: '15 обработанных кадров', price: '12 000 ₽' },
  { name: 'Лукбук', time: '3 часа', photos: '40 обработанных кадров', price: '32 000 ₽' },
  { name: 'Свадьба', time: '10 часов', photos: '250+ кадров, репортаж', price: '95 000 ₽' },
];

function PhotoSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Aperture size={20} className="t-primary" strokeWidth={1.5} />
            <span className="t-head text-lg tracking-[0.28em] uppercase">Кадр</span>
          </span>
          <nav className="hidden gap-8 text-sm t-muted @3xl:flex">
            {['Портфолио', 'Услуги', 'О себе', 'Цены'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className="flex items-center gap-4 text-sm">
            <Instagram size={17} className="t-muted" />
            <Btn size="sm" variant="outline">
              Забронировать
            </Btn>
          </span>
        </div>
      </header>

      {/* hero — a wall of three images with the title laid over the middle */}
      <div className="relative">
        <div className="grid grid-cols-3 gap-1">
          <Media variant="mesh" seed={1} radius="none" className="aspect-2/3 w-full" />
          <Media variant="portrait" seed={4} radius="none" className="aspect-2/3 w-full" overlay />
          <Media variant="rings" seed={7} radius="none" className="aspect-2/3 w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <div
            className="max-w-[24ch] px-6 py-8 text-center @2xl:px-12 @2xl:py-12"
            style={{ background: 'var(--tp-bg)' }}
          >
            <h1 className="text-[2rem] leading-[1.06] @2xl:text-[3.2rem]">
              Фотограф Ева Лунина
            </h1>
            <p className="mt-4 text-sm t-muted @2xl:text-base">
              Портрет, лукбук и репортаж. Москва и выезды.
            </p>
          </div>
        </div>
      </div>

      {/* portfolio wall */}
      <Section inner="max-w-[1320px]" pad="py-14 @2xl:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Портфолио</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm t-muted">
            {['Всё', 'Портрет', 'Лукбук', 'Репортаж', 'Предметная'].map((tag, i) => (
              <span key={tag} className={i === 0 ? 'font-semibold t-primary' : undefined}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
          {COLUMNS.map((column, ci) => (
            <div key={ci} className="grid gap-4">
              {column.map((shot, i) => (
                <figure key={shot.caption}>
                  <Media
                    variant={shot.variant}
                    seed={ci * 4 + i}
                    className={`${shot.ratio} w-full`}
                  />
                  <figcaption className="mt-2.5 text-xs tracking-wide uppercase t-faint">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* process — numbers on a rule, no cards */}
      <div className="t-border-t t-border-b">
        <Section inner="max-w-[1320px]">
          <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Как проходит съёмка</h2>
          <div className="mt-12 grid gap-10 @xl:grid-cols-2 @4xl:grid-cols-4">
            {STEPS.map(([title, text], i) => (
              <div key={title}>
                <div className="flex items-center gap-4">
                  <span className="t-head text-5xl t-primary opacity-25">0{i + 1}</span>
                  <span className="h-px flex-1" style={{ background: 'var(--tp-border)' }} />
                </div>
                <h3 className="mt-5 text-lg">{title}</h3>
                <p className="mt-2 text-sm t-muted">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* about */}
      <Section inner="max-w-[1320px]">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] @4xl:gap-16">
          <Media variant="portrait" seed={11} className="aspect-4/5 w-full" />
          <div className="@4xl:pt-8">
            <div className="t-eyebrow">О себе</div>
            <h2 className="mt-4 text-[1.8rem] @2xl:text-[2.4rem]">
              Девять лет за камерой и ни одной постановочной улыбки
            </h2>
            <div className="mt-6 grid gap-4 t-muted">
              <p>
                Начинала с репортажа для городских медиа, сейчас больше работаю в студии — с людьми
                и брендами. Люблю естественный свет, плёночную зернистость и тишину на площадке.
              </p>
              <p>
                Перед съёмкой мы обязательно разговариваем: без этого не получается снять человека,
                а не позу.
              </p>
            </div>
            <div className="t-border-t mt-8 grid gap-6 pt-8 @xl:grid-cols-3">
              {[
                ['640+', 'съёмок'],
                ['9 лет', 'опыта'],
                ['4 города', 'выездов'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="t-head text-2xl t-primary">{v}</div>
                  <div className="text-sm t-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* packages as wide rows */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1320px]">
          <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Пакеты</h2>
          <div className="mt-10">
            {PACKAGES.map((pack, i) => (
              <div
                key={pack.name}
                className={`grid gap-3 py-7 @3xl:grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)_auto] @3xl:items-center @3xl:gap-8 ${
                  i > 0 ? 't-border-t' : ''
                }`}
              >
                <h3 className="text-[1.4rem]">{pack.name}</h3>
                <span className="text-sm t-muted">{pack.time}</span>
                <span className="text-sm t-muted">{pack.photos}</span>
                <div className="flex items-center gap-6">
                  <span className="t-head text-xl">{pack.price}</span>
                  <Btn size="sm">Выбрать</Btn>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm t-faint">
            Аренда студии и визажист оплачиваются отдельно — подскажу проверенных.
          </p>
        </Section>
      </div>

      {/* single testimonial */}
      <Section inner="max-w-[1320px]">
        <blockquote className="mx-auto max-w-[720px] text-center">
          <p className="t-head text-[1.5rem] leading-snug @2xl:text-[2rem]">
            «Мы пришли на съёмку зажатые и уставшие. Через двадцать минут забыли про камеру — и это
            видно на каждом кадре.»
          </p>
          <footer className="mt-6 text-sm t-muted">Марина и Пётр · семейная съёмка</footer>
        </blockquote>
      </Section>

      {/* contact */}
      <div className="t-inverse">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-6 py-16 @2xl:px-10 @4xl:grid-cols-[minmax(0,1fr)_auto] @4xl:items-center">
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Свободные даты — на месяц вперёд</h2>
            <p className="mt-3 opacity-70">
              Напишите, что хотите снять, — вернусь с идеей и стоимостью в течение дня.
            </p>
          </div>
          <Btn size="lg" variant="inverse">
            <Mail size={17} /> hello@kadr.photo
          </Btn>
        </div>
      </div>

      <footer>
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm t-muted @2xl:px-10">
          <span className="t-head text-base tracking-[0.28em] uppercase">Кадр</span>
          <span>Москва · выезд по России</span>
          <span>© 2026 Ева Лунина</span>
        </div>
      </footer>
    </div>
  );
}

export const photo: TemplateDefinition = {
  id: 'photo',
  name: 'Кадр',
  category: 'Фотография',
  description:
    'Сайт фотографа: стена кадров в первом экране, портфолио колонками, пакеты съёмок строками.',
  tags: ['фотограф', 'фотостудия', 'съёмка', 'портфолио', 'портрет', 'свадьба'],
  defaults: {
    primary: '#2b2926',
    secondary: '#b08968',
    button: '#2b2926',
    background: '#f5f3f0',
    text: '#1c1a17',
    buttonShape: 'sharp',
    font: 'inter',
    cardRadius: 0,
  },
  Component: PhotoSite,
};
