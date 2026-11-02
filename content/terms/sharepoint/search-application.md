---
id: search-application
term: Search application
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: search-catalog, type: requires }
  - { id: search-database, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A search application is one self-contained set of search settings.

## Maker
It is a unique group of search settings that is associated, one to one, with a shared service provider. It is the home of the [[search-catalog]].

## Architect
Each search application pairs with a shared service provider. Its crawl data lives in the [[search-catalog]].
