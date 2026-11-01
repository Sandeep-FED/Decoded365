# Decoded365 — Business Requirements Document

*A free, open-source, AI-navigable glossary for SharePoint, Power Platform and Microsoft 365 Copilot*

| | |
|---|---|
| **Owner** | Sandeep P S |
| **Status** | Draft v0.6 — renamed to Decoded365; version 1 limited to SharePoint with every feature kept; Power Platform (v1.1) and Copilot (v1.2) follow |
| **Date** | 1 November 2026 |
| **Name** | Decoded365 — a community glossary for Microsoft 365: SharePoint, Power Platform and Copilot. Community project, not affiliated with Microsoft |
| **Mockup** | `glossary-mockup.html` (shadcn/ui-style SharePoint term page: level switch, retirement status, related-terms map, name history and on-device Ask) |

---

## 1. Executive Summary

Decoded365 is a free, public website that explains the vocabulary of SharePoint, Power Platform and Microsoft 365 Copilot in one place. It is a **consolidated** glossary: it gathers the terms from the existing SharePoint, Power Platform and Copilot glossaries, merges duplicates and renamed names into one entry each, and rewrites every entry at three depths (Beginner, Maker, Architect). Entries are self-contained — they contain **no hyperlinks to other sites** — and sources are credited in plain text.

**Version 1 covers SharePoint only.** It is built from the Microsoft Learn SharePoint glossary and the SharePoint terms in the PnP Microsoft 365 Glossary, and ships with every feature (three levels, smart search, related-terms map, rename and retirement history, on-device Ask, contributions). Power Platform (v1.1) and Copilot (v1.2) are then added as new content and import scripts, without changing the site.

Terms are linked to each other in a visual map and are searchable by meaning, not just spelling. Visitors can also ask a plain-English question ("What's the difference between a Dataverse table and a SharePoint list?") and get a short answer built only from glossary entries, with links to the Decoded365 entries it used.

The project is **100% free and open source**:

- all code (MIT) and content (CC BY 4.0) are open, in a public repository anyone can contribute to;
- every library, AI model and tool it depends on is under an OSI-approved open-source licence, checked automatically in CI;
- it costs nothing to run: the site is static, hosted for free, and **all AI runs either at build time on free CI or in the visitor's own browser**. There is no server, no API key and no paid AI service.

**Recommended platform:** public GitHub repository + static Astro site using **shadcn/ui** components, hosted on GitHub Pages, with in-browser AI (Transformers.js for meaning-based search, WebLLM for Ask). All TypeScript.

## 2. Problem Statement

- Microsoft's vocabulary across these three product families is large, overlapping and frequently renamed (Flow → Power Automate, Common Data Service → Dataverse, Power Virtual Agents → Copilot Studio). Newcomers can't tell which name is current.
- Definitions are scattered across many Microsoft Learn pages, community glossaries and blogs, each written for one audience. Readers jump between sites and piece the meaning together.
- A business user and an architect need very different explanations of the same term; existing glossaries offer one.
- Existing glossaries are flat A–Z lists. They don't show how terms connect (a model-driven app *requires* Dataverse; an agent *uses* knowledge sources), and they only match exact words.
- Community knowledge is rich but has no shared, reviewed, openly licensed home that anyone can improve.

## 3. Goals & Success Metrics

| Goal | Metric | Target (6 months after launch) |
|---|---|---|
| Most complete SharePoint glossary (v1) | Terms from the two SharePoint source glossaries published, merged or rejected with a reason | 100% |
| Grow to all three product families | Product families covered | SharePoint at v1; Power Platform at v1.1; Copilot at v1.2 |
| Serve every level | Terms with all three levels written | ≥ 90% |
| Fast findability | Correct term in top 5 for the 50-question search test set | ≥ 80% |
| Trustworthy AI answers | Ask eval set: answers citing ≥ 1 entry / refusing when not covered | 100% / ≥ 95% |
| Healthy community | External contributors with a merged PR | 25+ |
| Freshness | Terms reviewed in the last 12 months | ≥ 85% |
| Truly free and open | Monthly running cost / non-open-source dependencies | US$0 / 0 |

Decoded365 has no visitor tracking, so usage is measured through the evaluation sets, contributions and issues rather than analytics.

## 4. Stakeholders & Personas

| Persona | Who | What they need |
|---|---|---|
| **Newcomer** (Beginner level) | Business user, new M365 admin, student | One-sentence, jargon-free meaning; an everyday analogy |
| **Maker** (Maker level) | Power Platform maker, SharePoint power user, citizen developer | When to use it, limits, how it fits with other tools |
| **Builder** (Architect level) | Developer, solution architect, consultant | APIs, licensing implications, ALM, security model, gotchas |
| **Contributor** | Community member, MVP, trainer | Clear template, quick review, credit for their work |
| **Maintainer** | Sandeep + area reviewers | Low-effort moderation, automated checks, freshness alerts |

Stakeholders: Sandeep P S (owner, final approver); area reviewers for SharePoint, Power Platform and Copilot `[confirm: names]`.

## 5. Use Cases

**Day-one must-work use case: UC-1.**

1. **UC-1 — Look up a term at my level.** As a newcomer, I want to open a term and read it at Beginner level so that I understand it without other jargon.
   - *Trigger:* search, A–Z browse, or a link from another site.
   - *Flow:* open term → default level shown (last used, else Beginner) → switch level → read aliases, status and rename history.
   - *Acceptance:* the level switch updates the text without a page reload; the choice is remembered; every term shows product, status (GA / Preview / Retired) and last-reviewed date; the entry is self-contained, with no links to other sites.
