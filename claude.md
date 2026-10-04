# AI Assistant Guidelines for DataCROP

This repository is the **documentation site** for DataCROP Maize and its Workflow Management Engine (WME), built with **Docusaurus v3**.

- **Conventions**: structure, front matter, MDX rules, screenshots, styling and site code are documented in [`docs/developers/contributing-docs.md`](docs/developers/contributing-docs.md). Follow it.
- **Agent constraints**: see [`agents.md`](agents.md) (no Jekyll, MDX escaping, redirects on slug changes, redacted screenshots, accuracy against the source repositories, no internal notes in this public repo).
- **Styling**: all theme styling is in `src/css/custom.css`, driven by `--dc-*` tokens over the indigo palette. Reuse the tokens and the `button--primary` / `button--tinted` / `button--subtle` variants rather than hard-coding colours.

Before finishing any change, run:

```bash
npm run typecheck
npm run build
```
