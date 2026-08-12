import type { Niche } from './niches';

/* ===========================================================================
   Dictionary keys for the sphere questions.

   Stamped here rather than at the seventy-odd `q()` call sites in `niches.ts`,
   which would drown the data in bookkeeping. The key is always derivable from
   the ids: `nq.<niche>.<question>`.
   =========================================================================== */

export function stampNicheKeys(niches: Niche[]): Niche[] {
  for (const niche of niches) {
    for (const question of niche.questions) {
      question.titleKey ??= `nq.${niche.id}.${question.id}`;
      if (question.hint) question.hintKey ??= `nq.${niche.id}.${question.id}.hint`;
      if (question.placeholder) question.placeholderKey ??= `nq.${niche.id}.${question.id}.ph`;
    }
  }
  return niches;
}
