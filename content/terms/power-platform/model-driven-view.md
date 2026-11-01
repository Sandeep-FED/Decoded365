---
id: model-driven-view
term: "View (model-driven app)"
aliases: ["view", "system view", "saved view"]
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
A view is a saved way of looking at a list of rows, with chosen columns and filters, like a filtered spreadsheet you can reopen.

## Maker
A table can have many views, such as 'My open cases'. Views can be filtered in advance, and the app decides which views to offer. A SharePoint library has views too, so the idea will feel familiar if you know a [[document-library]].

## Architect
A view is a stored query plus a layout on a [[dataverse-table]]. It depends on the columns it shows, so removing a column that a view uses is blocked until the view changes. Ship views in a [[solution]].
