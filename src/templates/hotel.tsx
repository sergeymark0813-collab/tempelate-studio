import {
  Bath,
  Car,
  Coffee,
  MapPin,
  Trees,
  Users,
  Waves,
  Wifi,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section, Stars } from './ui';

const ROOMS = [
  {
    name: 'Стандарт с видом на лес',
    area: '24 м²',
    guests: '2 гостя',
    price: '7 400',
    text: 'Панорамное окно, кровать king-size, кофемашина и балкон с креслами.',
    variant: 'mesh' as const,
  },
  {
    name: 'Люкс с камином',
    area: '46 м²',
    guests: '2–3 гостя',
    price: '13 900',
    text: 'Отдельная гостиная, дровяной камин, ванна у окна и терраса на воду.',
    variant: 'rings' as const,
  },
  {
    name: 'Дом для семьи',
    area: '78 м²',
    guests: '4–6 гостей',
    price: '21 500',
    text: 'Две спальни, кухня, мангальная зона и собственный выход к пирсу.',
    variant: 'grid' as const,
  },
];

const FACILITIES = [
  { icon: Waves, title: 'Термальный бассейн', text: 'Открытый, 34 °C круглый год' },
  { icon: Bath, title: 'Банный комплекс', text: 'Русская баня и хаммам по записи' },
  { icon: Coffee, title: 'Ресторан', text: 'Завтраки включены, ужины à la carte' },
  { icon: Trees, title: '4 га леса', text: 'Размеченные маршруты для прогулок' },
  { icon: Wifi, title: 'Быстрый интернет', text: 'Wi-Fi 6 во всех корпусах' },
  { icon: Car, title: 'Парковка', text: 'Бесплатно, есть зарядка для электрокаров' },
];

