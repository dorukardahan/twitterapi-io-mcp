# Recipe: Search → Refine → Fetch Endpoint Details

Goal: start with a broad query using `search_twitterapi_docs`, then refine to a precise endpoint with `get_twitterapi_endpoint`.

## JSON tool calls

Search:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "advanced search", "max_results": 10 } }
```

Fetch details using a returned endpoint `name`:

```json
{ "tool": "get_twitterapi_endpoint", "arguments": { "endpoint_name": "tweet_advanced_search" } }
```

## JavaScript chaining (tie-breaker included)

```js
async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

const s = await tool("search_twitterapi_docs", { query: "advanced search", max_results: 10 });

// Prefer endpoints; otherwise fall back to the top result.
const endpoints = (s.results ?? []).filter((r) => r.type === "endpoint");
const hit = endpoints[0] ?? (s.results ?? [])[0];
if (!hit?.name) throw new Error("No results");

// Tie-break: if multiple endpoints are close, ask for clarification.
const top = endpoints.slice(0, 3);
if (top.length >= 2 && Math.abs((top[0].score ?? 0) - (top[1].score ?? 0)) < 2) {
  // e.g. show candidates to the user and ask which one they mean
  // or refine and re-run: await tool("search_twitterapi_docs", { query: "advanced search tweet", max_results: 10 });
}

const details = await tool("get_twitterapi_endpoint", { endpoint_name: hit.name });
```

Tip: if results are broad, add 1–2 context tokens: `"advanced search tweet"`, `"user followers pagination"`.
