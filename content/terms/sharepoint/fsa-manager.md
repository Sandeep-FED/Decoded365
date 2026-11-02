---
id: fsa-manager
term: FSA Manager
aliases: [FAST Search Authorization Manager]
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: fsa-worker, type: requires }
  - { id: user-search-security-filter, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The FSA Manager is the supervisor service that runs the security side of FAST search.

## Maker
It is the Windows service that provides administration functionality for FAST Search Authorization (FSA). It works together with the [[fsa-worker]].

## Architect
FSA filters search results to enforce document-level security. The manager provides administration, while the [[fsa-worker]] generates the [[user-search-security-filter|user search security filters]].
