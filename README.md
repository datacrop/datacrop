# DataCROP Documentation

<div align="center">

[![Deploy Docusaurus to GitHub Pages](https://github.com/datacrop/datacrop/actions/workflows/deploy.yml/badge.svg)](https://github.com/datacrop/datacrop/actions/workflows/deploy.yml)

### Static Site Generation
![Docusaurus](https://img.shields.io/badge/Docusaurus-v3-3ecc5f?style=for-the-badge&logo=docusaurus&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-43853D?style=for-the-badge&logo=node.js&logoColor=white)

### Language & Tooling
![Vue.js](https://img.shields.io/badge/Frontend-Vue.js-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-6db33f?style=for-the-badge&logo=springboot&logoColor=white)

### Data & Workflow Platform
![Apache Airflow](https://img.shields.io/badge/Orchestration-Apache_Airflow-017cee?style=for-the-badge&logo=apacheairflow&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Streaming-Apache_Kafka-231f20?style=for-the-badge&logo=apachekafka&logoColor=white)
![ELK Stack](https://img.shields.io/badge/Observability-ELK_Stack-005571?style=for-the-badge&logo=elasticstack&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47a248?style=for-the-badge&logo=mongodb&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Messaging-RabbitMQ-ff6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Keycloak](https://img.shields.io/badge/Identity-Keycloak-32404b?style=for-the-badge&logo=keycloak&logoColor=white)

### CI/CD & Hosting
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

</div>

## Overview
DataCROP (Data Collection Routing & Processing) is a configurable framework for real-time data collection, transformation, filtering and management. This repository hosts the documentation of its current generation, **Maize**, centred on the **Workflow Management Engine (WME)**: model processors and data sources, connect them in a visual editor, deploy them to workers through Apache Airflow and observe them with the Elastic stack.

Published at **https://doc.datacrop.eu**.

## Site structure

| Folder | Section |
|---|---|
| `docs/intro/`, `docs/getting-started/` | Get started — overview, concepts, architecture, quickstart, walkthroughs |
| `docs/user-guide/` | User guide — every editor feature |
| `docs/deploy/` | Deploy — Maize MVP, manual setup, configuration, operations |
| `docs/developers/` | Developers — internals, writing processors, APIs, security |
| `docs/reference/` | Reference — glossary, interface types, data kinds, ports, changelog |

Screenshots live in `static/img/screens/`, the explainer video in `static/video/`.

## Local Development (Documentation)

The documentation has been migrated to Docusaurus v3 and lives in the root directory. To run the site locally:

1. Ensure Node.js 20+ is installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm start
   ```
   This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

4. Build the static site (to verify production build):
   ```bash
   npm run build
   ```
   This command generates static content into the `build` directory and can be served using any static contents hosting service.
