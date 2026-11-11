---
id: authentication
term: "Authentication"
aliases: ["sign-in verification"]
product: copilot
category: security
status: ga
related:
  - { id: authorisation, type: often-confused-with }
  - { id: microsoft-entra-id, type: requires }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Authentication is proving who you are, like showing your pass at the entrance.

## Maker
Before Copilot or an agent uses any Microsoft 365 data it needs to know who is asking. Authentication answers "who are you?", while [[authorisation]] answers "what may you do?".

## Architect
In Microsoft 365 identity is handled by [[microsoft-entra-id]]. Agents and connectors authenticate with user, app or managed identities, and [[single-sign-on]] lets one sign-in cover many apps.
