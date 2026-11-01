---
id: model-driven-form
term: "Form (model-driven app)"
aliases: ["form", "main form", "quick create form"]
product: power-platform
category: apps
status: ga
related:
  - { id: dataverse-table, type: part-of }
  - { id: model-driven-app, type: part-of }
origins:
  - { source: ms-model-driven-glossary, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A form is the screen where people create, read or update one row, like a paper form with a box for each detail.

## Maker
Every table has at least one main form. There are four types of form: main, quick create, quick view and card. You design forms in the form designer, arranging tabs, sections and controls.

## Architect
Forms are metadata bound to a [[dataverse-table]], made of tabs, sections and controls. Form scripts run in the browser, so important rules belong in the data layer as well. Ship forms in a [[solution]].
