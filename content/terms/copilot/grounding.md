---
id: grounding
term: "Grounding"
aliases: ["grounded answers", "retrieval-augmented generation", "RAG", "data grounding", "knowledge grounding", "prompt grounding", "response grounding"]
product: copilot
category: ai-concepts
status: ga
related:
  - { id: large-language-model, type: used-by }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Grounding means giving the AI the right facts to answer from, such as your documents, so it does not have to guess.

## Maker
[[microsoft-365-copilot]] grounds answers in the work data a person can access, and an [[agent]] is grounded through its [[knowledge-source|knowledge sources]]. Grounded answers are easier to check because you can see where they came from.

## Architect
Grounding usually retrieves relevant passages at request time and adds them to the prompt, which is known as retrieval-augmented generation. Quality depends on search quality, permission trimming and content freshness. It reduces, but does not remove, [[hallucination]].
