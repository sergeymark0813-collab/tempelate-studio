import { Instagram, Send, ShieldCheck, Syringe, Sparkles, Trash2, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const ARTISTS = [
  ['Рэй', ['Blackwork', 'Орнамент', 'Графика'], 'от 8 000 ₽/час', '9 лет'],
  ['Лиза Ворон', ['Fineline', 'Минимализм', 'Леттеринг'], 'от 6 500 ₽/час', '6 лет'],
  ['Марк Дым', ['Реализм', 'Чёрно-белое', 'Кавер-ап'], 'от 11 000 ₽/час', '14 лет'],
];

const STYLES = [
  'Blackwork',
  'Fineline',
  'Реализм',
  'Орнамент',
  'Леттеринг',
  'Олдскул',
];

const SAFETY: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Syringe, title: 'Одноразовое всё', text: 'Иглы, картриджи, плёнка и перчатки вскрываем при вас' },
  { icon: ShieldCheck, title: 'Автоклав класса B', text: 'Стерилизация с индикаторными тестами, журнал открыт для просмотра' },
  { icon: Trash2, title: 'Утилизация по СанПиН', text: 'Договор с лицензированной службой, отходы класса Б' },
  { icon: Sparkles, title: 'Заживление под контролем', text: 'Бесплатная коррекция через месяц и связь с мастером всё время' },
];

