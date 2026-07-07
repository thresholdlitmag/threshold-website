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

  {
    id: "w1",
    title: "O’ Great Goddess Durga",
    type: "poetry",
    author: "Bastion Price",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "The great goddess Durga, embodiment of power / An array of 16 arms, like petals of a flower / Each holding a weapon, of each there are only one / Grinning cheekily after a battle easilly won",
  },
  {
    id: "w2",
    title: "Abandoned",
    type: "prose",
    author: "Cora Lin",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "Mahishasura flew at Durga, and Durga killed him; Brahma’s blessing left the demon immune to man, god, and beast, but he had left a loophole—a woman’s hand. Mahishasura was the reason for her birth, and now she was the reason for his death.",
  },
  {
    id: "w3",
    title: "Loving Feathers",
    type: "art",
    medium: "Acrylic",
    author: "Kina Xu",
    edition: "Issue XXXIX — Spring 2026",
    // imageUrl: "https://your-cloud-storage/link-to-artwork.jpg",
  },
  {
    id: "w4",
    title: "fluffy white clouds",
    type: "poetry",
    author: "Ojasvi Ramani",
    edition: "Issue XXXIX — Spring 2026",
    excerpt: 
      "they were hung up a little too high / fasted with tape and barely sticky adhesive / we teetered tall on our ladder / my hand barely reaching the dusty corners",
  },
  {
    id: "w5",
    title: "Sin Stubborn",
    type: "poetry",
    author: "Kobimtochi Obi",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "the serpent's fruit / didn't leave me with childbirth / but it did bless me with stubborn hands / that creep south / splaying around in all things Eve",
  },
  {
    id: "w6",
    title: "Hideaway",
    type: "art",
    medium: "Mixed Media",
    author: "Moubon Ray Kurukumbi",
    edition: "Issue XXXIX — Spring 2026",
    // imageUrl: "https://your-cloud-storage/link-to-artwork.jpg",
  },
  {
    id: "w7",
    title: "Free Birds",
    type: "prose",
    author: "Justin Yu",
    edition: "Issue XXXIX — Spring 2026",
    excerpt:
      "When we first arrived in America, it was all over the news. “From Virginia Suburb, a Dissident Chinese Writer Continues His Mission,” reported The New York Times, along with a picture of my parents holding a three-year-old me. ",
  },
  {
    id: "w8",
    title: "The Sea",
    type: "art",
    medium: "Acrylic",
    author: "Olivia Kim",
    edition: "Issue XXXIX — Spring 2026",
    // imageUrl: "https://your-cloud-storage/link-to-artwork.jpg",
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
