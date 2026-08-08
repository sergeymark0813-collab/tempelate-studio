import { Award, BookOpen, Clock, GraduationCap, Users, Video } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Avatar, Btn, Eyebrow, Media, Section } from './ui';

const COURSES = [
  {
    title: 'Frontend-разработка',
    level: 'С нуля',
    weeks: '9 месяцев',
    price: '89 000 ₽',
    text: 'HTML, CSS, JavaScript, React и первое портфолио из четырёх проектов.',
  },
  {
    title: 'Аналитика данных',
    level: 'Средний',
    weeks: '6 месяцев',
    price: '74 000 ₽',
    text: 'SQL, Python, дашборды и защита исследования на реальных данных.',
  },
  {
    title: 'UX/UI-дизайн',
    level: 'С нуля',
    weeks: '7 месяцев',
    price: '78 000 ₽',
    text: 'Исследования, прототипы, дизайн-система и кейс для собеседования.',
  },
  {
    title: 'Тестирование ПО',
    level: 'С нуля',
    weeks: '5 месяцев',
    price: '62 000 ₽',
    text: 'Ручное и автоматизированное тестирование, работа с трекерами.',
  },
  {
    title: 'Управление проектами',
    level: 'Продвинутый',
    weeks: '4 месяца',
    price: '68 000 ₽',
    text: 'Scrum, оценка, риски и коммуникация со заказчиком.',
  },
  {
    title: 'Английский для IT',
    level: 'B1+',
    weeks: '3 месяца',
    price: '34 000 ₽',
    text: 'Собеседования, документация, переписка и созвоны с командой.',
  },
];

const PATH = [
  ['Вводный модуль', 'Разбираемся в профессии и настраиваем инструменты — 2 недели'],
  ['Практика с наставником', 'Код-ревью каждой работы, созвоны дважды в неделю'],
  ['Командный проект', 'Работа в группе из пяти человек по реальному брифу'],
  ['Карьерный трек', 'Резюме, портфолио, тренировочные собеседования'],
];

const FORMAT = [
  { icon: Video, label: 'Занятия в записи + живые разборы' },
  { icon: Users, label: 'Группы до 20 человек' },
  { icon: BookOpen, label: 'Доступ к материалам навсегда' },
  { icon: Award, label: 'Диплом и сертификат' },
];

const TEACHERS = [
  ['Илья Ковалёв', 'Frontend, Яндекс'],
  ['Нина Артемьева', 'Аналитика, Ozon'],
  ['Пётр Гаврилов', 'Дизайн, Авито'],
  ['Мария Лебедева', 'QA, Тинькофф'],
];

const FAQ = [
  ['Можно совмещать с работой?', 'Да, нагрузка 10–12 часов в неделю, все занятия в записи.'],
  ['Есть ли рассрочка?', 'Да, без процентов на 6, 12 или 24 месяца.'],
  ['Что если не получится?', 'Вернём деньги за неиспользованные месяцы по заявлению.'],
  ['Помогаете с работой?', 'Карьерный центр работает до трудоустройства, в среднем 2,5 месяца.'],
];

function EducationSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between px-6 py-5 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <span
              className="grid h-10 w-10 place-items-center t-r-card-sm"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              <GraduationCap size={20} />
            </span>
            <span className="t-head text-xl">Вектор</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Курсы', 'Преподаватели', 'Трудоустройство', 'Отзывы', 'Блог'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Btn size="sm" variant="ghost">
              Войти
            </Btn>
            <Btn size="sm">Подобрать курс</Btn>
          </div>
        </div>
      </header>

      {/* hero */}
      <Section pad="py-14 @2xl:py-20">
        <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] @4xl:items-center @4xl:gap-16">
          <div>
            <span className="t-chip">Набор на весенний поток открыт</span>
            <h1 className="mt-6 text-[2.5rem] leading-[1.05] @2xl:text-[3.4rem]">
              Образовательный центр для тех, кто меняет профессию
            </h1>
            <p className="mt-6 max-w-[50ch] t-muted">
              Шесть направлений, наставники из продуктовых команд и карьерный центр, который
              доводит до оффера.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">Записаться на курс</Btn>
              <Btn size="lg" variant="outline">
                Пробный урок бесплатно
              </Btn>
            </div>
            <div className="mt-10 grid gap-6 @xl:grid-cols-3">
              {[
                ['4 200', 'выпускников'],
                ['87%', 'нашли работу'],
                ['2,5 мес', 'средний поиск'],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="t-head text-2xl t-primary">{value}</div>
                  <div className="text-sm t-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <Media variant="dots" seed={2} radius="card-lg" className="aspect-4/3 w-full" />
        </div>
      </Section>

      {/* courses */}
      <div className="t-surface t-border-t t-border-b">
        <Section inner="max-w-[1220px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Программы</Eyebrow>
              <h2 className="mt-4 text-[2rem] @2xl:text-[2.6rem]">Шесть направлений</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {['Все', 'С нуля', 'Продвинутые', 'Короткие'].map((tab, i) => (
                <span
                  key={tab}
                  className="t-r-pill px-3.5 py-1.5"
                  style={
                    i === 0
                      ? { background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }
                      : { border: '1px solid var(--tp-border)', color: 'var(--tp-muted)' }
                  }
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 @2xl:grid-cols-2 @4xl:grid-cols-3">
            {COURSES.map((course) => (
              <article
                key={course.title}
                className="t-card flex flex-col p-7"
                style={{ background: 'var(--tp-bg)' }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="t-r-pill px-3 py-1 text-[11px] font-bold tracking-wide uppercase"
                    style={{ background: 'var(--tp-secondary)', color: 'var(--tp-on-secondary)' }}
                  >
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm t-muted">
                    <Clock size={14} /> {course.weeks}
                  </span>
                </div>
                <h3 className="mt-5 text-xl">{course.title}</h3>
                <p className="mt-3 flex-1 text-sm t-muted">{course.text}</p>
                <div className="t-border-t mt-6 flex items-center justify-between pt-5">
                  <span className="t-head text-lg">{course.price}</span>
                  <Btn size="sm" variant="soft">
                    Программа
                  </Btn>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* learning path */}
      <Section inner="max-w-[1220px]">
        <div className="grid gap-12 @4xl:grid-cols-[380px_minmax(0,1fr)] @4xl:gap-16">
          <div>
            <Eyebrow>Как проходит обучение</Eyebrow>
            <h2 className="mt-4 text-[2rem] @2xl:text-[2.5rem]">Путь студента</h2>
            <p className="mt-5 t-muted">
              Онлайн, но не в одиночку: наставник, куратор и группа сопровождают вас до защиты
              проекта.
            </p>
            <div className="mt-8 grid gap-4 text-sm">
              {FORMAT.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-3">
                  <Icon size={17} className="t-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <ol className="grid gap-5">
            {PATH.map(([title, text], i) => (
              <li key={title} className="t-card flex gap-5 p-6">
                <span
                  className="t-head grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg"
                  style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1.5 text-sm t-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* teachers */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1220px]">
          <h2 className="text-[2rem] @2xl:text-[2.6rem]">Преподаватели</h2>
          <div className="mt-10 grid gap-6 @xl:grid-cols-2 @4xl:grid-cols-4">
            {TEACHERS.map(([name, role]) => (
              <div
                key={name}
                className="t-card flex items-center gap-4 p-5"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Avatar name={name} size={48} />
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-sm t-muted">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* faq */}
      <Section inner="max-w-[1220px]">
        <h2 className="text-[2rem] @2xl:text-[2.6rem]">Частые вопросы</h2>
        <div className="mt-10 grid gap-6 @3xl:grid-cols-2">
          {FAQ.map(([q, a]) => (
            <div key={q} className="t-card p-7">
              <h3 className="text-[1.1rem]">{q}</h3>
              <p className="mt-2.5 text-sm t-muted">{a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* cta */}
      <Section inner="max-w-[1220px]" pad="pb-20">
        <div
          className="t-r-card-lg grid gap-8 p-8 @2xl:p-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center"
          style={{
            backgroundImage: 'linear-gradient(120deg, var(--tp-primary), var(--tp-secondary))',
            color: 'var(--tp-on-primary)',
          }}
        >
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Не знаете, что выбрать?</h2>
            <p className="mt-3 max-w-[46ch] opacity-85">
              Пройдите короткий тест — подберём направление под ваш опыт и цель по доходу.
            </p>
          </div>
          <div className="grid gap-3 @xl:grid-cols-[minmax(0,1fr)_auto]">
            <input className="t-input" placeholder="Ваш e-mail" />
            <Btn size="lg" variant="inverse">
              Подобрать курс
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-inverse">
        <div className="mx-auto grid max-w-[1220px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-4">
          <div>
            <div className="t-head text-lg">Вектор</div>
            <p className="mt-3 text-sm opacity-65">
              Образовательный центр. Лицензия № 041234 от 2019 года.
            </p>
          </div>
          {[
            ['Курсы', ['Frontend', 'Аналитика', 'Дизайн', 'Тестирование']],
            ['Студентам', ['Расписание', 'Рассрочка', 'Карьерный центр', 'Отзывы']],
            ['Контакты', ['+7 900 000-00-00', 'study@vektor.ru', 'Пн–Пт 10:00–20:00']],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="text-sm font-semibold">{title as string}</div>
              <ul className="mt-4 grid gap-2 text-sm opacity-70">
                {(items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[1220px] px-6 pb-8 text-xs opacity-50 @2xl:px-10">
          © 2026 Образовательный центр «Вектор»
        </div>
      </footer>
    </div>
  );
}

export const education: TemplateDefinition = {
  id: 'education',
  name: 'Вектор',
  category: 'Образование',
  description:
    'Сайт образовательного центра: каталог курсов, путь студента, преподаватели и вопросы.',
  tags: ['образование', 'курсы', 'школа', 'обучение', 'студенты'],
  defaults: {
    primary: '#4338ca',
    secondary: '#f59e0b',
    button: '#4338ca',
    background: '#f8f8fc',
    text: '#15162b',
    buttonShape: 'rounded',
    font: 'manrope',
    cardRadius: 18,
  },
  Component: EducationSite,
};
