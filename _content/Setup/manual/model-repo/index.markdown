---
layout: page
title: 4. Model Repository Setup
parent: Manual Setup
permalink: /model-repo/
nav_order: 4
---

# DataCROP Maize Model Repository Deployment

Use this page when following the **manual per-repository setup**. If you use **Maize MVP**, the model repository is deployed by the MVP script; refer here only for customization or troubleshooting. See [Maize Setup](/Setup/) for the two setup options.

This is a demo deployment instance for the **Maize DataCROP version**. It deploys the **DataCROP Model Repository infrastructure**, consisting of the WME server plus supporting containers (MongoDB and the Elastic Stack services used by Logstash/Kibana pipelines).

### Requirements

- [Docker-CE](https://www.docker.com/)


### Prerequisites

Before proceeding, make sure you have completed the following steps:

1. **Airflow Setup**:
   - Ensure that you have followed the setup instructions for both the [Airflow Processing Engine](https://github.com/datacrop/maize-processing-engine-airflow) and the [Processing Engine Worker](https://github.com/datacrop/maize-processing-engine-worker). These components need to be properly configured and running before deploying the Maize DataCROP Model Repository.

After completing the setup, follow these steps to configure your environment variables:

1. Navigate to your environment variable file (e.g., `.env` or the relevant configuration file for your deployment).
2. Update the file with the correct values for your infrastructure. Below are the current values from `maize-model-repository/.env` and `docker-compose.yml`; sensitive secrets are redacted—keep using the real values already present in your `.env`.

    ```plaintext
    # Application
    SERVER_PORT=9090
    MAX_FILE_SIZE=200MB
    MAX_REQUEST_SIZE=500MB

    # Workflow Management Engine
    VM_WME_IP=<YOUR_IP>
    VM_WORKER_IP=<YOUR_IP>
    WEBSERVER_DAGS_FOLDER=/path/to/maize-processing-engine-airflow/dags
    WORKER_API_PORT=8090

    # Harbor
    HARBOR_URL=harbor.example.com/
    HARBOR_USERNAME=<HARBOR_USERNAME>
    HARBOR_TOKEN=[REDACTED – keep existing value in your .env]

    # MongoDB
    MONGO_INITDB_ROOT_USERNAME=root
    MONGO_INITDB_ROOT_PASSWORD=[REDACTED – keep existing value in your .env]
    MONGO_USERNAME=root
    MONGO_PASSWORD=[REDACTED – keep existing value in your .env]
    MONGO_DATABASE=registry
    MONGO_PORT=27017
    MONGO_HOST=<MONGO_HOST>

    # Kafka
    KAFKA_ENABLED=false
    KAFKA_BOOTSTRAP_SERVERS=<KAFKA_BOOTSTRAP_SERVERS>

    # Logstash
    LOGSTASH_CONFIG_FOLDER=/app/logstash/config/
    LOGSTASH_PIPELINE_FOLDER=/app/logstash/pipeline/

    # Keycloak
    KEYCLOAK_ISSUER_URI=https://keycloak.example.com/realms/YOUR-REALM
    KEYCLOAK_PROVIDER=<KEYCLOAK_PROVIDER>
    KEYCLOAK_CLIENT_NAME=<KEYCLOAK_CLIENT_NAME>
    KEYCLOAK_CLIENT_ID=<KEYCLOAK_CLIENT_ID>
    KEYCLOAK_CLIENT_SECRET=[REDACTED – keep existing value in your .env]
    KEYCLOAK_SCOPE=openid,offline_access,profile,roles
    KEYCLOAK_USER_NAME_ATTR=preferred_username
    KEYCLOAK_JWK_SET_URI=https://keycloak.example.com/realms/YOUR-REALM/protocol/openid-connect/certs

    # Credentials Encryption
    CREDENTIALS_ENCRYPTION_KEY=<BASE64_32_BYTE_KEY>

    # Elastic Stack
    ELASTIC_VERSION=8.15.3
    ELASTIC_PASSWORD=[REDACTED – keep existing value in your .env]
    LOGSTASH_INTERNAL_PASSWORD=[REDACTED – keep existing value in your .env]
    KIBANA_SYSTEM_PASSWORD=[REDACTED – keep existing value in your .env]
    METRICBEAT_INTERNAL_PASSWORD=[REDACTED – keep existing value in your .env]
    FILEBEAT_INTERNAL_PASSWORD=[REDACTED – keep existing value in your .env]
    HEARTBEAT_INTERNAL_PASSWORD=[REDACTED – keep existing value in your .env]
    MONITORING_INTERNAL_PASSWORD=[REDACTED – keep existing value in your .env]
    BEATS_SYSTEM_PASSWORD=[REDACTED – keep existing value in your .env]

    # Airflow (WME integration)
    AIRFLOW_BASE_URL=http://<AIRFLOW_HOST>:8080/api/v1
    AIRFLOW_USERNAME=<AIRFLOW_USERNAME>
    AIRFLOW_PASSWORD=[REDACTED – keep existing value in your .env]
    ```

   Sensitive secrets are redacted above; ensure your `.env` retains the real values currently configured.

### Defaults created by Initialize resources

When a Workflow Editor user clicks **Settings** → **Initialize resources**, the Model Repository seeds a baseline catalog (only if the resources don't already exist). This includes default **data interface types** and **processor definitions**.

#### Default data interface types

These interface types are intentionally aligned with the editor's **automatic Logstash pipeline creation**: the editor uses these type names and fields to generate Logstash input/output configuration automatically.

- **`elasticsearch`**
  - `hosts`: `167.235.128.77:9200`
  - `user`: `logstash_internal`
  - `password`: `${LOGSTASH_INTERNAL_PASSWORD}`
  - `index`: `test_index`
- **`kafka`**
  - `bootstrap_servers`: `167.235.128.77:9092`
  - `topic_id`: `giannis_processed`
- **`http`**
  - `url`: `http://localhost:8080/api`
  - `port`: `8080`
  - `http_method`: `post`
  - `format`: `json`
  - `user`: `""`
  - `password`: `""`
- **`mongodb`**
  - `uri`: `mongodb://localhost:27017/mydb`
  - `database`: `mydb`
  - `collection`: `mycollection`
- **`s3`**
  - `bucket`: `my-bucket`
  - `region`: `eu-central-1`
  - `endpoint`: `""` (empty means AWS S3; otherwise can be e.g. `http://minio:9000`)
  - `access_key_id`: `""`
  - `secret_access_key`: `""`
  - `prefix`: `logs/`
- **`redis`**
  - `host`: `localhost`
  - `port`: `6379`
  - `data_type`: `list` (supported: `list`, `channel`, `pattern_channel`)
  - `key`: `mylist`
  - `password`: `""`
- **`rabbitmq`**
  - `host`: `localhost`
  - `port`: `5672`
  - `user`: `guest`
  - `password`: `guest`
  - `queue`: `myqueue` (input)
  - `exchange`: `myexchange` (output)
  - `exchange_type`: `direct` (supported: `direct`, `topic`, `fanout`)
  - `vhost`: `/`
- **`mqtt`**
  - `broker`: `tcp://localhost`
  - `port`: `1883`
  - `topic`: `sensor/data`
  - `username`: `""`
  - `password`: `""`
  - `client_id`: `modul4r-client`
  - `qos`: `0`
  - `clean_session`: `true` (not Logstash-compatible by default)

#### Default processor definitions

Initialize resources also creates these processor definitions (if missing):

- **`Apache Kafka`** (`Data Persistence`, `0.1`) — provisions Kafka + AKHQ.
- **`Kibana Pipeline`** (`Datacrop Service`, `1.0`) — enables the built-in Kibana pipeline (`active=true`).
- **`Logstash Pipeline`** (`Datacrop Service`, `1.0`) — enables the built-in Logstash pipeline (`active=true`); `logstash_filter` defaults to empty and expects filter plugin content only (no `filter {}` wrapper).

### Optional: Predefining processor definitions (before initialization)

In addition to the defaults above, deployers can ship **predefined processor definitions** that will be imported when a Workflow Editor user clicks **Initialize resources**. This lets each deployed instance come up with a customized processor catalog.

#### How to use

1. Create `config/extra-processors.json` (use the template file as a starting point):
   - `cp config/extra-processors.example.json config/extra-processors.json`
2. Edit `config/extra-processors.json`:
   - **Kafka is just an example** in the template; rename the processor `name` and/or replace the entry with your own processors.
3. Ensure the file is mounted into the Model Repository container (already present in `docker-compose.yml`):
   - `./config/extra-processors.json:/app/config/extra-processors.json:ro`
4. Deploy the Model Repository, then in the Workflow Editor go to **Settings** → **Initialize resources** (see [Workflow Editor Setup](/editor/)).

#### File format (schema)

The server expects a root object with a `processors` array:

- Root: `{ "processors": [ ... ] }`
- Each processor:
  - `name`, `description`, `processorType`, `version`, `copyright`, `processorLocation`, `fontAwesomeIcon`, `projectName`, `containerImage`
  - `parameters`: a list of `{ "name", "description", "type", "defaultValue" }`

Example (from `config/extra-processors.example.json`):

```json
{
  "processors": [
    {
      "name": "Kafka Example",
      "description": "This processor is used for building a Kafka cluster alongside the akhq frontend for visualizations",
      "processorType": "Data Persistence",
      "version": "0.1",
      "copyright": "Apache",
      "processorLocation": "Local Deployment",
      "fontAwesomeIcon": "fa-solid fa-bus",
      "projectName": "test",
      "containerImage": "",
      "parameters": [
        {
          "name": "KAFKA_NETWORK",
          "description": "",
          "type": "String",
          "defaultValue": "kafka-network"
        },
        {
          "name": "KAFKA_DATA",
          "description": "",
          "type": "String",
          "defaultValue": "kafka-data"
        },
        {
          "name": "KAFKA_HOSTNAME",
          "description": "",
          "type": "String",
          "defaultValue": "kafka"
        },
        {
          "name": "KAFKA_CONTAINER_NAME",
          "description": "",
          "type": "String",
          "defaultValue": "kafka"
        },
        {
          "name": "KAFKA_EXTERNAL_PORT",
          "description": "",
          "type": "String",
          "defaultValue": "9092"
        },
        {
          "name": "KAFKA_EXTERNAL_HOSTNAME_OR_IP",
          "description": "",
          "type": "String",
          "defaultValue": "167.235.128.77"
        },
        {
          "name": "KAFKA_INTERNAL_PORT",
          "description": "",
          "type": "String",
          "defaultValue": "9094"
        },
        {
          "name": "KAFKA_INTERNAL_HOSTNAME_OR_IP",
          "description": "",
          "type": "String",
          "defaultValue": "kafka"
        },
        {
          "name": "CLUSTER_ID",
          "description": "kraft mode cluster id",
          "type": "String",
          "defaultValue": "cluster-id"
        },
        {
          "name": "AKHQ_CONTAINER_NAME",
          "description": "",
          "type": "String",
          "defaultValue": "akhq"
        },
        {
          "name": "AKHQ_IMAGE",
          "description": "",
          "type": "String",
          "defaultValue": "0.24.0"
        },
        {
          "name": "AKHQ_PORT",
          "description": "",
          "type": "String",
          "defaultValue": "8081"
        },
        {
          "name": "AKHQ_CONNECTION_NAME_PREFIX",
          "description": "",
          "type": "String",
          "defaultValue": "kafka-connection"
        }
      ]
    }
  ]
}
```

#### Behavior notes

- If the file is missing or invalid, initialization continues without failing.
- If a processor definition with the same `name` already exists, it is skipped (not overwritten).
- Changing `name` (for example, adding `v2`) creates a separate processor definition.

### Notes about default values created during initialization

The **Initialize resources** action creates the default interface templates and processor definitions listed above with deployment-specific defaults (for example IPs/ports for Elasticsearch/Kafka). Review and update the created entities in the UI after initialization if the defaults do not match your environment.

Once these parameters are correctly set, you can proceed with the deployment

### Starting the Application

1. Navigate to the source directory containing the `Dockerfile` and `docker-compose.yml` files.
2. Run the following commands:

    ```bash
    docker build -t wme .
    
    docker compose up -d
    ```

### Verifying the Deployment

Wait for the services to start, then run the following commands:

1. Check if the WME container is running:

    ```bash
    docker ps --filter name=wme-container --format "table {% raw %}{{.Image}}{% endraw %}\t{% raw %}{{.Names}}{% endraw %}"
    ```

    You should see the following output:

    ```bash
    IMAGE                                        NAMES
    wme                                          wme-container
    ```

2. Check if the MongoDB container is running:

    ```bash
    docker ps --filter name=mongo --format "table {% raw %}{{.Image}}{% endraw %}\t{% raw %}{{.Names}}{% endraw %}"
    ```

    You should see the following output:

    ```bash
    IMAGE                                        NAMES
    mongo:latest                                 mongodb-container
    ```

### Stopping the Application

To stop the containers, run the following command:

```bash
docker compose down
```
### Clean everything up.

Run the following command (**at your own risk**).

    docker compose down --volumes --remove-orphans
