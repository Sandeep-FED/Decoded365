---
id: hybrid-search
term: "Hybrid search"
aliases: []
product: copilot
category: data
status: ga
related:
  - { id: keyword-search, type: requires }
  - { id: vector-search, type: requires }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Hybrid search combines searching for exact words with searching by meaning.

## Maker
This helps you find things even when you don't remember the exact wording, while still catching exact names and codes.

## Architect
Results from [[keyword-search]] and [[vector-search]] are merged and ranked together. It tends to beat either method alone on varied queries.
