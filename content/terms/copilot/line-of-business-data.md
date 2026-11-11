---
id: line-of-business-data
term: "Line-of-business data"
aliases: ["LOB data"]
product: copilot
category: data
status: ga
related:
  - { id: business-system, type: requires }
  - { id: external-data, type: often-confused-with }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Line-of-business data is the information kept in a company's main operational systems, such as sales, finance or support.

## Maker
It is often the most valuable data for an agent, and the most sensitive.

## Architect
It is usually reached through [[connector|connectors]], APIs or [[model-context-protocol|MCP]]. Mirror the source system's permissions.
