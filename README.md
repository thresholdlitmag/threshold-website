# threshold-website
Website for Threshold Literary and Arts Magazine!!

Built with Vite + React + TypeScript.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build (outputs to dist/)
npm run preview  # serve the production build locally
```

## Structure

- `src/pages/` — one component per page (Home, Gallery, E-Design, Shadwell, Events, Submit, Masthead, Contact)
- `src/components/Layout.tsx` — masthead, navigation, and footer shared by every page
- `src/data/works.ts` — the gallery "database": every published poem, story, and artwork
- `src/data/site.ts` — site-wide settings, including the submissions Google Form link
- `src/data/nav.ts` — the page list used by the nav bar, mobile drawer, and quick menu
- `src/styles.css` — all styling; the palette lives in CSS variables at the top (creme `#F4F3ED`, navy `#121434`, lavender `#D2D5F3`)

## Things you'll want to edit

- **Submissions form** — paste the Google Form link into `SUBMISSION_FORM_URL` in `src/data/site.ts`. Until you do, the submit buttons show as "opening soon" and can't be clicked.
- **Adding a work** — add an entry to `WORKS` in `src/data/works.ts`. It gets a gallery card and its own page automatically.
- **Artwork files** — drop images in `public/art/` and reference them as `/art/filename.jpg`. A work with no image shows a typographic plate instead of a broken picture.
- **Masthead photos** — drop portraits in `public/pfp/`. A missing or broken photo falls back to the person's initials.
- **Tab icon** — replace `public/favicon.svg` with the real logo when there is one.
