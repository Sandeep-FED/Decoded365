---
id: topic
term: "Topic (Copilot Studio)"
aliases: ["conversation topic"]
product: copilot
category: agents
status: ga
related:
  - { id: copilot-studio, type: part-of }
origins:
  - { source: ms-copilot-studio-docs, use: facts-only }
  - { source: whatsitcalled-authors, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A topic is one conversation an agent knows how to have, such as 'reset my password' or 'opening hours'.

## Maker
In [[copilot-studio]], a topic holds the steps of a conversation about one subject and starts when a user says something that matches. Agents can combine topics with [[knowledge-source|knowledge]] and [[agent-action|actions]]. Topics were the main building block of Power Virtual Agents.

## Architect
A topic defines how it is triggered and then a series of steps that ask questions, set variables, call actions and send messages. Agents that use generative orchestration can choose among topics, tools and knowledge dynamically, so give topics clear names and descriptions, because the [[orchestrator]] relies on them.
