---
title: Model Repository (backend)
slug: /deploy/manual/model-repository/
sidebar_position: 3
description: Deploy the WME backend with MongoDB, the Elastic stack, Kafka, AKHQ and the preview assistant runtime.
---

# Model Repository (backend)

Repository: [`maize-model-repository`](https://github.com/datacrop/maize-model-repository). Its compose file starts the backend and the infrastructure it manages.

## What it runs

| Service | Port | Purpose |
|---|---|---|
| `wme-server` | 9090 | Spring Boot backend (`ghcr.io/datacrop/maize-model-repository/wme-server:latest`) |
| `mongodb` | 27017 | Catalogue database (`registry`) |
| `elasticsearch` | 9200 / 9300 | Elastic 8.15.3 — observations and pipeline output |
| `logstash` | 9600, 5044, 50000 | Runs WME-generated pipelines |
| `kibana` | 5601 | Dashboards (anonymous access for embedding) |
| `setup` | — | One-off: users, roles, index templates (`observations*`), basic licence |
| `file-monitor` | — | Restarts Logstash when WME rewrites `pipelines.yml` |
| `kafka` + `akhq` | 9092 / 8081 | Default message bus and its UI |
| `assistant-runtime` *(preview, `dev/ai-feature`)* | 8200 | Node service behind the Workflow Assistant chat. See [below](#assistant-runtime-preview). |

## Deploy

```bash
git clone https://github.com/datacrop/maize-model-repository.git
cd maize-model-repository
cp .env.example .env
docker compose pull
docker compose up -d
```

Variables you must set (full list in [Configuration reference](/deploy/configuration/#model-repository)):

| Variable | Set to |
|---|---|
| `MONGO_HOST` | Host running MongoDB (this host) |
| `KEYCLOAK_ISSUER_URI`, `KEYCLOAK_JWK_SET_URI` | `http://KEYCLOAK_HOST:8180/realms/datacrop-Platform` and `…/protocol/openid-connect/certs` |
| `AIRFLOW_BASE_URL` | `http://AIRFLOW_HOST:8080/api/v1` (+ `AIRFLOW_USERNAME` / `AIRFLOW_PASSWORD`) |
| `FLOWER_BASE_URL` | `http://AIRFLOW_HOST:5555` |
| `KAFKA_BOOTSTRAP_SERVERS` | `HOST:9092` |
| `KIBANA_PUBLIC_BASE_URL` | Kibana URL as seen by browsers |
| `WEBSERVER_DAGS_FOLDER` | Path to Airflow's `dags/` folder (default `../maize-processing-engine-airflow/dags`) |
| `WME_SERVICE_TOKEN` | **Required**; same value as every worker |
| `CREDENTIALS_ENCRYPTION_KEY` | Base64 32-byte key (`openssl rand -base64 32`). If omitted a temporary key is generated at each start and stored secrets become unreadable after a restart. |
| `AI_BASE_URL`, `AI_MODEL`, `AI_API_KEY` | Server-wide AI provider ([AI providers](/deploy/ai-providers/)) |
| `ASSISTANT_SERVICE_KEY` *(preview)* | **Required** on `dev/ai-feature`; long random secret shared by `wme-server` and `assistant-runtime` (`openssl rand -hex 32`) |

Before the first `up`, make sure `config/extra-processors.json` exists as a **file** (Docker would otherwise create a directory) and that the Logstash pipeline folder contains a `pipelines.yml` — the MVP's `setup.sh` does both.

## assistant-runtime (preview)

The Workflow Assistant needs the `assistant-runtime` service (Node 22, CopilotKit, port 8200). On the `dev/ai-feature` branch of this repository, it lives in `assistant-runtime/` and the Compose file starts it next to `wme-server`:

```bash
git checkout dev/ai-feature
docker compose up -d --build assistant-runtime
```

How it is connected:

- **Browser → runtime.** The editor calls `http://HOST:8200/api/copilotkit` directly, the same way it calls the backend on port 9090. Open port 8200 to browsers, and point the editor at it with `VITE_ASSISTANT_URL` if it is not on the backend host at port 8200.
- **Runtime → backend.** The runtime calls `http://wme-server:${SERVER_PORT}` over the stack's Docker network, so no host networking is needed.
- **Shared settings.** The runtime reuses this `.env`: `ASSISTANT_SERVICE_KEY`, `KEYCLOAK_JWK_SET_URI` and `KEYCLOAK_ISSUER_URI`. The service key is defined once, for both services.

| Variable | Default | Meaning |
|---|---|---|
| `ASSISTANT_SERVICE_KEY` | — | **Required.** Authenticates runtime → backend calls |
| `ASSISTANT_CORS_ORIGINS` | `*` | Comma-separated editor origins allowed to call the runtime, e.g. `http://HOST:5173` |
| `ASSISTANT_RUNTIME_PORT` | `8200` | Host port published for the runtime |

The runtime keeps conversations in MongoDB through the backend, but it holds active agent runs in memory, so run a **single** instance. Check it with `curl http://localhost:8200/healthz`.

## Verify

```bash
docker compose ps
curl http://localhost:9090/test/v1/ping
```

Swagger UI: `http://HOST:9090/swagger-ui/index.html`.

## Initialize

Every user runs **Settings → Initialize Resources** once. It creates, for that user:

- **Data interface types**: `elasticsearch`, `kafka`, `http`, `mongodb`, `s3`, `redis`, `rabbitmq`, `beats`, `mqtt` ([parameters](/reference/interface-types/)).
- **Data kinds**: Observation, Telemetry Event, Asset State, Tabular Records, Generic JSON Payload, XML Document, Avro Record, Document, Binary Blob.
- The **Worker** asset category.
- **Processor definitions**: the WME-managed **Logstash Pipeline**, the six bundled GitHub processors ([catalogue](/developers/processor-catalogue/)) and anything in `extra-processors.json`.
- Workers imported from Flower.

Kafka and Elasticsearch defaults point at the bundled instances (use **Use default WME instance** in resource forms).

## Predefined processor definitions

Mount `config/extra-processors.json` to add processor definitions to every user's catalogue at initialization:

```json
{
  "processors": [
    {
      "name": "Public Compose Example",
      "description": "Example source-backed processor loaded from a public GitHub repository.",
      "processorType": "Data Analytics",
      "version": "1.0.0",
      "copyright": "Apache-2.0",
      "processorLocation": "Local Deployment",
      "fontAwesomeIcon": "fa-solid fa-cubes",
      "sourceType": "GITHUB",
      "githubRepoUrl": "https://github.com/datacrop/maize-processor-stream-inspector.git",
      "githubBranch": "main",
      "githubSubdirectory": "",
      "githubAccessTokenRef": null,
      "parameters": [
        {
          "name": "Consumer group",
          "key": "CONSUMER_GROUP_ID",
          "description": "Unique Kafka consumer group for this manifest.",
          "type": "String",
          "defaultValue": "inspector-example"
        }
      ]
    }
  ]
}
```

`processorLocation` is `Local Deployment` for Compose applications from GitHub and `Remote Deployment` for single-container images (set `containerImage` instead of the `github*` fields). `githubAccessTokenRef` names a token label from a user's GitHub Tokens.

## Stop and clean up

```bash
docker compose down            # keep data
docker compose down -v         # also delete MongoDB/Elasticsearch volumes
```
