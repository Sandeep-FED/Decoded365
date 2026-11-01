---
id: dataverse-table
term: "Dataverse table"
aliases: ["table", "entity", "EntityType"]
product: power-platform
category: data
status: ga
renamed:
  - { from: "entity", to: "table", date: null }
related:
  - { id: dataverse, type: part-of }
  - { id: sharepoint-list, type: often-confused-with }
  - { id: model-driven-app, type: used-by }
origins:
  - { source: ms-dataverse-terminology, use: adapted }
  - { source: ms-model-driven-glossary, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A Dataverse table is like a spreadsheet tab for one kind of thing, such as customers or orders. Each row is one customer, and each column is one detail about them.

## Maker
Tables hold your rows, and you can relate them, for example one customer to many orders. Power Apps screens say table, while older articles and developer tools say entity. It looks similar to a [[sharepoint-list]], but a Dataverse table has relationships, business rules and fine-grained security built in.

## Architect
In the Dataverse SDK a table is an Entity with an Attributes collection, and in the Web API it is an EntityType with properties, following OData terminology. Use the table designer to build tables and [[solution|solutions]] to move their definitions. Tables carry [[dataverse-column|columns]], relationships and [[security-role|security role]] privileges.
