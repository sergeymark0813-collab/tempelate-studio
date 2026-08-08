import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  Lock,
  Plug,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Logo, Media, Section, WindowMock } from './ui';

const FEATURES = [
  {
    icon: Workflow,
    title: 'Общие процессы',
    text: 'Задачи, статусы и согласования в одном месте — без переписок в трёх мессенджерах.',
  },
  {
    icon: BarChart3,
    title: 'Отчёты без Excel',
    text: 'Дашборды собираются сами. Выгрузка в CSV и по API — в один клик.',
  },
  {
    icon: Bell,
    title: 'Умные уведомления',
    text: 'Приходят только когда действительно нужно ваше решение.',
  },
  {
    icon: Lock,
    title: 'Права и аудит',
    text: 'Роли, журнал действий, SSO и двухфакторная аутентификация.',
  },
  {
    icon: Plug,
    title: '40+ интеграций',
    text: 'Почта, календарь, CRM, склад, 1С и вебхуки на любые события.',
  },
  {
    icon: Sparkles,
    title: 'Помощник',
    text: 'Подсказывает следующий шаг и сам заполняет рутинные поля.',
  },
];

const PLANS = [
  { name: 'Команда', price: '0', note: 'до 5 пользователей', perks: ['Задачи и проекты', 'Базовые отчёты', 'Почтовая поддержка'] },
  {
    name: 'Бизнес',
    price: '690',
    note: 'за пользователя в месяц',
    perks: ['Всё из «Команды»', 'Дашборды и API', 'Роли и права', 'Поддержка 24/7'],
    featured: true,
  },
  { name: 'Корпорация', price: 'Индивид.', note: 'от 100 пользователей', perks: ['SSO и SLA', 'Личный менеджер', 'Внедрение под ключ'] },
];

const FAQ = [
  ['Сколько занимает внедрение?', 'От трёх дней для команды до 20 человек. Данные переносим сами.'],
  ['Есть ли локальная установка?', 'Да, on-premise доступен на тарифе «Корпорация».'],
  ['Что с миграцией из Jira?', 'Импортируем проекты, задачи и комментарии без потерь.'],
  ['Можно оплатить по счёту?', 'Да, работаем с юрлицами, закрывающие документы в личном кабинете.'],
];

