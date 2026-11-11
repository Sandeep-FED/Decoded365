---
id: authorisation
term: "Authorisation"
aliases: ["authorization"]
product: copilot
category: security
status: ga
related:
  - { id: authentication, type: often-confused-with }
  - { id: permission-trimming, type: used-by }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Authorisation decides what a person, Copilot or an agent is allowed to do once it is known who they are.

## Maker
It covers reading, creating, changing and running things. Copilot only works with content that the user is already allowed to see, so authorisation limits what it can retrieve.

## Architect
Rules come from permissions, [[role-based-access-control]] and policies. [[permission-trimming]] applies them at retrieval time, and [[least-privilege]] is the principle that keeps them narrow.
