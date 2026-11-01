---
id: microsoft-365-backup
term: Microsoft 365 Backup
aliases: [Syntex Backup, Microsoft Syntex Backup]
product: sharepoint
category: services
status: ga
appliesTo: [sharepoint-online]
renamed:
  - { from: Syntex Backup, to: Microsoft 365 Backup, date: "2023-07" }
related:
  - { id: recycle-bin, type: often-confused-with }
origins:
  - { source: m365maps-renames, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Microsoft 365 Backup keeps backup copies of an organisation's SharePoint, OneDrive and Exchange content, so it can be put back quickly after it is lost or damaged.

## Maker
Admins choose what to back up and can restore to an earlier point in time. It solves a different problem from the [[recycle-bin]], which only holds items someone deleted for a limited time, and from [[version-history]], which keeps earlier copies of a single file. It used to be called Syntex Backup.

## Architect
Backup works at the service level, with restore points for whole sites or accounts rather than for single versions of files. Plan it next to retention policies, the recycle bin and versioning, because each protects against a different kind of loss. Check current availability, limits and billing before relying on it.
