# Nguyễn Vũ Bách — Portfolio

An interactive, bilingual (EN/VI) portfolio with motion inspired by
[pacomepertant.com](https://pacomepertant.com) — a **list** view (center scroll
column of projects) and a **spiral** view (3D helix of project cards), driven by
smooth scroll.

## Stack
- Static HTML / CSS / vanilla JS
- [GSAP](https://gsap.com) (menu, transitions, reveals) — vendored in `js/vendor/`
- [Lenis](https://github.com/darkroomengineering/lenis) (smooth scroll) — vendored
- Google Fonts: Inter + Space Mono

No build step.

## Structure
```
index.html          markup + font/script loading
css/style.css       all styling
js/data.js          ← EDIT ME: projects, awards, about, i18n text
js/app.js           engine (scroll → list/spiral, cursor, menu, sound, lang)
js/vendor/          gsap + lenis (offline copies)
assets/img/         project screenshots
```

## Interactions
- **Scroll** advances through projects (both views).
- **spiral / list** toggle (top center) — or press **V**.
- **menu** (top right) opens About / Awards / Skills / Education / Contact.
- **EN / VI** language toggle (bottom right).
- **sound** toggle (bottom right) — subtle synthesized UI ticks, off by default.
- **Logo** (top left) scrolls back to the top.
- Click a spiral card or **visit site** to open the live project.

## Edit content
Everything lives in `js/data.js`. Add a project to the `projects` array; drop its
screenshot(s) in `assets/img/` and reference them in `images`. Projects without a
live URL / screenshot render a styled placeholder card.

## Run locally
Open `index.html` directly, or serve the folder:
```bash
npx serve .
```

## Deploy to Netlify
- **Drag & drop:** zip this folder (or the folder itself) into the Netlify dashboard.
- **Git:** connect the repo — `netlify.toml` sets publish dir to the root, no build command.
