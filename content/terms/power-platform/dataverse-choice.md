---
id: dataverse-choice
term: "Dataverse choice"
aliases: ["choice", "option set", "OptionSet", "picklist", "choices"]
product: power-platform
category: data
status: ga
renamed:
  - { from: "option set", to: "choice", date: null }
related:
  - { id: dataverse-column, type: part-of }
origins:
  - { source: ms-dataverse-terminology, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A choice is a column that lets people pick from a fixed list, like a drop-down for status: Open, In progress, Done.

## Maker
Choices keep answers consistent, so reports can count them reliably. Power Apps screens call them choices, while developers meet them as option sets. A yes/no column is a related, simpler type.

## Architect
A choice appears as an OptionSet or Picklist in the SDK and an OptionSet in the Web API. Each option has a numeric value and a label, and the value is what is stored, which lets labels be translated. Choices can be shared across tables when they are defined globally.
