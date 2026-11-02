---
id: user-search-security-filter
term: User search security filter
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: fsa-worker, type: requires }
  - { id: public-filter, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The user search security filter is a list of what each person may see, applied to search results so that people never see things they should not.

## Maker
It specifies the group and user permissions for a specific FAST Search user. FAST Search Authorization (FSA) intersects the user's query with the filter and checks each document's access control list. It is the main way FSA enforces document-level security, also called security trimming.

## Architect
FSA filters out inappropriate results by intersecting the query with the filter and checking each document's [[access-control-list]]. The [[public-filter]] covers documents everyone can see.