2. **UC-2 — Find a term when I don't know its name.** As a maker, I want to type what I mean ("where do deleted files go before they're gone for good") so that I land on the right term (first-stage and second-stage Recycle Bin).
   - *Acceptance:* results mix keyword and meaning matches; the correct term is in the top 5 for ≥ 80% of a 50-question test set; keyword results appear instantly; meaning-based results work after a one-time small model download.
3. **UC-3 — Ask a question across terms.** As a builder, I want to ask "Can I still use SharePoint Add-ins in SharePoint Online?" so that I get a short answer built from the glossary.
   - *Acceptance:* the answer cites the Decoded365 entries it used; it answers only from glossary content and says so when it can't; it respects the selected level; it runs on the visitor's device; questions about products not covered yet get a clear "not covered yet" reply. Where the device can't run the model, the visitor still gets the most relevant entries as a fallback.
4. **UC-4 — Explore how concepts connect.** As a learner, I want to see a term's neighbours on a map so that I understand the bigger picture.
   - *Acceptance:* each term page shows a 1-hop map; links are typed (part of, requires, used by, alternative to, often confused with, replaced by); a full-site map is filterable by product; the map is keyboard-usable and has a list fallback.
5. **UC-5 — Know whether a name is current.** As a consultant, I want to see renames and retirements so that I use today's name with clients.
   - *Acceptance:* searching an old name (e.g. "app for SharePoint" or "Office Store") opens the current term with a rename timeline; renames that were later reversed are shown in order; retired features show the retirement date, where it applies, and what replaces them.
6. **UC-6 — Contribute a term.** As a contributor, I want a template and automatic checks so that my pull request is accepted quickly.
   - *Acceptance:* a "Suggest a term" issue form and an "Edit this term" action exist; CI validates the file format, blocks external hyperlinks inside entries, flags duplicates and posts a preview link on the pull request.
7. **UC-7 — Keep content fresh.** As a maintainer, I want stale terms and changed sources flagged so that the glossary stays accurate.
   - *Acceptance:* a weekly job opens an issue listing terms not reviewed in 12 months; the monthly re-import opens an issue when a source definition changes.
8. **UC-8 — Consolidate the source glossaries.** As a maintainer, I want every term from the source glossaries imported, filtered to scope and merged so that Decoded365 starts as the most complete glossary in its area.
   - *Flow:* import each source → drop out-of-scope products → merge duplicates and renamed names → draft three levels → open review pull requests in batches.
   - *Acceptance:* every in-scope source term is published, merged into another entry, or rejected with a recorded reason.
9. **UC-9 — Use Decoded365 from other tools (later).** As an M365 builder, I want the glossary as open data (a JSON file published with the site) so that my own agent or app can look up terms.

## 6. Features & Requirements

| Feature | Use case | Priority | Effort |
|---|---|---|---|
| F1. Term entries as Markdown with a validated schema (aliases, product, status, 3 levels, typed relations, provenance, review date) | UC-1, UC-6 | Must | M |
| F2. Term page with Beginner / Maker / Architect switch (remembered per visitor) | UC-1 | Must | S |
| F3. A–Z browse and product filters (SharePoint, Power Platform, Copilot) | UC-1 | Must | S |
| F4. Smart search: hybrid keyword + meaning, alias- and old-name-aware, in the browser | UC-2, UC-5 | Must | M |
| F5. Related-terms map: 1-hop map on every term + full explorer | UC-4 | Must | M |
| F6. Rename / retirement timeline and status badges | UC-5 | Must | S |
| F19. "Applies to" (SharePoint Online / SharePoint Server) and legacy labels, with a switch to show or hide legacy terms | UC-1, UC-5 | Must | S |
| F7. Contribution workflow: template, issue forms, CI checks, preview deploys, CODEOWNERS | UC-6 | Must | M |
| F8. Source import and merge pipeline (harvest, scope filter, dedupe, draft levels, review batches) | UC-8 | Must | L |
| F9. shadcn/ui component library and theme (light/dark, product colours) | UC-1–UC-4 | Must | M |
| F10. Ask in plain English, on-device (grounded answers with citations, streaming, fallback) | UC-3 | Must | L |
| F11. Open-source licence gate in CI (fails on any non-OSI dependency or model) | — | Must | S |
| F12. "Often confused with" side-by-side comparison cards | UC-3, UC-4 | Should | S |
| F13. AI-suggested related terms during build (human approves in PR) | UC-4, UC-6 | Should | M |
| F14. Freshness bot (stale-term issues; source-change watch) | UC-7 | Should | S |
| F15. Credits & licences page and per-entry plain-text credit | UC-8 | Should | S |
| F16. Glossary published as open JSON data with each build | UC-9 | Could | S |
| F17. AI contributor helper run locally (drafts levels, spots duplicates) | UC-6 | Could | M |
| F18. Multilingual entries | — | Could (v2) | L |

**Version 1 scope:** every Must and Should feature above ships in v1, applied to SharePoint content only. The product dimension (`product` field, filters, map colours, Ask scope) is built from the start, so Power Platform and Copilot slot in later without redesign.

**Non-functional requirements**

