# Quarterdrop brand and website refresh

## Assessment

The original site had a clear arcade metaphor, local fonts, a simple publishing path and visible company identity. It lacked a distinctive studio mark and substantial game presentation. The coin loop faded abruptly during its drop. The generic app-icon card and differently styled itch.io embed gave the two games uneven treatment. Copy described all games as free to start even though the Space Survival listing offers a paid development build.

## Implemented

- Kept the paper/ink/blue palette and arcade origin, with a new Q/coin mark, editorial typography, consistent spacing and clearer navigation.
- Rebuilt the coin as scalable vector/CSS artwork with a metallic finish, perspective, pointer tilt, a finite highlight and an intentional drop interaction. No animation library or animation loop runs continuously.
- Presented both games in a common visual system, using existing product assets. Space Survival artwork is explicitly labeled project artwork; its paid development status is clear.
- Added a locally hosted, eight-second Acornaut gameplay dialog. It does not download video until opened and does not autoplay. Escape, backdrop and close-button dismissal pause the video and return focus to the trigger.
- Added a motion control and honored the operating system's reduced-motion preference. The preference is held only in memory. Content and links work without JavaScript.
- Preserved the legal name, Novi location, D-U-N-S, email, custom domain and GitHub Pages deployment path. Updated the privacy page to describe the actual removal of the third-party embed and the temporary motion setting.
- Refreshed secondary pages, search/social metadata, favicon and 1200 × 630 share image. Added release query strings to styles, script, icon and share artwork.

## Asset provenance

Existing assets from the studio's own published sites were downloaded and are served locally:

- Acornaut background: https://acornaut.io/assets/hero-wide.jpg?v=709e5fe2aca4
- Acornaut character: https://acornaut.io/assets/preview-flight.webp?v=3e1dcc5b4e35
- Acornaut gameplay: https://acornaut.io/clips/mode-fly.mp4?v=20045b20c51f
- Gameplay poster: extracted at one second from that clip.
- Space Survival project artwork: https://img.itch.zone/aW1hZ2UvNTAwNjAxMC8yOTk2OTU4NC5qcGc=/794x1000/M1uYXQ.jpg (from https://j6sistek-ui.itch.io/space-survival).
- Existing app icon and licensed Archivo / JetBrains Mono fonts retained.
- Coin, mark and share-card composition authored in vector/CSS; `social-card.html` is the editable share-card source.

## Validation

- `python3 scripts/check_site.py`: all three public pages, local assets, internal anchors, image alternatives, company details, structured data and custom domain pass.
- `node --check assets/site.js` and `git diff --check`: pass.
- Cloud Chrome: desktop and 320 / 390 / 768 / 1024 px iframe viewports; no horizontal page overflow at checked widths. Visual review covered the hero, game cards, studio and contact presentation.
- Coin click updates the accessible status; the disabled button resets after the drop. With motion paused, the same interaction updates status without animation.
- Video playback reaches ready state 4 with no media error; Escape closes the dialog, pauses media and returns focus to its trigger.
- The video has no source before opening. A source variant without the enhancement script retains all primary headings and navigation, and hides inactive buttons.
- Site JavaScript logs show no application errors. Browser-extension metadata errors are unrelated to the page.
- System reduced-motion behavior is implemented in both CSS and JavaScript and was reviewed in source; the browser's OS preference was not changed.

Testing used Chromium, including responsive iframe widths. Physical iPhone/Safari testing remains a separate device check; this is not a claim of exhaustive accessibility certification.
