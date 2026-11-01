---
id: site-column
term: Site column
aliases: [column, field, SPField]
product: sharepoint
category: content
status: ga
related:
  - { id: content-type, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A site column is a reusable piece of information, such as "Project owner" or "Due date", that you define once and can then use in many lists and libraries on a site.

## Maker
Define a site column once, with its type (text, choice, person, date and so on), and add it to a [[content-type]] or directly to lists and libraries. This keeps names and settings consistent. A column created inside a single list is a list column and is not shared.

## Architect
A site column is a field defined at web scope. Its internal name is fixed when it is created and shows up in code and URLs, so choose it carefully (a display name with spaces becomes encoded, for example _x0020_). Content types reference site columns by ID, and the schema is available through REST and CSOM.
