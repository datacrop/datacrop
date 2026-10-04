---
title: REST API
slug: /reference/rest-api/
sidebar_position: 7
description: Where to find the backend API schema and how it is organised.
---

# REST API

The backend publishes its OpenAPI schema:

- **Swagger UI** — `http://HOST:9090/swagger-ui/index.html`
- **OpenAPI JSON** — `http://HOST:9090/v3/api-docs`

Call it with a Keycloak access token: `Authorization: Bearer <jwt>`.

| Group | Prefix |
|---|---|
| Health | `/test/v1/ping` |
| Catalogue (asset categories, workers, interface types, resources, data kinds, observations, Celery workers) | `/user/v1/resource/*` |
| Processor definitions | `/user/v1/dpe/registry/pd*` |
| Processors (manifests) | `/user/v1/dpe/registry/pm*` |
| Workflows, runs, logs, DAG distribution | `/user/v1/dpe/registry/po*` |
| Workflow templates | `/user/v1/dpe/registry/wt*` |
| Initialize resources | `POST /user/v1/initialize-resources` |
| Settings, GitHub tokens, AI provider | `/user/v1/settings*` |
| Logstash monitoring | `/user/v1/monitoring/logstash/*` |
| Worker runtime | `/user/v1/monitoring/workers/*` |
| Kibana links | `/user/v1/visualization/*` |
| Logstash AI assistant | `/api/ai/logstash/*` |
| Workflow Assistant *(Preview)* | `/api/assistant/*` |

Conventions (search bodies, pagination, error shapes) and examples: [Model Repository API reference](/developers/model-repository/api-reference/).
