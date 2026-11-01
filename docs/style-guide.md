# Style guide

Write for a busy person who has never seen the term before.

## The three levels

| Level | Reader | What to write |
|---|---|---|
| **Beginner** | Business user, new admin, student | One or two plain sentences and **one everyday analogy**. No jargon; if you must use another term, link it with `[[term-id]]`. |
| **Maker** | Power user, citizen developer | When to use it, limits, and how it fits with other tools. |
| **Architect** | Developer, consultant | APIs, security model, licensing implications, ALM, gotchas. |

## Rules

- **No external links.** Entries are self-contained. Do not write `http://`, `https://`, `www.` addresses or raw HTML links. CI blocks them.
- **Link to other terms** with `[[term-id]]` or `[[term-id|custom label]]`. The id must exist.
- **Use today's name** and record old names in `renamed`, with the date only when a source states it (`YYYY-MM`, or `null`).
- **Dates and numbers** must come from a source. If you are not sure, leave it out.
- **Plain English**, short sentences, UK or US spelling but be consistent within an entry.
- **Provenance**: list every source in `origins` as `adapted`, `facts-only` or `terms-only`. Only `adapted` copies wording, and only from sources whose licence allows it.
- **Do not paste** text from sources that are not openly licensed. Write it fresh.
- **Status**: `ga`, `preview`, `legacy` or `retired`. Retired terms need a `retired` block.
- **Applies to**: set `appliesTo` when a term exists only in SharePoint Online or only in SharePoint Server.

## Review

AI-drafted text must be read and corrected by a person before it is merged. Put your handle in `reviewers` and set `lastReviewed` to the day you checked it.
