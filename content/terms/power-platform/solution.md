---
id: solution
term: "Solution"
aliases: ["managed solution", "unmanaged solution"]
product: power-platform
category: development
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
A solution is a box that you pack your apps and flows into so you can carry them from one environment to another.

## Maker
Solutions hold apps, flows, tables, security roles and more. They come in two types: unmanaged, which you can still edit, and managed, which is locked for the people who install it. Putting your work in a solution is how you share it and keep it organised.

## Architect
Solutions are the mechanism for application lifecycle management across Power Platform. Every solution has a publisher whose prefix names its components, and solutions can depend on one another. Develop in unmanaged form in a development [[environment]], then export as managed for test and production, ideally through an automated pipeline.
