/* ===========================================================================
   The generative design studio.

   Nothing here selects a ready-made template. A project is *synthesised*: the
   answers produce a design system (colour, type, space, radius, elevation,
   grid, motion), and a composition engine lays out frames block by block,
   choosing variants, spans and densities as it goes. The renderer draws that
   description with primitives — so two runs of the same brief genuinely differ.
   =========================================================================== */

/* --------------------------------- brief --------------------------------- */

/** One answer to one question. Free text lives in `custom`. */
export interface Answer {
  questionId: string;
  /** Ids of chosen options. */
  values: string[];
  custom?: string;
}

export type Answers = Record<string, Answer>;

export interface QuestionOption {
  id: string;
  label: string;
  /** Short clarifier under the label. */
  note?: string;
  /**
   * Block ids pulled into the composition when this option is chosen. This is
   * what makes a sphere-specific answer change the layout rather than just the
   * summary text — "нужна онлайн-бронь" really does add a booking block.
   */
  adds?: string[];
}

export interface Question {
  id: string;
  /** The question itself, e.g. «Какое настроение должен передавать дизайн?» */
  title: string;
  hint?: string;
  kind: 'text' | 'single' | 'multi';
  options?: QuestionOption[];
  /** Options that depend on earlier answers — e.g. the element list per product. */
  optionsFor?: (answers: Answers) => QuestionOption[];
  /** Placeholder for `text`, or for the "свой вариант" field. */
  placeholder?: string;
  /** Skippable questions render a «Пропустить» control. */
  optional?: boolean;
  /** Only asked when this returns true — lets the flow adapt to the product. */
  when?: (answers: Answers) => boolean;
}

/* -------------------------------- product -------------------------------- */

export type CanvasKind =
  | 'page'
  | 'mobile'
  | 'app'
  | 'poster'
  | 'slide'
  | 'card'
  | 'email'
  | 'logo'
  | 'kit';

export interface Canvas {
  kind: CanvasKind;
  label: string;
  width: number;
  /** Fixed-height canvases (poster, card, logo); pages grow with content. */
  height?: number;
  /** Rendered device/paper chrome around the artboard. */
  chrome: 'browser' | 'phone' | 'desktop' | 'none' | 'paper';
}

export interface ProductKind {
  id: string;
  label: string;
  /** Grouping in the picker. */
  group: string;
  note: string;
  canvas: Canvas;
  /** Blocks the composer may use, in rough priority order. */
  blocks: string[];
  /** Blocks that must appear. */
  required: string[];
  /** Additional frames generated beside the main one. */
  extraFrames?: { name: string; blocks: string[] }[];
}

/* ----------------------------- design system ----------------------------- */

export interface FontSpec {
  family: string;
  /** CSS stack including fallbacks. */
  stack: string;
  weights: number[];
  category: 'sans' | 'serif' | 'display' | 'mono';
}

export interface TypeStep {
  id: string;
  label: string;
  size: number;
  weight: number;
  lineHeight: number;
  tracking: string;
  transform: 'none' | 'uppercase';
  role: 'display' | 'body';
  usage: string;
}

export interface ColorTokens {
  scheme: 'dark' | 'light';
  harmony: string;
  bg: string;
  surface: string;
  surface2: string;
  surface3: string;
  text: string;
  textMuted: string;
  textFaint: string;
  primary: string;
  onPrimary: string;
  secondary: string;
  accent: string;
  border: string;
  borderStrong: string;
  success: string;
  warning: string;
  danger: string;
  /** Ready-to-use CSS gradient built from the palette. */
  gradient: string;
  hues: number[];
}

export interface DesignSystem {
  color: ColorTokens;
  type: {
    display: FontSpec;
    body: FontSpec;
    ratio: number;
    baseSize: number;
    scale: TypeStep[];
    /** Why this pairing, in one sentence. */
    rationale: string;
  };
  space: {
    unit: number;
    steps: number[];
    section: number;
    gutter: number;
    density: 'compact' | 'regular' | 'spacious';
  };
  radius: {
    family: string;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
  shadow: {
    family: string;
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };
  grid: {
    columns: number;
    maxWidth: number;
    margin: number;
    gutter: number;
    label: string;
  };
  motion: {
    duration: number;
    easing: string;
    entrance: string;
    intensity: 'none' | 'subtle' | 'rich';
  };
  /** How surfaces are separated: fills, outlines, glass, gradients. */
  surfaceStyle: 'flat' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  /** Line/fill weight of icons. */
  iconStyle: 'line' | 'solid' | 'duotone';
}

/* --------------------------------- layout -------------------------------- */

export interface BlockContent {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  cta?: string;
  ctaSecondary?: string;
  /** Destination of the primary button — editable after generation. */
  ctaHref?: string;
  /** Uploaded image replacing the block's procedural artwork. */
  image?: string;
  items?: {
    title: string;
    text?: string;
    meta?: string;
    value?: string;
  }[];
}

export interface BlockInstance {
  id: string;
  type: string;
  variant: string;
  /** Human-readable name for the structure report. */
  name: string;
  purpose: string;
  params: {
    columns?: number;
    count?: number;
    align?: 'left' | 'center' | 'right';
    height?: 'auto' | 'short' | 'tall' | 'full';
    emphasis?: 'low' | 'normal' | 'high';
    invert?: boolean;
    /** Bento cell spans, when the variant is a mosaic. */
    spans?: number[][];
  };
  content: BlockContent;
  /** Present only on logo blocks — the synthesised mark this block draws. */
  mark?: import('./logo/spec').MarkSpec;
  /** Turned off in the editor; the block stays in the project but isn't drawn. */
  hidden?: boolean;
}

export interface Frame {
  id: string;
  name: string;
  canvas: Canvas;
  blocks: BlockInstance[];
}

/* -------------------------------- imagery -------------------------------- */

export interface ImageDirection {
  title: string;
  kind: string;
  placement: string;
  ratio: string;
  prompt: string;
  treatment: string;
}

/* -------------------------------- project -------------------------------- */

export interface ProjectAnalysis {
  productLabel: string;
  purposeLabel: string;
  styleLabel: string;
  moodLabel: string;
  audienceLabel: string;
  colorLabel: string;
  /** Words recognised in the free-text answers. */
  keywords: string[];
  /** Decisions the generator made on its own, phrased for the report. */
  decisions: string[];
}

export interface Project {
  /** Unique per generation — the same brief never reuses one. */
  id: string;
  seed: number;
  createdAt: number;
  name: string;
  tagline: string;
  summary: string;
  product: ProductKind;
  answers: Answers;
  analysis: ProjectAnalysis;
  ds: DesignSystem;
  frames: Frame[];
  imagery: ImageDirection[];
  /** Composition approach, e.g. «Асимметричный сплит». */
  archetype: string;
  archetypeNote: string;
}
