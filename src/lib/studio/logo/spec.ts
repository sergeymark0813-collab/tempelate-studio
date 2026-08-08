import type { Rng } from '../rng';
import { analyzeSphere, getField, type SphereAnalysis } from './semantics';

/* ===========================================================================
   What the mark *is*.

   Explicitly not "first letter in a circle". A construction principle is chosen
   from the brand's meaning, a motif from the sphere's semantic field, and the
   geometry parameters are rolled per generation. Letterforms are only used when
   the user asked for a wordmark or a monogram — and even then they are built
   from drawn geometry (cut counters, interlocks, stroke construction) rather
   than typed and dropped into a shape.
   =========================================================================== */

export type LogoType = 'wordmark' | 'combined' | 'symbol' | 'monogram';

export type Construction =
  | 'motif'        // an abstract symbol from the field's vocabulary
  | 'monogram'     // letterforms reworked geometrically
  | 'negative'     // motif cut out of a solid shape
  | 'enclosed'     // motif held inside a frame (badge/emblem)
  | 'stacked'      // motif and wordmark share one vertical axis
  | 'letterform';  // the wordmark itself carries the idea, no separate symbol

export interface MarkSpec {
  construction: Construction;
  /** Motif id resolved against `MOTIFS` in the renderer. */
  motif: string;
  /** 0–1 weight of the drawing: thin hairline → heavy slab. */
  weight: number;
  /** Stroke or filled shapes. */
  fill: 'stroke' | 'solid' | 'mixed';
  /** Rotation applied to the whole motif, degrees. */
  rotation: number;
  /** How many repetitions the motif uses, where it supports repetition. */
  count: number;
  /** Corner treatment of the drawn geometry. */
  cap: 'round' | 'butt';
  /** Optional enclosing shape. */
  frame: 'none' | 'circle' | 'square' | 'shield' | 'hex';
  /** Whether the mark sits beside the name or above it. */
  lockup: 'horizontal' | 'vertical' | 'markOnly' | 'textOnly';
  /** Letters used when the construction involves letterforms. */
  letters: string;
  /** Human explanation of the idea, shown in the report. */
  rationale: string;
  /** Grid the mark is constructed on, for the spec sheet. */
  grid: number;
}

/* ------------------------------ letterforms ------------------------------ */

/** Initials for a monogram: up to two, from separate words where possible. */
function initialsOf(name: string): string {
  const words = name
    .trim()
    .split(/[\s-]+/)
    .filter((word) => /[\p{L}]/u.test(word));

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  const single = words[0] ?? 'A';
  // One-word brands read better as two letters than as a lone initial.
  return (single.length > 1 ? single.slice(0, 2) : single).toUpperCase();
}

/* ------------------------------ construction ----------------------------- */

/**
 * Style ids that want geometry rather than decoration, and the weight range
 * each style implies for the drawing.
 */
const STYLE_WEIGHT: Record<string, [number, number]> = {
  minimal: [0.18, 0.34],
  premium: [0.14, 0.3],
  bold: [0.5, 0.78],
  friendly: [0.38, 0.6],
  tech: [0.24, 0.46],
  editorial: [0.16, 0.32],
  organic: [0.3, 0.52],
  brutal: [0.6, 0.9],
  retro: [0.42, 0.66],
  glass: [0.24, 0.44],
};

const AUDIENCE_ROTATION: Record<string, number> = {
  youth: 12,
  mass: 0,
  premium: 0,
  b2b: 0,
  family: 6,
  pro: 0,
};

export interface MarkInput {
  name: string;
  /** Free-text sphere, exactly as the user typed or picked it. */
  sphere: string;
  /** Free-text brand description. */
  description: string;
  audience: string;
  style: string;
  logoType: LogoType;
  /** Motif direction chosen in the sphere-specific question, if answered. */
  motifDirection: string;
  /** Symbols the user wants included, free text. */
  wanted: string;
  /** Symbols the user forbade, free text. */
  avoided: string;
}

/** Motif ids the user's "не использовать" answer rules out. */
function forbiddenMotifs(avoided: string): string[] {
  const text = avoided.toLowerCase().replace(/ё/g, 'е');
  if (!text.trim()) return [];

  const bans: [string, string[]][] = [
    ['leafPair', ['лист', 'растен', 'зелен', 'эко']],
    ['flame', ['огон', 'пламя', 'костр']],
    ['droplet', ['капл', 'вод']],
    ['wave', ['волн', 'вод']],
    ['orbit', ['орбит', 'планет', 'космос', 'круг']],
    ['node', ['сет', 'узл', 'граф', 'точк']],
    ['pixel', ['пиксел', 'квадрат']],
    ['shield', ['щит', 'герб']],
    ['crossFold', ['крест']],
    ['burst', ['звезд', 'солнц', 'луч', 'вспышк']],
    ['bolt', ['молни']],
    ['grain', ['колос', 'зерн', 'пшениц']],
    ['cup', ['чашк', 'кружк']],
    ['aperture', ['диафрагм', 'объектив', 'камер']],
    ['houseFold', ['дом', 'крыш']],
    ['interlock', ['кольц', 'круг']],
    ['petal', ['цвет', 'лепестк']],
    ['grid', ['сетк', 'шестерён', 'шестерен']],
    ['module', ['куб', 'блок', 'шестерён', 'шестерен']],
  ];

  return bans.filter(([, words]) => words.some((word) => text.includes(word))).map(([motif]) => motif);
}

