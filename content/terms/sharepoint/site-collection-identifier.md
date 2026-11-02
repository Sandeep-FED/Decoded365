---
id: site-collection-identifier
term: Site collection identifier
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: site-identifier, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A site collection identifier is the unique code of a site collection.

## Maker
It is a GUID that identifies a [[site-collection]]. In stored procedures it is typically @SiteId or @webSiteId, and in databases SiteId or tp_SiteId.

## Architect
The GUID names the site collection. Do not confuse it with the [[site-identifier]], which names a site in the collection.
