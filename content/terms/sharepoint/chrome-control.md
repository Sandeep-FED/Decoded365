---
id: chrome-control
term: Chrome control
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: sharepoint-add-in, type: part-of }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The chrome control draws the top bar of a page so that an add-in looks like it belongs inside SharePoint.

## Maker
It is an HTML and JavaScript control that renders the top chrome and is available for use in apps for SharePoint, now called [[sharepoint-add-in|SharePoint Add-ins]]. It gives provider-hosted pages a familiar header.

## Architect
The control is built with HTML and JavaScript, and it renders the top chrome for pages of an add-in. SharePoint Add-ins are retired in SharePoint Online and only remain for SharePoint Server, where this control can still be met.
