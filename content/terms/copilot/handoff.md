---
id: handoff
term: "Handoff"
aliases: ["hand-off", "escalation"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: part-of }
  - { id: human-in-the-loop, type: used-by }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A handoff is when a job passes from one agent or step to another, or to a real person.

## Maker
In support scenarios an agent may pass the case to a human when it can't help. The next owner needs enough context to continue.

## Architect
Design what context is passed, what happens if no one is available, and how the user is told. Include the conversation summary so people don't have to repeat themselves.
