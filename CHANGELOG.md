## [1.5.12](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.11...v1.5.12) (2026-07-31)


### Bug Fixes

* refresh locked transitive deps for audit ([227c527](https://github.com/dorukardahan/twitterapi-io-mcp/commit/227c5275f7996e42a2d21be6a6da1a692e52388a))

## [1.5.11](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.10...v1.5.11) (2026-06-28)


### Bug Fixes

* add user follower IDs endpoint ([85cb36b](https://github.com/dorukardahan/twitterapi-io-mcp/commit/85cb36bd61f31fd6816aefa70f83ba49ae841ed5))
* refresh locked transitive deps for audit ([aec28eb](https://github.com/dorukardahan/twitterapi-io-mcp/commit/aec28eb34645dbc1294522a344bf78dfde167452))
* refresh locked transitive deps for audit ([13ccc7a](https://github.com/dorukardahan/twitterapi-io-mcp/commit/13ccc7a9505be886eb0d0c6f1692cb28759533aa))
* restore npm@11 in release workflow ([3696f53](https://github.com/dorukardahan/twitterapi-io-mcp/commit/3696f533cb187ec1215ac78ee093824924b07d43))
* sync missing body params with live OpenAPI ([6cf8f73](https://github.com/dorukardahan/twitterapi-io-mcp/commit/6cf8f7385b83858e8d177dbf554d827fc8186dcd))

## Unreleased

### Bug Fixes

* add live OpenAPI endpoint `GET /twitter/user/followers_ids` to `data/docs.json` (68 total endpoints)
* refresh locked transitive dependencies to clear `npm audit --audit-level=high` findings

## [1.5.10](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.9...v1.5.10) (2026-04-27)


### Bug Fixes

* sync body parameter placement with live OpenAPI ([8f45a44](https://github.com/dorukardahan/twitterapi-io-mcp/commit/8f45a44905e094b21e51f01b64f9e1ce1a538e07))

## [1.5.9](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.8...v1.5.9) (2026-04-25)


### Bug Fixes

* sync live OpenAPI write params ([4a9f8b4](https://github.com/dorukardahan/twitterapi-io-mcp/commit/4a9f8b4ef02c69e964634d780dae52a77a656a27))

## [1.5.8](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.7...v1.5.8) (2026-04-21)


### Bug Fixes

* sync OpenAPI auth fields and multipart metadata ([255fcf9](https://github.com/dorukardahan/twitterapi-io-mcp/commit/255fcf9ec433724f7e3ab7da3fc0529819f2cf4d))

## Unreleased

### Bug Fixes

* sync 15 missing request-body parameter arrays in `data/docs.json` with the live OpenAPI (`user_login_v2`, V2 actions, list member actions, webhook rule add, stream monitor add/remove)
* sync `create_tweet_v2`, `send_dm_to_user`, and `upload_image` request params with the live OpenAPI
* sync body/query placement for `delete_rule`, `update_rule`, `delete_community_v2`, `update_avatar_v2`, `update_banner_v2`, `update_profile_v2`, and `upload_media_v2`
* add `npm audit --audit-level=high` back to `prepublishOnly` and pin transitive `npm` to 11.13.0 via `overrides`
* restore explicit `npm@11` in release and publish GitHub Actions jobs

## [1.5.7](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.6...v1.5.7) (2026-04-19)


### Bug Fixes

* use npm@11 instead of hardcoded npm@11.6.0 in publish.yml ([effa047](https://github.com/dorukardahan/twitterapi-io-mcp/commit/effa047ad21ff2f661d32bba68f79595de081256))

## [1.5.6](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.5...v1.5.6) (2026-04-14)


### Bug Fixes

* **ci:** remove npm audit from prepublishOnly (transitive CVEs block publish) ([cd9945d](https://github.com/dorukardahan/twitterapi-io-mcp/commit/cd9945d09a7e9c5ac398de031e1bf3d639980f3e))

## [1.5.5](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.4...v1.5.5) (2026-04-14)


### Bug Fixes

* **ci:** remove broken npm upgrade step on Node 22.22.2 toolcache ([fdc39f9](https://github.com/dorukardahan/twitterapi-io-mcp/commit/fdc39f954719b1bfa636f37e5ba421c0715cea41))

## [1.5.4](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.3...v1.5.4) (2026-04-14)


### Bug Fixes

* **ci:** use npm@latest instead of npm@11 to avoid MODULE_NOT_FOUND promise-retry ([1ce75ce](https://github.com/dorukardahan/twitterapi-io-mcp/commit/1ce75cefcbaf7a30fe4baa25872654f989bf6732))

## [1.5.3](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.2...v1.5.3) (2026-04-14)


### Bug Fixes

* recommend since_time/until_time over since/until in advanced_search ([3ec2d5a](https://github.com/dorukardahan/twitterapi-io-mcp/commit/3ec2d5a268f8d54711d1ae8550ff2669ca40592c))

## [1.5.2](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.1...v1.5.2) (2026-04-13)


### Bug Fixes

* tighten release hygiene ([96c5826](https://github.com/dorukardahan/twitterapi-io-mcp/commit/96c5826c937fa77cb1a42c6f2d76c4e65e33f505))

## 1.5.2

- fix: add audit to prepublishOnly and include CHANGELOG.md in package files
- fix: relax CI npm upgrade from pinned npm@11.6.0 to npm@11

## [1.5.1](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.5.0...v1.5.1) (2026-04-11)


### Bug Fixes

* add missing body/parameters docs for 9 endpoints ([a38ab91](https://github.com/dorukardahan/twitterapi-io-mcp/commit/a38ab9133e8f282d82573cd87b8b4b8b4903210e))

# [1.5.0](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.4.1...v1.5.0) (2026-04-10)


### Features

* add 9 active openapi endpoints ([7cd9646](https://github.com/dorukardahan/twitterapi-io-mcp/commit/7cd964644e05fe0fd4ea1c3d01ef7de951ce98c0))

## [1.4.1](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.4.0...v1.4.1) (2026-03-21)


### Bug Fixes

* remove offline V3 endpoints ([1741ede](https://github.com/dorukardahan/twitterapi-io-mcp/commit/1741edea7dca70f6538eb4fe850a3b5b014443b2))

# [1.4.0](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.3.2...v1.4.0) (2026-03-20)


### Features

* remove 7 offline endpoints from docs.json (58 total) ([215dea6](https://github.com/dorukardahan/twitterapi-io-mcp/commit/215dea6e78eb143e90903ace90cc09fd19e15c69))

## [1.3.2](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.3.1...v1.3.2) (2026-03-17)


### Bug Fixes

* add missing params for delete_community, update_rule, delete_rule in docs.json ([9988259](https://github.com/dorukardahan/twitterapi-io-mcp/commit/9988259565558fb7cb9925f7f7b107d7ad55f526))

## [1.3.1](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.3.0...v1.3.1) (2026-03-17)


### Bug Fixes

* correct avatar/banner to multipart/form-data upload, add update_profile params and bug note ([4284789](https://github.com/dorukardahan/twitterapi-io-mcp/commit/4284789b87348ea9079594c113d9d706e5ac2fb2))

# [1.3.0](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.2.0...v1.3.0) (2026-03-17)


### Features

* add 4 missing endpoints to docs.json, update README count to 58 ([6b0b9a9](https://github.com/dorukardahan/twitterapi-io-mcp/commit/6b0b9a909f4b07f9321cdc40b71e59f202f6a318))

# [1.2.0](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.8...v1.2.0) (2026-03-16)


### Features

* rewrite scraper to OpenAPI-first approach (v3.0) ([19a7992](https://github.com/dorukardahan/twitterapi-io-mcp/commit/19a7992c8602a67557dae7cd000470bc3f2b6c8f))

## [1.1.8](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.7...v1.1.8) (2026-03-15)


### Bug Fixes

* correct package version to 1.1.7 and update npm README ([0a6e2e6](https://github.com/dorukardahan/twitterapi-io-mcp/commit/0a6e2e644a2def3a451afe470e863c57a298b090))

# 1.0.0 (2026-03-15)


### Bug Fixes

* add CI/CD notes to CLAUDE.md for token expiry awareness ([d945b99](https://github.com/dorukardahan/twitterapi-io-mcp/commit/d945b99250bad0dd65b003b3850741a3ec0ebb38))
* add npm upgrade step for automation token compatibility ([6b8e926](https://github.com/dorukardahan/twitterapi-io-mcp/commit/6b8e92602ce1d23c233522523acf9610f8e29809))
* run MCP registry publish after npm publish to avoid 404 race condition ([85cb9ee](https://github.com/dorukardahan/twitterapi-io-mcp/commit/85cb9ee00deeb85f47eaaf8fa63c8c4bcf8e62cd))
* unified release pipeline — semantic-release handles npm + registry + GitHub release ([da9e0e1](https://github.com/dorukardahan/twitterapi-io-mcp/commit/da9e0e15f133f4189a87915065e0c1687bb2f7da))
* update dependencies to resolve security vulnerabilities ([0280f4a](https://github.com/dorukardahan/twitterapi-io-mcp/commit/0280f4a96dc420f7683c14a7e4aa0fac2ccbb7ae))
* update npm package README with correct endpoint table and version info ([f4eb7ea](https://github.com/dorukardahan/twitterapi-io-mcp/commit/f4eb7ea683cfceab4088dc2bb4a8bd742014a412))
* update server.json version to 1.1.0 for MCP registry publish ([372fdab](https://github.com/dorukardahan/twitterapi-io-mcp/commit/372fdabda7974b93fd28bbfee56e33e3b7104ed2))
* use NPM_TOKEN for npm publish instead of OIDC (2FA-protected account) ([3e9573f](https://github.com/dorukardahan/twitterapi-io-mcp/commit/3e9573f06401f70122b3e187b82148f680f96921))


### Features

* add semantic-release for automated versioning and publishing ([5c07067](https://github.com/dorukardahan/twitterapi-io-mcp/commit/5c07067649ffff3c362d7f39ffe0bdb57d7431bd))
* add Twitter platform advisory for search operator degradation (v1.0.23) ([0c99ab2](https://github.com/dorukardahan/twitterapi-io-mcp/commit/0c99ab209a195f1f4d5b31d5426f8935c65f4ba2))
* sync endpoints with live API docs — add 2 new, remove 7 deprecated ([838d453](https://github.com/dorukardahan/twitterapi-io-mcp/commit/838d4533044e032170a06a8cc112bd61839f45e8))

# 1.0.0 (2026-03-15)


### Bug Fixes

* add CI/CD notes to CLAUDE.md for token expiry awareness ([d945b99](https://github.com/dorukardahan/twitterapi-io-mcp/commit/d945b99250bad0dd65b003b3850741a3ec0ebb38))
* add npm upgrade step for automation token compatibility ([6b8e926](https://github.com/dorukardahan/twitterapi-io-mcp/commit/6b8e92602ce1d23c233522523acf9610f8e29809))
* run MCP registry publish after npm publish to avoid 404 race condition ([85cb9ee](https://github.com/dorukardahan/twitterapi-io-mcp/commit/85cb9ee00deeb85f47eaaf8fa63c8c4bcf8e62cd))
* unified release pipeline — semantic-release handles npm + registry + GitHub release ([da9e0e1](https://github.com/dorukardahan/twitterapi-io-mcp/commit/da9e0e15f133f4189a87915065e0c1687bb2f7da))
* update dependencies to resolve security vulnerabilities ([0280f4a](https://github.com/dorukardahan/twitterapi-io-mcp/commit/0280f4a96dc420f7683c14a7e4aa0fac2ccbb7ae))
* update server.json version to 1.1.0 for MCP registry publish ([372fdab](https://github.com/dorukardahan/twitterapi-io-mcp/commit/372fdabda7974b93fd28bbfee56e33e3b7104ed2))
* use NPM_TOKEN for npm publish instead of OIDC (2FA-protected account) ([3e9573f](https://github.com/dorukardahan/twitterapi-io-mcp/commit/3e9573f06401f70122b3e187b82148f680f96921))


### Features

* add semantic-release for automated versioning and publishing ([5c07067](https://github.com/dorukardahan/twitterapi-io-mcp/commit/5c07067649ffff3c362d7f39ffe0bdb57d7431bd))
* add Twitter platform advisory for search operator degradation (v1.0.23) ([0c99ab2](https://github.com/dorukardahan/twitterapi-io-mcp/commit/0c99ab209a195f1f4d5b31d5426f8935c65f4ba2))
* sync endpoints with live API docs — add 2 new, remove 7 deprecated ([838d453](https://github.com/dorukardahan/twitterapi-io-mcp/commit/838d4533044e032170a06a8cc112bd61839f45e8))

# 1.0.0 (2026-03-15)


### Bug Fixes

* add CI/CD notes to CLAUDE.md for token expiry awareness ([d945b99](https://github.com/dorukardahan/twitterapi-io-mcp/commit/d945b99250bad0dd65b003b3850741a3ec0ebb38))
* add npm upgrade step for automation token compatibility ([6b8e926](https://github.com/dorukardahan/twitterapi-io-mcp/commit/6b8e92602ce1d23c233522523acf9610f8e29809))
* run MCP registry publish after npm publish to avoid 404 race condition ([85cb9ee](https://github.com/dorukardahan/twitterapi-io-mcp/commit/85cb9ee00deeb85f47eaaf8fa63c8c4bcf8e62cd))
* unified release pipeline — semantic-release handles npm + registry + GitHub release ([da9e0e1](https://github.com/dorukardahan/twitterapi-io-mcp/commit/da9e0e15f133f4189a87915065e0c1687bb2f7da))
* update dependencies to resolve security vulnerabilities ([0280f4a](https://github.com/dorukardahan/twitterapi-io-mcp/commit/0280f4a96dc420f7683c14a7e4aa0fac2ccbb7ae))
* update server.json version to 1.1.0 for MCP registry publish ([372fdab](https://github.com/dorukardahan/twitterapi-io-mcp/commit/372fdabda7974b93fd28bbfee56e33e3b7104ed2))
* use NPM_TOKEN for npm publish instead of OIDC (2FA-protected account) ([3e9573f](https://github.com/dorukardahan/twitterapi-io-mcp/commit/3e9573f06401f70122b3e187b82148f680f96921))


### Features

* add semantic-release for automated versioning and publishing ([5c07067](https://github.com/dorukardahan/twitterapi-io-mcp/commit/5c07067649ffff3c362d7f39ffe0bdb57d7431bd))
* add Twitter platform advisory for search operator degradation (v1.0.23) ([0c99ab2](https://github.com/dorukardahan/twitterapi-io-mcp/commit/0c99ab209a195f1f4d5b31d5426f8935c65f4ba2))
* sync endpoints with live API docs — add 2 new, remove 7 deprecated ([838d453](https://github.com/dorukardahan/twitterapi-io-mcp/commit/838d4533044e032170a06a8cc112bd61839f45e8))

## [1.1.6](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.5...v1.1.6) (2026-03-14)


### Bug Fixes

* run MCP registry publish after npm publish to avoid 404 race condition ([d043d29](https://github.com/dorukardahan/twitterapi-io-mcp/commit/d043d29097dd72147a3fce573ba3540d7d1d1a51))

## [1.1.5](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.4...v1.1.5) (2026-03-14)


### Bug Fixes

* add CI/CD notes to CLAUDE.md for token expiry awareness ([8ddc15d](https://github.com/dorukardahan/twitterapi-io-mcp/commit/8ddc15d62386203460d3b57bb87de3ee7831f3cf))

## [1.1.4](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.3...v1.1.4) (2026-03-14)


### Bug Fixes

* add npm upgrade step for automation token compatibility ([12b3eed](https://github.com/dorukardahan/twitterapi-io-mcp/commit/12b3eede2e4ad39601ffb870a022278e2f8870ea))

## [1.1.3](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.2...v1.1.3) (2026-03-14)


### Bug Fixes

* use NPM_TOKEN for npm publish instead of OIDC (2FA-protected account) ([89c549b](https://github.com/dorukardahan/twitterapi-io-mcp/commit/89c549bb40939a87548a7c1bb3d41efef0f7e7d6))

## [1.1.2](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.1...v1.1.2) (2026-03-14)


### Bug Fixes

* unified release pipeline — semantic-release handles npm + registry + GitHub release ([5f272c7](https://github.com/dorukardahan/twitterapi-io-mcp/commit/5f272c7a4896e65fbee7abe578460d1f59862648))

## [1.1.1](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.1.0...v1.1.1) (2026-03-14)


### Bug Fixes

* update server.json version to 1.1.0 for MCP registry publish ([60008cc](https://github.com/dorukardahan/twitterapi-io-mcp/commit/60008cc994565b1c7a985d8ec6d6e2afea644c9a))

# [1.1.0](https://github.com/dorukardahan/twitterapi-io-mcp/compare/v1.0.22...v1.1.0) (2026-03-14)


### Bug Fixes

* handle 409 Conflict in MCP Registry publish (idempotent re-releases) ([476b270](https://github.com/dorukardahan/twitterapi-io-mcp/commit/476b270ce89e0256b1cc67cbdec5666556b198ec))
* update dependencies to resolve security vulnerabilities ([d61013e](https://github.com/dorukardahan/twitterapi-io-mcp/commit/d61013ea4845f0441a0f902059eed839d3bca3dd))


### Features

* add semantic-release for automated versioning and publishing ([f9aa0d4](https://github.com/dorukardahan/twitterapi-io-mcp/commit/f9aa0d4c5b4eccc0bf1b29cf96754baad1617dc5))
* add Twitter platform advisory for search operator degradation (v1.0.23) ([7c2b784](https://github.com/dorukardahan/twitterapi-io-mcp/commit/7c2b784071f10d700fe2823a05f34ec0d6da79a1))
* sync endpoints with live API docs — add 2 new, remove 7 deprecated ([b9d0d37](https://github.com/dorukardahan/twitterapi-io-mcp/commit/b9d0d370a9290e723317e09b10b43f4bbb7f3980))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.24] - 2026-03-14

### Added
- `list_timeline` - Get List Tweet TimeLine
- `get_user_timeline` - Get User TimeLine

### Removed
- 6 deprecated V1 endpoints: `create_tweet`, `like_tweet`, `retweet_tweet`, `login_by_email_or_username`, `login_by_2fa`, `upload_tweet_image`
- `get_dm_history_by_user_id` removed from live docs

### Changed
- Total endpoints: 59 → 54

### Fixed
- Security: updated hono 4.11.9 → 4.12.8 (5 CVEs), @hono/node-server → 1.19.11, ajv → 8.18.0, express-rate-limit → 8.3.1

### Infrastructure
- Added semantic-release for automated versioning, changelog, and GitHub releases
- Added `.releaserc.json` configuration
- Added `.github/workflows/release.yml` — triggers on push to main

## [1.0.23] - 2026-03-08

### Added
- Platform advisory document: `docs/platform-advisory-2026-03.md`
  - Twitter disabled `since:` / `until:` search operators (~Mar 5, 2026)
  - Search pagination broken (returns same page repeatedly)
  - Documented working workaround: `since_time:UNIX` / `until_time:UNIX` format
  - Documented `within_time:Nh` relative time filter
  - Webhook URL not auto-restored after API key rotation warning
  - Timeline of events (Mar 3-8, 2026)

## [1.0.22] - 2026-02-21

### Added
- 7 new endpoints (52 → 59 total):
  - `get_space_detail` — Twitter Spaces detail
  - `get_tweet_replies_v2` — Tweet replies V2 with sort options (Relevance/Latest/Likes)
  - `get_user_about` — User profile about section
  - `get_user_to_monitor_tweet` — List monitored users
  - `update_avatar_v2` — Update profile avatar
  - `update_banner_v2` — Update profile banner
  - `update_profile_v2` — Update profile info

### Changed
- Fresh rescrape from docs.twitterapi.io (Feb 21, 2026)
- All 59 endpoints now match official llms.txt index

## [1.0.19] - 2026-02-09

### Fixed
- All 56 endpoints now have explicit HTTP method field (was missing for most)
- Search tool crash on object-format parameters (`normalizeParams()`)
- Parameter display in `get_twitterapi_endpoint` for both array and object formats
- Scraper post-processing: method, body params, and query params now auto-extracted from curl/raw_text

### Added
- Body parameters for all 26 write endpoints (POST/PATCH/DELETE)
- Query parameters for 27 GET endpoints
- Deprecation notices for 4 legacy v1 endpoints (create_tweet, like_tweet, login_by_2fa, login_by_email_or_username)
- `get_trends` endpoint parameters (woeid, count)
- Post-processing step in scraper for automatic method/body/params extraction

### Changed
- Fresh rescrape of all 56 endpoints, 32 pages, 24 blog posts from docs.twitterapi.io
- `upload_media_v2` correctly documented as multipart/form-data (not JSON)

## [1.0.18] - 2026-02-02

### Fixed
- Legacy wrapper CI publish step now includes NPM_TOKEN fallback for token-based authentication

### Added
- Comprehensive 5-client migration guide in legacy wrapper README (Claude Code, Claude Desktop, Cursor, VS Code, Windsurf)
- Deprecated legacy wrapper entry in `server.json` packages array
- Linux config path for Claude Desktop in legacy wrapper README
- "Previously published as twitterapi-docs-mcp" note in root README

### Changed
- **README full rewrite**: New structure matching top MCP server best practices
- Added installation blocks for Cursor, VS Code, and Windsurf (was only Claude Code + Claude Desktop)
- Added "Best for" column to Available Tools table
- Added "What can you ask?" section with real prompt examples and expected tool triggers
- Wrapped 59-endpoint category table in collapsible `<details>` to reduce scroll
- Added Troubleshooting / FAQ section (npx issues, Node version, missing tools)
- Merged "Technical Details" into "How it works" section
- Removed excessive horizontal rules (12 down to 0)
- Humanized "Why I built this" section with more personality
- Added Docker installation option

### Added
- Smithery badge and GitHub stars badge
- `llms.txt` file for LLM discoverability (not included in npm package)
- 7 new npm keywords: `mcp-server`, `claude-desktop`, `tweet-search`, `social-media-api`, `twitter-data`, `cursor-mcp`, `windsurf-mcp`

### Removed
- Node.js badge from README header (info moved to "How it works" table)
- MCP Registry badge (replaced with Smithery badge)

---

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
