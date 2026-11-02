---
id: fsa-worker
term: FSA worker
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: fsa-manager, type: requires }
  - { id: user-search-security-filter, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The FSA worker is the helper service that works out what each person is allowed to see in search.

## Maker
It is the Windows service that generates user search security filters in FAST Search Authorization. Together with the [[fsa-manager]], it keeps search results secure.

## Architect
The worker builds the [[user-search-security-filter|user search security filters]] that FSA uses to trim results.
