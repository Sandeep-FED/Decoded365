---
id: zero-based-index
term: Zero-based index
aliases: []
product: sharepoint
category: development
status: ga
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A zero-based index starts counting at 0, not 1, the way a ruler starts at zero.

## Maker
It is an index in which the first item has an index of zero. Mind this when mixing it with one-based counts.

## Architect
The first item is at 0. Off-by-one errors are common when a one-based number is passed to a zero-based API.
