---
id: term-store
term: Term store
aliases: [managed metadata, managed metadata service, taxonomy, term set]
product: sharepoint
category: content
status: ga
related:
  - { id: site-column, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
The term store is a central list of agreed words, such as department names or product categories. People pick from it when they tag files, so everyone tags things the same way.

## Maker
Admins build the list in the term store tool: terms live in term sets, and term sets live in groups. A managed metadata [[site-column]] points at a term set, so tagging gives a pick list instead of free typing. Terms can have synonyms and can be arranged in a hierarchy.

## Architect
Terms have GUIDs, so renaming a term does not break the items tagged with it. In each site collection, tagged values are mirrored in a hidden taxonomy list, which is why a restored or copied item may need its tags re-linked. The service is tenant-wide in SharePoint Online and a service application in [[sharepoint-server]]. It is also available through Microsoft Graph.
