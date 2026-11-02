---
id: business-system
term: "Business system"
aliases: []
product: copilot
category: data
status: ga
related:
  - { id: connector, type: requires }
  - { id: line-of-business-data, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A business system is a company's main working software, such as customer, finance or HR systems.

## Maker
Copilot can be connected to these systems through approved integrations so it can read from them, and sometimes act in them.

## Architect
Integration usually goes through a [[connector]], an API or a [[model-context-protocol|MCP]] server. Decide whether each connection is read-only and how the system's own security is respected.
