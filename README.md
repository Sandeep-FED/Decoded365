# Decoded365

A free, open-source glossary for **SharePoint, Power Platform and Microsoft 365 Copilot**. Every term is written at three depths (Beginner, Maker, Architect), linked to related terms, and searchable by name, old name or meaning.

The glossary covers **SharePoint**, **Power Platform** and **Copilot**, with SharePoint the most complete. More terms are added by pull request, and the three products share one site and one search.

> Decoded365 is a community project and is not affiliated with or endorsed by Microsoft.

## What it does

- **Three levels per term**, remembered per visitor; without JavaScript all three show.
- **A–Z browse** with live filter, product filter and a switch for legacy and Server-only terms.
- **Search** (`/` or Ctrl/⌘ K) that understands aliases and old names ("app for SharePoint" finds SharePoint Add-in).
- **Related terms**: a small diagram of each term's neighbours on its page.
- **Rename and retirement history** with dates.
- **Open data** at `/glossary.json`.
- **100% free to run**: static site, no server, no API keys, no tracking.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

Node 22.23.4 or newer is required (Astro 7).

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Validate content, then build the static site into `dist/` |
| `npm run validate` | Schema, required levels, `[[links]]`, relations, external links, duplicates |
| `npm test` | Unit tests (Vitest) |
| `npm run check` | Type check (`astro check`) |
| `npm run licenses` | Licence gate: every dependency and AI model must be OSI-approved |
| `npm run spell` | Spell check content and docs |
| `npm run similarity` | Flag entries that reuse text from sources that may not be copied |
| `npm run freshness` | List terms not reviewed in 12 months |
| `npm run test:e2e` | Browser, accessibility (axe, WCAG 2.2 AA) and layout tests; run after a build |

## Project layout

```text
content/terms/<product>/<id>.md   One file per term (front matter + three level sections)
content/sources.yml               Source registry (never rendered inside entries)
config/                           AI model registry and licence exceptions
src/schema/                       Zod schemas (Term, Source)
src/lib/                          Pure, framework-free logic: content, glossary, graph, search, licensing
src/components/                   Astro components, React islands and shadcn/ui primitives
src/pages/                        Routes: home, terms, browse, JSON endpoints
scripts/                          CI scripts (validate, licence gate, freshness, similarity)
docs/                             Style guide and term template
tests/                            Unit tests and Playwright end-to-end tests
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [style guide](docs/style-guide.md). Entries contain **no external links**; link other terms with `[[term-id]]`.

## Hosting

`deploy.yml` publishes `dist/` to the `gh-pages` branch, and `pr-preview.yml` publishes a preview of every pull request under `pr-preview/`. In the repository settings, set Pages to **Deploy from a branch → `gh-pages` / root**.

## Licences

Code: [MIT](LICENSE). Content: [CC BY 4.0](LICENSE-CONTENT.md). Sources and third-party notices: [NOTICE](NOTICE).
