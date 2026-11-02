---
id: first-party-agents
term: "First-party agents"
aliases: ["prebuilt agents", "built-in agents", "Microsoft-built agents"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: part-of }
  - { id: researcher, type: used-by }
  - { id: analyst, type: used-by }
  - { id: microsoft-365-copilot, type: requires }
  - { id: declarative-agent, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: facts-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
First-party agents are ready-made AI helpers that Microsoft supplies, so you hand them a job instead of building anything yourself.

## Maker
They come bundled with the Microsoft 365 Copilot licence and include Researcher, Analyst, Facilitator, Interpreter and Project Manager, among others. You delegate work to them, which makes them the easiest way to start with agents before you build your own with [[agent-builder]] or [[copilot-studio]].

## Architect
They are maintained by Microsoft, so you cannot change their internals, unlike a [[declarative-agent]] or [[custom-engine-agent]] you author. Like other Copilot features they work within the signed-in user's permissions, and the set on offer can change, so check current documentation.
