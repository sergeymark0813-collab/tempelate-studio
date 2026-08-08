/* ===========================================================================
   Advertising.

   Slots are declared positions in the layout — never overlays. Nothing is ever
   drawn over navigation, forms, the generated result or the export controls;
   an ad either occupies its own reserved band or renders nothing at all.

   There is no ad server behind this: campaigns live in the browser's own
   storage. That is a deliberate, visible limitation rather than a fake backend
   (see `AdsPage` for how it is stated to the user).
   =========================================================================== */

export type AdPlacement =
  | 'topBanner'
  | 'header'
  | 'content'
  | 'sidebar'
  | 'betweenSections'
  | 'bottom'
  | 'fullwidth';

export interface AdPlacementInfo {
  id: AdPlacement;
  label: string;
  note: string;
  /** Where in the app this slot physically appears. */
  where: string;
  /** Aspect guidance shown in the composer. */
  format: string;
}

export const AD_PLACEMENTS: AdPlacementInfo[] = [
  {
    id: 'topBanner',
    label: 'Верхний баннер',
    note: 'Узкая полоса над шапкой. Самый заметный слот.',
    where: 'Все страницы, выше навигации',
    format: 'Широкий, до 90px высотой',
  },
  {
    id: 'header',
    label: 'Под шапкой',
    note: 'Прямоугольный блок сразу под навигацией.',
    where: 'Главная и каталог',
    format: '728×90 или адаптивный',
  },
  {
    id: 'content',
    label: 'В контенте',
    note: 'Между смысловыми блоками страницы.',
    where: 'Страница результата, ниже макета',
    format: 'Квадрат или 16:9',
  },
  {
    id: 'sidebar',
    label: 'Боковая колонка',
    note: 'Вертикальный блок сбоку. На мобильном уезжает вниз.',
    where: 'Каталог шаблонов',
    format: '300×600 или 300×250',
  },
  {
    id: 'betweenSections',
    label: 'Между секциями',
    note: 'Разделитель между разделами страницы.',
    where: 'Каталог, между рядами карточек',
    format: 'Широкий, невысокий',
  },
  {
    id: 'bottom',
    label: 'Нижний блок',
    note: 'Перед подвалом, когда пользователь дочитал.',
    where: 'Все страницы, над подвалом',
    format: 'Широкий, до 250px',
  },
  {
    id: 'fullwidth',
    label: 'Во всю ширину',
    note: 'Крупный блок без боковых полей.',
    where: 'Каталог шаблонов',
    format: 'Панорамный, 21:9',
  },
];

export const placementInfo = (id: AdPlacement): AdPlacementInfo =>
  AD_PLACEMENTS.find((entry) => entry.id === id) ?? AD_PLACEMENTS[0];

export interface Ad {
  id: string;
  title: string;
  /** Body copy under the title. */
  text: string;
  /** Data URL of the uploaded image, or empty for a text-only ad. */
  image: string;
  /** Destination; opened in a new tab with `rel="noopener"`. */
  url: string;
  /** Label of the action button. */
  cta: string;
  placement: AdPlacement;
  /** ISO datetime — the ad is invisible before this moment. */
  startAt: string;
  /** ISO datetime — the ad is invisible after this moment. */
  endAt: string;
  /**
   * Seconds the viewer must wait before «Закрыть» becomes available.
   * 0 means the ad is closable immediately.
   */
  closeDelay: number;
  enabled: boolean;
  createdAt: string;
}

export type AdDraft = Omit<Ad, 'id' | 'createdAt'>;

/** Why an ad is not currently on screen — surfaced in the manager. */
export type AdStatus = 'scheduled' | 'live' | 'expired' | 'disabled';

export function statusOf(ad: Ad, now = Date.now()): AdStatus {
  if (!ad.enabled) return 'disabled';
  const start = Date.parse(ad.startAt);
  const end = Date.parse(ad.endAt);
  if (Number.isFinite(start) && now < start) return 'scheduled';
  if (Number.isFinite(end) && now > end) return 'expired';
  return 'live';
}

export const STATUS_LABELS: Record<AdStatus, string> = {
  scheduled: 'Запланировано',
  live: 'Показывается',
  expired: 'Завершено',
  disabled: 'Выключено',
};
