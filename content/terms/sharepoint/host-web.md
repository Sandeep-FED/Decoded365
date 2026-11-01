---
id: host-web
term: Host web
aliases: [add-in host web]
product: sharepoint
category: development
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: app-web, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
The host web is the ordinary SharePoint site that an add-in is installed on. It is the place where the add-in's features show up.

## Maker
When you install a [[sharepoint-add-in]], it attaches to a host web. The add-in's own files live in a separate [[app-web]]. The add-in asks for permission to the host web when it is installed, and the site owner must agree to it.

## Architect
Add-in code reaches the host web with cross-domain calls that are given the SPHostUrl and SPAppWebUrl values. The permissions the add-in may use on the host web are declared in its manifest as app permission requests. Do not confuse it with the [[app-web]], which belongs to the add-in.
