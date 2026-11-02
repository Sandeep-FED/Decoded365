---
id: after-event
term: After event
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: before-event, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An after event is like a thank-you note sent once a job has finished.

## Maker
SharePoint raises events when something happens, such as an item being added. An after event runs its handler only once the action has already completed, and it does not hold things up.

## Architect
After events are asynchronous: the handler runs after the action that raised the event is complete, so it cannot stop or change that action. Use [[before-event|before events]] when you need to block or alter an operation.
