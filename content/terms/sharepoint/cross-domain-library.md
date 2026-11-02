---
id: cross-domain-library
term: Cross-domain library
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: sharepoint-add-in, type: part-of }
  - { id: web-proxy, type: alternative-to }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The cross-domain library lets a page from one website talk to SharePoint on another site without being blocked.

## Maker
It is a JavaScript library available in apps for SharePoint ([[sharepoint-add-in|SharePoint Add-ins]]) that allows cross-domain client-level communication. It was one of the ways that an add-in page could call back into SharePoint.

## Architect
The library is JavaScript that lets client code communicate across domains. It is part of the add-in model that has been retired in SharePoint Online, so it is relevant only for existing add-ins on SharePoint Server. The [[web-proxy]] is a related mechanism.
