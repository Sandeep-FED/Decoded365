---
id: before-event
term: Before event
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
A before event is a checkpoint that you must pass before the action can go ahead.

## Maker
SharePoint raises it before an action runs. Its handler is synchronous and completes fully before the action that raised the event starts, which makes it useful when you want to check or change something first.

## Architect
Before events are synchronous: the handler runs completely before the triggering action begins. That lets it validate or cancel the action, which an [[after-event]] cannot do.
