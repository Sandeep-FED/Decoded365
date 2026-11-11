---
id: microsoft-graph
term: "Microsoft Graph"
aliases: ["Graph", "Graph API"]
product: cross-platform
category: services
status: ga
related:
  - { id: microsoft-365-copilot, type: used-by }
  - { id: spfx, type: used-by }
origins:
  - { source: ms-declarative-vs-custom-agents, use: facts-only }
  - { source: whatsitcalled-authors, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Microsoft Graph is the connection point to the information in your Microsoft 365 account, such as your files, mail, meetings and people. It is how apps ask for that information in a controlled way.

## Maker
[[microsoft-365-copilot]] uses enterprise data from Microsoft Graph, which is why it can talk about your own documents and meetings. Developers use the same Graph APIs to build their own integrations.

## Architect
Graph is a REST API with a common sign-in model through Microsoft Entra. Permissions are either delegated, acting as the signed-in user, or application-level. In [[spfx]] solutions and agents, request only the scopes you need.
