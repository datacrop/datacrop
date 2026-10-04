---
title: Writing processors
slug: /developers/writing-processors/
sidebar_position: 3
description: The contract between your code and WME, both runtimes, and a complete worked example.
---

# Writing processors

A WME processor is any program packaged as a container that reads its configuration from **environment variables**. WME supplies two kinds of variables:

1. **Parameters** you declare in the processor definition (`WINDOW_SECONDS`, `THRESHOLD`, …).
2. **Connection settings** of the digital resources a user connects to it, named `<INTERFACE>_<KEY>_<DIRECTION>` — you never declare these as parameters.

That is the whole contract. Your code does not know about WME, Airflow or workers.

## The environment-variable contract

```text
<INTERFACE>_<KEY>_<DIRECTION>
```

- `<INTERFACE>` — the data interface type name in upper case (`kafka` → `KAFKA`).
- `<KEY>` — the parameter key in upper case, non-alphanumerics replaced by `_` (`bootstrap_servers` → `BOOTSTRAP_SERVERS`).
- `<DIRECTION>` — `INPUT` for resources you read from, `OUTPUT` for resources you write to.

For a processor reading Kafka and writing Elasticsearch you can rely on, for example:

```ini
KAFKA_BOOTSTRAP_SERVERS_INPUT=kafka:9092
KAFKA_TOPIC_ID_INPUT=telemetry-raw
KAFKA_SECURITY_PROTOCOL_INPUT=PLAINTEXT
ELASTICSEARCH_HOSTS_OUTPUT=http://elasticsearch:9200
ELASTICSEARCH_INDEX_OUTPUT=alerts
ELASTICSEARCH_USER_OUTPUT=elastic
ELASTICSEARCH_PASSWORD_OUTPUT=…
```

The keys of each interface type are listed in [Interface types](/reference/interface-types/). Declare the interfaces you support in the definition's **Interfaces** step so the editor only lets users connect compatible resources. If you support the same interface in both directions, read both variants.

:::note[One resource per direction]
If a user connects several resources of the same interface type in the same direction, their variables have the same names. Design processors around one input and one output per interface type, or document which one wins.
:::

## Choose a runtime

| | Single container | Compose application (GitHub) |
|---|---|---|
| You publish | An image in a registry | A Git repository with a compose file |
| WME runs | `docker run -d -e KEY=value … <image>` | `git clone` on every worker, then `docker compose --env-file … up -d` |
| Good for | One self-contained service | Multi-container apps (sidecars, databases), building from source |
| Private sources | Settings → Registry Credentials | Settings → GitHub Tokens |

### Compose applications: pass variables through

WME writes all values to an env file and runs `docker compose --env-file <file> up -d`. Compose uses that file only for **variable substitution**, so every variable your container needs must be referenced in the compose file:

```yaml
services:
  processor:
    build: .
    environment:
      KAFKA_BOOTSTRAP_SERVERS_INPUT: ${KAFKA_BOOTSTRAP_SERVERS_INPUT:-}
      KAFKA_TOPIC_ID_INPUT: ${KAFKA_TOPIC_ID_INPUT:-}
      KAFKA_BOOTSTRAP_SERVERS_OUTPUT: ${KAFKA_BOOTSTRAP_SERVERS_OUTPUT:-}
      KAFKA_TOPIC_ID_OUTPUT: ${KAFKA_TOPIC_ID_OUTPUT:-}
      CONSUMER_GROUP_ID: ${CONSUMER_GROUP_ID:-}
      VALUE_MULTIPLIER: ${VALUE_MULTIPLIER:-1}
    restart: unless-stopped
```

Other rules:

- Put `docker-compose.yml` / `compose.yaml` at the repository root or in a subdirectory you name in the definition (**Compose directory**).
- Do not hard-code `container_name` or host ports that would clash when several instances run on one worker; WME isolates each instance with the project name `wme_<processor id>`.
- WME adds `wme.*` labels to every service through an override file — do not rely on your own labels with the same names.

