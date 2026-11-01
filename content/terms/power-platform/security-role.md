---
id: security-role
term: "Security role"
aliases: ["Dataverse security role"]
product: power-platform
category: administration
status: ga
related:
  - { id: dataverse, type: part-of }
  - { id: sharepoint-groups, type: often-confused-with }
origins:
  - { source: ms-model-driven-glossary, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
A security role is a set of permissions, like a job badge that says which doors a person can open and what they can do inside.

## Maker
In Dataverse a role says what people can see and do, such as create, read, write, delete, update or append rows in a [[dataverse-table]]. People are placed in roles, often through security groups. Give people the smallest role that lets them do their job.

## Architect
Roles hold privileges per table at different access levels, and a person's effective access combines all of their roles. Roles belong to an [[environment]] and can be shipped in a [[solution]]. Compare them with SharePoint's [[sharepoint-groups]], which control access to sites rather than to data rows.
