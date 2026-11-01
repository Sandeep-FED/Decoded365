---
id: cloud-flow
term: "Cloud flow"
aliases: ["flow", "automated flow", "instant flow", "scheduled flow"]
product: power-platform
category: automation
status: ga
related:
  - { id: power-automate, type: part-of }
  - { id: business-process-flow, type: often-confused-with }
origins:
  - { source: ms-model-driven-glossary, use: facts-only }
  - { source: ms-power-platform-docs, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A cloud flow is an automation that runs on Microsoft's servers, so it works even when your computer is off. Something starts it, such as a new email, a button press or a set time.

## Maker
Cloud flows can start automatically when something changes, instantly when you select a button, or on a schedule. Each flow has a trigger followed by actions, and the steps use [[connector|connectors]]. A [[desktop-flow]] is the other main kind, for programs on a computer.

## Architect
A cloud flow is a trigger plus actions, run by the Power Automate service under a connection. Retries, concurrency and run history are managed by the service. Include flows in a [[solution]] so they can be exported with their connection references and environment variables.
