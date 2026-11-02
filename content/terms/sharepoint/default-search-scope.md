---
id: default-search-scope
term: Default search scope
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: search-scope-display-group, type: requires }
  - { id: contextual-search-scope, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The default search scope is the search area used automatically if nobody picks another one.

## Maker
It is the search scope that is assigned automatically to a search scope display group. Searches in that group use it unless the person chooses a different one.

## Architect
The scope is assigned automatically to a [[search-scope-display-group]]. Compare it with the [[contextual-search-scope]], which is added to a query to restrict it to a site or list.
