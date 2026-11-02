---
id: evaluation
term: "Evaluation"
aliases: ["quality evaluation", "evals"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: used-by }
  - { id: red-teaming, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Evaluation is testing an AI helper to see whether its answers are good enough.

## Maker
Builders prepare sample questions and check things such as accuracy, safety, usefulness, speed and whether the task was completed, before and after changes.

## Architect
Use a fixed set of test cases with clear criteria such as correctness, completeness and groundedness. Re-run them whenever instructions, knowledge or the model changes. Contrast with [[red-teaming]], which probes for weaknesses.
