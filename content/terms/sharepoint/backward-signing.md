---
id: backward-signing
term: Backward signing
aliases: []
product: sharepoint
category: content
status: ga
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
Backward signing describes how a handwritten signature runs: from left to right, or the other way round.

## Maker
It is a property of a handwritten signature stored as an image or an .ink file. It records the direction of the characters in the signature, either right-to-left or left-to-right.

## Architect
The flag only describes direction of the characters in a stored signature, in an image or .ink file. Code that renders or compares signatures must read it to draw them correctly.
