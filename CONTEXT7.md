# TwitterAPI.io MCP Tool Recipes

This repository publishes an MCP (Model Context Protocol) server that bundles an **offline snapshot** of TwitterAPI.io documentation and exposes it via tools.

The examples below are written as **tool-call recipes** so an AI assistant (or a developer driving an MCP client) can reliably chain calls.

## Install / Run

- One-shot (good for local testing): `npx -y twitterapi-io-mcp`
- Claude Code:

```bash
claude mcp add --scope user twitterapi-io -- npx -y twitterapi-io-mcp
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
// endpoints = (await callTool("list_twitterapi_endpoints", {})).endpoints
const summary = [];

for (const { name } of endpoints) {
  const d = await callTool("get_twitterapi_endpoint", { endpoint_name: name });
  const curl = d.curl_example ?? "";
  const desc = d.description ?? "";

  summary.push({
    endpoint: name,
    requiresApiKey: /X-API-Key/i.test(curl),
    requiresLoginCookie: /login_cookie/i.test(curl + " " + desc),
  });
}
```

If you only need the canonical header/value once, call:

```json
{ "tool": "get_twitterapi_auth", "arguments": {} }
```

## Recipe: Fuzzy / Typo-Tolerant Search (`twet object` → tweet docs)

`search_twitterapi_docs` is **typo-tolerant**: it uses n-gram fuzzy matching and tokenization (see `tokenize`, `generateNGrams`, `calculateScore` in `index.js`). No special flags required.

```json
{
  "tool": "search_twitterapi_docs",
  "arguments": { "query": "twet object", "max_results": 10 }
}
```

From the results, refine by fetching the most relevant endpoint (e.g., tweets lookup / tweet endpoints) using `get_twitterapi_endpoint`.

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

```json
{ "tool": "get_twitterapi_guide", "arguments": { "guide_name": "changelog" } }
```

## Recipe: “Tweets Lookup” Endpoint Details

In the TwitterAPI.io docs, “Tweets Lookup” corresponds to `get_tweet_by_ids` (path: `/twitter/tweets`).

```json
{ "tool": "get_twitterapi_endpoint", "arguments": { "endpoint_name": "get_tweet_by_ids" } }
```

If you’re unsure of the exact name, search first:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "tweets lookup", "max_results": 5 } }
```

