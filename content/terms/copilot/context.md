---
id: context
term: "Context"
aliases: []
product: copilot
category: ai-concepts
status: ga
related:
  - { id: prompt, type: part-of }
  - { id: context-window, type: requires }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Context is the background information given to an AI along with your question, so it can answer sensibly.

## Maker
It can include your chat so far, files, instructions and facts retrieved from work data. Better context usually means a better answer.

## Architect
The model only sees what fits in the [[context-window]]. Context is assembled from [[system-prompt|system instructions]], [[conversation-history]], retrieved content and the user's [[prompt]], so what you include and exclude shapes the result.
