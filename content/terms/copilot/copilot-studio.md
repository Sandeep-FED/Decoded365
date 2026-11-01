---
id: copilot-studio
term: "Copilot Studio"
aliases: ["Microsoft Copilot Studio", "Power Virtual Agents", "PVA", "Power Virtual Agents for Teams", "Copilot Studio for Teams"]
product: copilot
category: agents
status: ga
renamed:
  - { from: "Power Virtual Agents", to: "Copilot Studio", date: null }
  - { from: "Power Virtual Agents for Teams", to: "Copilot Studio for Teams", date: "2023-11" }
related:
  - { id: environment, type: requires }
origins:
  - { source: ms-copilot-studio-docs, use: facts-only }
  - { source: m365maps-renames, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Copilot Studio is where you build AI assistants, called agents, with little or no code. You describe what you want, give the agent knowledge and tools, then put it where people already work.

## Maker
It is a graphical, low-code studio for building and managing [[agent|agents]] and workflows, connected to your data through [[connector|connectors]]. You can publish agents to channels such as Microsoft Teams, websites and mobile apps. It was called Power Virtual Agents before the rename, and the Teams edition became Copilot Studio for Teams in November 2023.

## Architect
An [[agent]] follows instructions, uses [[knowledge-source|knowledge sources]] and calls [[agent-action|actions]], and the [[orchestrator]] decides how to combine them. Classic agents were built from [[topic|topics]]. Agents live in an [[environment]], move between them with [[solution|solutions]], and are governed by [[data-policy|data policies]].
