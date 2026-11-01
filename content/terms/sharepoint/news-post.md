---
id: news-post
term: News post
aliases: [SharePoint news, news article]
product: sharepoint
category: content
status: ga
related:
  - { id: site-page, type: requires }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A news post is a page that shares an announcement or a story with the people who follow a site. It appears in news feeds and on the SharePoint start page.

## Maker
You create a news post from a site's home page or from the plus menu, write it like any [[site-page]], and publish it. The News web part collects posts and shows them on other pages, and posts can reach the intranet through a [[hub-site]] or the [[home-site]].

## Architect
A news post is a site page whose promoted state marks it as news, which is what the News web part and the roll-up queries look for. Because it is still a page in the Site Pages library, it follows the same permissions and publishing rules as any other page.
