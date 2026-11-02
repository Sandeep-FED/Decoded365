---
id: audience-rule
term: Audience rule
aliases: []
product: sharepoint
category: services
status: ga
related:
  - { id: audience-identifier, type: requires }
  - { id: user-profile-store, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An audience rule is the entry test for a club: if you meet the conditions, you are in.

## Maker
It is a set of logical conditions that decide whether a user profile can be a member of an audience. People who match the conditions are included automatically.

## Architect
Rules evaluate user-profile information, so the quality of the [[user-profile-store]] data decides who matches. A rule is attached to an audience that is referred to by its [[audience-identifier]].
