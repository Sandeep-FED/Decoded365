---
id: site-flag
term: Site flag
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: site-collection-flag, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A site flag is a set of on-off switches that describe one site.

## Maker
It is a 4-byte unsigned integer bit mask that specifies properties unique to a site. Compare it with the [[site-collection-flag]].

## Architect
The mask applies to one site. The [[site-collection-flag]] is global to the collection.
