---
id: activity-flow
term: Activity flow
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: activity-model, type: requires }
  - { id: workflow-association, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An activity flow is a recipe being followed right now, one step after another.

## Maker
It is a running instance of a workflow made of a sequence of action instances and activity model instances. You can put the steps in any order, but together they form one activity flow.

## Architect
The flow is the runtime counterpart of its definition: action instances and [[activity-model]] instances are sequenced to make a single flow. Distinguish the running flow from the template that defines it.
