/* ===========================================================================
   Shape of the copy the studio writes into a generated design.

   One Vocabulary per language. The generator never invents wording — it picks
   from here — so adding a language means writing a new pack, not translating
   strings one by one at render time.
   =========================================================================== */

export interface Domain {
  id: string;
  label: string;
  keywords: string[];
  brands: string[];
  nav: string[];
  /** `{brand}` is substituted. */
  headlines: string[];
  subtitles: string[];
  /** Catalogue entries, services, menu positions. */
  items: { title: string; meta: string }[];
  stats: { value: string; label: string }[];
  categories: string[];
  imagery: string[];
}

export interface Vocabulary {
  domains: Domain[];
  /** Primary button wording, keyed by the purpose answered in the brief. */
  ctaByPurpose: Record<string, string[]>;
  /** Secondary button wording, shared across purposes. */
  ctaSecondary: string[];
  featuresByPurpose: Record<string, { title: string; text: string }[]>;
  steps: { title: string; text: string }[];
  faq: { title: string; text: string }[];
  testimonials: { name: string; role: string; text: string }[];
}
