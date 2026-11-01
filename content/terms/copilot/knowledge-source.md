---
id: knowledge-source
term: "Knowledge source"
aliases: ["knowledge", "grounding data"]
product: copilot
category: agents
status: ga
related:
  - { id: agent, type: part-of }
origins:
  - { source: ms-declarative-vs-custom-agents, use: adapted }
  - { source: ms-copilot-studio-docs, use: facts-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Knowledge is what an agent is allowed to read in order to answer you, such as a set of documents, a website or a database.

## Maker
You tailor an [[agent]]'s answers by giving it specialised instructions and data sources. Good knowledge is accurate, current and open to the people asking: an agent only answers well from content its users are allowed to see.

## Architect
Knowledge can come from Microsoft 365 content such as SharePoint sites and libraries, from external systems through connectors, or from other sources the platform supports. Retrieval quality, permissions and freshness matter as much as the model, so test with real questions and review who can read the source content. See also [[grounding]].
