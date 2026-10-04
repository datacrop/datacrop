---
title: Frontend
slug: /developers/frontend/
sidebar_position: 6
description: Structure of the Vue 3 Workflow Editor.
---

# Frontend

The Workflow Editor lives in `maize-workflow-management-editor/ui`.

## Stack

Vue 3 · Vite 6 · Vuetify 3 · Pinia · Vue Router · Vue Flow (`@vue-flow/core`) for the canvas · `keycloak-js` for login · Axios · CopilotKit (`@copilotkit/vue`) for the assistant chat · Font Awesome 6 and MDI icons.

## Source layout

```text
ui/src/
├─ main.js, App.vue
├─ router/            # routes: /MainPage/Warehouse, /Lab, /Assistant, /KibanaFrame,
│                     #         /WorkerRuntime, /LogstashMonitor, /AirflowFrame, /Settings
├─ components/
│  ├─ MainPage/       # shell: navigation rail, admin-only page filtering
│  ├─ Header/
│  ├─ Warehouse/      # catalogue tables (MyDataTable), Celery worker import panel
│  ├─ Forms/          # PD_form (wizard), PM_form, DS_form, DK_form, DIT_form, Worker_form, AiLogstashPanel
│  ├─ Lab/            # Lab.vue, DAGConfHub (details), Flow/ (Editor, SidebarPanel, Nodes, useFlowEditor.js), Runs/ (RunMonitor)
│  ├─ Assistant/      # WorkflowAssistant, cards, ProposalCard, draft editor
│  ├─ Kibana/, Celery/ (Worker Runtime), Monitoring/ (Logstash monitor), Airflow/, Settings/
├─ stores/            # Pinia: auth, users, inventory, forms, DAG, airflow, airflowRuns,
│                     #        monitoring, workerRuntime, nodeTypes, notifications
├─ api/               # request(agent, endpointKey, urlParams, body, token) + endpoints/userEndpoints.js
├─ services/          # Keycloak authentication and login transition
├─ config/env.js      # reads window.__ENV__ (env-config.js) with VITE_* fallbacks
└─ plugins/vuetify.js # themes and the configurable primary colour
```

## Calling the backend

All REST calls go through `api/apiFunctions.js`:

```js
import { request } from '@/api/apiFunctions'
const page = await request('axios', 'searchDS', null, { name: 'telemetry' }, authStore.token, { page: 0, pageSize: 10 })
```

Endpoints are declared once in `api/endpoints/userEndpoints.js` (URL template, method, whether auth and query params are accepted). Axios interceptors refresh the Keycloak token and retry once on 401. Streaming responses (the Logstash assistant) use `api/streaming.js`.

## Runtime configuration

The production image is nginx serving the built app. At container start an entrypoint writes `/env-config.js` from the `VITE_*` environment variables, and `config/env.js` reads it — so one image serves any deployment. The assistant chat calls the assistant runtime directly at `VITE_ASSISTANT_URL` (default `http://VITE_BACKEND_IP:8200`), just as Axios calls the backend at `VITE_API_URL`.

## The flow editor

`components/Lab/Flow/useFlowEditor.js` holds most canvas behaviour: drag-and-drop from presets, connection validation (`isValidConnection` against `supportedInputInterfaces` / `supportedOutputInterfaces`), the *Connect processors* dialog, observation-pipeline creation and Logstash activation toggles. Node components are `Nodes/OPNode.vue` (processors) and `Nodes/DSNode.vue` (resources).

## Develop

```bash
cd ui
npm install
npm run dev          # Vite dev server
npm run build
npx playwright test  # e2e smoke test (ui/e2e/app-load.spec.js)
```

Design rules (colours, radii, motion, the three-node motif) are in `DESIGN.md` and `UX-CONTRACT.md` at the repository root.
