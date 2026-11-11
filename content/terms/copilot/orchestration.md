---
id: orchestration
term: "Orchestration"
aliases: []
product: copilot
category: agents
status: ga
related:
  - { id: orchestrator, type: often-confused-with }
  - { id: tool-calling, type: requires }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Orchestration is the conductor's job: coordinating the model, the instructions, the lookups and the tools so a task gets done.

## Maker
It decides what to ask the model, what to retrieve and which tool to call, and in what order.

## Architect
It covers planning, retrieval, [[tool-calling|tool use]] and multi-step action. The [[orchestrator]] is the component that does this work in an agent.
