---
id: crawl-queue
term: Crawl queue
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: crawl-log, type: often-confused-with }
  - { id: start-address, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
The crawl queue is the to-do list of things the search robot will visit next.

## Maker
It is a data structure that stores the list of items to crawl next. It fills as the crawler discovers links from the [[start-address|start addresses]].

## Architect
The queue is a data structure that stores the list of items waiting to be crawled. It differs from the [[crawl-log]], which records outcomes of crawls that already happened.
