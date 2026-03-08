# Recipe: Find Pagination Docs (cursor / next_cursor)

Use `search_twitterapi_docs` to quickly find pagination-related docs, then fetch a concrete endpoint to see parameters and response shape.

## Search (exact query)

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "pagination", "max_results": 10 } }
```

## Cursor keywords (broader)

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "cursor next_cursor has_next_page", "max_results": 10 } }
```

## Fetch a known cursor endpoint

Examples include `get_user_followers`, `get_user_followings`, `get_user_mention`.

```json
{ "tool": "get_twitterapi_endpoint", "arguments": { "endpoint_name": "get_user_followers" } }
```

## JavaScript (robust search + validation)

```js
async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

// 1) Search for pagination docs quickly
let s;
try {
  s = await tool("search_twitterapi_docs", {
    query: "pagination cursor next_cursor has_next_page",
    max_results: 10,
  });
} catch (err) {
  throw new Error(`search_twitterapi_docs failed: ${String(err)}`);
}

// If search is empty, retry with a simpler query.
if (!Array.isArray(s.results) || s.results.length === 0) {
  s = await tool("search_twitterapi_docs", { query: "pagination", max_results: 10 });
}

// 2) Prefer endpoint hits so you can inspect parameters + examples
const endpoints = (s.results ?? []).filter((r) => r.type === "endpoint" && r.name);
const best = endpoints.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];

// 3) Fallback to a known cursor endpoint if search is empty/broad
const endpoint_name = best?.name ?? "get_user_followers";

let details;
try {
  details = await tool("get_twitterapi_endpoint", { endpoint_name });
} catch (err) {
  throw new Error(`get_twitterapi_endpoint(${endpoint_name}) failed: ${String(err)}`);
}
const params = Array.isArray(details.parameters) ? details.parameters : [];

// Validate that cursor-like params exist (so this is actually about pagination)
const cursorParams = params.filter((p) => /cursor|next_cursor|page/i.test(p.name ?? ""));
if (!cursorParams.length) {
  // If this happens, retry with a more specific search query.
  // e.g. await tool("search_twitterapi_docs", { query: `${endpoint_name} cursor`, max_results: 10 })
}
```

Implementation note: many paginated HTTPS responses return `next_cursor`; keep calling the HTTPS API with the returned cursor until it is empty.

## Tips

- If your query is vague/short, increase `max_results` (15–20) and filter to `type: "endpoint"`.
- If results are ambiguous, add 1–2 context tokens: `"followers cursor"`, `"mentions next_cursor"`.
- If multiple endpoints have similar `score`, prefer the one whose `path` contains the pagination term you care about.
