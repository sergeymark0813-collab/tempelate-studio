import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Eyebrow, Logo, LogoMarquee, Media, Section, Stars } from './ui';

const NAV = ['Услуги', 'Подход', 'Кейсы', 'Команда', 'Контакты'];

const SERVICES = [
  {
    icon: BarChart3,
    title: 'Стратегия роста',
    text: 'Находим точки роста в юнит-экономике и строим план на 12 месяцев с понятными метриками.',
  },
  {
    icon: ShieldCheck,
    title: 'Аудит процессов',
    text: 'Разбираем операционку по шагам, убираем узкие места и лишние согласования.',
  },
  {
    icon: Users,
    title: 'Развитие команды',
    text: 'Собираем структуру, зоны ответственности и систему найма под ваши задачи.',
  },
];

const CHECKLIST = [
  'Прозрачная отчётность каждую неделю',
  'Фиксированная стоимость этапа',
  'Выделенный руководитель проекта',
  'Передача документации и регламентов',
];

function BusinessSite() {
  return (
    <div className="tpl">
      {/* nav */}
      <header className="t-border-b" style={{ background: 'var(--tp-bg)' }}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5 @2xl:px-10">
          <Logo name="Meridian" mark="M" />
          <nav className="hidden items-center gap-8 text-sm t-muted @4xl:flex">
            {NAV.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm font-semibold @2xl:flex">
              <Phone size={15} className="t-primary" />
              +7 900 000-00-00
            </span>
            <Btn size="sm">Обсудить проект</Btn>
          </div>
        </div>
      </header>

      {/* hero */}
      <Section pad="pt-14 pb-16 @2xl:pt-20 @2xl:pb-24">
        <div className="grid items-center gap-12 @4xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @4xl:gap-16">
          <div>
            <Eyebrow>Консалтинг для среднего бизнеса</Eyebrow>
            <h1 className="mt-5 text-[2.6rem] @2xl:text-[3.5rem] @5xl:text-[4.1rem]">
              Управленческие решения, которые видно в цифрах
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] t-muted">
              Помогаем компаниям с оборотом от 100 млн ₽ выстроить управление так, чтобы рост не
              упирался в ручные процессы и героизм основателя.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">
                Получить диагностику <ArrowRight size={17} />
              </Btn>
              <Btn size="lg" variant="outline">
                Смотреть кейсы
              </Btn>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <Stars value={5} />
                <span className="text-sm t-muted">4.9 — 68 отзывов</span>
              </div>
              <span className="text-sm t-muted">Работаем с 2011 года</span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="t-card t-shadow-lg p-7">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm t-muted">Средний рост выручки</div>
                  <div className="t-head mt-2 text-5xl t-primary">+38%</div>
                </div>
                <span
                  className="grid h-11 w-11 place-items-center t-r-btn"
                  style={{ background: 'var(--tp-primary-tint)' }}
                >
                  <ArrowUpRight size={20} className="t-primary" />
                </span>
              </div>
              <div className="mt-6 flex items-end gap-2">
                {[38, 52, 44, 66, 74, 88, 100].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 t-r-card-sm"
                    style={{
                      height: `${h * 0.9}px`,
                      background: i === 6 ? 'var(--tp-primary)' : 'var(--tp-primary-15)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-4 @xl:grid-cols-2">
              <div className="t-card p-6">
                <div className="t-head text-3xl">140+</div>
                <div className="mt-1 text-sm t-muted">проектов завершено</div>
              </div>
              <div className="t-card p-6">
                <div className="t-head text-3xl">9 лет</div>
                <div className="mt-1 text-sm t-muted">средний срок работы с клиентом</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* clients */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-surface)' }}>
        <div className="mx-auto max-w-[1180px] px-6 @2xl:px-10">
          <LogoMarquee items={['ATLAS', 'NORDWIND', 'Volta', 'ГК Ресурс', 'Kepler', 'Первый Дом']} />
        </div>
      </div>

      {/* services */}
      <Section>
        <div className="flex flex-col gap-4 @3xl:flex-row @3xl:items-end @3xl:justify-between">
          <div>
            <Eyebrow>Направления</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Три зоны, где мы сильнее всего</h2>
          </div>
          <p className="max-w-[38ch] text-sm t-muted">
            Берём проект целиком или подключаемся к отдельному участку — от аудита до внедрения.
          </p>
        </div>

        <div className="mt-12 grid gap-6 @2xl:grid-cols-2 @4xl:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="t-card group p-8">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-12 w-12 place-items-center t-r-btn"
                  style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
                >
                  <Icon size={22} />
                </span>
                <span className="t-head text-4xl opacity-15">0{i + 1}</span>
              </div>
              <h3 className="mt-7 text-xl">{title}</h3>
              <p className="mt-3 text-[0.95rem] t-muted">{text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold t-primary">
                Подробнее <ArrowRight size={15} />
              </span>
            </article>
          ))}
        </div>
      </Section>

      {/* approach */}
      <Section className="t-border-t">
        <div className="grid items-center gap-12 @4xl:grid-cols-2 @4xl:gap-16">
          <Media variant="grid" seed={2} radius="card-lg" className="aspect-4/3 w-full" />
          <div>
            <Eyebrow>Как мы работаем</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.5rem]">
              Без бесконечных презентаций — сразу к внедрению
            </h2>
            <p className="mt-5 t-muted">
              Первые изменения в процессах вы видите на третьей неделе. Всё остальное — итерации с
              измеримым результатом.
            </p>
            <ul className="mt-8 grid gap-4">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                    style={{ background: 'var(--tp-primary-tint)' }}
                  >
                    <Check size={14} className="t-primary" />
                  </span>
                  <span className="text-[0.98rem]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* stats band */}
      <div className="t-inverse">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-16 @2xl:px-10 @2xl:grid-cols-2 @4xl:grid-cols-4">
          {[
            ['12', 'отраслей в портфеле'],
            ['86%', 'клиентов возвращаются'],
            ['4 нед', 'до первых результатов'],
            ['24', 'консультанта в команде'],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="t-head text-4xl @2xl:text-5xl">{value}</div>
              <div className="mt-2 text-sm opacity-70">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* testimonial */}
      <Section>
        <div className="mx-auto max-w-[760px] text-center">
          <Stars value={5} size={18} />
          <blockquote className="t-head mt-6 text-[1.6rem] leading-snug @2xl:text-[2rem]">
            «За полгода мы перестали тушить пожары и начали планировать. Впервые вижу управленческую
            отчётность, которой доверяю.»
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Media variant="portrait" seed={5} radius="pill" className="h-12 w-12" />
            <div className="text-left">
              <div className="font-semibold">Игорь Ларин</div>
              <div className="text-sm t-muted">Владелец, ГК «Ресурс»</div>
            </div>
          </div>
        </div>
      </Section>

      {/* cta */}
      <Section pad="pb-20">
        <div
          className="t-r-card-lg relative overflow-hidden px-8 py-14 text-center @3xl:px-16"
          style={{
            backgroundImage: 'linear-gradient(120deg, var(--tp-primary), var(--tp-secondary))',
            color: 'var(--tp-on-primary)',
          }}
        >
          <h2 className="text-[2rem] @2xl:text-[2.6rem]">Начнём с бесплатной диагностики</h2>
          <p className="mx-auto mt-4 max-w-[52ch] opacity-85">
            60 минут разговора — и у вас на руках карта узких мест с приоритетами.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn size="lg" variant="inverse">
              Записаться на встречу
            </Btn>
            <Btn
              size="lg"
              variant="ghost"
              style={{ borderColor: 'currentColor', borderWidth: 1, color: 'inherit' }}
            >
              Скачать презентацию
            </Btn>
          </div>
        </div>
      </Section>

      {/* footer */}
      <footer className="t-border-t" style={{ background: 'var(--tp-surface)' }}>
        <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-14 @2xl:px-10 @3xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo name="Meridian" mark="M" />
            <p className="mt-4 max-w-[34ch] text-sm t-muted">
              Управленческий консалтинг. Москва, Пресненская наб. 12, офис 41.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Компания</div>
            <ul className="mt-4 grid gap-2.5 text-sm t-muted">
              {['О нас', 'Команда', 'Карьера', 'Публикации'].map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Контакты</div>
            <ul className="mt-4 grid gap-2.5 text-sm t-muted">
              <li>+7 900 000-00-00</li>
              <li>hello@meridian.ru</li>
              <li>Пн–Пт, 10:00–19:00</li>
            </ul>
          </div>
        </div>
        <div className="t-border-t">
          <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-3 px-6 py-6 text-xs t-faint @2xl:px-10">
            <span>© 2026 Meridian Consulting</span>
            <span>Политика конфиденциальности</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const business: TemplateDefinition = {
  id: 'business',
  name: 'Meridian',
  category: 'Бизнес',
  description:
    'Корпоративный сайт консалтинговой компании: строгая сетка, акцент на цифрах и доверии.',
  tags: ['бизнес', 'консалтинг', 'корпоративный', 'b2b'],
  defaults: {
    primary: '#1d4ed8',
    secondary: '#38bdf8',
    button: '#1d4ed8',
    background: '#ffffff',
    text: '#0d1526',
    buttonShape: 'soft',
    font: 'inter',
    cardRadius: 14,
  },
  Component: BusinessSite,
};
