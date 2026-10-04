---
title: Troubleshooting & FAQ
slug: /user-guide/troubleshooting/
sidebar_position: 12
description: Fixes for the most common problems, grouped by where you notice them.
---

# Troubleshooting & FAQ

## Login and access

| Symptom | Cause / fix |
|---|---|
| Requests fail right after login | The Keycloak token must contain a `userId` claim. The MVP realm adds it; for your own realm add the mapper ([Keycloak](/deploy/manual/keycloak/)). |
| Admin-only items are missing | Your Keycloak roles must include a role whose name contains `admin` (the MVP's `admins` group grants it). |

## Warehouse

| Symptom | Cause / fix |
|---|---|
| Warning that resources are not initialized | Run [Initialize Resources](/user-guide/settings/#initialize-resources) for this user. |
| *Provision workers from Celery* shows no workers | The worker is not running or not registered with Airflow's Celery, or the backend cannot reach Flower (`FLOWER_BASE_URL`). |
| Provisioning status shows an error | Usually a wrong repository URL/branch, a private repository without an **Access token**, or a repository without a compose file in the given directory. Fix the definition and click **Re-provision**. |
| A processor definition cannot be deleted | It is used by at least one workflow. Remove those processors first. |
| Parameter fields of a resource are empty | Select a Data Interface Type first; or click **Use Defaults**. |

## Workflow Lab

| Symptom | Cause / fix |
|---|---|
| **Save** is disabled | Set a workflow name; if **Requires Scheduler** is on, set a schedule. |
| **Run** is disabled after saving | Airflow is loading the new DAG (short countdown) or a processor is still being provisioned (button shows *Provisioning*; hover for details). |
| A connection is refused | The processor does not support that resource's interface type, or you tried to link two resources. Check the definition's **Interfaces** step. |
| The run fails in Airflow | Open **3. Airflow Runs**, select the failed step and read its log. Typical causes: image cannot be pulled (add [registry credentials](/user-guide/settings/#registry-credentials)), worker cannot reach a resource, processor exits on a missing parameter. |
| The DAG does not appear | Check **Airflow Runs** for import errors; DAG files are written by the backend into Airflow's `dags/` folder ([Deploy → Airflow](/deploy/manual/airflow/)). |

## Running processors

| Symptom | Cause / fix |
|---|---|
| Container keeps restarting | **Worker Runtime → Recent output** shows why. A common case is a missing Kafka topic or a wrong address in a resource. |
| Worker Runtime says the runtime is unreachable | The backend cannot reach the worker's agent on port 8090, or `WME_SERVICE_TOKEN` differs between backend and worker. |
| Containers without a processor | Listed under **Orphaned deployments**; remove them there. |

## Logstash, observations and Kibana

| Symptom | Cause / fix |
|---|---|
| A resource is missing from a Logstash pipeline's inputs/outputs | Its type is not Logstash-compatible in that direction (MQTT, MongoDB). |
| Pipeline is not running | It is paused, or empty (no eligible input/output and no filter), or the filter is invalid. |
| Kibana view keeps loading | Kibana is still starting, or the browser cannot reach `VITE_KIBANA_URL`. |
| Observation dashboard is empty | No events yet on the observed resource, or the time range excludes them. |

## FAQ

**Can one processor run on several workers?** Each processor in a workflow runs on one worker, but its code is provisioned on all workers, so you can add the same definition several times to a workflow with different Worker Stations, or move it by changing its Worker Station.

**Does WME need Airflow for Logstash pipelines?** No. Logstash pipelines are generated directly by the backend and run continuously while active.

**Where do processor logs go?** To the container's stdout, visible in Worker Runtime. Airflow step logs show the deployment commands, not the processor's own output.

**Can I use something other than Kafka?** Yes — any of the nine interface types, or custom ones an administrator adds. Your processor reads the corresponding `<INTERFACE>_<KEY>_<DIRECTION>` variables.
