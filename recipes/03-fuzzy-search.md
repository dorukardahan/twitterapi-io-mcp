# Recipe: Typo-Tolerant Search (“twet object”)

`search_twitterapi_docs` is typo-tolerant (tokenization + n-gram fuzzy scoring). No special flags required.

## JSON tool call

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "twet object", "max_results": 10 } }
```

## Practical pattern (search → endpoint details)

```js
async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

const s = await tool("search_twitterapi_docs", { query: "twet object", max_results: 10 });

// Prefer an endpoint hit when you want API shapes/fields.
const endpoints = (s.results ?? []).filter((r) => r.type === "endpoint");
const ranked = endpoints.length ? endpoints : (s.results ?? []);
if (!ranked.length) throw new Error("No results for typo query");

// Ambiguity handling: if the top-2 are close, ask the user (or refine the query).
ranked.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
const [best, second] = ranked;
if (second && Math.abs((best.score ?? 0) - (second.score ?? 0)) < 2) {
  // e.g. present [best.name, second.name] and ask which one is intended
}

// If the best hit isn't an endpoint, keep it as a doc result; otherwise fetch endpoint details.
if (best.type === "endpoint" && best.name) {
  const doc = await tool("get_twitterapi_endpoint", { endpoint_name: best.name });
}
```

## Tuning & ambiguity

- If the query is very short/typo-heavy, try `max_results: 15–20` and filter by `type`.
- Add 1 context token to stabilize matches: `"twet object tweet"`, `"twet object fields"`.
- If results are empty, retry with a corrected query: `"tweet object"`, `"tweet objects"`.
- If multiple hits look plausible, compare `score` and prefer the higher-scoring `type: "endpoint"`.
