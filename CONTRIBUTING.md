# Contributing to Decoded365

Thank you for helping. Decoded365 is a free, open glossary and anyone can improve it.

## Ways to help

- **Suggest a term** or **report an error** with the issue forms.
- **Edit a term**: every page has an "Edit this term" link.
- **Review an import batch**: pull requests labelled `import` contain drafted entries that need a person to check and rewrite them.

## Adding or editing a term

1. Copy `docs/term-template.md` to `content/terms/<product>/<id>.md`.
2. Write all three levels following [`docs/style-guide.md`](docs/style-guide.md).
3. Run the checks locally:
   ```bash
   npm install
   npm run validate   # schema, links, duplicates, levels
   npm test
   ```
4. Open a pull request. CI validates the entry, blocks external links, flags possible duplicates and posts a preview link.

## What we accept

- Terms that belong to SharePoint (v1), Power Platform (v1.1) or Copilot (v1.2).
- Plain-English, sourced, dated content. See the style guide.
- No pricing or licensing tables, tutorials or how-to guides.

## Rules

- **No external links** inside entries. Link other terms with `[[term-id]]`.
- **Credit sources** in `origins`; never paste from sources that are not openly licensed.
- **Sign your commits** with the Developer Certificate of Origin: `git commit -s`. By signing off you confirm you may submit the work under the project's licences (MIT for code, CC BY 4.0 for content).
- Be kind. See the [Code of Conduct](CODE_OF_CONDUCT.md).

## Development

```bash
npm install
npm run dev          # local site
npm run build        # validate content, then build the site
npm test             # unit tests
npm run check        # type check
npm run licenses     # licence gate
npm run test:e2e     # browser tests (after a build)
```

Node 22.23.4 or newer is required.

## Reviewers

Pull requests touching `content/terms/<product>/` request the owners listed in `.github/CODEOWNERS`.
