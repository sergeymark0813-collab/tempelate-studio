/**
 * Randomness for the studio.
 *
 * Unlike the old concept generator, seeds here are drawn fresh for every run:
 * the requirement is that two people describing the same product get two
 * different designs. The seed is still recorded on the project, so a specific
 * result can be reproduced on demand.
 */

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rng {
  seed: number;
  next: () => number;
  int: (min: number, max: number) => number;
  float: (min: number, max: number) => number;
  pick: <T>(list: readonly T[]) => T;
  /** Weighted pick: `[[value, weight], …]`. */
  weighted: <T>(entries: readonly (readonly [T, number])[]) => T;
  chance: (probability: number) => boolean;
  shuffle: <T>(list: readonly T[]) => T[];
  sample: <T>(list: readonly T[], count: number) => T[];
  /** Random id, handy for React keys on generated nodes. */
  id: (prefix: string) => string;
}

export function newSeed(): number {
  return (Math.floor(Math.random() * 0xffffffff) ^ Date.now()) >>> 0;
}

export function createRng(seed: number): Rng {
  const next = mulberry32(seed);
  const int = (min: number, max: number) => Math.floor(next() * (max - min + 1)) + min;

  const rng: Rng = {
    seed,
    next,
    int,
    float: (min, max) => next() * (max - min) + min,
    pick: (list) => list[Math.floor(next() * list.length)],
    weighted: (entries) => {
      const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
      let roll = next() * total;
      for (const [value, weight] of entries) {
        roll -= weight;
        if (roll <= 0) return value;
      }
      return entries[entries.length - 1][0];
    },
    chance: (probability) => next() < probability,
    shuffle: (list) => {
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = int(0, i);
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },
    sample: (list, count) => rng.shuffle(list).slice(0, Math.min(count, list.length)),
    id: (prefix) => `${prefix}-${Math.floor(next() * 0xffffff).toString(36)}`,
  };

  return rng;
}
