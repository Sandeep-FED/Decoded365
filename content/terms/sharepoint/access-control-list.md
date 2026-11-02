---
id: access-control-list
term: Access control list
aliases: [ACL]
product: sharepoint
category: administration
status: ga
related:
  - { id: access-control-entry, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An access control list is the full guest list for a door: every person or group and what each is allowed to do.

## Maker
It is the set of [[access-control-entry|access control entries]] for a whole object, a group of its properties, or a single property. It defines the access given to each security principal, such as a user or a group.

## Architect
In Windows-based systems the list can be attached at several levels of granularity. Whenever a principal asks for access, the system walks the entries to decide the result, so the list is the unit that security checks are evaluated against.
