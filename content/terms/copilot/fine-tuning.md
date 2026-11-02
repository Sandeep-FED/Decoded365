---
id: fine-tuning
term: "Fine-tuning"
aliases: ["fine tuning"]
product: copilot
category: ai-concepts
status: ga
related:
  - { id: ai-model, type: requires }
  - { id: grounding, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Fine-tuning is giving an AI model extra training so it gets better at a particular kind of task.

## Maker
It is different from just giving the AI documents to read: it actually changes the model's behaviour. Many business needs are met by [[grounding]] instead, which is cheaper and easier to update.

## Architect
It trains an existing [[ai-model]] further on curated examples. Consider data quality, cost, maintenance when the base model changes, and whether instructions plus retrieval would do the job.
