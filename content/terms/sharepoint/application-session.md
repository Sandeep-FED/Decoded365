---
id: application-session
term: Application session
aliases: []
product: sharepoint
category: development
status: ga
origins:
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-02
reviewers: [sandeepps]
---

## Beginner
An application session is the time an application is open: it starts when you open it and ends when you close it.

## Maker
The session starts when an application starts and ends when the application quits. Anything tied to the session, such as temporary state, lasts only for that period.

## Architect
Use the session as the lifetime boundary for state that should not outlive one run of the application. When the application quits the session ends, so do not rely on it for storage across runs.
