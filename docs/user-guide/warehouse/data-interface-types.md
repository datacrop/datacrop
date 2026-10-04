---
title: Data interface types (admin)
slug: /user-guide/warehouse/data-interface-types/
sidebar_position: 6
description: Define the templates digital resources are created from.
---

# Data interface types (admin)

A **data interface type** is the template for a kind of endpoint. It lists the connection parameters a digital resource of that type must provide and whether Logstash can use it. Only administrators see this tab.

Initialize Resources creates nine types — `elasticsearch`, `kafka`, `http`, `mongodb`, `s3`, `redis`, `rabbitmq`, `beats`, `mqtt` — documented in [Interface types](/reference/interface-types/). Most deployments never need more.

<Screenshot src="/img/screens/data-interface-types.jpg" caption="Warehouse → Data Interface Types. This instance also has a custom MCP type." />

## Create or edit a type

**Warehouse → Data Interface Types → Add Data Interface Type**:

| Field | Meaning |
|---|---|
| **Name**, **Description** | The name becomes the `<INTERFACE>` prefix of injected environment variables (`kafka` → `KAFKA_…`). |
| **Interface Category** | Database, API, File System, Message Queue, Streaming, WebSocket, FTP, SFTP, HTTP, HTTPS, TCP, UDP or Custom. |
| **Logstash Compatible** | Whether resources of this type may appear in Logstash pipelines. The backend additionally tracks *supports Logstash input* / *output* per type. |
| **Parameters** | For each parameter: name, **key** (the `<KEY>` part of the env var), description, **category** (Connection, Authentication, Data Location, Format, Advanced), type and default value. |

<Screenshot src="/img/screens/data-interface-type-form.jpg" caption="Kafka interface template: connection parameters and Logstash compatibility." />

:::caution
Renaming a type or a parameter key changes the environment variable names processors receive. Update the processors that rely on them.
:::
