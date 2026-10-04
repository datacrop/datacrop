---
title: AI providers
slug: /deploy/ai-providers/
sidebar_position: 7
description: Configure the language model behind the Logstash assistant and the Workflow Assistant.
---

# AI providers

WME's AI features call an **OpenAI-compatible chat-completions API** through the backend. Provider keys never reach the browser.

| Feature | Needs |
|---|---|
| [AI Logstash assistant](/user-guide/logstash-pipelines/ai-assistant/) | Any chat model; streaming responses |
| [Workflow Assistant](/user-guide/workflow-assistant/) *(preview)* | A model that supports **tool / function calling** |

## Server default

Set in the backend `.env`:

```ini
AI_BASE_URL=https://your-ai-host.example.com/v1   # OpenAI-compatible base URL
AI_MODEL=google/gemma-4-26B
AI_API_KEY=...                                    # required; use a placeholder for no-auth endpoints
AI_TIMEOUT_SECONDS=120
```

Users see this as **System default** in [Settings → AI Assistant](/user-guide/settings/#ai-assistant). If no server key is configured, users must choose their own provider.

WME requires a nonempty API key for both server and per-user providers. For a local endpoint that ignores authentication, use a placeholder such as `local-no-auth`.

## Per-user providers

In **Settings → AI Assistant → My own provider** each user can set a base URL, model and API key (stored encrypted with `CREDENTIALS_ENCRYPTION_KEY`) and use **Test connection**. Presets are included for OpenAI, Groq, Together, OpenRouter and local Ollama / vLLM.

## Self-hosted models

Any server that exposes `/v1/chat/completions` works — vLLM, Ollama (`http://ollama:11434/v1`), LM Studio, LiteLLM. Make sure the backend container can reach it, and for the Workflow Assistant pick a model trained for tool calling (for example recent Llama 3.x, Qwen 2.5+ or Gemma models served with tool-call support enabled).

## Data handling

- The Logstash assistant sends the processor's configuration — including input/output resource parameters — and your messages to the model.
- The Workflow Assistant sends your messages and the catalogue data its tools return. Secrets entered in its secure forms are sent only to the backend.
- Choose a provider whose data policy fits the data in your catalogue.
