---
id: dataverse-column
term: "Dataverse column"
aliases: ["Dataverse field", "Dataverse attribute"]
product: power-platform
category: data
status: ga
renamed:
  - { from: "field", to: "column", date: null }
related:
  - { id: dataverse-table, type: part-of }
origins:
  - { source: ms-dataverse-terminology, use: adapted }
  - { source: ms-model-driven-glossary, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A column is one detail you record about every row in a table, such as a customer's email address or an order's due date.

## Maker
Columns have types such as text, number, date or choice, and some can be required. A column used to be called a field. Developers call the same thing an attribute.

## Architect
The same idea is a column in the Power Apps screens, an Attribute in the SDK and a Property in the Web API. Changing a column's type later can be restricted, so choose types deliberately. Dependencies matter: a [[model-driven-view|view]] that shows a column needs it to exist.
