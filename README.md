# Portfolio

Portfolio site for Lucas Bush — structural packaging design.

**Live at:** https://lucasmaxbush-oss.github.io/Portfolio/

Static HTML/CSS/JS. No build step, no dependencies to install. Edit the files,
commit, push — GitHub Pages redeploys in about a minute.

## What's where

```
index.html          The whole page. Every project section lives here.
styles.css          All styling. Colors are CSS variables at the top.
main.js             Image lightbox, video autoplay, 3D viewer fallback.
img/<project>/      Full-size images (max 1600px)
img/<project>/t/    Thumbnails (max 700px) — what the grid loads
video/              Fold animation and drop test, plus poster frames
models/             Web 3D models (.glb)
files/              Résumé, dielines, 3D PDFs, DXF — things people download
```

## How to change things

**Swap or add an image.** Drop the full-size file in `img/<project>/` and a
smaller copy in `img/<project>/t/` under the same name, then copy an existing
`<button class="fig">` block in `index.html` and change the paths and caption.
Thumbnails aren't generated automatically — the site ships them as files.

**Change a color.** Everything comes from the variables in the `:root` block at
the top of `styles.css`. `--cut` is the red accent (cut lines), `--score` is the
teal (fold lines). Both have a dark-mode value further down — change the pair.

**Add a 3D model.** Export STEP from SolidWorks, convert it to `.glb`, drop it
in `models/`, and copy the `<model-viewer>` block. The viewer is
[model-viewer](https://modelviewer.dev/), loaded from a CDN.

**Edit copy.** It's all plain HTML in `index.html`. Project sections are marked
with comments (`<!-- 01 — CAPSTONE -->` and so on).

## Adding a custom domain later

Buy the domain, add a file named `CNAME` at the repo root containing just the
domain (e.g. `lucasbush.design`), then point a CNAME record at
`lucasmaxbush-oss.github.io` with your registrar. GitHub issues the HTTPS
certificate automatically, and the site serves at the domain root rather than
under `/Portfolio/`.

Every path in the site is relative, so it works either under `/Portfolio/` or at
a domain root with no changes. If you'd rather have the bare
`lucasmaxbush-oss.github.io` URL instead, rename this repo to
`lucasmaxbush-oss.github.io` — nothing inside needs editing.

## Notes on the source files

- The 3D PDFs in `files/` are PRC-based and only open interactively in Adobe
  Acrobat — browsers show a blank page. They're labelled as such on the site.
- The capstone project's sponsor is deliberately not named. Keep it that way
  unless that changes.
