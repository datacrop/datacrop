---
layout: page
title: 5. Workflow Editor Setup
parent: Manual Setup
permalink: /editor/
nav_order: 5
---

# DataCROP Maize Workflow Management Editor Deployment
This is a demo deployment instance for the **Maize DataCROP version**. It deploys the **DataCROP Workflow Management Engine** web application for creating and managing workflows. The deployment consists of a single container.

Use this page when following the **manual per-repository setup**. If you use **Maize MVP**, the editor is deployed by the MVP script; follow the initialization steps below once it is up. See [Maize Setup](/Setup/) for the two setup options.


### Prerequisites

Before proceeding, ensure you have completed the setup instructions for the [Maize Model Repository](https://github.com/datacrop/maize-model-repository).

After completing the setup, follow these steps to configure your environment variables:

1. In the Workflow Editor repository, edit the repo-root `.env` file.
2. Update the file with the correct values for your infrastructure. Current values from `maize-workflow-management-editor/.env` are:

    ```plaintext
    VITE_API_URL=http://<WME_API_HOST>:9090
    VITE_BACKEND_IP=<WME_API_HOST>
    VITE_AIRFLOW_IP=<AIRFLOW_HOST>
    VITE_KEYCLOAK_URL=https://<KEYCLOAK_HOST>/
    VITE_KEYCLOAK_REALM=<KEYCLOAK_REALM>
    VITE_KEYCLOAK_CLIENT_ID=<KEYCLOAK_CLIENT_ID>
    VITE_PROJECT_NAME=<PROJECT_NAME>
    VITE_DEFAULT_PRIMARY_COLOR=#DA3333
    ```

   Adjust the above values only if your deployment differs (e.g., different host IP or Keycloak realm). No secrets are stored in this file.


Once these parameters are correctly set, you can proceed with the deployment.

### REQUIREMENTS

- [Docker-CE](https://www.docker.com/)

### Start The Application.

1. Clone the repository and navigate to the source directory containing the `docker-compose.yaml` file.
2. Run the following command:

    ```bash
    docker compose up -d
    ```


### Verify that everything is up and running

Wait for the services to start, then run the following commands:

1. Check if the container is running:

    ```bash
    docker ps --filter name=wme-ui --format "table {% raw %}{{.Image}}{% endraw %}\t{% raw %}{{.Names}}{% endraw %}"
    ```

    You should see the following output:

    ```bash
    IMAGE                                        NAMES
    wme-ui:latest                                wme-ui
    ```

2. Check if the network is set up correctly:

    ```bash
    docker network ls --filter name="maize-workflow-management-editor_wme-network" --format "table {% raw %}{{.Name}}{% endraw %}\t{% raw %}{{.Driver}}{% endraw %}\t{% raw %}{{.Scope}}{% endraw %}"
    ```

    Ensure the output matches the following:

    ```bash
    NAME                                           DRIVER    SCOPE
    maize-workflow-management-editor_wme-network   bridge    local
    ```


### Post-deployment initialization (required)

Perform this step after the UI is reachable (applies to both Maize MVP and manual setups):

1. Log in through Keycloak.
2. In the Workflow Editor UI, open **Settings**.
3. Click **Initialize resources**.

If you want instance-specific predefined processors, configure `config/extra-processors.json` in the Model Repository before clicking Initialize resources; use `config/extra-processors.example.json` as a template.

What this does:
- Creates the base data models, workers, asset categories, data interface types, and processor definitions needed for the application to function.
- Imports any custom processors defined in `config/extra-processors.json` of the Model Repository (see [Model Repository Setup](/model-repo/)).

Run this once per environment after deployments. Skipping it leaves the system uninitialized.

#### Make Sure Everything Works

1. Open a browser and go to `http://<WME_UI_HOST>:5173/MainPage/Warehouse`.
2. You will be redirected to the Keycloak authentication page. Enter the credentials provided by your organization.
3. After successful authentication, you will be redirected to the main page of the workflow management engine, where you can begin creating and managing workflows.


#### Stop everything.

Navigate to the source directory and run the following command.

    docker compose down
