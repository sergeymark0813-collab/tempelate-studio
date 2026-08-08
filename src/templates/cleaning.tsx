import { Check, Droplets, Sparkles, SprayCan, Star, Wind, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section, Stars } from './ui';

const TYPES: { icon: LucideIcon; name: string; price: string; time: string; text: string; perks: string[] }[] = [
  {
    icon: Wind,
    name: 'Поддерживающая',
    price: 'от 2 900 ₽',
    time: '2–3 часа',
    text: 'Регулярная уборка, когда в квартире и так порядок',
    perks: ['Пыль и полы', 'Санузел и кухня', 'Вынос мусора'],
  },
  {
    icon: SprayCan,
    name: 'Генеральная',
    price: 'от 6 400 ₽',
    time: '5–7 часов',
    text: 'Всё, до чего обычно не доходят руки',
    perks: ['Внутри шкафов', 'Окна и рамы', 'Техника внутри', 'Плитка и швы'],
  },
  {
    icon: Sparkles,
    name: 'После ремонта',
    price: 'от 9 800 ₽',
    time: '7–10 часов',
    text: 'Строительная пыль, следы клея и краски',
    perks: ['Пыль в три прохода', 'Удаление затирки', 'Мойка окон', 'Пылесос для стройпыли'],
  },
];

const INCLUDED = [
  'Свои средства и техника',
  'Пылесос с HEPA-фильтром',
  'Профессиональные химсредства',
  'Мойка окон с двух сторон',
  'Уборка внутри бытовой техники',
  'Вынос мусора до бака',
];

const NOT_INCLUDED = ['Мойка люстр с демонтажом', 'Химчистка мебели и ковров', 'Уборка балкона-склада'];

function CleaningSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Droplets size={22} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl">Чисто</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Услуги', 'Что входит', 'Цены', 'Отзывы', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Рассчитать уборку</Btn>
        </div>
      </header>

      {/* hero with a live calculator card — the signature block */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1180px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Клининг по Москве и области</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
              Цена известна до приезда бригады
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Считаем по площади и типу уборки, а не «по факту». Если бригада не успела за
              оговорённое время — доделываем бесплатно.
            </p>
            <div className="mt-9 grid gap-3 text-sm">
              {['Оплата после проверки результата', 'Одна и та же бригада к вам', 'Работаем с 07:00 до 23:00'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2.5">
                    <Check size={16} className="t-primary shrink-0" /> {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="t-card t-shadow p-6 @2xl:p-7">
            <div className="t-head text-lg">Калькулятор</div>
            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="text-xs tracking-wide uppercase t-faint">Тип уборки</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Поддерживающая', 'Генеральная', 'После ремонта'].map((t, i) => (
                    <span
                      key={t}
                      className="t-r-btn px-3.5 py-2 text-sm font-semibold"
                      style={
                        i === 1
                          ? { background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }
                          : {
                              background: 'var(--tp-bg)',
                              color: 'var(--tp-muted)',
                              border: '1px solid var(--tp-border)',
                            }
                      }
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </label>
              <div className="grid gap-4 @xl:grid-cols-2">
                <label className="block">
                  <span className="text-xs tracking-wide uppercase t-faint">Площадь, м²</span>
                  <input className="t-input mt-1.5" placeholder="62" />
                </label>
                <label className="block">
                  <span className="text-xs tracking-wide uppercase t-faint">Санузлов</span>
                  <select className="t-input mt-1.5">
                    <option>1</option>
                    <option>2</option>
                    <option>3 и больше</option>
                  </select>
                </label>
              </div>
            </div>

            <div
              className="t-r-card mt-6 flex flex-wrap items-center justify-between gap-4 p-5"
              style={{ background: 'var(--tp-primary-tint)' }}
            >
              <div>
                <div className="text-xs tracking-wide uppercase t-faint">Итого</div>
                <div className="t-head text-3xl t-primary">7 480 ₽</div>
                <div className="mt-1 text-sm t-muted">Бригада 2 человека · 6 часов</div>
              </div>
              <Btn>Вызвать бригаду</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* cleaning types */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Виды уборки</h2>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {TYPES.map(({ icon: Icon, name, price, time, text, perks }, i) => (
              <article
                key={name}
                className="t-card flex flex-col p-7"
                style={{
                  background: 'var(--tp-bg)',
                  ...(i === 1 ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' } : null),
                }}
              >
                <Icon size={26} className="t-primary" strokeWidth={1.6} />
                <h3 className="mt-5 text-[1.3rem]">{name}</h3>
                <div className="mt-3">
                  <span className="t-head text-2xl t-primary">{price}</span>
                </div>
                <div className="mt-1 text-sm t-muted">{time}</div>
                <p className="mt-4 text-sm t-muted">{text}</p>
                <ul className="mt-5 grid flex-1 gap-2.5 text-sm">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <Check size={15} className="t-primary mt-0.5 shrink-0" /> {perk}
                    </li>
                  ))}
                </ul>
                <Btn className="mt-7 w-full" variant={i === 1 ? 'solid' : 'outline'}>
                  Заказать
                </Btn>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* included / not included */}
      <Section inner="max-w-[1180px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что входит в стоимость</h2>
        <div className="mt-10 grid gap-10 @3xl:grid-cols-2 @3xl:gap-16">
          <div>
            <div className="text-sm font-bold tracking-wide uppercase t-primary">Входит</div>
            <ul className="mt-5 grid gap-3">
              {INCLUDED.map((item) => (
                <li key={item} className="t-border-b flex items-start gap-3 pb-3">
                  <Check size={16} className="t-primary mt-1 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-bold tracking-wide uppercase t-faint">Оплачивается отдельно</div>
            <ul className="mt-5 grid gap-3 t-muted">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="t-border-b flex items-start gap-3 pb-3">
                  <span className="mt-2 h-1 w-3 shrink-0" style={{ background: 'var(--tp-border-strong)' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm t-faint">
              Стоимость дополнительных работ согласовываем до начала уборки.
            </p>
          </div>
        </div>
      </Section>

      {/* before / after */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-secondary-tint)' }}>
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Было — стало</h2>
          <div className="mt-10 grid gap-8 @3xl:grid-cols-2">
            {[
              ['Кухня после ремонта', '9 часов · 2 человека'],
              ['Санузел, генеральная', '3 часа · 1 человек'],
            ].map(([title, meta], i) => (
              <div key={title}>
                <div className="grid grid-cols-2 gap-2">
                  {['Было', 'Стало'].map((label, li) => (
                    <div key={label} className="relative">
                      <Media
                        variant={li === 0 ? 'grid' : 'mesh'}
                        seed={i * 4 + li + 2}
                        className="aspect-4/3 w-full"
                      />
                      <span
                        className="t-r-pill absolute top-3 left-3 px-2.5 py-1 text-xs font-bold"
                        style={{
                          background: li === 0 ? 'var(--tp-surface-2)' : 'var(--tp-primary)',
                          color: li === 0 ? 'var(--tp-muted)' : 'var(--tp-on-primary)',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <h3 className="mt-4 text-[1.15rem]">{title}</h3>
                <div className="mt-1 text-sm t-muted">{meta}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* reviews with ratings */}
      <Section inner="max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Отзывы</h2>
          <span className="flex items-center gap-2 text-sm t-muted">
            <Star size={15} className="t-secondary" fill="currentColor" /> 4,9 из 5 · 612 оценок
          </span>
        </div>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {[
            ['Мыли квартиру после строителей. Пыль ушла даже с плинтусов и с верха шкафов.', 'Ольга, Химки', 5],
            ['Берём поддерживающую каждые две недели, приходит одна и та же девушка. Удобно.', 'Артём, Москва', 5],
            ['Опоздали на полчаса из-за пробок, но предупредили и сделали скидку сами.', 'Наталья, Одинцово', 4],
          ].map(([quote, author, rating]) => (
            <blockquote key={author as string} className="t-card p-6">
              <Stars value={rating as number} size={14} />
              <p className="mt-4 text-[0.98rem]">{quote as string}</p>
              <footer className="mt-4 text-sm t-muted">{author as string}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* order */}
      <div className="t-bg-primary">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-16 @2xl:px-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center">
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.4rem]">Вызвать бригаду</h2>
            <p className="mt-4 opacity-85">
              Свободные слоты обычно есть на завтра. Оплата после того, как вы проверите результат.
            </p>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            <input className="t-input" placeholder="Имя" />
            <input className="t-input" placeholder="Телефон" />
            <input className="t-input" placeholder="Площадь, м²" />
            <input className="t-input" placeholder="Удобная дата" />
            <Btn size="lg" variant="inverse" className="@xl:col-span-2">
              Оставить заявку
            </Btn>
          </div>
        </div>
      </div>

      <footer>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm t-muted @2xl:px-10">
          <span className="t-head text-lg">Чисто</span>
          <span>Ежедневно 07:00–23:00 · +7 900 000-00-00</span>
          <span>© 2026 Клининговая служба «Чисто»</span>
        </div>
      </footer>
    </div>
  );
}

export const cleaning: TemplateDefinition = {
  id: 'cleaning',
  name: 'Чисто',
  category: 'Клининг',
  description:
    'Сайт клининга: калькулятор с итоговой ценой в первом экране, виды уборки и разбор «входит / отдельно».',
  tags: ['клининг', 'уборка', 'генеральная', 'после ремонта', 'калькулятор'],
  defaults: {
    primary: '#06b6d4',
    secondary: '#a3e635',
    button: '#06b6d4',
    background: '#f9feff',
    text: '#0b2830',
    buttonShape: 'pill',
    font: 'rubik',
    cardRadius: 20,
  },
  Component: CleaningSite,
};
