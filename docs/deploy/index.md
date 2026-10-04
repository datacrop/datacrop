---
title: Deploy
slug: /deploy/
sidebar_position: 1
description: Choose how to deploy DataCROP Maize and what you need before you start.
---

# Deploy

A Maize deployment consists of five Docker Compose stacks: **Keycloak**, the **Model Repository** backend (with MongoDB, the Elastic stack, Kafka and AKHQ), the **Workflow Editor**, **Airflow** and one or more **workers**. See [Architecture](/intro/architecture/) for how they fit together.

## Choose a path

| Path | Use it when | Start here |
|---|---|---|
| **Maize MVP** (single script) | Evaluation, demos, single-host installations. One `.env`, one script, everything on one machine. | [Maize MVP](/deploy/maize-mvp/) |
| **Manual per-component** | Production or distributed installs: Keycloak you already run, Airflow on its own host, workers on many machines. | [Manual setup](/deploy/manual/) |

Even with the MVP, the manual pages explain what each component does and what every variable controls.

## Before you start

- Read [Requirements & topology](/deploy/requirements/) for host sizing and the ports each component needs.
- Decide which AI provider (if any) the AI features should use: [AI providers](/deploy/ai-providers/).

## After deploying

1. Log in and run **Settings → Initialize Resources** for each user ([details](/user-guide/settings/#initialize-resources)).
2. Register your workers ([Adding workers](/deploy/adding-workers/)).
3. Follow the [Quickstart](/getting-started/quickstart/) from step 4 to verify everything end to end.
