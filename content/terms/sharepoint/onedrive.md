---
id: onedrive
term: OneDrive
aliases: [OneDrive for Business]
product: sharepoint
category: services
status: ga
renamed:
  - { from: OneDrive for Business, to: OneDrive, date: "2025-10" }
related:
  - { id: document-library, type: requires }
origins:
  - { source: m365maps-renames, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
OneDrive is the personal online storage that comes with a work or school Microsoft 365 account. It is your own private folder in the cloud, and you choose what to share with others.

## Maker
Behind the scenes a OneDrive works like a SharePoint [[document-library]] that belongs to one person. It syncs to your computer, supports sharing links and versions, and is managed by your admin through quotas and policies. It used to be called OneDrive for Business, so older articles and tools may use that name.

## Architect
Each user's OneDrive is a personal site collection that is created the first time it is needed. Files are reachable through Microsoft Graph at the user's drive and share the same storage engine as SharePoint libraries. Retention, sharing and quota are governed by tenant policies.
