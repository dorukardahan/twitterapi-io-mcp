# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.17] - 2026-02-02

### Fixed
- **Critical**: `getEndpointMethod()` now checks `endpoint.type` field in addition to `endpoint.method` - fixes PATCH/DELETE methods being misreported as GET for `update_avatar_v2`, `update_banner_v2`, `update_profile_v2`
- **Critical**: `get_twitterapi_auth` tool handler had undefined variable references (`header`, `baseUrl`, `dashboardUrl`) causing runtime errors - now correctly references `auth.header`, `auth.baseUrl`, `auth.dashboardUrl`
- Added `method` field to v1.0.15 endpoints that only had `type` field

### Added
- Support team guidance for `user_login_v2`: `totp_secret` must be a 16-character string (not numbers) for reliable cookie generation
- Troubleshooting note for `create_tweet_v2`: 400 errors commonly caused by faulty cookies from incorrect `totp_secret`
- Missing cURL examples for `update_avatar_v2`, `update_banner_v2`, `update_profile_v2`, `get_tweet_replies_v2`, `get_user_to_monitor_tweet`

### Changed
- `formatEndpointMarkdown()` also updated to check `endpoint.type` for correct method display

---

## [1.0.16] - 2026-01-26

### Improved
- Complete README restructure for better readability
- Added TL;DR and quick install command at top
- Added "For AI Assistants" section with tool usage guide
- Added architecture diagram
- Fixed GitHub homepage URL (was pointing to deprecated package)

### SEO
- Added GitHub topics: `offline-docs`, `twitter-api`, `api-reference`
- Added npm keywords: `twitter-api`, `x-api`, `claude-mcp`, `twitter-docs`

---

## [1.0.15] - 2026-01-26

### Added
- 5 new endpoints: `update_avatar_v2`, `update_banner_v2`, `update_profile_v2`, `get_tweet_replies_v2`, `get_user_to_monitor_tweet`
- Deprecation notices for legacy endpoints (visible in endpoint data)

### Changed
- Total endpoints: 54 → 59
- Legacy endpoints (`login_by_2fa`, `login_by_email_or_username`, `create_tweet`, `like_tweet`, `retweet_tweet`, `upload_tweet_image`) now include deprecation notices pointing to v2 alternatives

---

## [1.0.14] - 2026-01-26

### Security
- Upgraded `@modelcontextprotocol/sdk` from 1.24.3 to 1.25.3 (fixes ReDoS vulnerability GHSA-8r9q-7v3j-jr4g)
- Upgraded `qs` from 6.14.0 to 6.14.1 (fixes arrayLimit bypass DoS GHSA-6rw7-vpxm-498p)

---

## [1.0.10] - 2025-12-26

### Added
- Auth metadata attached to `get_twitterapi_endpoint` outputs (`auth.header`, `auth.base_url`, etc.)
- Context7/README quick recipes for changelog, tweets lookup, auth, URL fallback, and search refine

### Changed
- Expanded disambiguation + retry guidance for `search_twitterapi_docs`
- Clarified canonical `get_twitterapi_guide` usage for “Changelogs”

---

## [1.0.9] - 2025-12-14

### Added
- New canonical npm package: `twitterapi-io-mcp`
- Legacy wrapper package: `packages/twitterapi-docs-mcp/` (keeps `twitterapi-docs-mcp` working)
- Optional `NPM_TOKEN` bootstrap path in publish workflow for first-time publish of `twitterapi-io-mcp`

### Changed
- MCP Registry manifest now points to `twitterapi-io-mcp` (`server.json`)
- README + contributor docs updated to recommend `twitterapi-io-mcp`
- Publish workflow now uses Node 22 + `npm@11.6.0` for stable OIDC trusted publishing

---

## [1.0.8] - 2025-12-13

### Added
- Blog key support in `get_twitterapi_url` (e.g., `blog_pricing_2025`)
- URL conveniences in `get_twitterapi_url`: accepts `http://` and `www.twitterapi.io` and normalizes to HTTPS
- Manual trigger (`workflow_dispatch`) for the npm publish workflow

### Changed
- npm publish workflow now uses provenance attestation (`npm publish --provenance`)

---

## [1.0.7] - 2025-12-13

### Added
- SEO-focused keywords for discoverability (`twitterapi.io`, `twitterapi-io-mcp`)

### Changed
- GitHub repo renamed to `dorukardahan/twitterapi-io-mcp` (old URLs redirect)
- Updated repository links across docs and metadata
- `context7.json` now targets `https://context7.com/dorukardahan/twitterapi-io-mcp`
- MCP Registry identifier updated to `io.github.dorukardahan/twitterapi-io-mcp`

