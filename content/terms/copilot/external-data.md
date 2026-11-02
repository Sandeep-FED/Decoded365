---
id: external-data
term: "External data"
aliases: []
product: copilot
category: data
status: ga
related:
  - { id: graph-connector, type: requires }
  - { id: business-system, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
External data is information kept outside Microsoft 365 that you may allow an AI helper to use.

## Maker
It might sit in another application or database. Approved integrations let Copilot use it, usually with the same access rules.

## Architect
Bring it in with a [[graph-connector]], [[connector]] or MCP. Check that the source's permissions are respected and that how sensitive the data is is understood.
