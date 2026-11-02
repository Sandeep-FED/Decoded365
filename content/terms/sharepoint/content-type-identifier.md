---
id: content-type-identifier
term: Content type identifier
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: content-type, type: requires }
  - { id: descendant-content-type, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A content type identifier is the unique code that tells SharePoint exactly which content type you mean.

## Maker
It is the unique identifier assigned to a [[content-type]]. Code and configuration use it because the display name can be duplicated or changed.

## Architect
Always address a content type by its identifier in code. The identifier is assigned to the content type and is what makes it uniquely identifiable.
