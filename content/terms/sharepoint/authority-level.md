---
id: authority-level
term: Authority level
aliases: []
product: sharepoint
category: services
status: ga
related:
  - { id: authoritative-page, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The authority level is a score that says how important a page is: 0 is the best.

## Maker
It is a floating-point number that marks a page as more relevant than others. The allowed values are 0, 1 or 2, and zero marks the most valuable [[authoritative-page]].

## Architect
The value is a floating-point number restricted to 0, 1 and 2. Lower is more authoritative, so 0 is the highest level and the page then ranks higher in search results.
