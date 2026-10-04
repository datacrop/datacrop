---
title: Worker agent API
slug: /developers/worker-agent-api/
sidebar_position: 8
description: The HTTP API of the WME agent (daghandler) running on every worker.
---

# Worker agent API

The **WME agent** (`daghandler`, Go 1.22 + Gin) runs on every worker at port **8090**. Only the backend should call it.

| Setting | Value |
|---|---|
| Source | `maize-processing-engine-worker/daghandler` |
| Folders | `DAGS_DIR=/app/dags`, `PROCESSORS_DIR=/app/processors` (mounted from the worker host) |
| Docker | Go SDK over `/var/run/docker.sock` |
| Secret | `WME_SERVICE_TOKEN` (required to start) |

## DAG and processor files

These endpoints are **not authenticated** — restrict port 8090 to the backend.

| Method & path | Body | Effect |
|---|---|---|
| `POST /createDag` | `{filename, content}` | Write a DAG file into `dags/` |
| `DELETE /deleteDag` | `{filename}` | Remove a DAG file |
| `POST /cloneRepo` | `{folderName, repoUrl, branch, subdirectory, accessToken}` | `git clone --depth 1` into `processors/<folderName>` (5-minute timeout); verifies a compose file exists; the token is used only for `https` URLs |
| `POST /createProcessorFolder` | `{folderName, dockerComposeContent}` | Write a `docker-compose.yml` (legacy upload-based definitions) |
| `DELETE /deleteProcessorFolder` | `{folderName}` | Remove a processor folder |

## Runtime

Every `/runtime/*` request needs:

```http
X-WME-Service-Token: <WME_SERVICE_TOKEN>
X-WME-Owner-Id: <Keycloak user id>
```

A wrong or missing token returns `401 {"message": "invalid service token"}`. Results are limited to containers labelled `wme.managed=true` and `wme.owner-id=<owner>`.

| Method & path | Effect |
|---|---|
| `GET /runtime/containers` | Containers with their `wme.*` labels, state, health, image, created time, restart count |
| `GET /runtime/containers/{containerId}/logs?tail=200` | Last *n* log lines (1–2000, default 200) |
| `POST /runtime/processor-manifests/{pmId}/actions/{action}` | `start`, `stop` or `restart` the processor's containers |
| `DELETE /runtime/processor-manifests/{pmId}/containers` | Remove the processor's containers (orphan cleanup) |

The backend exposes these to the editor as `/user/v1/monitoring/workers/{workerId}/...` ([API reference](/developers/model-repository/api-reference/)).

:::note[OpenAPI]
`daghandler/openapi.yaml` currently documents only the file endpoints, not `/runtime/*`.
:::
