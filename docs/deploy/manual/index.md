---
title: Manual setup
slug: /deploy/manual/
sidebar_position: 4
description: Deploy each component from its own repository.
---

# Manual setup

Deploy the components in this order — each one needs the previous ones' addresses:

1. [Keycloak](/deploy/manual/keycloak/) — identity provider
2. [Airflow](/deploy/manual/airflow/) — scheduler, Celery broker, Flower
3. [Model Repository](/deploy/manual/model-repository/) — backend, MongoDB, Elastic stack, Kafka/AKHQ
4. [Workflow Editor](/deploy/manual/editor/) — web UI (and the preview assistant runtime)
5. [Worker](/deploy/manual/worker/) — one per execution host

Create a shared Docker network first if components run on the same host:

```bash
docker network create maize-wme-network
```

Every component reads a `.env` file next to its `docker-compose.yml`; copy it from `.env.example`. All variables are listed in the [Configuration reference](/deploy/configuration/).

Two secrets must be set correctly:

| Secret | Shared by | Generate with |
|---|---|---|
| `WME_SERVICE_TOKEN` | Backend and every worker | `openssl rand -hex 32` |
| `ASSISTANT_SERVICE_KEY` *(preview)* | `wme-server` and `assistant-runtime`, both read from the backend `.env` | `openssl rand -hex 32` |
