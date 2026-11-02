---
id: trusted-subsystem
term: Trusted subsystem
aliases: []
product: sharepoint
category: administration
status: ga
related:
  - { id: trusted-authentication, type: often-confused-with }
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
A trusted subsystem is a pair of servers that trust each other to do privileged jobs.

## Maker
It is a method of communication in which two-way trust is established between two server components. Each uses an account authorised to perform privileged actions such as retrieving files and settings.

## Architect
Each component talks to the other using an account that is authorised for privileged actions. Compare with [[trusted-authentication]].
