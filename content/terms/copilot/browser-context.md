---
id: browser-context
term: "Browser context"
aliases: []
product: copilot
category: ai-concepts
status: ga
related:
  - { id: app-context, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Browser context is the web page you are looking at, shared with an AI helper when you allow it.

## Maker
Where a feature supports it, an assistant can use the current page or browsing session to answer questions about what you see.

## Architect
Treat page content as untrusted input, since it may contain hidden instructions (see [[prompt-injection]]). Respect organisational policy on which pages may be shared.
