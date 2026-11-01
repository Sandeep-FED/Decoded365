---
id: sharepoint-server
term: SharePoint Server
aliases: [on-premises SharePoint, SharePoint on-premises, SharePoint Subscription Edition]
product: sharepoint
category: services
status: ga
appliesTo: [sharepoint-server]
related:
  - { id: sharepoint-online, type: alternative-to }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
SharePoint Server is the version of SharePoint that an organisation installs and runs on its own servers, instead of using Microsoft's cloud.

## Maker
Because your own team runs it, you choose when to update it and where the data sits. It is also called on-premises SharePoint. The current release is SharePoint Server Subscription Edition, and it receives fewer new features than [[sharepoint-online]]. Many organisations run both and connect them in a hybrid setup.

## Architect
It runs as a farm of web, application and database servers, with SQL Server holding the content. Full-trust code such as a [[farm-solution]] is possible, and so are [[sharepoint-add-in|SharePoint Add-ins]]. Customisations that must move to the cloud need to be rebuilt with the [[spfx]] or Microsoft Graph.
