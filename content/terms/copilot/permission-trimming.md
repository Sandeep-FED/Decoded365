---
id: permission-trimming
term: "Permission trimming"
aliases: ["security trimming"]
product: copilot
category: security
status: ga
related:
  - { id: authorisation, type: requires }
  - { id: semantic-index, type: used-by }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Permission trimming means search and AI only show you what you already have the right to see.

## Maker
If a file is not shared with you, Copilot should not use it in your answers.

## Architect
Retrieval filters results against the requesting identity. It does not fix over-shared content, so check permissions before rolling out Copilot.
