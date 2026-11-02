---
id: high-confidence-property
term: High confidence property
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: high-confidence-result, type: requires }
  - { id: metadata-index, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A high confidence property is a piece of information that is a very strong clue that an item is exactly what someone is looking for.

## Maker
It is a managed property from the [[metadata-index]] that the administrator identifies as a good indicator of a highly relevant item. It is used to produce a [[high-confidence-result]].

## Architect
Administrators pick the properties that count. A precise match between a property value and the tokens in the query text then produces a [[high-confidence-result]].
