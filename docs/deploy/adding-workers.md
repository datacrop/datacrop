---
title: Adding workers
slug: /deploy/adding-workers/
sidebar_position: 5
description: Scale out by adding execution hosts.
---

# Adding workers

Every worker is an independent host running the [worker stack](/deploy/manual/worker/). Add as many as you need; each processor in a workflow chooses one of them.

## Steps

1. **On the new host**, clone `maize-processing-engine-worker` (or use `maize-mvp` → `./setup.sh` → option **3** on a host with the MVP checkout).
2. In its `.env` set:
   - `WORKER_NAME` — a **unique** name; it is also the Celery queue,
   - `AIRFLOW_IP` — the Airflow host,
   - `HOST_IP` — this host,
   - `WME_SERVICE_TOKEN` — the same value as the backend,
   - `AIRFLOW_WEB_SECRET_KEY`, `AIRFLOW_FERNET_KEY` — the same values as Airflow.
3. `mkdir -p dags logs plugins processors security && docker compose up -d --build`
4. Check it appears in Flower (`http://AIRFLOW_IP:5555`).
5. **In the editor**: **Warehouse → Workers → Provision workers from Celery**, select it, **Import selected**.
6. Wait until each processor definition's **Provisioning status** shows the new worker as SUCCESS.
7. Assign processors to it through their **Worker Station** field.

## Network checklist

| From | To | Port |
|---|---|---|
| New worker | Airflow host | 6379 (Redis), 5432 (Postgres) |
| Backend | New worker | 8090 (agent) |
| New worker | Your data infrastructure | Kafka, Elasticsearch, … as used by processors |
| New worker | GitHub / registries | 443 |

## Removing a worker

1. Move its processors to another Worker Station and redeploy those workflows.
2. Delete the worker in **Warehouse → Workers**.
3. On the host: `docker compose down`.
