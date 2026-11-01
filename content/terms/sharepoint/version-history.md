---
id: version-history
term: Version history
aliases: [versioning, file versions, restore a previous version]
product: sharepoint
category: content
status: ga
related:
  - { id: document-library, type: used-by }
  - { id: sharepoint-list, type: used-by }
  - { id: recycle-bin, type: often-confused-with }
origins:
  - { source: pnp-m365-glossary, use: terms-only }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
Version history keeps earlier copies of a file or list item every time it is saved, so you can look back at changes or bring an older version back.

## Maker
In a [[document-library]] you open the version history of a file, see who changed it and when, and restore or view an earlier version. By default libraries keep major versions up to a limit that site owners and admins can change. Version history is for changes to something that still exists. A deleted item goes to the [[recycle-bin]] instead.

## Architect
Every saved version counts toward the site's storage, so unlimited versions of large files grow quickly. SharePoint can trim old versions automatically within the limits you set. Versioning is not a backup: it does not protect against the whole site or library being lost, which is what a service such as [[microsoft-365-backup]] is for.
