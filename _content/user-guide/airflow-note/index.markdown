---
layout: page
title: "5. Airflow"
parent: User Guide
permalink: /airflow-note/
nav_order: 5
---

# Airflow

![Airflow Screenshot](/assets/img/airflow-note/airflow.png)

The editor exposes Airflow in two places:

- **Sidebar Airflow DAGs page**: opens the Airflow home UI in an iframe.
- **Lab -> Airflow tab** (for a selected workflow): embeds workflow-specific DAG grid views with a toggle between:
  - **Deployment**
  - **Teardown**

## Workflow Runtime Actions

For saved workflows:

- **Run** triggers the deployment workflow using `dagConf.dag_id`.
- **Stop** triggers teardown using `dagConf.dag_id + "_teardown"`.

## What To Expect

- Unsaved workflows cannot be inspected in the Lab Airflow tab.
- After save/update, workflow DAGs may take up to two minutes to appear and become runnable.
