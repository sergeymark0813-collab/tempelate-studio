import { Hammer, Ruler, ShieldCheck, TreePine, Truck, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const MATERIALS = [
  ['Дуб массив', 'Твёрдый, живая текстура', 'от 42 000 ₽/м²'],
  ['Ясень', 'Светлый, гибкий в отделке', 'от 34 000 ₽/м²'],
  ['Орех американский', 'Тёмный, благородный', 'от 58 000 ₽/м²'],
  ['Шпон на МДФ', 'Дешевле массива, не ведёт', 'от 21 000 ₽/м²'],
];

const STAGES: { icon: LucideIcon; title: string; text: string; days: string }[] = [
  { icon: Ruler, title: 'Замер', text: 'Приезжаем с лазерным уровнем, фиксируем все неровности стен', days: '1 день' },
  { icon: TreePine, title: 'Проект', text: '3D-визуализация и подбор материалов, две бесплатные правки', days: '3–5 дней' },
  { icon: Hammer, title: 'Производство', text: 'Своя столярная мастерская, вы получаете фото с этапов', days: '25–35 дней' },
  { icon: Truck, title: 'Монтаж', text: 'Собираем за день, вывозим упаковку и мусор', days: '1–2 дня' },
];

const PROJECTS = [
  ['Кухня из дуба, 4,2 м', 'Массив дуба, фрезерованные фасады, столешница из кварцита', '480 000 ₽'],
  ['Гардеробная под скос', 'Ясень, подсветка по датчику, 12 ящиков с доводчиками', '265 000 ₽'],
  ['Библиотека в гостиную', 'Орех, стеклянные витрины, встроенная лестница', '620 000 ₽'],
];

function FurnitureSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="t-head text-xl tracking-[0.16em] uppercase">Массив</span>
          <nav className="hidden gap-8 text-sm t-muted @4xl:flex">
            {['Материалы', 'Производство', 'Проекты', 'Расчёт', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm" variant="outline">
            Вызвать замерщика
          </Btn>
        </div>
      </header>

      {/* photo-first hero: full-width media, text sits under it */}
      <Media variant="stripes" seed={1} radius="none" className="min-h-[380px] w-full @3xl:min-h-[520px]" />

      <Section pad="py-12 @2xl:py-16" inner="max-w-[1240px]">
        <div className="grid gap-8 @4xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] @4xl:gap-16">
          <h1 className="text-[2.2rem] leading-[1.06] @2xl:text-[3.2rem]">
            Мебель из массива под ваши стены — без «почти подошло»
          </h1>
          <div>
            <p className="text-[1.05rem] t-muted">
              Столярная мастерская в Подольске. Делаем кухни, гардеробные и корпусную мебель по
              размерам вашей квартиры, а не по каталогу типовых модулей.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn size="lg">Бесплатный замер</Btn>
              <Btn size="lg" variant="outline">
                Смотреть проекты
              </Btn>
            </div>
          </div>
        </div>

        <div className="t-border-t mt-14 grid gap-8 pt-10 @xl:grid-cols-2 @4xl:grid-cols-4">
          {[
            ['14 лет', 'своя мастерская'],
            ['620+', 'сданных проектов'],
            ['5 лет', 'гарантия на корпус'],
            ['35 дней', 'средний срок'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="t-head text-3xl t-primary">{v}</div>
              <div className="mt-2 text-sm t-muted">{l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* material swatches — the signature block */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1240px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Материалы</h2>
            <span className="text-sm t-muted">Образцы привозим на замер — можно потрогать</span>
          </div>
          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-4">
            {MATERIALS.map(([name, text, price], i) => (
              <div key={name}>
                <Media
                  variant={i % 2 === 0 ? 'stripes' : 'mesh'}
                  seed={i + 3}
                  radius="card-sm"
                  className="aspect-3/2 w-full"
                />
                <h3 className="mt-4 text-[1.1rem]">{name}</h3>
                <p className="mt-1.5 text-sm t-muted">{text}</p>
                <div className="mt-2 text-sm font-semibold t-primary">{price}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* production stages as a horizontal ribbon */}
      <Section inner="max-w-[1240px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Как проходит работа</h2>
        <div className="mt-12 grid gap-px @xl:grid-cols-2 @4xl:grid-cols-4" style={{ background: 'var(--tp-border)' }}>
          {STAGES.map(({ icon: Icon, title, text, days }, i) => (
            <div key={title} className="p-7" style={{ background: 'var(--tp-bg)' }}>
              <div className="flex items-center justify-between gap-3">
                <Icon size={24} className="t-primary" strokeWidth={1.5} />
                <span className="t-head text-sm t-faint">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-[1.15rem]">{title}</h3>
              <p className="mt-2 text-sm t-muted">{text}</p>
              <div className="t-border-t mt-5 pt-4 text-sm font-semibold">{days}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* projects as alternating wide rows */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1240px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.6rem]">Проекты</h2>
          <div className="mt-12 grid gap-14">
            {PROJECTS.map(([title, text, price], i) => (
              <article
                key={title}
                className={`grid items-center gap-8 @4xl:grid-cols-2 @4xl:gap-14 ${
                  i % 2 === 1 ? '@4xl:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Media variant={i === 1 ? 'grid' : 'mesh'} seed={i + 8} className="aspect-4/3 w-full" />
                <div>
                  <h3 className="text-[1.6rem] @2xl:text-[2rem]">{title}</h3>
                  <p className="mt-4 t-muted">{text}</p>
                  <div className="t-border-t mt-7 flex flex-wrap items-center justify-between gap-4 pt-6">
                    <span className="t-head text-2xl t-primary">{price}</span>
                    <Btn variant="outline">Похожий проект</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* configurator-style estimate */}
      <Section inner="max-w-[1240px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Предварительный расчёт</h2>
            <p className="mt-5 t-muted">
              Три поля — и мы назовём вилку по цене в течение дня. Точная смета составляется после
              замера и остаётся неизменной.
            </p>
            <div className="t-card mt-8 flex gap-4 p-5">
              <ShieldCheck size={22} className="t-primary mt-0.5 shrink-0" strokeWidth={1.6} />
              <div className="text-sm">
                <div className="font-semibold">Смета фиксируется в договоре</div>
                <div className="mt-1 t-muted">
                  Если материала ушло меньше — возвращаем разницу.
                </div>
              </div>
            </div>
          </div>

          <div className="t-card p-7 @2xl:p-8">
            <div className="grid gap-4">
              <label className="block">
                <span className="text-xs tracking-wide uppercase t-faint">Что делаем</span>
                <select className="t-input mt-1.5">
                  <option>Кухня</option>
                  <option>Гардеробная</option>
                  <option>Корпусная мебель</option>
                  <option>Стол или комод</option>
                </select>
              </label>
              <div className="grid gap-4 @xl:grid-cols-2">
                <label className="block">
                  <span className="text-xs tracking-wide uppercase t-faint">Материал</span>
                  <select className="t-input mt-1.5">
                    <option>Дуб массив</option>
                    <option>Ясень</option>
                    <option>Орех</option>
                    <option>Шпон на МДФ</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs tracking-wide uppercase t-faint">Длина, м</span>
                  <input className="t-input mt-1.5" placeholder="4,2" />
                </label>
              </div>
              <div className="grid gap-4 @xl:grid-cols-2">
                <input className="t-input" placeholder="Имя" />
                <input className="t-input" placeholder="Телефон" />
              </div>
              <Btn size="lg" className="w-full">
                Получить расчёт
              </Btn>
              <p className="text-xs t-faint">
                Замерщик приезжает бесплатно и без обязательств заказать.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg tracking-[0.16em] uppercase">Массив</span>
            <p className="mt-3 text-sm opacity-70">
              Столярная мастерская. Мебель из массива на заказ с 2012 года.
            </p>
          </div>
          <div className="text-sm opacity-80">
            <div>Подольск, ул. Промышленная 4</div>
            <div className="mt-2">Пн–Сб 09:00–19:00</div>
          </div>
          <div className="text-sm opacity-80">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">order@massiv-mebel.ru</div>
            <div className="mt-4 opacity-70">© 2026 Мастерская «Массив»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const furniture: TemplateDefinition = {
  id: 'furniture',
  name: 'Массив',
  category: 'Мебель на заказ',
  description:
    'Сайт столярной мастерской: обложка во всю ширину, образцы материалов, этапы производства лентой.',
  tags: ['мебель', 'на заказ', 'кухни', 'массив', 'столярная', 'гардеробная'],
  defaults: {
    primary: '#78350f',
    secondary: '#d6b98c',
    button: '#3f2d1c',
    background: '#faf7f2',
    text: '#241a12',
    buttonShape: 'sharp',
    font: 'playfair',
    cardRadius: 4,
  },
  Component: FurnitureSite,
};
