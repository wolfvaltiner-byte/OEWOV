# OE-WOV — Wolf Valtiner Personal Brand Site

## Getting started in VS Code

Open this folder in VS Code:

```bash
code .
```

Install the Live Server extension if you haven't already (ritwickdey.liveserver), then right-click `index.html` and choose **Open with Live Server**. The site runs at `http://127.0.0.1:5500`.

---

## Project structure

```
oewov-site/
├── index.html              # All seven sections
├── css/
│   └── style.css           # Design tokens, layout, animations
├── js/
│   └── main.js             # Scroll reveals, checklist, nav, count-up
├── assets/
│   ├── video/
│   │   └── hero.mp4        # Takeoff footage — the hero background
│   ├── images/
│   │   └── hero-poster.jpg # Fallback for mobile / no autoplay
│   └── fonts/              # (empty — fonts loaded from Google Fonts)
└── README.md
```

**One file still needed:** `assets/Wolf_Valtiner_CV.pdf` — drop your CV in there and both download buttons will work immediately.

---

## Working with Claude Code

Once you have Claude Code installed (`npm install -g @anthropic-ai/claude-code`), open a terminal in VS Code and run:

```bash
claude
```

Claude Code reads the entire project and can make targeted edits across multiple files simultaneously. Good starting prompts once you're in:

- *"Update the logbook entries with the correct dates and descriptions from my actual CV"*
- *"Add a dark/light mode toggle to the nav"*
- *"Optimise the hero video for faster load — add a WebM version"*
- *"Translate the site into German as a second language option"*

---

## Deployment

The site is static — no build step, no dependencies beyond the Google Fonts CDN link.

**GitHub Pages** (free, fast): push the folder to a repo, enable Pages from the root of `main`.

**Netlify** (recommended): drag the folder onto netlify.com/drop. Done. Custom domain support is straightforward.

---

## Callsign

OE-WOV appears in the nav, footer, logbook entries, and the contact section. If you ever want to change how prominently it features, search for `OE-WOV` across the project — it appears in exactly the right places.

---

## Colours (quick reference)

| Token            | Hex       | Used for                    |
|------------------|-----------|-----------------------------|
| `--sky-deep`     | `#0A0E1A` | Main dark background        |
| `--sky-night`    | `#111827` | Mid-dark sections           |
| `--horizon`      | `#F0A830` | Amber accent — all key hits |
| `--cloud`        | `#E8EDF4` | Light section (logbook)     |
| `--white`        | `#FFFFFF` | Primary text on dark        |

All colours live as CSS custom properties in `:root` — one change propagates everywhere.
