---
title: Glossary
slug: /reference/glossary/
sidebar_position: 2
description: WME terminology.
---

# Glossary

| Term | Definition |
|---|---|
| **Agent (WME agent, daghandler)** | Go service on every worker (port 8090) that receives DAG files, clones processor repositories and controls processor containers. |
| **Airflow** | Workflow scheduler that runs WME's generated DAGs using the CeleryExecutor. |
| **Asset / Asset category** | Generic catalogue objects; a *worker* is an asset of category *Worker*. |
| **Celery queue** | The queue a worker listens on (`WORKER_NAME`). Each processor's DAG task is sent to its worker's queue. |
| **Compose application** | Processor runtime mode: a Docker Compose app cloned from GitHub. |
| **Data interface type** | Template for a kind of endpoint (kafka, elasticsearch, …) with its connection parameters. |
| **Data kind** | Description of a payload: shape, cardinality and schema. |
| **Derived environment variable** | Variable injected into a processor from a connected resource: `<INTERFACE>_<KEY>_<DIRECTION>`. |
| **Digital resource (DS / DR)** | A concrete data source or sink — an interface type plus values. |
| **Draft** | A workflow proposed by the Workflow Assistant, reviewed and saved in the Lab. |
| **Flower** | Celery monitoring UI/API; WME imports workers from it. |
| **Initialize Resources** | Admin action that seeds a user's catalogue. |
| **Logstash Pipeline** | WME-managed processor type that generates a Logstash pipeline from its inputs, outputs and filter. |
| **Observation** | Normalized record of an event seen on a resource, stored in the `observations` index. |
| **Orphan** | A WME-labelled container (or Logstash pipeline) whose processor no longer exists. |
| **Processor definition (PD)** | Catalogue description of a processing component: runtime, interfaces, parameters. |
| **Processor / processor manifest (PM)** | An instance of a definition in a workflow, with a worker and values. |
| **Processor orchestrator (PO)** | Backend name for a workflow. |
| **Provisioning** | Cloning a Compose processor's repository onto every worker. |
| **Single container** | Processor runtime mode: one image run with `docker run`. |
| **Teardown DAG** | The second DAG generated per workflow; stops and removes its containers. |
| **Worker** | Host that runs processors: Celery worker + WME agent. |
| **Worker Station** | The worker a processor is assigned to. |
| **Workflow** | A graph of processors and resources with scheduling settings; deployed through Airflow. |
| **Workflow template (WT)** | Reusable graph for creating workflows. |
