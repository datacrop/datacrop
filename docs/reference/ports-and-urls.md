---
title: Ports and URLs
slug: /reference/ports-and-urls/
sidebar_position: 6
description: Every service, its port, URL and default login.
---

# Ports and URLs

Defaults of a Maize MVP deployment. Replace `HOST` with your `HOST_IP`.

| Service | URL | Default login | Notes |
|---|---|---|---|
| Workflow Editor | `http://HOST:5173` | `admin` / `admin` (Keycloak) | Also served on port 80 inside the container |
| Keycloak | `http://HOST:8180` (admin: `/admin`) | `admin` / `admin` | Realm `datacrop-Platform` |
| Backend API | `http://HOST:9090` | Bearer token | Swagger `/swagger-ui/index.html`, OpenAPI `/v3/api-docs`, health `/test/v1/ping` |
| assistant-runtime *(preview)* | `http://HOST:8200` | Bearer token | Backend stack; the editor calls `/api/copilotkit` directly. Health `/healthz` |
| Airflow | `http://HOST:8080` | `airflow` / `airflow` | REST API `/api/v1` |
| Flower | `http://HOST:5555` | none | Keep private |
| Kibana | `http://HOST:5601` | `elastic` / `elastic` | Anonymous access for embedding |
| Elasticsearch | `http://HOST:9200` | `elastic` / `elastic` | |
| Logstash | `HOST:9600` (API), `5044` (Beats), `50000` (TCP) | | |
| Kafka | `HOST:9092` | | Default broker for new Kafka resources |
| AKHQ | `http://HOST:8081` | none | |
| MongoDB | `HOST:27017` | `root` / `rootpassword` | Database `registry` |
| Redis (Airflow) | `HOST:6379` | | Workers connect |
| Postgres (Airflow) | `HOST:5432` | `airflow` / `airflow` | Workers connect |
| WME agent | `WORKER_HOST:8090` | `X-WME-Service-Token` for `/runtime/*` | Backend only |

Change every default password before exposing a deployment.
