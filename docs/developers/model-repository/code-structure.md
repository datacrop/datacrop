---
title: Code Structure
slug: /developers/model-repository/code-structure/
sidebar_position: 4
description: Backend packages and the code paths responsible for each feature.
---

# Model Repository Code Structure

The backend application lives under `maize-model-repository/model-repository-server/src/main/java/com/modular/workflow`.

## Package Map

| Package | Responsibility |
|---|---|
| `Controllers` | HTTP endpoints, auth header handling, request routing, and OpenAPI annotations. |
| `service` | Business logic, persistence orchestration, external service calls, file rendering, provisioning, monitoring, and token handling. |
| `repository` | Spring Data MongoDB repositories. |
| `model/entity` | Persisted catalog, settings, observation, workflow, and status records. |
| `model/dto` | API DTO classes. Many currently extend entity classes. |
| `model/dataModels` | Embedded structures such as `Parameter`, `ParameterValue`, `DataSchema`, `Location`, and `Position`. |
| `model/dataTypes` | Workflow and template graph payload structures. |
| `model/Graph` | Node, edge, and workflow graph helpers used by workflow payloads. |
| `converter` | Entity-to-DTO conversion helpers. |
| `listeners` | Mongo lifecycle listeners for timestamps, defaults, or consistency hooks. |
| `config` | Spring Security and SpringDoc/OpenAPI configuration. |
| `errors` | Custom exceptions and REST exception handling. |
| `util` | Shared utilities, JinJava rendering, legacy DAG generation, and credential encryption. |

## Controller Groups

| Controller | Primary endpoints | Notes |
|---|---|---|
| `TestController` | `/test/v1/ping` | Unauthenticated connectivity check. |
| `AssetController` | `/user/v1/resource/ac`, `/user/v1/resource/asset` | Asset Categories and Worker Assets. Creating a Worker can trigger processor re-provisioning. |
| `DataInterfaceController` | `/user/v1/resource/dit`, `/user/v1/resource/ds` | Data Interface Types and Digital Resources. |
| `DataKindController` | `/user/v1/resource/dk` | Payload contract metadata used by Digital Resources. |
| `ObservationController` | `/user/v1/resource/obs` | Observation records and search. |
| `ProcessorController` | `/user/v1/dpe/registry/*` | Processor Definitions, Processor Manifests, Workflows, Workflow Templates, DAG status, Airflow run details, and cleanup endpoints. |
| `SettingsController` | `/user/v1/settings*` | User settings, GitHub token CRUD and per-user AI provider (`/settings/ai-provider`, `/test`). |
| `MonitoringController` | `/user/v1/monitoring/logstash/*` | Logstash pipeline status and activation operations. |
| `VisualizationController` | `/user/v1/visualization/*` | Kibana link and data-view resolution. |
| `CeleryWorkerController` | `/user/v1/resource/celery/workers*` | Flower-backed Celery worker discovery/import. |
| `WorkerRuntimeController` | `/user/v1/monitoring/workers*` | Worker Runtime: workers, containers per processor, logs, start/stop/restart, orphan removal (relayed to worker agents). |
| `LogstashAiController` | `/api/ai/logstash/chat`, `/api/ai/logstash/active-config` | Streaming chat for Logstash filter assistance; active provider/model. |
| `AssistantController` *(preview)* | `/api/assistant/*` | Workflow Assistant threads, catalogue tools, resource creation, drafts and the model proxy. See [Assistant runtime](/developers/assistant-runtime/). |

## Service Responsibilities

Use the manager/service layer for behavior changes rather than putting business rules in controllers.

| Service | Main responsibility |
|---|---|
| `DataInterfaceTypeManager`, `DigitalResourceManager`, `DataKindManager`, `AssetManager`, `AssetCategoryManager` | Catalog CRUD, search, ownership, and defaults. |
| `ProcessorDefinitionManager` | Processor Definition validation, persistence, source fields, and re-provision triggers. |
| `ProcessorProvisioningService` | Fan-out of processor source folders to workers and provisioning status records. |
| `ProcessorManifestManager` | Processor instance persistence and Logstash-related save/delete side effects. |
| `ProcessorOrchestratorManager` | Workflow persistence, run/stop behavior, Airflow API calls, and search. |
| `WorkflowTemplateManager` | Save, search, update, delete, and instantiate workflow templates. |
| `DagManager`, `FileHandlingManager` | Airflow DAG rendering and distribution to workers. |
| `LogstashManager`, `LogstashMonitoringService` | Logstash config rendering, `pipelines.yml`, and monitoring status. |
| `KibanaService` | Kibana data view and visualization destination setup. |
| `SettingsManager`, `CredentialEncryptor` | Settings merge semantics plus encrypted registry and GitHub token handling. |
| `CeleryWorkerSyncService`, `AirflowRunMonitorManager` | External runtime status import and Airflow run inspection. |
| `WorkerRuntimeClient` | HTTP client for the worker agents' `/runtime/*` API (adds `X-WME-Service-Token`). |
| `LogstashAiService` | Chat completions against the server default or the user's AI provider. |

## Configuration Files

| File | Purpose |
|---|---|
| `model-repository-server/src/main/resources/application.properties` | Maps environment variables to Spring properties. |
| `.env.example` | Deployment-time environment template. |
| `docker-compose.yml` | Backend, MongoDB, Kafka/AKHQ, and ELK service wiring. |
| `model-repository-server/src/main/resources/*.j2` | JinJava templates for Airflow DAGs and Logstash pipelines. |
| `model-repository-server/src/main/resources/kibana/*.json` | Kibana saved-object assets used by visualization provisioning. |
| `config/extra-processors.example.json` | Optional extra processor catalog seed template. |

## Change Guidance

- Add or change endpoint behavior in the relevant controller and manager together.
- Keep OpenAPI annotations in sync with side effects, async behavior, and response status codes.
- Update these public docs when a contract changes, and update backend `docs/` when a cross-service sequence changes.
- Prefer adding tests around managers for business rules and controller tests for route/auth/wire-shape behavior.
