---
id: dynamic-rank
term: Dynamic rank
aliases: []
product: sharepoint
category: services
status: ga
related:
  - { id: static-rank, type: often-confused-with }
  - { id: query-independent-rank, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Dynamic rank is how well a search result matches the words you typed, and it changes with every search.

## Maker
It is the part of an item's rank that depends on how well the query text matches the indexed item. A different query gives a different dynamic rank for the same item. Compare it with [[static-rank]].

## Architect
The component depends on the match between the query text and the indexed item. It is contrasted with [[static-rank]] and [[query-independent-rank]], which do not vary with the query.
