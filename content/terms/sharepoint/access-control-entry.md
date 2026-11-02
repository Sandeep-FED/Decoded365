---
id: access-control-entry
term: Access control entry
aliases: [ACE]
product: sharepoint
category: administration
status: ga
related:
  - { id: access-control-list, type: part-of }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An access control entry is one line on a guest list: it names a person or group and says what they may or may not do with something.

## Maker
Each entry either grants or denies permissions to a user or group. SharePoint builds on the Windows security model, so you meet these entries when permissions are inherited or checked. Entries are collected into an [[access-control-list]].

## Architect
An entry sits in an object's discretionary list (DACL), where it grants or denies access, or in its system list (SACL), where it says which security events to audit or sets the Windows Integrity Level. The order and type of entries decide the final access result.
