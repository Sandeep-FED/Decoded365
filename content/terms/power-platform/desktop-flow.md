---
id: desktop-flow
term: "Desktop flow"
aliases: ["RPA flow", "robotic process automation"]
product: power-platform
category: automation
status: ga
related:
  - { id: power-automate, type: part-of }
  - { id: connector, type: alternative-to }
origins:
  - { source: decoded365-authors, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A desktop flow copies the clicks and typing a person would do on a computer, so a repetitive task, like copying details between two old programs, can run on its own.

## Maker
Desktop flows automate Windows applications and websites, which helps when a system has no [[connector]]. They can run while someone watches (attended) or on their own (unattended), and a [[cloud-flow]] can start them.

## Architect
Desktop flows run on a Windows machine that is registered to an [[environment]], so you manage the machine, its sessions and its credentials. Automating a screen is more fragile than calling an API, so prefer a [[connector]] when one exists.
