---
id: power-fx
term: "Power Fx"
aliases: ["Power Apps formulas"]
product: power-platform
category: development
status: ga
related:
  - { id: canvas-app, type: used-by }
origins:
  - { source: ms-model-driven-glossary, use: facts-only }
  - { source: whatsitcalled-authors, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Power Fx is the simple formula language used in Power Apps. If you have written a formula in Excel, it will look familiar.

## Maker
You use Power Fx to say what happens when someone selects a button, how to filter a list, or when to show or hide something. It is also used in other low-code places, such as formulas in [[copilot-studio]]. Because it is formula based, you can read an app's logic without hunting through code.

## Architect
Power Fx is a declarative, strongly typed, Excel-style language whose formulas recalculate when their inputs change. Microsoft has released the language as open source, and the same formulas can run in different Power Platform hosts. Delegation to the data source decides how much of the work is done server-side.
