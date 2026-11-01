---
id: custom-engine-agent
term: "Custom engine agent"
aliases: ["custom engine agents"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: part-of }
origins:
  - { source: ms-declarative-vs-custom-agents, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A custom engine agent is an assistant whose builders bring their own 'brain', the software and AI model that decide what to do, instead of using Copilot's.

## Maker
You choose the orchestrator and the models, which gives full control and is more work than a [[declarative-agent]]. It can still appear in Microsoft 365 places such as Teams. Pick it when you need a specific model, a special workflow or strict control over how responses are made.

## Architect
You host the orchestration and model calls yourself, and take on the engineering that [[declarative-agent|declarative agents]] hand to the platform: prompts, grounding, evaluation, security and cost. Use this route when the managed [[orchestrator]] cannot meet your requirements.
