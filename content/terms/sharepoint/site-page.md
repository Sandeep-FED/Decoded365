---
id: site-page
term: Site page
aliases: [modern page, SharePoint page]
product: sharepoint
category: content
status: ga
related:
  - { id: sharepoint-site, type: part-of }
  - { id: web-part, type: requires }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A site page is a web page inside a SharePoint site. You build it by adding sections and blocks of content, such as text, images and lists.

## Maker
You edit a page in the page editor, add sections and columns, and place [[web-part|web parts]] in them. Saving keeps a draft and publishing makes it visible. A [[news-post]] is a special kind of site page. Older wiki and web part pages still exist but are classic.

## Architect
Modern pages are items in the Site Pages library. Their layout is stored as canvas content that lists sections, columns and the web parts, with each web part's properties. Pages can be created and published through the SharePoint REST API and Microsoft Graph, and custom web parts built with the [[spfx]] appear in the same canvas.
