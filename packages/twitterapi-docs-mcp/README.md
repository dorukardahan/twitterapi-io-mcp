# twitterapi-docs-mcp

> **This package has been renamed to [`twitterapi-io-mcp`](https://www.npmjs.com/package/twitterapi-io-mcp).**
> `twitterapi-docs-mcp` is a compatibility wrapper that delegates to `twitterapi-io-mcp`. It still works, but future updates and support will only be available on the new package.

## Migration guide

Switching takes less than a minute. Update the package name in your MCP client config:

### Claude Code

```bash
# Remove old server and add new one
claude mcp remove twitterapi-docs-mcp
claude mcp add twitterapi-io-mcp -- npx -y twitterapi-io-mcp
```

### Claude Desktop

Edit `claude_desktop_config.json`:

```jsonc
{
  "mcpServers": {
    // Replace this:
    // "twitterapi-docs-mcp": { "command": "npx", "args": ["-y", "twitterapi-docs-mcp"] }

    // With this:
    "twitterapi-io-mcp": {
      "command": "npx",
      "args": ["-y", "twitterapi-io-mcp"]
    }
  }
}
```

Config file location:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### Cursor

Edit `.cursor/mcp.json` in your project root (or global config):

```jsonc
{
  "mcpServers": {
    "twitterapi-io-mcp": {
      "command": "npx",
      "args": ["-y", "twitterapi-io-mcp"]
    }
  }
}
```

### VS Code (Copilot)

Edit `.vscode/mcp.json` in your project root:

```jsonc
{
  "servers": {
    "twitterapi-io-mcp": {
      "command": "npx",
      "args": ["-y", "twitterapi-io-mcp"]
    }
  }
}
```

### Windsurf

Edit `~/.codeium/windsurf/mcp_config.json`:

```jsonc
{
  "mcpServers": {
    "twitterapi-io-mcp": {
      "command": "npx",
      "args": ["-y", "twitterapi-io-mcp"]
    }
  }
}
```

## Why migrate?

- **Future updates** will only be published to `twitterapi-io-mcp`
- **Direct support** via [GitHub Issues](https://github.com/dorukardahan/twitterapi-io-mcp/issues)
- **No wrapper overhead** - runs the server directly instead of delegating

## Legacy usage (still works)

```bash
npx -y twitterapi-docs-mcp
```

This wrapper prints a deprecation notice to stderr and delegates to `twitterapi-io-mcp`.
