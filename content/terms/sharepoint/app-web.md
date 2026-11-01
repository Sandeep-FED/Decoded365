---
id: app-web
term: App web
aliases: [add-in web]
product: sharepoint
category: development
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: host-web, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
An app web is a small, separate SharePoint site created for a SharePoint-hosted add-in. It keeps the add-in's own files and lists apart from the site the add-in was installed on.

## Maker
Each SharePoint-hosted [[sharepoint-add-in]] gets an app web on its own web address. It holds the add-in's pages, scripts and data, and it is removed when the add-in is uninstalled. The site where the add-in is installed is the [[host-web]].

## Architect
The app web lives on an isolated app domain, which is why browser security stops its scripts from calling the [[host-web]] directly. Cross-domain requests are used instead. Because the app web is a separate site, it has its own permissions, and add-in permissions are granted to the add-in rather than to its users.
