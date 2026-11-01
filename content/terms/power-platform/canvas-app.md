---
id: canvas-app
term: "Canvas app"
product: power-platform
category: apps
status: ga
related:
  - { id: power-apps, type: part-of }
  - { id: power-fx, type: requires }
  - { id: model-driven-app, type: often-confused-with }
origins:
  - { source: ms-model-driven-glossary, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A canvas app is an app you design screen by screen, like arranging a poster: you place buttons, forms and pictures exactly where you want them.

## Maker
You drag controls onto a screen and set how they behave with [[power-fx]] formulas. Canvas apps can read and write many data sources through [[connector|connectors]], so they suit tasks such as an approval form or an equipment check. If you would rather have the app built around your data, see [[model-driven-app]].

## Architect
A canvas app is a set of screens made of controls bound to data sources. The maker decides layout, navigation and logic, so responsiveness and performance are the maker's job, and delegation limits matter for large data sources. Connections run with the signed-in user's permissions unless a shared connection is configured.
