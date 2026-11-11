---
id: prompt-injection
term: "Prompt injection"
aliases: []
product: copilot
category: security
status: ga
related:
  - { id: jailbreak, type: often-confused-with }
  - { id: grounding, type: often-confused-with }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Prompt injection is sneaking hidden instructions into content so the AI follows the attacker's orders.

## Maker
A document or web page could contain text that tells the AI to leak data or change its behaviour.

## Architect
Retrieved content must be treated as untrusted. Mitigate with filtering, limited tool permissions, [[human-in-the-loop]] approval for risky actions and monitoring.
