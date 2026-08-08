import { Briefcase, Search, ShieldCheck, Target, Users, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

const OPEN_ROLES = [
  ['Backend-разработчик', 'Fintech · Москва', '12 дней в работе'],
  ['Руководитель отдела продаж', 'Ритейл · Казань', '4 дня в работе'],
  ['Технолог пищевого производства', 'FMCG · Тула', 'финальный этап'],
  ['Главный бухгалтер', 'Логистика · Москва', '2 дня в работе'],
];

const SERVICES: { icon: LucideIcon; name: string; price: string; time: string; text: string }[] = [
  {
    icon: Users,
    name: 'Массовый подбор',
    price: '1 оклад за 5 человек',
    time: '5–10 дней',
    text: 'Линейный персонал: склад, производство, розница, поддержка. Закрываем потоком.',
  },
  {
    icon: Search,
    name: 'Специалисты',
    price: '1,5 оклада',
    time: '2–4 недели',
    text: 'ИТ, финансы, продажи, инженеры. Ищем в рынке, а не только среди откликов.',
  },
  {
    icon: Target,
    name: 'Executive search',
    price: '2,5 оклада',
    time: '4–8 недель',
    text: 'Топ-менеджеры и руководители направлений. Конфиденциальный поиск с аналитикой рынка.',
  },
];

const STEPS = [
  ['Брифинг', 'Полтора часа с нанимающим менеджером: разбираем задачу, а не читаем вакансию'],
  ['Карта рынка', 'Показываем, сколько таких людей есть и сколько они реально стоят'],
  ['Поиск', 'Прямой поиск, база 140 000 контактов, рекомендации из отрасли'],
  ['Отбор', 'Интервью по компетенциям, проверка кейсов, отчёт на каждого'],
  ['Выход', 'Сопровождаем оффер и первые три месяца адаптации'],
];

const INDUSTRIES = ['ИТ и телеком', 'Ритейл', 'Производство', 'Логистика', 'Финансы', 'Медицина', 'Строительство', 'HoReCa'];

const CASES = [
  ['Технический директор', 'Производство, 900 человек', '31 день', 'Вышел, работает 2 года'],
  ['12 операторов линии', 'Пищевое производство', '9 дней', 'Все прошли испытательный'],
  ['Head of Product', 'Финтех-стартап', '44 дня', 'Закрыли после отказа двух агентств'],
  ['Руководитель филиала', 'Логистика, Екатеринбург', '26 дней', 'Выручка +18% за год'],
];

function RecruitingSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <Briefcase size={21} className="t-primary" strokeWidth={1.7} />
            <span className="t-head text-xl">Профиль</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Услуги', 'Как работаем', 'Отрасли', 'Кейсы', 'Контакты'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Обсудить вакансию</Btn>
        </div>
      </header>

      {/* hero with an "in progress" board */}
      <Section pad="py-14 @2xl:py-20" inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <span className="t-chip">Кадровое агентство · 11 лет на рынке</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.3rem]">
              Находим людей, которые остаются работать
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] t-muted">
              Гарантия замены 6 месяцев: если сотрудник уходит, ищем нового бесплатно. За прошлый год
              заменять пришлось в 4% случаев.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn size="lg">Оставить вакансию</Btn>
              <Btn size="lg" variant="outline">
                Условия работы
              </Btn>
            </div>
            <div className="mt-10 grid gap-6 @xl:grid-cols-3">
              {[
                ['24 дня', 'средний срок закрытия'],
                ['96%', 'проходят испытательный'],
                ['140 тыс.', 'контактов в базе'],
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
              <span className="t-head text-lg">Вакансии в работе</span>
              <span className="text-xs font-semibold t-primary">сейчас 17</span>
            </div>
            <div className="mt-5 grid gap-2.5">
              {OPEN_ROLES.map(([role, meta, status]) => (
                <div
                  key={role}
                  className="t-r-card-sm px-4 py-3"
                  style={{ background: 'var(--tp-surface-2)' }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold">{role}</span>
                    <span className="text-xs t-primary">{status}</span>
                  </div>
                  <div className="mt-0.5 text-xs t-muted">{meta}</div>
                </div>
              ))}
            </div>
            <div className="t-border-t mt-6 flex items-center justify-between gap-3 pt-5">
              <span className="text-sm t-muted">Берём не больше 20 вакансий одновременно</span>
              <Btn size="sm" variant="soft">
                Все
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* services */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Услуги и стоимость</h2>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {SERVICES.map(({ icon: Icon, name, price, time, text }, i) => (
              <article
                key={name}
                className="t-card flex flex-col p-7"
                style={{
                  background: 'var(--tp-bg)',
                  ...(i === 1 ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' } : null),
                }}
              >
                <Icon size={24} className="t-primary" strokeWidth={1.6} />
                <h3 className="mt-5 text-[1.3rem]">{name}</h3>
                <div className="t-head mt-3 text-xl t-primary">{price}</div>
                <div className="mt-1 text-sm t-muted">Срок: {time}</div>
                <p className="mt-4 flex-1 text-sm t-muted">{text}</p>
                <Btn className="mt-6 w-full" variant={i === 1 ? 'solid' : 'outline'} size="sm">
                  Обсудить
                </Btn>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm t-faint">
            Оплата после выхода сотрудника на работу. Предоплату не берём.
          </p>
        </Section>
      </div>

      {/* process as a horizontal timeline */}
      <Section inner="max-w-[1200px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Как мы ищем</h2>
        <div className="relative mt-12">
          <span
            className="absolute top-4 right-0 left-0 hidden h-px @5xl:block"
            style={{ background: 'var(--tp-border)' }}
            aria-hidden
          />
          <div className="grid gap-8 @xl:grid-cols-2 @5xl:grid-cols-5">
            {STEPS.map(([title, text], i) => (
              <div key={title} className="relative">
                <span
                  className="relative z-10 grid h-8 w-8 place-items-center rounded-full text-sm font-bold"
                  style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[1.1rem]">{title}</h3>
                <p className="mt-2 text-sm t-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* guarantee band */}
      <div className="t-bg-primary">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-14 @2xl:px-10 @4xl:grid-cols-[auto_minmax(0,1fr)_auto] @4xl:items-center">
          <ShieldCheck size={34} strokeWidth={1.5} className="opacity-80" />
          <div>
            <h2 className="text-[1.6rem] @2xl:text-[2rem]">Гарантия замены 6 месяцев</h2>
            <p className="mt-3 max-w-[60ch] opacity-85">
              Если сотрудник уходит или не подошёл — ищем замену бесплатно и в том же приоритете.
              Условие прописано в договоре, а не «на словах».
            </p>
          </div>
          <Btn size="lg" variant="inverse">
            Прочитать договор
          </Btn>
        </div>
      </div>

      {/* industries as chips */}
      <Section inner="max-w-[1200px]">
        <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Отрасли</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="t-r-btn px-4 py-2.5 text-sm font-semibold"
              style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
            >
              {industry}
            </span>
          ))}
        </div>
      </Section>

      {/* cases table */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1200px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Закрытые вакансии</h2>
          <div className="mt-10">
            <div className="hidden pb-4 text-xs tracking-[0.14em] uppercase t-faint @3xl:grid @3xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_120px_minmax(0,0.9fr)] @3xl:gap-6">
              <span>Позиция</span>
              <span>Компания</span>
              <span>Срок</span>
              <span>Результат</span>
            </div>
            {CASES.map(([role, company, days, result]) => (
              <div
                key={role}
                className="t-border-t grid gap-1.5 py-5 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_120px_minmax(0,0.9fr)] @3xl:items-center @3xl:gap-6"
              >
                <span className="font-semibold">{role}</span>
                <span className="text-sm t-muted">{company}</span>
                <span className="t-head text-lg t-primary">{days}</span>
                <span className="text-sm t-muted">{result}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* request */}
      <Section inner="max-w-[1200px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Оставьте вакансию</h2>
            <p className="mt-5 t-muted">
              В ответ пришлём карту рынка: сколько кандидатов есть, за какие деньги они выходят и за
              какой срок реально закрыть позицию. Бесплатно и без договора.
            </p>
            <Media variant="mesh" seed={3} className="mt-8 aspect-16/9 w-full" />
          </div>
          <div className="t-card grid gap-3 p-7">
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Имя" />
              <input className="t-input" placeholder="Компания" />
            </div>
            <div className="grid gap-3 @xl:grid-cols-2">
              <input className="t-input" placeholder="Телефон" />
              <input className="t-input" placeholder="E-mail" />
            </div>
            <input className="t-input" placeholder="Какая позиция" />
            <select className="t-input">
              <option>Тип подбора: специалисты</option>
              <option>Тип подбора: массовый</option>
              <option>Тип подбора: executive search</option>
            </select>
            <Btn size="lg" className="w-full">
              Получить карту рынка
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Профиль</span>
            <p className="mt-3 text-sm opacity-70">
              Кадровое агентство. Подбор персонала по России с 2015 года.
            </p>
          </div>
          <div className="text-sm opacity-80">
            <div>Москва, Земляной Вал 9</div>
            <div className="mt-2">Пн–Пт 09:00–19:00</div>
          </div>
          <div className="text-sm opacity-80">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">hr@profil-agency.ru</div>
            <div className="mt-4 opacity-70">© 2026 Агентство «Профиль»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const recruiting: TemplateDefinition = {
  id: 'recruiting',
  name: 'Профиль',
  category: 'Кадровое агентство',
  description:
    'B2B-сайт агентства по подбору: доска вакансий в работе, этапы поиска лентой, закрытые позиции таблицей.',
  tags: ['подбор', 'персонал', 'hr', 'кадровое агентство', 'вакансии', 'рекрутинг'],
  defaults: {
    primary: '#0f766e',
    secondary: '#94a3b8',
    button: '#0f766e',
    background: '#f8fafa',
    text: '#0d1f1e',
    buttonShape: 'soft',
    font: 'inter',
    cardRadius: 12,
  },
  Component: RecruitingSite,
};
