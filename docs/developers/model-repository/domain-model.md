---
title: Domain model
slug: /developers/model-repository/domain-model/
sidebar_position: 5
description: Catalogue entities, workflow graphs and runtime records in the backend.
---

# Model Repository domain model

This glossary explains the backend objects used by the Workflow Editor and runtime services. For exact field schemas, use the live OpenAPI document at `/v3/api-docs`.

## Catalog objects

| Object | Meaning |
|---|---|
| Data Interface Type | A reusable interface template for data endpoints. It defines parameter keys such as Kafka bootstrap servers or Elasticsearch index names, plus Logstash capability flags. |
| Digital Resource | A concrete data source or sink created from a Data Interface Type. It stores actual parameter values and may reference a Data Kind. |
| Data Kind | The payload contract exchanged through Digital Resources. It carries classification metadata and an embedded `DataSchema` for JSON, CSV, XML, Avro, or free-form schema content. |
| Asset Category | A reusable template for Assets. The built-in `Worker` category defines parameters used to find worker daghandler instances. |
| Asset | A concrete asset. Worker Assets are Assets whose category is `Worker`, with IP and port parameters used for processor provisioning and DAG distribution. |
| Observation | A timestamped payload value tied to a Digital Resource, optional Asset, and Data Kind. |

## Processor and workflow objects

| Object | Meaning |
|---|---|
| Processor Definition | A reusable processor type. It defines display metadata, processor parameters, supported interfaces, and the source used to provision worker folders. |
| Processor Manifest | A configured processor instance inside a workflow. It references a Processor Definition, selected Worker Asset, parameter values, data inputs, and data outputs. |
| Processor Orchestrator | A saved workflow object. It stores DAG metadata, graph nodes/edges, processor references, and compatibility fields used by the runtime. |
| Workflow Template | A reusable workflow draft that can instantiate Processor Manifests, Digital Resource references, and graph edges into a new workflow. |

## Settings and runtime state

| Object | Meaning |
|---|---|
| Settings | Per-user settings document with frontend preferences, registry credentials, GitHub token metadata and the optional AI provider (base URL, model, encrypted key). Secrets are encrypted before persistence and masked on read. |
| AssistantThread, AssistantDraft, AssistantResourceOperation *(Preview)* | Workflow Assistant conversations, the workflow drafts they produce, and pending resource creations that wait for secure-form input. User-scoped. |
| PDProvisioningStatus | Per Processor Definition and Worker status record for source provisioning. Status is `PENDING`, `SUCCESS`, or `FAILED`. |
| DagDistributionStatus | Per workflow and Worker status record for generated DAG and teardown DAG distribution. Status is `PENDING`, `SUCCESS`, or `FAILED`. |

## Embedded value types

| Type | Meaning |
|---|---|
| Parameter | Template field with name, key, type, default value, description, and optional category. Used by Data Interface Types, Asset Categories, and Processor Definitions. |
| ParameterValue | Concrete value for a `Parameter` key. Used by Digital Resources, Assets, and Processor Manifests. |
| DataSchema | Embedded payload schema on Data Kind. It stores `format` and raw `content`. |
| Position | Canvas coordinates for processor nodes in the Workflow Lab. |

## Relationship summary

Data Interface Types define the parameter schema for Digital Resources. Data Kinds describe the payload contract that may flow through those Digital Resources. Processor Definitions define reusable processor types; Processor Manifests instantiate those types inside workflows and bind selected Digital Resources as inputs or outputs. Processor Orchestrators save the graph and DAG configuration that the backend renders into Airflow DAG files.

Worker Assets connect catalog configuration to runtime infrastructure. When a Processor Definition is source-backed, the backend provisions its folder onto Worker Assets. When a workflow is saved or updated, the backend distributes generated DAG files to Worker Assets and then uses Airflow to run them.

## Visibility and ownership

Most persisted objects include `userId`. Search/list behavior is not identical for every object:

- Digital Resources, Processor Manifests, Workflows, Settings, and Workflow Templates are user-scoped.
- Some catalog entities can be global or public, depending on manager/repository behavior.
- Processor Definitions are treated as a shared catalog in several read paths, while source tokens remain user-specific.

When integrating a new client, validate visibility behavior through the endpoint you intend to call rather than assuming every catalog type has the same sharing rules.
