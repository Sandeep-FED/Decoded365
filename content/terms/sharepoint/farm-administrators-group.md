---
id: farm-administrators-group
term: Farm Administrators group
aliases: []
product: sharepoint
category: administration
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: central-administration-site, type: used-by }
  - { id: sharepoint-groups, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The Farm Administrators group is the group of people trusted to look after all the servers that run SharePoint.

## Maker
It is a group of users that has permission to manage all the servers in a server farm. Members can run command-line operations and all the administrative tasks in [[central-administration-site|Central Administration]] for the server or server farm.

## Architect
Membership grants farm-wide control, so keep it small. It is different from site-level groups, see [[sharepoint-groups]].
