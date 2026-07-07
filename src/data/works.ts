/**
 * The gallery "database".
 *
 * Each published work is one record here, with the same fields you would
 * use in a real database table:
 *
 *   title    — name of the piece
 *   type     — "poetry" | "prose" | "art"
 *   medium   — art only (e.g. Watercolor, Digital, Mixed Media, Acrylic)
 *   author   — the contributor's name
 *   edition  — which edition of Threshold it appeared in
 *   excerpt  — for writing: the text (or an excerpt of it)
 *   imageUrl — for art: a link to the image hosted in the cloud
 *              (Google Drive direct link, Imgur, etc.). Leave undefined
 *              to show a placeholder until the artwork is uploaded.
 *
 * To migrate to a real database later (e.g. Supabase/Postgres), this
 * array becomes a table with the same columns and the Gallery page
 * fetches rows instead of importing this file.
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
  imageUrl?: string;
}

export const EDITIONS = ["Issue I — Spring 2026"] as const;

export const WORKS: Work[] = [
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
      "When we first arrived in America, it was all over the news. “From Virginia Suburb, a Dissident Chinese Writer Continues His Mission,” reported <i>The New York Times</i>, along with a picture of my parents holding a three-year-old me. ",
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
