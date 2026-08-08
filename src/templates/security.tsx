import {
  Bell,
  Camera,
  Eye,
  Lock,
  Radio,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const OBJECTS = [
  ['Склад «Восточный»', 'Норма', 'ok'],
  ['Офис на Тверской', 'Норма', 'ok'],
  ['Магазин № 14', 'Открыта дверь · 21:04', 'warn'],
  ['Коттедж, Истра', 'Снят с охраны', 'off'],
] as const;

const SERVICES: { icon: LucideIcon; title: string; text: string; specs: string[] }[] = [
  {
    icon: Radio,
    title: 'Пультовая охрана',
    text: 'Сигнал с объекта поступает на наш пульт, группа выезжает по тревоге.',
    specs: ['выезд 5–7 мин', 'от 3 900 ₽/мес'],
  },
  {
    icon: UserCheck,
    title: 'Физическая охрана',
    text: 'Лицензированные сотрудники на объекте, пропускной режим и обходы.',
    specs: ['от 12 ч/сутки', 'от 190 ₽/час'],
  },
  {
    icon: Camera,
    title: 'Видеонаблюдение',
    text: 'Монтаж и обслуживание, архив в облаке, доступ с телефона.',
    specs: ['архив 30 дней', 'от 34 000 ₽ монтаж'],
  },
  {
    icon: Lock,
    title: 'Контроль доступа',
    text: 'СКУД на карты и биометрию, учёт рабочего времени сотрудников.',
    specs: ['до 500 карт', 'от 68 000 ₽'],
  },
];

const EQUIPMENT = [
  ['Тревожная кнопка', 'Радиокнопка с брелоком, работает до 300 м от базы', '4 900 ₽'],
  ['GSM-модуль с резервом', 'Две SIM и аккумулятор на 12 часов автономии', '11 400 ₽'],
  ['Комплект датчиков', 'Движение, открытие, разбитие стекла, дым', 'от 18 000 ₽'],
];

const TARIFFS = [
  ['Квартира', 'до 100 м²', '3 900 ₽/мес', 'Тревожная кнопка в подарок'],
  ['Офис', 'до 300 м²', '6 400 ₽/мес', 'Открытие/закрытие по графику'],
  ['Магазин', 'с кассой', '8 900 ₽/мес', 'Кнопка на каждой кассе'],
  ['Склад', 'от 500 м²', 'по расчёту', 'Обходы и видеоаналитика'],
];

function SecuritySite() {
  return (
    <div className="tpl">
      <div className="t-inverse text-sm">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-6 py-2.5 @2xl:px-10">
          <span className="opacity-75">Лицензия МВД № 000000 от 14.02.2008 · работаем 18 лет</span>
          <span className="font-semibold">Пульт: 8 800 000-00-00 · круглосуточно</span>
        </div>
      </div>

      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <ShieldCheck size={22} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl">Периметр</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Услуги', 'Оборудование', 'Тарифы', 'Лицензии', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Выезд на объект</Btn>
        </div>
      </header>

      {/* hero with a monitoring-console card — the signature block */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <h1 className="text-[2.3rem] leading-[1.06] @2xl:text-[3.3rem]">
              Группа реагирования на объекте за 5–7 минут
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Свой пульт охраны, 11 экипажей по Москве и области. Обслуживаем 1 400 объектов —
              от квартир до складских комплексов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Бесплатный выезд специалиста</Btn>
              <Btn size="lg" variant="outline">
                Тарифы
              </Btn>
            </div>
            <div className="mt-10 grid gap-6 @xl:grid-cols-3">
              {[
                ['5–7 мин', 'среднее время выезда'],
                ['1 400', 'объектов на охране'],
                ['24/7', 'работа пульта'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="t-head text-2xl t-primary">{v}</div>
                  <div className="mt-1 text-sm t-muted">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="t-card t-shadow p-6 @2xl:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="t-head text-lg">Пульт охраны</span>
              <span className="flex items-center gap-2 text-xs font-semibold t-primary">
                <Eye size={13} /> онлайн
              </span>
            </div>
            <div className="mt-5 grid gap-2.5">
              {OBJECTS.map(([name, status, state]) => (
                <div
                  key={name}
                  className="t-r-card-sm flex items-center justify-between gap-3 px-4 py-3"
                  style={{
                    background:
                      state === 'warn' ? 'var(--tp-secondary-tint)' : 'var(--tp-surface-2)',
                  }}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{name}</div>
                    <div className="mt-0.5 text-xs t-muted">{status}</div>
                  </div>
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background:
                        state === 'ok'
                          ? 'var(--tp-primary)'
                          : state === 'warn'
                            ? 'var(--tp-secondary)'
                            : 'var(--tp-border-strong)',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="t-border-t mt-6 flex items-center justify-between gap-3 pt-5">
              <span className="flex items-center gap-2 text-sm t-muted">
                <Bell size={14} className="t-primary" /> 1 событие требует внимания
              </span>
              <Btn size="sm" variant="soft">
                Журнал
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* services as wide rows */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Виды охраны</h2>
          <div className="mt-10 grid gap-4">
            {SERVICES.map(({ icon: Icon, title, text, specs }) => (
              <article
                key={title}
                className="t-card grid gap-5 p-6 @2xl:p-7 @4xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.55fr)] @4xl:items-center @4xl:gap-8"
                style={{ background: 'var(--tp-bg)' }}
              >
                <span
                  className="t-r-card-sm grid h-14 w-14 shrink-0 place-items-center"
                  style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                >
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-[1.25rem]">{title}</h3>
                  <p className="mt-1.5 text-[0.95rem] t-muted">{text}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specs.map((spec) => (
                    <span
                      key={spec}
                      className="t-r-btn px-3 py-1.5 text-xs font-semibold"
                      style={{ background: 'var(--tp-surface-2)', color: 'var(--tp-muted)' }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* equipment */}
      <Section inner="max-w-[1200px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Оборудование</h2>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {EQUIPMENT.map(([name, text, price], i) => (
            <article key={name} className="t-card overflow-hidden">
              <Media variant="grid" seed={i + 3} radius="none" className="aspect-16/10 w-full" />
              <div className="p-6">
                <h3 className="text-[1.1rem]">{name}</h3>
                <p className="mt-2 text-sm t-muted">{text}</p>
                <div className="t-border-t mt-5 flex items-center justify-between gap-3 pt-4">
                  <span className="t-head text-lg t-primary">{price}</span>
                  <span className="text-xs t-faint">монтаж включён</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* tariffs table */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Тарифы мониторинга</h2>
          <div className="mt-10">
            <div className="hidden pb-4 text-xs tracking-[0.14em] uppercase t-faint @3xl:grid @3xl:grid-cols-[minmax(0,0.7fr)_minmax(0,0.6fr)_140px_minmax(0,1fr)] @3xl:gap-6">
              <span>Объект</span>
              <span>Площадь</span>
              <span>Стоимость</span>
              <span>Что включено</span>
            </div>
            {TARIFFS.map(([obj, area, price, extra]) => (
              <div
                key={obj}
                className="t-border-t grid gap-1 py-5 @3xl:grid-cols-[minmax(0,0.7fr)_minmax(0,0.6fr)_140px_minmax(0,1fr)] @3xl:items-center @3xl:gap-6"
              >
                <span className="font-semibold">{obj}</span>
                <span className="text-sm t-muted">{area}</span>
                <span className="t-head text-lg t-primary">{price}</span>
                <span className="text-sm t-muted">{extra}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm t-faint">
            Монтаж оборудования при заключении договора на год — бесплатно.
          </p>
        </Section>
      </div>

      {/* request */}
      <Section inner="max-w-[1200px]">
        <div className="t-card grid gap-8 p-8 @2xl:p-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.3rem]">Вызвать специалиста на объект</h2>
            <p className="mt-4 t-muted">
              Приедем, посмотрим планировку и подготовим смету на охрану и оборудование. Выезд
              бесплатный, договор не обязателен.
            </p>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            <input className="t-input" placeholder="Имя" />
            <input className="t-input" placeholder="Телефон" />
            <select className="t-input @xl:col-span-2">
              <option>Тип объекта: квартира</option>
              <option>Тип объекта: офис</option>
              <option>Тип объекта: магазин</option>
              <option>Тип объекта: склад или производство</option>
            </select>
            <Btn size="lg" className="@xl:col-span-2">
              Оставить заявку
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Периметр</span>
            <p className="mt-3 text-sm opacity-70">
              Частная охранная организация. Лицензия МВД № 000000 от 14.02.2008.
            </p>
          </div>
          <div className="text-sm opacity-80">
            <div>Пульт: 8 800 000-00-00</div>
            <div className="mt-2">Круглосуточно, без выходных</div>
          </div>
          <div className="text-sm opacity-80">
            <div>Москва, ул. Обручева 30</div>
            <div className="mt-1">office@perimetr-ohrana.ru</div>
            <div className="mt-4 opacity-70">© 2026 ЧОО «Периметр»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const security: TemplateDefinition = {
  id: 'security',
  name: 'Периметр',
  category: 'Охрана',
  description:
    'Сайт охранной организации: карточка пульта со статусами объектов, виды охраны и тарифы мониторинга.',
  tags: ['охрана', 'сигнализация', 'видеонаблюдение', 'пульт', 'скуд', 'безопасность'],
  defaults: {
    primary: '#1e3a5f',
    secondary: '#64748b',
    button: '#1e3a5f',
    background: '#f6f8fa',
    text: '#0f1c2b',
    buttonShape: 'soft',
    font: 'montserrat',
    cardRadius: 8,
  },
  Component: SecuritySite,
};
