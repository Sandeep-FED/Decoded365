---
id: principal-aliasing
term: Principal aliasing
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: user-store, type: requires }
  - { id: user-search-security-filter, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Principal aliasing is a way of saying "this person in one list is the same as that person in another".

## Maker
It is the process of mapping a user or a group in one [[user-store]] to a user or a group in another. The goal is to return all the documents the user or group may view, regardless of which store they were authenticated against.

## Architect
The mapping lets security filters cover several stores. It supports [[user-search-security-filter|user search security filters]].
