---
id: freshness
term: "Freshness"
aliases: []
product: copilot
category: data
status: ga
related:
  - { id: dynamic-grounding, type: used-by }
  - { id: retrieval, type: requires }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Freshness is how up to date the information given to an AI is.

## Maker
If the AI uses old data, its answer may be out of date. Recent web or organisational data improves answers for fast-changing topics.

## Architect
Freshness depends on index update times, caching and the source. Where decisions depend on recent facts, prefer live retrieval and show dates in [[citation|citations]].
