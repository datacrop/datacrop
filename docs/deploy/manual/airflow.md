---
title: Airflow
slug: /deploy/manual/airflow/
sidebar_position: 2
description: The Airflow stack that schedules WME's deploy and teardown DAGs.
---

# Airflow

Repository: [`maize-processing-engine-airflow`](https://github.com/datacrop/maize-processing-engine-airflow) (also bundled in `maize-mvp`).

## What it runs

| Service | Port | Purpose |
|---|---|---|
| `airflow-webserver` | 8080 | UI and REST API (`basic_auth`, `session`) used by the backend |
| `airflow-scheduler`, `airflow-triggerer` | — | Schedule DAGs and dispatch tasks |
| `redis` | 6379 | Celery broker — workers connect to it |
| `postgres` | 5432 | Airflow metadata and Celery results — workers connect to it |
| `flower` | 5555 | Celery monitoring; its API lists live workers for WME's import |
| `airflow-init` | — | One-off: migrates the database and creates the web user |

Image: built from `apache/airflow:2.10.4` with `confluent-kafka`, Jinja2 and python-dotenv. Executor: **CeleryExecutor**. New DAGs are **paused at creation**; WME unpauses them on Run. Example DAGs are disabled.

## Deploy

```bash
git clone https://github.com/datacrop/maize-processing-engine-airflow.git
cd maize-processing-engine-airflow
cp .env.example .env
docker compose up -d --build
```

Required variables:

| Variable | Meaning |
|---|---|
| `HOST_IP` | Address of this host |
| `DOCKER_BIN_PATH` | Host path of the `docker` binary (mounted into Airflow) |
| `AIRFLOW_HOSTNAME_CALLABLE` | How hosts report themselves for log fetching (default `airflow.utils.net.get_host_ip_address`) |
| `_AIRFLOW_WEB_UNAME`, `_AIRFLOW_WEB_PSSWD` | Web/API user created by `airflow-init` (default `airflow` / `airflow`) — also set in the backend as `AIRFLOW_USERNAME` / `AIRFLOW_PASSWORD` |
| `AIRFLOW_WEB_SECRET_KEY`, `AIRFLOW_FERNET_KEY` | Airflow secrets — keep identical on workers |
| `AIRFLOW_UID` | UID owning the mounted folders |

The `*_TLS_*` / `*_SSL_*` certificate variables in `.env.example` are legacy and not used by the current compose file.

## The DAGs folder

`./dags` is mounted at `/opt/airflow/dags`. The **backend writes DAG files into this folder** through its own bind mount (`WEBSERVER_DAGS_FOLDER`, default `../maize-processing-engine-airflow/dags`). Run the backend on the same host, or share the folder.

## Verify

```bash
docker compose ps        # webserver, scheduler, triggerer, flower, redis, postgres healthy
curl -s http://HOST_IP:5555/api/workers   # Flower API answers (empty until a worker starts)
```

Open `http://HOST_IP:8080` and log in with the web user.

:::warning[Flower is unauthenticated]
Flower's dashboard and API are open (`FLOWER_UNAUTHENTICATED_API=true`) because WME reads the worker list from it. Keep port 5555 reachable from the backend only.
:::
