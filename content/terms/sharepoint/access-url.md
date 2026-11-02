---
id: access-url
term: Access URL
aliases: []
product: sharepoint
category: services
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: crawl-queue, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An access URL is the address the search robot uses to reach a file or page when it collects information for search.

## Maker
When search crawls content it needs an internal address for each item. That is the access URL, and it is not always the address people see in the search results. Keep the two apart when you troubleshoot why an item is missing.

## Architect
The access URL is the internal URL a crawler uses to identify and fetch an item. It can differ from the display URL shown to users, and the crawl log records results against the display URL. See [[crawl-log]].
