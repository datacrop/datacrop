---
title: Architecture
slug: /intro/architecture/
sidebar_position: 3
description: The components of a WME deployment and how a workflow travels from the editor to running containers.
---

# Architecture

A WME deployment is a handful of Docker Compose stacks. The browser loads the editor and then calls the backend (the **Model Repository**) directly, plus the assistant runtime that is deployed alongside it; the backend talks to everything else.

```mermaid
flowchart TB
  user(["Browser"])
  subgraph UI["Workflow Editor (wme-ui)"]
    vue["Vue 3 SPA<br/>nginx :5173"]
  end
  kc["Keycloak :8180<br/>realm datacrop-Platform"]
  subgraph BE["Model Repository stack"]
    api["wme-server<br/>Spring Boot :9090"]
    asst["assistant-runtime<br/>Node :8200 (preview)"]
    mongo[("MongoDB :27017")]
    subgraph ELK["Elastic stack 8.15"]
      ls["Logstash :9600"]
      es[("Elasticsearch :9200")]
      kib["Kibana :5601"]
    end
    kafka["Kafka :9092 + AKHQ :8081"]
  end
  subgraph AF["Airflow stack (2.10, CeleryExecutor)"]
    web["webserver :8080<br/>scheduler · triggerer"]
    flower["Flower :5555"]
    redis[("Redis :6379")]
    pg[("Postgres :5432")]
  end
  subgraph WK["Worker host (one or more)"]
    celery["Celery worker<br/>queue = WORKER_NAME"]
    agent["WME agent (daghandler) :8090"]
    containers["Processor containers<br/>labelled wme.*"]
  end
  user --> vue
  user -. login .-> kc
  user --> api
  user --> asst --> api
  api --> mongo
  api --> ls --> es --> kib
  api --> kib
  api --> web
  api --> flower
  api --> agent
  web --> redis --> celery
  celery --> containers
  agent --> containers
```

## Components

| Component | Responsibility | Repository |
|---|---|---|
| **Workflow Editor** (`wme-ui`) | Vue 3 + Vuetify single-page app: Warehouse, Workflow Lab, monitoring pages, settings. Runtime configuration is injected at container start via `env-config.js`. | `maize-workflow-management-editor/ui` |
| **assistant-runtime** *(preview)* | Node service (CopilotKit + Vercel AI SDK) behind the Workflow Assistant chat. Deployed in the Model Repository stack next to `wme-server`; the browser calls it directly (CORS), like the backend API. Validates the user's Keycloak token and calls the backend for every tool and model call. | `maize-model-repository/assistant-runtime` |
| **Model Repository** (`wme-server`) | Spring Boot 3 / Java 17 REST API. Owns the catalogue in MongoDB, renders Airflow DAGs, provisions workers, generates Logstash pipelines, builds Kibana dashboards, encrypts secrets, relays worker runtime calls. | `maize-model-repository` |
| **Keycloak** | OpenID Connect login; issues the JWTs the editor and backend use. The MVP imports a ready realm. | `maize-mvp/Keycloak` |
| **Elastic stack** | Logstash runs WME-generated pipelines; Elasticsearch stores observations and pipeline output; Kibana shows auto-built dashboards. | `maize-model-repository/docker-elk` |
| **Kafka + AKHQ** | Default message bus used by the bundled processors, with a web UI. | `maize-model-repository` |
| **Airflow** | Schedules and runs the deploy/teardown DAGs WME generates, dispatching tasks to worker queues through Celery. Flower exposes the live worker list WME imports. | `maize-processing-engine-airflow` |
| **Worker** | A Celery worker that executes DAG tasks (`docker compose up`, `docker run`, …) plus the **WME agent**, a small Go service that receives DAG files, clones processor repositories and serves container status, logs and start/stop/restart. | `maize-processing-engine-worker` |

## From "Save" to running containers

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant UI as Editor
  participant API as Model Repository
  participant AG as WME agent (each worker)
  participant AF as Airflow
  participant CW as Celery worker (target queue)
  U->>UI: Save workflow
  UI->>API: POST /user/v1/dpe/registry/po (graph, schedule, processors)
  API->>API: Render DAG_name_id.py + DAG_teardown_name_id.py (Jinja)
  API->>AF: Write DAG files to webserver dags/
  API->>AG: POST /createDag (to every worker)
  U->>UI: Run
  UI->>API: POST /user/v1/dpe/registry/{dagId}/po/run
  API->>AF: Unpause DAG + trigger dagRun
  AF->>CW: Task routed to the processor's worker queue
  CW->>CW: docker compose -p wme_<pm> up -d  /  docker run -d (with env vars + wme.* labels)
  U->>UI: Worker Runtime → logs / restart
  UI->>API: /monitoring/workers/...
  API->>AG: /runtime/... (X-WME-Service-Token)
```

Key points:

- **Processor code is provisioned ahead of time.** When a GitHub-based processor definition is saved (or a new worker is registered) the backend asks every worker's agent to clone the repository into `processors/pd_<id>`.
- **Each processor runs on exactly one worker**, chosen in its *Worker Station* field. A single workflow can spread its processors across many workers; the DAG task for each processor carries that worker's Celery queue.
- **Connected digital resources become environment variables** following `<INTERFACE>_<KEY>_<DIRECTION>`; they override parameters with the same key.
- **Containers are labelled** (`wme.managed`, `wme.processor-manifest-id`, `wme.workflow-id`, …) so Worker Runtime can match containers to processors and detect orphans.
- **Logstash pipelines bypass Airflow**: saving a Logstash Pipeline processor regenerates its `.conf` file and `pipelines.yml`, and Logstash reloads.

The full deployment internals are in [How deployment works](/developers/how-deployment-works/).
