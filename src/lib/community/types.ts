import type { Project } from '../studio/types';

/* ===========================================================================
   Community data model.

   Shaped as User → Projects → Description → Preview → Rating, which is the
   structure a real backend would expose. Everything below is storage-agnostic:
   `store.ts` holds the only implementation detail, so swapping localStorage
   for an API means replacing one module, not the interface.
   =========================================================================== */

export interface User {
  id: string;
  name: string;
  createdAt: string;
}

export interface PublishedProject {
  id: string;
  authorId: string;
  /** Denormalised so a card can render without a second lookup. */
  authorName: string;
  title: string;
  /** Written by the author. Publishing without one is refused. */
  description: string;
  productLabel: string;
  /** The full editable design — a published project is data, never an image. */
  project: Project;
  publishedAt: string;
}

export interface Rating {
  projectId: string;
  userId: string;
  /** 1–5. */
  stars: number;
  ratedAt: string;
}

export interface ProjectStats {
  average: number;
  count: number;
  /** What the current user gave, or null if they haven't rated. */
  mine: number | null;
  /** False when the viewer is the author — you cannot rate your own work. */
  canRate: boolean;
}

export interface PublishInput {
  title: string;
  description: string;
  project: Project;
}

export type PublishResult =
  | { ok: true; id: string }
  | { ok: false; error: 'description-required' | 'title-required' | 'too-large' | 'storage-failed' };

/**
 * The contract a backend would implement. Kept deliberately small and
 * synchronous-looking; an HTTP version would return promises, which is the one
 * change callers would need to absorb.
 */
export interface CommunityStore {
  currentUser(): User;
  renameUser(name: string): void;

  list(): PublishedProject[];
  get(id: string): PublishedProject | null;
  publish(input: PublishInput): PublishResult;
  unpublish(id: string): void;

  rate(projectId: string, stars: number): void;
  statsFor(projectId: string): ProjectStats;

  /** Notifies on any mutation, so views stay in sync. */
  subscribe(listener: () => void): () => void;
}
