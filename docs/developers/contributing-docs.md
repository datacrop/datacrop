---
title: Contributing to the docs
slug: /developers/contributing-docs/
sidebar_position: 10
description: How this site is organised and how to change it.
---

# Contributing to the docs

This site is built with **Docusaurus 3** from the [`datacrop/datacrop`](https://github.com/datacrop/datacrop) repository and published to `doc.datacrop.eu` by GitHub Actions on every push to `main`.

## Run locally

```bash
npm ci
npm start          # live-reloading dev server
npm run build      # production build — fails on broken links or MDX errors
npm run serve      # preview the build
```

## Structure

| Folder | Navbar section | Content |
|---|---|---|
| `docs/intro/`, `docs/getting-started/` | Get started | Overview, concepts, architecture, quickstart, walkthroughs |
| `docs/user-guide/` | User guide | One page per editor feature |
| `docs/deploy/` | Deploy | Installation and configuration |
| `docs/developers/` | Developers | Internals and integration |
| `docs/reference/` | Reference | Lookup tables, glossary, changelog |

Each folder has its own sidebar (`sidebars.ts`), ordered by `sidebar_position`. Old URLs are redirected in `docusaurus.config.ts` (`@docusaurus/plugin-client-redirects`) — add a redirect whenever you rename a slug.

## Writing rules

- Every page starts with front matter: `title`, `slug`, `sidebar_position`, `description`.
- Pages are MDX: wrap `{…}` and `<…>` in backticks (e.g. `` `<INTERFACE>_<KEY>_<DIRECTION>` ``) or code blocks.
- Diagrams: Mermaid code blocks (language `mermaid`).
- Titled admonitions use directive syntax, for example `:::caution[Preview]`, because the site enables Docusaurus v4 compatibility flags.
- Screenshots: put them in `static/img/screens/` and use `<Screenshot src="/img/screens/x.jpg" caption="…" />`. **Blur IP addresses, hostnames and secrets before committing.**
- The explainer video is embedded with `<VideoEmbed />`.

## Site code

| Path | Purpose |
|---|---|
| `src/css/custom.css` | Design tokens (`--dc-*`, indigo palette) and all theme styling |
| `src/pages/index.tsx` | Landing page; icons in `src/components/Icons.tsx` |
| `src/components/` | `Screenshot`, `VideoEmbed`, `CopyPageButton`, `OpenInMenu` (the **Open in ChatGPT / Claude / Perplexity** dropdown; logos in `ProviderLogos.tsx`) |
| `src/theme/` | `MDXComponents` (global MDX components) and the `DocBreadcrumbs` wrapper that adds the **Copy page** / **Open in…** split button |
| `plugins/markdown-source.js` | Writes each page's Markdown to `<slug>/index.md` at build time for **Copy page** |

Style buttons with Infima classes plus the site variants: `button--primary`, `button--tinted`, `button--subtle`. Headings use sentence case, except literal UI labels (e.g. **Processor Parameters**) and product or component names.
- Describe the product as it is in the code; mark unreleased features with a *Preview* admonition.
