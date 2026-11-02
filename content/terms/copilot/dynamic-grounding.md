---
id: dynamic-grounding
term: "Dynamic grounding"
aliases: []
product: copilot
category: data
status: ga
related:
  - { id: grounding, type: part-of }
  - { id: freshness, type: requires }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Dynamic grounding means the AI looks up the latest facts at the moment you ask, instead of using only what it already knew.

## Maker
This helps answers reflect today's files, messages or web pages rather than old training knowledge.

## Architect
Retrieval happens at request time, so results depend on [[freshness]] of the index and on permissions. It differs from static instructions that are fixed in the agent's setup.
