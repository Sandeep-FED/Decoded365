---
id: connector
term: "Connector"
aliases: ["connectors", "custom connector"]
product: power-platform
category: development
status: ga
related:
  - { id: power-platform, type: part-of }
origins:
  - { source: ms-power-platform-docs, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A connector is a ready-made plug that lets an app or automation talk to another service, such as Outlook or SharePoint, without writing code.

## Maker
Connectors wrap a service's API so you can use its data and actions from [[power-apps]], [[power-automate]] and [[copilot-studio]]. Some are standard and some are premium, and you can build custom ones. Administrators can control which connectors may be used together with [[data-policy|data policies]].

## Architect
A connector is a strongly typed description of a REST API with its operations, triggers and authentication. A connection holds the credentials, and a connection reference lets a [[solution]] bind to a different connection in each [[environment]]. Custom connectors can wrap your own API through an OpenAPI definition.
