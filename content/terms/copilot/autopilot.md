---
id: autopilot
term: "Autopilot"
aliases: ["Autopilots"]
product: copilot
category: agents
status: preview
renamed:
  - { from: "Microsoft Scout", to: "Autopilot", date: "2026-09" }
related:
  - { id: microsoft-scout, type: often-confused-with }
  - { id: agentic-ai, type: requires }
  - { id: workspace, type: requires }
  - { id: memory, type: requires }
  - { id: usage-based-billing, type: requires }
  - { id: agent, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: facts-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Autopilot is an AI helper that lives in your organisation and keeps working on its own between your requests, like a colleague with a standing job.

## Maker
You give it a name, a role and a goal. It is hosted in the cloud, belongs to your tenant, has its own identity, memory and [[workspace]], and carries on working without waiting for each prompt. It is in private preview and is billed with usage-based [[copilot-credits]].

## Architect
Because it has its own identity and acts over time, treat it like any other principal: give it [[least-privilege]] access, review what it does and set an owner. It was previously called Microsoft Scout; the name changed in September 2026, so older material may use the earlier name. Autopilots is also the name of Stage 5 in some Copilot adoption playbooks.
