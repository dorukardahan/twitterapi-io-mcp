# TwitterAPI.io MCP Tool Recipes

This repository publishes an MCP (Model Context Protocol) server that bundles an **offline snapshot** of TwitterAPI.io documentation and exposes it via tools.

The examples below are written as **tool-call recipes** so an AI assistant (or a developer driving an MCP client) can reliably chain calls.

## Focused Recipes

For short, single-purpose pages (often easier for retrieval/benchmarking), see `recipes/`:

- `recipes/01-auth-summary.md` (Q1)
- `recipes/02-search-refine.md` (Q2)
- `recipes/03-fuzzy-search.md` (Q4)
- `recipes/04-pagination.md` (Q5)
- `recipes/05-changelog-guide.md` (Q7)
- `recipes/06-list-endpoints.md` (Q8)
- `recipes/07-rate-limits.md` (Q10)

## Tool Quick Reference (Inputs → Key Outputs)

- `search_twitterapi_docs({ query, max_results? })` → `results[]` (`type`, `name`, `score`, plus optional `method/path/url`)
- `get_twitterapi_endpoint({ endpoint_name })` → `method`, `path`, `full_url`, `description`, `parameters[]`, `curl_example`
- `list_twitterapi_endpoints({ category? })` → `endpoints[]` (`name`, `method`, `path`, `category`)
- `get_twitterapi_guide({ guide_name })` → `title`, `url`, `headers[]`, `paragraphs[]`, `code_snippets[]`, `markdown`
- `get_twitterapi_url({ url, fetch_live? })` → `source` (`snapshot|live`), `kind` (`endpoint|page|blog`), `markdown`
- `get_twitterapi_auth()` → `header` (usually `X-API-Key`), `base_url`, `examples.*`

## Canonical vs Legacy Package Name

- Canonical package: `twitterapi-io-mcp` (recommended)
- Legacy wrapper: `twitterapi-docs-mcp` (deprecated, but still works)

Both launch the same MCP server over stdio; prefer `twitterapi-io-mcp` for new installs.

## Response Shapes (What You Can Parse)

These tools return both human-readable `markdown` and machine-friendly `structuredContent`.

### `get_twitterapi_endpoint` (structuredContent)

```json
{
  "endpoint_name": "get_tweet_by_ids",
  "title": "…",
  "method": "GET",
  "path": "/twitter/tweets",
  "full_url": "https://api.twitterapi.io/twitter/tweets",
  "doc_url": "https://docs.twitterapi.io/…",
  "description": "…",
  "parameters": [{ "name": "…", "required": false, "description": "…" }],
  "curl_example": "curl --request GET …",
  "code_snippets": ["…"],
  "raw_text": "…",
  "cached": false,
  "markdown": "# …"
}
```

### `list_twitterapi_endpoints` (structuredContent)

```json
{
  "category": null,
  "total": 52,
  "endpoints": [{ "name": "tweet_advanced_search", "method": "GET", "path": "/twitter/tweet/advanced_search", "description": "…", "category": "tweet" }],
  "markdown": "# …"
}
```

### `search_twitterapi_docs` (structuredContent)

```json
{
  "query": "rate limit qps limits",
  "max_results": 5,
  "cached": false,
  "counts": { "total": 5, "endpoints": 2, "pages": 2, "blogs": 1 },
  "results": [{ "type": "page", "name": "qps_limits", "title": "…", "description": "…", "url": "…", "score": 42 }],
  "markdown": "## Search Results…"
}
```

Search constraints (for robust callers):
- `query`: 1–500 chars (trimmed); typo-tolerant
- `max_results`: 1–20 (default 10)

## Install / Run

- One-shot (good for local testing): `npx -y twitterapi-io-mcp`
- Legacy package name (still works): `npx -y twitterapi-docs-mcp`
- Claude Code:

```bash
claude mcp add --scope user twitterapi-io -- npx -y twitterapi-io-mcp

# Legacy (still supported, but deprecated)
claude mcp add --scope user twitterapi-docs -- npx -y twitterapi-docs-mcp
```

## Recipe: Search → Refine → Fetch Endpoint Details

Use `search_twitterapi_docs` to find a candidate endpoint, then call `get_twitterapi_endpoint` using the returned `name`.

```json
{
  "tool": "search_twitterapi_docs",
  "arguments": { "query": "advanced search", "max_results": 5 }
}
```

Pick a result (e.g. the best `type: "endpoint"`) and call:

```json
{
  "tool": "get_twitterapi_endpoint",
  "arguments": { "endpoint_name": "tweet_advanced_search" }
}
```

End-to-end chaining (pseudo-code):

```js
const search = await callTool("search_twitterapi_docs", { query: "advanced search", max_results: 5 });
const hit = search.results.find((r) => r.type === "endpoint") ?? search.results[0];
if (!hit?.name) throw new Error("No endpoint results found");

const details = await callTool("get_twitterapi_endpoint", { endpoint_name: hit.name });
// details.path / details.method / details.curl_example / details.parameters...
```

## Recipe: List Endpoints → Compile Authentication Summary (Programmatic)

Goal: list many endpoints (`list_twitterapi_endpoints`), then inspect each (`get_twitterapi_endpoint`) to summarize auth requirements.

1) List endpoints (optionally filter by category):

```json
{ "tool": "list_twitterapi_endpoints", "arguments": {} }
```

2) For each `endpoints[i].name`, fetch details and extract auth signals:

- **Global**: most calls require `X-API-Key` (you’ll see it in `curl_example`).
- **Per-endpoint**: some endpoints also require extra fields like `login_cookie(s)` (visible in parameters / description).

Example pseudo-code:

