---
id: sharing-link
term: Sharing link
aliases: [share link, anyone link, secure link]
product: sharepoint
category: administration
status: ga
related:
  - { id: document-library, type: used-by }
  - { id: onedrive, type: used-by }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A sharing link is a web address you create to give someone access to a file or folder in SharePoint or OneDrive. The type of link decides who can use it.

## Maker
You can choose between a link that works for anyone, one for people in your organisation, one for people who already have access, and one for specific people. Links can allow viewing or editing, and may have an expiry date. Admins can switch off the types they do not want, for the whole organisation or for a single site.

## Architect
Creating a link adds a permission grant, backed by a hidden sharing-links group on the site. Many links on many items can therefore build up unique permissions and slow permission checks. Tenant and site sharing settings cap what users can create, and links can also be created with Microsoft Graph. Reviewing and expiring links is part of governance.