- **Free and open:** no paid services, API keys or servers; every dependency, model and font under an OSI-approved licence (fonts under the SIL Open Font License); CI enforces this.
- **Performance:** Lighthouse performance ≥ 90 on mobile; term pages work fully without JavaScript (the level switch falls back to showing all three levels). AI models download only when a visitor first uses a feature that needs them.
- **Accessibility:** WCAG 2.2 AA; the map has a list alternative; visible keyboard focus; reduced motion respected; axe checks in CI.
- **No outbound links in entries:** term bodies, levels and Ask answers contain no external hyperlinks. Links between Decoded365 terms are allowed.
- **Trust:** every entry records where its content came from (plain-text provenance, never a link); AI-drafted text is reviewed by a person before merge; Ask never answers from outside the glossary.
- **Privacy:** no accounts, cookies-free, no analytics or tracking; Ask questions never leave the visitor's device.
- **Licensing:** content CC BY 4.0, code MIT. Text is adapted only from sources whose licence allows it (Microsoft documentation repositories are published under CC BY 4.0), with plain-text credit; other sources contribute term names and facts only.

## 7. Solution Architecture

### Platform comparison

| Option | Free & open source | Public & open to contributors | AI cost | Verdict |
|---|---|---|---|---|
| **Static site + in-browser AI** (GitHub repo, GitHub Pages, Transformers.js, WebLLM) | Yes — all code and models open; hosting free | Yes — pull requests, reviews, history | US$0: runs on build CI and visitors' devices | **Recommended** |
| Static site + serverless Ask calling a hosted LLM | Code open, but the LLM API is paid and usually proprietary | Yes | Ongoing per-question cost; needs keys, rate limits, bot checks | Doesn't meet "100% free" |
| Custom web app with database and in-site editor | Possible, but needs a paid server | Yes, but you build moderation and spam control | Server + AI cost | Overkill |
| SharePoint site or Copilot agent | No — needs Microsoft 365 licences | Not open to the public | Licensed | Doesn't meet the brief |

**A note on "open source" hosting:** GitHub and GitHub Pages are free for public projects but are not themselves open-source software. If the project wants an open-source forge too, **Codeberg** (running Forgejo) with Codeberg Pages is the alternative; the site builds the same way. `[confirm: GitHub or Codeberg]`

### Architecture overview

```text
 Source glossaries ──import, filter, merge, draft (local, open models)──► review PRs
 Contributors ─────────────────────────────────────────────────────PR──► Git repo
                                                     (content/*.md, sources.yml, schema)
                           │
                    CI on free runners (on PR and on merge)
                    ├─ validate schema (Zod), no external links, duplicates
                    ├─ licence gate: every dependency and model OSI-approved
                    ├─ build graph.json from typed relations
                    ├─ embed each term/level (Transformers.js) ──► vectors.json
                    └─ astro build ──► static site + search index + glossary.json
                           │
                 GitHub Pages (free static hosting)  [or Codeberg Pages]
                           │
   Visitor's browser
   ├─ shadcn/ui term pages (Astro + React islands), level switch
   ├─ related-terms map (Cytoscape.js)
   ├─ hybrid search: Orama keyword index + query embedding (Transformers.js, Web Worker)
   └─ Ask: retrieve top entries ─► small open model via WebLLM (WebGPU, Web Worker)
          ─► streamed answer with Decoded365 citations
          (no WebGPU? ─► shows the best-matching entries instead)
```

There is no Decoded365 server at all. Model files are downloaded once by the visitor's browser and cached.

The visual mockup of the term page (level switch, map, rename timeline, on-device Ask) is in **`glossary-mockup.html`**.

## 8. Technical Approach

### 8.1 Content model

One file per term: `content/terms/<product>/<slug>.md`.

`content/terms/sharepoint/sharepoint-add-in.md`
```markdown
---
id: sharepoint-add-in
term: SharePoint Add-in
aliases: [SharePoint app, add-in]
product: sharepoint
category: development
status: retired             # ga | preview | legacy | retired
appliesTo: [sharepoint-server]
retired: { date: 2026-04-02, where: SharePoint Online, replacedBy: spfx }
renamed:
  - { from: app for SharePoint, to: SharePoint Add-in, date: null }   # date not stated in source
related:
  - { id: host-web, type: requires }
  - { id: app-web, type: part-of }
  - { id: app-part, type: part-of }
  - { id: app-catalog, type: used-by }
  - { id: spfx, type: replaced-by }
origins:                    # provenance only, never rendered as a link
  - { source: ms-sharepoint-glossary, use: adapted }
lastReviewed: 2026-11-01
reviewers: [sandeepps]
---

## Beginner
An older way to add extra features to SharePoint sites…

## Maker
Add-ins stopped working in SharePoint Online on 2 April 2026. Build new
extensions with the [[spfx]] instead…

## Architect
Ran in an isolated [[app-web]] or on an external host (provider-hosted)…
```

`src/schema/term.ts` (validated in CI and at build)
```ts
import { z } from "zod";

export const RelationType = z.enum([
  "part-of", "requires", "used-by", "alternative-to",
  "often-confused-with", "replaced-by",
]);

export const Term = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  term: z.string().min(2),
  aliases: z.array(z.string()).default([]),
  product: z.enum(["sharepoint", "power-platform", "copilot", "cross-platform"]),
  category: z.string(),
  status: z.enum(["ga", "preview", "legacy", "retired"]),
  appliesTo: z.array(z.enum(["sharepoint-online", "sharepoint-server"])).optional(),
  retired: z.object({
    date: z.string(), where: z.string(), replacedBy: z.string().optional(),
  }).optional(),
  renamed: z.array(z.object({
    from: z.string(), to: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}$/).nullable(),   // null when the source gives no date
  })).default([]),                                   // ordered; supports reversals
  related: z.array(z.object({ id: z.string(), type: RelationType })).default([]),
  origins: z.array(z.object({
    source: z.string(),                              // key in content/sources.yml
    use: z.enum(["adapted", "terms-only", "facts-only"]),
  })).min(1),
  lastReviewed: z.coerce.date(),
  reviewers: z.array(z.string()).min(1),
});
```