```js
const { endpoints } = await callTool("list_twitterapi_endpoints", {});
const { header } = await callTool("get_twitterapi_auth", {}); // e.g. "X-API-Key"

const summary = [];

for (const { name } of endpoints) {
  try {
    const d = await callTool("get_twitterapi_endpoint", { endpoint_name: name });
    const curl = d.curl_example ?? "";
    const desc = d.description ?? "";
    const paramNames = (d.parameters ?? []).map((p) => p.name).join(" ");
    const haystack = `${curl} ${desc} ${paramNames}`;

    summary.push({
      endpoint: name,
      method: d.method,
      path: d.path,
      requiresApiKey: new RegExp(header, "i").test(haystack),
      requiresLoginCookie: /login_cookie/i.test(haystack),
      requiresProxy: /\bproxy\b/i.test(haystack),
    });
  } catch (err) {
    summary.push({ endpoint: name, error: String(err) });
  }
}

// Format as a markdown table
const rows = summary
  .filter((r) => !r.error)
  .map((r) => `| \`${r.endpoint}\` | \`${r.method}\` | \`${r.path}\` | ${r.requiresApiKey} | ${r.requiresLoginCookie} |`);
const table = [
  "| Endpoint | Method | Path | API Key | login_cookie |",
  "|---|---|---|---:|---:|",
  ...rows,
].join("\\n");
```

## Recipe: Fuzzy / Typo-Tolerant Search (`twet object` → tweet docs)

`search_twitterapi_docs` is **typo-tolerant** (no special flags): it tokenizes, generates n-grams, and scores approximate matches (see `tokenize`, `generateNGrams`, `calculateScore` in `index.js`).

```json
{
  "tool": "search_twitterapi_docs",
  "arguments": { "query": "twet object", "max_results": 10 }
}
```

End-to-end typo search → endpoint detail:

```js
const search = await callTool("search_twitterapi_docs", { query: "twet object", max_results: 10 });
const hit = search.results.find((r) => r.type === "endpoint") ?? search.results[0];
if (!hit?.name) throw new Error("No results for typo query");

await callTool("get_twitterapi_endpoint", { endpoint_name: hit.name });
```

If you want to bias toward tweet-related docs, keep the typo but add context words:
`"twet object tweet"` or `"twet object response"`.

Handling ambiguous results:

- Prefer `type: "endpoint"` when you need an API endpoint; otherwise fall back to `"page"` / `"blog"`.
- Use `score` as a relative ranking signal (pick the highest score; if ties, ask the user to clarify).
- If results are too broad, add 1–2 extra tokens (e.g., `"tweet object response json"`).

## Recipe: Pagination (Cursor / next_cursor)

Many endpoints are cursor-based (they return `next_cursor` / `has_next_page` and accept a `cursor` parameter).

Find them quickly:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "pagination cursor next_cursor has_next_page", "max_results": 10 } }
```

Direct pagination lookup:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "pagination", "max_results": 10 } }
```

Then fetch a known cursor endpoint (examples: `get_user_followers`, `get_user_followings`, `get_user_mention`):

```json
{ "tool": "get_twitterapi_endpoint", "arguments": { "endpoint_name": "get_user_followers" } }
```

Implementation pattern (pseudo-code):

```js
let cursor = undefined;
do {
  // Call the actual TwitterAPI.io HTTPS endpoint with `cursor` (see curl_example in the endpoint doc).
  const page = await fetchFollowers({ userName, cursor });
  cursor = page.next_cursor;
} while (cursor);
```

## Recipe: Find Rate Limits / QPS Limits

Use search for “rate limits” / “qps” then fetch the guide or the URL content.

```json
{
  "tool": "search_twitterapi_docs",
  "arguments": { "query": "rate limit qps limits", "max_results": 5 }
}
```

Then fetch:

```json
{ "tool": "get_twitterapi_guide", "arguments": { "guide_name": "qps_limits" } }
```

End-to-end (search → guide):

```js
const search = await callTool("search_twitterapi_docs", { query: "rate limit qps limits", max_results: 5 });
const qps = search.results.find((r) => r.type === "page" && r.name === "qps_limits");
await callTool("get_twitterapi_guide", { guide_name: qps?.name ?? "qps_limits" });
```

## Recipe: Fetch a Snapshot by URL Path (`/documentation/authentication`)

Use `get_twitterapi_url` with a full URL or a relative path.

```json
{
  "tool": "get_twitterapi_url",
  "arguments": { "url": "/documentation/authentication" }
}
```

If it’s not found in the snapshot, you can request a safe live fetch (twitterapi.io / docs.twitterapi.io only):

```json
{
  "tool": "get_twitterapi_url",
  "arguments": { "url": "/documentation/authentication", "fetch_live": true }
}
```

## Recipe: Fetch “Changelogs” (Guide Page)

`guide_name` values are **page keys** (from the snapshot). Common ones include:
`introduction`, `authentication`, `pricing`, `qps_limits`, `tweet_filter_rules`, `changelog`.

```json
{ "tool": "get_twitterapi_guide", "arguments": { "guide_name": "changelog" } }
```

If you want to discover it dynamically:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "changelog", "max_results": 5 } }
```

## Recipe: “Tweets Lookup” Endpoint Details

In the TwitterAPI.io docs, “Tweets Lookup” corresponds to `get_tweet_by_ids` (path: `/twitter/tweets`).

```json
{ "tool": "get_twitterapi_endpoint", "arguments": { "endpoint_name": "get_tweet_by_ids" } }
```

JavaScript wrapper example:

```js
await callTool("get_twitterapi_endpoint", { endpoint_name: "get_tweet_by_ids" });
```

If you’re unsure of the exact name, search first:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "tweets lookup", "max_results": 5 } }
```
