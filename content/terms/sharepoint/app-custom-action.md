---
id: app-custom-action
term: App custom action
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: sharepoint-add-in, type: part-of }
  - { id: custom-action, type: alternative-to }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An app custom action is an extra button added to a site by an add-in, and it leads to more of that add-in's features.

## Maker
It is a kind of [[custom-action]] that a [[sharepoint-add-in]] adds to a host site, linking people to the extra functionality inside the add-in. Because Add-ins have retired in SharePoint Online, the same job is done today with the [[spfx]].

## Architect
The action is added to the [[host-web]] by the add-in and points at functionality in the add-in. Add-ins stopped working in SharePoint Online on 2 April 2026 but still exist on SharePoint Server, so expect to meet this term only in older or on-premises solutions.
