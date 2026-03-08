#!/usr/bin/env node

// NOTE: This package is a compatibility wrapper that delegates to the canonical package.
// It must never write to stdout (MCP protocol uses stdout). Use stderr only.

console.error(
  [
    '[DEPRECATED] The npm package "twitterapi-docs-mcp" has been renamed to "twitterapi-io-mcp".',
    'Please update your Claude/CLI configuration to use: npx -y twitterapi-io-mcp',
    'This wrapper will keep working for backwards compatibility.',
  ].join('\n')
);

await import('twitterapi-io-mcp');

