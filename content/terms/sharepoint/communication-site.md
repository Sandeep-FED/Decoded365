---
id: communication-site
term: Communication site
aliases: [comm site]
product: sharepoint
category: sites
status: ga
related:
  - { id: team-site, type: often-confused-with }
  - { id: site-collection, type: part-of }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A communication site is a SharePoint site for sharing information with many people, such as news, announcements and policies. It works like a company noticeboard or magazine: a few people write and many people read.

## Maker
Communication sites are not connected to a Microsoft 365 group. A small set of owners and members author the pages, and a wide audience of visitors reads them. You start from a Topic, Showcase or Blank design. Use a [[team-site]] when everyone should work together on the content. Communication sites are often the starting point for a [[hub-site]] or the [[home-site]].

## Architect
Created from the SITEPAGEPUBLISHING#0 template as the top-level site of its own [[site-collection]]. Permissions use the standard Owners, Members and Visitors SharePoint groups, so there is no group membership to sync. Pages are modern site pages built from [[web-part|web parts]].
