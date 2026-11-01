---
id: farm-solution
term: Farm solution
aliases: [WSP, SharePoint solution package]
product: sharepoint
category: development
status: legacy
appliesTo: [sharepoint-server]
related:
  - { id: spfx, type: alternative-to }
  - { id: sharepoint-server, type: requires }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A farm solution is an old-style package of custom code that an administrator installs on the servers that run SharePoint, so it affects every site on those servers.

## Maker
Farm solutions only exist on SharePoint Server, which is installed in an organisation's own datacentre. They are not supported in SharePoint Online. Modern customisations are built with the [[spfx]] instead.

## Architect
A farm solution is a .wsp package deployed by a farm administrator and it runs full-trust server-side code inside the IIS worker process. A faulty solution can slow or destabilise the whole farm, which is why Microsoft steered customisation toward client-side models such as the [[spfx]].
