import { Disc3, Instagram, Play, Youtube } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const TOUR = [
  ['12 СЕН', 'Москва', 'Adrenaline Stadium', 'Билеты'],
  ['19 СЕН', 'Санкт-Петербург', 'А2 Green Concert', 'Билеты'],
  ['27 СЕН', 'Казань', 'Ак Барс Арена', 'Мало мест'],
  ['04 ОКТ', 'Екатеринбург', 'Телеклуб', 'Билеты'],
  ['11 ОКТ', 'Новосибирск', 'Podzemka', 'Sold out'],
];

const RELEASES = [
  ['Северный ветер', '2026', 'LP'],
  ['Тихий этаж', '2024', 'EP'],
  ['Не смотри вниз', '2023', 'LP'],
  ['Первый снег', '2021', 'Single'],
];

const MERCH = [
  ['Футболка «Тур 2026»', '2 400 ₽'],
  ['Винил «Северный ветер»', '4 900 ₽'],
  ['Худи с логотипом', '5 600 ₽'],
];

function BandSite() {
  return (
    <div className="tpl">
      {/* poster hero */}
      <div className="relative">
        <Media variant="stripes" seed={3} radius="none" className="min-h-[560px] w-full" overlay />
        <div className="absolute inset-0 flex flex-col">
          <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-6 @2xl:px-10">
            <span className="t-head text-base tracking-[0.3em] text-white uppercase">СВ</span>
            <nav className="hidden gap-8 text-xs tracking-[0.16em] text-white/80 uppercase @3xl:flex">
              {['Тур', 'Релизы', 'Видео', 'Мерч', 'О группе'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>
            <span className="flex items-center gap-4 text-white/85">
              <Instagram size={17} />
              <Youtube size={18} />
            </span>
          </header>

          <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-end px-6 pb-14 @2xl:px-10">
            <span
              className="t-r-pill self-start px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] uppercase"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              Новый альбом · 12 сентября
            </span>
            <h1 className="mt-6 text-[3rem] leading-[0.92] text-white uppercase @2xl:text-[5.5rem] @5xl:text-[7rem]">
              Северный
              <br />
              ветер
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Слушать альбом</Btn>
              <Btn size="lg" variant="outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
                Билеты на тур
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {/* tour dates as a ticket list */}
      <Section inner="max-w-[1240px]" pad="py-14 @2xl:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[2rem] uppercase @2xl:text-[2.8rem]">Тур 2026</h2>
          <span className="text-sm t-muted">14 городов · сентябрь — ноябрь</span>
        </div>

        <div className="mt-10">
          {TOUR.map(([date, city, venue, status], i) => {
            const soldOut = status === 'Sold out';
            return (
              <div
                key={city}
                className={`grid items-center gap-4 py-6 @3xl:grid-cols-[110px_minmax(0,1fr)_minmax(0,1fr)_auto] @3xl:gap-8 ${
                  i > 0 ? 't-border-t' : 't-border-t'
                }`}
              >
                <span className="t-head text-lg t-primary">{date}</span>
                <span className="t-head text-[1.4rem] uppercase @2xl:text-[1.8rem]">{city}</span>
                <span className="text-sm t-muted">{venue}</span>
                {soldOut ? (
                  <span className="text-sm font-bold tracking-wide uppercase t-faint">
                    Sold out
                  </span>
                ) : (
                  <Btn size="sm" variant={status === 'Мало мест' ? 'secondary' : 'solid'}>
                    {status}
                  </Btn>
                )}
              </div>
            );
          })}
          <div className="t-border-t pt-8">
            <Btn variant="outline">Все даты тура</Btn>
          </div>
        </div>
      </Section>

      {/* discography — square covers */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1240px]">
          <h2 className="text-[2rem] uppercase @2xl:text-[2.8rem]">Релизы</h2>
          <div className="mt-10 grid gap-6 @xl:grid-cols-2 @4xl:grid-cols-4">
            {RELEASES.map(([title, year, kind], i) => (
              <div key={title}>
                <Media variant="product" seed={i + 5} className="aspect-square w-full" />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[1.1rem] uppercase">{title}</h3>
                    <div className="mt-1 text-sm t-muted">
                      {year} · {kind}
                    </div>
                  </div>
                  <Disc3 size={18} className="t-primary mt-1 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* video */}
      <Section inner="max-w-[1240px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] @4xl:items-center @4xl:gap-14">
          <div className="relative">
            <Media variant="mesh" seed={9} radius="card-lg" className="aspect-16/9 w-full" overlay />
            <span
              className="absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              <Play size={28} fill="currentColor" />
            </span>
          </div>
          <div>
            <div className="t-eyebrow">Клип</div>
            <h2 className="mt-4 text-[1.8rem] uppercase @2xl:text-[2.3rem]">Не смотри вниз</h2>
            <p className="mt-5 t-muted">
              Снят за два дня на заброшенной водонапорной башне под Выборгом. Без графики — всё, что
              видно в кадре, происходило на самом деле.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                ['4,2 млн', 'просмотров'],
                ['12 тыс.', 'комментариев'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="t-head text-2xl t-primary">{v}</div>
                  <div className="t-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* merch */}
      <div className="t-bg-primary">
        <div className="mx-auto max-w-[1240px] px-6 py-16 @2xl:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[2rem] uppercase @2xl:text-[2.6rem]">Мерч</h2>
            <span className="text-sm opacity-80">Доставка по России · возврат 14 дней</span>
          </div>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {MERCH.map(([name, price], i) => (
              <div
                key={name}
                className="t-r-card overflow-hidden"
                style={{ background: 'var(--tp-bg)', color: 'var(--tp-text)' }}
              >
                <Media variant="product" seed={i + 14} radius="none" className="aspect-4/3 w-full" />
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="text-[1.02rem]">{name}</h3>
                    <div className="t-head mt-1 text-lg t-primary">{price}</div>
                  </div>
                  <Btn size="sm">Купить</Btn>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* subscribe */}
      <Section inner="max-w-[1240px]">
        <div className="mx-auto max-w-[620px] text-center">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Не пропустите новый тур</h2>
          <p className="mt-4 t-muted">
            Присылаем письмо только когда открываются продажи. Два-три раза в год, без спама.
          </p>
          <div className="mt-8 flex flex-col gap-3 @xl:flex-row">
            <input className="t-input" placeholder="Ваш e-mail" />
            <Btn size="lg">Подписаться</Btn>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm t-muted @2xl:px-10">
          <span className="t-head text-base tracking-[0.3em] uppercase">СВ</span>
          <span>Букинг: booking@sevveter.band</span>
          <span>© 2026 Северный Ветер</span>
        </div>
      </footer>
    </div>
  );
}

export const band: TemplateDefinition = {
  id: 'band',
  name: 'Северный Ветер',
  category: 'Музыка',
  description:
    'Афишный сайт группы: плакатная обложка, даты тура списком, дискография и мерч.',
  tags: ['группа', 'музыка', 'концерты', 'тур', 'альбом', 'мерч', 'артист'],
  defaults: {
    primary: '#ff2e88',
    secondary: '#ffd166',
    button: '#ff2e88',
    background: '#0a0a0c',
    text: '#f2f2f4',
    buttonShape: 'sharp',
    font: 'unbounded',
    cardRadius: 0,
  },
  Component: BandSite,
};
