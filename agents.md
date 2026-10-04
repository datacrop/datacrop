# Autonomous Agent Context: DataCROP

This file is a context anchor for autonomous AI agents operating in this repository.

## Repository overview
This repository contains the **DataCROP documentation website**, built on **Docusaurus v3** and published to `doc.datacrop.eu`. It documents the current generation, **DataCROP Maize**, and its **Workflow Management Engine (WME)**. It does *not* contain product code; earlier generations (Barley, Farro) appear only in the history page.

## Where the rules live
Structure, front matter, MDX rules, screenshots, styling and site code are documented once in [`docs/developers/contributing-docs.md`](docs/developers/contributing-docs.md). Follow it.

## Agent-specific constraints
1. **No Jekyll**: never add `nav_order`, `layout`, `has_children` or Liquid tags.
2. **MDX strictness**: raw `<`, `>`, `{` or `}` outside code crash the build — wrap them in backticks or use entities.
3. **Slugs**: if you change a slug, add a redirect in `docusaurus.config.ts`.
4. **Screenshots**: blur IP addresses, hostnames and secrets before committing.
5. **Accuracy**: verify behaviour against `maize-workflow-management-editor`, `maize-model-repository`, `maize-processing-engine-airflow`, `maize-processing-engine-worker` and `maize-mvp`; mark unreleased features as *Preview*.
6. **Internal notes**: never commit handoff, verification or security-finding notes to this public repository.

## Before finishing
```bash
npm run typecheck
npm run build
```
The build is the only way to guarantee no MDX errors or broken links. If it fails, read the stack trace, fix the file and build again.
