import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Image as ImageIcon, Megaphone, Plus, Trash2 } from 'lucide-react';
import type { Ad, AdDraft, AdPlacement } from '../lib/ads/types';
import { AD_PLACEMENTS, STATUS_LABELS, placementInfo, statusOf } from '../lib/ads/types';
import { deleteAd, listAds, saveAd, subscribe, toLocalInput, toggleAd } from '../lib/ads/store';
import { cn } from '../lib/cn';
import TopBar from '../components/TopBar';

/** localStorage realistically holds a few MB; a big creative would blow the quota. */
const MAX_IMAGE_BYTES = 400 * 1024;

const emptyDraft = (): AdDraft => {
  const now = new Date();
  const week = new Date(now.getTime() + 7 * 24 * 3600 * 1000);
  return {
    title: '',
    text: '',
    image: '',
    url: '',
    cta: 'Перейти',
    placement: 'content',
    startAt: toLocalInput(now),
    endAt: toLocalInput(week),
    closeDelay: 15,
    enabled: true,
  };
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-white/80">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-white/35">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  'focus-ring w-full rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-sm text-white ring-1 ring-white/10 transition outline-none placeholder:text-white/25 hover:ring-white/20 focus:ring-brand-400/60';

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [draft, setDraft] = useState<AdDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [now, setNow] = useState(Date.now());

  const refresh = useCallback(() => setAds(listAds()), []);

  useEffect(() => {
    refresh();
    const unsubscribe = subscribe(refresh);
    // Keeps the status chips honest as campaigns start and end.
    const id = window.setInterval(() => setNow(Date.now()), 20_000);
    return () => {
      unsubscribe();
      window.clearInterval(id);
    };
  }, [refresh]);

  const set = <K extends keyof AdDraft>(key: K, value: AdDraft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const validation = useMemo(() => {
    if (!draft.title.trim()) return 'Укажите заголовок объявления.';
    if (draft.url && !/^https?:\/\//i.test(draft.url)) return 'Ссылка должна начинаться с http:// или https://';
    const start = Date.parse(draft.startAt);
    const end = Date.parse(draft.endAt);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return 'Укажите период показа.';
    if (end <= start) return 'Дата окончания должна быть позже даты начала.';
    return '';
  }, [draft]);

  const onImage = (file: File | undefined) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Нужен файл изображения.');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError(`Изображение больше ${Math.round(MAX_IMAGE_BYTES / 1024)} КБ. Сожмите его — хранилище браузера ограничено.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set('image', String(reader.result ?? ''));
    reader.onerror = () => setError('Не удалось прочитать файл.');
    reader.readAsDataURL(file);
  };

  const submit = () => {
    setError('');
    if (validation) {
      setError(validation);
      return;
    }
    const result = saveAd(draft, editingId ?? undefined);
    if (!result.ok) {
      setError(result.error ?? 'Не удалось сохранить объявление.');
      return;
    }
    setDraft(emptyDraft());
    setEditingId(null);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const startEdit = (ad: Ad) => {
    const { id: _id, createdAt: _createdAt, ...rest } = ad;
    setDraft(rest);
    setEditingId(ad.id);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-dvh">
      <TopBar
        className="sticky top-0"
        right={
          <Link
            to="/"
            className="focus-ring rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white/70 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
          >
            В студию
          </Link>
        }
      />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <header>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-xs font-medium text-white/65 ring-1 ring-white/10">
            <Megaphone size={13} className="text-accent-400" />
            Рекламный кабинет
          </span>
          <h1 className="font-display mt-5 text-[1.9rem] leading-tight font-bold tracking-tight sm:text-4xl">
            Размещение рекламы
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/50">
            Объявление появится в выбранном месте только внутри заданного периода и исчезнет
            автоматически, когда период закончится.
          </p>
        </header>

        {/* Honest about what this is. No fake backend, no fake payment. */}
        <div className="panel mt-6 flex items-start gap-3 px-5 py-4">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-300/70" />
          <p className="text-[13px] leading-relaxed text-white/50">
            Кампании хранятся в этом браузере и видны только на этом устройстве — рекламного сервера
            и оплаты в проекте пока нет. Структура данных и слоты уже готовы к подключению внешней
            сети: заменить нужно будет только чтение и запись в <code className="text-white/70">src/lib/ads/store.ts</code>.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* ------------------------------ composer ----------------------------- */}
          <section className="panel px-5 py-6 sm:px-6">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              {editingId ? 'Редактирование объявления' : 'Новое объявление'}
            </h2>

            <div className="mt-5 grid gap-5">
              <Field label="Заголовок">
                <input
                  className={inputClass}
                  value={draft.title}
                  maxLength={80}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Например: Хостинг для React-проектов"
                />
              </Field>

              <Field label="Текст" hint="Одно-два предложения.">
                <textarea
                  className={cn(inputClass, 'resize-none')}
                  rows={3}
                  maxLength={220}
                  value={draft.text}
                  onChange={(e) => set('text', e.target.value)}
                  placeholder="Что вы предлагаете и почему это интересно"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Ссылка">
                  <input
                    className={inputClass}
                    value={draft.url}
                    onChange={(e) => set('url', e.target.value)}
                    placeholder="https://example.com"
                    inputMode="url"
                  />
                </Field>
                <Field label="Кнопка">
                  <input
                    className={inputClass}
                    value={draft.cta}
                    maxLength={24}
                    onChange={(e) => set('cta', e.target.value)}
                    placeholder="Перейти"
                  />
                </Field>
              </div>

              <Field label="Изображение" hint={`Необязательно. До ${Math.round(MAX_IMAGE_BYTES / 1024)} КБ.`}>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="focus-within:ring-brand-400/60 flex cursor-pointer items-center gap-2 rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-sm text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white">
                    <ImageIcon size={15} />
                    Выбрать файл
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => onImage(e.target.files?.[0])}
                    />
                  </label>
                  {draft.image && (
                    <>
                      <img src={draft.image} alt="" className="h-12 w-20 rounded-lg object-cover ring-1 ring-white/10" />
                      <button
                        type="button"
                        onClick={() => set('image', '')}
                        className="focus-ring rounded-lg px-2.5 py-1.5 text-xs text-white/45 transition hover:text-white"
                      >
                        Убрать
                      </button>
                    </>
                  )}
                </div>
              </Field>

              <Field label="Рекламное место">
                <select
                  className={cn(inputClass, 'appearance-none')}
                  value={draft.placement}
                  onChange={(e) => set('placement', e.target.value as AdPlacement)}
                >
                  {AD_PLACEMENTS.map((entry) => (
                    <option key={entry.id} value={entry.id} className="bg-shell-850">
                      {entry.label} — {entry.where}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-white/35">
                  {placementInfo(draft.placement).note} Формат: {placementInfo(draft.placement).format}.
                </p>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Начало показа">
                  <input
                    type="datetime-local"
                    className={inputClass}
                    value={draft.startAt}
                    onChange={(e) => set('startAt', e.target.value)}
                  />
                </Field>
                <Field label="Окончание показа">
                  <input
                    type="datetime-local"
                    className={inputClass}
                    value={draft.endAt}
                    onChange={(e) => set('endAt', e.target.value)}
                  />
                </Field>
              </div>

              <Field
                label={`Кнопка «Закрыть» через ${draft.closeDelay} с`}
                hint="До этого момента закрыть объявление нельзя. 0 — закрывается сразу."
              >
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={draft.closeDelay}
                  onChange={(e) => set('closeDelay', Number(e.target.value))}
                  className="focus-ring h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-brand-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </Field>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={draft.enabled}
                  onChange={(e) => set('enabled', e.target.checked)}
                  className="h-4 w-4 accent-brand-500"
                />
                <span className="text-[13px] text-white/70">Включено</span>
              </label>

              {(error || validation) && (
                <p className="rounded-xl bg-rose-500/10 px-3.5 py-2.5 text-[13px] text-rose-200 ring-1 ring-rose-400/25">
                  {error || validation}
                </p>
              )}
              {saved && (
                <p className="rounded-xl bg-emerald-500/10 px-3.5 py-2.5 text-[13px] text-emerald-200 ring-1 ring-emerald-400/25">
                  Объявление сохранено.
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={submit}
                  disabled={Boolean(validation)}
                  className="focus-ring flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-40"
                >
                  <Plus size={15} />
                  {editingId ? 'Сохранить изменения' : 'Создать объявление'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setDraft(emptyDraft());
                      setEditingId(null);
                    }}
                    className="focus-ring rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white/60 ring-1 ring-white/12 transition hover:bg-white/6 hover:text-white"
                  >
                    Отменить
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ------------------------------- preview ----------------------------- */}
          <section>
            <h2 className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              Предпросмотр
            </h2>
            <div className="panel mt-4 px-4 py-4">
              <div className="overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.03]">
                <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3 py-1.5">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-white/35 uppercase">
                    Реклама
                  </span>
                  <span className="text-[11px] text-white/35">
                    {draft.closeDelay > 0 ? `Закрыть можно через ${draft.closeDelay}` : 'Закрыть ×'}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
                  {draft.image && (
                    <img src={draft.image} alt="" className="h-32 w-full shrink-0 rounded-xl object-cover sm:h-24 sm:w-40" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-semibold text-white">
                      {draft.title || 'Заголовок объявления'}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/50">
                      {draft.text || 'Текст объявления появится здесь.'}
                    </p>
                  </div>
                  {draft.url && (
                    <span className="shrink-0 self-start rounded-xl bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-white sm:self-center">
                      {draft.cta || 'Перейти'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <h2 className="mt-8 text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
              Кампании ({ads.length})
            </h2>

            {ads.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-white/12 py-12 text-center text-sm text-white/35">
                Объявлений пока нет.
              </div>
            ) : (
              <ul className="mt-4 grid gap-3">
                {ads.map((ad) => {
                  const status = statusOf(ad, now);
                  const tone = {
                    live: 'bg-emerald-500/12 text-emerald-300 ring-emerald-400/25',
                    scheduled: 'bg-sky-500/12 text-sky-300 ring-sky-400/25',
                    expired: 'bg-white/6 text-white/40 ring-white/10',
                    disabled: 'bg-white/6 text-white/40 ring-white/10',
                  }[status];

                  return (
                    <li key={ad.id} className="panel px-4 py-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-[14px] font-medium text-white">{ad.title}</div>
                          <div className="mt-1 text-xs text-white/40">
                            {placementInfo(ad.placement).label} · закрытие через {ad.closeDelay} с
                          </div>
                          <div className="mt-1 font-mono text-[11px] text-white/30">
                            {new Date(ad.startAt).toLocaleString('ru-RU')} → {new Date(ad.endAt).toLocaleString('ru-RU')}
                          </div>
                        </div>
                        <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1', tone)}>
                          {STATUS_LABELS[status]}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => startEdit(ad)}
                          className="focus-ring rounded-lg px-2.5 py-1.5 text-xs text-white/55 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
                        >
                          Изменить
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAd(ad.id)}
                          className="focus-ring rounded-lg px-2.5 py-1.5 text-xs text-white/55 ring-1 ring-white/10 transition hover:bg-white/6 hover:text-white"
                        >
                          {ad.enabled ? 'Выключить' : 'Включить'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteAd(ad.id)}
                          className="focus-ring flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-rose-300/70 ring-1 ring-rose-400/20 transition hover:bg-rose-500/10 hover:text-rose-200"
                        >
                          <Trash2 size={12} /> Удалить
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
