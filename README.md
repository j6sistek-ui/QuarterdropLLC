# Quarterdrop LLC

Company website for Quarterdrop LLC, served at **https://quarterdropgames.com** by GitHub Pages from the root of the `main` branch.

## Company

| | |
|---|---|
| Legal name | Quarterdrop LLC |
| Entity | Michigan limited liability company, formed 2026 |
| Location | Novi, Michigan, United States |
| D-U-N-S | 149991287 |
| Contact | owner@quarterdropgames.com |
| Apple Developer team | 7DH55F49XW (individual to organization migration requested 15 Oct 2026) |
| Products | Acornaut: https://acornaut.io (game), https://acornaut.app (web build and privacy policy) |

The website is the organization website Apple's migration review asks for: it must be public, and it must identify the organization. Keep the legal name, the location and the D-U-N-S visible on the home page.

## What is here

| File | Purpose |
|---|---|
| `index.html` | Home page: hero, games, studio facts, contact |
| `privacy.html` | Privacy policy for this website (each game has its own) |
| `404.html` | Page GitHub Pages shows for a missing address |
| `assets/site.css` | Responsive design, brand tokens and reduced-motion rules |
| `assets/site.js` | Optional coin interaction, motion control and accessible video dialog |
| `assets/fonts/` | Archivo and JetBrains Mono, self-hosted, with their OFL licenses |
| `assets/acornaut-*` | Self-hosted Acornaut artwork, icon and on-demand gameplay clip |
| `assets/space-survival.jpg` | Project artwork from the existing itch.io listing |
| `assets/og.png` | Link-preview image (1200 × 630) |
| `favicon.svg` | Browser tab icon |
| `CNAME` | Tells GitHub Pages the custom domain |
| `.nojekyll` | Serves files as they are, without Jekyll |
| `robots.txt`, `sitemap.xml` | Search engines |

No build step, no runtime dependencies, and no third-party embeds. All page assets are served from this domain. JavaScript progressively enhances the coin and the gameplay dialog; primary content and links remain usable without it. The video source is assigned only when a visitor opens the dialog, and playback requires a separate user action.

Run `python3 scripts/check_site.py`, `node --check assets/site.js`, and `git diff --check` before publishing. The asset/anchor check also protects the required company facts and custom domain. See [the design review](design/README.md) for the assessment, asset sources and QA notes.

The CSS, JS, icon and social image URLs carry a release version. Bump that query string when those assets change so returning visitors receive the new files. GitHub Pages may still briefly cache the HTML; there is no service worker to retain stale pages.

`design/social-card.html` is the editable 1200 × 630 social-image source. Render it at its fixed size and export that rectangle to `assets/og.png`.

## Publishing

1. **GitHub Pages:** Settings → Pages → Source: Deploy from a branch → Branch: `main`, folder `/ (root)`. Custom domain: `quarterdropgames.com`. Tick **Enforce HTTPS** once it becomes available (it needs the DNS records below and can take up to an hour).
2. **DNS at Porkbun** for `quarterdropgames.com`. Delete the parking records first (the default ALIAS/CNAME to `pixie.porkbun.com` or the link-in-bio page), then add:

   | Type | Host | Answer |
   |---|---|---|
   | A | *(blank)* | 185.199.108.153 |
   | A | *(blank)* | 185.199.109.153 |
   | A | *(blank)* | 185.199.110.153 |
   | A | *(blank)* | 185.199.111.153 |
   | CNAME | www | j6sistek-ui.github.io |

3. **Check:** https://quarterdropgames.com loads the home page with a padlock, and https://www.quarterdropgames.com redirects to it.

## Other Quarterdrop domains

`quarterdrop.app`, `quarterdrop.io` and `quarterdrop.games` are registered at Porkbun and serve nothing. Point each at `https://quarterdropgames.com` with Porkbun's URL forwarding (permanent 301, wildcard on) so no address shows a parking page.