function SaasSite() {
  return (
    <div className="tpl">
      <header className="t-border-b" style={{ background: 'var(--tp-bg)' }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 @2xl:px-10">
          <Logo name="Flowdesk" mark="F" shape="btn" />
          <nav className="hidden items-center gap-7 text-sm t-muted @4xl:flex">
            {['Возможности', 'Интеграции', 'Тарифы', 'Документация'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Btn size="sm" variant="ghost">
              Войти
            </Btn>
            <Btn size="sm">Попробовать</Btn>
          </div>
        </div>
      </header>

      {/* hero */}
      <Section pad="pt-16 pb-0 @2xl:pt-24">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="t-chip">Новое: помощник в отчётах</span>
          <h1 className="mt-6 text-[2.7rem] @2xl:text-[3.8rem] @5xl:text-[4.4rem]">
            Один рабочий стол вместо восьми вкладок
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-[1.08rem] t-muted">
            Flowdesk собирает задачи, документы и отчёты команды в одном окне. Внедрение за три дня,
            без миграции на новые процессы.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Btn size="lg">
              14 дней бесплатно <ArrowRight size={17} />
            </Btn>
            <Btn size="lg" variant="outline">
              Смотреть демо
            </Btn>
          </div>
          <p className="mt-5 text-xs t-faint">Без карты · отмена в один клик</p>
        </div>

        {/* product mock */}
        <div className="mt-14">
          <WindowMock>
            <div className="grid @3xl:grid-cols-[210px_minmax(0,1fr)]">
              <div
                className="hidden gap-2 p-5 @3xl:grid"
                style={{ background: 'var(--tp-surface-2)' }}
              >
                {['Обзор', 'Задачи', 'Отчёты', 'Команда', 'Настройки'].map((item, i) => (
                  <span
                    key={item}
                    className="t-r-card-sm px-3 py-2 text-sm"
                    style={
                      i === 0
                        ? { background: 'var(--tp-primary)', color: 'var(--tp-on-primary)' }
                        : { color: 'var(--tp-muted)' }
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="p-6 @2xl:p-8">
                <div className="grid gap-4 @xl:grid-cols-3">
                  {[
                    ['Активных задач', '128'],
                    ['В работе', '43'],
                    ['Просрочено', '6'],
                  ].map(([label, value]) => (
                    <div key={label} className="t-card p-5">
                      <div className="text-xs t-muted">{label}</div>
                      <div className="t-head mt-2 text-2xl">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="t-card mt-4 p-5">
                  <div className="flex items-end gap-2">
                    {[42, 58, 36, 72, 64, 88, 76, 96, 62, 80, 54, 92].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 t-r-card-sm"
                        style={{
                          height: h,
                          background: i % 3 === 0 ? 'var(--tp-secondary)' : 'var(--tp-primary-30)',
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  {['Согласовать бюджет Q3', 'Обновить регламент отдела', 'Собрать отчёт по складу'].map(
                    (task, i) => (
                      <div key={task} className="t-card flex items-center gap-3 px-4 py-3">
                        <span
                          className="grid h-5 w-5 place-items-center rounded-full"
                          style={{
                            background: i === 0 ? 'var(--tp-primary)' : 'var(--tp-surface-2)',
                            color: 'var(--tp-on-primary)',
                          }}
                        >
                          {i === 0 && <Check size={12} />}
                        </span>
                        <span className="text-sm">{task}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </WindowMock>
        </div>
      </Section>

      {/* features */}
      <Section>
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="text-[2rem] @2xl:text-[2.7rem]">Всё, что нужно команде</h2>
          <p className="mt-4 t-muted">
            И ничего лишнего: интерфейс не требует обучения и внедрения консультантов.
          </p>
        </div>
        <div className="mt-12 grid gap-6 @2xl:grid-cols-2 @4xl:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="t-card p-7">
              <span
                className="grid h-11 w-11 place-items-center t-r-btn"
                style={{ background: 'var(--tp-primary-tint)' }}
              >
                <Icon size={20} className="t-primary" />
              </span>
              <h3 className="mt-5 text-lg">{title}</h3>
              <p className="mt-2 text-sm t-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* integrations */}
      <div className="t-surface t-border-t t-border-b">
        <Section>
          <div className="grid items-center gap-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <div className="t-eyebrow">Интеграции</div>
              <h2 className="mt-4 text-[1.9rem] @2xl:text-[2.5rem]">
                Работает с тем, что у вас уже есть
              </h2>
              <p className="mt-5 t-muted">
                Подключение занимает минуты. Данные синхронизируются в обе стороны, история
                сохраняется.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Почта', 'Календарь', 'CRM', '1С', 'Склад', 'Telegram', 'Вебхуки', 'API'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="t-r-pill px-3.5 py-1.5 text-sm"
                      style={{ background: 'var(--tp-bg)', border: '1px solid var(--tp-border)' }}
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
            <Media variant="dots" seed={5} radius="card-lg" className="aspect-4/3 w-full" />
          </div>
        </Section>
      </div>

      {/* pricing */}
      <Section>
        <div className="text-center">
          <h2 className="text-[2rem] @2xl:text-[2.7rem]">Прозрачные тарифы</h2>
          <p className="mt-4 t-muted">Платите только за активных пользователей.</p>
        </div>
        <div className="mt-12 grid gap-6 @2xl:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="t-card flex flex-col p-8"
              style={
                plan.featured
                  ? { borderColor: 'var(--tp-primary)', boxShadow: 'var(--tp-glow)' }
                  : undefined
              }
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{plan.name}</span>
                {plan.featured && <span className="t-chip">Популярный</span>}
              </div>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="t-head text-4xl">{plan.price}</span>
                {plan.price !== 'Индивид.' && <span className="t-muted">₽</span>}
              </div>
              <div className="mt-1 text-sm t-faint">{plan.note}</div>
              <ul className="mt-7 grid flex-1 gap-3 text-sm">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <Check size={16} className="t-primary mt-0.5 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              <Btn className="mt-8 w-full" variant={plan.featured ? 'solid' : 'outline'}>
                Выбрать
              </Btn>
            </div>
          ))}
        </div>
      </Section>

      {/* faq */}
      <Section className="t-border-t">
        <div className="grid gap-10 @4xl:grid-cols-[340px_minmax(0,1fr)]">
          <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Частые вопросы</h2>
          <div>
            {FAQ.map(([q, a], i) => (
              <div key={q} className={`py-6 ${i > 0 ? 't-border-t' : ''}`}>
                <h3 className="text-[1.1rem]">{q}</h3>
                <p className="mt-2 text-[0.96rem] t-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* cta */}
      <div className="t-inverse">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 py-16 text-center @2xl:px-10 @4xl:flex-row @4xl:justify-between @4xl:text-left">
          <div>
            <h2 className="text-[1.9rem] @2xl:text-[2.5rem]">Попробуйте на своей команде</h2>
            <p className="mt-3 opacity-70">14 дней полного доступа. Поможем перенести данные.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Btn size="lg" variant="inverse">
              Создать аккаунт
            </Btn>
          </div>
        </div>
      </div>

      <footer className="t-border-t">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 @2xl:px-10 @3xl:grid-cols-4">
          <div>
            <Logo name="Flowdesk" mark="F" shape="btn" />
            <p className="mt-4 text-sm t-muted">Рабочее пространство для команд от 5 до 500.</p>
          </div>
          {[
            ['Продукт', ['Возможности', 'Интеграции', 'Тарифы', 'Обновления']],
            ['Ресурсы', ['Документация', 'API', 'Статус', 'Блог']],
            ['Компания', ['О нас', 'Вакансии', 'Контакты', 'Безопасность']],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="text-sm font-semibold">{title as string}</div>
              <ul className="mt-4 grid gap-2.5 text-sm t-muted">
                {(items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="t-border-t">
          <div className="mx-auto max-w-[1200px] px-6 py-6 text-xs t-faint @2xl:px-10">
            © 2026 Flowdesk · Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
}

export const saas: TemplateDefinition = {
  id: 'saas',
  name: 'Flowdesk',
  category: 'SaaS',
  description:
    'Продуктовый лендинг: макет интерфейса, сетка возможностей, тарифы и блок вопросов.',
  tags: ['saas', 'продукт', 'сервис', 'тарифы', 'приложение'],
  defaults: {
    primary: '#4f46e5',
    secondary: '#06b6d4',
    button: '#4f46e5',
    background: '#ffffff',
    text: '#0f1424',
    buttonShape: 'soft',
    font: 'inter',
    cardRadius: 16,
  },
  Component: SaasSite,
};
