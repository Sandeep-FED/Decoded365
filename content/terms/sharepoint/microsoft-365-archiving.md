---
id: microsoft-365-archiving
term: Microsoft 365 Archiving
aliases: [Syntex Archiving, Microsoft Syntex Archiving, Microsoft 365 Archive]
product: sharepoint
category: services
status: ga
appliesTo: [sharepoint-online]
renamed:
  - { from: Syntex Archiving, to: Microsoft 365 Archiving, date: "2023-07" }
related:
  - { id: sharepoint-site, type: used-by }
  - { id: microsoft-365-backup, type: often-confused-with }
origins:
  - { source: m365maps-renames, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Microsoft 365 Archiving lets an organisation move SharePoint sites that nobody uses any more to cheaper storage, while keeping their content so it can be brought back later.

## Maker
Admins archive a whole [[sharepoint-site]], not single files. An archived site cannot be used until an admin reactivates it. It is for content you want to keep but rarely need, and it is not the same as [[microsoft-365-backup]], which protects against loss. It used to be called Syntex Archiving.

## Architect
Archiving works at the site level and keeps the content in a lower-cost tier. Decide how it fits with retention policies and site lifecycle rules, and test how long reactivation takes before archiving sites that someone might need urgently. Check current limits and billing before you rely on it.
