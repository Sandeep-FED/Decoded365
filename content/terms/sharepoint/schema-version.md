---
id: schema-version
term: Schema version
aliases: []
product: sharepoint
category: development
status: ga
related:
  - { id: content-migration-package, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The schema version is the edition number of the rule sheet that a deployment package follows.

## Maker
It is an integer value that represents the version number of the schema for a deployment package. See [[content-migration-package]].

## Architect
The integer identifies the schema that the package uses. Check it when a package fails to import.