## Good practice

- **Fail fast on missing configuration** with a clear log line, and exit non-zero.
- **Log to stdout** — Worker Runtime shows the last lines of each container.
- **Handle SIGTERM** — teardown stops containers; flush and commit before exiting.
- **Expose health** — a `healthcheck` lets Worker Runtime show *healthy* / *unhealthy*. The bundled processors touch `/tmp/processor-ready` once connected and check for it.
- **Keep secrets out of the repository** — they arrive as variables.

## Worked example: Telemetry Normalizer

[`maize-processor-telemetry-normalizer`](https://github.com/datacrop/maize-processor-telemetry-normalizer) reads JSON telemetry from one Kafka topic, scales or renames it and writes it to another.

```python title="src/app.py (abridged)"
def require(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise ValueError(f"Missing required environment variable: {name}")
    return value

def main() -> int:
    signal.signal(signal.SIGTERM, shutdown)
    try:
        input_brokers = require("KAFKA_BOOTSTRAP_SERVERS_INPUT")   # from the input resource
        input_topic = require("KAFKA_TOPIC_ID_INPUT")
        output_brokers = require("KAFKA_BOOTSTRAP_SERVERS_OUTPUT") # from the output resource
        output_topic = require("KAFKA_TOPIC_ID_OUTPUT")
        group = require("CONSUMER_GROUP_ID")                       # a declared parameter
    except ValueError as exc:
        log("configuration_invalid", error=str(exc))
        return 2

    consumer = Consumer({"bootstrap.servers": input_brokers, "group.id": group,
                         "auto.offset.reset": os.getenv("AUTO_OFFSET_RESET", "earliest"),
                         "enable.auto.commit": False})
    producer = Producer({"bootstrap.servers": output_brokers})
    consumer.subscribe([input_topic])
    READY_FILE.touch()                      # healthcheck: ready
    while RUNNING:
        message = consumer.poll(1.0)
        ...
        producer.produce(output_topic, json.dumps(normalize(record)).encode(), key=message.key())
        consumer.commit(message=message, asynchronous=False)
```

```dockerfile title="Dockerfile"
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN groupadd --system processor && useradd --system --gid processor --create-home processor
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src ./src
USER processor
CMD ["python", "-m", "src.app"]
```

The matching definition in WME:

| Wizard step | Value |
|---|---|
| Runtime | Compose application · `https://github.com/datacrop/maize-processor-telemetry-normalizer.git` · `main` |
| Interfaces | inputs: `kafka` · outputs: `kafka` |
| Parameters | `CONSUMER_GROUP_ID` (required), `AUTO_OFFSET_RESET`, `OUTPUT_METRIC`, `VALUE_MULTIPLIER`, `VALUE_OFFSET`, `OUTPUT_UNIT`, `INVALID_RECORD_POLICY` |

## Test locally

Run your compose file with a hand-written env file that mimics what WME generates:

```bash
cat > .env.local <<'ENV'
KAFKA_BOOTSTRAP_SERVERS_INPUT=localhost:9092
KAFKA_TOPIC_ID_INPUT=telemetry-raw
KAFKA_BOOTSTRAP_SERVERS_OUTPUT=localhost:9092
KAFKA_TOPIC_ID_OUTPUT=telemetry-clean
CONSUMER_GROUP_ID=local-test
ENV
docker compose --env-file .env.local -p wme_local up --build
```

The [`maize-processor-kafka-akhq`](/developers/processor-catalogue/#apache-kafka--akhq) repository gives you a local Kafka with AKHQ.

## Publish

1. Push the repository (or image).
2. **Warehouse → Processor Definitions → Add Processor Definition**, fill the five steps.
3. Watch **Provisioning status** reach SUCCESS on every worker.
4. To ship it to every user automatically, add it to `extra-processors.json` ([format](/deploy/manual/model-repository/#predefined-processor-definitions)).
