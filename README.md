# MyStudioChannel-Ravyn

> **Your Content. Your Channel. Your Studio.** — Ravyn's own-twist rebuild of My Studio Channel's creator-platform site.

[![GitHub Pages](https://github.com/agentzlab/MyStudioChannel-Ravyn/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/agentzlab/MyStudioChannel-Ravyn/actions/workflows/pages/pages-build-deployment)
![Last commit](https://img.shields.io/github/last-commit/agentzlab/MyStudioChannel-Ravyn)
![Repo size](https://img.shields.io/github/repo-size/agentzlab/MyStudioChannel-Ravyn)
![Static site](https://img.shields.io/badge/site-static-blue)

**Live preview:** https://agentzlab.github.io/MyStudioChannel-Ravyn/

## Hero

*Screenshot lands with the first build — the hero shot always represents the current state of the page.*

## What's inside

Ravyn's independent rebuild of [mystudiochannel.com](https://mystudiochannel.com/) — Jon's "My Studio Channel" creator-platforms site. It sells studio-style websites for creators: "the look and structure of a major network — powered by a custom plugin, built once and owned by you."

This is the sister build to Trinity's `agentzlab/MyStudioChannel-Remake` — same real copy, Ravyn's own design twist. Key requirements from Jon: **full generated imagery throughout** (no flat placeholder blocks), real copy from the live site, phone-friendly, demo only.

## Design language

- Near-black grounds, warm gold/amber accents (carried over from the current site's identity)
- Big confident display type, generous whitespace
- Dark-mode first — no light theme planned

## Tech stack

| Layer | Choice |
|---|---|
| Markup | Single static `index.html` |
| Styling | Hand-written CSS, no framework |
| Hosting | GitHub Pages (this repo, `main`) |

The source site (`jonbeatz/MyStudioChannel`, private) is Next.js + Payload CMS. The rebuild is static — no CMS, no build step.

## Project structure

```
MyStudioChannel-Ravyn/
├── index.html          # the rebuild (lands with Ravyn's build)
├── assets/
│   └── screenshot.png  # dark-mode hero shot, refreshed on every build
├── docs/
│   └── reference.md    # source-site notes + build context
├── .nojekyll
└── README.md
```

## Workflow

Branch-based changes, no PRs unless Jon asks. Screenshots and the README hero stay current with every build change.
