# Arrowlogy Site

Static marketing site for **Arrowlogy** — a browser-based video editor with cloud processing, currently in private beta. Live at **[https://arrowlogy.com](https://arrowlogy.com)**.

## What is this?

A plain static website (no build step, no framework): HTML + `assets/` (CSS, images, JS). The page's jobs are:

- Explain the browser editor and the cloud-processing model
- Collect private-beta waitlist requests via `mailto:hello@arrowlogy.com?subject=Arrowlogy%20beta`
- Publish the legal pack (Terms, Privacy, Refunds, Acceptable Use, Security, Subprocessors)

There is **no macOS download** on this site. The editor is not publicly live yet, and no page should claim otherwise.

## Deploy

Hosted on **Cloudflare Pages** (project `arrowlogy`, domain `arrowlogy.com`). From this folder:

```sh
npx wrangler pages deploy --project-name arrowlogy --branch main
```

Config lives in [`wrangler.toml`](wrangler.toml) — `pages_build_output_dir = "."` means the repo root is the site root. No build command needed. Cloudflare Pages serves `terms.html` at `/terms` (clean URLs), so no redirect rules are needed for the legal pages.

## Pages

| File | URL |
|---|---|
| `index.html` | `/` |
| `terms.html` | `/terms` |
| `privacy.html` | `/privacy` |
| `refunds.html` | `/refunds` |
| `acceptable-use.html` | `/acceptable-use` |
| `security.html` | `/security` |
| `subprocessors.html` | `/subprocessors` |

`robots.txt` and `sitemap.xml` list all of the above. When you add a page, update both.

## Legal status

Every legal page carries the line **"Last updated 26 November 2026 · Beta — pending counsel review"** and states plainly that it has not been reviewed by a lawyer. Governing law and jurisdiction are placeholders marked for counsel. See `~/.openchatcut/WEB-PIVOT/LEGAL-PACK.md` for what is published and what counsel must finalise.

## Updating copy

Everything is hand-written HTML. Edit, commit, deploy. Keep the brand spelling exactly **Arrowlogy**.

## Analytics

- **Cloudflare Web Analytics** (free tier), manual beacon in each page's `<head>`.
- The beacon excludes EU visitors by default (opt-in consent), so EU traffic may be undercounted.
- View in the Cloudflare dashboard → **Analytics → Web analytics**.

## Other files

- `LAUNCH-GUIDE.md` — historical hosting notes from the desktop-app era (not current).
- `_redirects` — sends stale doc paths to the home page so old Markdown isn't publicly served.
