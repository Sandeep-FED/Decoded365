---
id: column-formatting
term: Column formatting
aliases: [view formatting, list formatting, JSON formatting]
product: sharepoint
category: content
status: ga
related:
  - { id: sharepoint-list, type: used-by }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Column formatting changes how a column looks in a list or library, for example showing a status as a coloured label, without writing a program.

## Maker
Open the column menu and choose to format the column, then start from a ready-made example or switch to advanced mode and edit the instructions. The same idea works for whole rows through view formatting. It only changes what people see: the data stays the same and the formatting does not hide anything from people who have access.

## Architect
Formatting is a JSON description that follows a published schema: elements, styles and expressions that can read the current field and other fields, with Excel-style functions. It runs in the browser, so it is display-only and not a security control. When the JSON approach is not enough, a field customizer built with the [[spfx]] can render the column instead.