---

## [1.0.6] - 2025-12-13

### Added
- Internal link crawling in `scrape-all.cjs` to capture non-sitemap pages (e.g., `terms`, `acceptable_use`, `dashboard`)
- URL conveniences in `get_twitterapi_url`: accepts page keys (e.g., `qps_limits`) and bare paths (e.g., `pricing`)
- Offline aliases for common docs redirects (`https://docs.twitterapi.io/`, `/api-reference`)

### Changed
- Improved HTML extraction in the scraper to handle nested tags more reliably
- Updated bundled snapshot (`data/docs.json`) to include more site pages and blog posts

### Fixed
- Scraper now fails fast on HTTP 4xx/5xx instead of saving error pages

---

## [1.0.5] - 2025-12-13

### Added
- `context7.json` for Context7 library ownership claim
- `get_twitterapi_url` tool to fetch any `twitterapi.io` / `docs.twitterapi.io` URL (snapshot-first, optional live fetch)
- Expanded snapshot coverage via `sitemap.xml` + blog index crawl (site pages + more blog posts)
- Additional resource aliases (`twitterapi://endpoints/list`, `twitterapi://status/freshness`)
- MCP protocol integration test to prevent `outputSchema` regressions

### Fixed
- MCP SDK compatibility: tools now return `structuredContent` when `outputSchema` is declared
- Scraper redirect handling for relative `Location` headers

### Changed
- `get_twitterapi_guide` now validates against dynamic page keys from `data/docs.json`

---

## [1.0.4] - 2025-12-05

### Added
- Dockerfile for container deployments (Glama.ai, Docker Hub)
- `.dockerignore` for optimized Docker builds
- MCP `completions` capability for mcp-proxy compatibility
- `build` script in package.json for CI/CD compatibility

### Fixed
- Glama.ai deployment compatibility (completions handler, build script)

---

## [1.0.3] - 2025-12-05

### Added
- `mcpName` field in package.json for MCP Registry compatibility
- MCP Registry support (`io.github.dorukardahan/twitterapi-docs-mcp`)

---

## [1.0.2] - 2025-12-05

### Added
- GitHub Actions workflow for automated npm publishing
- npm Trusted Publishing (OIDC) - token-free secure publishing
- Provenance attestation for supply chain security

### Changed
- Upgraded workflow to Node.js 24 (npm 11.6.0+ required for OIDC)
- Fixed test command for CI compatibility
- Cleaned up version strings in startup logs

---

## [1.0.0] - 2025-12-05

### Added

First public release. Previously developed internally as v3.3.0.

#### Tools (6 total)
- `search_twitterapi_docs` - Full-text search across all documentation with configurable `max_results` (1-10)
- `get_twitterapi_endpoint` - Get detailed info for a specific API endpoint
- `list_twitterapi_endpoints` - List all endpoints with optional category filter
- `get_twitterapi_guide` - Get guide pages (pricing, qps_limits, tweet_filter_rules, changelog, introduction, authentication, readme)
- `get_twitterapi_pricing` - Quick access to pricing information
- `get_twitterapi_auth` - Quick access to authentication guide

#### Resources (9 total)
- `twitterapi://guides/pricing` - Pricing guide
- `twitterapi://guides/qps-limits` - QPS limits guide
- `twitterapi://guides/filter-rules` - Tweet filter rules guide
- `twitterapi://guides/changelog` - API changelog
- `twitterapi://guides/introduction` - Introduction guide
- `twitterapi://guides/authentication` - Authentication guide
- `twitterapi://guides/readme` - README guide
- `twitterapi://endpoints/list` - Full endpoint listing
- `twitterapi://status/freshness` - Data freshness status

#### Features
- Advanced tokenization with camelCase/PascalCase support
- N-gram fuzzy matching for search
- Hybrid caching (memory + disk) with 24-hour TTL
- SLO latency tracking (<50ms target)
- Data freshness monitoring
- Structured logging with metrics
- Input validation with helpful error messages
- 48 unit tests

#### Documentation Coverage
- 52 API endpoints
- 8 guide pages
- 5 blog articles
- Offline-first design (no network required)

### Technical Details
- Pure ES Modules (no build step required)
- Node.js 18.18.0+ required
- Single dependency: @modelcontextprotocol/sdk

---

## Pre-1.0 Development History

Internal development versions (v1.0.0 - v3.3.0) included iterative improvements:

- **Phase 1**: Basic tools, search functionality, caching
- **Phase 2**: MCP Resources, advanced search, SLO tracking, data freshness monitoring