/** Motif ids the user's "хочу использовать" answer asks for. */
function wantedMotifs(wanted: string): string[] {
  const text = wanted.toLowerCase().replace(/ё/g, 'е');
  if (!text.trim()) return [];

  const wants: [string, string[]][] = [
    ['leafPair', ['лист', 'растен', 'росток', 'ветк']],
    ['flame', ['огон', 'пламя', 'гриль']],
    ['droplet', ['капл']],
    ['wave', ['волн', 'вод', 'мор']],
    ['orbit', ['орбит', 'планет', 'космос']],
    ['node', ['сет', 'узл', 'связ']],
    ['pixel', ['пиксел']],
    ['shield', ['щит', 'герб', 'защит']],
    ['crossFold', ['крест']],
    ['burst', ['звезд', 'солнц', 'луч']],
    ['bolt', ['молни', 'энерг']],
    ['grain', ['колос', 'зерн']],
    ['cup', ['чашк', 'кружк']],
    ['bean', ['боб', 'зерно кофе']],
    ['aperture', ['объектив', 'диафрагм', 'камер']],
    ['houseFold', ['дом', 'крыш', 'здани']],
    ['peak', ['гор', 'вершин', 'рост']],
    ['chevron', ['стрел', 'шеврон', 'движен']],
    ['interlock', ['кольц', 'союз', 'переплет']],
    ['petal', ['цвет', 'лепестк']],
    ['pulse', ['пульс', 'кардио', 'сердц']],
    ['frame', ['рамк', 'кадр']],
    ['monolith', ['колонн', 'башн', 'опор']],
  ];

  return wants.filter(([, words]) => words.some((word) => text.includes(word))).map(([motif]) => motif);
}

export interface MarkResult {
  spec: MarkSpec;
  sphere: SphereAnalysis;
}

export function buildMarkSpec(rng: Rng, input: MarkInput): MarkResult {
  const sphere = analyzeSphere(`${input.sphere} ${input.description}`);
  const field = getField(sphere.field.id);

  const banned = forbiddenMotifs(input.avoided);
  const requested = wantedMotifs(input.wanted);

  /* --- motif ---------------------------------------------------------- */
  // Priority: what the user asked for → what they picked in the sphere
  // question → the field's own vocabulary. Bans filter all three.
  const fromRequest = requested.filter((motif) => !banned.includes(motif));
  const fromDirection = input.motifDirection && !banned.includes(input.motifDirection) ? [input.motifDirection] : [];
  const fromField = field.motifs.filter((motif) => !banned.includes(motif));

  const pool = fromRequest.length > 0 ? fromRequest : fromDirection.length > 0 ? fromDirection : fromField;
  const motif = pool.length > 0 ? rng.pick(pool) : 'arcSweep';

  /* --- construction --------------------------------------------------- */
  let construction: Construction;
  if (input.logoType === 'wordmark') {
    construction = 'letterform';
  } else if (input.logoType === 'monogram') {
    construction = 'monogram';
  } else {
    construction = rng.weighted([
      ['motif', 6],
      ['negative', 3],
      ['enclosed', 2],
      ['stacked', 2],
    ]);
  }

  /* --- geometry ------------------------------------------------------- */
  const [wMin, wMax] = STYLE_WEIGHT[input.style] ?? [0.3, 0.5];
  const weight = rng.float(wMin, wMax);

  const fill: MarkSpec['fill'] =
    construction === 'negative'
      ? 'solid'
      : rng.weighted([
          ['stroke', input.style === 'minimal' || input.style === 'premium' || input.style === 'editorial' ? 5 : 2],
          ['solid', input.style === 'bold' || input.style === 'brutal' || input.style === 'friendly' ? 5 : 2],
          ['mixed', 2],
        ]);

  const frame: MarkSpec['frame'] =
    construction === 'enclosed'
      ? rng.pick(['circle', 'square', 'shield', 'hex'])
      : construction === 'negative'
        ? rng.pick(['circle', 'square', 'hex'])
        : 'none';

  const lockup: MarkSpec['lockup'] =
    input.logoType === 'symbol'
      ? 'markOnly'
      : input.logoType === 'wordmark'
        ? 'textOnly'
        : construction === 'stacked'
          ? 'vertical'
          : rng.pick(['horizontal', 'vertical']);

  const rotationBase = AUDIENCE_ROTATION[input.audience] ?? 0;
  const rotation = rng.chance(0.45) ? rotationBase + rng.int(-6, 6) : 0;

  /* --- rationale ------------------------------------------------------ */
  const constructionWord = {
    motif: 'самостоятельный абстрактный символ',
    monogram: 'монограмма, построенная как геометрия, а не как набранная буква',
    negative: 'символ, вырезанный из плотной формы',
    enclosed: 'знак внутри обрамления',
    stacked: 'символ и название на одной вертикальной оси',
    letterform: 'логотип на чистой типографике, без отдельного символа',
  }[construction];

  const source = fromRequest.length > 0
    ? 'форма взята из символов, которые вы просили использовать'
    : fromDirection.length > 0
      ? 'форма построена вокруг выбранного вами образа'
      : `форма собрана из визуального словаря сферы «${field.label}»`;

  const rationale = `${constructionWord[0].toUpperCase()}${constructionWord.slice(1)}: ${source}. Ассоциативный ряд — ${field.associations.slice(0, 3).join(', ')}.${banned.length > 0 ? ' Запрещённые вами образы исключены из подбора.' : ''}`;

  return {
    sphere,
    spec: {
      construction,
      motif,
      weight,
      fill,
      rotation,
      count: rng.int(3, 6),
      cap: input.style === 'brutal' || input.style === 'bold' ? 'butt' : rng.pick(['round', 'butt']),
      frame,
      lockup,
      letters: initialsOf(input.name || 'Знак'),
      rationale,
      grid: rng.pick([8, 12, 16]),
    },
  };
}
