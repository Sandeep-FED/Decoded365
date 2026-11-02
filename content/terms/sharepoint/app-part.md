---
id: app-part
term: App part
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: sharepoint-add-in, type: part-of }
  - { id: web-part, type: alternative-to }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An app part is a window on a page that shows a small piece of an add-in.

## Maker
It is a component of a [[sharepoint-add-in]] that you place on a site page to expose what the add-in does. It plays a similar role to a [[web-part]], and today the [[spfx]] web part replaces it.

## Architect
The app part is embedded in a page on the [[host-web]] and displays the add-in's content from the add-in itself. SharePoint Add-ins were retired in SharePoint Online on 2 April 2026, so it remains relevant for SharePoint Server only.
