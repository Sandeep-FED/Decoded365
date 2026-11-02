---
id: agentic-ai
term: "Agentic AI"
aliases: ["agentic"]
product: copilot
category: ai-concepts
status: ga
related:
  - { id: agent, type: requires }
  - { id: generative-ai, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Agentic AI is AI that can work through several steps to reach a goal, instead of just answering one question.

## Maker
Where plain [[generative-ai]] produces a single reply to a single request, agentic systems plan, use tools and carry on until a task is done. An [[agent]] is the usual way you meet it.

## Architect
The pattern combines a model, instructions, memory, [[tool-calling|tools]] and a loop that decides the next step. Because it can act, it needs tighter permissions, logging and [[human-in-the-loop|human review]] than a chat reply does.
