---
id: server-to-server-protocol
term: Server-to-server protocol
aliases: []
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
related:
  - { id: high-trust-app, type: used-by }
  - { id: sharepoint-add-in, type: part-of }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The server-to-server protocol is how two servers prove who they are to each other.

## Maker
It is an authentication protocol between two servers or services. It is used by a [[high-trust-app]], and the add-in model that relies on it is retired in SharePoint Online.

## Architect
Two servers or services authenticate each other with the protocol. A [[high-trust-app]] uses it and builds the user part of the token itself.
