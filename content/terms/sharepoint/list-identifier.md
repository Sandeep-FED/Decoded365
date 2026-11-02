---
id: list-identifier
term: List identifier
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: sharepoint-list, type: requires }
  - { id: site-collection-identifier, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A list identifier is the unique code of a list, so that it can never be confused with another list.

## Maker
It is a GUID used to identify a [[sharepoint-list]] in a [[site-collection]]. Use it when you have to point at one list exactly.

## Architect
The GUID identifies the list within a site collection, unlike the [[list-item-identifier]], which identifies an item in the list.
