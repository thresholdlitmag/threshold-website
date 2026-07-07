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
    title: "Lorem Ipsum Dolor",
    type: "poetry",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Lorem ipsum dolor sit amet, / consectetur adipiscing elit — / sed do eiusmod tempor / incididunt ut labore, / et dolore magna aliqua.",
  },
  {
    id: "w2",
    title: "Sed Ut Perspiciatis",
    type: "prose",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    id: "w3",
    title: "Nemo Enim Ipsam",
    type: "art",
    medium: "Watercolor",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    // imageUrl: "https://your-cloud-storage/link-to-artwork.jpg",
  },
  {
    id: "w4",
    title: "At Vero Eos",
    type: "art",
    medium: "Digital",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
  },
  {
    id: "w5",
    title: "Temporibus Autem",
    type: "poetry",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Temporibus autem quibusdam / et aut officiis debitis — / aut rerum necessitatibus / saepe eveniet, ut et / voluptates repudiandae.",
  },
  {
    id: "w6",
    title: "Itaque Earum Rerum",
    type: "art",
    medium: "Mixed Media",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
  },
  {
    id: "w7",
    title: "Nam Libero Tempore",
    type: "prose",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
    excerpt:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  },
  {
    id: "w8",
    title: "Quis Autem Vel",
    type: "art",
    medium: "Acrylic",
    author: "Firstname Lastname",
    edition: "Issue I — Spring 2026",
  },
];
