---
id: data-policy
term: "Data policy"
aliases: ["DLP policy", "data loss prevention policy", "DLP"]
product: power-platform
category: administration
status: ga
renamed:
  - { from: "DLP policy", to: "data policy", date: null }
related:
  - { id: power-platform-admin-center, type: part-of }
  - { id: connector, type: requires }
origins:
  - { source: ms-power-platform-docs, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A data policy is a safety rule set by administrators that decides which services your apps and flows are allowed to connect with.

## Maker
Administrators sort [[connector|connectors]] into groups or block them, so makers cannot combine a company data source with a personal one by mistake. Data policies used to be called data loss prevention (DLP) policies, so older material uses that name.

## Architect
Data policies are set in the [[power-platform-admin-center]] at tenant or [[environment]] level and act as guardrails across Power Apps, Power Automate and Copilot Studio. A resource that breaks a policy can be blocked, so test policy changes before applying them widely.
