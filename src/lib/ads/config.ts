import type { AdPlacement } from './types';

/* ===========================================================================
   Advertising configuration.

   Single source for the timing. Change `AD_DURATION_SECONDS` here and every
   countdown in the app follows — the composer's per-campaign override, the slot
   that opens with Generate, and the default in the manager.
   =========================================================================== */

/** Seconds before «Закрыть рекламу» becomes available. */
export const AD_DURATION_SECONDS = 15;

/** Which slot the ad that opens alongside Generate is drawn from. */
export const AD_PLACEMENT_ON_GENERATE: AdPlacement = 'content';

/** Bounds offered by the duration slider in the manager. */
export const AD_DURATION_MIN = 0;
export const AD_DURATION_MAX = 30;
