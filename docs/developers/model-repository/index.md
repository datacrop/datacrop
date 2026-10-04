---
title: Model Repository backend
slug: /developers/model-repository/
sidebar_position: 1
description: Backend responsibilities and integration boundaries for the Workflow Management Engine.
---

# Model Repository backend

The Maize Model Repository is the Spring Boot backend for the Workflow Management Engine (WME). It is the contract boundary between the Workflow Editor, persisted catalog data, worker provisioning, Airflow DAG execution, Logstash/Kibana services, Flower worker discovery, and the AI Logstash assistant.

Use this guide when you need to integrate against backend APIs, understand backend code structure, or reason about side effects triggered by saving processors and workflows.

## Backend responsibilities

The backend owns:

- user-scoped catalog persistence in MongoDB;
- Data Interface Type, Digital Resource, Data Kind, Worker Asset, Processor Definition, Processor Manifest, Workflow, Workflow Template, Observation, and Settings APIs;
- processor source provisioning onto registered workers;
- Airflow DAG rendering, distribution, run monitoring, and log retrieval;
- Logstash pipeline file generation and pipeline status monitoring;
- Kibana data-view and visualization link resolution;
- encrypted registry, GitHub token and AI provider storage;
- worker runtime relay (containers, logs, start/stop/restart) through the worker agents;
- the Workflow Assistant API *(preview, `dev/ai-feature`)*;
- Keycloak JWT validation and user identity extraction.

The frontend never talks directly to workers, Airflow, MongoDB, Logstash, Kibana, or Flower. Those calls go through the backend.

## Service dependencies

| Dependency | Role | Typical config |
|---|---|---|
| MongoDB | Stores catalog entities, settings, workflow templates, observations, and status records. | `MONGO_*` env vars |
| Keycloak | Issues JWTs used by the editor and API clients. | `KEYCLOAK_*` env vars |
| Worker daghandler | Receives processor folders and generated DAG files. | Worker Asset `IP` / `PORT`, plus `WORKER_API_PORT` default |
| Airflow webserver | Runs and reports workflow DAG executions. | `AIRFLOW_BASE_URL`, `AIRFLOW_USERNAME`, `AIRFLOW_PASSWORD` |
| Logstash | Loads generated pipeline configuration and exposes monitoring metrics. | `LOGSTASH_*` env vars |
| Kibana | Provides data views, Discover links, and generated visualization destinations. | `KIBANA_*` env vars |
| Flower | Lists live Celery workers for import into WME. | `FLOWER_*` env vars |
| AI provider | OpenAI-compatible model for the Logstash assistant and the Workflow Assistant. | `AI_*` env vars, per-user settings |

The backend listens on `SERVER_PORT`, usually `9090`. SpringDoc is exposed at `/swagger-ui/index.html` (also reachable via `/swagger-ui.html`) and `/v3/api-docs`.

## Source of truth

Use the generated OpenAPI document for exhaustive request and response schemas. Use these public docs for onboarding, conventions, examples, and side-effect summaries.

The backend repo also contains internal flow notes under `maize-model-repository/docs/`:

- processor definition provisioning;
- worker registration fan-out;
- workflow save/run flows;
- auth and settings token handling.

Keep detailed controller annotations, DTO/entity details, and internal diagrams in the backend repo. Keep public usage guidance and curated examples in this docs site.

## Backend guide map

- [API Reference](/developers/model-repository/api-reference/) - endpoint groups, auth, pagination/search conventions, and examples.
- [Code Structure](/developers/model-repository/code-structure/) - package/layer map and where to change behavior.
- [Domain Model](/developers/model-repository/domain-model/) - glossary of core backend objects.
- [Operations](/developers/model-repository/operations/) - side-effectful flows and runtime contracts.
