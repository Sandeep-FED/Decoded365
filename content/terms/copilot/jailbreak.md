---
id: jailbreak
term: "Jailbreak"
aliases: []
product: copilot
category: security
status: ga
related:
  - { id: prompt-injection, type: often-confused-with }
  - { id: ai-safety, type: part-of }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A jailbreak is a trick that gets an AI to ignore its own safety rules.

## Maker
People write clever prompts to push a model into producing things it is meant to refuse. Builders test for this before releasing an agent.

## Architect
Jailbreaks target the model's own safety behaviour, whereas [[prompt-injection]] smuggles instructions in through content. Defend with layered [[guardrail|guardrails]], [[moderation]] and [[red-teaming]].
