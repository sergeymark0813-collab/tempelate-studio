import { Bath, BedDouble, Calculator, Maximize, Phone, Search } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Avatar, Btn, Eyebrow, Media, Section } from './ui';

const LISTINGS = [
  {
    title: '3-комнатная в ЖК «Резиденция»',
    address: 'Хамовники, Остоженка 14',
    price: '48 500 000 ₽',
    area: '112 м²',
    rooms: '3',
    baths: '2',
    tag: 'Эксклюзив',
    variant: 'mesh' as const,
  },
  {
    title: 'Пентхаус с террасой 40 м²',
    address: 'Пресня, Кутузовский 22',
    price: '96 000 000 ₽',
    area: '186 м²',
    rooms: '4',
    baths: '3',
    tag: 'Новое',
    variant: 'grid' as const,
  },
  {
    title: 'Студия под аренду',
    address: 'Басманный, Покровка 9',
    price: '14 200 000 ₽',
    area: '38 м²',
    rooms: '1',
    baths: '1',
    variant: 'rings' as const,
  },
];

const AREAS = [
  ['Хамовники', '124 объекта'],
  ['Пресня', '96 объектов'],
  ['Басманный', '78 объектов'],
  ['Замоскворечье', '61 объект'],
];

function RealEstateSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="t-head text-xl tracking-tight">
            ДОМ<span className="t-primary">·</span>ЛИНИЯ
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Купить', 'Снять', 'Новостройки', 'Оценка', 'Об агентстве'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm font-semibold @2xl:flex">
              <Phone size={14} className="t-primary" /> +7 900 000-00-00
            </span>
            <Btn size="sm">Оставить заявку</Btn>
          </div>
        </div>
      </header>

      {/* hero with search */}
      <div className="relative">
        <Media variant="grid" seed={1} radius="none" className="absolute inset-0" overlay />
        <div className="relative mx-auto max-w-[1240px] px-6 pt-16 pb-24 @2xl:px-10 @2xl:pt-24 @2xl:pb-32">
          <div className="max-w-[26ch]">
            <Eyebrow>Агентство недвижимости · Москва</Eyebrow>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] @2xl:text-[3.6rem]">
              Квартиры, которые не выкладывают в общий доступ
            </h1>
            <p className="mt-6 max-w-[46ch] opacity-80">
              420 объектов в закрытой базе, юридическое сопровождение и проверка истории права
              собственности.
            </p>
          </div>

          {/* search bar */}
          <div className="t-card t-shadow-lg mt-12 p-4 @2xl:p-5">
            <div className="grid gap-3 @2xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
              <label className="relative block">
                <Search size={16} className="t-faint absolute top-1/2 left-4 -translate-y-1/2" />
                <input className="t-input pl-11" placeholder="Район, метро или ЖК" />
              </label>
              <select className="t-input">
                <option>Комнат: любое</option>
                <option>1 комната</option>
                <option>2 комнаты</option>
                <option>3+ комнаты</option>
              </select>
              <select className="t-input">
                <option>Бюджет: любой</option>
                <option>до 20 млн ₽</option>
                <option>20–50 млн ₽</option>
                <option>от 50 млн ₽</option>
              </select>
              <Btn size="lg">Найти</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* listings */}
      <Section inner="max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Подборка недели</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Свежие предложения</h2>
          </div>
          <Btn variant="outline" size="sm">
            Все 420 объектов
          </Btn>
        </div>

        <div className="mt-10 grid gap-6 @2xl:grid-cols-2 @4xl:grid-cols-3">
          {LISTINGS.map((item, i) => (
            <article key={item.title} className="t-card overflow-hidden">
              <div className="relative">
                <Media variant={item.variant} seed={i + 3} radius="none" className="aspect-4/3 w-full" />
                {item.tag && (
                  <span
                    className="t-r-pill absolute top-4 left-4 px-3 py-1 text-[11px] font-bold tracking-wide uppercase"
                    style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="t-head text-xl">{item.price}</div>
                <h3 className="mt-2 text-[1.05rem] leading-snug">{item.title}</h3>
                <div className="mt-1 text-sm t-muted">{item.address}</div>
                <div className="t-border-t mt-5 flex items-center gap-5 pt-4 text-sm t-muted">
                  <span className="flex items-center gap-1.5">
                    <Maximize size={15} /> {item.area}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BedDouble size={15} /> {item.rooms}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath size={15} /> {item.baths}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* areas */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1240px]">
          <h2 className="text-[2rem] @2xl:text-[2.6rem]">Районы</h2>
          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-4">
            {AREAS.map(([name, count], i) => (
              <div key={name} className="relative overflow-hidden t-r-card">
                <Media
                  variant={(['mesh', 'dots', 'stripes', 'rings'] as const)[i]}
                  seed={i + 7}
                  radius="none"
                  className="aspect-4/5 w-full"
                  overlay
                />
                <div className="absolute bottom-5 left-5 text-white">
                  <div className="t-head text-xl">{name}</div>
                  <div className="text-sm opacity-80">{count}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* agent */}
      <Section inner="max-w-[1240px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-16">
          <Media variant="portrait" seed={11} radius="card-lg" className="aspect-4/3 w-full" />
          <div>
            <Eyebrow>Ваш агент</Eyebrow>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
              Сопровождаем сделку от показа до регистрации
            </h2>
            <p className="mt-5 t-muted">
              Проверяем документы, ведём торг, готовим договор и передаём ключи. Комиссию платит
              продавец — для покупателя услуга бесплатна.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Avatar name="Кирилл Морозов" size={54} />
              <div>
                <div className="font-semibold">Кирилл Морозов</div>
                <div className="text-sm t-muted">Ведущий эксперт · 9 лет в рынке</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn>Написать в WhatsApp</Btn>
              <Btn variant="outline">Заказать звонок</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* mortgage cta */}
      <Section inner="max-w-[1240px]" pad="pb-20">
        <div
          className="t-r-card-lg grid gap-8 p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_auto] @4xl:items-center"
          style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
        >
          <div className="flex items-start gap-5">
            <Calculator size={30} className="shrink-0" strokeWidth={1.6} />
            <div>
              <h2 className="text-[1.7rem] @2xl:text-[2.2rem]">Одобрим ипотеку в 8 банках</h2>
              <p className="mt-3 max-w-[48ch] opacity-85">
                Подберём ставку, соберём документы и подадим заявки параллельно — ответ за два дня.
              </p>
            </div>
          </div>
          <Btn size="lg" variant="inverse">
            Рассчитать платёж
          </Btn>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg tracking-tight">ДОМ·ЛИНИЯ</span>
            <p className="mt-3 text-sm t-muted">
              Агентство недвижимости. Работаем в Москве и Московской области.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>Москва, Пречистенка 40</div>
            <div className="mt-2">+7 900 000-00-00</div>
            <div className="mt-2">info@domliniya.ru</div>
          </div>
          <div className="text-sm t-muted">
            <div>Пн–Сб 09:00–20:00</div>
            <div className="mt-2">Показы по договорённости</div>
            <div className="mt-4 t-faint">© 2026 Дом·Линия</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const realestate: TemplateDefinition = {
  id: 'realestate',
  name: 'Дом·Линия',
  category: 'Недвижимость',
  description:
    'Сайт агентства недвижимости: поиск в первом экране, карточки объектов с параметрами, районы.',
  tags: ['недвижимость', 'квартиры', 'агентство', 'ипотека', 'аренда'],
  defaults: {
    primary: '#0f3d3e',
    secondary: '#b7a069',
    button: '#0f3d3e',
    background: '#ffffff',
    text: '#101f1e',
    buttonShape: 'soft',
    font: 'montserrat',
    cardRadius: 10,
  },
  Component: RealEstateSite,
};
