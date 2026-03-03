---
layout: page
title: "Maize MVP Setup"
parent: Maize Setup
permalink: /maize-mvp/
nav_order: 1
---

# Maize MVP (single-script deployment)

Use the Maize MVP repository to bring up all Maize components with one script. This path is the fastest way to get a working demo; it provisions Keycloak automatically as part of the run.

## Repository

- Maize MVP repo: [https://github.com/datacrop/maize-mvp](https://github.com/datacrop/maize-mvp) (use your fork/URL if different).

## Prerequisites

- Docker installed on the host.
- Network/ports open for Keycloak, Airflow, Worker, Model Repository, and Workflow Editor.

## Configure environment variables

1. Clone the MVP repository and `cd` into it.
2. For each component subfolder (Keycloak, Airflow, Worker, Model Repository, Workflow Editor, etc.), open its `.env` or config file and adjust values for your environment (IP/hostnames, ports, credentials where applicable).
3. Use the corresponding manual pages for variable meanings if needed:
   - [Keycloak](/keycloak/), [Airflow](/airflow/), [Worker](/worker/), [Model Repository](/model-repo/), [Workflow Editor](/editor/)

## Run the setup script

1. In the repo root, run the provided setup script (typically `./setup.sh`; mark executable first if needed: `chmod +x setup.sh`).
2. The script will run `docker compose up` for all components. Wait until containers are healthy.

## Verify the deployment

- Check containers:
  - `docker ps --filter name=keycloak`
  - `docker ps --filter name=airflow`
  - `docker ps --filter name=worker`
  - `docker ps --filter name=wme` (model repo)
  - `docker ps --filter name=wme-ui` (workflow editor)
- Open the Workflow Editor UI at `http://<WME_UI_HOST>:5173/MainPage/Warehouse` and confirm it loads.

## Post-deployment (required)

After the Workflow Editor UI is reachable:

1. Log in via Keycloak.
2. Go to **Settings** in the editor UI.
3. (Optional) Add predefined processor definitions by placing `extra-processors.json` in the Model Repository component's `config/` folder (copy from `extra-processors.example.json`) before running the MVP script / before initialization (see [Model Repository Setup](/model-repo/) for schema details).
4. Click **Initialize resources** (see [Workflow Editor Setup](/editor/) for details).
5. This creates the base resources and any extra processors defined via the Model Repository. Skipping this leaves the system uninitialized.

## Notes on Keycloak

- In the MVP path, Keycloak is provisioned/configured automatically by the script; you do not need a pre-existing Keycloak instance.
- If you need to customize Keycloak manually, refer to the [Keycloak Setup](/keycloak/) page.
