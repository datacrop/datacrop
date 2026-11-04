---
title: Configuring processors
slug: /user-guide/workflow-lab/configuring-processors/
sidebar_position: 3
description: Choose the worker, set parameters and see the environment your container will receive.
---

# Configuring processors

Double-click a processor to open **Edit a Processor**.

## General Information

**Name** and **Description** of this processor instance.

## Deployment

**Worker Station** — the worker this processor runs on. The read-only fields next to it (IP address, queue name, status, concurrency, tags) come from the worker's catalogue entry. Logstash Pipeline processors have no worker.

<Screenshot src="/img/screens/pm-worker.jpg" caption="Choosing the Worker Station." />

## Details

**Processor Type** — the processor definition. Changing it reloads the parameter table.

## Data Flow

**Data Input** and **Data Output** — the connected digital resources. The lists only offer resources whose interface type the definition supports (shown as *Supported inputs / outputs*). **Create new data input / output** creates a resource without leaving the form.

## Processor Parameters

One row per parameter of the definition: **Name**, **Environment Variable** and **Value**. **Use Defaults** fills the default values.

<Screenshot src="/img/screens/pm-params.jpg" caption="Processor parameters and their environment variable names." />

## Published Ports

Shown when the definition is a single container that lists the [ports its image listens on](/user-guide/warehouse/processor-definitions/#2-runtime). One row per port:

- **Host port**: where it is reachable on the worker's address. It defaults to the same number. A host port can only be used by one processor on a worker, so a second processor of the same definition on that worker needs another one. WME can only check its own processors: if something else on the machine holds the port, the deployment fails when the container starts.
- **Host address** (optional): an IP address of the worker to bind to, for example `127.0.0.1`. Empty means all interfaces.

The container finds its host port in `WME_PORT_<port>`, for example `WME_PORT_80=18080`. Deploying again replaces the processor's previous container.

## Derived Environment Variables

A read-only table — tagged *Auto-injected* — of the variables WME will add to the container for every parameter of every connected resource:

```text
<INTERFACE>_<KEY>_<DIRECTION>
```

Columns: variable, value, source resource and direction (INPUT / OUTPUT). If a derived variable has the same name as a processor parameter, the derived value wins.

<Screenshot src="/img/screens/pm-derived.jpg" caption="Variables injected from the connected resources." />

## Logstash Pipeline processors

For the built-in Logstash Pipeline the form shows a **Logstash Filter Configuration** section instead of a worker, with an **AI Assistant**. See [Logstash pipelines](/user-guide/logstash-pipelines/).
