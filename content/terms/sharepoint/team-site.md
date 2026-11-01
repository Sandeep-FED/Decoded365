---
id: team-site
term: Team site
aliases: [group-connected team site, Microsoft 365 group-connected site]
product: sharepoint
category: sites
status: ga
related:
  - { id: communication-site, type: often-confused-with }
  - { id: site-collection, type: part-of }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A team site is a SharePoint site built for people who work together on a project or in a department. It is the team's shared workspace for files, tasks and news, where everyone on the team can add and edit.

## Maker
A team site is usually connected to a Microsoft 365 group, which also gives the team a shared mailbox and calendar and links it to Microsoft Teams and Planner. Members edit content freely. Choose a [[communication-site]] instead when a few people publish and many people read. A team site can also be created without a Microsoft 365 group.

## Architect
Group-connected team sites are created from the GROUP#0 template, and the Microsoft 365 group's owners and members map to the site's Owners and Members. Visitors are managed separately in SharePoint. The non-group variant uses the STS#3 template and is managed through SharePoint groups only. Either way the site is the top-level site of its own [[site-collection]].
