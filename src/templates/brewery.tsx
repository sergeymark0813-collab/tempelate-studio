import { Beer, CalendarDays, Clock, MapPin, Wheat } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

/** ABV / IBU table — what a craft-beer audience actually scans for. */
const BEERS = [
  ['Северная IPA', 'IPA', '6,4%', '58', 'Цитрус, хвоя, сухая горечь', '390 ₽'],
  ['Тихий стаут', 'Oatmeal Stout', '5,8%', '32', 'Кофе, шоколад, овсяная мягкость', '410 ₽'],
  ['Пшеничное № 3', 'Hefeweizen', '4,9%', '12', 'Банан, гвоздика, мутное', '350 ₽'],
  ['Кислая вишня', 'Fruit Sour', '5,2%', '8', 'Вишня, кислинка, сухой финиш', '460 ₽'],
  ['Лагер простой', 'Helles', '4,6%', '18', 'Хлебный, чистый, без затей', '320 ₽'],
  ['Зимний портер', 'Baltic Porter', '8,1%', '40', 'Сухофрукты, карамель, плотный', '520 ₽'],
];

const EVENTS = [
  ['19 июня', 'Дегустация новой партии IPA', '19:00 · 800 ₽'],
  ['26 июня', 'Экскурсия по варочному цеху', '17:00 · 1 200 ₽'],
  ['03 июля', 'Blind tasting: угадай стиль', '19:30 · 1 000 ₽'],
  ['12 июля', 'Пивной ужин с шеф-поваром', '19:00 · 3 400 ₽'],
];

