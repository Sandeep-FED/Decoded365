---
id: member-group
term: Member group
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: member-group-source, type: requires }
  - { id: members-group, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A member group is a group of people that the profile service tracks, not the same as the site group called Members.

## Maker
It is a group of users that is specific to the User Profile service. Do not confuse it with the [[members-group]] of a site.

## Architect
The group is defined for the user profile service and its [[member-group-source]] identifies where it came from.
