---
id: search-scope-display-group
term: Search scope display group
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: default-search-scope, type: used-by }
  - { id: search-scope-consumer, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A search scope display group is a menu that lists the search areas people can choose from.

## Maker
It is an ordered set of search scopes, defined by an administrator or by code, used to return groups of search scopes. They are saved for each search scope consumer, and a scope can be in several groups.

## Architect
Groups are saved for each [[search-scope-consumer]]. A search scope can appear in more than one group, and a [[default-search-scope]] is assigned automatically.
