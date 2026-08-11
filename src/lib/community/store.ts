import type {
  CommunityStore,
  ProjectStats,
  PublishResult,
  PublishedProject,
  Rating,
  User,
} from './types';

/* ===========================================================================
   Browser-local implementation of the community store.

   This is the only module that knows where the data lives. Swapping it for an
   API means rewriting the functions below and leaving every caller untouched —
   which is the whole reason the contract sits in `types.ts`.

   The identity here is device-local, not authenticated. The UI says so rather
   than implying accounts that do not exist.
   =========================================================================== */

const USER_KEY = 'template-studio:user';
const PROJECTS_KEY = 'template-studio:community:projects';
const RATINGS_KEY = 'template-studio:community:ratings';

/** A published design carries its full structure; keep it inside quota. */
const MAX_PROJECT_BYTES = 1_500_000;

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    // Corrupt payload — better an empty gallery than a crashed page.
    return fallback;
  }
}

function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const id = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/* --------------------------------- people -------------------------------- */

const ANIMALS = ['Лис', 'Сокол', 'Кит', 'Рысь', 'Барс', 'Сойка', 'Выдра', 'Ворон'];

function createUser(): User {
  return {
    id: id('user'),
    name: `${ANIMALS[Math.floor(Math.random() * ANIMALS.length)]} ${Math.floor(Math.random() * 900 + 100)}`,
    createdAt: new Date().toISOString(),
  };
}

function currentUser(): User {
  const stored = read<User | null>(USER_KEY, null);
  if (stored && typeof stored.id === 'string' && typeof stored.name === 'string') return stored;

  const fresh = createUser();
  write(USER_KEY, fresh);
  return fresh;
}

/* -------------------------------- projects ------------------------------- */

const allProjects = (): PublishedProject[] => {
  const rows = read<PublishedProject[]>(PROJECTS_KEY, []);
  return Array.isArray(rows) ? rows.filter((row) => row && typeof row.id === 'string') : [];
};

const allRatings = (): Rating[] => {
  const rows = read<Rating[]>(RATINGS_KEY, []);
  return Array.isArray(rows) ? rows.filter((row) => row && typeof row.projectId === 'string') : [];
};

export const localCommunityStore: CommunityStore = {
  currentUser,

  renameUser(name) {
    const trimmed = name.trim().slice(0, 40);
    if (!trimmed) return;

    const user = { ...currentUser(), name: trimmed };
    write(USER_KEY, user);

    // Denormalised author names have to follow, or old cards keep the old name.
    write(
      PROJECTS_KEY,
      allProjects().map((entry) =>
        entry.authorId === user.id ? { ...entry, authorName: trimmed } : entry,
      ),
    );
    emit();
  },

  list() {
    return allProjects().sort(
      (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
    );
  },

  get(projectId) {
    return allProjects().find((entry) => entry.id === projectId) ?? null;
  },

  publish({ title, description, project }): PublishResult {
    // Validation lives here, not only in the form, so no caller can bypass it.
    if (!title.trim()) return { ok: false, error: 'title-required' };
    if (!description.trim()) return { ok: false, error: 'description-required' };

    const user = currentUser();
    const entry: PublishedProject = {
      id: id('pub'),
      authorId: user.id,
      authorName: user.name,
      title: title.trim().slice(0, 80),
      description: description.trim().slice(0, 600),
      productLabel: project.product.label,
      project,
      publishedAt: new Date().toISOString(),
    };

    const payload = JSON.stringify(entry);
    if (payload.length > MAX_PROJECT_BYTES) return { ok: false, error: 'too-large' };

    if (!write(PROJECTS_KEY, [entry, ...allProjects()])) {
      return { ok: false, error: 'storage-failed' };
    }
    emit();
    return { ok: true, id: entry.id };
  },

  unpublish(projectId) {
    const user = currentUser();
    // Only the author may withdraw their own work.
    write(
      PROJECTS_KEY,
      allProjects().filter((entry) => !(entry.id === projectId && entry.authorId === user.id)),
    );
    write(RATINGS_KEY, allRatings().filter((entry) => entry.projectId !== projectId));
    emit();
  },

  rate(projectId, stars) {
    const value = Math.round(Math.min(5, Math.max(1, stars)));
    const user = currentUser();
    const project = this.get(projectId);
    if (!project || project.authorId === user.id) return;

    // One rating per user per project: re-rating replaces, never accumulates.
    const others = allRatings().filter(
      (entry) => !(entry.projectId === projectId && entry.userId === user.id),
    );
    write(RATINGS_KEY, [
      ...others,
      { projectId, userId: user.id, stars: value, ratedAt: new Date().toISOString() },
    ]);
    emit();
  },

  statsFor(projectId): ProjectStats {
    const user = currentUser();
    const project = this.get(projectId);
    const rows = allRatings().filter((entry) => entry.projectId === projectId);
    const mine = rows.find((entry) => entry.userId === user.id)?.stars ?? null;

    return {
      count: rows.length,
      average: rows.length
        ? Math.round((rows.reduce((sum, entry) => sum + entry.stars, 0) / rows.length) * 10) / 10
        : 0,
      mine,
      canRate: Boolean(project) && project?.authorId !== user.id,
    };
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/** The active store. Point this at an API implementation to go server-backed. */
export const community: CommunityStore = localCommunityStore;
