---
id: high-trust-app
term: High-trust app
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: sharepoint-add-in, type: part-of }
  - { id: server-to-server-protocol, type: requires }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A high-trust app is an add-in that is trusted to say for itself who the user is.

## Maker
It is an app that uses the [[server-to-server-protocol]]. The app is responsible for creating the user portion of the access token, so it is trusted to assert any user identity. This applies to [[sharepoint-add-in|SharePoint Add-ins]].

## Architect
Because the app builds the user part of the access token itself, it can claim any user identity, so trust must be granted with care. The add-in model is retired in SharePoint Online, so this is relevant for SharePoint Server.
