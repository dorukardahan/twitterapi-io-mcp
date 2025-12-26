# Recipe: Compile Authentication Summary Across Endpoints

Goal: programmatically compile a **per-endpoint auth summary** using MCP tools:
`list_twitterapi_endpoints` → `get_twitterapi_endpoint` (N times) → aggregated output.

## Steps

1) List endpoints (optionally filter by category).
2) Fetch canonical auth header once (`get_twitterapi_auth`).
3) For each endpoint, fetch details and scan `curl_example`, `description`, and `parameters`.
4) Aggregate into a markdown table (or JSON).

## Canonical auth metadata (explicit)

`get_twitterapi_auth` is the **authoritative** source for the API key header and base URL.

```json
{
  "tool": "get_twitterapi_auth",
  "arguments": {}
}
```

Example structured output (what to parse):

```json
{
  "header": "X-API-Key",
  "base_url": "https://api.twitterapi.io",
  "examples": {
    "curl": "curl ... -H \"X-API-Key: $TWITTERAPI_KEY\""
  }
}
```

Note: endpoint details include an `auth` block (header/base URL). For **per-endpoint** extras (`login_cookie`, `proxy`), still scan descriptions and parameters.

## JavaScript (production-ready pattern)

```js
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function tool(name, args) {
  const res = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return res?.structuredContent ?? {};
}

const { endpoints } = await tool("list_twitterapi_endpoints", {});
const auth = await tool("get_twitterapi_auth", {});

// auth.header is usually "X-API-Key" (treat it as a literal, not a regex).
const headerRe = new RegExp(escapeRegExp(String(auth.header)), "i");
const rows = [];

for (const { name } of endpoints) {
  try {
    const d = await tool("get_twitterapi_endpoint", { endpoint_name: name });
    const haystack = [
      d.curl_example ?? "",
      d.description ?? "",
      (d.parameters ?? []).map((p) => p.name).join(" "),
    ].join(" ");

    rows.push({
      endpoint: name,
      method: d.method ?? "unknown",
      path: d.path ?? "unknown",
      apiKey: headerRe.test(haystack),
      loginCookie: /login_cookie/i.test(haystack),
      proxy: /\bproxy\b/i.test(haystack),
    });
  } catch (err) {
    rows.push({ endpoint: name, error: String(err) });
  }
}

const table = [
  "| Endpoint | Method | Path | API Key | login_cookie | proxy |",
  "|---|---|---|---:|---:|---:|",
  ...rows
    .filter((r) => !r.error)
    .map(
      (r) =>
        `| \`${r.endpoint}\` | \`${r.method}\` | \`${r.path}\` | ${r.apiKey} | ${r.loginCookie} | ${r.proxy} |`,
    ),
].join("\\n");

console.log(table);
```

## Regex Signals (what to scan)

This recipe scans **multiple fields** because auth requirements may appear in different places:

- API key: `X-API-Key` usually appears in `curl_example` (and is also returned by `get_twitterapi_auth` as `header`).
- Session auth (write actions): `login_cookie` / `login_cookies` may appear in `description` or `parameters`.
- Optional routing: `proxy` may appear in `parameters` or examples.

## Large Lists / Concurrency (avoid flooding your MCP client)

Tool calls read from a local snapshot, but issuing 50+ calls at once can still overwhelm an MCP client.
Use a small concurrency limit (e.g., 5) and keep going on per-item failures.

```js
async function mapWithConcurrency(items, limit, mapper) {
  const results = [];
  const queue = [...items];
  const workers = Array.from({ length: limit }, async () => {
    while (queue.length) {
      const item = queue.shift();
      results.push(await mapper(item));
    }
  });
  await Promise.all(workers);
  return results;
}

const rows = await mapWithConcurrency(endpoints, 5, async ({ name }) => {
  try {
    const d = await tool("get_twitterapi_endpoint", { endpoint_name: name });
    const haystack = `${d.curl_example ?? ""} ${d.description ?? ""} ${(d.parameters ?? []).map((p) => p.name).join(" ")}`;
    return { endpoint: name, apiKey: headerRe.test(haystack) };
  } catch (err) {
    return { endpoint: name, error: String(err) };
  }
});
```

## TypeScript (same idea, typed)

```ts
type EndpointListItem = { name: string; method?: string; path?: string; category?: string };
type EndpointParam = { name: string; required?: boolean; description?: string };
type EndpointDetails = {
  method?: string;
  path?: string;
  description?: string;
  curl_example?: string;
  parameters?: EndpointParam[];
};

async function tool<T>(name: string, args: unknown): Promise<T> {
  const res: any = await callTool(name, args);
  if (res?.isError) throw new Error(res?.content?.[0]?.text ?? `Tool failed: ${name}`);
  return (res?.structuredContent ?? {}) as T;
}

const list = await tool<{ endpoints: EndpointListItem[] }>("list_twitterapi_endpoints", {});
const endpoints = list.endpoints ?? [];

const auth = await tool<{ header: string }>("get_twitterapi_auth", {});
const headerRe = new RegExp(String(auth.header), "i");

for (const ep of endpoints) {
  const d = await tool<EndpointDetails>("get_twitterapi_endpoint", { endpoint_name: ep.name });
  const haystack = `${d.curl_example ?? ""} ${d.description ?? ""} ${(d.parameters ?? []).map((p) => p.name).join(" ")}`;
  const requiresApiKey = headerRe.test(haystack);
}
```

Notes:
- If endpoint docs are incomplete, treat fields as `"unknown"` and keep going.
- Since this is a snapshot, there is no pagination for the endpoint list; use `total` from `list_twitterapi_endpoints`.
