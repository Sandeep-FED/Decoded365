---
id: tool-calling
term: "Tool calling"
aliases: ["function calling"]
product: copilot
category: agents
status: ga
related:
  - { id: agent-action, type: often-confused-with }
  - { id: agent, type: used-by }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Tool calling is when an AI decides to use a tool, like a calculator or a search, to get something done.

## Maker
The model does not do everything by itself. It asks for a defined function to run, such as "look up this order", and uses the result.

## Architect
The model emits a structured request with parameters, and the system executes it and returns the result. Validate parameters, apply permissions and log calls, since the model's request is not automatically safe. See [[agent-action]] and [[model-context-protocol]].
