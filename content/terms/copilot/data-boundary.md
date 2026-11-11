---
id: data-boundary
term: "Data boundary"
aliases: ["EU Data Boundary"]
product: copilot
category: governance
status: ga
related:
  - { id: tenant-data, type: requires }
  - { id: enterprise-data-protection, type: often-confused-with }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A data boundary is a line around where your organisation's data may be stored and processed, like a country border for information.

## Maker
Boundaries can be geographic, tenant-based or service-based. They matter to organisations with rules about where data may go, and they shape which AI features can be used.

## Architect
Boundaries are defined by Microsoft service commitments and tenant configuration. Check how each Copilot feature, including any that call external services or models, is covered before relying on a boundary for compliance.
