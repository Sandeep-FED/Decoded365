---
id: audience-identifier
term: Audience identifier
aliases: []
product: sharepoint
category: services
status: ga
related:
  - { id: audience-rule, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An audience identifier is the unique name tag that tells SharePoint which audience you mean.

## Maker
Audiences group people so you can target content. Each audience has an identifier, which is a GUID or string, so it can be referred to without confusion even if two audiences have similar display names.

## Architect
Use the identifier, not the display name, when you refer to an audience from code or configuration. It is a GUID or string that uniquely identifies the audience.
