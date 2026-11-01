---
id: document-library
term: Document library
aliases: [library, doc lib, SharePoint library]
product: sharepoint
category: content
status: ga
related:
  - { id: sharepoint-site, type: part-of }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A document library is the place on a SharePoint site where you store, share and work on files together. It keeps earlier versions of each file and controls who can open or change it.

## Maker
Libraries add columns (information about each file), views, version history, check-out and co-authoring. Prefer columns and views over deep folder trees, because they make files easier to find and filter. You can sync a library to your computer, and it can use [[content-type|content types]] to describe different kinds of documents.

## Architect
A library is a list with the DocumentLibrary base template, and each file is a list item with properties. It is reachable through the SharePoint REST API, Microsoft Graph drives and CSOM. Permissions can be inherited or broken at library, folder or item level, but unique permissions are costly at scale. The list view threshold of 5,000 items affects queries and views, and a list or library can hold up to 30 million items.
