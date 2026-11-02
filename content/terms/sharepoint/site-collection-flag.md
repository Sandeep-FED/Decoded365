---
id: site-collection-flag
term: Site collection flag
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: site-flag, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A site collection flag is a set of on-off switches that describe a whole group of sites.

## Maker
It is a 4-byte unsigned integer bit mask that specifies the properties global to a site collection. One or more values can be set.

## Architect
Read it as a bit mask. It applies to the whole [[site-collection]], while a [[site-flag]] is for one site.
