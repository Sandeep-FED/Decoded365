---
id: microsoft-copilot-harness
term: "Microsoft Copilot harness"
aliases: ["GitHub Copilot harness", "GitHub Copilot harness in Copilot Studio"]
product: copilot
category: agents
status: ga
renamed:
  - { from: "GitHub Copilot harness", to: "Microsoft Copilot harness", date: "2026-10" }
related:
  - { id: harness, type: part-of }
  - { id: agentic-ai, type: requires }
  - { id: copilot-credits, type: requires }
  - { id: standard-harness, type: often-confused-with }
  - { id: copilot-studio, type: part-of }
origins:
  - { source: decoded365-authors, use: facts-only }
  - { source: ms-copilot-studio-docs, use: facts-only }
  - { source: ms-copilot-harness-blog, use: facts-only }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The Microsoft Copilot harness is the engine for agents that work through a goal on their own, step by step. It used to be called the GitHub Copilot harness, and the name changed on 28 October 2026.

## Maker
You describe the agent in plain language and give it instructions, knowledge, tools, skills and memory, instead of drawing topics and branches as you do with the [[standard-harness]]. It reasons through a goal, retries when a tool call fails, works with Word, Excel, PowerPoint and PDF files, and uses skills and hooks. It bills [[copilot-credits]] for all usage, both while you create the agent and while it runs, and a Microsoft 365 Copilot licence never covers it. You pick the harness when you create an agent and cannot move the agent to another harness later. Some things the standard harness has are missing: the SharePoint, WhatsApp and Dynamics 365 Contact Center channels, custom entities, manual authentication and Azure AI Search knowledge, and computer use is only planned.

## Architect
Microsoft describes it as a shared foundation for agentic reasoning, tool use and orchestration, built by GitHub's engineering team and now used across Microsoft products, including Copilot Studio and Copilot Code. It supports more than 20 frontier models and bring-your-own-key, and open standards such as MCP and agent skills. In Copilot Studio it is an authoring and orchestration framework, not the GitHub Copilot service: it shares technology and SDK components with GitHub Copilot, but customer data is not sent to or processed by the GitHub Copilot service, and the existing Copilot Studio privacy, security and data residency commitments apply. Hooks replace topic triggers and skills replace prompt tools. Microsoft says existing agents continue with no change to capabilities or billing, and the new name appears in products and documentation over the following weeks, so older pages still say GitHub Copilot harness. Budget for it as a consumption workload, apply least privilege, review the actions taken and watch spend.
