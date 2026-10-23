# Quarterdrop LLC

Company website for Quarterdrop LLC, served at **https://quarterdropgames.com** by GitHub Pages from the root of the `main` branch.

## Company

| | |
|---|---|
| Legal name | Quarterdrop LLC |
| Entity | Michigan limited liability company, formed 2026 |
| Location | Novi, Michigan, United States |
| D-U-N-S | 149991287 |
| Contact | acornaut@outlook.com |
| Apple Developer team | 7DH55F49XW (individual to organization migration requested 15 Oct 2026) |
| Products | Acornaut: https://acornaut.io (game), https://acornaut.app (web build and privacy policy) |

The website is the organization website Apple's migration review asks for: it must be public, and it must identify the organization. Keep the legal name, the location and the D-U-N-S visible on the home page.

## What is here

| File | Purpose |
|---|---|
| `index.html` | Home page: hero, games, studio facts, contact |
| `privacy.html` | Privacy policy for this website (each game has its own) |
| `404.html` | Page GitHub Pages shows for a missing address |
| `assets/site.css` | All styles; colors and type are tokens at the top |
| `assets/fonts/` | Archivo and JetBrains Mono, self-hosted, with their OFL licenses |
| `assets/acornaut-icon.webp` | Acornaut app icon for the games card |
| `assets/og.png` | Link-preview image (1200 × 630) |
| `favicon.svg` | Browser tab icon |
| `CNAME` | Tells GitHub Pages the custom domain |
| `.nojekyll` | Serves files as they are, without Jekyll |
| `robots.txt`, `sitemap.xml` | Search engines |

No build step, no JavaScript, nothing loaded from other servers. Edit the HTML and push.

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
