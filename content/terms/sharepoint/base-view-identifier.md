---
id: base-view-identifier
term: Base view identifier
aliases: []
product: sharepoint
category: content
status: ga
related:
  - { id: list-identifier, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The base view identifier is the number that picks out one saved way of looking at a list.

## Maker
A list can have several views. This integer uniquely identifies one view definition for the list, which lets code or configuration point at that view.

## Architect
It is an integer that uniquely identifies a view definition for a list. Do not confuse it with the [[list-identifier]], which identifies the list itself.
