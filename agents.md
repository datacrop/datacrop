# Autonomous Agent Context: DataCROP

This file serves as a system context anchor for any autonomous AI agents (DevTools, SWE-agent, AutoGPT, etc.) operating in this repository.

## Repository Overview
This repository contains the **DataCROP Documentation Website**, built on **Docusaurus v3**. It does *not* contain the core backend Python/Java processors or the frontend workflow editor. It is strictly the documentation hub for the entire DataCROP ecosystem (Barley, Farro, Maize).

## Architecture Map
- **Config**: `docusaurus.config.ts`, `sidebars.ts`, `package.json`
- **Content**: `docs/` (Markdown & MDX files mapped to the sidebar)
- **UI/Pages**: `src/pages/` (React pages, notably `index.tsx` for the landing page)
- **Styling**: `src/css/custom.css` (Vanilla CSS, custom CSS variables override Docusaurus defaults)
- **Assets**: `static/` (Images, icons, CNAME)
- **CI/CD**: `.github/workflows/deploy.yml` (GitHub Pages deployment via GitHub Actions)

## Critical Constraints for Agents

1. **NO JEKYLL**: This site was migrated away from Jekyll. If you find legacy `.markdown` files or Jekyll frontmatter (`nav_order`, `layout`, `has_children`), you are looking at old context. Ensure all new docs use Docusaurus `.md` or `.mdx` format.
2. **MDX Strictness**: Docusaurus uses MDX for its markdown parser. 
   - **Do not** write raw `<` or `>` characters outside of code blocks, as they will be parsed as unclosed JSX tags and crash the build.
   - **Do not** write unescaped curly braces `{ }` outside of code blocks, as they will be parsed as JavaScript expressions and crash the build.
3. **Structure**: `docs/` has five top-level folders, one per navbar section and sidebar: `intro/` + `getting-started/`, `user-guide/`, `deploy/`, `developers/`, `reference/`. A sub-folder needs an `index.md` (the category page) and a `_category_.json` (`label`, `position`). Order pages with `sidebar_position`. If you change a slug, add a redirect in `docusaurus.config.ts`.
4. **Screenshots and media**: put UI screenshots in `static/img/screens/` and embed them with `<Screenshot src="/img/screens/name.jpg" caption="…" />` (no import needed). Blur IP addresses, hostnames and secrets before committing. The explainer video is embedded with `<VideoEmbed />`. Diagrams are Mermaid code blocks.
5. **Accuracy**: this site documents the code in `maize-workflow-management-editor`, `maize-model-repository`, `maize-processing-engine-airflow`, `maize-processing-engine-worker` and `maize-mvp`. Verify behaviour against those repositories; mark unreleased features as *Preview*.

## Agent Action Checklist
Before committing or finalizing a task, an agent MUST run:
```bash
npm run build
```
This is the only way to guarantee that no MDX syntax errors were introduced. If the build fails, parse the Docusaurus stack trace, fix the unescaped character in the specific markdown file, and build again.
