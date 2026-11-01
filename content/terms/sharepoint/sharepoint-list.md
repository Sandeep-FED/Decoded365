---
id: sharepoint-list
term: SharePoint list
aliases: [list, Microsoft Lists]
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
A SharePoint list is a table of information, such as tasks, issues, contacts or equipment, that everyone with access can view and update. Each row is an item and each column holds one kind of detail.

## Maker
Start from a template or from scratch, then add columns, views, filters and column formatting. Lists connect well to Power Automate flows and Power Apps forms. The Microsoft Lists app gives you a personal home for lists across sites. A [[document-library]] is a list that holds files.

## Architect
A list (SPList) stores items with fields defined by [[site-column|site columns]] or by columns local to the list. Item-level permissions are possible but should be used sparingly. Data is available through REST, Microsoft Graph and CSOM. Lists support up to 30 million items, with the list view threshold of 5,000 applying to unindexed queries.
