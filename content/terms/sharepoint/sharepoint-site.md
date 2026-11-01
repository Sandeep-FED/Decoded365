---
id: sharepoint-site
term: SharePoint site
aliases: [site, SharePoint Online site]
product: sharepoint
category: sites
status: ga
related:
  - { id: site-collection, type: part-of }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A SharePoint site is a website inside Microsoft 365 where a team or organisation keeps its files, news, lists and pages in one place. Think of it as a shared online room: it has its own address, its own furniture (files and lists) and its own guest list (who may come in).

## Maker
Every site has its own address, permissions, navigation and pages. Modern sites come in two main kinds, the [[team-site]] and the [[communication-site]], and related sites can be tied together with a [[hub-site]]. Inside a site you create [[document-library|libraries]] and [[sharepoint-list|lists]] to hold your content.

## Architect
A site (the web, or SPWeb) is the container for lists, libraries, pages and permission settings. Each site lives inside a [[site-collection]]. Modern sites are created as the top-level site of their own site collection, and the recommended structure is flat sites joined by hubs rather than nested subsites.
