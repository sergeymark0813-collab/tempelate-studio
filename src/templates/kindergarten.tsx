import { Apple, BookOpen, Clock, Heart, Palette, Shield, type LucideIcon } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media, Section } from './ui';

/** The day plan is the block parents actually read first. */
const DAY = [
  ['07:30', 'Приём детей', 'Встречаем, измеряем температуру, свободная игра'],
  ['09:00', 'Завтрак', 'Каша, омлет или запеканка, фрукты'],
  ['09:40', 'Развивающие занятия', 'Логика, речь, счёт — по подгруппам до 8 детей'],
  ['11:00', 'Прогулка', 'Своя огороженная площадка, гуляем в любую погоду'],
  ['12:30', 'Обед', 'Суп, второе, компот из своей кухни'],
  ['13:00', 'Тихий час', 'Отдельная спальня, ортопедические матрасы'],
  ['15:30', 'Полдник и творчество', 'Рисование, лепка, музыка'],
  ['17:00', 'Свободная игра', 'Родители забирают до 19:00'],
];

const GROUPS = [
  ['Ясли', '1,5–3 года', '8 детей', '2 педагога + нянечка', '38 000 ₽/мес'],
  ['Младшая', '3–4,5 года', '12 детей', '2 педагога', '34 000 ₽/мес'],
  ['Подготовительная', '4,5–7 лет', '12 детей', '2 педагога + логопед', '36 000 ₽/мес'],
];

const CARE: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Apple, title: 'Своя кухня', text: 'Готовим на месте, меню на неделю в родительском чате' },
  { icon: Shield, title: 'Безопасность', text: 'Видеонаблюдение, домофон, доступ только по списку' },
  { icon: BookOpen, title: 'Подготовка к школе', text: 'Читаем и считаем к 6 годам без давления' },
  { icon: Palette, title: 'Творчество каждый день', text: 'Музыка, лепка, театр — включено в стоимость' },
];

const TEACHERS = [
  ['Елена Пахомова', 'Заведующая, 22 года', 'Педагог дошкольного образования'],
  ['Ольга Ким', 'Воспитатель ясельной', '11 лет, курс раннего развития'],
  ['Анна Дрозд', 'Логопед-дефектолог', '9 лет, индивидуальные занятия'],
  ['Мария Стеценко', 'Музыка и театр', '14 лет, консерватория'],
];

