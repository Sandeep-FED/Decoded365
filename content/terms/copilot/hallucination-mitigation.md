---
id: hallucination-mitigation
term: "Hallucination mitigation"
aliases: []
product: copilot
category: ai-concepts
status: ga
related:
  - { id: hallucination, type: requires }
  - { id: grounding, type: used-by }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Hallucination mitigation is the set of tricks used to stop an AI from making things up.

## Maker
Giving the AI real sources, asking for citations, testing and human review all lower the chance of an invented answer.

## Architect
Combine [[grounding]], [[citation|citations]], [[evaluation]] and [[human-in-the-loop]] review. Reduction is realistic; elimination is not.
