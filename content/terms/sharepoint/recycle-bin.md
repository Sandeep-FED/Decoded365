---
id: recycle-bin
term: Recycle Bin
aliases: [first-stage Recycle Bin, second-stage Recycle Bin, site collection Recycle Bin, deleted files]
product: sharepoint
category: administration
status: ga
related:
  - { id: sharepoint-site, type: part-of }
  - { id: site-collection, type: part-of }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
The Recycle Bin is where deleted SharePoint files and items wait before they are gone for good. You can restore your own deleted items from the site's Recycle Bin. If they are removed from there, they move to a second-stage bin that only site collection administrators can restore from.

## Maker
Deleted items are kept for 93 days in total across both stages, counted from the original deletion. The first stage is the site's Recycle Bin, where people see and restore what they deleted. The second stage is the site collection Recycle Bin, found in site settings by a site collection administrator, who can restore anything deleted from the first stage.

## Architect
The first-stage bin is per site and per user, and the second-stage bin is per [[site-collection]]. Items in either stage still count toward the site collection's storage. After 93 days the content is permanently deleted, so recovery after that point depends on backup or retention policies rather than on the Recycle Bin.
