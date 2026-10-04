---
title: Airflow DAGs (admin)
slug: /user-guide/airflow/
sidebar_position: 10
description: The embedded Apache Airflow UI.
---

# Airflow DAGs (admin)

The **Airflow DAGs** page (administrators only, last item in the rail) embeds the Airflow web UI. Every saved workflow appears there as two DAGs: `<Workflow>_<id>` (deployment) and its teardown counterpart.

Most users never need it: the Lab's [Airflow Runs](/user-guide/workflow-lab/run-and-monitor/#3-airflow-runs) tab shows the same runs and logs for one workflow. Use the Airflow UI to inspect the scheduler, all DAGs at once, or task details Airflow-style.

New DAGs are paused when Airflow first loads them; WME unpauses a DAG when you click **Run**.
