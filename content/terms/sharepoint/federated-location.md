---
id: federated-location
term: Federated location
aliases: []
product: sharepoint
category: services
status: ga
related:
  - { id: federated-location-definition, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
review: drafted
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A federated location is another place that can answer a search, so you can ask more than one library at once.

## Maker
It is a source that returns a set of search results for a search query. The source can be a search service in the local farm or in another farm, or another search engine that complies with the OpenSearch protocol.

## Architect
Sources can be local, remote or third party as long as they are OpenSearch-compliant. The [[federated-location-definition]] holds the settings.
