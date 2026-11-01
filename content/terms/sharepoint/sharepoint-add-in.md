---
id: sharepoint-add-in
term: SharePoint Add-in
aliases: [SharePoint app, app for SharePoint, add-in]
product: sharepoint
category: development
status: retired
appliesTo: [sharepoint-server]
retired: { date: "2026-04-02", where: SharePoint Online, replacedBy: spfx }
renamed:
  - { from: app for SharePoint, to: SharePoint Add-in, date: null }
related:
  - { id: host-web, type: requires }
  - { id: app-web, type: part-of }
  - { id: app-catalog, type: used-by }
  - { id: spfx, type: replaced-by }
origins:
  - { source: ms-sharepoint-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
SharePoint Add-ins are an older way to give SharePoint sites extra features, using small apps installed on a site. In SharePoint Online they stopped working on 2 April 2026, and newer extras are built with the SharePoint Framework instead.

## Maker
Add-ins stopped working in SharePoint Online on 2 April 2026. Anything that still depends on one must be rebuilt, usually with the [[spfx]]. The model still exists for on-premises SharePoint Server. When you search an old name such as "app for SharePoint", this is the term you land on.

## Architect
An add-in runs in an isolated [[app-web]] (SharePoint-hosted) or on an external host (provider-hosted), and works against the [[host-web]] it is installed on. Their authentication relied on Azure Access Control Services, which is also being retired. Plan migrations by inventorying installed add-ins in the [[app-catalog]], then re-implementing each as a solution built with the [[spfx]] or as a service that uses Microsoft Graph.
