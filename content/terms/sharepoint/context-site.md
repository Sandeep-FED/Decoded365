---
id: context-site
term: Context site
aliases: []
product: sharepoint
category: sites
status: ga
related:
  - { id: site-collection, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The context site is simply the site you are working in at the moment of the request.

## Maker
It is the site that matches the context of the current request. Features that depend on "the current site" resolve it from the request.

## Architect
Resolve the context site from the incoming request, not from a stored setting. It is the site that corresponds to the context of the current request.
