---
id: large-language-model
term: "Large language model"
aliases: ["LLM", "language model", "foundation model"]
product: copilot
category: ai-concepts
status: ga
origins:
  - { source: whatsitcalled-authors, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A large language model, or LLM, is a computer program trained on huge amounts of text so it can predict and write language. That is what lets AI assistants hold a conversation.

## Maker
LLMs power the chat and writing features in [[microsoft-365-copilot]] and [[copilot-studio]]. They write fluent text, but they do not know your business unless you [[grounding|ground]] them in your own content, and they can produce confident mistakes (a [[hallucination]]).

## Architect
A model is fixed after training and works within a limited context window, so applications retrieve relevant content at request time and pass it in with the [[prompt]]. The choice of model affects quality, speed and cost. In a [[declarative-agent]] the platform chooses it, and in a [[custom-engine-agent]] you do.
