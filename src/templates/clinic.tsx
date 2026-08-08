import {
  Activity,
  Baby,
  Brain,
  CalendarCheck,
  Eye,
  HeartPulse,
  MapPin,
  Phone,
  Stethoscope,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, Media, Section, Stars } from './ui';

const DEPARTMENTS = [
  { icon: HeartPulse, title: 'Кардиология', text: 'ЭКГ, УЗИ сердца, суточный мониторинг' },
  { icon: Brain, title: 'Неврология', text: 'Головные боли, головокружения, ЭЭГ' },
  { icon: Stethoscope, title: 'Терапия', text: 'Диспансеризация, справки, ведение хроников' },
  { icon: Baby, title: 'Педиатрия', text: 'Приём с рождения, прививки по календарю' },
  { icon: Eye, title: 'Офтальмология', text: 'Подбор линз, измерение давления' },
  { icon: Activity, title: 'Диагностика', text: 'УЗИ, анализы, функциональные исследования' },
];

const DOCTORS = [
  ['Елена Соколова', 'Кардиолог, к.м.н.', '22 года стажа'],
  ['Игорь Данилов', 'Невролог', '15 лет стажа'],
  ['Мария Гринёва', 'Педиатр', '11 лет стажа'],
];

const PRICES = [
  ['Первичный приём терапевта', '2 200 ₽'],
  ['Приём кардиолога, к.м.н.', '3 900 ₽'],
  ['УЗИ органов брюшной полости', '2 800 ₽'],
  ['Комплексный чек-ап «Базовый»', '12 400 ₽'],
];

function ClinicSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <span
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              <HeartPulse size={20} />
            </span>
            <span className="t-head text-xl">Медея</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Направления', 'Врачи', 'Цены', 'Анализы', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold @2xl:inline">+7 900 000-00-00</span>
            <Btn size="sm">Записаться</Btn>
          </div>
        </div>
      </header>

      {/* hero with appointment card */}
      <Section pad="py-14 @2xl:py-20">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Работаем без выходных · 08:00–21:00</span>
            <h1 className="mt-6 text-[2.5rem] @2xl:text-[3.4rem]">
              Медицинский центр рядом с домом
            </h1>
            <p className="mt-6 max-w-[52ch] t-muted">
              14 направлений, собственная лаборатория и врачи с опытом от 10 лет. Приём строго по
              времени — без очередей в коридоре.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">
                <CalendarCheck size={17} /> Записаться на приём
              </Btn>
              <Btn size="lg" variant="soft">
                Вызвать врача на дом
              </Btn>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-3">
                <Stars value={5} />
                <span className="text-sm t-muted">4.9 · 860 отзывов</span>
              </div>
              <span className="flex items-center gap-2 text-sm t-muted">
                <MapPin size={15} className="t-primary" /> 3 минуты от метро
              </span>
            </div>
          </div>

          <div className="t-card t-shadow-lg p-7 @2xl:p-8">
            <h2 className="text-xl">Запись на приём</h2>
            <p className="mt-2 text-sm t-muted">Перезвоним в течение 15 минут.</p>
            <div className="mt-6 grid gap-4">
              <input className="t-input" placeholder="Ваше имя" />
              <input className="t-input" placeholder="Телефон" />
              <select className="t-input">
                <option>Выберите направление</option>
                <option>Кардиология</option>
                <option>Неврология</option>
                <option>Терапия</option>
              </select>
              <div className="grid gap-3 @xl:grid-cols-2">
                <input className="t-input" placeholder="Дата" />
                <input className="t-input" placeholder="Удобное время" />
              </div>
              <Btn size="lg" className="w-full">
                Отправить заявку
              </Btn>
              <p className="text-center text-xs t-faint">
                Мы не передаём данные третьим лицам
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* departments */}
      <div className="t-surface t-border-t t-border-b">
        <Section>
          <div className="text-center">
            <Eyebrow className="text-center">Направления</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Что мы лечим</h2>
          </div>
          <div className="mt-12 grid gap-5 @2xl:grid-cols-2 @4xl:grid-cols-3">
            {DEPARTMENTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="t-card flex items-start gap-4 p-6" style={{ background: 'var(--tp-bg)' }}>
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  style={{ background: 'var(--tp-primary-tint)' }}
                >
                  <Icon size={21} className="t-primary" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1.5 text-sm t-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* doctors */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Врачи</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Кто вас примет</h2>
          </div>
          <Btn variant="outline" size="sm">
            Все специалисты
          </Btn>
        </div>
        <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
          {DOCTORS.map(([name, role, exp], i) => (
            <article key={name} className="t-card overflow-hidden">
              <Media variant="portrait" seed={i + 2} radius="none" className="aspect-4/3 w-full" />
              <div className="p-6">
                <h3 className="text-lg">{name}</h3>
                <div className="mt-1 text-sm t-primary">{role}</div>
                <div className="mt-1 text-sm t-muted">{exp}</div>
                <Btn size="sm" variant="soft" className="mt-5 w-full">
                  Записаться
                </Btn>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* prices */}
      <div className="t-surface t-border-t t-border-b">
        <Section>
          <div className="grid gap-10 @4xl:grid-cols-[360px_minmax(0,1fr)] @4xl:gap-16">
            <div>
              <Eyebrow>Цены</Eyebrow>
              <h2 className="mt-4 text-[2rem] @2xl:text-[2.5rem]">Понятная стоимость</h2>
              <p className="mt-5 text-sm t-muted">
                Полный прайс — более 400 позиций. Оплата картой, рассрочка, налоговый вычет.
              </p>
              <Btn variant="outline" className="mt-7">
                Весь прайс-лист
              </Btn>
            </div>
            <div>
              {PRICES.map(([name, price], i) => (
                <div
                  key={name}
                  className={`flex items-center justify-between gap-6 py-5 ${i > 0 ? 't-border-t' : ''}`}
                >
                  <span>{name}</span>
                  <span className="t-head shrink-0 text-lg">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* insurance + cta */}
      <Section>
        <div
          className="t-r-card-lg grid gap-8 p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_auto] @4xl:items-center"
          style={{ background: 'var(--tp-primary-tint)' }}
        >
          <div>
            <h2 className="text-[1.7rem] @2xl:text-[2.2rem]">Работаем с ДМС</h2>
            <p className="mt-3 max-w-[52ch] t-muted">
              Принимаем полисы 20 страховых компаний. Уточните программу по телефону — подскажем,
              что входит в покрытие.
            </p>
          </div>
          <Btn size="lg">
            <Phone size={17} /> +7 900 000-00-00
          </Btn>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-4">
          <div>
            <span className="t-head text-lg">Медея</span>
            <p className="mt-3 text-sm t-muted">Лицензия ЛО-77-01-000000 от 12.03.2019</p>
          </div>
          <div className="text-sm t-muted">
            <div style={{ color: 'var(--tp-text)' }} className="font-semibold">Адрес</div>
            <div className="mt-3">Москва, ул. Лесная 24</div>
            <div className="mt-1">3 минуты от м. Белорусская</div>
          </div>
          <div className="text-sm t-muted">
            <div style={{ color: 'var(--tp-text)' }} className="font-semibold">Часы работы</div>
            <div className="mt-3">Ежедневно 08:00–21:00</div>
            <div className="mt-1">Лаборатория 08:00–12:00</div>
          </div>
          <div className="text-sm t-muted">
            <div style={{ color: 'var(--tp-text)' }} className="font-semibold">Контакты</div>
            <div className="mt-3">+7 900 000-00-00</div>
            <div className="mt-1">info@medeya.ru</div>
          </div>
        </div>
        <div className="t-border-t">
          <div className="mx-auto max-w-[1200px] px-6 py-6 text-xs t-faint @2xl:px-10">
            © 2026 Медицинский центр «Медея» · Имеются противопоказания, необходима консультация
            специалиста
          </div>
        </div>
      </footer>
    </div>
  );
}

export const clinic: TemplateDefinition = {
  id: 'clinic',
  name: 'Медея',
  category: 'Медицина',
  description:
    'Сайт медицинского центра: направления, врачи, прайс и форма записи прямо в первом экране.',
  tags: ['клиника', 'медицина', 'врачи', 'запись', 'здоровье'],
  defaults: {
    primary: '#0e7490',
    secondary: '#34d399',
    button: '#0e7490',
    background: '#f8fbfd',
    text: '#0b1f27',
    buttonShape: 'rounded',
    font: 'manrope',
    cardRadius: 22,
  },
  Component: ClinicSite,
};
