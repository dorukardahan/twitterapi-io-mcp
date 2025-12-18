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

## JavaScript chaining (with refinement + tie-break)

```js
async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

async function findBestEndpointName(query) {
  // Refinement loop: start broad, then add 1–2 context tokens if needed.
  let q = query;

  for (let attempt = 0; attempt < 3; attempt++) {
    const s = await tool("search_twitterapi_docs", { query: q, max_results: 10 });
    const results = Array.isArray(s.results) ? s.results : [];

    const endpoints = results.filter((r) => r.type === "endpoint" && r.name);
    if (!endpoints.length) {
      // No endpoint hits: narrow toward endpoints by adding context tokens.
      q = attempt === 0 ? `${query} tweet` : `${query} endpoint`;
      continue;
    }

    endpoints.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    const [best, second] = endpoints;

    // Tie-break: if top-2 are close, refine once more using path/method context.
    if (second && Math.abs((best.score ?? 0) - (second.score ?? 0)) < 2) {
      const hint = [best.method, best.path].filter(Boolean).join(" ");
      q = `${query} ${hint}`.trim();
      continue;
    }

    return best.name;
  }

  throw new Error(`No endpoint results for query: ${query}`);
}

const endpoint_name = await findBestEndpointName("advanced search");
const details = await tool("get_twitterapi_endpoint", { endpoint_name });

console.log(details.method, details.path);
console.log(details.curl_example);
```

Tip: if results are broad, add 1–2 context tokens: `"advanced search tweet"`, `"user followers pagination"`.
