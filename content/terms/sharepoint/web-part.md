---
id: web-part
term: Web part
aliases: [webpart]
product: sharepoint
category: development
status: ga
related:
  - { id: spfx, type: used-by }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A web part is a building block you place on a SharePoint page, such as a text box, an image gallery, a news feed or a list of documents. You build a page by stacking web parts.

## Maker
On modern pages you add web parts from the plus button in the page editor. SharePoint ships many, for example News, Highlighted content and Quick links. Developers can add their own with the [[spfx]]. Older classic web parts belong to classic pages.

## Architect
Modern web parts are client-side components, built with the [[spfx]] and configured through a property pane. Classic web parts are server-side and are defined by Web Part Gallery entries and .webpart files, and they do not run on modern pages. Moving to modern means replacing them with modern or SPFx equivalents.
