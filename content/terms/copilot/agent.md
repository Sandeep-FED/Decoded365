---
id: agent
term: "Agent"
aliases: ["AI agent", "Copilot agent"]
product: copilot
category: agents
status: ga
related:
  - { id: large-language-model, type: requires }
origins:
  - { source: ms-declarative-vs-custom-agents, use: adapted }
  - { source: ms-copilot-studio-docs, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
An agent is an AI assistant that can do a job for you, such as answering questions about a policy or booking a room. You tell it what it should do, what it may know and what it may act on.

## Maker
An agent follows instructions, draws on [[knowledge-source|knowledge sources]] and uses [[agent-action|actions]] to get things done. You can build one in [[copilot-studio]] or [[agent-builder]], or, for Microsoft 365 Copilot, as a [[declarative-agent]] or a [[custom-engine-agent]].

## Architect
An agent has an [[orchestrator]] that plans and calls tools, a [[large-language-model]] for reasoning and language, knowledge and actions, and a user experience layer in a place such as Teams. Treat retrieved content and tool responses as untrusted input, and enforce authorisation in the services the agent calls.
