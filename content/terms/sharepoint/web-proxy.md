---
id: web-proxy
term: Web proxy
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: sharepoint-add-in, type: part-of }
  - { id: cross-domain-library, type: alternative-to }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The web proxy is a go-between that lets SharePoint pass a request on to another service.

## Maker
It is a method exposed in a client object model to issue requests from SharePoint to a remote service. Developers could use it in apps for SharePoint, now [[sharepoint-add-in|SharePoint Add-ins]].

## Architect
The method belongs to the add-in model that is retired in SharePoint Online. Compare with the [[cross-domain-library]].
