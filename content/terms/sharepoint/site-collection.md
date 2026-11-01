---
id: site-collection
term: Site collection
aliases: [SPSite]
product: sharepoint
category: sites
status: ga
related: []
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A site collection is a group of SharePoint sites that share one top-level site and one set of settings. Think of a building: the building has shared rules and storage, and each room is a site inside it.

## Maker
Site collections share settings such as storage limits, site collection administrators and the second-stage [[recycle-bin]]. In modern SharePoint every new [[team-site]] or [[communication-site]] gets its own site collection, so in practice each modern site is the only site in its collection.

## Architect
A site collection (SPSite) is a security and administration boundary. It has one root web and optionally child webs (SPWeb). Features, site collection administrators, quotas, the second-stage recycle bin and the content type gallery are scoped to it. Prefer many small site collections joined by [[hub-site|hubs]] over one large collection with nested subsites.
