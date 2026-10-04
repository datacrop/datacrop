---
title: User guide
slug: /user-guide/
sidebar_position: 1
description: A tour of the Workflow Editor and a map of every page.
---

# User guide

The Workflow Editor is a single web app. After logging in through Keycloak you land on the **Warehouse**.

<Screenshot src="/img/screens/warehouse.jpg" caption="The editor: header, the left navigation rail and the Warehouse." />

## Layout

- **Header** — project name, a **Documentation** button (opens this site), a theme toggle (light / dark / system), logout and your initials (click to open **Settings**).
- **Navigation rail** (left) — one icon per page, in this order:

| Page | What it is for |
|---|---|
| [Warehouse](/user-guide/warehouse/) | Your catalogue: workflows, digital resources, workers, data kinds, processor definitions and (admins) data interface types. |
| [Workflow Lab](/user-guide/workflow-lab/) | Design, configure, save, run and monitor one workflow. |
| [Workflow Assistant](/user-guide/workflow-assistant/) *(Preview)* | Draft workflows and resources by chatting. |
| [Kibana Visualizations](/user-guide/kibana/) | Open Elasticsearch resources in Kibana with ready-made dashboards. |
| [Worker Runtime](/user-guide/worker-runtime/) | Containers per worker: health, logs, start / stop / restart. |
| [Logstash Monitor](/user-guide/logstash-monitor/) | Status and event counters of every Logstash pipeline. |
| [Airflow DAGs](/user-guide/airflow/) | The Airflow UI (administrators only). |
| [Settings](/user-guide/settings/) | Theme, credentials, GitHub tokens, AI provider, initialization. |

## Roles

Everyone sees their own catalogue objects plus shared and built-in ones. Users whose Keycloak roles contain `admin` additionally get the **Data Interface Types** tab, the **Airflow DAGs** page and the **Initialize Resources** action, and can edit or delete any workflow template.

## Typical order of work

1. [Initialize resources](/user-guide/settings/#initialize-resources) (once per user).
2. [Register workers](/user-guide/warehouse/workers/).
3. Add or reuse [processor definitions](/user-guide/warehouse/processor-definitions/).
4. Describe data with [data kinds](/user-guide/warehouse/data-kinds/) and [digital resources](/user-guide/warehouse/digital-resources/).
5. Compose and run a workflow in the [Workflow Lab](/user-guide/workflow-lab/).
6. Observe and operate: [Observations](/user-guide/observations/), [Kibana](/user-guide/kibana/), [Worker Runtime](/user-guide/worker-runtime/).

Stuck? See [Troubleshooting & FAQ](/user-guide/troubleshooting/).
