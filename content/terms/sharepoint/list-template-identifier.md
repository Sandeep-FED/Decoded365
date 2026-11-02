---
id: list-template-identifier
term: List template identifier
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: list-template, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A list template identifier is the unique code of a list template.

## Maker
It is a GUID used to identify a [[list-template]]. Do not mix it up with the value used by a [[list-server-template]].

## Architect
Use the GUID to point at one template exactly. It identifies the [[list-template]], not the list.
