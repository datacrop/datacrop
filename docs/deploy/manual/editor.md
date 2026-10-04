---
title: Workflow Editor
slug: /deploy/manual/editor/
sidebar_position: 4
description: Deploy the web UI.
---

# Workflow Editor

Repository: [`maize-workflow-management-editor`](https://github.com/datacrop/maize-workflow-management-editor).

## Choose the deployment

The [Maize MVP](/deploy/maize-mvp/) includes a UI-only Compose file. The editor's Compose files start only `wme-ui`. The **preview** Workflow Assistant uses the `assistant-runtime` service, which is deployed with the backend; see [Model Repository → assistant-runtime](/deploy/manual/model-repository/#assistant-runtime-preview).

## Build and start the editor

```bash
git clone --branch dev/ai-feature https://github.com/datacrop/maize-workflow-management-editor.git
cd maize-workflow-management-editor
cp .env.example .env
```

Edit `.env` for your backend and Keycloak **before** starting Compose. The default `docker-compose.yaml` builds a local `wme-ui:latest` image:

```bash
docker compose up -d --build
```

To use published GHCR images instead, select the registry Compose file explicitly:

```bash
docker compose -f docker-compose.registry.yaml pull
docker compose -f docker-compose.registry.yaml up -d
```

The `wme-ui` container serves the app with nginx on host ports **5173** and **80**. Settings are written into `/env-config.js` when the container starts. After editing `.env`, recreate the UI container with `docker compose up -d --force-recreate wme-ui` (include `-f docker-compose.registry.yaml` if using registry images); changing these values does not require rebuilding the image.

| Variable | Meaning |
|---|---|
| `VITE_API_URL` | Backend URL, e.g. `http://HOST:9090` |
| `VITE_BACKEND_IP` | Backend host (used for "default WME instance" addresses) |
| `VITE_AIRFLOW_IP` | Airflow host (Airflow iframes) |
| `VITE_KIBANA_URL` | Kibana URL for embedded views (default `http://VITE_AIRFLOW_IP:5601`) |
| `VITE_AKHQ_URL` | AKHQ URL for Kafka links (default `http://VITE_BACKEND_IP:8081`) |
| `VITE_ASSISTANT_URL` *(preview)* | assistant-runtime URL as seen by browsers (default `http://VITE_BACKEND_IP:8200`) |
| `VITE_KEYCLOAK_URL` | Keycloak base URL, e.g. `http://HOST:8180/` |
| `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID` | `datacrop-Platform`, `datacrop-front` |
| `VITE_PROJECT_NAME` | Name shown in the header |
| `VITE_DEFAULT_PRIMARY_COLOR` | Default theme colour (users can change it in Settings) |

Open `http://HOST:5173`, log in, and run **Settings → Initialize Resources** (once per user).

## Workflow Assistant (preview)

The editor contains only the chat UI. The browser calls the `assistant-runtime` service directly at `VITE_ASSISTANT_URL`, the same way it calls the backend at `VITE_API_URL`; nginx does not proxy it. The runtime runs in the backend stack and needs no assistant settings or secrets in the editor's `.env`.

To enable the assistant:

1. Deploy the backend with the runtime, from the `dev/ai-feature` branch of `maize-model-repository`. See [Model Repository → assistant-runtime](/deploy/manual/model-repository/#assistant-runtime-preview).
2. Leave `VITE_ASSISTANT_URL` blank if the runtime is on the backend host at port 8200. Otherwise, set it to the runtime's public URL.
3. Make sure the editor's origin (for example `http://HOST:5173`) is allowed by the runtime's `ASSISTANT_CORS_ORIGINS`.

The assistant uses the AI provider configured in the backend or in each user's settings and needs a model with **tool calling**. See [AI providers](/deploy/ai-providers/) and [Assistant runtime](/developers/assistant-runtime/).
