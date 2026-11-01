---
id: sharepoint-online
term: SharePoint Online
aliases: [SPO, SharePoint in Microsoft 365]
product: sharepoint
category: services
status: ga
appliesTo: [sharepoint-online]
related:
  - { id: sharepoint-server, type: alternative-to }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
SharePoint Online is the cloud version of SharePoint that comes with Microsoft 365. Microsoft runs the servers for you, so there is nothing to install or look after.

## Maker
It receives new features continuously and is where modern sites, [[hub-site|hubs]], the [[spfx]] and Microsoft Lists live. Your organisation manages it through the SharePoint admin center rather than by looking after servers. The version you run yourself is [[sharepoint-server]].

## Architect
A multitenant service: each organisation has a tenant with its own sites, storage quotas and policies. Customisation is client-side, through the [[spfx]], Microsoft Graph and the REST APIs, because server-side code such as a [[farm-solution]] cannot run there. Calls are subject to throttling, so batch work and back off when asked to.
