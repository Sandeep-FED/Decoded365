---
id: context-window
term: "Context window"
aliases: []
product: copilot
category: ai-concepts
status: ga
related:
  - { id: context, type: requires }
  - { id: token, type: requires }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The context window is how much an AI can keep in mind at once, like the size of its desk.

## Maker
If a conversation or document is too long, parts may be left out or summarised, which is why long chats can seem to forget early details.

## Architect
The window is measured in [[token|tokens]] and covers instructions, history, retrieved passages and the reply. Design agents to retrieve only what is relevant rather than stuffing everything in.
