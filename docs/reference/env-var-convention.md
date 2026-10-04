---
title: Environment variable convention
slug: /reference/env-var-convention/
sidebar_position: 5
description: How digital resource settings are named when injected into processor containers.
---

# Environment variable convention

```text
<INTERFACE>_<KEY>_<DIRECTION>
```

| Part | Rule | Example |
|---|---|---|
| `<INTERFACE>` | Data interface type name, upper case | `kafka` → `KAFKA` |
| `<KEY>` | Parameter key, upper case, non-alphanumerics → `_` | `bootstrap_servers` → `BOOTSTRAP_SERVERS` |
| `<DIRECTION>` | `INPUT` for data inputs, `OUTPUT` for data outputs | `INPUT` |

Rules:

- One variable per parameter of every connected resource, empty values included.
- Derived variables **override** processor parameters with the same name.
- Kafka `topic_id` values have spaces replaced by underscores.
- Logstash Pipeline processors do not receive variables; their resources become pipeline sections.
- The editor shows the exact list under **Derived Environment Variables** in each processor form.

## Examples

```ini
# kafka input
KAFKA_BOOTSTRAP_SERVERS_INPUT=kafka:9092
KAFKA_SECURITY_PROTOCOL_INPUT=PLAINTEXT
KAFKA_TOPIC_ID_INPUT=telemetry-raw

# elasticsearch output
ELASTICSEARCH_HOSTS_OUTPUT=elasticsearch:9200
ELASTICSEARCH_SCHEME_OUTPUT=http
ELASTICSEARCH_INDEX_OUTPUT=alerts

# rabbitmq output
RABBITMQ_HOST_OUTPUT=rabbitmq
RABBITMQ_PORT_OUTPUT=5672
RABBITMQ_EXCHANGE_OUTPUT=events
RABBITMQ_EXCHANGE_TYPE_OUTPUT=direct

# mqtt input
MQTT_BROKER_INPUT=tcp://broker
MQTT_PORT_INPUT=1883
MQTT_TOPIC_INPUT=sensor/data
```

All keys per type: [Interface types](/reference/interface-types/). How to consume them: [Writing processors](/developers/writing-processors/).