function HotelSite() {
  return (
    <div className="tpl">
      {/* hero with an overlapping booking bar */}
      <div className="relative">
        <Media variant="mesh" seed={2} radius="none" className="min-h-[520px] w-full" overlay />
        <div className="absolute inset-0 flex flex-col">
          <header className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-6 @2xl:px-10">
            <span className="t-head text-lg tracking-[0.2em] text-white uppercase">
              Тихая Гавань
            </span>
            <nav className="hidden gap-8 text-sm text-white/85 @3xl:flex">
              {['Номера', 'Спа', 'Ресторан', 'События', 'Контакты'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>
            <span className="text-sm font-semibold text-white">+7 900 000-00-00</span>
          </header>

          <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-6 pb-16 text-center @2xl:px-10">
            <div className="mx-auto flex items-center gap-3 text-white/85">
              <Stars value={5} size={15} />
              <span className="text-sm">Бутик-отель · 120 км от Москвы</span>
            </div>
            <h1 className="mx-auto mt-6 max-w-[22ch] text-[2.4rem] leading-[1.06] text-white @2xl:text-[3.6rem]">
              Тишина, вода и сосны в двух часах от города
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-6 @2xl:px-10">
        <div className="t-card t-shadow-lg -mt-12 relative grid gap-3 p-5 @2xl:-mt-14 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
          <label className="block">
            <span className="text-xs tracking-wide uppercase t-faint">Заезд</span>
            <input className="t-input mt-1.5" placeholder="12 июня" />
          </label>
          <label className="block">
            <span className="text-xs tracking-wide uppercase t-faint">Выезд</span>
            <input className="t-input mt-1.5" placeholder="15 июня" />
          </label>
          <label className="block">
            <span className="text-xs tracking-wide uppercase t-faint">Гости</span>
            <select className="t-input mt-1.5">
              <option>2 взрослых</option>
              <option>2 взрослых + ребёнок</option>
              <option>4 взрослых</option>
            </select>
          </label>
          <div className="flex items-end">
            <Btn size="lg" className="w-full">
              Проверить наличие
            </Btn>
          </div>
        </div>
      </div>

      {/* intro */}
      <Section pad="pt-14 pb-4 @2xl:pt-20" inner="max-w-[1180px]">
        <div className="mx-auto max-w-[680px] text-center">
          <div className="t-eyebrow">Об отеле</div>
          <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.6rem]">
            Двенадцать номеров и ни одного лишнего звука
          </h2>
          <p className="mt-6 t-muted">
            Мы намеренно небольшие: никаких конференций и анимации. Только лес, термальная вода,
            завтраки до полудня и очень медленные вечера.
          </p>
        </div>
      </Section>

      {/* rooms — alternating wide rows */}
      <Section inner="max-w-[1180px]">
        <div className="grid gap-14">
          {ROOMS.map((room, i) => (
            <article
              key={room.name}
              className={`grid items-center gap-8 @4xl:grid-cols-2 @4xl:gap-14 ${
                i % 2 === 1 ? '@4xl:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Media variant={room.variant} seed={i + 4} radius="card-lg" className="aspect-4/3 w-full" />
              <div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm t-muted">
                  <span>{room.area}</span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} /> {room.guests}
                  </span>
                </div>
                <h3 className="mt-3 text-[1.6rem] @2xl:text-[2rem]">{room.name}</h3>
                <p className="mt-4 t-muted">{room.text}</p>
                <div className="t-border-t mt-7 flex flex-wrap items-center justify-between gap-4 pt-6">
                  <div>
                    <span className="t-head text-2xl">{room.price} ₽</span>
                    <span className="text-sm t-muted"> / ночь</span>
                  </div>
                  <Btn>Забронировать</Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* facilities — plain icon grid */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что входит в проживание</h2>
          <div className="mt-10 grid gap-8 @xl:grid-cols-2 @4xl:grid-cols-3">
            {FACILITIES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <Icon size={24} className="t-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1.5 text-sm t-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* reviews — three columns with oversized quotes */}
      <Section inner="max-w-[1180px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Отзывы гостей</h2>
        <div className="mt-10 grid gap-10 @2xl:grid-cols-3">
          {[
            ['Уехали на два дня, остались на пять. Бассейн в шесть утра — это отдельный вид счастья.', 'Анна и Кирилл'],
            ['Впервые за год выспался. Персонал появляется ровно тогда, когда нужен, и не раньше.', 'Дмитрий'],
            ['Приехали с детьми в дом у пирса. Готовили на мангале, дети не выходили из воды.', 'Семья Гринёвых'],
          ].map(([quote, author]) => (
            <blockquote key={author}>
              <span className="t-head block text-5xl leading-none t-primary opacity-30">“</span>
              <p className="mt-3 text-[1.02rem]">{quote}</p>
              <footer className="mt-4 text-sm t-muted">{author}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* location */}
      <Section inner="max-w-[1180px]" pad="pb-20">
        <div className="t-card grid overflow-hidden @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="p-8 @2xl:p-12">
            <div className="t-eyebrow">Как добраться</div>
            <h2 className="mt-4 text-[1.7rem] @2xl:text-[2.2rem]">Тверская обл., Заречье</h2>
            <p className="mt-5 t-muted">
              120 км по Ленинградскому шоссе, последние 6 км — асфальт. Организуем трансфер от
              «Ленинградского вокзала» за 4 500 ₽.
            </p>
            <div className="mt-7 grid gap-3 text-sm">
              <span className="flex items-center gap-3">
                <MapPin size={16} className="t-primary" /> д. Заречье, 14
              </span>
              <span>Заезд с 15:00 · выезд до 12:00</span>
              <span>stay@tihaya-gavan.ru</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn>Построить маршрут</Btn>
              <Btn variant="outline">Заказать трансфер</Btn>
            </div>
          </div>
          <Media variant="plan" seed={9} radius="none" className="min-h-[300px] w-full" />
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <div className="t-head text-lg tracking-[0.2em] uppercase">Тихая Гавань</div>
            <p className="mt-3 text-sm opacity-65">Бутик-отель на 12 номеров и 3 дома.</p>
          </div>
          <div className="text-sm opacity-75">
            <div>Тверская обл., д. Заречье, 14</div>
            <div className="mt-2">+7 900 000-00-00</div>
            <div className="mt-2">stay@tihaya-gavan.ru</div>
          </div>
          <div className="text-sm opacity-75">
            <div>Ресепшн круглосуточно</div>
            <div className="mt-2">Ресторан 08:00–23:00</div>
            <div className="mt-4 opacity-70">© 2026 Тихая Гавань</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const hotel: TemplateDefinition = {
  id: 'hotel',
  name: 'Тихая Гавань',
  category: 'Отель',
  description:
    'Сайт загородного отеля: обложка с формой брони поверх, номера широкими рядами, удобства.',
  tags: ['отель', 'гостиница', 'бронирование', 'номера', 'спа', 'загородный'],
  defaults: {
    primary: '#2f4f4a',
    secondary: '#c2a878',
    button: '#2f4f4a',
    background: '#f8f5ef',
    text: '#1b2b28',
    buttonShape: 'rounded',
    font: 'playfair',
    cardRadius: 20,
  },
  Component: HotelSite,
};
