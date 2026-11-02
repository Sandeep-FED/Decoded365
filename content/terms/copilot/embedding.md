---
id: embedding
term: "Embedding"
aliases: ["embeddings"]
product: copilot
category: ai-concepts
status: ga
related:
  - { id: vector, type: requires }
  - { id: semantic-search, type: used-by }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An embedding is a list of numbers that captures the meaning of some text, so a computer can tell what is similar.

## Maker
It is how a search can find a document about "holiday" when you typed "vacation". The meanings sit close together.

## Architect
A model converts content into a [[vector]]; similarity is then measured mathematically. Embeddings power [[vector-search]] and [[semantic-index|semantic indexes]], and should be created and queried with the same model.
