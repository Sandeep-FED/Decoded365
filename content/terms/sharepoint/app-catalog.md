---
id: app-catalog
term: App catalog
aliases: [tenant app catalog, site collection app catalog]
product: sharepoint
category: administration
status: ga
related:
  - { id: appsource, type: alternative-to }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
The app catalog is a special SharePoint site where an organisation keeps the custom apps and extensions it has approved for its sites.

## Maker
There is one tenant-level app catalog, and individual site collections can have their own. Developers' [[spfx]] packages are uploaded to the catalog. An admin can make a solution available to all sites at once, or site owners can add it to their own sites.

## Architect
The tenant app catalog is created by an administrator. A site collection app catalog is added with PowerShell or the CLI for Microsoft 365 and scopes apps to that collection. SPFx packages (.sppkg) are stored in it and can be deployed tenant-wide. Older [[sharepoint-add-in|SharePoint Add-ins]] were also distributed through it.
