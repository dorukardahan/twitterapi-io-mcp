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

function coerceString(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object" && typeof item.text === "string") return item.text;
  return "";
}

function isNoiseText(text) {
  const value = String(text ?? "").trim();
  if (!value) return true;

  const lower = value.toLowerCase();
  if (lower.startsWith("loading...")) return true;
  if (lower.includes("skip to main content")) return true;
  if (lower.includes("self.__next")) return true;
  if (lower.includes("challenges.cloudflare.com")) return true;
  if (lower.includes("turnstile")) return true;
  if (lower.includes("localstorage")) return true;

  // Common navigation/footer headings that pollute scraped docs
  if (["twitterapi.io", "support", "legal", "social responsibility"].includes(lower)) return true;

  return false;
}

function cleanStrings(items, { maxLength = Infinity, limit = Infinity, filterNoise = true } = {}) {
  const seen = new Set();
  const out = [];
  for (const item of items || []) {
    const value = coerceString(item).trim();
    if (!value) continue;
    if (filterNoise && isNoiseText(value)) continue;
    if (Number.isFinite(maxLength) && value.length > maxLength) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
    if (out.length >= limit) break;
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

function renderList(items, options) {
  const cleaned = cleanStrings(items, options);
  if (!cleaned.length) return "";
  return cleaned.map((line) => `- ${line}`).join("\n") + "\n\n";
}

function renderParagraphs(items, options) {
  const cleaned = cleanStrings(items, options);
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

function humanizeIdentifier(name) {
  const value = String(name ?? "").trim();
  if (!value) return "Untitled";
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\bapi\b/gi, "API")
    .replace(/\bv(\d+)\b/gi, (m) => m.toUpperCase())
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isGenericSiteTitle(title) {
  const value = String(title ?? "").trim().toLowerCase();
  if (!value) return true;
  return (
    value.includes("twitterapi.io - twitter data") ||
    value.includes("affordable, real-time x") ||
    value.includes("no auth, no limits") ||
    value === "twitterapi.io"
  );
}

function pickTitleFromHeaders(headers) {
  const h1 = Array.isArray(headers)
    ? headers.find((h) => h && typeof h === "object" && h.level === 1 && typeof h.text === "string")
    : null;
  const text = String(h1?.text ?? "").trim();
  return text || null;
}

function normalizeSentenceSpacing(text) {
  return String(text ?? "").replace(/([.!?])([A-Za-z])/g, "$1 $2");
}

function safeUrlPath(url) {
  try {
    const parsed = new URL(String(url));
    return parsed.pathname || null;
  } catch (_err) {
    return null;
  }
}

function renderMcpGuideAccess({ guideName, pageUrl, aliases }) {
  const urlPath = safeUrlPath(pageUrl);
  const accessUrl = urlPath || pageUrl;

  const lines = [];
  lines.push("## Fetch with MCP");
  lines.push("");
  lines.push(
    "Use `get_twitterapi_guide` for the offline snapshot (by page key), or `get_twitterapi_url` for URL/path-based fetches.",
  );
  if (Array.isArray(aliases) && aliases.length) {
    lines.push(`Also known as: ${aliases.join(", ")}`);
  }
  lines.push("");

  lines.push(
    renderCodeBlock(
      JSON.stringify(
        { tool: "get_twitterapi_guide", arguments: { guide_name: guideName } },
        null,
        2,
      ),
      "json",
    ),
  );

  if (accessUrl) {
    lines.push(
      renderCodeBlock(
        JSON.stringify({ tool: "get_twitterapi_url", arguments: { url: accessUrl } }, null, 2),
        "json",
      ),
    );
  }

  return lines.join("\n");
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
    const title = humanizeIdentifier(ep.name || key);
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
      parts.push(normalizeSentenceSpacing(ep.description).trim());
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
    const h1Title = pickTitleFromHeaders(page.headers);
    const title =
      h1Title || (page.title && !isGenericSiteTitle(page.title) ? page.title.trim() : null) || humanizeIdentifier(key);
    const filename = `${safeFilename(key)}.md`;
    const filePath = path.join(pagesDir, filename);

    const parts = [];
    parts.push(renderFrontMatter({ title, sourceUrl: page.url }));
    parts.push(
      renderMcpGuideAccess({
        guideName: key,
        pageUrl: page.url,
        aliases: key === "changelog" ? ['"Changelogs" documentation page'] : [],
      }),
    );
    if (page.description && !isGenericSiteTitle(page.description)) {
      parts.push("## Description");
      parts.push("");
      parts.push(page.description.trim());
      parts.push("");
    }
    if (Array.isArray(page.headers) && page.headers.length) {
      parts.push("## Sections");
      parts.push("");
      parts.push(renderList(page.headers, { maxLength: 200, limit: 80 }));
    }
    if (Array.isArray(page.paragraphs) && page.paragraphs.length) {
      parts.push("## Content");
      parts.push("");
      parts.push(renderParagraphs(page.paragraphs, { maxLength: 4000, limit: 120 }));
    }
    if (Array.isArray(page.list_items) && page.list_items.length) {
      parts.push("## Lists");
      parts.push("");
      parts.push(renderList(page.list_items, { maxLength: 240, limit: 80 }));
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
    const h1Title = pickTitleFromHeaders(post.headers);
    const title =
      h1Title || (post.title && !isGenericSiteTitle(post.title) ? post.title.trim() : null) || humanizeIdentifier(key);
    const filename = `${safeFilename(key)}.md`;
    const filePath = path.join(blogsDir, filename);

    const parts = [];
    parts.push(renderFrontMatter({ title, sourceUrl: post.url }));
    if (post.description && !isGenericSiteTitle(post.description)) {
      parts.push("## Description");
      parts.push("");
      parts.push(post.description.trim());
      parts.push("");
    }
    if (Array.isArray(post.headers) && post.headers.length) {
      parts.push("## Sections");
      parts.push("");
      parts.push(renderList(post.headers, { maxLength: 200, limit: 80 }));
    }
    if (Array.isArray(post.paragraphs) && post.paragraphs.length) {
      parts.push("## Content");
      parts.push("");
      parts.push(renderParagraphs(post.paragraphs, { maxLength: 4000, limit: 120 }));
    }
    if (Array.isArray(post.list_items) && post.list_items.length) {
      parts.push("## Lists");
      parts.push("");
      parts.push(renderList(post.list_items, { maxLength: 240, limit: 80 }));
    }
    const codeSnippets = Array.isArray(post.code_snippets) ? post.code_snippets : [];
    const codeBlocks = Array.isArray(post.pre_blocks) ? post.pre_blocks : [];
    const combinedCode = [...codeBlocks, ...codeSnippets];
    const cleanedCode = cleanStrings(combinedCode, { filterNoise: false });
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
