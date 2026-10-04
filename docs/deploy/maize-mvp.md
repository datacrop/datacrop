---
title: Maize MVP (single script)
slug: /deploy/maize-mvp/
sidebar_position: 3
description: Deploy every Maize component on one host with maize-mvp/setup.sh.
---

# Maize MVP (single script)

The [`maize-mvp`](https://github.com/datacrop/maize-mvp) repository bundles all components and a `setup.sh` that deploys them on one host.

## 1. Configure

```bash
git clone https://github.com/datacrop/maize-mvp.git
cd maize-mvp
cp .env.example .env
```

Edit the root `.env`:

| Variable | Set to |
|---|---|
| `HOST_IP` | The IP address or hostname browsers and workers use to reach this host. **Required.** |
| `DOCKER_BIN_PATH` | Path of the `docker` binary on the host (default `/usr/bin/docker`). |
| `WME_SERVICE_TOKEN` | Leave blank — generated on first run (shared backend ↔ worker secret). |
| `CREDENTIALS_ENCRYPTION_KEY` | Leave blank — generated on first run (AES-256-GCM key for stored secrets). |

You only need component `.env` files for manual or distributed deployments; `setup.sh` writes them from the root `.env`.

## 2. Run

```bash
chmod +x setup.sh
./setup.sh
```

Choose:

1. **Deploy everything** — Keycloak, backend, editor, Airflow and a worker.
2. **Everything except Keycloak** — skip starting the bundled Keycloak.
3. **Worker only** — start the worker stack.

:::caution[External Keycloak or a remote Airflow host]
With a root `.env` present, `setup.sh` synchronizes component settings **before** the menu. It overwrites Keycloak URLs and the worker's `AIRFLOW_IP` with values derived from `HOST_IP`. Editing the component files beforehand does not preserve those external addresses. Use [Manual setup](/deploy/manual/) for an existing external Keycloak and [Adding workers](/deploy/adding-workers/) for a worker on another host.
:::

What the script does:

1. Checks `docker` and `docker compose`.
2. Validates `HOST_IP` (warns if it looks unset) and generates `WME_SERVICE_TOKEN` (`openssl rand -hex 32`) and `CREDENTIALS_ENCRYPTION_KEY` (`openssl rand -base64 32`) if missing, saving them in `.env`.
3. Creates any missing component `.env` from its example and synchronizes host addresses, Keycloak URLs, Airflow/Flower/Kafka/Kibana URLs and the shared secrets into them.
4. Creates the `maize-wme-network` Docker network and runtime folders.
5. Deploys, in order: **Keycloak** (waits for it to be healthy), **backend** (prepares `config/extra-processors.json` and a placeholder Logstash pipeline, pulls images), **editor**, **Airflow**, **worker**.
6. Prints the URLs.

## 3. Access

| Service | URL | Login |
|---|---|---|
| Workflow Editor | `http://HOST_IP:5173` | `admin` / `admin` (Keycloak) |
| Keycloak admin | `http://HOST_IP:8180/admin` | `admin` / `admin` |
| Backend API / Swagger | `http://HOST_IP:9090/swagger-ui/index.html` | Bearer token |
| Airflow | `http://HOST_IP:8080` | `airflow` / `airflow` |
| Kibana | `http://HOST_IP:5601` | `elastic` / `elastic` |
| AKHQ | `http://HOST_IP:8081` | — |
| Flower | `http://HOST_IP:5555` | — |

:::danger[Change the defaults]
The MVP ships well-known passwords (Keycloak admin, realm user `admin`, Airflow, Elastic, MongoDB). Change them before exposing the host to any network you do not fully trust.
:::

## 4. Initialize

Log in to the editor and run **Settings → Initialize Resources** once for each user ([details](/user-guide/settings/#initialize-resources)). Then import the worker in **Warehouse → Workers** ([Adding workers](/deploy/adding-workers/)).

## Optional: ship extra processors

Place an `extra-processors.json` in `maize-model-repository/config/` before initialization to add your own processor definitions to every user's catalogue. Format: [Model Repository → Predefined processor definitions](/deploy/manual/model-repository/#predefined-processor-definitions).

## Check and troubleshoot

```bash
# Run from the maize-mvp repository root.
docker compose -f Keycloak/docker-compose.yml ps
docker compose -f maize-model-repository/docker-compose.yml ps
docker compose -f maize-workflow-management-editor/docker-compose.yaml ps
docker compose -f maize-processing-engine-airflow/docker-compose.yaml ps
docker compose -f maize-processing-engine-worker/docker-compose.yaml ps

# Choose one component to inspect its logs.
cd maize-model-repository
docker compose logs -f
```

- **Worker Runtime unavailable** — backend and worker must share `WME_SERVICE_TOKEN`, port 8090 must be reachable and the agent needs `/var/run/docker.sock`.
- **Port conflicts** — 5173, 8080, 8180 and 9090 must be free.

## Tear down

```bash
./teardown.sh            # stop and remove containers (same 3-option menu)
./teardown.sh --volumes  # also remove volumes
```

Components are stopped in reverse order and the network removed. The MongoDB volume (`maize-model-repository_mongodb_data`) is always kept so your catalogue survives.

:::note[Workflow Assistant]
The MVP does not yet deploy the preview `assistant-runtime` service. It runs in the backend stack on the `dev/ai-feature` branch; see [Model Repository → assistant-runtime](/deploy/manual/model-repository/#assistant-runtime-preview).
:::
