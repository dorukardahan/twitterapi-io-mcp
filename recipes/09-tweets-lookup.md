# Recipe: Fetch “Tweets Lookup” Endpoint Details

In the TwitterAPI.io docs, the **Tweets Lookup** endpoint is exposed as:

- `endpoint_name`: `get_tweet_by_ids`
- `path`: `/twitter/tweets`

## JSON tool call

```json
{ "tool": "get_twitterapi_endpoint", "arguments": { "endpoint_name": "get_tweet_by_ids" } }
```

## JavaScript

```js
const res = await callTool("get_twitterapi_endpoint", { endpoint_name: "get_tweet_by_ids" });
const details = res.structuredContent ?? {};
console.log(details.method, details.path);
```

## If you do not know the exact name

```json
{ "tool": "search_twitterapi_docs", "arguments": { "query": "tweets lookup", "max_results": 5 } }
```

Pick the best `type: "endpoint"` result and call `get_twitterapi_endpoint` using `result.name`.
