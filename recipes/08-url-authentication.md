# Recipe: Fetch `/documentation/authentication` (snapshot-first)

Goal: access the TwitterAPI.io docs page at `/documentation/authentication` using `get_twitterapi_url`, with a safe fallback strategy.

## JSON tool calls

Snapshot lookup (fast, offline):

```json
{ "tool": "get_twitterapi_url", "arguments": { "url": "/documentation/authentication" } }
```

If it’s missing from the snapshot, retry with live fetch:

```json
{ "tool": "get_twitterapi_url", "arguments": { "url": "/documentation/authentication", "fetch_live": true } }
```

Alternative (same content by page key):

```json
{ "tool": "get_twitterapi_guide", "arguments": { "guide_name": "authentication" } }
```

## JavaScript (robust)

```js
async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

let page;
try {
  page = await tool("get_twitterapi_url", { url: "/documentation/authentication" });
} catch {
  // If not in the snapshot, fetch live (allowed hosts only).
  page = await tool("get_twitterapi_url", { url: "/documentation/authentication", fetch_live: true });
}

// If you specifically want the snapshot guide by key:
const guide = await tool("get_twitterapi_guide", { guide_name: "authentication" });
```
