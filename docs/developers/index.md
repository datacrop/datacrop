---
title: Developers
slug: /developers/
sidebar_position: 1
description: Integrating processors, internals of each component and contributing.
---

# Developers

This section is for people who package processors for WME, integrate with its APIs or work on WME itself.

| If you want to… | Read |
|---|---|
| Understand exactly what happens on Save and Run | [How deployment works](/developers/how-deployment-works/) |
| Package your code as a WME processor | [Writing processors](/developers/writing-processors/) |
| Reuse or learn from the bundled processors | [Processor catalogue](/developers/processor-catalogue/) |
| Call or extend the backend | [Model Repository backend](/developers/model-repository/) and its [API reference](/developers/model-repository/api-reference/) |
| Work on the web UI | [Frontend](/developers/frontend/) |
| Work on the Workflow Assistant | [Assistant runtime](/developers/assistant-runtime/) |
| Talk to a worker directly | [Worker agent API](/developers/worker-agent-api/) |
| Review authentication, secrets and network exposure | [Security model](/developers/security-model/) |
| Improve these docs | [Contributing to the docs](/developers/contributing-docs/) |

## Repositories

| Repository | Contents |
|---|---|
| [`maize-workflow-management-editor`](https://github.com/datacrop/maize-workflow-management-editor) | Vue 3 editor (`ui/`) |
| [`maize-model-repository`](https://github.com/datacrop/maize-model-repository) | Spring Boot backend, `assistant-runtime/` (Preview), Elastic stack config, Kafka/AKHQ |
| [`maize-processing-engine-airflow`](https://github.com/datacrop/maize-processing-engine-airflow) | Airflow (CeleryExecutor) stack |
| [`maize-processing-engine-worker`](https://github.com/datacrop/maize-processing-engine-worker) | Celery worker + WME agent (`daghandler`, Go) |
| [`maize-mvp`](https://github.com/datacrop/maize-mvp) | Single-host deployment bundle |
| `datacrop/maize-processor-*` | The bundled processors |
| [`datacrop`](https://github.com/datacrop/datacrop) | This documentation site |
