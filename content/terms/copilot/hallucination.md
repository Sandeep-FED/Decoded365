---
id: hallucination
term: "Hallucination"
aliases: ["AI hallucination", "made-up answer"]
product: copilot
category: ai-concepts
status: ga
related:
  - { id: grounding, type: alternative-to }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A hallucination is when an AI states something that sounds confident but is wrong or made up.

## Maker
It happens because a [[large-language-model]] predicts likely wording rather than looking facts up. [[grounding|Grounding]] in trusted content, asking for sources and checking important answers all help.

## Architect
Hallucinations include invented facts, citations and numbers. Mitigate them with grounding, tightly scoped instructions, evaluation sets that include questions with no answer, and human review for decisions that matter. Do not assume any mitigation removes them completely.
