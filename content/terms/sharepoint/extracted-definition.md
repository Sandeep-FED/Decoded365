---
id: extracted-definition
term: Extracted definition
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: extracted-term, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An extracted definition is a sentence that the search system spotted and recognised as explaining a word.

## Maker
It is the definition obtained by an index server during a crawl, to identify whether any sentences in the item match the pattern for defining a term. It applies to an [[extracted-term]].

## Architect
The index server finds these during the crawl by matching sentences against a defining pattern. The result is linked to an [[extracted-term]].
