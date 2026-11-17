# Arrowlogy Launch Guide

A plain-English walkthrough for the person who owns the business but not a terminal.
This guide was written by your AI assistant on 17 November 2026, after the site was
made deployment-ready. Nothing here requires more than a web browser and a free account.

---

## 1. What is already done (nothing to do here)

- **The site is built** at `/Users/avaspatel/arrowlogy-site` — `index.html` plus an
  `assets/` folder (CSS, images, JavaScript). No build tools needed; it is a plain
  static website.
- **You can preview it right now.** Open the Terminal app on your Mac and run:

  ```
  python3 -m http.server 8000 --directory /Users/avaspatel/arrowlogy-site
  ```

  Then open http://localhost:8000 in your browser. Press `Ctrl+C` in the Terminal to stop it.
- **It is now a git repository** (like a save-point system for the code) with an initial
  commit named "Arrowlogy launch site". This is required for GitHub Pages and any
  git-based host. A `.gitignore` file makes sure the 724 MB installer file you add later
  is never accidentally committed.
- **Both free hosting options are pre-configured:**
  - `wrangler.toml` — ready for **Cloudflare Pages** (deploy with one command).
  - `.github/workflows/deploy.yml` — ready for **GitHub Pages** (deploys automatically on push).

---

## 2. Choosing a host: Cloudflare Pages or GitHub Pages?

Both are **free**, both serve your website around the world, and both need one **free
account**. There is no wrong choice; pick the one that feels comfortable.

**Option A — Cloudflare Pages (my recommendation for you)**

- What you need: a free account at cloudflare.com.
- How it deploys: two commands in Terminal (steps below). Wins because:
  - No code-visibility catch — your site files can stay private.
  - The same Cloudflare account later handles your domain's DNS, your email
    forwarding, and even the big installer file (see sections 4–5). One login for everything.
- Once you have an account, run (in the site folder, i.e. after `cd /Users/avaspatel/arrowlogy-site`):

  ```
  wrangler login        # one-time: opens your browser to approve
  wrangler pages deploy # uploads the site
  ```

  Cloudflare prints the web address, e.g. `https://arrowlogy.pages.dev`.

**Option B — GitHub Pages**

- What you need: a free account at github.com.
- How it deploys: create a repository (project folder on GitHub), push the site
  files to it, then turn on Pages. The workflow file already here does the publishing
  automatically every time you push. Wins because:
  - Everything lives in one familiar web interface — upload, edit, publish.
  - More steps for a beginner, and it requires the repository **public** (that's the
    free plan's rule) — anyone can read the site's code and this guide.
- If you pick this, you will need a helper step to push the files (GitHub Desktop app
  is the friendliest way) or ask your AI assistant to do it later.

| | Cloudflare Pages | GitHub Pages |
|---|---|---|
| Cost | Free | Free |
| Account | cloudflare.com | github.com |
| Easiest for a beginner? | Yes — one command | Requires making a public repo + pushing |
| Deploy trigger | Manual command | Automatic on push |
| Can keep code private | Yes | No (public repo on free plan) |

---

## 3. Pointing arrowlogy.com at your site (DNS at Spaceship)

Your domain arrowlogy.com is registered at **Spaceship**. Right now it shows a blank
"placeholder" page. To connect it to your host you add records (kind of like forwarding
addresses) at Spaceship. Log in to Spaceship → find **DNS** (or "Domain management") →
**Add record**.

Rule of thumb: **DNS changes take from a few minutes to a few hours to spread worldwide,
sometimes up to 48 hours. Don't panic if the new site and old page swap slowly.**

**If you chose Cloudflare Pages (recommended):**
1. In Cloudflare, add your site/domain (dashboard → "Add site" → arrowlogy.com, free plan).
2. Cloudflare shows you **two nameserver addresses** (like `abc.ns.cloudflare.com`).
3. At Spaceship, replace the current nameservers with those two (Spaceship → DNS →
   nameservers → paste). This "moves" DNS to Cloudflare in one go.
4. Back in Cloudflare: Pages → your project → **Custom domains** → add `arrowlogy.com`.
   Cloudflare sets up the CNAME (an "alias" record) automatically.

**If you chose GitHub Pages:**
1. In your GitHub repo: Settings → Pages → Custom domain → type `arrowlogy.com` → Save.
2. At Spaceship, add a **CNAME** record: name `www`, points to
   `<youruser>.github.io` (the address GitHub shows you).
3. For the bare domain (arrowlogy.com, no "www"), add **four A records**, all pointing
   to GitHub's servers: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`. (A records map a name to a server — that's what GitHub uses.)
4. Go back to GitHub Settings → Pages and confirm the domain shows "DNS check successful".

