import { Clock, Gift, Instagram, MapPin, Scissors, Sparkles } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, Media, Section, Stars } from './ui';

const SERVICES = [
  {
    group: 'Волосы',
    items: [
      ['Стрижка и укладка', '3 200 ₽'],
      ['Окрашивание в один тон', 'от 6 400 ₽'],
      ['Сложное окрашивание', 'от 11 000 ₽'],
      ['Уход Olaplex', '2 800 ₽'],
    ],
  },
  {
    group: 'Лицо и тело',
    items: [
      ['Чистка лица', '4 900 ₽'],
      ['Массаж лица', '3 600 ₽'],
      ['Ламинирование ресниц', '3 200 ₽'],
      ['Маникюр с покрытием', '2 900 ₽'],
    ],
  },
];

const MASTERS = [
  ['Вера Соколова', 'Колорист, топ-мастер', '12 лет'],
  ['Милана Ким', 'Стилист-парикмахер', '8 лет'],
  ['Дина Абрамова', 'Косметолог-эстетист', '10 лет'],
];

function BeautySite() {
  return (
    <div className="tpl">
      <header>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-6 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Sparkles size={20} className="t-primary" />
            <span className="t-head text-2xl tracking-[0.16em] uppercase">Лоск</span>
          </span>
          <nav className="hidden gap-8 text-sm t-muted @3xl:flex">
            {['Услуги', 'Мастера', 'Галерея', 'Подарочные карты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Записаться</Btn>
        </div>
      </header>

      {/* hero — collage */}
      <Section pad="pt-8 pb-16 @2xl:pt-12 @2xl:pb-24">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <Eyebrow>Салон красоты в центре · с 2013</Eyebrow>
            <h1 className="mt-6 text-[2.7rem] leading-[1.05] @2xl:text-[3.8rem]">
              Ухоженность,
              <br />
              которая заметна
              <br />
              <span className="t-grad-text">без слов</span>
            </h1>
            <p className="mt-7 max-w-[46ch] t-muted">
              Восемь мастеров, спокойная атмосфера и честные рекомендации: скажем прямо, если
              процедура вам не нужна.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Онлайн-запись</Btn>
              <Btn size="lg" variant="outline">
                Прайс-лист
              </Btn>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Stars value={5} />
                <span className="text-sm t-muted">4.9 на Яндекс Картах</span>
              </div>
              <span className="flex items-center gap-2 text-sm t-muted">
                <MapPin size={15} className="t-primary" /> ул. Малая Бронная 12
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Media variant="portrait" seed={1} radius="card-lg" className="col-span-2 aspect-16/11 w-full" />
            <Media variant="rings" seed={3} radius="card-lg" className="aspect-square w-full" />
            <Media variant="mesh" seed={5} radius="card-lg" className="aspect-square w-full" />
          </div>
        </div>
      </Section>

      {/* services price list */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section>
          <div className="text-center">
            <Eyebrow className="text-center">Услуги и цены</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.7rem]">Прозрачный прайс</h2>
            <p className="mx-auto mt-4 max-w-[46ch] t-muted">
              Итоговую стоимость мастер называет до начала работы — никаких доплат «по факту».
            </p>
          </div>

          <div className="mt-14 grid gap-12 @3xl:grid-cols-2 @3xl:gap-16">
            {SERVICES.map(({ group, items }) => (
              <div key={group}>
                <h3 className="flex items-center gap-2.5 text-lg">
                  <Scissors size={17} className="t-primary" />
                  {group}
                </h3>
                <ul className="mt-6 grid gap-4">
                  {items.map(([name, price]) => (
                    <li key={name} className="flex items-baseline">
                      <span>{name}</span>
                      <span className="t-leader" />
                      <span className="t-head shrink-0">{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* masters */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Команда</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Наши мастера</h2>
          </div>
          <span className="flex items-center gap-2 text-sm t-muted">
            <Instagram size={16} className="t-primary" /> @losk.salon
          </span>
        </div>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {MASTERS.map(([name, role, exp], i) => (
            <article key={name} className="t-card overflow-hidden text-center">
              <Media variant="portrait" seed={i + 7} radius="none" className="aspect-4/5 w-full" />
              <div className="p-6">
                <h3 className="text-lg">{name}</h3>
                <div className="mt-1 text-sm t-primary">{role}</div>
                <div className="mt-1 text-sm t-muted">опыт {exp}</div>
                <Btn size="sm" variant="soft" className="mt-5 w-full">
                  Записаться к мастеру
                </Btn>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* gallery */}
      <Section pad="pb-4" inner="max-w-[1180px]">
        <h2 className="text-[2rem] @2xl:text-[2.6rem]">Работы мастеров</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 @3xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Media
              key={i}
              variant={(['mesh', 'rings', 'dots', 'stripes'] as const)[i]}
              seed={i + 11}
              radius="card-lg"
              className="aspect-3/4 w-full"
            />
          ))}
        </div>
      </Section>

      {/* gift card */}
      <Section>
        <div
          className="t-r-card-lg grid gap-8 overflow-hidden p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_auto] @4xl:items-center"
          style={{
            backgroundImage: 'linear-gradient(120deg, var(--tp-primary), var(--tp-secondary))',
            color: 'var(--tp-on-primary)',
          }}
        >
          <div>
            <Gift size={28} />
            <h2 className="mt-5 text-[1.8rem] @2xl:text-[2.4rem]">Подарочные сертификаты</h2>
            <p className="mt-3 max-w-[46ch] opacity-85">
              На любую сумму, действуют год. Оформим красивую открытку или пришлём электронный код.
            </p>
          </div>
          <Btn size="lg" variant="inverse">
            Купить сертификат
          </Btn>
        </div>
      </Section>

      {/* booking */}
      <Section pad="pb-20">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:gap-16">
          <div>
            <Eyebrow>Запись</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.5rem]">Оставьте заявку</h2>
            <p className="mt-5 t-muted">
              Администратор подберёт мастера и время. Отменить или перенести можно за 3 часа.
            </p>
            <div className="mt-8 grid gap-4 text-sm">
              <span className="flex items-center gap-3">
                <Clock size={16} className="t-primary" /> Ежедневно 10:00–21:00
              </span>
              <span className="flex items-center gap-3">
                <MapPin size={16} className="t-primary" /> Москва, ул. Малая Бронная 12
              </span>
            </div>
          </div>
          <form className="t-card grid gap-4 p-7 @2xl:p-9">
            <div className="grid gap-4 @xl:grid-cols-2">
              <input className="t-input" placeholder="Имя" />
              <input className="t-input" placeholder="Телефон" />
            </div>
            <select className="t-input">
              <option>Услуга</option>
              <option>Стрижка и укладка</option>
              <option>Окрашивание</option>
              <option>Косметология</option>
            </select>
            <div className="grid gap-4 @xl:grid-cols-2">
              <input className="t-input" placeholder="Дата" />
              <input className="t-input" placeholder="Время" />
            </div>
            <Btn size="lg" className="w-full">
              Записаться
            </Btn>
          </form>
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm @2xl:px-10">
          <span className="t-head text-lg tracking-[0.16em] uppercase">Лоск</span>
          <span className="opacity-70">+7 900 000-00-00 · hello@losk.ru</span>
          <span className="opacity-50">© 2026 Салон красоты «Лоск»</span>
        </div>
      </footer>
    </div>
  );
}

export const beauty: TemplateDefinition = {
  id: 'beauty',
  name: 'Лоск',
  category: 'Салон красоты',
  description:
    'Нежный сайт салона: коллаж в первом экране, прайс с ценами, мастера и сертификаты.',
  tags: ['салон', 'красота', 'парикмахерская', 'косметология', 'маникюр'],
  defaults: {
    primary: '#b3496b',
    secondary: '#e0a3b4',
    button: '#b3496b',
    background: '#fdf7f8',
    text: '#2c1720',
    buttonShape: 'pill',
    font: 'cormorant',
    cardRadius: 28,
  },
  Component: BeautySite,
};