function TattooSite() {
  return (
    <div className="tpl">
      <header>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="t-head text-2xl tracking-[0.14em] uppercase">Игла</span>
          <nav className="hidden gap-7 text-xs tracking-[0.16em] uppercase t-muted @4xl:flex">
            {['Мастера', 'Стили', 'Эскизы', 'Гигиена', 'Запись'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className="flex items-center gap-4">
            <Instagram size={17} className="t-muted" />
            <Btn size="sm">
              <Send size={14} /> Записаться
            </Btn>
          </span>
        </div>
      </header>

      {/* hero: heavy type over a wall of four works */}
      <Section pad="pt-8 pb-14 @2xl:pt-12 @2xl:pb-20" inner="max-w-[1240px]">
        <h1 className="text-[2.8rem] leading-[0.94] uppercase @2xl:text-[4.4rem] @5xl:text-[5.4rem]">
          Тату-студия
          <br />
          <span className="t-primary">на Обводном</span>
        </h1>
        <div className="mt-8 grid gap-8 @4xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] @4xl:items-end">
          <div>
            <p className="max-w-[42ch] text-[1.05rem] t-muted">
              Три мастера, свой автоклав и никаких «набьём по фото из интернета». Сначала эскиз под
              вашу анатомию — потом машинка.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Обсудить эскиз</Btn>
              <Btn size="lg" variant="outline">
                Портфолио
              </Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(['stripes', 'rings', 'dots', 'mesh'] as const).map((v, i) => (
              <Media key={v} variant={v} seed={i + 1} radius="card-sm" className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </Section>

      {/* artists with style chips */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1240px]">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Мастера</h2>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {ARTISTS.map(([name, styles, rate, exp], i) => (
              <article
                key={name as string}
                className="t-card overflow-hidden"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Media variant="portrait" seed={i + 6} radius="none" className="aspect-4/5 w-full" />
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[1.3rem] uppercase">{name as string}</h3>
                    <span className="text-xs t-faint">{exp as string}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(styles as string[]).map((style) => (
                      <span
                        key={style}
                        className="t-r-pill px-3 py-1 text-xs font-semibold"
                        style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                  <div className="t-border-t mt-5 flex items-center justify-between gap-3 pt-5">
                    <span className="t-head text-lg">{rate as string}</span>
                    <Btn size="sm" variant="outline">
                      Записаться
                    </Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* styles */}
      <Section inner="max-w-[1240px]">
        <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Стили</h2>
        <div className="mt-10 grid gap-3 @xl:grid-cols-2 @4xl:grid-cols-3">
          {STYLES.map((style, i) => (
            <div key={style} className="relative overflow-hidden t-r-card">
              <Media
                variant={i % 3 === 0 ? 'stripes' : i % 3 === 1 ? 'rings' : 'dots'}
                seed={i + 12}
                radius="none"
                className="aspect-16/10 w-full"
                overlay
              />
              <span className="t-head absolute bottom-5 left-5 text-[1.3rem] text-white uppercase">
                {style}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* sketch gallery, full bleed */}
      <div className="grid grid-cols-3 gap-1 @3xl:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <Media key={i} variant={i % 2 ? 'mesh' : 'rings'} seed={i + 20} radius="none" className="aspect-square w-full" />
        ))}
      </div>

      {/* hygiene — the block that actually converts in this niche */}
      <div className="t-bg-primary">
        <div className="mx-auto max-w-[1240px] px-6 py-16 @2xl:px-10">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Гигиена и безопасность</h2>
          <div className="mt-10 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-4">
            {SAFETY.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon size={24} strokeWidth={1.6} className="opacity-80" />
                <h3 className="mt-4 text-[1.05rem] uppercase">{title}</h3>
                <p className="mt-2 text-sm opacity-85">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* price logic */}
      <Section inner="max-w-[1240px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] uppercase @2xl:text-[2.4rem]">Сколько стоит</h2>
            <p className="mt-5 t-muted">
              Считаем по часам работы мастера, а не по «сантиметрам». На консультации называем
              вилку — итог не выходит за неё.
            </p>
          </div>
          <div>
            {[
              ['Минимальный сеанс', '1 час', 'от 6 500 ₽'],
              ['Небольшая работа (до 10 см)', '2–3 часа', 'от 14 000 ₽'],
              ['Рукав, первый сеанс', '5–6 часов', 'от 45 000 ₽'],
              ['Кавер-ап старой тату', 'по эскизу', 'от 20 000 ₽'],
              ['Консультация и эскиз', '40 минут', 'бесплатно'],
            ].map(([name, time, price], i) => (
              <div
                key={name}
                className={`flex flex-wrap items-baseline justify-between gap-4 py-5 ${i > 0 ? 't-border-t' : 't-border-t'}`}
              >
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="mt-1 text-sm t-muted">{time}</div>
                </div>
                <span className="t-head text-lg t-primary">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* booking */}
      <div className="t-border-t t-surface">
        <Section inner="max-w-[1240px]">
          <div className="mx-auto max-w-[620px] text-center">
            <h2 className="text-[1.9rem] uppercase @2xl:text-[2.5rem]">Записаться</h2>
            <p className="mt-4 t-muted">
              Опишите идею и пришлите референсы — мастер ответит лично и предложит эскиз. Консультация
              бесплатная и ни к чему не обязывает.
            </p>
            <div className="mt-8 grid gap-3">
              <div className="grid gap-3 @xl:grid-cols-2">
                <input className="t-input" placeholder="Имя" />
                <input className="t-input" placeholder="Telegram или телефон" />
              </div>
              <select className="t-input">
                <option>Мастер: любой свободный</option>
                <option>Мастер: Рэй</option>
                <option>Мастер: Лиза Ворон</option>
                <option>Мастер: Марк Дым</option>
              </select>
              <input className="t-input" placeholder="Идея, размер, место на теле" />
              <Btn size="lg" className="w-full">
                Отправить заявку
              </Btn>
            </div>
          </div>
        </Section>
      </div>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-[0.14em] uppercase">Игла</span>
          <span>СПб, Обводный канал 74 · ежедневно 12:00–22:00</span>
          <span>© 2026 Тату-студия «Игла»</span>
        </div>
      </footer>
    </div>
  );
}

export const tattoo: TemplateDefinition = {
  id: 'tattoo',
  name: 'Игла',
  category: 'Тату-студия',
  description:
    'Тёмный сайт тату-студии: мастера со стилями-чипами, галерея эскизов во всю ширину, блок гигиены.',
  tags: ['тату', 'татуировка', 'студия', 'мастер', 'эскиз', 'пирсинг'],
  defaults: {
    primary: '#e11d48',
    secondary: '#a3a3a3',
    button: '#e11d48',
    background: '#0d0d0f',
    text: '#eeeaea',
    buttonShape: 'sharp',
    font: 'oswald',
    cardRadius: 2,
  },
  Component: TattooSite,
};
