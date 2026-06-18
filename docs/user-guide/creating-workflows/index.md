---
title: "3. Creating Workflows"
slug: /creating-workflows/
sidebar_position: 3
---

# Creating Workflows

This page documents the current Lab implementation: workflow details, flow editor behavior, runtime actions, and template usage.

## Before You Start

Prepare these first in Warehouse:

- At least one **Processor Definition**.
- At least one **Digital Resource**.
- At least one **Worker** (unless using existing infrastructure mode where allowed).

See [Creating Data Models](/creating-data-models/).

## End-To-End Workflow Creation

### 1) Configure Workflow Details (Required)

1. Open **Workflow Lab**.
2. In **1. Workflow Details**, set:
   - Workflow **Name** (required to save/update)
   - Workflow **Description** (optional)
   - DAG configuration fields
3. If `requires_scheduler` is enabled, **Schedule** is required.

![Workflow Lab details](/img/user-guide/wme/page-workflow-lab.jpg)

Saved workflows can also be opened from **Warehouse -> Workflows**. Selecting a workflow row loads that saved workflow in Lab so you can inspect or update its metadata, graph, processor forms, and Airflow views.

![Workflow opened from Warehouse](/img/user-guide/wme/warehouse-workflows-item-opened-in-lab.jpg)

### 2) Build The Flow Graph

Open **2. Flow Creator** and use either approach:

- **Processor nodes**:
  - Click **Add Processor**, or
  - Drag a processor preset from the left panel (this creates and persists a processor instance immediately).
- **Digital Resource nodes**:
  - Click **Add Digital Resource**, or
  - Drag an existing Digital Resource from the left panel.

Double-click a node (or select + Edit) to open configuration forms.

![Flow Creator canvas](/img/user-guide/wme/lab-flow-creator.jpg)

### 3) Configure Processor Nodes

Processor form currently supports:

- **General**: `name`, `description`.
- **Deployment**:
  - `assetID` (worker) required unless `usesExistingInfrastructure` is enabled for eligible Data Persistence processors.
- **Details**:
  - `processorDefinitionReferenceID` (required).
  - parameter values based on selected Processor Definition template.
- **Data Flow**:
  - `dataInput` and `dataOutput` Digital Resource lists.

Current special behavior:

- **Kibana Pipeline**: `dataOutput` is disabled in form.
- **Logstash Pipeline**:
  - Data Input and Data Output lists are filtered by each Data Interface Type's Logstash capability flags (`logstashCompatible`, `supportsLogstashInput`, `supportsLogstashOutput`). Only compatible types appear; custom types created by admins are included if their flags permit.
  - A dedicated **Logstash Filter** section lets you write or AI-generate the filter body (filter plugin content only, no `filter {}` wrapper).
  - See [Logstash Pipelines](/logstash-pipelines/) for the full guide including the AI Logstash Assistant.
- **Derived Environment Variables** preview is shown from selected DS input/output using:
  - `<INTERFACE>_<KEY>_<DIRECTION>`

Example directions:

- `_INPUT` for processor inputs.
- `_OUTPUT` for processor outputs.

This matches the processor integration contract in [Integrating Custom Processors](/integrating-processors/).

![Logstash processor form](/img/user-guide/wme/lab-processor-form-logstash-pipeline.jpg)

### 4) Connect Nodes And Transfer Digital Resources

#### Direct DS &lt;-&gt; Processor links

- Connect **DS -> Processor** to add DS to processor `dataInput`.
- Connect **Processor -> DS** to add DS to processor `dataOutput`.

These edges are labeled `INPUT` or `OUTPUT`.

#### Processor -> Processor links (Transfer dialog)

Connecting two processor nodes opens **Transfer Digital Resources between Processors**.

Available options:

1. Select source output DS values to add into target inputs.
2. Select target input DS values to add into source outputs.
3. Select one existing DS for both sides.
4. Create a new DS for both sides.
5. Proceed without transfer.

### 5) Save / Update Behavior

- **Save** (new workflow) and **Update** (existing workflow) are disabled until:
  - workflow name is present, and
  - schedule is provided when `requires_scheduler=true`.
- Payload includes workflow nodes/edges plus compatibility fields (`dataProcessors`, `edgeConf`).
- After save/update, Lab warns that Airflow visibility can take up to two minutes.

### 6) Run / Stop Behavior

From Lab toolbar or Warehouse workflow row actions:

- **Run** triggers workflow DAG via `dagConf.dag_id`.
- **Stop** triggers teardown DAG by appending `_teardown` to the same DAG id.
- In Warehouse tables, these actions are shown as **Deploy** and **Stop** for workflow rows.

### 7) Airflow Views In Lab

- Unsaved workflows show warning in Lab Airflow tab.
- Saved workflows show toggle:
  - **Deployment** DAG
  - **Teardown** DAG
- Embedded grid iframe path in Lab is derived from workflow name/id formatting.

Use the **Deployment** view to inspect the workflow run DAG and the **Teardown** view to inspect the stop/cleanup DAG generated for the same workflow.

![Lab Airflow tab](/img/user-guide/wme/lab-airflow-tab.jpg)

For global Airflow iframe behavior, see [Airflow](/airflow-note/).

Kibana monitoring is not part of Lab tabs; it is available as a separate sidebar page.

### 8) Workflow Templates

Template features currently available:

- In Lab flow editor: **Save as Template**.
- In Warehouse Workflows tab:
  - **Create Workflow from Template**
  - Edit/Delete template when user is owner or admin.

## Common Constraints And Validation Notes

- Worker is required for most processors when not using existing infrastructure mode.
- Processor Type must be selected before parameter template values can be filled.
- DS links and processor-to-processor transfer update processor input/output lists used by runtime env-var injection.

## Troubleshooting

- **Save/Update disabled**: set workflow name; if scheduler is enabled, provide schedule.
- **Run/Stop shows DAG id warning**: ensure `dag_id` exists in workflow DAG configuration.
- **Workflow not visible in Airflow immediately**: allow up to two minutes after save/update.
- **Graph edits not reflected in backend yet**: explicit **Update** is the safest persistence action for existing workflows.
- **Cannot assign output for Kibana Pipeline**: this is intentional in current PM form behavior.
