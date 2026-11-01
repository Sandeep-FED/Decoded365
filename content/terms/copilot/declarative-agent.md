---
id: declarative-agent
term: "Declarative agent"
aliases: ["declarative agents"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: part-of }
  - { id: custom-engine-agent, type: often-confused-with }
  - { id: microsoft-365-copilot, type: requires }
origins:
  - { source: ms-declarative-vs-custom-agents, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A declarative agent is a version of Copilot that you set up for one purpose by writing instructions and choosing what it can look at and do. You do not build the thinking part yourself.

## Maker
You supply instructions, [[knowledge-source|knowledge]] and [[agent-action|actions]], and Microsoft 365 Copilot's own orchestrator and models do the reasoning. It is the quicker route and suits most scenarios. If you need your own orchestrator or models, see [[custom-engine-agent]].

## Architect
Declarative agents run on Microsoft 365 Copilot's managed orchestration and language-model infrastructure. You configure the agent in a manifest instead of hosting a conversational runtime, so you cannot replace the orchestrator with your own code. Which capabilities are available depends on the authoring tool, manifest version, target experience, licensing and policies.
