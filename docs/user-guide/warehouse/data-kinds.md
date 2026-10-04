---
title: Data kinds
slug: /user-guide/warehouse/data-kinds/
sidebar_position: 3
description: Describe the shape and schema of the data a resource carries.
---

# Data kinds

A **data kind** documents what flows through a digital resource: its shape and its schema. Linking resources to data kinds makes workflows self-describing and lets the Kibana integration pick the right dashboard (resources of kind `Observation` get the Observation dashboard).

<Screenshot src="/img/screens/data-kinds.jpg" caption="Warehouse → Data Kinds: payload shape and cardinality for each kind." />

## Fields

| Field | Values |
|---|---|
| **Name**, **Description** | Free text |
| **Payload Shape** | Structured · Tabular · Text · Binary |
| **Cardinality** | Single · Collection · Stream |
| **Schema Format** | JSON (JSON Schema) · CSV (columns table) · XML (XSD) · Avro (JSON or IDL) |
| **Schema** | The schema itself. CSV kinds use a columns table (name, type `string` / `number` / `integer` / `boolean` / `date`, required). |

<Screenshot src="/img/screens/data-kind-form.jpg" caption="Telemetry Event: a structured stream with a JSON Schema." />

## Built-in data kinds

Initialize Resources creates: **Observation**, **Telemetry Event**, **Asset State**, **Tabular Records**, **Generic JSON Payload**, **XML Document**, **Avro Record**, **Document** and **Binary Blob**. Their schemas are listed in [Data kinds reference](/reference/data-kinds/). You can duplicate and adapt them.

:::tip
The `Observation` kind must keep its schema: WME's observation pipelines and the Observation dashboard rely on it.
:::
