---
id: context-type
term: Context type
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: after-event, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A context type is a label that sorts an event handler into a group.

## Maker
It is a GUID used as a classification for an event receiver. It tells SharePoint what kind of context the receiver belongs to.

## Architect
The value is a GUID that classifies an event receiver. Use it only as the classification; it is not an identifier of the site or the list.
