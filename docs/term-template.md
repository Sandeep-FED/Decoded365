---
id: example-term            # lowercase letters, numbers and hyphens; also the file name
term: Example term
aliases: [alias one, alias two]
product: sharepoint         # sharepoint | power-platform | copilot | cross-platform
category: sites             # sites | content | development | administration | services
status: ga                  # ga | preview | legacy | retired
# appliesTo: [sharepoint-online]          # only when it is not both Online and Server
# retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: other-term-id }
# renamed:
#   - { from: Old name, to: Example term, date: "2025-10" }   # date: null when not stated
related:
  - { id: other-term-id, type: requires }   # part-of | requires | used-by | alternative-to | often-confused-with | replaced-by
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }   # adapted | facts-only | terms-only
# levels: partial           # only while an entry is still being written
review: reviewed            # reviewed | drafted. Use drafted for text written with AI that nobody has checked yet
lastReviewed: 2026-11-01
reviewers: [your-github-handle]
---

## Beginner
One or two plain sentences with one everyday analogy.

## Maker
When to use it, its limits and how it fits with other tools. Link terms like [[other-term-id]].

## Architect
APIs, security model, licensing implications and gotchas.
