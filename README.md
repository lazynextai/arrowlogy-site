# Arrowlogy Site

Static marketing / download site for **Arrowlogy** — the free, open-source, offline-first AI video editor for macOS. Live at **[https://arrowlogy.com](https://arrowlogy.com)**.

## What is this?

A plain static website (no build step, no framework): `index.html` + `assets/` (CSS, images, JS). The page’s main jobs are:

- Introduce the product and its features
- Link to the macOS DMG download
- Point at the GitHub repo and licence (AGPL-3.0, built on OpenChatCut)

## Deploy

Hosted on **Cloudflare Pages** (project `arrowlogy`, domain `arrowlogy.com`). From this folder, with Node 24.22.1 via fnm:

```sh
fnm exec --using=24.22.1 -- wrangler pages deploy
```

Config lives in [`wrangler.toml`](wrangler.toml) — `pages_build_output_dir = "."` means the repo root is the site root. No build command needed.

## DMG download link

The download button points at the **GitHub release asset**, not this repo:

```
https://github.com/lazynextai/arrowlogy/releases/latest/download/Arrowlogy-0.2.18-arm64.dmg
```

Cloudflare Pages caps files at 25 MB, so the ~700 MB DMG is hosted on the [Arrowlogy GitHub Releases](https://github.com/lazynextai/arrowlogy/releases). To bump the version, update the link + the release asset name in `index.html` (search for `releases/latest/download/`).

## Updating copy

Everything (copy, hero, feature list, footer attribution) is hand-written in `index.html`. Edit it directly, then commit and push — Cloudflare Pages auto-deploys from `main`.

## Analytics

- Tool: **Cloudflare Web Analytics** (free tier).
- Install method: manual JS snippet in `index.html` (see `data-cf-beacon` token near the top). It is a standalone RUM beacon, independent of zone/dashboard settings.
- Where to view: Cloudflare dashboard → **Analytics → Web analytics** (admin@arrowlogy.com account), or directly:
  `https://dash.cloudflare.com/<account>/web-analytics`
- Note: the beacon excludes EU visitors by default (opt-in consent), so traffic from the EU may be undercounted — expected behaviour.

## Other files

- [`LAUNCH-GUIDE.md`](LAUNCH-GUIDE.md) — plain-English walkthrough of hosting/deploy decisions.
- `robots.txt`, `sitemap.xml` — SEO basics for `arrowlogy.com`.
- `.github/workflows/deploy.yml` — optional GitHub Pages pipeline (not the primary deploy path).