---
id: conversation-history
term: "Conversation history"
aliases: ["history", "interaction history"]
product: copilot
category: assistants
status: ga
related:
  - { id: context, type: used-by }
  - { id: memory, type: often-confused-with }
origins:
  - { source: decoded365-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Conversation history is the earlier part of a chat, which the AI reads so follow-up questions make sense.

## Maker
It lets you say "make that shorter" without repeating yourself. Saved history also lets you find old chats later, subject to the product and admin settings.

## Architect
Histories may be retained for continuity, support or governance, so [[retention]] and audit settings matter. Within a conversation, history consumes the [[context-window]]. It differs from [[memory]], which persists preferences across sessions.
