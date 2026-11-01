---
id: dataverse
term: "Dataverse"
aliases: ["Microsoft Dataverse", "Common Data Service", "CDS"]
product: power-platform
category: data
status: ga
renamed:
  - { from: "Common Data Service", to: "Dataverse", date: "2020-11" }
related:
  - { id: power-platform, type: part-of }
  - { id: sharepoint-list, type: alternative-to }
origins:
  - { source: ms-model-driven-glossary, use: adapted }
  - { source: ms-dataverse-terminology, use: facts-only }
  - { source: m365maps-renames, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Dataverse is the place where Power Platform apps keep their data, in organised tables with built-in security. Think of it as a secure, well-labelled filing room.

## Maker
Dataverse holds tables of data plus the rules around them, such as who may see what. [[model-driven-app|Model-driven apps]] require it, and it can also serve canvas apps, flows, agents and [[power-pages|Power Pages]] sites. It is not the same as a [[sharepoint-list]]: Dataverse is designed for structured business data with relationships and row-level security. It used to be called Common Data Service.

## Architect
Dataverse is more than a database: it also provides web services (the Web API and the SDK), relationships, business logic and role-based security inside an [[environment]]. Developers see different words for the same things, for example a table is an entity and a column is an attribute in the SDK. See [[dataverse-table]].
