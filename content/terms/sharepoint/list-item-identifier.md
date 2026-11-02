---
id: list-item-identifier
term: List item identifier
aliases: [item identifier]
product: sharepoint
category: development
status: ga
related:
  - { id: list-identifier, type: often-confused-with }
  - { id: sharepoint-list, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A list item identifier is the number that picks out one item in a list.

## Maker
It is an integer that uniquely identifies an item in a [[sharepoint-list]]. It is also referred to as the item identifier.

## Architect
Unlike the GUID-based [[list-identifier]], this is an integer that is unique within the list. Combine the two to point at a specific item.