- The three `## Beginner / ## Maker / ## Architect` headings are required; CI fails if one is missing (unless the entry is marked `levels: partial` during the content push).
- **Link rules (enforced in CI):** entry bodies may not contain `http://` or `https://` links or bare web addresses. Links to other Decoded365 terms are written `[[term-id]]` and rendered as internal links with a hover preview.
- **Source registry:** `content/sources.yml` holds each source's key, title, owner, licence and address. It is used by the importer and the Credits page only; addresses are never shown inside entries.

### 8.2 Site and shadcn/ui

- **Astro** (static output) with content collections that use the Zod schema above, plus the **React integration** and **Tailwind CSS v4**, so the UI is built from **shadcn/ui** components. Astro Starlight is not used because it ships its own component system.
- **Credits & licences page:** lists every source by name, owner and licence in plain text and states that entries were adapted. Each adapted entry also shows a one-line plain-text credit (see 8.6.2).
- **Related-terms map:** `graph.json` built from `related` fields, rendered with **Cytoscape.js**. The 1-hop map on term pages is a lightweight SVG; the full explorer loads on demand.

**How shadcn/ui is used.** shadcn/ui components are copied into the repo (`src/components/ui`) by its command-line tool, so the project owns and themes them. In Astro they run as **React islands**: static pieces (Badge, Card, Table) render to plain HTML with no JavaScript; interactive pieces hydrate with `client:load` or `client:visible`. Components made of several parts (Command, Dialog, HoverCard, ToggleGroup) are written inside one `.tsx` component and hydrated as a single island.

| UI element | shadcn/ui component(s) | Notes |
|---|---|---|
| Search and Ask bar (`/` or Ctrl/⌘ K) | Command (CommandDialog, CommandInput, CommandGroup, CommandItem) | Groups: Terms, Old names, Ask Decoded365 |
| Level switch (Beginner / Maker / Architect) | ToggleGroup (single) | Choice remembered; without JavaScript all three levels show |
| Product, status, alias and old-name chips | Badge | Variants per product colour and status |
| Breadcrumb (product / category / term) | Breadcrumb | |
| Term sections, map, rename history, Ask | Card, Separator | |
| Rename timeline | Card + ordered list; Accordion for long histories | Supports renamed-then-reverted |
| Hover preview of linked terms and Ask citations | HoverCard | Shows the Beginner line of the linked term |
| "Often confused with" comparison | Table | |
| A–Z and product filters | Tabs, ToggleGroup, ScrollArea | |
| Mobile navigation | Sheet | |
| Ask area | Card, Textarea, Button, Progress (model download), Skeleton (while generating), Alert ("not covered by the glossary") | Citations are internal links |
| Report an error / Suggest a term | Dialog → opens a prefilled issue in the repository | Site-level action, not part of entry content |
| Feedback on an answer | Button (ghost, icon) + Sonner toast | Opens a prefilled issue; nothing is tracked |
| Show legacy and SharePoint Server-only terms | Switch | Off by default `[confirm]`; legacy entries still open from search and links |
| Theme switch | DropdownMenu + CSS variables | Light/dark; product colours as extra tokens (`--sharepoint`, `--power-platform`, `--copilot`) |
| Map node labels | Tooltip | |

Accessibility comes largely from the primitives shadcn/ui is built on (keyboard support, focus management, ARIA roles); the project still runs axe checks in CI. Fonts are open-licensed (for example Geist or Inter, both under the SIL Open Font License) and self-hosted.

### 8.3 Smart search (free, in the browser)

- **Chunks:** one chunk per term per level, plus aliases and old names (≈ 300 terms × 3 levels ≈ 900–1,000 chunks).
- **Embeddings at build time** with a small open model run through **Transformers.js** on free CI runners — no API cost. Candidate models: `all-MiniLM-L6-v2` (Apache-2.0) or `bge-small-en-v1.5` (MIT) `[confirm in spike S1]`.
- **Hybrid search in the browser** with **Orama** (Apache-2.0): keyword results appear instantly; the same small embedding model is loaded in a Web Worker on first search to embed the visitor's query, then cached.
- Old names and aliases are indexed so "Flow" or "PVA" lands on the current term.

### 8.4 Ask in plain English — on-device, no server

The Ask feature runs entirely in the visitor's browser, so it costs nothing to operate and questions never leave the device.

| Approach | Cost | Open source | Fit |
|---|---|---|---|
| **WebLLM** (Apache-2.0) running a small open model on WebGPU, with Orama retrieval | US$0 | Yes | **Recommended** |
| Transformers.js text generation (Apache-2.0) | US$0 | Yes | Fallback runtime; slower for chat-style answers |
| LangChain.js (MIT) orchestrating the above | US$0 | Yes | Optional later, if Ask becomes multi-step (e.g. "compare A vs B" → fetch both → table). Not needed for v1 |
| Hosted LLM API (OpenAI, Azure OpenAI, Groq, etc.) | Paid per use | Service is proprietary | Rejected: not free |

