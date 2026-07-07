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

- `src/pages/` — one component per page (Home, About, Issues, Submit, Masthead, Contact)
- `src/components/Layout.tsx` — masthead, navigation, and footer shared by every page
- `src/components/PlaceholderImage.tsx` — lavender image placeholders; swap for real `<img>` tags as artwork becomes available
- `src/styles.css` — all styling; the palette lives in CSS variables at the top (creme `#F4F3ED`, navy `#121434`, lavender `#D2D5F3`)

All body text is lorem ipsum placeholder — replace it in the page components as real content is ready.
