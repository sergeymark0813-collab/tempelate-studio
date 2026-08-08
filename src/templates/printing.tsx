import { Clock, FileUp, Layers, Palette, Printer, Zap, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const PRODUCTS = [
  ['Визитки', '4+4, 300 г, ламинация', 'от 4 ₽/шт'],
  ['Листовки А5', 'мелованная 130 г', 'от 3 ₽/шт'],
  ['Буклеты', 'два фальца, 170 г', 'от 18 ₽/шт'],
  ['Каталоги', 'скоба или КБС', 'от 120 ₽/шт'],
  ['Наклейки', 'винил, контурная резка', 'от 9 ₽/шт'],
  ['Пакеты', 'крафт с логотипом', 'от 34 ₽/шт'],
];

/** Price per unit falls with volume — the table clients come here to read. */
const RUNS = [
  ['100', '9 ₽', '5 ₽', '26 ₽'],
  ['500', '6 ₽', '3,4 ₽', '21 ₽'],
  ['1 000', '4 ₽', '2,6 ₽', '18 ₽'],
  ['5 000', '2,4 ₽', '1,7 ₽', '13 ₽'],
  ['10 000', '1,9 ₽', '1,2 ₽', '11 ₽'],
];

const SPEED: { icon: LucideIcon; title: string; time: string; text: string }[] = [
  { icon: Clock, title: 'Стандарт', time: '3–4 дня', text: 'Обычная очередь, самая низкая цена' },
  { icon: Zap, title: 'Срочно', time: '24 часа', text: 'Наценка 30%, печатаем в вечернюю смену' },
  { icon: Printer, title: 'Сегодня', time: '4 часа', text: 'Цифровая печать, тираж до 500 экземпляров' },
];

const EQUIPMENT = ['Heidelberg SM 74', 'Xerox Versant 280', 'Roland VersaUV', 'Duplo DC-646', 'Horizon BQ-270'];

const PREPRESS: { icon: LucideIcon; label: string }[] = [
  { icon: Layers, label: 'Вылеты 3 мм и метки реза' },
  { icon: Palette, label: 'CMYK, суммарное наложение до 300%' },
  { icon: FileUp, label: 'PDF/X-4, шрифты в кривых' },
];

function PrintingSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Printer size={21} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl">Оттиск</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Продукция', 'Тиражи', 'Сроки', 'Макеты', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Рассчитать тираж</Btn>
        </div>
      </header>

      {/* hero with a run calculator */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Типография с 2007 года · Москва</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.3rem]">
              Печать без сюрпризов в цвете и в счёте
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Своё офсетное и цифровое оборудование. Присылаем цветопробу до тиража — вы видите
              результат до того, как мы напечатаем 10 000 штук.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Рассчитать стоимость</Btn>
              <Btn size="lg" variant="outline">
                <FileUp size={16} /> Загрузить макет
              </Btn>
            </div>
          </div>

          <div className="t-card t-shadow p-6 @2xl:p-7">
            <div className="t-head text-lg">Расчёт тиража</div>
            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="text-xs tracking-wide uppercase t-faint">Что печатаем</span>
                <select className="t-input mt-1.5">
                  <option>Визитки</option>
                  <option>Листовки А5</option>
                  <option>Буклеты</option>
                  <option>Каталоги</option>
                </select>
              </label>
              <div className="grid gap-4 @xl:grid-cols-2">
                <label className="block">
                  <span className="text-xs tracking-wide uppercase t-faint">Тираж</span>
                  <input className="t-input mt-1.5" placeholder="1 000" />
                </label>
                <label className="block">
                  <span className="text-xs tracking-wide uppercase t-faint">Срок</span>
                  <select className="t-input mt-1.5">
                    <option>Стандарт, 3–4 дня</option>
                    <option>Срочно, 24 часа</option>
                    <option>Сегодня, 4 часа</option>
                  </select>
                </label>
              </div>
            </div>
            <div
              className="t-r-card mt-6 flex flex-wrap items-center justify-between gap-4 p-5"
              style={{ background: 'var(--tp-primary-tint)' }}
            >
              <div>
                <div className="text-xs tracking-wide uppercase t-faint">Примерно</div>
                <div className="t-head text-3xl t-primary">4 000 ₽</div>
                <div className="mt-1 text-sm t-muted">1 000 визиток · 4 ₽ за штуку</div>
              </div>
              <Btn>Заказать</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* products */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Продукция</h2>
          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-3">
            {PRODUCTS.map(([name, spec, price], i) => (
              <article
                key={name}
                className="t-card overflow-hidden"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Media variant={i % 2 ? 'grid' : 'stripes'} seed={i + 2} radius="none" className="aspect-16/10 w-full" />
                <div className="p-6">
                  <h3 className="text-[1.15rem]">{name}</h3>
                  <div className="mt-1.5 text-sm t-muted">{spec}</div>
                  <div className="t-border-t mt-4 flex items-center justify-between gap-3 pt-4">
                    <span className="t-head text-lg t-primary">{price}</span>
                    <span className="text-xs t-faint">от 100 шт</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* volume price table — the signature block */}
      <Section inner="max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Цена от тиража</h2>
          <span className="text-sm t-muted">Стоимость за штуку, офсет 4+4</span>
        </div>

        <div className="mt-10 overflow-x-auto">
          <div style={{ minWidth: 560 }}>
            <div
              className="grid gap-4 pb-4 text-xs tracking-[0.14em] uppercase t-faint"
              style={{ gridTemplateColumns: '120px repeat(3, minmax(0, 1fr))' }}
            >
              <span>Тираж</span>
              <span>Визитки</span>
              <span>Листовки А5</span>
              <span>Буклеты</span>
            </div>
            {RUNS.map((row, i) => (
              <div
                key={row[0]}
                className="t-border-t grid items-center gap-4 py-4"
                style={{
                  gridTemplateColumns: '120px repeat(3, minmax(0, 1fr))',
                  ...(i === RUNS.length - 1 ? { background: 'var(--tp-primary-tint)' } : null),
                }}
              >
                <span className="t-head text-[1.05rem]">{row[0]}</span>
                {row.slice(1).map((price, pi) => (
                  <span key={pi} className="font-semibold">
                    {price}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm t-faint">
          Тиражи больше 10 000 считаем индивидуально — обычно выходит ещё на 20% дешевле.
        </p>
      </Section>

      {/* turnaround options */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-secondary-tint)' }}>
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Сроки</h2>
          <div className="mt-10 grid gap-5 @xl:grid-cols-3">
            {SPEED.map(({ icon: Icon, title, time, text }, i) => (
              <div
                key={title}
                className="t-card p-7"
                style={{
                  background: 'var(--tp-bg)',
                  ...(i === 1 ? { borderColor: 'var(--tp-primary)' } : null),
                }}
              >
                <Icon size={24} className="t-primary" strokeWidth={1.6} />
                <h3 className="mt-5 text-[1.25rem]">{title}</h3>
                <div className="t-head mt-2 text-2xl t-primary">{time}</div>
                <p className="mt-3 text-sm t-muted">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* prepress help */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <div className="t-eyebrow">Макеты</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.4rem]">
              Проверим вашу вёрстку бесплатно
            </h2>
            <p className="mt-5 t-muted">
              Смотрим вылеты, разрешение, цветовой профиль и наложения. Если что-то поедет в печати —
              скажем до тиража, а не после.
            </p>
            <div className="mt-8 grid gap-3 text-sm">
              {PREPRESS.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-3">
                  <Icon size={16} className="t-primary shrink-0" /> {label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Отправить макет на проверку</Btn>
              <Btn size="lg" variant="ghost">
                Скачать шаблоны
              </Btn>
            </div>
          </div>
          <Media variant="grid" seed={9} className="aspect-4/3 w-full" />
        </div>
      </Section>

      {/* equipment strip */}
      <div className="t-inverse">
        <div className="mx-auto max-w-[1200px] px-6 py-12 @2xl:px-10">
          <div className="text-xs tracking-[0.16em] uppercase opacity-60">Оборудование</div>
          <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
            {EQUIPMENT.map((item) => (
              <span key={item} className="t-head text-lg">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Оттиск</span>
            <p className="mt-3 text-sm t-muted">
              Офсетная и цифровая печать в Москве с 2007 года. Своё производство, без посредников.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>ул. Дербеневская 20, корп. 5</div>
            <div className="mt-2">Пн–Пт 09:00–19:00</div>
          </div>
          <div className="text-sm t-muted">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">print@ottisk.ru</div>
            <div className="mt-4 t-faint">© 2026 Типография «Оттиск»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const printing: TemplateDefinition = {
  id: 'printing',
  name: 'Оттиск',
  category: 'Типография',
  description:
    'Сайт типографии: калькулятор тиража в первом экране, таблица «цена от тиража», варианты сроков.',
  tags: ['типография', 'печать', 'визитки', 'офсет', 'тираж', 'макет'],
  defaults: {
    primary: '#5b21b6',
    secondary: '#f59e0b',
    button: '#5b21b6',
    background: '#ffffff',
    text: '#1b1430',
    buttonShape: 'soft',
    font: 'rubik',
    cardRadius: 10,
  },
  Component: PrintingSite,
};
