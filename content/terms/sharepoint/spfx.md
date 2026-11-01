---
id: spfx
term: SharePoint Framework
aliases: [SPFx, SharePoint Framework (SPFx)]
product: sharepoint
category: development
status: ga
related:
  - { id: app-catalog, type: requires }
  - { id: web-part, type: used-by }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
The SharePoint Framework, or SPFx, is the modern way for developers to build custom extras for SharePoint, such as new page building blocks, that run safely inside SharePoint pages.

## Maker
With SPFx developers build [[web-part|web parts]], extensions that customise pages, lists and the toolbar, and Viva Connections cards. You get them as a package that an admin or site owner adds from the [[app-catalog]]. SPFx is the supported replacement for [[sharepoint-add-in|SharePoint Add-ins]].

## Architect
SPFx runs client-side in the page context under the signed-in user's permissions. It is written in TypeScript with any modern UI library and built with a Node.js toolchain into an .sppkg package. Solutions call SharePoint REST, Microsoft Graph and Entra-secured APIs. Packages are deployed through the [[app-catalog]], tenant-wide or per site collection, and the same web parts can also appear as Teams tabs.
