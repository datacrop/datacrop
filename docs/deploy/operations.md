---
title: Operations
slug: /deploy/operations/
sidebar_position: 8
description: Logs, restarts, backups, upgrades and hardening.
---

# Operations

## Where to look

| Question | Look at |
|---|---|
| Did the deployment run? | Lab → **Airflow Runs** (per-step logs), or the Airflow UI |
| Is the processor healthy? | **Worker Runtime** → container health and **Recent output** |
| Is data moving through a pipeline? | **Logstash Monitor** event counters |
| Backend errors | `docker compose logs -f wme-server` in `maize-model-repository` |
| Agent errors on a worker | `docker compose logs -f daghandler` in `maize-processing-engine-worker` |
| Celery task execution | `docker compose logs -f airflow-worker`, or Flower |

## Restarting

- A single processor: **Worker Runtime → Restart** (no Airflow run).
- A workflow: **Stop**, then **Run** in the Lab.
- A component: `docker compose restart` in its folder. The backend regenerates nothing on restart; re-save a Logstash Pipeline processor (or run Initialize Resources) if pipeline files were lost.

## Backups

Back up:

- **MongoDB** — the whole catalogue (`docker exec <mongo> mongodump --archive > wme.archive`, or a volume snapshot of `maize-model-repository_mongodb_data`).
- **`CREDENTIALS_ENCRYPTION_KEY`** — without it, stored registry passwords, GitHub tokens and AI keys cannot be decrypted.
- **Keycloak** realm and users (export from the admin console or snapshot its volume).
- **Elasticsearch** indices you care about (snapshot API).

DAG files and cloned processor folders can be regenerated: re-save workflows and use **Re-provision** on processor definitions.

## Upgrading

```bash
docker compose pull && docker compose up -d     # backend and editor (GHCR images)
docker compose up -d --build                    # Airflow, worker, Keycloak (built locally)
```

After upgrading the backend, run **Initialize Resources** to pick up new built-in interface types, data kinds and processors (existing objects are kept). Re-save workflows if the release notes mention DAG template changes.

## Hardening checklist

- Replace every default password (Keycloak, realm users, Airflow, Elastic, MongoDB).
- Set a fixed `CREDENTIALS_ENCRYPTION_KEY` and a strong `WME_SERVICE_TOKEN`.
- Expose only the editor, Keycloak and the API publicly; keep **8090** (agents), **5555** (Flower), **6379/5432**, **27017**, **9200** and Kibana on private networks.
- Put TLS in front of the editor, Keycloak and the API (reverse proxy) and set `sslRequired` in the realm accordingly.
- Review [Security model](/developers/security-model/).