---

## 4. The 724 MB installer (DMG) problem

The Download button on the site links to `downloads/Arrowlogy-0.2.17-arm64.dmg`.
That file doesn't exist yet, so **clicking it shows a 404 "not found" page right now.
That's expected and fine until launch day.**

One hard fact: Cloudflare Pages lets each file be **at most 25 MB**, and GitHub Pages
isn't practical for a 724 MB file either. So the DMG must live somewhere else, and the
button's link must be changed to point at it. Your options:

- **A. GitHub Releases (recommended — easiest).** Free. After you make your GitHub
  account/public repo: repo page → **Releases** → **Create a new release** → drag the
  DMG in (your browser uploads it) → copy the download link → paste it into the site's
  Download button. Done in about five minutes. Downside: it's on a public repo, and the
  file is visible to anyone with the link — fine for a free download product.
- **B. Cloudflare R2 (best if you chose Cloudflare).** Free tier includes 10 GB of
  storage and no download fees. Dashboard → R2 → Create a **public bucket** → connect a
  simple web address like `files.arrowlogy.com` (needs DNS on Cloudflare as in section 3).
  A bit more setup, but it keeps everything inside Cloudflare and your code can stay private.
- **C. Any simple file host.** Dropbox/Google Drive shared link, Bunny, etc. Upload, copy
  the link, paste it into the button. Works, but links can be less stable — fine for a launch.

**My recommendation: GitHub Releases.** It is the simplest drag-and-drop path, is
entirely free, and gives you a permanent link like:
`https://github.com/YOURUSER/YOURREPO/releases/latest/download/Arrowlogy-0.2.17-arm64.dmg`

(You only do this once; put the real link in place of `downloads/Arrowlogy-0.2.17-arm64.dmg`
in `index.html`. The folder itself is kept safely empty in the repo.)

---

## 5. Email: making hello@arrowlogy.com work (free)

- **Option A — Cloudflare Email Routing (if you use Cloudflare).** Free; it *forwards*
  mail — nobody at arrowlogy needs a new inbox. Dashboard → **Email** → **Email Routing**
  → enable → add `hello@arrowlogy.com` → enter an inbox you already use (e.g. your Gmail).
  You can also reply from Gmail as hello@arrowlogy.com. Needs the domain's DNS on
  Cloudflare (same step as section 3, so do both together).
- **Option B — Zoho Mail free tier.** A real, proper mailbox (5 GB free). Sign up at
  zoho.com/mail with your domain; Zoho's setup wizard shows you records to add — usually
  an **MX** record plus a "SPF/TXT" record — copy them into Spaceship → DNS → Add record.
  Welcome email addresses don't need code changes; add `hello@arrowlogy.com` to the site
  later when it has an inbox.

Either way the pattern is the same: *the email provider tells you what records to create;
you paste them at Spaceship; mail starts flowing within a few hours.*

---

## 6. Pre-launch checklist (do before telling the world)

- [ ] **Trademark check.** Search uspto.gov and a normal Google search for "Arrowlogy".
  If another software product owns that name in your market, consider changing the name
  before you build an audience. (Filing a trademark later costs roughly $250–$600; not
  required to launch.)
- [ ] **Remotion license note.** Arrowlogy uses Remotion, which is free to use **while
  your company has 3 or fewer employees**. If you grow past 3 people, buy a Remotion
  company license before then — a small annual cost, decided by Remotion's licensing.
- [ ] **Real screenshot for the "See it working" section.** Right now that section shows a
  CSS *mock* (a pretend editor). Replace it with a real screenshot of the actual app.
- [ ] **Final copy pass.** Read every line on the page once, out loud: typos, claims that
  must be true ("no account required"), and the download link.
- [ ] **Upload the DMG + update the button** (section 4), then click the button yourself.
- [ ] **Email test.** Send a message to hello@arrowlogy.com and check it arrives.
- [ ] **DNS + HTTPS test.** Visit https://arrowlogy.com from your laptop *and* your phone.

---

## 7. What I could not do for you (needs your accounts)

These require your own accounts, passwords, or decisions — none of them were created or
run during prep:

- Create a Cloudflare or GitHub account, or log in with yours (no `wrangler login`, no deploy).
- Create the GitHub repository, push the code, or enable Pages.
- Upload the 724 MB DMG / provide a download link, or edit the button's final URL.
- Change any DNS records at Spaceship, or switch nameservers.
- Create the hello@arrowlogy.com mailbox or forwarding.
- Buy the Remotion license, file trademarks, or make legal decisions.

**Your next step, in one line:** pick Cloudflare or GitHub in section 2 — and everywhere
after that is just the free account sign-up and this guide's steps.