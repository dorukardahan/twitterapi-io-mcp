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

Implementation note: many paginated responses return `next_cursor`; keep calling the HTTPS API with the returned cursor until it is empty.

