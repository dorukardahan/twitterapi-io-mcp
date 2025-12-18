# Recipe: Typo-Tolerant Search (“twet object”)

`search_twitterapi_docs` is typo-tolerant (tokenization + n-gram fuzzy scoring). No special flags required.

## JSON tool call

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "twet object", "max_results": 10 } }
```

## Practical pattern (search → endpoint details)

```js
const s = await callTool("search_twitterapi_docs", { query: "twet object", max_results: 10 });

// Prefer an endpoint hit when you want API shapes/fields.
const hit = (s.results ?? []).find((r) => r.type === "endpoint") ?? (s.results ?? [])[0];
if (!hit?.name) throw new Error("No results for typo query");

const doc = await callTool("get_twitterapi_endpoint", { endpoint_name: hit.name });
```

## Tuning & ambiguity

- If the query is very short/typo-heavy, try `max_results: 15–20`.
- Add one context word to stabilize matches: `"twet object response"`, `"twet object tweet"`.
- If multiple hits look plausible, compare their `score` and ask the user to choose.

