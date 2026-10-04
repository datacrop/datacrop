---
title: Worker
slug: /deploy/manual/worker/
sidebar_position: 5
description: The execution host — a Celery worker plus the WME agent.
---

# Worker

Repository: [`maize-processing-engine-worker`](https://github.com/datacrop/maize-processing-engine-worker). Deploy one per host that should run processors.

## What it runs

| Service | Purpose |
|---|---|
| `airflow-worker` | Airflow **Celery worker** (`apache/airflow:2.10.4`), host networking. Listens on the queue named **`WORKER_NAME`** and executes WME's DAG tasks (`docker compose up`, `docker run`, teardown). |
| `daghandler` (the **WME agent**) | Small Go service on **port 8090**. Receives DAG files, clones processor repositories into `processors/`, and serves container status, logs and start/stop/restart for Worker Runtime. Talks to Docker through `/var/run/docker.sock`. |

## Deploy

```bash
git clone https://github.com/datacrop/maize-processing-engine-worker.git
cd maize-processing-engine-worker
cp .env.example .env
mkdir -p dags logs plugins processors security
docker compose up -d --build
```

| Variable | Meaning |
|---|---|
| `WORKER_NAME` | Unique worker name **and Celery queue** (default `remote_worker01`). |
| `AIRFLOW_IP` | Address of the Airflow host — used to reach Redis and Postgres. |
| `HOST_IP` | Address of this worker (used in the Celery hostname `WORKER_NAME@HOST_IP`). |
| `WME_SERVICE_TOKEN` | **Required.** Must equal the backend's `WME_SERVICE_TOKEN`; the agent refuses to start without it. |
| `AIRFLOW_HOSTNAME_CALLABLE` | Default `airflow.utils.net.get_host_ip_address` — makes task logs fetchable without extra DNS. |
| `AIRFLOW_WEB_SECRET_KEY`, `AIRFLOW_FERNET_KEY` | Same values as the Airflow stack. |
| `AIRFLOW_UID`, `AIRFLOW_GID` | Owner of mounted folders (defaults `50000` / `0`). |

Folders:

- `dags/` — DAG files pushed by the backend.
- `processors/` — processor repositories cloned by the agent (`pd_<definition id>`). Kept outside Airflow's plugin path on purpose.
- `logs/`, `plugins/`, `security/`.

## Register it in WME

1. Make sure the worker shows up in Flower (`http://AIRFLOW_IP:5555`).
2. In the editor: **Warehouse → Workers → Provision workers from Celery → Import selected** ([details](/user-guide/warehouse/workers/)).
3. WME then clones every GitHub-based processor definition onto the worker.

## Network requirements

- Worker → Airflow host: **6379** (Redis) and **5432** (Postgres).
- Backend → worker: **8090** (agent). Keep it private — only `/runtime/*` endpoints are token-protected. See [Worker agent API](/developers/worker-agent-api/).
- Worker → whatever your processors use (Kafka, Elasticsearch, registries, GitHub).

## Verify

```bash
docker compose ps                 # airflow-worker healthy (celery inspect ping), daghandler up
curl -s http://localhost:8090/runtime/containers   # 401 without the token header = agent is running
```

## Troubleshooting

- **Worker missing in Flower** — check `AIRFLOW_IP`, and that Redis/Postgres ports are reachable.
- **Worker Runtime: runtime unreachable** — port 8090 blocked, or `WME_SERVICE_TOKEN` differs from the backend's.
- **Processor imports appear as Airflow plugins** — rebuild the worker; repositories must live under `processors/`, not `plugins/`.
