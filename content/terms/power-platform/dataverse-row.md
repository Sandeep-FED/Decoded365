---
id: dataverse-row
term: "Dataverse row"
aliases: ["row", "record"]
product: power-platform
category: data
status: ga
renamed:
  - { from: "record", to: "row", date: null }
related:
  - { id: dataverse-table, type: part-of }
origins:
  - { source: ms-dataverse-terminology, use: adapted }
  - { source: ms-model-driven-glossary, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A row is a single entry in a table, such as one customer. It holds the values of every column for that one thing.

## Maker
Power Apps screens say row, while developer tools and many older articles say record. A [[sharepoint-list]] calls the same idea an item.

## Architect
In the SDK a row is a record, an instance of the Entity class, and in the Web API you create one by POSTing data shaped like the table's EntityType. Access to rows is governed by [[security-role|security roles]] and ownership.
