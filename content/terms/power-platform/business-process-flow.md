---
id: business-process-flow
term: "Business process flow"
aliases: ["BPF"]
product: power-platform
category: automation
status: ga
related:
  - { id: model-driven-app, type: part-of }
  - { id: cloud-flow, type: often-confused-with }
origins:
  - { source: ms-model-driven-glossary, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A business process flow is a guided path through a record, like a checklist across the top of a form that tells you which step comes next.

## Maker
It makes sure people complete a record in the right order, for example moving a sales lead through its stages. It appears inside a [[model-driven-app]]. Despite the name it is not the same as a [[cloud-flow]], which runs automatically in the background.

## Architect
A business process flow is defined on a [[dataverse-table]] as stages and steps, and it tracks progress against the record. It is authored in the Power Automate experience but evaluated in the app. Stages can require columns to be filled before a person moves on.
