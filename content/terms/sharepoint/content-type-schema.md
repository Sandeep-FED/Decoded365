---
id: content-type-schema
term: Content type schema
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: content-type, type: requires }
  - { id: caml, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A content type schema is the written blueprint of a content type: it spells out what the content type contains.

## Maker
It is an XML definition that describes the contents of a [[content-type]]. Tools and code can read it to know which fields the content type has.

## Architect
The schema is XML, which is why it is read and written by deployment tooling. It describes the contents of the [[content-type]] in a form that machines can process.
