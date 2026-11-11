---
id: token
term: "Token"
aliases: ["tokens"]
product: copilot
category: ai-concepts
status: ga
related:
  - { id: context-window, type: used-by }
  - { id: generation, type: requires }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A token is a small chunk of text, roughly a short word or part of one, that an AI reads and writes.

## Maker
Limits and costs are often counted in tokens rather than words.

## Architect
Context length, [[usage-based-billing|billing]] and [[latency]] depend on token counts. Do not confuse it with security tokens used in [[authentication]].