**Model choice.** Only models under an OSI-approved licence are allowed (for example Apache-2.0 or MIT). Candidates to test: Phi-3.5-mini-instruct (MIT), SmolLM2-1.7B-Instruct (Apache-2.0), Qwen2.5-1.5B-Instruct (Apache-2.0) `[confirm licence and WebLLM availability in spike S2]`. Models under custom licences (for example Llama's community licence) are excluded because they aren't OSI-approved.

**Ask flow**
1. Visitor opens Ask. If the model isn't cached, a card explains the one-time download (size shown, roughly 1–2 GB for a small model `[confirm in spike S2]`) and asks for consent.
2. Retrieve the top 6–8 chunks with hybrid search, always including whole entries for any term named in the question.
3. Prompt: "Answer only from the entries below, at {level} depth, in ≤ 150 words; cite entries as [term-id]; if the entries don't cover it, say so and suggest the closest terms."
4. Stream the answer from WebLLM running in a Web Worker; the page turns `[term-id]` into internal links with hover previews.
5. **Fallback** (no WebGPU, low memory, or the visitor declines the download): show the 3 best-matching entries at the selected level as the answer, with no generated text.

**Quality.** Small on-device models are less capable than large hosted ones, so answers are kept short, tightly grounded and always cited. A versioned evaluation set of 50–100 questions is run in CI (headless browser) when prompts or models change: retrieval hit rate, citation rate, and refusal when the glossary doesn't cover a question.

### 8.5 Contribution pipeline

- `CONTRIBUTING.md`, term template, style guide (plain English, one analogy at Beginner level, no external links).
- Issue forms: *Suggest a term*, *Report an error*, *Term renamed/retired*.
- CI on every PR: schema check, duplicate/alias check, external-link blocker, similarity check against sources that may not be copied, open-source licence gate, spelling, preview deploy link; the embedding job comments "possible related terms" and "possible duplicate of …".
- `CODEOWNERS` per product folder so the right reviewer is requested automatically.
- DCO sign-off; contributors credited on each term page.
- Imported entries arrive as PRs labelled `import`, batched by product and letter, so contributors can pick a batch to review and rewrite.

### 8.6 Source glossaries to consolidate

**Release plan for sources**

| Release | Sources imported |
|---|---|
| **v1 — SharePoint** | Microsoft Learn SharePoint glossary; SharePoint terms from the PnP Microsoft 365 Glossary; SharePoint-related renames and retirements |
| **v1.1 — Power Platform** | Model-driven app glossary; Dataverse terminology; Power Automate pages; Power Platform renames |
| **v1.2 — Copilot** | Copilot Studio and Microsoft 365 Copilot key terms; agents overview; Copilot renames; community glossaries for coverage checks |

**What the v1 sources look like.** The Microsoft Learn SharePoint glossary was last updated in March 2023 and is written for developers. Most of its entries are SharePoint Server-era or internal terms (search crawling and FAST Search, farm solutions, site definitions, classic workflows, add-ins). It also notes that SharePoint Add-ins reached end of life in SharePoint Online on 2 April 2026. Modern, everyday SharePoint terms (hub site, communication site, home site, column formatting, SharePoint Framework extensions, app bar) come mainly from the PnP glossary. This is why v1 adds "applies to" and legacy labels and a switch to hide legacy terms.

Decoded365's starting content is consolidated from the glossaries below. Scope is limited to SharePoint, Power Platform and Copilot, so glossaries for other products (for example Microsoft Fabric) are excluded, and out-of-scope terms inside broad glossaries (Defender, Intune, Entra, Exchange, licence SKUs) are filtered out.

Addresses are listed here for maintainers and live only in `content/sources.yml`; they are never shown inside glossary entries.

| Source | Owner | Licence | How it's used |
|---|---|---|---|
| SharePoint glossary — learn.microsoft.com/en-us/sharepoint/dev/general-development/sharepoint-glossary | Microsoft | CC BY 4.0 (sp-dev-docs repository, confirmed) | v1: import all terms; adapt definitions; tag legacy and server-only terms |
| Microsoft 365 Glossary (PnP community docs) — pnp.github.io/community-docs/articles/glossary.html | Microsoft 365 & Power Platform Community (PnP) | `[confirm: repo licence]` | v1: import SharePoint terms (v1.1/v1.2: Power Platform and Copilot terms); adapt text only if the licence allows, otherwise terms and facts only |
| Model-driven app glossary of terms — learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/model-driven-app-glossary | Microsoft | CC BY 4.0 (powerapps-docs repository) | Import all terms; adapt definitions |
| Developers: Understand terminology in Microsoft Dataverse — learn.microsoft.com/en-us/power-apps/developer/data-platform/understand-terminology | Microsoft | CC BY 4.0 (powerapps-docs repository) | Screen-name vs developer-name mapping feeds `aliases` and the Architect level |
| Power Automate: Actions; Actions reference (desktop flows); reference architectures | Microsoft | CC BY 4.0 `[confirm: repo licence]` | No glossary exists: extract the terms, write definitions |
| Application Card for Microsoft Copilot Studio — Key terms | Microsoft | `[confirm: repo licence]` | Import key terms; adapt if the licence allows |
| Microsoft Copilot glossary — learn.microsoft.com/th-th/copilot/glossary (English text) | Microsoft | `[confirm: repo licence]` | Import; several entries are dated and need updating |
| Application card: Microsoft Copilot (for organizations) — Key terms | Microsoft | `[confirm: repo licence]` | Import key terms |
| Compare declarative and custom engine agents | Microsoft | CC BY 4.0 (m365copilot-docs repository) | Agent vocabulary; adapt definitions |
| Copilot Reporting Glossary (Analytics Hub) — microsoft.github.io/Analytics-Hub/glossary/ | Microsoft (GitHub project) | `[confirm: repo licence]` | Adoption and reporting terms; terms only until the licence is confirmed |
| ExperTrain Microsoft Copilot Glossary | ExperTrain | Not openly licensed (assume all rights reserved) | Term names and coverage check only; definitions written fresh |
| Copilot knowledge base | copilotexpert.nl | Not openly licensed (assume all rights reserved) | Term names and coverage check only; definitions written fresh |
| Product Name Changes — m365maps.com/renames.htm | Aaron Dinnage | Not stated | Rename history (see 8.7) |

Where possible, the importer reads Markdown directly from Microsoft's public documentation repositories (for example `MicrosoftDocs/powerapps-docs`, `MicrosoftDocs/power-platform`, `MicrosoftDocs/m365copilot-docs`) instead of scraping web pages `[confirm exact file paths]`.

#### 8.6.1 Import and merge pipeline

1. **Harvest** — one script per source (`scripts/import/<source>.ts`) turns it into records: term, definition, source key, licence.
2. **Scope filter** — keep SharePoint, Power Platform and Copilot; drop everything else using a product keyword list plus a manual allow/deny list.
3. **Normalise and dedupe** — match records by name, aliases, the rename table (8.7) and embedding similarity, so "Flow (Power Automate)", "Microsoft Flow" and "Power Automate" become one concept.
4. **Merge** — one draft per concept in `drafts/` (not published), with all source definitions side by side.
5. **Draft three levels** — an open model run locally by the maintainer (for example through **Ollama**, MIT-licensed, with an Apache-2.0 or MIT model) drafts Beginner, Maker and Architect text from the merged material. No paid AI service is used. CC BY 4.0 text may be adapted; other text is used for facts only, and a similarity check flags drafts that stay too close to it.
6. **Human review** — drafts become PRs labelled `import`, batched by product and letter; reviewers fix, approve, or reject with a reason.
7. **Re-run monthly** — the importer compares against the last run and opens a "source changed" issue when a source definition changes.

#### 8.6.2 Attribution without hyperlinks

CC BY 4.0 requires credit to the creator, a licence notice and an indication that changes were made. Decoded365 meets this without links in entries:

- each adapted entry shows one plain-text line, for example "Adapted from Microsoft documentation, licensed CC BY 4.0. Changes made.";
- a site-wide **Credits & licences** page lists every source, owner and licence;
- a `NOTICE` file in the repository holds the full references.

### 8.7 Rename data

The primary source for the `renamed` field is **Product Name Changes** (m365maps.com/renames.htm), maintained by Aaron Dinnage. Each entry on that page lists the previous name, new name and effective date, with references to the announcement and product page.

Renames on that page that fall within Decoded365's scope:

| Previous name | New name | Date |
|---|---|---|
| Microsoft Flow | Power Automate | Nov 2019 |
| Common Data Service | Dataverse | Nov 2020 |
| Power Virtual Agents for Teams | Copilot Studio for Teams | Nov 2023 |
| Microsoft 365 Copilot | Copilot for Microsoft 365 | Nov 2023 |
| Syntex Backup | Microsoft 365 Backup | Jul 2023 |
| Syntex Archiving | Microsoft 365 Archiving | Jul 2023 |
| Copilot for Microsoft 365 | Microsoft 365 Copilot | Aug 2024 |
| Microsoft Copilot with Commercial Data Protection | Microsoft Copilot with Enterprise Data Protection | Aug 2024 |
| Microsoft Copilot with Enterprise Data Protection | Microsoft 365 Copilot Chat | Dec 2024 |
| Microsoft 365 App | Microsoft 365 Copilot App | Dec 2024 |
| Copilot for Finance | Finance Agents | Apr 2025 |
| Microsoft Syntex & SharePoint Premium | Document Processing for Microsoft 365 | Jul 2025 |
| Agent Builder | Copilot Studio Lite | Sep 2025 |
| OneDrive for Business | OneDrive | Oct 2025 |
| Copilot Studio Lite | Agent Builder | Nov 2025 |
| Project Manager Agent | Planner Agent | Mar 2026 |
| Microsoft 365 Copilot Chat | Microsoft 365 Copilot (Basic) | Apr 2026 |
| Microsoft 365 Copilot | Microsoft 365 Copilot (Premium) | Apr 2026 |

**Used in v1 (SharePoint):** app for SharePoint → SharePoint Add-in and Office Store → AppSource (both stated in the SharePoint glossary itself, without dates); OneDrive for Business → OneDrive (Oct 2025); Microsoft Syntex & SharePoint Premium → Document Processing for Microsoft 365 (Jul 2025); Syntex Backup → Microsoft 365 Backup and Syntex Archiving → Microsoft 365 Archiving (Jul 2023); and the retirement of SharePoint Add-ins in SharePoint Online on 2 April 2026. The other renames are added with their product in v1.1 and v1.2.

**Design implications**

- A product can be renamed several times, and a rename can be reversed (Agent Builder → Copilot Studio Lite → Agent Builder). The `renamed` field stores an ordered list, shown as a timeline.
- The same name can mean different products at different times ("Microsoft 365 Copilot" in 2023, 2024 and 2026). Search shows the date context when an old name is matched.

**Gaps to fill from other sources** (each verified against a Microsoft announcement before it is added): Power Virtual Agents → Copilot Studio (the main product); Power Apps portals → Power Pages; Dataverse terminology change (entity / field / record → table / column / row); other feature-level renames found during the content push.

Renames outside scope (Purview, Defender, Entra, Intune, Viva, Windows 365) are excluded.

**Reuse:** the m365maps page doesn't state any licence or reuse terms. Decoded365 credits it in plain text on the Credits page; bulk import of its data needs the author's permission (see Open Questions).

### 8.8 Open-source stack and licence gate

Every runtime and build dependency must be under an OSI-approved licence. A licence-check step in CI reads the dependency tree and the model registry and fails the build on anything else. Licences below are to be confirmed by that check `[confirm]`.

| Purpose | Choice | Licence |
|---|---|---|
| Site framework | Astro | MIT |
| UI runtime | React | MIT |
| Styling | Tailwind CSS v4 | MIT |
| Components | shadcn/ui (and the primitives it installs, e.g. cmdk, Sonner) | MIT |
| Icons | Lucide | ISC |
| Schema validation | Zod | MIT |
| Search | Orama | Apache-2.0 |
| Embeddings and in-browser ML | Transformers.js | Apache-2.0 |
| On-device chat model runtime | WebLLM | Apache-2.0 |
| Graph map | Cytoscape.js | MIT |
| Local drafting for maintainers | Ollama | MIT |
| Accessibility tests | axe-core | MPL-2.0 |
| Fonts | Geist or Inter | SIL Open Font License |
| AI models | e.g. all-MiniLM-L6-v2, bge-small-en-v1.5, Phi-3.5-mini, SmolLM2, Qwen2.5-1.5B | Apache-2.0 / MIT `[confirm per model]` |

## 9. Delivery Plan & Phases

Version 1 ships every feature on SharePoint content only, which keeps the content push small enough to test the whole approach end to end. The Microsoft Learn SharePoint glossary alone has well over 200 entries, so v1 still means several hundred level texts to review. Power Platform and Copilot then reuse the same site, pipeline and checks.

| Phase | Weeks `[confirm pace]` | Outcome |
|---|---|---|
| **0. Foundation** | 1–2 | Repo, schema, CI checks (incl. licence gate), importer for the two SharePoint sources, Astro + shadcn/ui skeleton on GitHub Pages |
| **1. Core site** | 3–5 | Term pages, level switch, A–Z, filters, legacy switch, rename and retirement timeline, keyword search, Credits page |
| **2. AI navigation** | 6–8 | Build-time embeddings, in-browser hybrid search, 1-hop maps + full explorer, suggested relations |
| **3. Ask** | 9–10 | On-device Ask with WebLLM, fallback, citations, SharePoint eval set in CI |
| **4. SharePoint content review & beta** | 3–10 (parallel) | Every SharePoint source term reviewed and written at three levels; invited contributors; beta feedback |
| **5. v1 public launch — SharePoint** | 11 | Announcement, contributor guide, good-first-issue list |
| **v1.1 — Power Platform** | after v1 `[confirm]` | New import scripts and content; Power Platform renames; eval questions added. No site redesign |
| **v1.2 — Copilot** | after v1.1 `[confirm]` | New import scripts and content; Copilot renames; eval questions added |
| **Later (v2)** | — | Local AI contributor helper, open JSON data, multilingual |

**Build steps**

1. Create the public repository with MIT (code) + CC BY 4.0 (content) licences, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `NOTICE`.
2. Scaffold the site with Astro, React, Tailwind CSS v4 and shadcn/ui:
   ```bash
   pnpm dlx shadcn@latest init -t astro
   pnpm dlx shadcn@latest add button badge card command toggle-group hover-card breadcrumb accordion table tabs sheet scroll-area separator tooltip skeleton progress sonner dialog dropdown-menu textarea alert switch
   pnpm add zod @orama/orama cytoscape @huggingface/transformers @mlc-ai/web-llm
   ```
   `[confirm package names during spikes S1 and S2]`
3. Add the content collection with the `Term` schema and `content/sources.yml`; build the importer (8.6.1), run it on every source, and open the first review batches. Run it on the two SharePoint sources and finish 30 fully reviewed SharePoint seed terms.
4. Add CI workflows: `validate.yml` (schema, external-link blocker, similarity check, duplicates, licence gate) and `deploy.yml` (build + deploy to GitHub Pages, PR previews).
5. Build the term page from shadcn/ui components (8.2): level switch, A–Z and product filters, rename timeline, hover previews, Credits & licences page.
6. Add `scripts/embed.ts` (Transformers.js) to produce `vectors.json`, and `scripts/graph.ts` to produce `graph.json`.
7. Wire Orama hybrid search and the Command search/Ask bar, with query embedding in a Web Worker.
8. Add the 1-hop SVG map and the Cytoscape.js explorer page.
9. Build on-device Ask: WebLLM in a Web Worker, download consent and progress, retrieval, prompt, streaming, citations, fallback.
10. Create the evaluation sets and the CI job; tune chunking, prompts and model choice.
11. Recruit area reviewers, open good-first-issues for the content push, run the beta.
12. Launch.

**Spikes before Phase 2**

- **S1:** in-browser query embedding — download size and speed on mid-range phones; pick the embedding model.
- **S2:** on-device Ask — compare candidate open models in WebLLM for answer quality on the eval set, download size and speed; confirm licences.
- **S3:** hosting — GitHub Pages vs Codeberg Pages; confirm that model files can be served or fetched free of charge.

## 10. Dependencies & Permissions

| Dependency | Owner | Cost | Notes |
|---|---|---|---|
| Public repository, branch protection, CI minutes | Sandeep | Free for public repos | GitHub or Codeberg `[confirm]` |
| Static hosting | Sandeep | Free | GitHub Pages; free address `<account>.github.io/decoded365` |
| Custom domain | Sandeep | Optional, paid | Not required; the free address is the default |
| AI models | — | Free | Open-licensed models downloaded by CI and by visitors' browsers |
| Area reviewers (SharePoint, Power Platform, Copilot) | `[confirm: names]` | — | Approve PRs via CODEOWNERS |

No Microsoft 365 tenant permissions, admin consent, API keys or paid accounts are needed.

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Content volume (well over 200 SharePoint terms × 3 levels in v1) delays launch | High | Importer gives merged first drafts; `levels: partial` during beta; good-first-issue batches |
| Inaccurate or outdated definitions (Microsoft renames often) | High | Provenance recorded per entry; review date; monthly source-change watch; "Report an error" on every page |
| Copying text from sources whose licence doesn't allow it | High | Adapt only CC BY 4.0 (or similarly licensed) text, with plain-text credit; other sources give term names and facts only; similarity check in CI |
| AI answer makes things up | High | Answer only from retrieved entries; citations required; refuse when not covered; eval set in CI |
| The main v1 source is dated (last updated March 2023) and mostly developer/SharePoint Server terms | Medium | "Applies to" and legacy labels; legacy hidden by default; modern terms from the PnP glossary and contributors |
| Adding Power Platform and Copilot later forces rework | Low | Product dimension, schema, filters and Ask scope built in from v1; each new product is new content plus an import script |
| Small on-device models give weaker answers than hosted ones | Medium | Short, tightly grounded answers; strong retrieval; fallback to best-matching entries; re-evaluate models as better open ones appear |
| Many visitors' devices can't run on-device Ask (no WebGPU, low memory, mobile data) | Medium | Explicit download consent; fallback answer from search; Ask is optional, glossary works fully without it |
| A dependency or model changes to a non-open licence | Medium | Licence gate in CI; pin versions; keep an approved alternative for each AI component |
| Seed sources have unclear reuse terms (m365maps, PnP glossary) | Medium | Confirm licences before import; ask authors where none is stated |
| Merging joins two different concepts, or loses nuance | Medium | Merge proposals reviewed by a person; "distinct from" note when names are similar but meanings differ |
| Trademark / name confusion with Microsoft | Medium | Clear "community project, not affiliated with Microsoft" notice; no Microsoft logos |
| Spam or low-quality PRs | Medium | Templates, CI checks, CODEOWNERS review, branch protection |
| Maintainer burnout | Medium | Area reviewers, automation, clear "what we accept" policy |
| Without links, readers can't check an entry against Microsoft's docs | Low | Review date and plain-text provenance on every entry; "Report an error" |
| shadcn/ui islands add JavaScript and slow pages | Low | Static components render without JavaScript; hydrate only interactive islands; Lighthouse budget in CI |

## 12. Out of Scope (v1)

- Any paid service, server, API key or proprietary AI model.
- Reader accounts, comments, analytics or in-site editing (contributions go through the repository).
- External hyperlinks inside glossary entries (entries are self-contained; sources are credited in plain text).
- Licensing/pricing tables (change too often to keep accurate).
- Tutorials and how-to guides.
- Power Platform and Copilot content in v1 (planned for v1.1 and v1.2).
- Products outside SharePoint, Power Platform and Copilot at any stage (for example Microsoft Fabric, Defender, Intune).
- Languages other than English.

## 13. Open Questions & Assumptions

**Open questions**

1. Is the Decoded365 name free on GitHub, as a web address, and with no existing product of the same name? `[check before launch]`
2. GitHub or Codeberg for the repository and hosting?
3. Who will be the first area reviewers for each product family?
4. Will Microsoft 365 admin-centre and Teams terms be in scope, or only where they touch the three product families?
5. Any existing glossary content (blog posts, training notes) you own that can seed the first terms?
6. Should we contact Aaron Dinnage (m365maps.com) for permission to import the rename list, and invite him as a contributor or reviewer?
7. Should the PnP community be approached as a partner for the SharePoint section?
8. Licences still to confirm: PnP community docs (needed for v1); Power Automate, Copilot Studio and Microsoft Copilot docs repositories, and Analytics Hub (needed for v1.1 and v1.2). The SharePoint developer docs are confirmed as CC BY 4.0.
9. shadcn/ui theme: keep the default neutral palette, or define a Decoded365 brand palette?
10. Should legacy and SharePoint Server-only terms be hidden by default (recommended) or shown?

**Assumptions**

- The project, all its dependencies and all AI models are free and open source; running cost is US$0.
- Glossary entries contain no external hyperlinks; content is consolidated from the source glossaries, adapting text only where the licence allows and crediting sources in plain text.
- Links between Decoded365's own terms (related terms, hover previews, Ask citations) are allowed, as are site-level links for contributing.
- Version 1 covers SharePoint only, using the Microsoft Learn SharePoint glossary and the SharePoint terms in the PnP Microsoft 365 Glossary; all features ship in v1.
- The UI is built with shadcn/ui on Astro with React islands and Tailwind CSS v4.
- English only for v1. Readers are anonymous; no personal data is collected and nothing is tracked.
- The project is a community resource, not affiliated with or endorsed by Microsoft. The name avoids Microsoft trademarks; Microsoft is named only in the tagline, to describe what the glossary covers.
- A search of your Microsoft 365 content found no existing glossary specs or notes on this idea.
