import { ArrowUpRight, Mail } from 'lucide-react';
import type { TemplateDefinition } from '../types';
import { Btn, Media } from './ui';

const NAV = ['Работы', 'О себе', 'Услуги', 'Контакты'];

const WORKS = [
  { title: 'Ferra — фирменный стиль', year: '2026', kind: 'Брендинг', variant: 'mesh' as const },
  { title: 'Nord Coffee — упаковка', year: '2025', kind: 'Упаковка', variant: 'rings' as const },
  { title: 'Atlas — сайт и айдентика', year: '2025', kind: 'Digital', variant: 'grid' as const },
  { title: 'Studio Lume — журнал', year: '2024', kind: 'Печать', variant: 'stripes' as const },
];

const SERVICES = [
  ['Айдентика', 'Логотип, палитра, типографика, гайдлайн'],
  ['Упаковка', 'Дизайн, дизайн-макеты, подготовка в печать'],
  ['Сайты', 'Прототип, дизайн, передача в разработку'],
  ['Арт-дирекшн', 'Съёмки, иллюстрации, сопровождение'],
];

function PortfolioSite() {
  return (
    <div className="tpl">
      <div className="@4xl:grid @4xl:grid-cols-[300px_minmax(0,1fr)]">
        {/* sidebar */}
        <aside className="t-border-b @4xl:border-b-0 @4xl:[border-right:1px_solid_var(--tp-border)]">
          <div className="flex h-full flex-col justify-between px-6 py-10 @2xl:px-10">
            <div>
              <div className="t-head text-2xl leading-tight">
                Марина
                <br />
                Гущина
              </div>
              <div className="mt-3 text-sm t-muted">Графический дизайнер · Тбилиси</div>

              <nav className="mt-12 grid gap-3 text-sm">
                {NAV.map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    <span className="t-faint font-mono text-xs">0{i + 1}</span>
                    <span>{item}</span>
                  </span>
                ))}
              </nav>
            </div>

            <div className="mt-12 grid gap-3 text-sm t-muted @4xl:mt-0">
              <span className="t-chip self-start">Открыта к проектам</span>
              <span>hello@gushina.design</span>
              <span>Telegram · Behance · Instagram</span>
            </div>
          </div>
        </aside>

        {/* content */}
        <main>
          <section className="px-6 py-16 @2xl:px-14 @2xl:py-24">
            <h1 className="max-w-[20ch] text-[2.8rem] leading-[1.02] @2xl:text-[4rem] @5xl:text-[4.8rem]">
              Делаю бренды, которые не стыдно увеличить
            </h1>
            <p className="mt-8 max-w-[54ch] text-[1.05rem] t-muted">
              Восемь лет в графическом дизайне. Работаю с производителями еды, культурными
              институциями и небольшими технологическими командами.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Btn size="lg">
                <Mail size={16} /> Написать
              </Btn>
              <Btn size="lg" variant="outline">
                Резюме · PDF
              </Btn>
            </div>
          </section>

          {/* works — full-width rows */}
          <section className="t-border-t">
            {WORKS.map((work, i) => (
              <article
                key={work.title}
                className={`grid gap-6 px-6 py-8 @2xl:px-14 @3xl:grid-cols-[minmax(0,1fr)_260px] @3xl:items-center ${
                  i > 0 ? 't-border-t' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 text-xs tracking-widest uppercase t-faint">
                    <span>{work.kind}</span>
                    <span>·</span>
                    <span>{work.year}</span>
                  </div>
                  <h2 className="mt-3 flex items-center gap-3 text-[1.7rem] @2xl:text-[2.3rem]">
                    {work.title}
                    <ArrowUpRight size={22} className="t-primary shrink-0" />
                  </h2>
                </div>
                <Media variant={work.variant} seed={i} className="aspect-16/10 w-full" />
              </article>
            ))}
          </section>

          {/* about */}
          <section className="t-border-t t-surface px-6 py-16 @2xl:px-14 @2xl:py-24">
            <div className="grid gap-12 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Как я работаю</h2>
                <p className="mt-6 t-muted">
                  Начинаю с исследования и разговоров с командой, а не с мудборда. Дальше — язык
                  бренда, система и носители. Обычно проект занимает четыре–восемь недель.
                </p>
              </div>
              <dl className="grid gap-6">
                {[
                  ['01', 'Погружение', 'Интервью, аудит рынка, позиционирование'],
                  ['02', 'Концепция', 'Два–три направления, обсуждение, выбор'],
                  ['03', 'Система', 'Носители, гайдлайн, передача файлов'],
                ].map(([num, title, text]) => (
                  <div key={num} className="t-border-b flex gap-5 pb-5">
                    <dt className="t-head t-primary text-lg">{num}</dt>
                    <dd>
                      <div className="font-semibold">{title}</div>
                      <div className="mt-1 text-sm t-muted">{text}</div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* services */}
          <section className="t-border-t px-6 py-16 @2xl:px-14 @2xl:py-24">
            <h2 className="text-[1.9rem] @2xl:text-[2.4rem]">Услуги</h2>
            <div className="mt-10 grid gap-5 @2xl:grid-cols-2">
              {SERVICES.map(([title, text]) => (
                <div key={title} className="t-card p-7">
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-2 text-sm t-muted">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* contact */}
          <section className="t-border-t px-6 py-16 @2xl:px-14 @2xl:py-24">
            <h2 className="max-w-[24ch] text-[2.2rem] @2xl:text-[3.2rem]">
              Расскажите о проекте — отвечу в течение дня
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn size="lg">hello@gushina.design</Btn>
              <Btn size="lg" variant="outline">
                Telegram
              </Btn>
            </div>
            <div className="mt-16 flex flex-wrap justify-between gap-4 text-xs t-faint">
              <span>© 2026 Марина Гущина</span>
              <span>Тбилиси · работаю удалённо</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export const portfolio: TemplateDefinition = {
  id: 'portfolio',
  name: 'Studio Noir',
  category: 'Портфолио',
  description:
    'Портфолио дизайнера с фиксированной боковой панелью и работами в виде крупных строк.',
  tags: ['портфолио', 'дизайнер', 'фриланс', 'личный сайт', 'резюме'],
  defaults: {
    primary: '#f4f4f5',
    secondary: '#a1a1aa',
    button: '#f4f4f5',
    background: '#0b0b0d',
    text: '#f4f4f5',
    buttonShape: 'sharp',
    font: 'mono',
    cardRadius: 0,
  },
  Component: PortfolioSite,
};
