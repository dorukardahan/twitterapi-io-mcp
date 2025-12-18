# Recipe: List All Endpoints

Use `list_twitterapi_endpoints` to obtain the full endpoint list from the offline snapshot.

## JSON tool call

```json
{ "tool": "list_twitterapi_endpoints", "arguments": {} }
```

The response includes:
- `total`: number of endpoints returned
- `endpoints[]`: objects with `name`, `method`, `path`, `category`

## Category filter

```json
{ "tool": "list_twitterapi_endpoints", "arguments": { "category": "tweet" } }
```

## Error handling (JavaScript)

```js
const res = await callTool("list_twitterapi_endpoints", {}).catch((e) => ({ error: String(e) }));
if (res.error) throw new Error(res.error);
console.log(`Got ${res.total} endpoints`);
```

