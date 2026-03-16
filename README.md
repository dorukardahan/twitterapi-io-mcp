# twitterapi-io-mcp

> Offline TwitterAPI.io documentation for Claude and AI assistants via MCP. 54 endpoints (with full method/params/body), 32 guides, 24 blog posts. No API key needed.

[![npm version](https://img.shields.io/npm/v/twitterapi-io-mcp.svg)](https://www.npmjs.com/package/twitterapi-io-mcp)
[![npm downloads](https://img.shields.io/npm/dm/twitterapi-io-mcp.svg)](https://www.npmjs.com/package/twitterapi-io-mcp)
[![Smithery](https://smithery.ai/badge/@dorukardahan/twitterapi-io-mcp)](https://smithery.ai/server/@dorukardahan/twitterapi-io-mcp)
[![GitHub stars](https://img.shields.io/github/stars/dorukardahan/twitterapi-io-mcp?style=social)](https://github.com/dorukardahan/twitterapi-io-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```bash
# Quick install (Claude Code)
claude mcp add twitterapi-io -- npx -y twitterapi-io-mcp
```

## What is this?

An MCP server that gives Claude, Cursor, VS Code Copilot, and other AI assistants **instant, offline access** to [TwitterAPI.io](https://twitterapi.io) documentation.

- **54 API endpoints** with full HTTP method, body/query parameters, cURL examples, and response schemas
- **32 guide pages** covering pricing, authentication, rate limits, webhooks, streaming
- **24 blog posts** with tutorials and use cases
- **All v2 write endpoints** documented with `login_cookies`, `proxy`, and body params
- **All deprecated v1 endpoints removed** — only current v2 endpoints remain
- **Zero API key required** — everything is bundled locally

Unlike other Twitter MCP servers that proxy live API calls (and need your API key), this one ships a complete documentation snapshot. Your AI assistant reads it locally, instantly.

### Recent Changes
- **v1.2.0**: OpenAPI-first scraper rewrite — structured parameters with types, response schemas, eliminates Vercel checkpoint issues
- **v1.1.x**: Added `list_timeline` + `get_user_timeline`, removed 7 deprecated V1 endpoints, security fixes (hono, ajv, express-rate-limit)
- **v1.0.23**: Platform advisory — Twitter disabled `since:/until:` search operators. Use `since_time:UNIX` / `until_time:UNIX` instead
- **v1.0.22**: Added 7 endpoints (`get_space_detail`, `get_tweet_replies_v2`, `get_user_about`, etc.)

See [CHANGELOG.md](CHANGELOG.md) for full history.

> **Disclaimer**: Independent community project. Not affiliated with TwitterAPI.io.

## Installation

> Previously published as `twitterapi-docs-mcp`? Just change the package name — everything else stays the same.

**Requires:** Node.js 18.18.0+

### Claude Code (recommended)

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
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

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

### Cursor

Add to `.cursor/mcp.json` in your project root:

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

### VS Code / VS Code Insiders

Add to `.vscode/mcp.json` in your project root:

```json
{
  "servers": {
    "twitterapi-io": {
      "command": "npx",
      "args": ["-y", "twitterapi-io-mcp"]
    }
  }
}
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

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

### Docker

```bash
docker run -i --rm $(docker build -q .) 2>/dev/null
```

Or build from source:

```bash
git clone https://github.com/dorukardahan/twitterapi-io-mcp.git
cd twitterapi-io-mcp && npm install
node index.js
```

## Available tools

| Tool | Description | Best for |
|------|-------------|----------|
| `search_twitterapi_docs` | Full-text search across all docs (fuzzy matching, typo-tolerant) | Finding endpoints, guides, or blog posts by keyword |
| `get_twitterapi_endpoint` | Get full endpoint documentation with params, examples, response schema | Deep dive into a specific API endpoint |
| `list_twitterapi_endpoints` | List endpoints, optionally filtered by category | Browsing what's available in a category |
| `get_twitterapi_guide` | Get guide pages (pricing, auth, rate limits, webhooks, etc.) | Understanding platform rules and setup |
| `get_twitterapi_url` | Fetch content by URL path or page key | When you have a direct link to docs |
| `get_twitterapi_pricing` | Quick pricing overview | Cost questions |
| `get_twitterapi_auth` | Quick authentication guide | Auth setup and API key usage |

## For AI assistants

If you're an AI assistant using this MCP server, here's a quick reference:

| User wants... | Use this tool | Example |
|---------------|---------------|---------|
| Find an endpoint | `search_twitterapi_docs` | `query: "advanced search"` |
| Endpoint details | `get_twitterapi_endpoint` | `endpoint_name: "tweet_advanced_search"` |
| List all endpoints | `list_twitterapi_endpoints` | `category: "user"` (optional) |
| Pricing info | `get_twitterapi_pricing` | No params needed |
| Auth guide | `get_twitterapi_auth` | No params needed |
| Any guide/page | `get_twitterapi_guide` | `guide_name: "qps_limits"` |
| Fetch by URL | `get_twitterapi_url` | `url: "pricing"` |

**Tips:**
- Search is fuzzy and typo-tolerant: `"twet object"` still finds results
- Use `max_results: 5` for focused results
- All endpoints are current v2 — no deprecated endpoints remain

## What can you ask?

Here are real prompts that work well with this MCP server:

- *"What are the rate limits for TwitterAPI.io?"* — triggers `get_twitterapi_guide`
- *"Show me the tweet advanced search endpoint"* — triggers `get_twitterapi_endpoint`
- *"How do I authenticate with the API?"* — triggers `get_twitterapi_auth`
- *"What's the pricing?"* — triggers `get_twitterapi_pricing`
- *"List all user-related endpoints"* — triggers `list_twitterapi_endpoints` with `category: "user"`
- *"How do webhook filter rules work?"* — triggers `search_twitterapi_docs`
- *"What write endpoints need login?"* — triggers `search_twitterapi_docs` with `query: "login_cookies"`
- *"How do I upload media and create a tweet?"* — triggers sequential `get_twitterapi_endpoint` calls

<details>
<summary><strong>All 54 endpoints by category</strong></summary>

| Category | Count | Endpoints |
|----------|-------|-----------|
| **User** | 11 | `get_user_by_username`, `get_user_timeline`, `get_user_last_tweets`, `get_user_followers`, `get_user_followings`, `get_user_mention`, `get_user_verified_followers`, `get_user_about`, `batch_get_user_by_userids`, `check_follow_relationship`, `search_user` |
| **Tweet** | 8 | `tweet_advanced_search`, `get_tweet_by_ids`, `get_tweet_reply`, `get_tweet_replies_v2`, `get_tweet_quote`, `get_tweet_retweeter`, `get_tweet_thread_context`, `get_article` |
| **Action** | 8 | `create_tweet_v2`, `delete_tweet_v2`, `like_tweet_v2`, `unlike_tweet_v2`, `retweet_tweet_v2`, `follow_user_v2`, `unfollow_user_v2`, `upload_media_v2` |
| **Community** | 9 | `get_community_by_id`, `get_community_members`, `get_community_moderators`, `get_community_tweets`, `get_all_community_tweets`, `create_community_v2`, `delete_community_v2`, `join_community_v2`, `leave_community_v2` |
| **List** | 3 | `get_list_followers`, `get_list_members`, `list_timeline` |
| **Profile** | 3 | `update_avatar_v2`, `update_banner_v2`, `update_profile_v2` |
| **Webhook** | 4 | `add_webhook_rule`, `get_webhook_rules`, `update_webhook_rule`, `delete_webhook_rule` |
| **Stream** | 3 | `add_user_to_monitor_tweet`, `get_user_to_monitor_tweet`, `remove_user_to_monitor_tweet` |
| **Auth** | 1 | `user_login_v2` |
| **DM** | 1 | `send_dm_v2` |
| **Account** | 1 | `get_my_info` |
| **Other** | 2 | `get_trends`, `get_space_detail` |

</details>

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `TWITTERAPI_MCP_DISK_CACHE` | `1` (on) | Set to `0` to disable disk caching |

## Troubleshooting

**`npx` hangs or fails on first run**

The first run downloads the package from npm. If it hangs, try:
```bash
npx -y twitterapi-io-mcp@latest
```
Or install globally: `npm install -g twitterapi-io-mcp`

**"Node.js version not supported"**

This server requires Node.js 18.18.0 or later. Check your version:
```bash
node --version
```

**`claude mcp add` not recognized**

Make sure Claude Code CLI is installed and up to date:
```bash
claude --version
```

**Server starts but no tools appear**

Restart your MCP client after adding the server config. Most clients (Claude Desktop, Cursor) need a restart to detect new MCP servers.

## How it works

```
┌─────────────┐     MCP (stdio)      ┌──────────────────┐
│   Claude /   │ ◄──────────────────► │ twitterapi-io-mcp│
│  Cursor /    │                      │                  │
│  VS Code     │                      │  Bundled docs    │
└─────────────┘                      │  (54 endpoints)  │
                                     └──────────────────┘
                                       No network needed
```

| Property | Value |
|----------|-------|
| Runtime | Node.js 18.18.0+ (ES Modules, no build step) |
| Protocol | MCP via stdio |
| Caching | Hybrid (memory + disk), 24h TTL |
| Search | N-gram tokenization with fuzzy matching |

1. AI assistant calls an MCP tool (search, get endpoint, etc.)
2. Server searches the bundled documentation snapshot
3. Results return instantly with no network requests

## Why I built this

I use [TwitterAPI.io](https://twitterapi.io) daily for my projects. Switching between my editor and their docs site got old fast. So I packaged the entire documentation into an MCP server. Now I ask Claude and get answers without leaving my terminal.

If you work with the Twitter/X API through TwitterAPI.io, this saves you the same context-switching. Install it, forget about it, and just ask.

## Development

```bash
git clone https://github.com/dorukardahan/twitterapi-io-mcp.git
cd twitterapi-io-mcp
npm install
npm test        # Run tests (48 tests)
npm start       # Start server locally
npm run scrape  # Update docs snapshot from twitterapi.io
```

## Not using MCP?

If your AI tool doesn't support MCP (like OpenClaw), use the **skill version** instead — a single markdown file with all 54 endpoints:

👉 **[twitterapi-io-skill](https://github.com/dorukardahan/twitterapi-io-skill)** — works with OpenClaw, Claude, GPT, Gemini, and any LLM.

## Links

- **npm**: [twitterapi-io-mcp](https://www.npmjs.com/package/twitterapi-io-mcp)
- **Skill version**: [dorukardahan/twitterapi-io-skill](https://github.com/dorukardahan/twitterapi-io-skill)
- **GitHub**: [dorukardahan/twitterapi-io-mcp](https://github.com/dorukardahan/twitterapi-io-mcp)
- **MCP Registry**: [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io)
- **TwitterAPI.io**: [twitterapi.io](https://twitterapi.io)

## Contributing

PRs welcome! Fork the repo, create a branch, make your changes, and open a pull request. Bug reports and feature requests go to [GitHub Issues](https://github.com/dorukardahan/twitterapi-io-mcp/issues).

## License

[MIT](LICENSE)

## Acknowledgments

- [TwitterAPI.io](https://twitterapi.io) for the API service
- [Anthropic](https://anthropic.com) for the Model Context Protocol
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

