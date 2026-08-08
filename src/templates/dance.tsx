import { Music4, Sparkles, Users } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const STYLES = [
  ['Hip-Hop', 'Начальный и продолжающий'],
  ['Contemporary', 'Работа с телом и импровизация'],
  ['Vogue', 'Femme, Old Way, New Way'],
  ['High Heels', 'Каблуки с нуля'],
  ['Breaking', 'Дети и взрослые'],
  ['Latina', 'Бачата, сальса, реггетон'],
];

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

/** Weekly grid: one row per time slot, one cell per day. */
const SCHEDULE: { time: string; cells: (string | null)[] }[] = [
  { time: '10:00', cells: [null, 'Contemporary', null, 'Contemporary', null, 'Breaking · дети'] },
  { time: '12:00', cells: ['Latina', null, 'Latina', null, 'Latina', 'High Heels'] },
  { time: '18:00', cells: ['Hip-Hop', 'Vogue', 'Hip-Hop', 'Vogue', 'Hip-Hop', null] },
  { time: '20:00', cells: ['High Heels', 'Breaking', 'Contemporary', 'Breaking', 'Vogue', null] },
];

const TEACHERS = [
  ['Кира Ланская', 'Contemporary, растяжка'],
  ['Дэн Ким', 'Hip-Hop, Breaking'],
  ['Мила Дорош', 'Vogue, High Heels'],
  ['Хуан Ортега', 'Latina, бачата'],
];

const PASSES = [
  { name: 'Пробное', price: '500 ₽', text: 'Одно занятие в любом направлении' },
  { name: '4 занятия', price: '3 600 ₽', text: 'Действует 5 недель', featured: true },
  { name: '8 занятий', price: '6 400 ₽', text: 'Действует 8 недель' },
  { name: 'Безлимит', price: '9 900 ₽', text: 'Месяц, все направления' },
];

