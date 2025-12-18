# Recipe: List All Endpoints

Use `list_twitterapi_endpoints` to obtain the full endpoint list from the offline snapshot.

## JSON tool call

```json
{ "tool": "list_twitterapi_endpoints", "arguments": {} }
```

The response includes:
- `total`: number of endpoints returned
- `endpoints[]`: objects with `name`, `method`, `path`, `category`

Tip: this tool returns the **full** snapshot (no pagination). Use `category` only to narrow results.

## Category filter

```json
{ "tool": "list_twitterapi_endpoints", "arguments": { "category": "tweet" } }
```

## Alternative: Resources API (same data)

```json
{ "tool": "resources/read", "arguments": { "uri": "twitterapi://endpoints/list" } }
```

## Error handling (JavaScript)

```js
async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

let res;
try {
  res = await tool("list_twitterapi_endpoints", {});
} catch (err) {
  throw new Error(`list_twitterapi_endpoints failed: ${String(err)}`);
}

if (!Array.isArray(res.endpoints)) throw new Error("Invalid response: endpoints[] missing");
if (typeof res.total === "number" && res.endpoints.length !== res.total) {
  // Should not happen for the offline snapshot, but guard anyway.
  console.warn(`Warning: total=${res.total} but endpoints.length=${res.endpoints.length}`);
}

console.log(`Got ${res.endpoints.length} endpoints`);
```
