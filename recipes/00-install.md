# Recipe: Install in Claude Code / Claude Desktop (Initial Command)

Goal: make the `twitterapi-io-mcp` server available in an MCP-compatible AI environment.

## Prerequisites

- Node.js `>=18.18.0`
- Claude Code users: the `claude` CLI installed (for `claude mcp add`)

## Claude Code (initial command)

```bash
claude mcp add --scope user twitterapi-io -- npx -y twitterapi-io-mcp
```

Verify:

```bash
claude mcp list
```

Project-only (current repo):

```bash
claude mcp add twitterapi-io -- npx -y twitterapi-io-mcp
```

## Claude Desktop (config snippet)

Add to your `claude_desktop_config.json`:

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

## Troubleshooting

- `claude: command not found` → install Claude Code / the `claude` CLI
- `npx` fails or syntax errors → upgrade Node.js to `>=18.18.0`
