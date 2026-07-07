# Artwork images

Put the image files for published art here (`.jpg` or `.png`, ideally
under ~2 MB each).

To display one in the gallery:

1. Add the file to this folder, e.g. `public/art/my-painting.jpg`
2. In `src/data/works.ts`, set that work's `imageUrl` to `"/art/my-painting.jpg"`
3. Commit and push — the site redeploys automatically

You can also use a full `https://` link to an image hosted elsewhere
(Imgur, a Google Drive direct link, etc.) instead of committing the file.
