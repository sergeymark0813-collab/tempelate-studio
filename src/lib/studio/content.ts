import type { Rng } from './rng';
import type { Locale } from '../i18n/dictionaries';
import type { Domain, Vocabulary } from './vocab';
import { DOMAIN_IDS, VOCAB, fallbackDomain, keywordsFor } from './vocab';

/* ===========================================================================
   Generated copy.

   Layouts are only convincing with text that could plausibly belong to the
   project, so the studio writes its own: a domain is read out of the free-text
   answer, and wording is assembled from that domain's vocabulary crossed with
   the stated purpose. Nothing here is lorem ipsum.

   The wording itself lives in ./vocab, one written pack per language. This
   module only decides which domain applies and picks from the pack for the
   locale it is given — which is why `locale` is required rather than optional:
   an unspecified language used to mean Russian, silently, on every artboard.
   =========================================================================== */

export type { Domain } from './vocab';

const normalize = (text: string) => text.toLowerCase().replace(/ё/g, 'е');

/**
 * Scores domains by keyword length, not hit count: a long, specific word is
 * far stronger evidence than a short one that turns up in every other brief.
 * Keywords are pooled across languages so a Russian brief still resolves while
 * the interface is in English.
 */
export function detectDomain(description: string, locale: Locale): Domain {
  const text = normalize(description);
  const pack = VOCAB[locale];

  const ranked = DOMAIN_IDS.map((id) => ({
    id,
    score: keywordsFor(id)
      .filter((keyword) => text.includes(normalize(keyword)))
      .reduce((sum, keyword) => sum + keyword.length, 0),
  })).sort((a, b) => b.score - a.score);

  const best = ranked[0] && ranked[0].score > 0 ? ranked[0].id : null;
  return pack.domains.find((domain) => domain.id === best) ?? fallbackDomain(pack);
}

/** Pulls a brand out of «…» or "…" if the user named one; otherwise invents one. */
export function pickBrand(rng: Rng, description: string, domain: Domain): string {
  const quoted = description.match(/[«"']([^«»"']{2,28})[»"']/);
  if (quoted) return quoted[1].trim();
  return rng.pick(domain.brands);
}

export interface ContentPack {
  /** The language pack this copy came from — carried so the composer, which
      also names blocks, does not have to be told the locale separately. */
  vocab: Vocabulary;
  domain: Domain;
  brand: string;
  purpose: string;
  nav: string[];
  headline: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  features: { title: string; text: string }[];
  items: { title: string; meta: string }[];
  stats: { value: string; label: string }[];
  categories: string[];
  steps: { title: string; text: string }[];
  faq: { title: string; text: string }[];
  testimonials: { name: string; role: string; text: string }[];
  imagery: string[];
}

export interface ContentInput {
  /** Free-text answer, used only when the sphere wasn't picked explicitly. */
  description: string;
  purpose: string;
  /** Language of the generated design. Not optional — see the note above. */
  locale: Locale;
  /** Domain id from the chosen niche — an explicit answer always beats a guess. */
  domainId?: string;
  /** Brand name the user typed. */
  name?: string;
}

export function buildContent(rng: Rng, input: ContentInput): ContentPack {
  const { description, purpose, locale } = input;
  const pack = VOCAB[locale];

  const explicit = input.domainId
    ? pack.domains.find((entry) => entry.id === input.domainId)
    : undefined;
  const domain = explicit ?? detectDomain(description, locale);
  const brand = input.name?.trim() || pickBrand(rng, description, domain);
  const ctas = pack.ctaByPurpose[purpose] ?? pack.ctaByPurpose.present;

  return {
    vocab: pack,
    domain,
    brand,
    purpose,
    nav: rng.shuffle(domain.nav).slice(0, rng.int(4, 5)),
    headline: rng.pick(domain.headlines),
    subtitle: rng.pick(domain.subtitles),
    cta: rng.pick(ctas),
    ctaSecondary: rng.pick(pack.ctaSecondary),
    features: rng.sample(pack.featuresByPurpose[purpose] ?? pack.featuresByPurpose.present, 6),
    items: rng.shuffle(domain.items),
    stats: rng.shuffle(domain.stats),
    categories: rng.shuffle(domain.categories),
    steps: pack.steps,
    faq: rng.sample(pack.faq, 5),
    testimonials: rng.sample(pack.testimonials, 3),
    imagery: domain.imagery,
  };
}
