---
id: customer-conversation-harness
term: "Customer Conversation harness"
aliases: []
product: copilot
category: agents
status: ga
related:
  - { id: harness, type: part-of }
  - { id: handoff, type: requires }
  - { id: copilot-credits, type: requires }
origins:
  - { source: whatsitcalled-authors, use: facts-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The Customer Conversation harness is the engine for agents that talk to your customers, not your staff.

## Maker
It supports customer-facing agents over web chat or a phone number, with escalation to a human representative when needed. It is billed in [[copilot-credits]] based on usage.

## Architect
Design the [[handoff]] to a person carefully, including what context is passed on. Because customers, not employees, are the audience, review [[guardrail|guardrails]], [[moderation]] and data handling before going live.
