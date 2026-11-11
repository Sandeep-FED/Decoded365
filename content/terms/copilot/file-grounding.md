---
id: file-grounding
term: "File grounding"
aliases: ["document grounding", "reference file", "reference files"]
product: copilot
category: data
status: ga
related:
  - { id: grounding, type: part-of }
  - { id: upload, type: requires }
origins:
  - { source: whatsitcalled-authors, use: terms-only }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
File grounding means giving the AI a file to base its answer on, like handing a colleague the document and asking about it.

## Maker
You attach or point to a document and ask for a summary, an answer or a new document based on it. It keeps the AI to the material you chose.

## Architect
The file becomes part of the [[context]] for that task. Permissions still apply, and large files may exceed the [[context-window]], so relevant parts are retrieved.
