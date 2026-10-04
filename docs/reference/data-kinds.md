---
title: Data kinds
slug: /reference/data-kinds/
sidebar_position: 4
description: The built-in data kinds and their schemas.
---

# Data kinds

Created by **Initialize Resources**.

| Data kind | Payload shape | Cardinality | Schema format |
|---|---|---|---|
| [Observation](#observation) | Structured | Single | JSON Schema |
| [Telemetry Event](#telemetry-event) | Structured | Stream | JSON Schema |
| [Asset State](#asset-state) | Structured | Single | JSON Schema |
| [Tabular Records](#tabular-records) | Tabular | Collection | CSV columns |
| Generic JSON Payload | Structured | Single | JSON (empty schema) |
| XML Document | Structured | Single | XML / XSD (empty) |
| Avro Record | Structured | Single | Avro (empty) |
| Document | Text | Single | — (plain text) |
| Binary Blob | Binary | Single | — |

## Observation

Used by observation pipelines and the Observation dashboard — keep it unchanged.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Observation",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "digitalResourceID": { "type": "string" },
    "digitalResourceName": { "type": "string" },
    "assetID": { "type": "string" },
    "assetName": { "type": "string" },
    "dataKindID": { "type": "string" },
    "dataKindName": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "value": { "type": "string" }
  },
  "required": ["id", "digitalResourceID", "digitalResourceName", "assetID", "assetName",
               "dataKindID", "dataKindName", "timestamp", "value"],
  "additionalProperties": false
}
```

## Telemetry Event

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Telemetry Event",
  "type": "object",
  "properties": {
    "eventTime": { "type": "string", "format": "date-time" },
    "assetId": { "type": "string" },
    "metric": { "type": "string" },
    "value": {},
    "unit": { "type": "string" }
  },
  "required": ["eventTime", "assetId", "metric", "value"],
  "additionalProperties": true
}
```

## Asset State

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Asset State",
  "type": "object",
  "properties": {
    "timestamp": { "type": "string", "format": "date-time" },
    "assetId": { "type": "string" },
    "state": { "type": "string" },
    "attributes": { "type": "object" }
  },
  "required": ["timestamp", "assetId", "state"],
  "additionalProperties": true
}
```

## Tabular Records

CSV column definitions:

| Column | Type | Required |
|---|---|---|
| `timestamp` | date | yes |
| `asset_id` | string | yes |
| `value` | number | no |
