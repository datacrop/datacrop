---
title: Changelog
slug: /reference/changelog/
sidebar_position: 8
description: Notable changes to the Workflow Management Engine, newest first.
---

# Changelog

Derived from the editor (`maize-workflow-management-editor`) and backend (`maize-model-repository`) histories.

## October 2026

- **Workflow Assistant (Preview)** — chat agent that searches the catalogue, creates data kinds and digital resources (with a secure form for secrets), checks worker readiness and produces workflow drafts for review in the Lab. New `assistant-runtime` service and `/api/assistant` backend API (`dev/ai-feature`).

## September 2026

- Logstash **Active** switch in the processor form follows the real pipeline state.
- Workflow Details: clearer DAG configuration and scheduling layout; the *Keep Alive* option was removed.
- Backend: test fixes after the processor-seeding changes; `NodeDataDAG` cleanup.

## August 2026

- **AI provider settings**: server default or per-user OpenAI-compatible provider with encrypted keys and a connection test; AI Logstash panel restyled.
- Public Kibana base URL (`KIBANA_PUBLIC_BASE_URL`).
- Removed the *Start Page* setting.

## July 2026

- **Worker Runtime** page replaces the Celery Workers Status iframe: containers per worker, health, logs, start/stop/restart, orphans. Processor deployments are labelled `wme.*`.
- **Processor definition wizard** with single-container vs GitHub Compose runtimes, provisioning status, icon picker, ownership (*Mine / Shared / WME managed*) and duplication of shared definitions. Processor-definition modes enforced in the backend; isolated `processors/` path on workers.
- **Bundled GitHub processor pack** seeded by Initialize Resources.
- **Observations**: one-click observation pipelines with source-asset selection; composable `observations` index templates; Observation dashboard with saved search.
- **Kibana**: timestamp-overview dashboards, cached dashboard creation, new visualization link handling.
- **Airflow run monitoring** in the Lab (deployment and teardown runs, steps, logs); post-save countdown before Run.
- **Logstash**: live state indicator and activation toggle on nodes and in the monitor; pipelines no longer need a worker; hardened config rendering; **Beats** interface type.
- **Resources**: parameter categories, "default WME instance" fill, **AKHQ** links for Kafka; Kafka integration reworked around AKHQ.
- **Data kinds**: reworked default schemas, payload shape / cardinality metadata.
- Redesigned nodes and edges, modernized forms, auth splash and branding; Airflow page restricted to admins.
- Elastic setup enforces the basic licence so an expired trial cannot break Kibana.

## Earlier

Maize's earlier history (FAR-EDGE Barley, PROPHESY Farro) is summarized in [About & history](/intro/about/).
