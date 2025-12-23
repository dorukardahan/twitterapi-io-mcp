# Recipe: Search → Refine → Fetch Endpoint Details

Goal: start with a broad query using `search_twitterapi_docs`, then refine to a precise **endpoint** and fetch its full docs with `get_twitterapi_endpoint`.

Key idea: for endpoint hits, the search result’s `name` is the exact `endpoint_name` you pass to `get_twitterapi_endpoint`.

## JSON tool calls

Search:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "advanced search", "max_results": 10 } }
```

Fetch details using a returned endpoint `name`:

```json
{ "tool": "get_twitterapi_endpoint", "arguments": { "endpoint_name": "tweet_advanced_search" } }
```

## What to extract from search results

`search_twitterapi_docs` returns mixed types:

```json
{
  "results": [
    { "type": "endpoint", "name": "tweet_advanced_search", "score": 42, "method": "GET", "path": "/twitter/tweet/advanced_search" },
    { "type": "page", "name": "qps_limits", "score": 30, "url": "https://docs.twitterapi.io/qps-limits" },
    { "type": "blog", "name": "tweet_thread_context_api", "score": 18, "url": "https://twitterapi.io/blog/..." }
  ]
}
```

Routing rule:
- `type: "endpoint"` → `get_twitterapi_endpoint({ endpoint_name: result.name })`
- `type: "page"` → `get_twitterapi_guide({ guide_name: result.name })` (or `get_twitterapi_url({ url: result.url })`)
- `type: "blog"` → `get_twitterapi_url({ url: result.url })`

Note: results also include a `next` field (suggested follow-up tool call) to make chaining easier.

## JavaScript chaining (with refinement + tie-break)

```js
async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

const s = await tool("search_twitterapi_docs", { query: "advanced search", max_results: 10 });
const results = Array.isArray(s.results) ? s.results : [];

// 1) Prefer endpoint hits (because we want get_twitterapi_endpoint next)
const endpoints = results.filter((r) => r.type === "endpoint" && r.name);
if (!endpoints.length) {
  throw new Error('No endpoint hits. Try refining: "advanced search tweet" or "advanced search endpoint"');
}

// 2) Pick the best-scoring endpoint; tie-break if close
endpoints.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
const [best, second] = endpoints;
if (second && Math.abs((best.score ?? 0) - (second.score ?? 0)) < 2) {
  // If ambiguous: ask the user OR refine and re-run search using method/path hints
  // e.g. query = `advanced search ${best.method} ${best.path}`
}

// 3) `best.name` is the exact endpoint_name you pass to get_twitterapi_endpoint
const details = await tool("get_twitterapi_endpoint", { endpoint_name: best.name });

console.log(details.method, details.path);
console.log(details.curl_example);
```

Tip: if results are broad, add 1–2 context tokens: `"advanced search tweet"`, `"user followers pagination"`.

## Robust disambiguation + retry (production-style)

```js
async function pickEndpoint(query) {
  const primary = await tool("search_twitterapi_docs", { query, max_results: 10 });
  let endpoints = (primary.results ?? []).filter((r) => r.type === "endpoint" && r.name);

  if (!endpoints.length) {
    // Retry with a narrower hint so the search favors endpoints over pages/blogs.
    const retry = await tool("search_twitterapi_docs", { query: `${query} endpoint`, max_results: 10 });
    endpoints = (retry.results ?? []).filter((r) => r.type === "endpoint" && r.name);
  }

  if (!endpoints.length) return null;
  endpoints.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const [best, second] = endpoints;
  if (second && Math.abs((best.score ?? 0) - (second.score ?? 0)) < 2) {
    // Ambiguous: ask the user or refine with method/path tokens.
    const refined = await tool("search_twitterapi_docs", {
      query: `${query} ${best.method ?? ""} ${best.path ?? ""}`.trim(),
      max_results: 10
    });
    const refinedEndpoints = (refined.results ?? []).filter((r) => r.type === "endpoint" && r.name);
    if (refinedEndpoints.length) return refinedEndpoints.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];
  }

  return best;
}

const hit = await pickEndpoint("advanced search");
if (!hit) throw new Error("No endpoint results. Try a narrower query or add more context.");
const details = await tool("get_twitterapi_endpoint", { endpoint_name: hit.name });
```