function KindergartenSite() {
  return (
    <div className="tpl">
      <header className="t-border-b">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 @2xl:px-10">
          <span className="flex items-center gap-2.5">
            <span
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }}
            >
              <Heart size={19} fill="currentColor" />
            </span>
            <span className="t-head text-xl">Апельсин</span>
          </span>
          <nav className="hidden gap-7 text-sm t-muted @4xl:flex">
            {['Режим дня', 'Группы', 'Питание', 'Педагоги', 'Экскурсия'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <Btn size="sm">Записаться на экскурсию</Btn>
        </div>
      </header>

      {/* soft centred hero */}
      <div style={{ background: 'var(--tp-secondary-tint)' }}>
        <Section pad="py-14 @2xl:py-20" inner="max-w-[1180px]">
          <div className="mx-auto max-w-[720px] text-center">
            <span className="t-chip">Частный детский сад · лицензия · Москва, Раменки</span>
            <h1 className="mt-6 text-[2.3rem] leading-[1.06] @2xl:text-[3.4rem]">
              Садик, из которого не хочется уходить в шесть вечера
            </h1>
            <p className="mx-auto mt-6 max-w-[50ch] text-[1.05rem] t-muted">
              Группы до 12 детей, своя кухня и площадка во дворе. Работаем с 07:30 до 19:00 — успеете
              и на работу, и обратно.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn size="lg">Прийти на экскурсию</Btn>
              <Btn size="lg" variant="outline">
                Посмотреть режим дня
              </Btn>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 @3xl:grid-cols-4">
            {(['mesh', 'dots', 'rings', 'stripes'] as const).map((v, i) => (
              <Media key={v} variant={v} seed={i + 1} radius="card-lg" className="aspect-square w-full" />
            ))}
          </div>
        </Section>
      </div>

      {/* day plan — vertical timeline with times */}
      <Section inner="max-w-[1180px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] @4xl:gap-14">
          <div>
            <div className="t-eyebrow">Режим дня</div>
            <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">Как проходит день</h2>
            <p className="mt-5 t-muted">
              Расписание одинаковое каждый день — детям так спокойнее. Родителям присылаем фото с
              прогулки и занятий.
            </p>
            <div className="t-card mt-8 flex items-center gap-4 p-5">
              <Clock size={22} className="t-primary shrink-0" strokeWidth={1.6} />
              <div className="text-sm">
                <div className="font-semibold">07:30 – 19:00</div>
                <div className="mt-1 t-muted">Есть неполный день до 13:00</div>
              </div>
            </div>
          </div>

          <ol className="relative">
            <span
              className="absolute top-3 bottom-3 left-[42px] w-px"
              style={{ background: 'var(--tp-border)' }}
              aria-hidden
            />
            {DAY.map(([time, title, text]) => (
              <li key={time} className="relative flex gap-5 pb-7 last:pb-0">
                <span className="t-head w-[34px] shrink-0 pt-0.5 text-sm t-primary">{time}</span>
                <span
                  className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full"
                  style={{ background: 'var(--tp-primary)', border: '3px solid var(--tp-bg)' }}
                />
                <div>
                  <h3 className="text-[1.1rem]">{title}</h3>
                  <p className="mt-1 text-[0.95rem] t-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* groups */}
      <div className="t-border-t t-border-b t-surface">
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Группы</h2>
          <div className="mt-10 grid gap-6 @2xl:grid-cols-3">
            {GROUPS.map(([name, age, size, staff, price], i) => (
              <article
                key={name}
                className="t-card flex flex-col overflow-hidden"
                style={{ background: 'var(--tp-bg)' }}
              >
                <Media variant={i === 1 ? 'dots' : 'mesh'} seed={i + 6} radius="none" className="aspect-16/10 w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.3rem]">{name}</h3>
                  <div className="mt-1 text-sm t-primary font-semibold">{age}</div>
                  <div className="mt-4 grid flex-1 gap-2 text-sm t-muted">
                    <span>В группе: {size}</span>
                    <span>{staff}</span>
                  </div>
                  <div className="t-border-t mt-5 flex items-center justify-between gap-3 pt-5">
                    <span className="t-head text-lg">{price}</span>
                    <Btn size="sm" variant="soft">
                      Записаться
                    </Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>

      {/* care icons + menu of the day */}
      <Section inner="max-w-[1180px]">
        <div className="grid gap-10 @4xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] @4xl:gap-14">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Что входит в стоимость</h2>
            <div className="mt-8 grid gap-7 @xl:grid-cols-2">
              {CARE.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                    style={{ background: 'var(--tp-primary-tint)', color: 'var(--tp-primary)' }}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem]">{title}</h3>
                    <p className="mt-1.5 text-sm t-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="t-card p-7">
            <div className="flex items-center gap-2 text-sm font-semibold t-primary">
              <Apple size={16} /> Меню на сегодня
            </div>
            <div className="mt-5 grid gap-4">
              {[
                ['Завтрак', 'Овсяная каша с яблоком, какао'],
                ['Второй завтрак', 'Банан, детское печенье'],
                ['Обед', 'Суп-пюре из тыквы, индейка с рисом, компот'],
                ['Полдник', 'Творожная запеканка, кисель'],
              ].map(([meal, food]) => (
                <div key={meal} className="t-border-b pb-4">
                  <div className="text-xs tracking-wide uppercase t-faint">{meal}</div>
                  <div className="mt-1 text-[0.98rem]">{food}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm t-muted">
              Учитываем аллергии — приносите справку, повар сделает замену.
            </p>
          </div>
        </div>
      </Section>

      {/* teachers */}
      <div className="t-border-t t-border-b" style={{ background: 'var(--tp-primary-tint)' }}>
        <Section inner="max-w-[1180px]">
          <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Педагоги</h2>
          <div className="mt-10 grid gap-6 @xl:grid-cols-2 @4xl:grid-cols-4">
            {TEACHERS.map(([name, role, exp], i) => (
              <div key={name} className="text-center">
                <Media
                  variant="portrait"
                  seed={i + 12}
                  radius="pill"
                  className="mx-auto aspect-square w-full max-w-[170px]"
                />
                <h3 className="mt-5 text-[1.05rem]">{name}</h3>
                <div className="mt-1 text-sm t-primary">{role}</div>
                <div className="mt-1 text-sm t-muted">{exp}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* tour form */}
      <Section inner="max-w-[1180px]">
        <div className="t-card grid gap-8 p-8 @2xl:p-10 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @4xl:items-center @4xl:gap-14">
          <div>
            <h2 className="text-[1.8rem] @2xl:text-[2.3rem]">Приходите знакомиться</h2>
            <p className="mt-4 t-muted">
              Экскурсия занимает 40 минут: покажем группы, кухню и площадку, познакомим с
              воспитателями. Можно с ребёнком.
            </p>
            <p className="mt-4 text-sm t-faint">Свободные места: ясли — 2, младшая — 4.</p>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            <input className="t-input" placeholder="Ваше имя" />
            <input className="t-input" placeholder="Телефон" />
            <input className="t-input" placeholder="Возраст ребёнка" />
            <select className="t-input">
              <option>Группа: ясли</option>
              <option>Группа: младшая</option>
              <option>Группа: подготовительная</option>
            </select>
            <Btn size="lg" className="@xl:col-span-2">
              Записаться на экскурсию
            </Btn>
          </div>
        </div>
      </Section>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-12 @2xl:px-10 @3xl:grid-cols-3">
          <div>
            <span className="t-head text-lg">Апельсин</span>
            <p className="mt-3 text-sm t-muted">
              Частный детский сад в Раменках. Лицензия №Л035-00000-77/00000000.
            </p>
          </div>
          <div className="text-sm t-muted">
            <div>ул. Мосфильмовская 21, к. 2</div>
            <div className="mt-2">Пн–Пт 07:30–19:00</div>
          </div>
          <div className="text-sm t-muted">
            <div>+7 900 000-00-00</div>
            <div className="mt-1">hello@apelsin-sad.ru</div>
            <div className="mt-4 t-faint">© 2026 Детский сад «Апельсин»</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const kindergarten: TemplateDefinition = {
  id: 'kindergarten',
  name: 'Апельсин',
  category: 'Детский сад',
  description:
    'Сайт частного садика: режим дня таймлайном по часам, группы по возрастам, меню на сегодня.',
  tags: ['детский сад', 'дети', 'ясли', 'развитие', 'няня', 'дошкольное'],
  defaults: {
    primary: '#f59e0b',
    secondary: '#38bdf8',
    button: '#f59e0b',
    background: '#fffbf0',
    text: '#3a2410',
    buttonShape: 'pill',
    font: 'golos',
    cardRadius: 28,
  },
  Component: KindergartenSite,
};
