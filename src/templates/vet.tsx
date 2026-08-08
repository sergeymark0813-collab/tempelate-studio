import {
  Bird,
  Cat,
  Dog,
  Rabbit,
  Scissors,
  Siren,
  Stethoscope,
  Syringe,
  TestTube,
  Scan,
  type LucideIcon,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const SPECIES: { icon: LucideIcon; label: string }[] = [
  { icon: Dog, label: 'Собаки' },
  { icon: Cat, label: 'Кошки' },
  { icon: Bird, label: 'Птицы' },
  { icon: Rabbit, label: 'Грызуны' },
];

const SERVICES: { icon: LucideIcon; title: string; text: string; price: string }[] = [
  { icon: Stethoscope, title: 'Приём терапевта', text: 'Осмотр, сбор анамнеза, назначения', price: 'от 1 400 ₽' },
  { icon: Syringe, title: 'Вакцинация', text: 'Импортные вакцины, паспорт питомца', price: 'от 1 900 ₽' },
  { icon: TestTube, title: 'Лаборатория', text: 'Анализы крови и мочи, результат за 2 часа', price: 'от 900 ₽' },
  { icon: Scan, title: 'УЗИ и рентген', text: 'Цифровой рентген, УЗИ брюшной полости', price: 'от 2 200 ₽' },
  { icon: Scissors, title: 'Хирургия', text: 'Стерилизация, мягкие ткани, ортопедия', price: 'от 6 500 ₽' },
  { icon: Siren, title: 'Экстренная помощь', text: 'Круглосуточно, без записи и очереди', price: 'от 3 000 ₽' },
];

const EMERGENCY = [
  ['Отравление', 'Не вызывайте рвоту сами — при щелочах и кислотах это опасно. Везите сразу, возьмите упаковку съеденного.'],
  ['Травма или падение', 'Зафиксируйте питомца на твёрдой поверхности, не давайте обезболивающее «для людей».'],
  ['Отказ от еды больше суток', 'У кошек это критично: голодание 24 часа уже повод для осмотра, а не наблюдения.'],
];

const VACCINES = [
  ['Комплексная для собак (DHPPi+L)', '1 раз в год', '2 400 ₽'],
  ['Комплексная для кошек (Tricat)', '1 раз в год', '2 100 ₽'],
  ['Бешенство (Rabisin)', '1 раз в год, обязательна', '1 100 ₽'],
  ['Чипирование + регистрация', 'однократно', '2 800 ₽'],
];

function VetSite() {
  return (
    <div className="tpl">
      {/* emergency bar — the signature element of this layout */}
      <div style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}>
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 px-6 py-2.5 text-sm @2xl:px-10">
          <span className="flex items-center gap-2 font-bold">
            <Siren size={15} /> Работаем круглосуточно · экстренный приём без записи
          </span>
          <span className="font-bold">+7 900 000-00-00</span>
        </div>
      </div>

      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <span
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
            >
              <Dog size={20} strokeWidth={1.7} />
            </span>
            <span className="t-head text-xl">Лапа</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Услуги', 'Вакцинация', 'Врачи', 'Экстренно', 'Адрес'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Записаться</Btn>
        </div>
      </header>

      {/* hero: centred, with species selector */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1180px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[2.3rem] leading-[1.06] @2xl:text-[3.3rem]">
            Ветклиника, куда не страшно приехать в три часа ночи
          </h1>
          <p className="mx-auto mt-6 max-w-[50ch] text-[1.05rem] t-muted">
            Своя лаборатория, цифровой рентген и дежурный врач круглосуточно. Не переносим приём и не
            назначаем лишнего.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[640px] grid-cols-2 gap-3 @xl:grid-cols-4">
          {SPECIES.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="t-r-card flex flex-col items-center gap-2 px-4 py-5 text-center"
              style={
                i === 0
                  ? { background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }
                  : { background: 'var(--tp-surface)', border: '1px solid var(--tp-border)' }
              }
            >
              <Icon size={26} strokeWidth={1.6} />
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn size="lg">Записаться на приём</Btn>
          <Btn size="lg" variant="outline">
            Вызвать врача на дом
          </Btn>
        </div>
      </Section>

      {/* services as colour tiles 2×3 */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Услуги и цены</h2>
          <div className="mt-10 grid gap-5 @xl:grid-cols-2 @4xl:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text, price }) => (
              <article
                key={title}
                className="t-card flex flex-col p-6"
                style={{ background: 'var(--tp-bg)' }}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-full"
                  style={{ background: 'var(--tp-secondary-tint)', color: 'var(--tp-primary)' }}
                >
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[1.15rem]">{title}</h3>
                <p className="mt-2 flex-1 text-sm t-muted">{text}</p>
                <div className="t-border-t mt-5 flex items-center justify-between gap-3 pt-4">
                  <span className="t-head text-lg t-primary">{price}</span>
                  <Btn size="sm" variant="soft">
                    Записаться
                  </Btn>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* what to do if — instruction cards */}
      <Section inner="max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что делать, если…</h2>
          <span className="text-sm t-muted">Сохраните эту страницу — пригодится</span>
        </div>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {EMERGENCY.map(([title, text], i) => (
            <div
              key={title}
              className="t-r-card p-6"
              style={{ background: 'var(--tp-primary-tint)' }}
            >
              <div className="t-head text-3xl t-primary opacity-40">0{i + 1}</div>
              <h3 className="mt-3 text-[1.15rem]">{title}</h3>
              <p className="mt-2.5 text-[0.95rem]">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* vaccination table */}
      <Section inner="max-w-[1180px]" pad="pb-16 @2xl:pb-20">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">График вакцинации</h2>
            <p className="mt-5 t-muted">
              Напоминаем о ревакцинации сами — приходит сообщение за неделю. Паспорт питомца
              оформляем на первом приёме.
            </p>
            <Media variant="portrait" seed={4} className="mt-8 aspect-4/3 w-full" />
          </div>
          <div className="@4xl:pt-4">
            {VACCINES.map(([name, period, price]) => (
              <div key={name} className="t-border-t py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-semibold">{name}</span>
                  <span className="t-head text-lg t-primary">{price}</span>
                </div>
                <div className="mt-1 text-sm t-muted">{period}</div>
              </div>
            ))}
            <div className="t-border-t pt-6">
              <Btn variant="outline">Записаться на вакцинацию</Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* doctors */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Врачи</h2>
          <div className="mt-10 grid gap-6 @xl:grid-cols-3">
            {[
              ['Елена Кравцова', 'Терапевт, кардиолог', '15 лет практики'],
              ['Игорь Лемешев', 'Хирург, ортопед', '12 лет практики'],
              ['Дарья Полякова', 'Ратолог, экзотические животные', '8 лет практики'],
            ].map(([name, role, exp], i) => (
              <article
                key={name}
                className="t-card overflow-hidden"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Media variant="portrait" seed={i + 8} radius="none" className="aspect-square w-full" />
                <div className="p-5">
                  <h3 className="text-[1.05rem]">{name}</h3>
                  <div className="mt-1 text-sm t-primary">{role}</div>
                  <div className="text-sm t-muted">{exp}</div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* address */}
      <Section inner="max-w-[1180px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Как нас найти</h2>
            <div className="mt-7 grid gap-3">
              <span>Москва, ул. Бутлерова 7, отдельный вход с парковки</span>
              <span className="font-semibold t-primary">Приём круглосуточно, без выходных</span>
              <span>+7 900 000-00-00 · help@lapa-vet.ru</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Построить маршрут</Btn>
              <Btn size="lg" variant="outline">
                Позвонить дежурному
              </Btn>
            </div>
          </div>
          <Media variant="plan" seed={12} className="aspect-16/10 w-full" />
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm @2xl:px-10">
          <span className="t-head text-lg">Лапа</span>
          <span className="opacity-75">ул. Бутлерова 7 · круглосуточно</span>
          <span className="opacity-60">© 2026 Ветклиника «Лапа»</span>
        </div>
      </footer>
    </div>
  );
}

export const vet: TemplateDefinition = {
  id: 'vet',
  name: 'Лапа',
  category: 'Ветклиника',
  description:
    'Сайт ветклиники: полоса круглосуточного приёма, выбор питомца, услуги плитками и памятка «что делать».',
  tags: ['ветклиника', 'ветеринар', 'животные', 'вакцинация', 'питомец', 'круглосуточно'],
  defaults: {
    primary: '#f97316',
    secondary: '#22c55e',
    button: '#f97316',
    background: '#fffdf8',
    text: '#2b1d10',
    buttonShape: 'pill',
    font: 'golos',
    cardRadius: 26,
  },
  Component: VetSite,
};
