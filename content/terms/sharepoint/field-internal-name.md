---
id: field-internal-name
term: Field internal name
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: site-column, type: requires }
  - { id: sharepoint-list, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A field internal name is the fixed behind-the-scenes name of a column, which stays the same even if the visible title changes.

## Maker
It is a string that uniquely identifies a field in a content type or a [[sharepoint-list]]. Use it rather than the display name in formulas and code.

## Architect
The internal name is set when the field is created and does not change when the display name is edited, so it is the safe key for code. See also [[site-column]].
