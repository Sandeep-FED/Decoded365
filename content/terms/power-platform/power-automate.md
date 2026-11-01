---
id: power-automate
term: "Power Automate"
aliases: ["Microsoft Flow"]
product: power-platform
category: automation
status: ga
renamed:
  - { from: "Microsoft Flow", to: "Power Automate", date: "2019-11" }
related:
  - { id: power-platform, type: part-of }
origins:
  - { source: ms-model-driven-glossary, use: facts-only }
  - { source: ms-power-platform-docs, use: adapted }
  - { source: m365maps-renames, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Power Automate lets you set up a chain of steps that runs by itself, such as saving email attachments to a folder or asking a manager to approve a request.

## Maker
Automations are called flows. A [[cloud-flow]] runs online when something happens or on a schedule, and a [[desktop-flow]] repeats actions on a Windows computer. Flows use [[connector|connectors]] to talk to other services. It used to be called Microsoft Flow, so older articles may say 'Flow' for the whole product.

## Architect
Flows belong to an [[environment]] and run under a connection's permissions, so a change of owner, a shared connection or licensing can decide whether a flow keeps running. Move flows with [[solution|solutions]] and use [[data-policy|data policies]] to stop risky connector combinations. A model-driven [[business-process-flow]] is authored in the same designer but is a different thing.
