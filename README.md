# twitterapi-io-mcp

> **TL;DR**: Offline TwitterAPI.io documentation for Claude and AI assistants via MCP. No API key needed.

```bash
# Quick Install (Claude Code)
claude mcp add twitterapi-io -- npx -y twitterapi-io-mcp
```

[![npm version](https://img.shields.io/npm/v/twitterapi-io-mcp.svg)](https://www.npmjs.com/package/twitterapi-io-mcp)
[![npm downloads](https://img.shields.io/npm/dm/twitterapi-io-mcp.svg)](https://www.npmjs.com/package/twitterapi-io-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue?logo=anthropic)](https://registry.modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.18.0-brightgreen.svg)](https://nodejs.org/)

---

## What is this?

An MCP (Model Context Protocol) server that gives Claude and other AI assistants **instant, offline access** to [TwitterAPI.io](https://twitterapi.io) documentation.

**What's included:**
- **59 API endpoints** with full documentation
- **19 guide pages** (pricing, authentication, rate limits, etc.)
- **21 blog posts** with tutorials and guides

> **Disclaimer**: Unofficial community project. Not affiliated with TwitterAPI.io.

---

## For AI Assistants

If you're an AI assistant using this MCP server, here's how to help users:

| User wants... | Use this tool | Example |
|---------------|---------------|---------|
| Find an endpoint | `search_twitterapi_docs` | `query: "advanced search"` |
| Endpoint details | `get_twitterapi_endpoint` | `endpoint_name: "tweet_advanced_search"` |
| List all endpoints | `list_twitterapi_endpoints` | `category: "user"` (optional) |
| Pricing info | `get_twitterapi_pricing` | - |
| Auth guide | `get_twitterapi_auth` | - |
| Any guide/page | `get_twitterapi_guide` | `guide_name: "qps_limits"` |
| Fetch by URL | `get_twitterapi_url` | `url: "pricing"` |

**Tips:**
- Search is fuzzy/typo-tolerant: `"twet object"` still works
- Use `max_results: 5` for focused results
- Check `deprecation_notice` field for legacy endpoints

---

## Installation

**Prerequisites:** Node.js `>=18.18.0`

### Claude Code (Recommended)

```bash
# Add globally (all projects)
claude mcp add --scope user twitterapi-io -- npx -y twitterapi-io-mcp

# Or project-only
claude mcp add twitterapi-io -- npx -y twitterapi-io-mcp

# Verify
claude mcp list
```

### Claude Desktop

Add to your config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

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

### Other MCP Clients

```bash
npx -y twitterapi-io-mcp
```

---

## Available Tools

| Tool | Description |
|------|-------------|
| `search_twitterapi_docs` | Full-text search across all docs (fuzzy matching) |
| `get_twitterapi_endpoint` | Get detailed endpoint documentation |
| `list_twitterapi_endpoints` | List endpoints by category |
| `get_twitterapi_guide` | Get guide pages (pricing, auth, limits, etc.) |
| `get_twitterapi_url` | Fetch content by URL or page key |
| `get_twitterapi_pricing` | Quick pricing information |
| `get_twitterapi_auth` | Quick authentication guide |

---

## API Endpoint Categories

| Category | Count | Examples |
|----------|-------|----------|
| **User** | 12 | get_user_by_username, get_user_followers, batch_get_user_by_userids |
| **Tweet** | 8 | tweet_advanced_search, get_tweet_by_ids, get_tweet_replies_v2 |
| **Community** | 9 | create_community_v2, get_community_by_id, join_community_v2 |
| **Profile** | 3 | update_avatar_v2, update_banner_v2, update_profile_v2 |
| **Webhook** | 4 | add_webhook_rule, get_webhook_rules, update_webhook_rule |
| **Stream** | 3 | add_user_to_monitor_tweet, get_user_to_monitor_tweet |
| **Action** | 14 | create_tweet_v2, like_tweet_v2, retweet_tweet_v2, upload_media_v2 |
| **DM** | 2 | send_dm_v2, get_dm_history_by_user_id |
| **List** | 2 | get_list_followers, get_list_members |
| **Other** | 2 | get_trends, get_space_detail |

**Total: 59 endpoints**

---

## Usage Examples

Ask Claude:

- *"What are the rate limits for TwitterAPI.io?"*
- *"Show me the tweet advanced search endpoint"*
- *"How do I authenticate with the API?"*
- *"What's the pricing?"*
- *"How do webhook filter rules work?"*

---

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `TWITTERAPI_MCP_DISK_CACHE` | `1` (on) | Set to `0` to disable disk caching |

---

## How It Works

```
┌─────────────┐     MCP Protocol     ┌──────────────────┐
│   Claude    │ ◄──────────────────► │ twitterapi-io-mcp│
│ (or any AI) │                      │                  │
└─────────────┘                      │  Local docs.json │
                                     │  (59 endpoints)  │
                                     └──────────────────┘
```

1. AI assistant calls MCP tools (search, get endpoint, etc.)
2. Server searches local documentation snapshot
3. Results returned instantly (no network needed)

---

## Development

```bash
git clone https://github.com/dorukardahan/twitterapi-io-mcp.git
cd twitterapi-io-mcp
npm install
npm test        # Run tests
npm start       # Start server
npm run scrape  # Update docs snapshot
```

---

## Technical Details

| Property | Value |
|----------|-------|
| Runtime | Node.js 18.18.0+ |
| Module System | ES Modules (no build step) |
| Protocol | MCP via stdio |
| Caching | Hybrid (memory + disk), 24h TTL |
| Search | N-gram fuzzy matching |

---

## Links

- **npm**: https://www.npmjs.com/package/twitterapi-io-mcp
- **GitHub**: https://github.com/dorukardahan/twitterapi-io-mcp
- **MCP Registry**: https://registry.modelcontextprotocol.io
- **TwitterAPI.io**: https://twitterapi.io

---

## Why I Built This

I use [TwitterAPI.io](https://twitterapi.io) for my projects and got tired of switching between my editor and docs. Now I just ask Claude. If it helps me, maybe it helps you too.

---

## Contributing

PRs welcome! Fork → branch → commit → PR.

---

## License

[MIT](LICENSE)

---

## Acknowledgments

- [TwitterAPI.io](https://twitterapi.io) for the API service
- [Anthropic](https://anthropic.com) for MCP
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
