---
id: data-loss-prevention
term: "Data loss prevention"
aliases: []
product: copilot
category: security
status: ga
related:
  - { id: sensitivity-label, type: used-by }
  - { id: data-policy, type: often-confused-with }
  - { id: microsoft-purview, type: part-of }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Data loss prevention is a set of rules that stop sensitive information being shared where it should not be.

## Maker
Admins define policies that spot things like card numbers or labelled files and then block, warn or log the sharing. They help limit what leaves the organisation, including through AI tools.

## Architect
In Microsoft 365 DLP policies are managed in [[microsoft-purview]] and can use [[sensitivity-label|sensitivity labels]]. Test policies in audit mode first to avoid disrupting legitimate work.
