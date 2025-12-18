# Recipe: Fetch “Changelogs” via `get_twitterapi_guide`

The “Changelogs” documentation page is available via the **page key** `changelog` (lowercase).

## JSON tool call

```json
{ "tool": "get_twitterapi_guide", "arguments": { "guide_name": "changelog" } }
```

## Alternative: Resources API

```json
{ "tool": "resources/read", "arguments": { "uri": "twitterapi://guides/changelog" } }
```

## JavaScript

```js
const res = await callTool("get_twitterapi_guide", { guide_name: "changelog" });
const markdown = res.structuredContent?.markdown ?? res.content?.[0]?.text ?? "";
console.log(markdown);
```

If you want to discover the key dynamically:

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "changelog", "max_results": 5 } }
```

If the guide key is unknown or not found, you can fall back to a URL/path fetch:

```json
{ "tool": "get_twitterapi_url", "arguments": { "url": "/changelog" } }
```