function DanceSite() {
  return (
    <div className="tpl">
      <header>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Music4 size={20} className="t-primary" strokeWidth={1.8} />
            <span className="t-head text-xl tracking-[0.16em] uppercase">Ритм</span>
          </span>
          <nav className="hidden gap-7 text-xs tracking-[0.14em] uppercase t-muted @4xl:flex">
            {['Направления', 'Расписание', 'Педагоги', 'Абонементы'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Пробное за 500 ₽</Btn>
        </div>
      </header>

      {/* hero: big type + three-strip collage */}
      <Section pad="pt-8 pb-14 @2xl:pt-12 @2xl:pb-20" inner="max-w-[1240px]">
        <h1 className="text-[2.8rem] leading-[0.95] uppercase @2xl:text-[4.6rem] @5xl:text-[5.6rem]">
          Танцуй,
          <br />
          <span className="t-grad-text">как умеешь</span>
          <br />
          уже сегодня
        </h1>
        <div className="mt-8 grid gap-8 @4xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @4xl:items-end">
          <div>
            <p className="max-w-[42ch] text-[1.05rem] t-muted">
              Студия для взрослых, которые никогда не танцевали. Шесть направлений, группы до
              12 человек и ни одного зеркала во всю стену, если вам от этого неловко.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn size="lg">Записаться на пробное</Btn>
              <Btn size="lg" variant="outline">
                Расписание
              </Btn>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Media variant="portrait" seed={1} radius="card" className="aspect-[2/3] w-full" />
            <Media variant="stripes" seed={4} radius="card" className="mt-6 aspect-[2/3] w-full" />
            <Media variant="rings" seed={7} radius="card" className="aspect-[2/3] w-full" />
          </div>
        </div>
      </Section>

      {/* styles as overlay tiles */}
      <Section inner="max-w-[1240px]" pad="pb-16 @2xl:pb-20">
        <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Направления</h2>
        <div className="mt-10 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
          {STYLES.map(([name, text], i) => (
            <div key={name} className="relative overflow-hidden t-r-card">
              <Media variant={i % 2 ? 'mesh' : 'dots'} seed={i + 9} radius="none" className="aspect-4/3 w-full" overlay />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="t-head text-[1.4rem] text-white uppercase">{name}</h3>
                <p className="mt-1.5 text-sm text-white/80">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* weekly schedule grid — the signature block */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1240px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Расписание</h2>
            <span className="text-sm t-muted">Запись обязательна — в группе максимум 12 человек</span>
          </div>

          <div className="mt-10 overflow-x-auto">
            <div style={{ minWidth: 640 }}>
              <div
                className="grid gap-px text-xs tracking-[0.14em] uppercase t-faint"
                style={{ gridTemplateColumns: `72px repeat(${DAYS.length}, minmax(0, 1fr))` }}
              >
                <span />
                {DAYS.map((day) => (
                  <span key={day} className="px-3 pb-3 text-center">
                    {day}
                  </span>
                ))}
              </div>

              <div className="grid gap-px" style={{ background: 'var(--tp-border)' }}>
                {SCHEDULE.map((row) => (
                  <div
                    key={row.time}
                    className="grid gap-px"
                    style={{ gridTemplateColumns: `72px repeat(${DAYS.length}, minmax(0, 1fr))` }}
                  >
                    <span
                      className="t-head grid place-items-center py-4 text-sm"
                      style={{ background: 'var(--tp-bg)' }}
                    >
                      {row.time}
                    </span>
                    {row.cells.map((cell, ci) => (
                      <span
                        key={`${row.time}-${DAYS[ci]}`}
                        className="grid place-items-center px-2 py-4 text-center text-[0.82rem] font-semibold"
                        style={
                          cell
                            ? { background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }
                            : { background: 'var(--tp-bg)' }
                        }
                      >
                        {cell ?? ''}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* teachers */}
      <Section inner="max-w-[1240px]">
        <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Педагоги</h2>
        <div className="mt-10 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-4">
          {TEACHERS.map(([name, role], i) => (
            <div key={name} className="text-center">
              <Media variant="portrait" seed={i + 16} radius="pill" className="mx-auto aspect-square w-full max-w-[200px]" />
              <h3 className="mt-5 text-[1.1rem] uppercase">{name}</h3>
              <div className="mt-1.5 text-sm t-muted">{role}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* passes */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1240px]">
          <h2 className="text-[1.9rem] uppercase @2xl:text-[2.6rem]">Абонементы</h2>
          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-4">
            {PASSES.map((pass) => (
              <div
                key={pass.name}
                className="t-card flex flex-col p-6"
                style={{
                  background: 'var(--tp-bg)',
                  ...(pass.featured ? { borderColor: 'var(--tp-primary)' } : null),
                }}
              >
                {pass.featured && <span className="t-chip mb-4 self-start">Хит</span>}
                <h3 className="text-[1.2rem] uppercase">{pass.name}</h3>
                <div className="t-head mt-3 text-2xl t-primary">{pass.price}</div>
                <p className="mt-3 flex-1 text-sm t-muted">{pass.text}</p>
                <Btn className="mt-6 w-full" size="sm" variant={pass.featured ? 'solid' : 'outline'}>
                  Купить
                </Btn>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* trial CTA */}
      <Section inner="max-w-[1240px]">
        <div className="grid gap-8 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="flex items-center gap-2 text-sm font-semibold t-primary">
              <Sparkles size={16} /> Первое занятие
            </span>
            <h2 className="mt-4 text-[1.9rem] uppercase @2xl:text-[2.5rem]">
              Пробное за 500 ₽ в любом направлении
            </h2>
            <p className="mt-4 t-muted">
              Приходите в чём удобно, обувь можно взять у нас. Если не понравится — деньги вернём на
              месте, без разговоров.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm t-muted">
              <span className="flex items-center gap-2">
                <Users size={15} className="t-primary" /> группы до 12 человек
              </span>
              <span>залы 90 и 120 м²</span>
            </div>
          </div>
          <div className="t-card grid gap-3 p-7">
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Имя" />
              <input className="t-input" placeholder="Телефон" />
            </div>
            <select className="t-input">
              <option>Направление: Hip-Hop</option>
              <option>Направление: Contemporary</option>
              <option>Направление: Vogue</option>
              <option>Направление: High Heels</option>
              <option>Направление: Latina</option>
            </select>
            <Btn size="lg" className="w-full">
              Записаться на пробное
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg tracking-[0.16em] uppercase">Ритм</span>
          <span>Москва, Нижняя Сыромятническая 10 · +7 900 000-00-00</span>
          <span>© 2026 Студия танца «Ритм»</span>
        </div>
      </footer>
    </div>
  );
}

export const dance: TemplateDefinition = {
  id: 'dance',
  name: 'Ритм',
  category: 'Школа танцев',
  description:
    'Тёмный сайт студии танцев: плакатный первый экран, направления плитками и недельная сетка расписания.',
  tags: ['танцы', 'студия', 'школа', 'расписание', 'абонемент', 'хип-хоп'],
  defaults: {
    primary: '#7c3aed',
    secondary: '#f472b6',
    button: '#7c3aed',
    background: '#0f0a1a',
    text: '#f3ecff',
    buttonShape: 'rounded',
    font: 'unbounded',
    cardRadius: 20,
  },
  Component: DanceSite,
};
