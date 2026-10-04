---
title: Security model
slug: /developers/security-model/
sidebar_position: 9
description: Authentication, authorization, secrets and network exposure.
---

# Security model

## Authentication

- Users log in to the editor through **Keycloak** (OIDC, `keycloak-js`). The editor sends the access token as `Authorization: Bearer …` on every API call and refreshes it in the background.
- The backend is a Spring Security **OAuth2 resource server**: it validates JWTs against Keycloak's JWK set (`KEYCLOAK_JWK_SET_URI`).
- The token must carry a **`userId`** claim; the backend uses it to scope data. The MVP realm adds it with a protocol mapper.

## Authorization

- **Ownership**: catalogue objects, workflows, settings and assistant conversations are stored with the owner's `userId` and filtered by it. Processor definitions can be *Mine*, *Shared* (read-only to others) or *WME managed*.
- **Administrators**: any role (realm or client) whose name contains `admin`. Admins see Data Interface Types, the Airflow page and Initialize Resources, and can manage all workflow templates.

:::caution[Defence in depth]
Most `/user/v1/**` routes are configured as `permitAll()` at the Spring Security level; protection comes from controllers resolving the user from the token. The assistant API (`/api/assistant/**`) requires authentication explicitly. Do not expose the backend to untrusted networks without a token-validating reverse proxy, and treat this as a known hardening item.
:::

## Secrets

| Secret | Where it lives | Protection |
|---|---|---|
| Registry passwords, GitHub tokens, per-user AI keys | MongoDB (user settings) | AES-256-GCM with `CREDENTIALS_ENCRYPTION_KEY`; never returned by the API (masked / labels only) |
| Digital resource parameters (passwords, API keys) | MongoDB (resource) | Not encrypted by WME; injected into containers as environment variables and visible to anyone who can open the resource or the processor form |
| `WME_SERVICE_TOKEN` | Backend and worker `.env` | Authenticates backend → agent `/runtime/*` calls |
| `ASSISTANT_SERVICE_KEY` | Backend `.env` (read by `wme-server` and `assistant-runtime`) | Authenticates runtime → backend assistant calls |
| Assistant secure-form values | Sent browser → backend directly | Never passed to the language model |

## Network exposure

| Endpoint | Exposure |
|---|---|
| Editor (5173), Keycloak (8180), API (9090) | User-facing; put TLS in front |
| Kibana (5601) | Anonymous access is enabled so it can be embedded — keep it on a trusted network |
| Worker agent (8090) | Backend only — file endpoints are unauthenticated |
| Flower (5555) | Backend only — API is unauthenticated by design |
| Redis (6379), Postgres (5432) | Workers only |
| MongoDB, Elasticsearch, Kafka | Internal |

The agent and the Celery worker mount the Docker socket — anyone who can run tasks or call the agent can control Docker on that host.

See the [hardening checklist](/deploy/operations/#hardening-checklist).
