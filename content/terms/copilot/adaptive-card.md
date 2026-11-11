---
id: adaptive-card
term: "Adaptive Card"
aliases: ["adaptive cards"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: used-by }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An Adaptive Card is a small, tidy panel with text, pictures and buttons that appears inside a chat, like a mini form.

## Maker
Cards let an [[agent]] or a workflow show information and ask for a choice in a consistent layout, wherever the conversation happens. You describe the card once and each app draws it in its own style.

## Architect
A card is described in JSON, and the host application renders it to match its own look. Keep cards small and avoid putting secrets in them, because their content is visible in the conversation.
