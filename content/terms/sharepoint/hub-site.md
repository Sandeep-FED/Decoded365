---
id: hub-site
term: Hub site
aliases: [hub]
product: sharepoint
category: sites
status: ga
appliesTo: [sharepoint-online]
related:
  - { id: home-site, type: often-confused-with }
  - { id: sharepoint-site, type: used-by }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A hub site links related SharePoint sites together so they feel like one connected area. Picture a department lobby with doors to several rooms: every room shares the same signs and style, and the news from all of them shows up in the lobby.

## Maker
A SharePoint admin registers a team or communication site as a hub, and other sites then join it. Joined sites share navigation and theme, and news and activity from them roll up on the hub. A site can belong to only one hub at a time. A hub is not the same as the [[home-site]], which is the single front door for the whole organisation.

## Architect
Hub association is a flat relationship, not a hierarchy, and it replaces deep subsite structures. Joining a hub does not change permissions: visitors only see content from associated sites that they already have access to, because search results are security trimmed. Hubs are registered and managed with admin tools such as the SharePoint admin center or PowerShell.
