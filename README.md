# DataCROP Documentation

<div align="center">

### Static Site Generation
![Jekyll](https://img.shields.io/badge/Jekyll-4.3+-CC0000?style=for-the-badge&logo=jekyll&logoColor=white)
![Just the Docs](https://img.shields.io/badge/Theme-Just_the_Docs-0D2538?style=for-the-badge)
![Ruby](https://img.shields.io/badge/Ruby-3.3+-CC342D?style=for-the-badge&logo=ruby&logoColor=white)

### Language & Tooling
![Vue.js](https://img.shields.io/badge/Frontend-Vue.js-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6db33f?style=for-the-badge&logo=springboot&logoColor=white)

### Data & Workflow Platform
![Apache Airflow](https://img.shields.io/badge/Orchestration-Apache_Airflow-017cee?style=for-the-badge&logo=apacheairflow&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Streaming-Apache_Kafka-231f20?style=for-the-badge&logo=apachekafka&logoColor=white)
![ELK Stack](https://img.shields.io/badge/Observability-ELK_Stack-005571?style=for-the-badge&logo=elasticstack&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47a248?style=for-the-badge&logo=mongodb&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Messaging-RabbitMQ-ff6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-43853d?style=for-the-badge&logo=node.js&logoColor=white)
![Keycloak](https://img.shields.io/badge/Identity-Keycloak-32404b?style=for-the-badge&logo=keycloak&logoColor=white)

### CI/CD & Hosting
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

</div>

## Overview
DataCROP (Data Collection Routing & Processing) is a configurable framework for real-time data collection, transformation, filtering, and management across IoT and cybersecurity domains. It emphasizes interoperability through a specialized data model for sources, processors, and results, enabling flexible workflow-driven analytics.

## Versions and Stack Highlights
- Barley (v1.0): MongoDB, Apache Kafka, RabbitMQ, Kafka Streams, Node.js, React, optional Hyperledger Fabric.
- Farro (v2.0): Builds on Barley; MongoDB, Apache Kafka, RabbitMQ, Node.js, React, and algorithm support (Java, Python, R).
- Maize (v3.0, in progress): MongoDB, Apache Kafka, ELK stack; expanding observability and data services.

## Demo Environment
Deployable Farro demo: `https://github.com/datacrop/farro-demo-deployment-scripts`.

## Run the Docs Locally
1. Ensure Ruby and Bundler are installed.
2. Install dependencies:
   ```
   bundle install
   ```
3. Serve the site:
   ```
   bundle exec jekyll serve
   ```
4. Visit `http://localhost:4000` (adjust `baseurl` if configured).

## Documentation Structure
- `_content/home/`: High-level framework overview and roadmap.
- `_content/overview/`: Getting started and authentication with Keycloak.
- `_content/airflow/`: Airflow processing engine deployment steps.
- `_content/creating-workflows/`, `_content/creating-data-models/`, `_content/worker/`: Building workflows, data models, and workers.
- `_content/dev-guide/`, `_content/editor/`, `_content/user-guide/`: Guidance for developers and end users.


