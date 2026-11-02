---
id: autohost
term: Autohost
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: sharepoint-add-in, type: part-of }
  - { id: host-web, type: requires }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Autohost means the system puts the pieces of an add-in in the right places for you.

## Maker
It is a way of deploying an add-in so that its components are placed on the proper hosts automatically and the add-in is isolated from other things. It saves developers from setting that up by hand for [[sharepoint-add-in|SharePoint Add-ins]].

## Architect
With autohosting, deployment of the add-in components to the appropriate hosts and the isolation of the add-in are established automatically. As with other Add-in features it is retired in SharePoint Online and only a historical concern outside SharePoint Server.
