---
id: agent-action
term: "Action"
aliases: ["agent action", "tool", "agent tool"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: part-of }
origins:
  - { source: ms-declarative-vs-custom-agents, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
An action is something an agent can do for you rather than just say, such as sending an email or updating a record.

## Maker
[[agent|Agents]] use actions, also called tools, to automate steps and connect to other systems. Actions can be provided by services such as MCP servers or REST APIs, and in Copilot Studio they can also be [[connector|connectors]] or flows.

## Architect
Tool calling invokes configured MCP or API actions. You define the inputs and outputs, the authentication and any confirmations, and make the service behave reliably. Ask for confirmation before an action changes data, and give the identity that the action uses only the access it needs.
