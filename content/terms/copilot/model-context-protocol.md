---
id: model-context-protocol
term: "Model Context Protocol"
aliases: ["MCP", "MCP server"]
product: copilot
category: agents
status: ga
related:
  - { id: agent-action, type: often-confused-with }
  - { id: tool-calling, type: requires }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
MCP is a common plug standard that lets AI tools connect to other tools and data in the same way.

## Maker
Instead of building a custom link for each system, a system offers an MCP server and any compatible agent can use it.

## Architect
It is an open protocol for discovering and using tools, resources and context. Treat each server as a trust boundary: review what it exposes, authenticate calls and log use.
