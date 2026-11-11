---
id: json
term: "JSON"
aliases: ["JavaScript Object Notation"]
product: copilot
category: ai-concepts
status: ga
related:
  - { id: tool-calling, type: used-by }
  - { id: adaptive-card, type: used-by }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
JSON is a simple, tidy text format for passing information between programs, a bit like a filled-in form.

## Maker
You will see it when connecting agents and services: data is sent as named items in curly brackets.

## Architect
Many agent features use JSON: [[tool-calling]] parameters, [[adaptive-card|Adaptive Cards]] and API responses. Validate it before trusting it, as models can produce malformed JSON.
