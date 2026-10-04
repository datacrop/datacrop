---
title: What's new
slug: /intro/whats-new/
sidebar_position: 4
description: Features added to the Workflow Management Engine since the previous version of these docs.
---

# What's new

Highlights of the WME releases between July and October 2026. The full list is in the [Changelog](/reference/changelog/).

| Feature | What it gives you | Docs |
|---|---|---|
| **Workflow Assistant** *(preview)* | Describe a workflow in chat; the assistant searches your catalogue, creates missing data kinds and resources, checks worker readiness and hands you a draft in the Lab. | [Workflow Assistant](/user-guide/workflow-assistant/) |
| **Guided processor definitions** | A 5-step wizard: run a **single container image** or a **Docker Compose app from GitHub**; per-worker **provisioning status** with re-provision; icon picker; **Mine / Shared / WME managed** ownership with duplication. | [Processor definitions](/user-guide/warehouse/processor-definitions/) |
| **Bundled processor pack** | Initialize Resources seeds six ready-to-run GitHub processors (telemetry generator/normalizer, threshold monitor, stream inspector, asset state builder, Kafka + AKHQ). | [Processor catalogue](/developers/processor-catalogue/) |
| **Worker Runtime** | Replaces the old Celery iframe: every deployed container per worker, health, uptime, restarts, live logs, start / stop / restart, orphan cleanup. | [Worker Runtime](/user-guide/worker-runtime/) |
| **Workers from Celery** | Import live Celery workers from Flower into the catalogue in one click. | [Workers](/user-guide/warehouse/workers/) |
| **Observations** | One click on a source adds a Logstash pipeline that records every event as an observation in Elasticsearch. | [Observations](/user-guide/observations/) |
| **Kibana catalogue** | Pick any Elasticsearch resource; WME creates the data view and a ready-made Observation or Timestamp dashboard. | [Kibana visualizations](/user-guide/kibana/) |
| **Airflow Runs tab** | Deployment and teardown run history, per-step status and logs inside the Lab. | [Run and monitor](/user-guide/workflow-lab/run-and-monitor/) |
| **Smarter flow editor** | Only compatible links are allowed; connecting two processors offers a resource compatible with both. Logstash nodes show a live/paused state with a toggle. | [Flow creator](/user-guide/workflow-lab/flow-creator/) |
| **Richer data kinds** | Payload shape, cardinality and schemas in JSON Schema, CSV columns, XML/XSD or Avro. | [Data kinds](/user-guide/warehouse/data-kinds/) |
| **Beats input** and **AKHQ links** | New `beats` interface type for Logstash; Kafka resources link straight to AKHQ. | [Interface types](/reference/interface-types/) |
| **AI provider settings** | Use the server default model or bring your own OpenAI-compatible endpoint; keys are stored encrypted. | [Settings](/user-guide/settings/) |
| **GitHub tokens** | Store tokens once in Settings and reference them from private processor repositories. | [Settings](/user-guide/settings/) |

## Removed or replaced

- **Celery Workers Status** page → replaced by **Worker Runtime**.
- **Kibana Pipeline** processor → replaced by the Kibana catalogue and auto-built dashboards.
- **Start Page** setting → removed.
- Processor definitions no longer use `processorLocation` / `projectName`; they use a runtime mode (single container or GitHub Compose).
