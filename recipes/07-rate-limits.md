# Recipe: Find Rate Limits / QPS Limits

Use `search_twitterapi_docs` to locate rate-limit docs, then fetch the guide (typically `qps_limits`).

## JSON tool calls (with validation + fallback)

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "rate limit qps limits", "max_results": 10 } }
```

Then:

```json
{ "tool": "get_twitterapi_guide", "arguments": { "guide_name": "qps_limits" } }
```

## JavaScript (robust)

```js
const s = await callTool("search_twitterapi_docs", { query: "rate limit qps limits", max_results: 10 });
const results = s.results ?? [];

const qps = results.find((r) => r.type === "page" && r.name === "qps_limits");
const pricing = results.find((r) => r.type === "page" && r.name === "pricing");

// Fallback to known guide keys even if search returns nothing.
const guide = qps?.name ?? pricing?.name ?? "qps_limits";
await callTool("get_twitterapi_guide", { guide_name: guide });
```

