# Contributing to DataCROP Documentation

Thank you for helping improve the DataCROP docs. The site is built with [Docusaurus 3](https://docusaurus.io/) and published to https://doc.datacrop.eu.

**The writing rules, folder structure and conventions live in one place:** [`docs/developers/contributing-docs.md`](docs/developers/contributing-docs.md) (rendered at https://doc.datacrop.eu/developers/contributing-docs/). Please read it before you start.

## Local development

```bash
npm ci
npm start        # live-reloading dev server on http://localhost:3000
npm run build    # production build — fails on broken links or MDX errors
```

## Pull requests

1. Run `npm run build` and `npm run typecheck`; both must pass.
2. Commit your changes to a new branch.
3. Open a pull request targeting `main`. After merge, GitHub Actions builds `main` and deploys it to GitHub Pages.
