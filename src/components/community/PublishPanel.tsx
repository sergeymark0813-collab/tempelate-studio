import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Globe, Users } from 'lucide-react';
import type { Project } from '../../lib/studio/types';
import { community } from '../../lib/community/store';
import { cn } from '../../lib/cn';

/* ===========================================================================
   Publishing a generated design to the community.

   The description is required and enforced twice: the button stays disabled
   without one, and the store refuses the write regardless. It is stored with
   the project, so the gallery shows the author's own words rather than a
   machine-written summary.
   =========================================================================== */

const ERRORS: Record<string, string> = {
  'description-required': 'Добавьте описание перед публикацией.',
  'title-required': 'Укажите название проекта.',
  'too-large': 'Проект слишком большой для публикации — уменьшите или уберите загруженные изображения.',
  'storage-failed': 'Не удалось сохранить: браузер отказал в записи. Возможно, закончилось место или включён приватный режим.',
};

export default function PublishPanel({ project }: { project: Project }) {
  const [title, setTitle] = useState(project.name);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const user = community.currentUser();
  const missingDescription = description.trim().length === 0;

  const publish = () => {
    setTouched(true);
    const result = community.publish({ title, description, project });

    if (!result.ok) {
      setError(ERRORS[result.error] ?? 'Не удалось опубликовать проект.');
      return;
    }
    setError('');
    setPublishedId(result.id);
  };

  if (publishedId) {
    return (
      <section className="panel px-5 py-6 sm:px-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-300" />
          <div>
            <h2 className="font-display text-[15px] font-semibold tracking-tight">
              Проект опубликован
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">
              Он появился в разделе «Сообщество» — другие смогут открыть его, прочитать ваше
              описание и поставить оценку.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to={`/community/${publishedId}`}
                className="focus-ring rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600"
              >
                Открыть проект
              </Link>
              <Link
                to="/community"
                className="focus-ring rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white/65 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
              >
                Все работы
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel overflow-hidden">
      <header className="flex items-start gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/6 text-brand-400 ring-1 ring-white/10">
          <Globe size={16} />
        </span>
        <div>
          <h2 className="font-display text-[15px] font-semibold tracking-tight">
            Опубликовать в сообществе
          </h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white/40">
            Работа появится в общей галерее вместе с вашим описанием и станет доступна для оценок.
          </p>
        </div>
      </header>

      <div className="grid gap-4 px-5 py-5 sm:px-6">
        <label className="block">
          <span className="text-[13px] font-medium text-white/80">Название</span>
          <input
            value={title}
            maxLength={80}
            onChange={(event) => setTitle(event.target.value)}
            className="focus-ring mt-2 w-full rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-sm text-white ring-1 ring-white/10 outline-none transition hover:ring-white/20 focus:ring-brand-400/60"
          />
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between">
            <span className="text-[13px] font-medium text-white/80">
              Описание <span className="text-rose-300">*</span>
            </span>
            <span className="font-mono text-[11px] text-white/25">{description.length}/600</span>
          </span>
          <span className="mt-0.5 block text-xs text-white/35">
            Расскажите, что это за проект и для кого он. Без описания опубликовать нельзя.
          </span>
          <textarea
            value={description}
            rows={4}
            maxLength={600}
            onBlur={() => setTouched(true)}
            onChange={(event) => {
              setDescription(event.target.value);
              if (error) setError('');
            }}
            placeholder="Например: лендинг для семейной пекарни. Тёплая палитра, крупные фотографии продукции, упор на онлайн-заказ."
            className={cn(
              'focus-ring mt-2 w-full resize-none rounded-xl bg-white/[0.05] px-3.5 py-3 text-sm leading-relaxed text-white ring-1 outline-none transition placeholder:text-white/25',
              touched && missingDescription
                ? 'ring-rose-400/60'
                : 'ring-white/10 hover:ring-white/20 focus:ring-brand-400/60',
            )}
          />
        </label>

        {touched && missingDescription && !error && (
          <p className="rounded-xl bg-rose-500/10 px-3.5 py-2.5 text-[13px] text-rose-200 ring-1 ring-rose-400/25">
            {ERRORS['description-required']}
          </p>
        )}
        {error && (
          <p className="rounded-xl bg-rose-500/10 px-3.5 py-2.5 text-[13px] text-rose-200 ring-1 ring-rose-400/25">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[12.5px] text-white/40">
            <Users size={14} />
            Автор: <span className="text-white/70">{user.name}</span>
          </span>

          <button
            type="button"
            onClick={publish}
            disabled={missingDescription}
            title={missingDescription ? ERRORS['description-required'] : undefined}
            className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-40"
          >
            <Globe size={15} /> Опубликовать
          </button>
        </div>

        <p className="text-[12px] leading-relaxed text-white/30">
          Аккаунтов и входа в проекте пока нет: работы и оценки хранятся в этом браузере и видны
          только на этом устройстве. Слой данных уже описан контрактом, поэтому подключение
          настоящего backend не потребует переделки интерфейса.
        </p>
      </div>
    </section>
  );
}
