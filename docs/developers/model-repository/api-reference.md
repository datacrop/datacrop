---
title: API Reference
slug: /developers/model-repository/api-reference/
sidebar_position: 3
description: Authentication, pagination, wire formats and examples for backend API clients.
---

# Model Repository API Reference

The backend publishes live SpringDoc documentation:

- Swagger UI: `http://<MODEL_REPOSITORY_HOST>:<SERVER_PORT>/swagger-ui/index.html`
- OpenAPI JSON: `http://<MODEL_REPOSITORY_HOST>:<SERVER_PORT>/v3/api-docs`

Use Swagger UI for the full schema. This page documents the conventions that are easy to miss when looking only at generated endpoint lists.

## Authentication

Most WME application APIs are called with a Keycloak bearer token:

```http
Authorization: Bearer <jwt>
```

The backend extracts the authenticated user from the Spring Security context and uses that `userId` for ownership and filtering. Some endpoints are technically routed under `/user/v1/**`, but clients should still send a valid token because controller methods expect the authenticated user to be present.

## Endpoint Groups

| Group | Prefix | Purpose |
|---|---|---|
| Connectivity | `/test/v1` | Health and smoke-test endpoints such as `GET /test/v1/ping`. |
| Resource catalog | `/user/v1/resource/*` | Asset Categories, Worker Assets, Data Interface Types, Digital Resources, Data Kinds, Observations, and Celery workers. |
| Processor registry | `/user/v1/dpe/registry/pd*`, `/user/v1/dpe/registry/{id}/pd*` | Processor Definition CRUD, compatible interfaces, provisioning status, and re-provisioning. |
| Processor manifests | `/user/v1/dpe/registry/pm*`, `/user/v1/dpe/registry/{id}/pm*` | Configured processor instances, cleanup, and Logstash-triggered manifest side effects. |
| Workflows | `/user/v1/dpe/registry/po*`, `/user/v1/dpe/registry/{id}/po*` | Workflow save/update/delete, DAG distribution status, Airflow run/stop support, run summary, task logs, and import errors. |
| Workflow templates | `/user/v1/dpe/registry/wt*` | Save, search, update, delete, and instantiate reusable workflow templates. |
| Settings | `/user/v1/settings*` | UI preferences, encrypted registry credentials, GitHub token CRUD and the per-user AI provider (`/settings/ai-provider`, `/test`). |
| Monitoring | `/user/v1/monitoring/logstash/*` | Logstash pipeline status, activation toggles, and orphan cleanup. |
| Worker runtime | `/user/v1/monitoring/workers/*` | Workers, containers per processor, logs, start/stop/restart, orphan removal. |
| Visualization | `/user/v1/visualization/*` | Kibana data-view and visualization-link resolution for Digital Resources. |
| AI Logstash assistant | `/api/ai/logstash/*` | Server-sent-event chat endpoint for Logstash filter generation; `active-config`. |
| Workflow Assistant *(preview)* | `/api/assistant/*` | Threads, catalogue tools, resource creation, drafts and the model proxy — see [Assistant runtime](/developers/assistant-runtime/). |

## Search And Pagination

Search endpoints use `POST` with optional filter bodies and query-string pagination:

```http
POST /user/v1/resource/ds/search?page=0&pageSize=10
Authorization: Bearer <jwt>
Content-Type: application/json
```

```json
{
  "name": "sensor-output",
  "dataInterfaceTypeName": "kafka"
}
```

When the request body is omitted or `null`, the backend returns the relevant list for the authenticated user or the global catalog, depending on the endpoint. Responses use Spring `Page<T>` shape, including `content`, `number`, `size`, `totalElements`, and `totalPages`.

## Example: Digital Resource Search

```bash
curl -X POST \
  "http://localhost:9090/user/v1/resource/ds/search?page=0&pageSize=10" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dataInterfaceTypeName": "kafka"
  }'
```

Use this pattern for Warehouse tables that need filtering without loading every row.

## Example: Create Processor Definition

```bash
curl -X POST "http://localhost:9090/user/v1/dpe/registry/pd" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example Kafka Consumer",
    "description": "Consumes Kafka records and emits normalized output.",
    "processorType": "Data Processing",
    "version": "1.0",
    "processorLocation": "Local Deployment",
    "sourceType": "GITHUB",
    "githubRepoUrl": "https://github.com/example/example-processor.git",
    "githubBranch": "main",
    "githubSubdirectory": "",
    "githubAccessTokenRef": "example-token",
    "parameterList": [
      {
        "name": "Batch Size",
        "key": "BATCH_SIZE",
        "type": "String",
        "defaultValue": "100"
      }
    ],
    "supportedInputInterfaces": [],
    "supportedOutputInterfaces": []
  }'
```

For `GITHUB` and `COMPOSE_UPLOAD` source types, the response returns before worker provisioning finishes. Poll `GET /user/v1/dpe/registry/pd/{id}/provisioning-status` to inspect per-worker progress.

## Example: Run Workflow

```bash
curl -X POST \
  "http://localhost:9090/user/v1/dpe/registry/$DAG_ID/po/run" \
  -H "Authorization: Bearer $TOKEN"
```

Set `DAG_ID` to the saved workflow's `dagConf.dag_id`, not its catalogue object ID. The backend unpauses that Airflow DAG and triggers a DAG run through the configured Airflow REST API. The generated DAG must already be visible to Airflow. To stop the workflow, call the same endpoint with the deployment DAG ID followed by `_teardown`.

## DTO And Schema Notes

Many DTO classes currently extend their entity classes directly. Treat the OpenAPI schema as the current wire shape, and avoid assuming DTOs are stable internal abstractions. Public clients should prefer documented fields and generated OpenAPI over Java inheritance details.

Dates are commonly serialized as `dd-MM-yyyy` for catalog entities. Operational status records use timestamps where needed for provisioning and DAG distribution attempts.

## Error Shape

Most custom errors are returned as plain text with HTTP `400` or another controller-specific status. Validation errors are returned as a stringified map with an `errors` key. API clients should not depend on a rich JSON error envelope unless a specific endpoint documents one.
