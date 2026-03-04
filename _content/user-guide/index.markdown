---
layout: page
title: User Guide
permalink: /user-guide/
nav_order: 3
---

# DataCROP Maize Workflow Management Editor User Guide

## Overview

The editor sidebar currently includes six pages:

- **Warehouse**: Create and manage reusable data models (workflows list, digital resources, workers, data kinds, and admin-only catalogs).
- **Workflow Lab**: Configure workflow DAG metadata, design flow graphs, assign processors/workers/resources, and run/stop workflows.
- **Airflow DAGs**: Opens the Airflow UI in an iframe.
- **Kibana Visualizations**: Opens Kibana dashboards in an iframe.
- **Celery Workers Status**: Opens Celery workers status in an iframe.
- **Settings**: Theme/preferences, registry credentials, admin initialization, and read-only user profile.

This guide focuses on the pages where most daily work happens: **Warehouse**, **Workflow Lab**, and **Settings**.

## Read This First

Use this sequence when onboarding a new environment:

1. [Getting Started](/overview/)
2. [Creating Data Models](/creating-data-models/)
3. [Creating Workflows](/creating-workflows/)
4. [Settings](/settings/)
5. [Airflow](/airflow-note/)

## Access Notes

- Some Warehouse tabs are **admin-only** (Processor Definitions, Data Interface Types).
- The **Initialize Resources** action is visible only to admins in Settings.
- If initialization is missing, Warehouse shows a warning and links to Settings.
