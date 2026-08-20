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

/** Copy the composer injects into blocks, keyed roughly by block type. */
export interface Sections {
  /** Invented client names for the trust bar. */
  logoNames: string[];
  pageHeaderEyebrow: string;
  categories: { eyebrow: string; title: string };
  features: { eyebrow: string; titles: string[] };
  bento: { eyebrow: string; title: string };
  /** Showcase wording per domain id; `default` covers the rest. */
  showcase: Record<string, { eyebrow: string; titles: string[]; cta: string }>;
  catalog: { eyebrow: string; titles: string[]; ctaSecondary: string };
  gallery: { eyebrow: string; titles: string[] };
  stats: { eyebrow: string; title: string };
  steps: { eyebrow: string; title: string };
  pricing: { eyebrow: string; title: string; tiers: { title: string; value: string; text: string }[] };
  team: { eyebrow: string; title: string; members: { title: string; meta: string }[] };
  testimonials: { eyebrow: string; title: string };
  faq: { eyebrow: string; title: string };
  contactForm: { eyebrow: string; titles: string[]; subtitle: string; fields: string[] };
  cta: { titles: string[]; subtitle: string };
  authForm: {
    titles: string[];
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    fields: string[];
  };
  kpisTitle: string;
  chartTitles: string[];
  tableTitles: string[];
  activity: { title: string; entries: { title: string; text: string; meta: string }[] };
  board: { title: string; columns: string[] };
  mobileGreetings: string[];
  mobileHeroEyebrow: string;
  mobileCardTitles: string[];
  mobileListTitle: string;
  tabbar: string[];
  slideContent: { eyebrow: string; titles: string[] };
  slideStats: { eyebrow: string; title: string };
  card: { name: string; role: string; phone: string; address: string; emailHost: string };
  email: {
    headerSubtitle: string;
    heroEyebrow: string;
    cardsTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    footerSubtitle: string;
  };
  logoMarkEyebrow: string;
  uiKitTitle: string;
  productBadge: string;
  /** Name of the first frame when a product generates several. */
  mainFrame: string;
}

/**
 * Copy the renderers print directly — page furniture rather than block content:
 * footer column headings, the sidebar of an app mock, table headers.
 */
export interface Chrome {
  footerColumns: string[];
  privacy: string;
  appNav: string[];
  tableHeaders: string[];
  boardColumns: string[];
  people: string[];
  appTitle: string;
  adminRole: string;
  search: string;
}

export interface Vocabulary {
  domains: Domain[];
  sections: Sections;
  chrome: Chrome;
  /** Currency suffix and number formatting for generated prices. */
  currency: string;
  numberLocale: string;
  /** Composition archetypes, keyed by id — shown in the result report. */
  archetypes: Record<string, { label: string; note: string }>;
  /**
   * Name and rationale for each block type, keyed by type id. Shown in the
   * editor's section list and in the structure report, and baked into the
   * project at generation time — so a design keeps the wording of the language
   * it was generated in.
   */
  blockMeta: Record<string, { name: string; purpose: string }>;
  /** Primary button wording, keyed by the purpose answered in the brief. */
  ctaByPurpose: Record<string, string[]>;
  /** Secondary button wording, shared across purposes. */
  ctaSecondary: string[];
  featuresByPurpose: Record<string, { title: string; text: string }[]>;
  steps: { title: string; text: string }[];
  faq: { title: string; text: string }[];
  testimonials: { name: string; role: string; text: string }[];
}
