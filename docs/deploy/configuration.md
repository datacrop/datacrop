---
title: Configuration reference
slug: /deploy/configuration/
sidebar_position: 6
description: Every environment variable of every component.
---

# Configuration reference

Values in **bold** must be changed for every deployment (the MVP's `setup.sh` fills them from `HOST_IP`). Defaults shown are the `.env.example` values.

## Root (`maize-mvp/.env`)

| Variable | Default | Meaning |
|---|---|---|
| **`HOST_IP`** | — | Address of the single host |
| `DOCKER_BIN_PATH` | `/usr/bin/docker` | Docker binary mounted into Airflow |
| `WME_SERVICE_TOKEN` | generated | Backend ↔ worker secret |
| `CREDENTIALS_ENCRYPTION_KEY` | generated | AES-256-GCM key for stored secrets |

## Model Repository

| Variable | Default | Meaning |
|---|---|---|
| `SERVER_PORT` | `9090` | API port |
| `MAX_FILE_SIZE`, `MAX_REQUEST_SIZE` | `200MB`, `500MB` | Upload limits |
| `WEBSERVER_DAGS_FOLDER` | `../maize-processing-engine-airflow/dags` | Airflow `dags/` folder the backend writes into |
| `WORKER_API_PORT` | `8090` | Port of the worker agents |
| `WORKER_API_CONNECT_TIMEOUT_MS`, `WORKER_API_READ_TIMEOUT_MS` | `5000` | Agent call timeouts |
| **`WME_SERVICE_TOKEN`** | — | Required; same on every worker |
| `CREDENTIALS_ENCRYPTION_KEY` | — | Base64 32-byte key; without it secrets do not survive restarts |
| `HARBOR_URL`, `HARBOR_USERNAME`, `HARBOR_TOKEN` | empty | Legacy global registry login (per-user credentials live in Settings) |
| `MONGO_USERNAME`, `MONGO_PASSWORD`, `MONGO_DATABASE`, `MONGO_PORT` | `root`, `rootpassword`, `registry`, `27017` | MongoDB |
| **`MONGO_HOST`** | — | MongoDB host |
| **`KAFKA_BOOTSTRAP_SERVERS`** | `HOST:9092` | Bundled Kafka (default for new Kafka resources) |
| `LOGSTASH_CONFIG_FOLDER`, `LOGSTASH_PIPELINE_FOLDER` | `/app/logstash/config/`, `/app/logstash/pipeline/` | Where pipeline files are written |
| `LOGSTASH_MONITORING_URL` | `http://logstash:9600` | Pipeline stats |
| **`KEYCLOAK_ISSUER_URI`**, **`KEYCLOAK_JWK_SET_URI`** | — | Token validation |
| `KEYCLOAK_PROVIDER`, `KEYCLOAK_CLIENT_NAME`, `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET`, `KEYCLOAK_SCOPE`, `KEYCLOAK_USER_NAME_ATTR` | `datacrop-back`, `openid,offline_access,profile,roles`, `preferred_username` | OAuth client settings |
| `ELASTIC_VERSION` | `8.15.3` | Elastic stack version |
| `ELASTIC_PASSWORD`, `LOGSTASH_INTERNAL_PASSWORD`, `KIBANA_SYSTEM_PASSWORD`, `*_INTERNAL_PASSWORD`, `BEATS_SYSTEM_PASSWORD` | — | Elastic built-in users |
| **`KIBANA_PUBLIC_BASE_URL`** | `http://HOST:5601` | Kibana as seen by browsers |
| `KIBANA_URL`, `KIBANA_USERNAME`, `KIBANA_PASSWORD` | `http://kibana:5601`, `elastic` | Kibana API used to build dashboards |
| `AI_BASE_URL`, `AI_MODEL`, `AI_API_KEY`, `AI_TIMEOUT_SECONDS` | —, `google/gemma-4-26B`, —, `120` | Server-wide AI provider |
| **`AIRFLOW_BASE_URL`** | `http://HOST:8080/api/v1` | Airflow REST API |
| `AIRFLOW_USERNAME`, `AIRFLOW_PASSWORD` | `airflow` / `airflow` | Airflow API user |
| `AIRFLOW_API_CONNECT_TIMEOUT_SECONDS`, `AIRFLOW_API_TIMEOUT_SECONDS` | `5`, `30` | Timeouts |
| **`FLOWER_BASE_URL`** | `http://HOST:5555` | Flower API (worker discovery) |
| `FLOWER_USERNAME`, `FLOWER_PASSWORD`, `FLOWER_API_*_TIMEOUT_SECONDS` | `celery`, …, `5`/`30` | Flower access |
| `ASSISTANT_SERVICE_KEY` *(Preview)* | — | Shared by `wme-server` and `assistant-runtime` in this stack |
| `ASSISTANT_CORS_ORIGINS` *(Preview)* | `*` | Editor origins allowed to call `assistant-runtime` |
| `ASSISTANT_RUNTIME_PORT` *(Preview)* | `8200` | Host port of `assistant-runtime` |
| `SPRING_MVC_ASYNC_REQUEST_TIMEOUT` *(Preview)* | `300000` | Keeps long assistant responses open |

## Workflow Editor

| Variable | Meaning |
|---|---|
| **`VITE_API_URL`** | Backend URL |
| **`VITE_BACKEND_IP`**, **`VITE_AIRFLOW_IP`** | Backend and Airflow hosts |
| `VITE_KIBANA_URL`, `VITE_AKHQ_URL` | Kibana and AKHQ URLs (defaults derived from the hosts above) |
| `VITE_ASSISTANT_URL` *(Preview)* | assistant-runtime URL (default `http://VITE_BACKEND_IP:8200`) |
| **`VITE_KEYCLOAK_URL`** | Keycloak base URL |
| `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID` | `datacrop-Platform`, `datacrop-front` |
| `VITE_PROJECT_NAME`, `VITE_DEFAULT_PRIMARY_COLOR` | Branding (`DATACROP`, `#DA3333`) |

## Airflow

| Variable | Default | Meaning |
|---|---|---|
| **`HOST_IP`** | — | This host |
| `DOCKER_BIN_PATH` | `/usr/bin/docker` | Docker binary |
| `AIRFLOW_HOSTNAME_CALLABLE` | `airflow.utils.net.get_host_ip_address` | Host identity for log fetching |
| `AIRFLOW_WEB_PORT` | `8080` | Web port |
| `_AIRFLOW_WEB_UNAME`, `_AIRFLOW_WEB_PSSWD` | `airflow` / `airflow` | Web/API user |
| `AIRFLOW_WEB_SECRET_KEY`, `AIRFLOW_FERNET_KEY` | — | Must match workers |
| `AIRFLOW_UID` | `1002` | Folder owner |
| `REDIS_TLS_PORT`, `POSTGRES_PORT` | `6379`, `5432` | Published ports workers connect to |

## Worker

| Variable | Default | Meaning |
|---|---|---|
| **`WORKER_NAME`** | `remote_worker01` | Unique name and Celery queue |
| **`AIRFLOW_IP`** | — | Airflow host (Redis, Postgres) |
| **`HOST_IP`** | — | This host |
| **`WME_SERVICE_TOKEN`** | — | Same as backend |
| `AIRFLOW_HOSTNAME_CALLABLE` | `airflow.utils.net.get_host_ip_address` | Host identity for log fetching |
| `AIRFLOW_WEB_SECRET_KEY`, `AIRFLOW_FERNET_KEY` | — | Same as Airflow |
| `AIRFLOW_UID`, `AIRFLOW_GID` | `50000`, `0` | Folder owner |

## Keycloak (`maize-mvp/Keycloak`)

| Variable | Default | Meaning |
|---|---|---|
| **`HOST_IP`** | — | Used in the imported realm's URLs |
| `KEYCLOAK_PORT` | `8180` | Port |
| `KEYCLOAK_ADMIN`, `KEYCLOAK_ADMIN_PASSWORD` | `admin` / `admin` | Master admin |
| `DATACROP_BACK_SECRET`, `AIRFLOW_WRAPPER_SECRET` | fixed | Client secrets of the imported realm |
