---
title: Operations
slug: /model-repository/operations/
sidebar_position: 6
---

# Model Repository Operations

This page summarizes the backend flows that do more than simple CRUD. These flows are the main places where API calls trigger external side effects.

## Initialize Resources

Endpoint: `POST /user/v1/initialize-resources`

Triggered from Workflow Editor Settings by admins. It seeds the baseline catalog when entries are missing:

- default Data Interface Types;
- default Data Kinds;
- Worker Asset Category;
- built-in Processor Definitions such as Kafka, Kibana Pipeline, and Logstash Pipeline;
- optional extra processors from `config/extra-processors.json`.

Run initialization before creating real workflows in a fresh deployment. Without it, Warehouse forms may lack templates, default processors, and interface definitions.

## Processor Definition Provisioning

Endpoints:

- `POST /user/v1/dpe/registry/pd`
- `PUT /user/v1/dpe/registry/{id}/pd`
- `GET /user/v1/dpe/registry/pd/{id}/provisioning-status`
- `POST /user/v1/dpe/registry/pd/{id}/reprovision`

`sourceType` controls worker provisioning:

| sourceType | Behavior |
|---|---|
| `MANUAL` or missing | Backend saves the Processor Definition only. Operators must place the processor folder on each worker manually. |
| `GITHUB` | Backend asks every Worker daghandler to clone the configured repo, branch, and optional subdirectory. GitHub token references are resolved from encrypted per-user settings. |
| `COMPOSE_UPLOAD` | Backend sends uploaded `docker-compose.yml` content to every Worker daghandler. |

Provisioning is asynchronous. Create/update responses can succeed while individual workers later report `FAILED`. Use the provisioning-status endpoint for the actual per-worker result.

When a new Worker Asset is created, the backend replays all existing non-manual Processor Definitions onto that worker for the same user.

## Workflow Save, Update, Run, And Stop

Endpoints:

- `POST /user/v1/dpe/registry/po`
- `PUT /user/v1/dpe/registry/{id}/po`
- `DELETE /user/v1/dpe/registry/{id}/po`
- `POST /user/v1/dpe/registry/{id}/po/run`
- Airflow run inspection endpoints under `/user/v1/dpe/registry/{id}/po/runs*`

Saving a workflow persists the Processor Orchestrator, renders a deployment DAG and teardown DAG, and distributes both files to every Worker daghandler. Updating a workflow removes the old DAG files before distributing new ones.

Running a workflow talks to Airflow directly from the backend. The backend unpauses the DAG and creates a DAG run using configured Airflow credentials. Stop behavior uses the generated teardown DAG.

Use `GET /user/v1/dpe/registry/po/{id}/dag-distribution-status` to inspect worker distribution results.

## Logstash Pipelines

Relevant endpoints:

- Processor Manifest save/update/delete under `/user/v1/dpe/registry/pm*`
- `GET /user/v1/monitoring/logstash/pipelines`
- `PUT /user/v1/monitoring/logstash/pipelines/{pmId}/active`
- `DELETE /user/v1/monitoring/logstash/pipelines/orphaned`

When a Logstash Pipeline Processor Manifest is saved or deleted, the backend regenerates Logstash pipeline configuration:

1. Load saved Logstash Pipeline manifests.
2. Resolve compatible input and output Digital Resources using Data Interface Type capability flags.
3. Render pipeline `.conf` files.
4. Regenerate `pipelines.yml`.

Inactive or empty pipelines are omitted from `pipelines.yml`. Logstash hot reload picks up generated file changes from the configured pipeline folder.

## Kibana Visualization Links

Endpoint: `GET /user/v1/visualization/resource/{id}/kibana-link`

The backend resolves a Digital Resource, ensures the relevant Kibana data view exists, and returns a visualization target. For observation-oriented resources, backend logic may create or reuse deterministic Kibana saved objects.

If Kibana reports a saved-object or Lens rendering problem, verify whether the backend reused an existing saved object. Existing Kibana saved objects can make template changes look like they had no effect.

## Settings, Tokens, And Auth

Endpoints:

- `GET /user/v1/settings`
- `POST /user/v1/settings`
- `GET /user/v1/settings/github-tokens`
- `POST /user/v1/settings/github-tokens`
- `DELETE /user/v1/settings/github-tokens/{label}`

Settings are stored per user. Registry tokens and GitHub tokens are encrypted at rest and masked when settings are read. GitHub token values are managed only by dedicated token endpoints; the main settings save flow preserves existing token values when the frontend omits them.

Processor Definition provisioning resolves `githubAccessTokenRef` against the authenticated user's encrypted token labels. Keep Processor Definitions and token labels under the same user when provisioning private repositories.

## AI Logstash Assistant

Endpoint: `POST /api/ai/logstash/chat`

The AI Logstash assistant streams server-sent events. It uses configured `AI_BASE_URL`, `AI_MODEL`, `AI_API_KEY`, and timeout values. The assistant helps author Logstash filter plugin content, but generated filters still need runtime validation by Logstash.

