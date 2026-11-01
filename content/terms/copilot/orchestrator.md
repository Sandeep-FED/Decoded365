---
id: orchestrator
term: "Orchestrator"
aliases: ["agent orchestrator"]
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
The orchestrator is the agent's project manager: it decides which information to look up and which tools to use, and in what order, to answer you.

## Maker
It manages how an [[agent]] works with its knowledge, actions and level of autonomy. In a [[declarative-agent]] Microsoft supplies it, and in a [[custom-engine-agent]] you provide it.

## Architect
The orchestrator sits between the user experience and the foundation models. It interprets the request, selects context and capabilities, calls tools and asks the [[large-language-model]] to generate the response. It is not a fixed sequence, so the number of retrievals or tool calls varies from one request to the next.
