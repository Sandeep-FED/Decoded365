---
id: crawl-log
term: Crawl log
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: access-url, type: used-by }
  - { id: crawl-queue, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The crawl log is the diary of the search robot, noting where it succeeded and where it ran into problems.

## Maker
It is a set of properties that gives information about the result of crawling a display URL. It includes whether the crawl was successful, the content source it belongs to, and the level, message, time and identifier for any errors.

## Architect
Use the log to troubleshoot why an item is missing from search. It records success or failure per display URL, the content source, and details of any error. See also [[crawl-queue]].
