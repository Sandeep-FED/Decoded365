---
id: list-view-threshold
term: List view threshold
aliases: ["5,000 item limit", threshold, large list limit]
product: sharepoint
category: content
status: ga
related:
  - { id: sharepoint-list, type: used-by }
  - { id: document-library, type: used-by }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
The list view threshold is a safety limit that stops one view or search from working through too many items at once, so a big list does not slow everyone down.

## Maker
The limit is 5,000 items, but it applies to how many items an operation has to look at, not to how many a list holds. A [[sharepoint-list]] or [[document-library]] can contain far more. To stay under the limit, add indexes to the columns you filter or sort by and design views that narrow the data first.

## Architect
A query that needs a full scan of more than 5,000 items is blocked, while a query that filters on an indexed column first is allowed. Lists and libraries can hold up to 30 million items. Some operations, such as breaking permissions or deleting a very large folder, can also reach the limit. Use indexed filters, paging and batching in code. On [[sharepoint-server]] the farm administrator can change the thresholds, although staying within the defaults is wiser.
