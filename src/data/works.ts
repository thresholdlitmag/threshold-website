/**
 * The gallery "database".
 *
 * Each published work is one record here, with the same fields you would
 * use in a real database table:
 *
 *   title     — name of the piece
 *   type      — "poetry" | "prose" | "art"
 *   medium    — art only (e.g. Watercolor, Digital, Mixed Media, Acrylic)
 *   author    — the contributor's name
 *   edition   — which edition of Threshold it appeared in
 *   excerpt   — short preview shown on cards (writing only)
 *   fullText  — the complete piece, shown on the work's own page.
 *               Use a blank line between stanzas/paragraphs; for poetry,
 *               plain line breaks within a stanza are preserved.
 *   imageUrl  — art only. Either:
 *                 • a file committed to this repo's public/art/ folder,
 *                   referenced as "/art/filename.jpg"  (recommended), or
 *                 • a full https:// link to an image hosted elsewhere
 *                   (Imgur, Google Drive direct link, etc.)
 *   featured  — true on ONE work: it becomes the Home page hero
 *   highlight — true on works shown in Home's "Recent Highlights" row
 *
 * Every work automatically gets its own page at /gallery/<id>.
 */

export type WorkType = "poetry" | "prose" | "art";

export interface Work {
  id: string;
  title: string;
  type: WorkType;
  medium?: string;
  author: string;
  edition: string;
  excerpt?: string;
  fullText?: string;
  imageUrl?: string;
  featured?: boolean;
  highlight?: boolean;
}

export const EDITIONS = ["Issue I — Spring 2026"] as const;

export const LATEST_EDITION = EDITIONS[0];

const LOREM_POEM = `Lorem ipsum dolor sit amet,
consectetur adipiscing elit —
sed do eiusmod tempor
incididunt ut labore,
et dolore magna aliqua.

Ut enim ad minim veniam,
quis nostrud exercitation
ullamco laboris nisi ut
aliquip ex ea commodo consequat.

Duis aute irure dolor
in reprehenderit in voluptate
velit esse cillum dolore
eu fugiat nulla pariatur.`;

const LOREM_PROSE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`;

export const WORKS: Work[] = [
  {
    id: "lorem-ipsum-dolor",
    title: "Lorem Ipsum Dolor",
    type: "poetry",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Lorem ipsum dolor sit amet, / consectetur adipiscing elit — / sed do eiusmod tempor / incididunt ut labore, / et dolore magna aliqua.",
    fullText: LOREM_POEM,
    featured: true,
  },
  {
    id: "sed-ut-perspiciatis",
    title: "Sed Ut Perspiciatis",
    type: "prose",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    fullText: LOREM_PROSE,
    highlight: true,
  },
  {
    id: "nemo-enim-ipsam",
    title: "Nemo Enim Ipsam",
    type: "art",
    medium: "Watercolor",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    // imageUrl: "/art/nemo-enim-ipsam.jpg",
    highlight: true,
  },
  {
    id: "at-vero-eos",
    title: "At Vero Eos",
    type: "art",
    medium: "Digital",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
  },
  {
    id: "temporibus-autem",
    title: "Temporibus Autem",
    type: "poetry",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Temporibus autem quibusdam / et aut officiis debitis — / aut rerum necessitatibus / saepe eveniet, ut et / voluptates repudiandae.",
    fullText: LOREM_POEM,
    highlight: true,
  },
  {
    id: "itaque-earum-rerum",
    title: "Itaque Earum Rerum",
    type: "art",
    medium: "Mixed Media",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
  },
  {
    id: "nam-libero-tempore",
    title: "Nam Libero Tempore",
    type: "prose",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    fullText: LOREM_PROSE,
  },
  {
    id: "quis-autem-vel",
    title: "Quis Autem Vel",
    type: "art",
    medium: "Acrylic",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
  },
];

/* ---------- lookups used across the site ---------- */

export function getWork(id: string): Work | undefined {
  return WORKS.find((work) => work.id === id);
}

/** The Home page hero — the work flagged `featured` (or the first work). */
export function featuredWork(): Work {
  return WORKS.find((work) => work.featured) ?? WORKS[0];
}

/** Home "Recent Highlights" — works flagged `highlight` (max 3). */
export function highlightWorks(): Work[] {
  return WORKS.filter((work) => work.highlight).slice(0, 3);
}

/** Home "In This Issue" sidebar — latest-edition works, minus the hero. */
export function latestEditionWorks(limit = 4): Work[] {
  const hero = featuredWork();
  return WORKS.filter(
    (work) => work.edition === LATEST_EDITION && work.id !== hero.id,
  ).slice(0, limit);
}

/** First artwork of the latest edition — Home's featured-artwork slot. */
export function featuredArtwork(): Work | undefined {
  return WORKS.find(
    (work) => work.type === "art" && work.edition === LATEST_EDITION,
  );
}

/** Card label for a work's type: medium for art, genre for writing. */
export function typeLabel(work: Work): string {
  return work.type === "art" ? work.medium ?? "Art" : work.type;
}

/**
 * Resolve an imageUrl to a browser-loadable src. Repo-relative paths
 * ("/art/foo.jpg") get the deployment base path prefixed so they work
 * on GitHub Pages; full https:// links pass through untouched.
 */
export function resolveImageUrl(url: string): string {
  return url.startsWith("/")
    ? import.meta.env.BASE_URL.replace(/\/$/, "") + url
    : url;
}
