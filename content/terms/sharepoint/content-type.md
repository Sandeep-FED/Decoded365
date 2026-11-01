---
id: content-type
term: Content type
aliases: [site content type]
product: sharepoint
category: content
status: ga
related:
  - { id: document-library, type: used-by }
  - { id: sharepoint-list, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A content type is a reusable template that says what information belongs with a kind of item or document. For example, every "Contract" always carries a customer name and an end date, wherever it is stored.

## Maker
A content type bundles [[site-column|site columns]] and can include a document template. Add it to a [[document-library]] or [[sharepoint-list]] and every item of that type gets the same fields. Content types can inherit from a parent type, and an organisation can publish them to many sites from the content type gallery.

## Architect
The content type ID encodes the inheritance chain, for example 0x0101 for Document. Site content types live in a [[site-collection]], and each list gets a local copy when the type is added. Changes made to the parent can be pushed down to the copies. Cross-site distribution uses content type publishing from the gallery.
