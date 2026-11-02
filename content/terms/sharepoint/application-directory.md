---
id: application-directory
term: Application directory
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: search-catalog, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The application directory is a folder on a search server where its working files for search are kept.

## Maker
It is the directory on an index server or a query server that stores the files used to build, or to query, the full-text index catalog. Administrators care about it when they plan disk space for search.

## Architect
The directory holds all the files for creating a full-text index catalog or for running queries against one. It exists on both index servers and query servers.
