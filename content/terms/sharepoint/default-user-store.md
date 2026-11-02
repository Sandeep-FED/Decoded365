---
id: default-user-store
term: Default user store
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: user-store, type: requires }
  - { id: fsa-manager, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The default user store is the first place that search looks to work out who belongs to which group.

## Maker
It is a [[user-store]] supplied as a starting point for expanding group membership when no user store has been named. It is used by FAST Search Authorization.

## Architect
FAST Search Authorization uses it when a [[user-store]] is not already specified, as the starting point for expanding group membership.
