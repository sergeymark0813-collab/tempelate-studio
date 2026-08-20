import type { Locale } from '../../i18n/dictionaries';
import type { Domain, Vocabulary } from './types';
import ru from './ru';
import en from './en';
import hy from './hy';

export type { Domain, Vocabulary } from './types';

/** One written pack per language — see ./types for the shape. */
export const VOCAB: Record<Locale, Vocabulary> = { ru, en, hy };

/**
 * Keyword matching has to work whatever language the brief was typed in: the
 * interface can be English while the user describes a bakery in Russian. So
 * detection pools the keywords of every pack for a given domain id, and only
 * the wording that ends up on the artboard comes from the chosen language.
 */
export function keywordsFor(domainId: string): string[] {
  return Object.values(VOCAB).flatMap(
    (pack) => pack.domains.find((domain) => domain.id === domainId)?.keywords ?? [],
  );
}

/** Domain ids in pack order; every pack declares the same set. */
export const DOMAIN_IDS: string[] = ru.domains.map((domain) => domain.id);

/** The domain a pack uses when nothing matched — always the last one. */
export const fallbackDomain = (pack: Vocabulary): Domain => pack.domains[pack.domains.length - 1];
