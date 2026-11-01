---
id: home-site
term: Home site
aliases: [SharePoint home site, intranet home site]
product: sharepoint
category: sites
status: ga
appliesTo: [sharepoint-online]
related:
  - { id: communication-site, type: requires }
  - { id: hub-site, type: often-confused-with }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
The home site is the one SharePoint site that acts as your organisation's front door, the landing page for the company intranet. It is the site people reach first from the SharePoint start page and from Viva Connections.

## Maker
An organisation has at most one home site, and an admin chooses it. It has to be a [[communication-site]], and it is normally also set up as a [[hub-site]] so that news and navigation can flow to the other sites. It is the entry point of the intranet, not just another hub.

## Architect
Set at tenant level by an administrator, for example with the Set-SPOHomeSite cmdlet. One home site exists per tenant and it must be a modern communication site. It drives the Home experience in SharePoint and Viva Connections, so plan its navigation and audience targeting with the whole organisation in mind.
