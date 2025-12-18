#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("node:fs");
const path = require("node:path");

const ROOT_DIR = __dirname;
const DATA_PATH = path.join(ROOT_DIR, "data", "docs.json");
const OUT_DIR = path.join(ROOT_DIR, "docs");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function rmIfExists(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function normalizeNewlines(text) {
  return String(text ?? "").replace(/\r\n/g, "\n");
}

function safeFilename(name) {
  return String(name ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isProbablyJson(text) {
  const trimmed = String(text ?? "").trim();
  return trimmed.startsWith("{") || trimmed.startsWith("[");
}

function dedupeStrings(items) {
  const seen = new Set();
  const out = [];
  for (const item of items || []) {
    const value = String(item ?? "").trim();
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, normalizeNewlines(content).trimEnd() + "\n", "utf8");
}

function renderFrontMatter({ title, sourceUrl }) {
  const lines = [];
  lines.push(`# ${title}`);
  if (sourceUrl) lines.push(`Source: ${sourceUrl}`);
  lines.push("");
  return lines.join("\n");
}

function renderCodeBlock(code, language) {
  const content = normalizeNewlines(code).replace(/\\n/g, "\n").trim();
  if (!content) return "";
  return ["```" + language, content, "```", ""].join("\n");
}

function renderList(items) {
  const cleaned = dedupeStrings(items);
  if (!cleaned.length) return "";
  return cleaned.map((line) => `- ${line}`).join("\n") + "\n\n";
}

function renderParagraphs(items) {
  const cleaned = dedupeStrings(items);
  if (!cleaned.length) return "";
  return cleaned.map((p) => p).join("\n\n") + "\n\n";
}

function extractMethodFromCurl(curlExample) {
  const text = String(curlExample ?? "");
  const match = text.match(/(?:--request|-X)\s*([A-Z]+)/i);
  return match?.[1] ? match[1].toUpperCase() : null;
}

function extractUrlFromCurl(curlExample) {
  const text = String(curlExample ?? "");
  const match = text.match(/--url\s+([^\s\\]+)/);
  if (match?.[1]) return match[1];

  const fallback = text.match(/\bcurl\s+(https?:\/\/[^\s\\]+)/);
  return fallback?.[1] ?? null;
}

function buildIndexTable(rows, headers) {
  const headerRow = `| ${headers.join(" | ")} |`;
  const dividerRow = `| ${headers.map(() => "---").join(" | ")} |`;
  const bodyRows = rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  return [headerRow, dividerRow, bodyRows, ""].join("\n");
}

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error(`Missing ${DATA_PATH}. Run the scraper first (npm run scrape).`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

  rmIfExists(OUT_DIR);
  ensureDir(OUT_DIR);

  // Root README for GitHub + Context7
  const meta = data.meta || {};
  const rootReadme = [
    "# TwitterAPI.io Documentation (Snapshot)",
    "",
    "This folder contains a **Markdown representation** of the bundled documentation snapshot used by the MCP server.",
    "",
    `- Source: ${meta.source || "https://twitterapi.io + https://docs.twitterapi.io"}`,
    `- Snapshot date: ${meta.scraped_at || "unknown"}`,
    `- Endpoints: ${meta.total_endpoints ?? Object.keys(data.endpoints || {}).length}`,
    `- Pages: ${meta.total_pages ?? Object.keys(data.pages || {}).length}`,
    `- Blog posts: ${meta.total_blogs ?? Object.keys(data.blogs || {}).length}`,
    "",
    "These files are intended to help documentation indexers (like Context7) and humans browse the dataset without parsing `data/docs.json`.",
    "",
    "## Index",
    "",
    "- `endpoints/index.md`",
    "- `pages/index.md`",
    "- `blogs/index.md`",
    "- `pricing.md`",
    "- `qps-limits.md`",
    "- `authentication.md`",
    "",
  ].join("\n");
  writeFile(path.join(OUT_DIR, "README.md"), rootReadme);

  // Quick-reference docs
  const pricing = data.pricing || {};
  writeFile(
    path.join(OUT_DIR, "pricing.md"),
    [
      renderFrontMatter({ title: "Pricing (Snapshot)", sourceUrl: "https://twitterapi.io/pricing" }),
      "## Credits",
      "",
      `- Credits per USD: \`${pricing.credits_per_usd ?? "unknown"}\``,
      `- Minimum charge: ${pricing.minimum_charge ?? "unknown"}`,
      "",
      "## Costs",
      "",
      buildIndexTable(
        Object.entries(pricing.costs || {}).map(([k, v]) => [k, String(v)]),
        ["Item", "Cost"],
      ),
    ].join("\n"),
  );

  const qps = data.qps_limits || {};
  writeFile(
    path.join(OUT_DIR, "qps-limits.md"),
    [
      renderFrontMatter({ title: "QPS Limits (Snapshot)", sourceUrl: "https://twitterapi.io/qps-limits" }),
      "## Free",
      "",
      qps.free ? `\`${qps.free}\`` : "Unknown",
      "",
      "## Paid",
      "",
      buildIndexTable(
        Object.entries(qps.paid || {}).map(([k, v]) => [k, String(v)]),
        ["Plan", "Limit"],
      ),
    ].join("\n"),
  );

  const auth = data.authentication || {};
  writeFile(
    path.join(OUT_DIR, "authentication.md"),
    [
      renderFrontMatter({ title: "Authentication (Snapshot)", sourceUrl: "https://twitterapi.io" }),
      "## Headers",
      "",
      auth.header && auth.header_value
        ? `- \`${auth.header}\`: \`${auth.header_value}\``
        : "- `X-API-Key: <api-key>`",
      "",
      "## Base URL",
      "",
      auth.base_url ? `\`${auth.base_url}\`` : "`https://api.twitterapi.io`",
      "",
      "## Dashboard",
      "",
      auth.dashboard_url ? auth.dashboard_url : "https://twitterapi.io/dashboard",
      "",
    ].join("\n"),
  );

  // Endpoints
  const endpointsDir = path.join(OUT_DIR, "endpoints");
  ensureDir(endpointsDir);

  const endpoints = data.endpoints || {};
  const endpointRows = [];

  for (const [key, ep] of Object.entries(endpoints)) {
    const title = ep.title || ep.name || key;
    const filename = `${safeFilename(key)}.md`;
    const filePath = path.join(endpointsDir, filename);

    const method = extractMethodFromCurl(ep.curl_example);
    const apiUrl = extractUrlFromCurl(ep.curl_example);

    const codeSnippets = Array.isArray(ep.code_snippets) ? ep.code_snippets : [];
    const responseSnippet = codeSnippets.find((s) => isProbablyJson(s));

    const parts = [];
    parts.push(renderFrontMatter({ title, sourceUrl: ep.url }));
    parts.push("## Endpoint");
    parts.push("");
    if (method) parts.push(`- Method: \`${method}\``);
    if (ep.path) parts.push(`- Path: \`${ep.path}\``);
    if (apiUrl) parts.push(`- API URL: \`${apiUrl}\``);
    parts.push("");
    if (ep.description) {
      parts.push("## Description");
      parts.push("");
      parts.push(ep.description.trim());
      parts.push("");
    }
    if (ep.curl_example) {
      parts.push("## Example (curl)");
      parts.push("");
      parts.push(renderCodeBlock(ep.curl_example, "bash"));
    }
    if (responseSnippet) {
      parts.push("## Example Response");
      parts.push("");
      parts.push(renderCodeBlock(responseSnippet, "json"));
    }
    if (ep.scraped_at) {
      parts.push(`_Scraped at: ${ep.scraped_at}_`);
      parts.push("");
    }
    writeFile(filePath, parts.join("\n"));

    endpointRows.push([
      `\`${key}\``,
      ep.path ? `\`${ep.path}\`` : "",
      `[${title}](./${filename})`,
      ep.url ? `[source](${ep.url})` : "",
    ]);
  }

  endpointRows.sort((a, b) => a[0].localeCompare(b[0]));
  writeFile(
    path.join(endpointsDir, "index.md"),
    [
      "# API Endpoints",
      "",
      buildIndexTable(endpointRows, ["Key", "Path", "Doc", "Source"]),
    ].join("\n"),
  );

  // Pages
  const pagesDir = path.join(OUT_DIR, "pages");
  ensureDir(pagesDir);

  const pages = data.pages || {};
  const pageRows = [];

  for (const [key, page] of Object.entries(pages)) {
    const title = page.title || page.name || key;
    const filename = `${safeFilename(key)}.md`;
    const filePath = path.join(pagesDir, filename);

    const parts = [];
    parts.push(renderFrontMatter({ title, sourceUrl: page.url }));
    if (page.description) {
      parts.push("## Description");
      parts.push("");
      parts.push(page.description.trim());
      parts.push("");
    }
    if (Array.isArray(page.headers) && page.headers.length) {
      parts.push("## Sections");
      parts.push("");
      parts.push(renderList(page.headers));
    }
    if (Array.isArray(page.paragraphs) && page.paragraphs.length) {
      parts.push("## Content");
      parts.push("");
      parts.push(renderParagraphs(page.paragraphs));
    }
    if (Array.isArray(page.list_items) && page.list_items.length) {
      parts.push("## Lists");
      parts.push("");
      parts.push(renderList(page.list_items));
    }
    if (page.scraped_at) {
      parts.push(`_Scraped at: ${page.scraped_at}_`);
      parts.push("");
    }

    writeFile(filePath, parts.join("\n"));

    pageRows.push([
      `\`${key}\``,
      `[${title}](./${filename})`,
      page.url ? `[source](${page.url})` : "",
    ]);
  }

  pageRows.sort((a, b) => a[0].localeCompare(b[0]));
  writeFile(
    path.join(pagesDir, "index.md"),
    ["# Pages", "", buildIndexTable(pageRows, ["Key", "Doc", "Source"])].join("\n"),
  );

  // Blogs
  const blogsDir = path.join(OUT_DIR, "blogs");
  ensureDir(blogsDir);

  const blogs = data.blogs || {};
  const blogRows = [];

  for (const [key, post] of Object.entries(blogs)) {
    const title = post.title || post.name || key;
    const filename = `${safeFilename(key)}.md`;
    const filePath = path.join(blogsDir, filename);

    const parts = [];
    parts.push(renderFrontMatter({ title, sourceUrl: post.url }));
    if (post.description) {
      parts.push("## Description");
      parts.push("");
      parts.push(post.description.trim());
      parts.push("");
    }
    if (Array.isArray(post.headers) && post.headers.length) {
      parts.push("## Sections");
      parts.push("");
      parts.push(renderList(post.headers));
    }
    if (Array.isArray(post.paragraphs) && post.paragraphs.length) {
      parts.push("## Content");
      parts.push("");
      parts.push(renderParagraphs(post.paragraphs));
    }
    if (Array.isArray(post.list_items) && post.list_items.length) {
      parts.push("## Lists");
      parts.push("");
      parts.push(renderList(post.list_items));
    }
    const codeSnippets = Array.isArray(post.code_snippets) ? post.code_snippets : [];
    const codeBlocks = Array.isArray(post.pre_blocks) ? post.pre_blocks : [];
    const combinedCode = [...codeBlocks, ...codeSnippets];
    const cleanedCode = dedupeStrings(combinedCode);
    if (cleanedCode.length) {
      parts.push("## Code");
      parts.push("");
      for (const snippet of cleanedCode.slice(0, 10)) {
        parts.push(renderCodeBlock(snippet, isProbablyJson(snippet) ? "json" : "text"));
      }
    }
    if (post.scraped_at) {
      parts.push(`_Scraped at: ${post.scraped_at}_`);
      parts.push("");
    }

    writeFile(filePath, parts.join("\n"));

    blogRows.push([
      `\`${key}\``,
      `[${title}](./${filename})`,
      post.url ? `[source](${post.url})` : "",
    ]);
  }

  blogRows.sort((a, b) => a[0].localeCompare(b[0]));
  writeFile(
    path.join(blogsDir, "index.md"),
    ["# Blog Posts", "", buildIndexTable(blogRows, ["Key", "Doc", "Source"])].join("\n"),
  );

  console.log(`Generated Markdown docs in ${path.relative(ROOT_DIR, OUT_DIR)}/`);
}

main();
