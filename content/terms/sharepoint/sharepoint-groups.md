---
id: sharepoint-groups
term: SharePoint groups
aliases: [Owners, Members and Visitors, site permission groups, permission groups]
product: sharepoint
category: administration
status: ga
related:
  - { id: sharepoint-site, type: part-of }
  - { id: team-site, type: often-confused-with }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
SharePoint groups are the permission buckets of a site. Owners can do everything, Members can add and edit, and Visitors can only read.

## Maker
Every [[sharepoint-site]] has these three groups, and you give access by adding people to the right one. Libraries, lists and items inherit the site's permissions unless someone breaks the inheritance. On a [[team-site]] connected to a Microsoft 365 group, the group's owners and members are mapped to the site's Owners and Members.

## Architect
Each group is granted a permission level on the site: Full Control, Edit and Read by default. Breaking inheritance on many items is costly because every item then carries its own permissions, so prefer fewer, broader groups and security groups over individual grants. Do not mix up SharePoint groups with Microsoft 365 groups, which also control a team's mailbox and Teams membership.
