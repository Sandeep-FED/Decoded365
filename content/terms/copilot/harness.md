---
id: harness
term: "Harness"
aliases: ["Studio engine", "Copilot Studio harness", "agent harness"]
product: copilot
category: agents
status: ga
related:
  - { id: copilot-studio, type: part-of }
  - { id: github-copilot-harness, type: used-by }
  - { id: standard-harness, type: used-by }
  - { id: customer-conversation-harness, type: used-by }
  - { id: orchestrator, type: often-confused-with }
  - { id: usage-based-billing, type: requires }
origins:
  - { source: decoded365-authors, use: facts-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A harness is the engine underneath an agent in Copilot Studio. The builder looks the same, but the engine decides how the agent behaves.

## Maker
It sets how independently the agent reasons, which files it can touch, where you can publish it and, importantly, how it is billed and whether your existing licences cover it. Today there are three: the [[github-copilot-harness]], the [[standard-harness]] and the [[customer-conversation-harness]].

## Architect
Choose the harness first, because it fixes the cost model and the publishing options. Do not confuse it with the [[orchestrator]], which is the component that coordinates steps inside an agent. The set of harnesses is evolving, so check the current harness overview.
