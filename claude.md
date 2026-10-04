# AI Assistant Guidelines for DataCROP

Hello Claude / AI Assistant! If you are reading this file, you have been invoked to help work on the DataCROP repository. Please follow the guidelines below to ensure a smooth and consistent development experience.

## 1. Project Context
DataCROP is a highly configurable framework for real-time data collection, transformation, filtering, and management, often used in IoT and cybersecurity domains.

This repository specifically houses the **documentation site** for DataCROP, which has been migrated to **Docusaurus v3**.

## 2. Directory Structure & Where to Work
- **`docs/`**: This is where all the actual markdown content lives. Each top-level folder is one navbar section with its own sidebar (`sidebars.ts`):
  - `intro/` + `getting-started/` → **Get started**: overview, key concepts, architecture, what's new, history, quickstart and walkthroughs.
  - `user-guide/` → **User guide**: one page per editor feature (Warehouse, Workflow Lab, Logstash, observations, Kibana, Worker Runtime, assistant, settings, troubleshooting).
  - `deploy/` → **Deploy**: Maize MVP, manual per-component setup, workers, configuration reference, AI providers, operations.
  - `developers/` → **Developers**: deployment internals, writing processors, processor catalogue, backend, frontend, assistant runtime, worker agent API, security.
  - `reference/` → **Reference**: glossary, interface types, data kinds, env-var convention, ports, REST API, changelog.
- **Redirects**: old slugs are redirected in `docusaurus.config.ts` (`@docusaurus/plugin-client-redirects`). Add one whenever you change a slug.
- **`src/`**: Contains React components and styling.
  - `src/pages/index.tsx`: The custom React-based landing page.
  - `src/css/custom.css`: Global styles and brand colors (indigo palette).
- **`static/`**: Static assets. UI screenshots live in `static/img/screens/` (1400×867-ish browser captures with IP addresses blurred) and are embedded with `<Screenshot src="/img/screens/…" caption="…" />`. The explainer video lives in `static/video/` and is embedded with `<VideoEmbed />`. Both components are registered globally in `src/theme/MDXComponents.tsx`.
- **Diagrams**: Mermaid code blocks (`@docusaurus/theme-mermaid`).

## 3. Technology Stack & Rules
- **Docusaurus v3**: We use the standard classic preset.
- **TypeScript & React**: Used for custom pages and components.
- **Markdown / MDX**: All documentation files are written in Markdown/MDX. Folders with sub-pages have an `index.md` and a `_category_.json` (label, position).
- **Accuracy**: Describe the product as implemented in the code repositories (`maize-workflow-management-editor`, `maize-model-repository`, `maize-processing-engine-*`, `maize-mvp`). Mark unreleased features with a *Preview* admonition.
- **Search**: We use `@easyops-cn/docusaurus-search-local` for offline search capabilities.

## 4. Markdown Formatting Rules
- **Frontmatter**: Every file in `docs/` must begin with YAML frontmatter containing `title`, `slug`, `sidebar_position` and `description`.
  - *Note*: We do NOT use legacy Jekyll frontmatter (`nav_order`, `permalink`, `has_children`, `layout`). Do not add them.
- **Liquid Tags**: Do NOT use Jekyll Liquid tags (e.g., `{% raw %}`, `{{ variable }}`). In MDX, curly braces `{}` are parsed as JavaScript expressions, which will break the build if unescaped. If you must show curly braces in text, wrap them in backticks (e.g., `` `{my_var}` ``) or escape them.
- **JSX Tags**: Unclosed HTML-like syntax (e.g., `<->`) will break MDX. Always use HTML entities (e.g., `&lt;-&gt;`) or wrap them in code blocks.

## 5. Local Development
If you need to verify your changes, you can instruct the user (or use a background task) to run:
```bash
npm install
npm start
```
To verify that your markdown changes do not break the MDX compiler, always run:
```bash
npm run build
```

Thank you for helping maintain DataCROP!
