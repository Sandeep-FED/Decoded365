---
id: microsoft-365-copilot
term: "Microsoft 365 Copilot (Premium)"
aliases: ["Microsoft 365 Copilot", "Copilot for Microsoft 365", "M365 Copilot"]
product: copilot
category: assistants
status: ga
renamed:
  - { from: "Microsoft 365 Copilot", to: "Copilot for Microsoft 365", date: "2023-11" }
  - { from: "Copilot for Microsoft 365", to: "Microsoft 365 Copilot", date: "2024-08" }
  - { from: "Microsoft 365 Copilot", to: "Microsoft 365 Copilot (Premium)", date: "2026-04" }
related:
  - { id: microsoft-graph, type: requires }
  - { id: microsoft-365-copilot-chat, type: often-confused-with }
origins:
  - { source: ms-declarative-vs-custom-agents, use: adapted }
  - { source: m365maps-renames, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Microsoft 365 Copilot is an AI assistant built into Microsoft 365 apps such as Word, Outlook and Teams. You ask it in everyday language and it helps you write, summarise and find things, using your own work information.

## Maker
It works across Microsoft 365 apps and Copilot Chat, using the work data you are allowed to see through [[microsoft-graph]]. Organisations extend it with [[agent|agents]]. Its name has changed several times, and in April 2026 it became Microsoft 365 Copilot (Premium) next to [[microsoft-365-copilot-chat|Microsoft 365 Copilot (Basic)]].

## Architect
Copilot combines a [[large-language-model]] with your organisation's data, retrieved through [[microsoft-graph]] and limited to what each user is already allowed to see. Answers are only as good as the content and permissions behind them, so content that is shared too widely, for example through broad [[sharing-link|sharing links]], can surface in answers. Extensibility comes through [[declarative-agent|declarative agents]] and [[custom-engine-agent|custom engine agents]].
