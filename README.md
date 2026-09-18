# Portfolio

Portfolio site for Lucas Bush, structural packaging design.

**Live at:** https://lucasmaxbush-oss.github.io/Portfolio/

Static HTML/CSS/JS. No build step, no dependencies to install. Edit the files,
commit, push, and GitHub Pages redeploys in about a minute.

## What's where

```
index.html          The whole page. Every project section lives here.
styles.css          All styling. Colors are CSS variables at the top.
main.js             Image lightbox, video autoplay, 3D viewer fallback.
img/<project>/      Full-size images (max 1600px)
img/<project>/t/    Thumbnails (max 700px), what the grid loads
video/              Fold animation and drop test, plus poster frames
models/             Web 3D models (.glb)
files/              Résumé, dielines, 3D PDFs, DXF, things people download
```

## How to change things

**Swap or add an image.** Drop the full-size file in `img/<project>/` and a
smaller copy in `img/<project>/t/` under the same name, then copy an existing
`<button class="fig">` block in `index.html` and change the paths and caption.
Thumbnails aren't generated automatically; the site ships them as files.

**Change a color.** Everything comes from the variables in the `:root` block at
the top of `styles.css`. `--cut` is the red accent (cut lines), `--score` is the
teal (fold lines). Both have a dark-mode value further down, change the pair.

**Add a 3D model.** Export STEP from SolidWorks, convert it to `.glb`, drop it
in `models/`, and copy the `<model-viewer>` block. The viewer is
[model-viewer](https://modelviewer.dev/), loaded from a CDN. Put the STEP file
in `files/` too and link it under the viewer, so people can open the geometry.

**If a new model looks flat and grey,** it's the material, not the lighting.
STEP converters export every material at `metallicFactor` 1.0 and
`roughnessFactor` 1.0 — fully metal and fully rough, which gives almost no
specular response, so nothing picks out the contours. The models here are set
to metallic 0.10 / roughness 0.40, which reads like moulded plastic. Those
values live in two places: baked into each `.glb`, and as `ROUGHNESS` and
`METALNESS` at the top of `main.js`, which reapplies them on load. Lower
roughness is glossier; metalness above about 0.3 goes chrome.

**Edit copy.** It's all plain HTML in `index.html`. Project sections are marked
with comments (`<!-- 01 : MILWAUKEE TOOL -->` and so on).

## Adding a custom domain later

Buy the domain, add a file named `CNAME` at the repo root containing just the
domain (e.g. `lucasbush.design`), then point a CNAME record at
`lucasmaxbush-oss.github.io` with your registrar. GitHub issues the HTTPS
certificate automatically, and the site serves at the domain root rather than
under `/Portfolio/`.

Every path in the site is relative, so it works either under `/Portfolio/` or at
a domain root with no changes. If you'd rather have the bare
`lucasmaxbush-oss.github.io` URL instead, rename this repo to
`lucasmaxbush-oss.github.io`, and nothing inside needs editing.

## Notes on the source files

- Every SolidWorks project on the site is now an interactive model with a STEP
  download. The old 3D PDFs are PRC-based, only open in Adobe Acrobat, and show
  a blank page in a browser, so nothing links to them any more. The leftover
  files in `files/` can be deleted whenever you get to it.
- The capstone project's sponsor is deliberately not named. Keep it that way
  unless that changes.
- GitHub Pages caches `main.js` and `styles.css` for about ten minutes. After a
  push, a browser you've already visited in may serve the old copy for that
  long. A hard refresh (Ctrl+Shift+R) gets the new one immediately.
