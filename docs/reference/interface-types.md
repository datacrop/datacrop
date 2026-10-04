---
title: Interface types
slug: /reference/interface-types/
sidebar_position: 3
description: The nine built-in data interface types, their parameters and Logstash support.
---

# Interface types

Created by **Initialize Resources**. The *Key* column gives the `<KEY>` part of the environment variable a processor receives (`<INTERFACE>_<KEY>_<DIRECTION>`).

| Type | Category | Logstash input | Logstash output |
|---|---|:-:|:-:|
| [`elasticsearch`](#elasticsearch) | Database | ✓ | ✓ |
| [`kafka`](#kafka) | Streaming | ✓ | ✓ |
| [`http`](#http) | API | ✓ | ✓ |
| [`mongodb`](#mongodb) | Database | — | — |
| [`s3`](#s3) | File System | ✓ | ✓ |
| [`redis`](#redis) | Message Queue | ✓ | ✓ |
| [`rabbitmq`](#rabbitmq) | Message Queue | ✓ | ✓ |
| [`beats`](#beats) | Streaming | ✓ | — |
| [`mqtt`](#mqtt) | Message Queue | — | — |

## elasticsearch

| Parameter | Key | Group | Default |
|---|---|---|---|
| Hosts | `hosts` | Connection | bundled Elasticsearch (`HOST:9200`) |
| Scheme | `scheme` | Connection | `http` |
| User | `user` | Authentication | `logstash_internal` |
| Password | `password` | Authentication | the deployment's Logstash password |
| API Key | `api_key` | Authentication | — |
| Index | `index` | Data Location | `test_index` |
| SSL Enabled | `ssl_enabled` | Advanced | `false` |

## kafka

| Parameter | Key | Group | Default |
|---|---|---|---|
| Bootstrap Servers | `bootstrap_servers` | Connection | `KAFKA_BOOTSTRAP_SERVERS` of the backend |
| Security Protocol | `security_protocol` | Connection | `PLAINTEXT` |
| SASL Mechanism | `sasl_mechanism` | Authentication | — |
| SASL Username | `sasl_username` | Authentication | — |
| SASL Password | `sasl_password` | Authentication | — |
| Topic | `topic_id` | Data Location | `giannis_processed` |
| Schema Registry URL | `schema_registry_url` | Connection | — |
| AKHQ URL | `akhq_url` | Advanced | bundled AKHQ (`HOST:8081`) |

Spaces in `topic_id` are replaced with underscores when injected.

The seeded topic name is an example. Set it to the topic your resource actually uses.

## http

| Parameter | Key | Group | Default |
|---|---|---|---|
| URL | `url` | Connection | `http://localhost:8080/api` |
| Port | `port` | Connection | `8080` |
| Auth Type | `auth_type` | Authentication | `none` |
| Username | `user` | Authentication | — |
| Password | `password` | Authentication | — |
| Bearer Token | `bearer_token` | Authentication | — |
| HTTP Method | `http_method` | Format | `post` |
| Format | `format` | Format | `json` |
| Headers | `headers` | Advanced | — |

## mongodb

| Parameter | Key | Group | Default |
|---|---|---|---|
| URI | `uri` | Connection | `mongodb://localhost:27017/mydb` |
| Username | `username` | Authentication | — |
| Password | `password` | Authentication | — |
| Auth Source | `auth_source` | Authentication | `admin` |
| Database | `database` | Data Location | `mydb` |
| Collection | `collection` | Data Location | `mycollection` |
| SSL Enabled | `ssl_enabled` | Advanced | `false` |

## s3

| Parameter | Key | Group | Default |
|---|---|---|---|
| Region | `region` | Connection | `eu-central-1` |
| Endpoint | `endpoint` | Connection | — (custom S3-compatible endpoint) |
| Access Key ID | `access_key_id` | Authentication | — |
| Secret Access Key | `secret_access_key` | Authentication | — |
| Session Token | `session_token` | Authentication | — |
| Bucket | `bucket` | Data Location | `my-bucket` |
| Prefix | `prefix` | Data Location | `logs/` |
| Force Path Style | `force_path_style` | Advanced | `false` |
| Use SSL | `use_ssl` | Advanced | `true` |

## redis

| Parameter | Key | Group | Default |
|---|---|---|---|
| Host | `host` | Connection | `localhost` |
| Port | `port` | Connection | `6379` |
| Username | `username` | Authentication | — |
| Password | `password` | Authentication | — |
| Database | `database` | Data Location | `0` |
| Key | `key` | Data Location | `mylist` (list or channel name) |
| Data Type | `data_type` | Format | `list` |
| SSL Enabled | `ssl_enabled` | Advanced | `false` |

## rabbitmq

| Parameter | Key | Group | Default |
|---|---|---|---|
| Host | `host` | Connection | `localhost` |
| Port | `port` | Connection | `5672` |
| Username | `user` | Authentication | `guest` |
| Password | `password` | Authentication | `guest` |
| Virtual Host | `vhost` | Data Location | `/` |
| Queue | `queue` | Data Location | `myqueue` |
| Exchange | `exchange` | Data Location | `myexchange` |
| Routing Key | `routing_key` | Data Location | — |
| Exchange Type | `exchange_type` | Format | `direct` |
| SSL Enabled | `ssl_enabled` | Advanced | `false` |

## beats

Elastic Beats (Filebeat, Metricbeat, …) shipping to Logstash over the Lumberjack protocol. **Input only.**

| Parameter | Key | Group | Default |
|---|---|---|---|
| Port | `port` | Connection | `5044` |
| Host | `host` | Connection | `0.0.0.0` |
| SSL Enabled | `ssl_enabled` | Advanced | `false` |
| SSL Certificate | `ssl_certificate` | Advanced | — |
| SSL Key | `ssl_key` | Advanced | — |
| Client Inactivity Timeout | `client_inactivity_timeout` | Advanced | `60` |

## mqtt

| Parameter | Key | Group | Default |
|---|---|---|---|
| Broker | `broker` | Connection | `tcp://localhost` |
| Port | `port` | Connection | `1883` |
| Protocol | `protocol` | Connection | `tcp` |
| Username | `username` | Authentication | — |
| Password | `password` | Authentication | — |
| Topic | `topic` | Data Location | `sensor/data` |
| Client ID | `client_id` | Advanced | `mqtt-client` |
| QoS | `qos` | Advanced | `0` |
| Clean Session | `clean_session` | Advanced | `true` |
| SSL Enabled | `ssl_enabled` | Advanced | `false` |