function BrewerySite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Beer size={21} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl tracking-[0.14em] uppercase">Хмель</span>
          </span>
          <nav className="hidden gap-7 text-xs tracking-[0.14em] uppercase t-muted @4xl:flex">
            {['Сорта', 'Бар', 'Экскурсии', 'События', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Забронировать стол</Btn>
        </div>
      </header>

      {/* hero with three featured taps under the title */}
      <div className="relative">
        <Media variant="stripes" seed={2} radius="none" className="min-h-[420px] w-full" overlay />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1200px] px-6 @2xl:px-10">
            <span className="text-xs tracking-[0.2em] text-white/70 uppercase">
              Крафтовая пивоварня · Санкт-Петербург
            </span>
            <h1 className="mt-5 max-w-[20ch] text-[2.6rem] leading-[0.98] text-white uppercase @2xl:text-[4rem]">
              Варим на месте, наливаем в двадцати метрах
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Что сейчас на кранах</Btn>
              <Btn
                size="lg"
                variant="outline"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                Экскурсия по цеху
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {/* on tap now */}
      <Section pad="py-12 @2xl:py-16" inner="max-w-[1200px]">
        <div className="grid gap-5 @xl:grid-cols-3">
          {[
            ['Северная IPA', '6,4% · 58 IBU', 'Свежая партия, сварена 4 дня назад'],
            ['Кислая вишня', '5,2% · 8 IBU', 'Осталось 40 литров'],
            ['Зимний портер', '8,1% · 40 IBU', 'Вернули по просьбам'],
          ].map(([name, spec, note], i) => (
            <div
              key={name}
              className="t-card p-6"
              style={i === 0 ? { borderColor: 'var(--tp-primary)' } : undefined}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs tracking-[0.14em] uppercase t-primary">На кране</span>
                <Wheat size={16} className="t-secondary" />
              </div>
              <h3 className="mt-4 text-[1.3rem] uppercase">{name}</h3>
              <div className="t-head mt-1.5 text-sm t-muted">{spec}</div>
              <p className="mt-3 text-sm t-muted">{note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* full beer table — the signature block */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Сорта</h2>
            <span className="text-sm t-muted">Цена за 0,5 л в баре. Есть тейстеры по 0,15 л</span>
          </div>

          <div className="mt-10 overflow-x-auto">
            <div style={{ minWidth: 680 }}>
              <div
                className="grid gap-4 pb-4 text-xs tracking-[0.14em] uppercase t-faint"
                style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.8fr) 70px 60px minmax(0,1.2fr) 90px' }}
              >
                <span>Название</span>
                <span>Стиль</span>
                <span>ABV</span>
                <span>IBU</span>
                <span>Вкус</span>
                <span className="text-right">0,5 л</span>
              </div>
              {BEERS.map((beer) => (
                <div
                  key={beer[0]}
                  className="t-border-t grid items-center gap-4 py-4"
                  style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.8fr) 70px 60px minmax(0,1.2fr) 90px' }}
                >
                  <span className="t-head text-[1.05rem]">{beer[0]}</span>
                  <span className="text-sm t-muted">{beer[1]}</span>
                  <span className="text-sm font-semibold t-primary">{beer[2]}</span>
                  <span className="text-sm t-muted">{beer[3]}</span>
                  <span className="text-sm t-muted">{beer[4]}</span>
                  <span className="t-head text-right">{beer[5]}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* bar */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <div className="t-eyebrow">Бар</div>
            <h2 className="mt-4 text-[1.9rem] uppercase @2xl:text-[2.5rem]">
              Двадцать метров от варочного цеха
            </h2>
            <p className="mt-5 t-muted">
              Двенадцать кранов, длинные деревянные столы и кухня, которая работает до последнего
              гостя. Бронь по телефону или в Telegram — на пятницу лучше заранее.
            </p>
            <div className="mt-7 grid gap-3 text-sm">
              <span className="flex items-center gap-3">
                <MapPin size={16} className="t-primary" /> СПб, ул. Красного Текстильщика 17
              </span>
              <span className="flex items-center gap-3">
                <Clock size={16} className="t-primary" /> Пн–Чт 16:00–00:00 · Пт–Сб 14:00–02:00
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Забронировать стол</Btn>
              <Btn size="lg" variant="ghost">
                Меню кухни
              </Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Media variant="mesh" seed={5} className="aspect-square w-full" />
            <Media variant="rings" seed={8} className="mt-6 aspect-square w-full" />
          </div>
        </div>
      </Section>

      {/* tours + tastings */}
      <div className="t-bg-primary">
        <div className="mx-auto max-w-[1200px] px-6 py-16 @2xl:px-10">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Экскурсии и дегустации</h2>
          <div className="mt-10 grid gap-6 @3xl:grid-cols-2">
            {[
              ['Экскурсия по цеху', '1 час · 1 200 ₽', 'Показываем варку, брожение и склад. В конце — три тейстера на выбор.'],
              ['Дегустационный сет', '1,5 часа · 1 800 ₽', 'Шесть тейстеров с рассказом технолога: как читать вкус и почему IBU не главное.'],
            ].map(([title, meta, text]) => (
              <div
                key={title}
                className="t-r-card p-7"
                style={{ background: 'var(--tp-bg)', color: 'var(--tp-text)' }}
              >
                <h3 className="text-[1.35rem] uppercase">{title}</h3>
                <div className="t-head mt-2 text-lg t-primary">{meta}</div>
                <p className="mt-4 text-sm t-muted">{text}</p>
                <Btn className="mt-6" size="sm">
                  Записаться
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* events list */}
      <Section inner="max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">События</h2>
          <span className="flex items-center gap-2 text-sm t-muted">
            <CalendarDays size={15} className="t-primary" /> Обновляем каждую неделю
          </span>
        </div>
        <div className="mt-10">
          {EVENTS.map(([date, title, meta]) => (
            <div
              key={title}
              className="t-border-t grid gap-3 py-6 @3xl:grid-cols-[110px_minmax(0,1fr)_minmax(0,0.6fr)_auto] @3xl:items-center @3xl:gap-8"
            >
              <span className="t-head text-lg t-primary">{date}</span>
              <span className="t-head text-[1.2rem] uppercase">{title}</span>
              <span className="text-sm t-muted">{meta}</span>
              <Btn size="sm" variant="outline">
                Пойду
              </Btn>
            </div>
          ))}
        </div>
      </Section>

      {/* newsletter */}
      <div className="t-border-t t-surface">
        <Section inner="max-w-[1200px]">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="text-[1.8rem] uppercase @2xl:text-[2.3rem]">Новая партия — раз в две недели</h2>
            <p className="mt-4 t-muted">
              Пишем только когда варим что-то новое или ставим редкий сорт на кран. Без акций и
              спама.
            </p>
            <div className="mt-8 flex flex-col gap-3 @xl:flex-row">
              <input className="t-input" placeholder="Ваш e-mail" />
              <Btn size="lg">Подписаться</Btn>
            </div>
          </div>
        </Section>
      </div>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-[0.14em] uppercase">Хмель</span>
          <span>Красного Текстильщика 17 · +7 900 000-00-00</span>
          <span>© 2026 Пивоварня «Хмель» · 18+</span>
        </div>
      </footer>
    </div>
  );
}

export const brewery: TemplateDefinition = {
  id: 'brewery',
  name: 'Хмель',
  category: 'Пивоварня',
  description:
    'Тёмный сайт крафтовой пивоварни: краны сейчас, таблица сортов с ABV и IBU, экскурсии и афиша событий.',
  tags: ['пивоварня', 'крафт', 'бар', 'пиво', 'дегустация', 'экскурсия'],
  defaults: {
    primary: '#b45309',
    secondary: '#d97706',
    button: '#b45309',
    background: '#1a1512',
    text: '#f5ece0',
    buttonShape: 'soft',
    font: 'oswald',
    cardRadius: 8,
  },
  Component: BrewerySite,
};
