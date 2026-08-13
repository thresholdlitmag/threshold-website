# Design source files

Master artwork, kept out of `public/` on purpose.

Anything in `public/` is copied verbatim into the built site, so an
11 MB master logo sitting there would be downloaded as part of the
deploy even though no page ever links to it. Source files live here
instead, and only the exported sizes go in `public/`.

## logo-master.png

The magazine's logo, 10009 × 10009. The favicons in `public/` are
generated from it. To regenerate them after the logo changes:

```bash
python - <<'PY'
from PIL import Image
img = Image.open("design/logo-master.png").convert("RGBA")
for path, size in {
    "public/favicon-32.png": 32,
    "public/favicon-192.png": 192,
    "public/apple-touch-icon.png": 180,
}.items():
    img.resize((size, size), Image.LANCZOS).save(path, "PNG", optimize=True)
PY
```

The sizes are referenced from `index.html`; add a `<link>` there if you
export a new one.
