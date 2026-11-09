# Repository Guidelines

## Credential persistence and release gates
- Never write password, API key, token, wallet private key or seed VALUES to memory, daily notes, reports or commits. This includes temporary and chat-supplied credentials. Store only the secret-store reference name.
- Before any memory/note/report persistence, use the checked-write entry below on the COMPLETE proposed content. Do not bypass it with write/edit/shell tools. Review plaintext context too; pattern scanning is not proof of no secrets.
- Publish only from a clean fixed git checkout through scripts/security/release.py, with an exact allowlist, real dry-run manifest and content scan. Never run npm/clawhub publish directly or publish from a workspace.
- Automatic CI releases of twitterapi-io-mcp and twitterapi-docs-mcp retain their main-push workflow and do NOT need per-version approval. Package manifest or scan failures stop publication and require owner review. Do not install main branch protection that blocks daily pushes.
- Manual releases (including ClawHub and domain-search-mcp) require explicit owner approval of the exact commit/version/manifest/digest, with upload credentials confined to the protected release environment.
- Scan full staged contents and commit messages before committing. Preserve existing hooks; never bypass a failed check. Show public repo diffs before pushing.
- Weekly: scan memory/ and reports/ in managed workspaces. Monthly: discover all owner-published ClawHub skills and npm packages and compare each latest manifest to its reviewed allowlist/previous manifest. Missing access is not a clean result.
- On suspected leakage: stop the affected write/commit/release, report only file/service/type (never values or matched text), do not test the credential, and do not rotate it without a separate instruction.


## Project Structure

- `index.js`: Main MCP server (ESM) and CLI entrypoint (`twitterapi-io-mcp`).
- `data/docs.json`: Bundled documentation snapshot used at runtime.
- `scrape-all.cjs`, `scrape-docs.cjs`: Dev-only scrapers to refresh `data/docs.json` (not shipped to npm).
- `test/index.test.js`: Node.js built-in test runner suite.
- `packages/twitterapi-docs-mcp/`: Legacy npm package (deprecated wrapper for backwards compatibility).
- `.github/workflows/`: CI/release automation.
- `cache/`: Local runtime cache (gitignored; don’t commit generated content).

## Build, Test, and Development Commands

Prereq: Node.js `>=18.18.0`.

```bash
npm install          # install deps
npm start            # run MCP server locally (stdio)
npm test             # run unit tests (node --test)
npm run scrape       # refresh docs snapshot (updates data/docs.json)
npm run build        # no-op (package is pure ESM)
```

If you change the docs snapshot, commit `data/docs.json` and ensure `npm test` passes.

## Coding Style & Naming Conventions

- JavaScript ESM (`"type": "module"`); prefer `import`/`export` and `const`.
- Match existing formatting in `index.js`/`test/index.test.js` (2-space indent, minimal diffs).
- Keep tool/resource identifiers stable and descriptive (e.g., `search_twitterapi_docs`, `twitterapi://guides/pricing`).
- If you add/rename tools or resources, update the tables in `README.md`.

## Testing Guidelines

- Tests run with Node’s test runner; keep them deterministic and offline (no network calls).
- Add new coverage alongside existing suites in `test/index.test.js` unless a new file is clearly warranted.
- Prefer `node:assert` and small, focused cases (input validation, search behavior, data shape).

## Commit & Pull Request Guidelines

- Commit messages are short and imperative (e.g., “Add …”, “Fix …”).
- Release/version commits typically use `vX.Y.Z - …`; include `CHANGELOG.md` and `package.json` updates when applicable.
- Every npm publish must have a matching Git tag + GitHub Release for the same version (never let releases/tags lag npm).
- PRs should include: a clear description, how to test (`npm test`), and any data/doc changes (e.g., regenerated `data/docs.json`).

## Security & Configuration Notes

- Don’t commit secrets; `.env` is ignored.
- Verify runtime-required files are included in `package.json#files` before publishing.
