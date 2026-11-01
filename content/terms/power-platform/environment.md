---
id: environment
term: "Environment"
aliases: ["Power Platform environment"]
product: power-platform
category: administration
status: ga
related:
  - { id: power-platform, type: part-of }
origins:
  - { source: ms-power-platform-docs, use: adapted }
  - { source: ms-model-driven-glossary, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
An environment is a separate workspace inside Power Platform. You might have one for testing and another for the real thing, so experiments never disturb live work.

## Maker
An environment is a space to store, manage and share your organisation's business data, apps, agents and flows. Many organisations create separate ones for development, test and production, or for different teams or regions. You move things between environments with [[solution|solutions]].

## Architect
Each environment is created under a Microsoft Entra tenant and is tied to a geography. It is where [[dataverse]] data, apps and flows live. Admins control creation, access and policy through the [[power-platform-admin-center]] and [[data-policy|data policies]]. Plan the environment strategy early, because it drives lifecycle management, access and cost.
