# twitterapi-io-mcp

**npm packages**
- `twitterapi-io-mcp` (recommended, canonical)
- `twitterapi-docs-mcp` (deprecated compatibility wrapper → delegates to `twitterapi-io-mcp`)

[![npm version](https://img.shields.io/npm/v/twitterapi-io-mcp.svg)](https://www.npmjs.com/package/twitterapi-io-mcp)
[![npm downloads](https://img.shields.io/npm/dm/twitterapi-io-mcp.svg)](https://www.npmjs.com/package/twitterapi-io-mcp)
[![npm version (legacy)](https://img.shields.io/npm/v/twitterapi-docs-mcp.svg)](https://www.npmjs.com/package/twitterapi-docs-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue?logo=anthropic)](https://registry.modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.18.0-brightgreen.svg)](https://nodejs.org/)

MCP (Model Context Protocol) server providing **offline access** to [TwitterAPI.io](https://twitterapi.io) documentation for Claude and other AI assistants.

> **Disclaimer**: This is an unofficial community project. Not affiliated with, endorsed by, or sponsored by TwitterAPI.io. TwitterAPI.io is a trademark of its respective owner.

**Links**
- GitHub: https://github.com/dorukardahan/twitterapi-io-mcp
- npm (recommended): https://www.npmjs.com/package/twitterapi-io-mcp
- npm (legacy): https://www.npmjs.com/package/twitterapi-docs-mcp
- Context7 (canonical): https://context7.com/dorukardahan/twitterapi-io-mcp
- Context7 (legacy slugs): https://context7.com/dorukardahan/twitterapi-docs-mcp, https://context7.com/dorukardahan/twitterapi.io-mcp

## Why I Built This

I'm an independent developer who uses [TwitterAPI.io](https://twitterapi.io) for my projects. I found myself constantly switching between my code editor and the documentation website, searching for endpoint details, checking rate limits, and looking up authentication requirements.

So I built this MCP server to have **instant access to the entire documentation** right inside Claude. No more tab-switching, no more searching — just ask Claude and get the answer.

I'm sharing this with the community because if it helped me, it might help you too. 🚀

## Features

- **52 API endpoints** documented
- **Site + docs pages** via sitemap + internal link crawl (pricing, QPS limits, privacy, contact, terms, acceptable use, dashboard, etc.)
- **Blog posts** via blog index crawl (and internal discovery)
- **Offline-first** - Works without network access
- **Fast search** with fuzzy matching and camelCase support
- **Hybrid caching** for optimal performance

## Installation

**Prerequisites**
- Node.js `>=18.18.0` (required to run the MCP server)
- Claude Code users: the `claude` CLI installed (for `claude mcp add`)

Note: This MCP server serves an **offline docs snapshot**. You do **not** need a TwitterAPI.io key just to use the docs tools.

### Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "twitterapi-io": {
      "command": "npx",
      "args": ["-y", "twitterapi-io-mcp"]
    }
  }
}
```

### Claude Code

```bash
# Add globally (all projects)
claude mcp add --scope user twitterapi-io -- npx -y twitterapi-io-mcp

# Or add to current project only
claude mcp add twitterapi-io -- npx -y twitterapi-io-mcp

# Legacy name (still works, but deprecated)
claude mcp add --scope user twitterapi-docs -- npx -y twitterapi-docs-mcp
```

Verify installation:
```bash
claude mcp list
```

Troubleshooting:
- `claude: command not found` → install Claude Code / the `claude` CLI first
- `npx` fails or shows syntax errors → upgrade Node.js to `>=18.18.0`
- Corporate networks → ensure npm can reach the registry (or configure your proxy/registry)

## Available Tools

| Tool | Description |
|------|-------------|
| `search_twitterapi_docs` | Full-text search across all docs (endpoints, guides, blogs) |
| `get_twitterapi_endpoint` | Get detailed info for a specific API endpoint |
| `list_twitterapi_endpoints` | List all endpoints with optional category filter |
| `get_twitterapi_guide` | Get a page by key (guides + other site/docs pages) |
| `get_twitterapi_url` | Fetch by URL, bare path (`pricing`), or page key (`qps_limits`) (snapshot, optional live fetch) |
| `get_twitterapi_pricing` | Quick access to pricing information |
| `get_twitterapi_auth` | Quick access to authentication guide |

## Available Resources

| Resource URI | Description |
|--------------|-------------|
| `twitterapi://guides/pricing` | Pricing guide |
| `twitterapi://guides/qps-limits` | QPS limits and rate limiting |
| `twitterapi://guides/filter-rules` | Tweet filter rules syntax |
| `twitterapi://guides/changelog` | API changelog |
| `twitterapi://guides/introduction` | Introduction to TwitterAPI.io |
| `twitterapi://guides/authentication` | Authentication guide |
| `twitterapi://endpoints/list` | Full endpoint listing |
| `twitterapi://status/freshness` | Data freshness status |

## MCP Tool Recipes

If you’re evaluating this MCP via Context7 or want copy/pasteable “tool chaining” patterns, see `CONTEXT7.md`.

Focused, single-purpose recipes are in `recipes/` (e.g. `recipes/01-auth-summary.md`, `recipes/07-rate-limits.md`).

Common workflows:
- **Rate limits**: `search_twitterapi_docs` (`"rate limit qps"`) → `get_twitterapi_guide` (`"qps_limits"`)
- **Typos are OK**: `search_twitterapi_docs` is fuzzy/typo-tolerant (e.g., `"twet object"`)
- **Tweets Lookup**: `get_twitterapi_endpoint` (`"get_tweet_by_ids"`)

## Usage Examples

Once installed, you can ask Claude questions like:

- "What are the QPS limits for TwitterAPI.io?"
- "Show me the advanced search endpoint"
- "How do webhook filter rules work?"
- "How do I get user followers?"
- "What's the pricing structure?"
- "How do I authenticate with the API?"

## API Endpoint Categories

| Category | Count | Examples |
|----------|-------|----------|
| **User** | 9 | get_user_by_username, get_user_followers, get_user_followings |
| **Tweet** | 7 | tweet_advanced_search, get_tweet_reply, get_tweet_quote |
| **Community** | 5 | get_community_by_id, get_community_members |
| **Webhook** | 4 | add_webhook_rule, get_webhook_rules |
| **Stream** | 2 | add_user_to_monitor_tweet |
| **Action** | 16 | create_tweet, like_tweet, follow_user_v2 |
| **DM** | 2 | send_dm_v2, get_dm_history_by_user_id |
| **List** | 2 | get_list_followers, get_list_members |
| **Trend** | 1 | get_trends |

## How It Works

This MCP server bundles a snapshot of TwitterAPI.io documentation (scraped with permission patterns). When Claude or another MCP-compatible AI assistant needs information about TwitterAPI.io:

1. The assistant calls one of the available tools
2. The server searches/retrieves from the local documentation cache
3. Results are returned instantly without network latency

The documentation includes:
- Complete API reference with request/response examples
- Authentication guides
- Rate limiting information
- Pricing details
- Best practices

## Updating Documentation

If TwitterAPI.io updates their documentation, clone the repo and run the scraper:

```bash
git clone https://github.com/dorukardahan/twitterapi-io-mcp.git
cd twitterapi-io-mcp
npm install
node scrape-all.cjs
```

Note: The scraper is included in the repository but not in the npm package.

## Development

```bash
# Clone repository
git clone https://github.com/dorukardahan/twitterapi-io-mcp.git
cd twitterapi-io-mcp

# Install dependencies
npm install

# Run tests
npm test

# Start server locally
npm start
```

## Technical Details

- **Runtime**: Node.js 18.18.0+
- **Module System**: ES Modules (no build step)
- **Protocol**: MCP (Model Context Protocol) via stdio
- **Caching**: Hybrid (memory + disk) with 24-hour TTL
- **Search**: Advanced tokenization with n-gram fuzzy matching

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE) - see LICENSE file for details.

## Acknowledgments

- [TwitterAPI.io](https://twitterapi.io) for providing excellent Twitter/X API access
- [Anthropic](https://anthropic.com) for the Model Context Protocol
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk) for the server framework
