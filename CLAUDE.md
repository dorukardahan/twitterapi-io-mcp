# TwitterAPI.io MCP Server

## Project Status: PUBLISHED

- **npm (recommended)**: https://www.npmjs.com/package/twitterapi-io-mcp
- **npm (legacy wrapper)**: https://www.npmjs.com/package/twitterapi-docs-mcp
- **GitHub**: https://github.com/dorukardahan/twitterapi-io-mcp
- **Install**: `npx -y twitterapi-io-mcp`

## What This Is

MCP server providing offline access to TwitterAPI.io documentation for Claude and other AI assistants. Created by an independent developer (not affiliated with TwitterAPI.io).

## Key Files

| File | Purpose |
|------|---------|
| `index.js` | Main MCP server (ES Module, no build step) |
| `data/docs.json` | Bundled docs snapshot (54 endpoints, 19 pages, 21 blog posts) |
| `scrape-all.cjs` | Documentation scraper (not in npm package) |
| `test/index.test.js` | Unit + MCP integration tests |
| `packages/twitterapi-docs-mcp/` | Legacy npm wrapper (deprecated) |

## Commands

```bash
npm test          # Run tests
npm start         # Start MCP server locally
npm run scrape    # Refresh docs snapshot
```

## Architecture

- **Runtime**: Node.js 18.18.0+
- **Protocol**: MCP via stdio
- **Caching**: Hybrid (memory + disk) with 24-hour TTL
- **Search**: Advanced tokenization with n-gram fuzzy matching

## Version Bumping

Before publishing a new version:
1. Update version in root `package.json` (twitterapi-io-mcp)
2. Update version in `packages/twitterapi-docs-mcp/package.json` (legacy wrapper)
3. Update version strings in `index.js`
4. Update `server.json` and `CHANGELOG.md`
5. Run `npm test`
6. Commit and push
7. Create a GitHub release/tag `vX.Y.Z` (triggers `.github/workflows/publish.yml`)

## Files NOT in npm package

- `test/` - Tests
- `scrape-*.cjs` - Scrapers
- `MCP-*.md` - Development notes (gitignored)
- `cache/` - Local cache (gitignored)
