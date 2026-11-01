---
id: power-platform
term: "Power Platform"
aliases: ["Microsoft Power Platform"]
product: power-platform
category: platform
status: ga
origins:
  - { source: ms-power-platform-docs, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Power Platform is Microsoft's family of low-code tools for building apps, automating work, making websites and analysing data. Think of it as a workshop with a different tool for each job, all sharing the same shelves of data.

## Maker
The main tools are [[power-apps]] for apps, [[power-automate]] for automation, [[power-pages]] for external websites and [[power-bi]] for reports, and [[copilot-studio]] builds AI agents on the same foundations. They share [[connector|connectors]], [[dataverse]] and [[environment|environments]], so one solution can mix several of them.

## Architect
Everything is organised by [[environment]]: each one sits in a Microsoft Entra tenant and a geography, and holds apps, flows, agents and data. Teams move work between environments with [[solution|solutions]], and administrators govern it in the [[power-platform-admin-center]], using [[data-policy|data policies]] to control which connectors can be combined.
