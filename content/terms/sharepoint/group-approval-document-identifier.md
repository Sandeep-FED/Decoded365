---
id: group-approval-document-identifier
term: Group Approval document identifier
aliases: []
product: sharepoint
category: development
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: workflow-identifier, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
It is the unique reference number for a document that is going through a group sign-off.

## Maker
It is a string that uniquely identifies a document that is subject to the policies defined for a Group Approval workflow. A protocol server generates and assigns it automatically.

## Architect
The string is generated and assigned to the document by a protocol server, not by the author. Use it to refer to the document in the approval process, and do not confuse it with the [[workflow-identifier]].
