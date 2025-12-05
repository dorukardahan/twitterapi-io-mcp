#!/usr/bin/env node
/**
 * TwitterAPI.io Documentation MCP Server v1.0.2
 *
 * Production-ready MCP server with:
 * - Comprehensive error handling with ErrorType classification
 * - Input validation for all tools
 * - Structured logging with metrics
 * - LLM-optimized tool descriptions with output schemas
 * - Performance monitoring with SLO tracking
 * - Hybrid cache (memory + disk) for search and endpoints
 * - MCP Resources for static guide access
 * - Data freshness monitoring
 *
 * v3.3 Improvements (Phase 2):
 * - max_results parameter for search (1-20, default 10)
 * - Advanced tokenization with camelCase support
 * - Per-tool latency SLO tracking with alerts
 * - Enhanced MCP Resources for static guides
 * - Data freshness monitoring (24h staleness warning)
 *
 * v3.2 Improvements:
 * - Output schemas for all tools (helps LLM parse responses)
 *
 * v3.1 Improvements:
 * - HybridCache with LRU eviction and TTL expiry
 * - Memory-first caching with disk persistence for stdio MCP
 * - Automatic hourly cache cleanup
 * - Cache stats in metrics resource
 *
 * v3.0 Improvements:
 * - Error handling with suggestions for LLM
 * - Input validation (query length, pattern matching)
 * - Structured logging with latency tracking
 * - Better tool descriptions for LLM decision making
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = path.join(__dirname, "data", "docs.json");

// ========== ERROR HANDLING ==========
const ErrorType = {
  INPUT_VALIDATION: 'input_validation',
  NOT_FOUND: 'not_found',
  INTERNAL_ERROR: 'internal_error',
  TIMEOUT: 'timeout',
};

function formatToolError(error) {
  return {
    content: [{
      type: 'text',
      text: `Error: ${error.message}${error.suggestion ? '\n\nSuggestion: ' + error.suggestion : ''}`
    }],
    isError: true
  };
}

function formatToolSuccess(text) {
  return {
    content: [{ type: 'text', text }],
    isError: false
  };
}

// ========== STRUCTURED LOGGING ==========
const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

// Service Level Objectives (SLOs) - latency targets in ms
const SLO = {
  search_twitterapi_docs: { target: 50, acceptable: 100, alert: 200 },
  get_twitterapi_endpoint: { target: 10, acceptable: 50, alert: 100 },
  list_twitterapi_endpoints: { target: 5, acceptable: 20, alert: 50 },
  get_twitterapi_guide: { target: 10, acceptable: 50, alert: 100 },
  get_twitterapi_pricing: { target: 5, acceptable: 20, alert: 50 },
  get_twitterapi_auth: { target: 5, acceptable: 20, alert: 50 }
};

class Logger {
  constructor() {
    this.logs = [];
    this.MAX_LOGS = 10000;
    this.metrics = {
      requests: { total: 0, successful: 0, failed: 0, totalLatency: 0 },
      cache: { hits: 0, misses: 0 },
      tools: {},
      sloViolations: { target: 0, acceptable: 0, alert: 0 }
    };
  }

  log(level, component, message, data = null) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      data
    };

    this.logs.push(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.shift();
    }

    // Output to stderr (MCP standard - stdout is for protocol)
    const prefix = `[${entry.timestamp}] [${level}] [${component}]`;
    console.error(`${prefix} ${message}`, data ? JSON.stringify(data) : '');
  }

  info(component, message, data) {
    this.log(LogLevel.INFO, component, message, data);
  }

  warn(component, message, data) {
    this.log(LogLevel.WARN, component, message, data);
  }

  error(component, message, error) {
    this.log(LogLevel.ERROR, component, message, {
      error: error?.message,
      stack: error?.stack?.split('\n').slice(0, 3)
    });
  }

  recordToolCall(toolName, duration, success) {
    this.metrics.requests.total++;
    this.metrics.requests.totalLatency += duration;

    if (success) {
      this.metrics.requests.successful++;
    } else {
      this.metrics.requests.failed++;
    }

    if (!this.metrics.tools[toolName]) {
      this.metrics.tools[toolName] = {
        calls: 0,
        errors: 0,
        totalDuration: 0,
        minLatency: Infinity,
        maxLatency: 0,
        sloViolations: { target: 0, acceptable: 0, alert: 0 }
      };
    }

    const tool = this.metrics.tools[toolName];
    tool.calls++;
    tool.totalDuration += duration;
    tool.minLatency = Math.min(tool.minLatency, duration);
    tool.maxLatency = Math.max(tool.maxLatency, duration);

    if (!success) {
      tool.errors++;
    }

    // Track SLO violations
    const slo = SLO[toolName];
    if (slo) {
      if (duration > slo.alert) {
        tool.sloViolations.alert++;
        this.metrics.sloViolations.alert++;
        this.warn('slo', `ALERT: ${toolName} exceeded alert threshold`, {
          duration,
          threshold: slo.alert,
          severity: 'alert'
        });
      } else if (duration > slo.acceptable) {
        tool.sloViolations.acceptable++;
        this.metrics.sloViolations.acceptable++;
        this.warn('slo', `${toolName} exceeded acceptable threshold`, {
          duration,
          threshold: slo.acceptable,
          severity: 'acceptable'
        });
      } else if (duration > slo.target) {
        tool.sloViolations.target++;
        this.metrics.sloViolations.target++;
      }
    }
  }

  recordCacheHit() {
    this.metrics.cache.hits++;
  }

  recordCacheMiss() {
    this.metrics.cache.misses++;
  }

  getMetrics(cacheStats = null, dataFreshness = null) {
    const avgLatency = this.metrics.requests.total > 0
      ? Math.round(this.metrics.requests.totalLatency / this.metrics.requests.total)
      : 0;

    const cacheTotal = this.metrics.cache.hits + this.metrics.cache.misses;
    const cacheHitRate = cacheTotal > 0
      ? (this.metrics.cache.hits / cacheTotal * 100).toFixed(1)
      : 0;

    const result = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      requests: {
        ...this.metrics.requests,
        averageLatency: avgLatency
      },
      cache: {
        ...this.metrics.cache,
        hitRate: `${cacheHitRate}%`
      },
      sloViolations: this.metrics.sloViolations,
      tools: Object.entries(this.metrics.tools).reduce((acc, [tool, data]) => {
        const slo = SLO[tool];
        acc[tool] = {
          calls: data.calls,
          errors: data.errors,
          latency: {
            avg: Math.round(data.totalDuration / data.calls),
            min: data.minLatency === Infinity ? 0 : data.minLatency,
            max: data.maxLatency
          },
          slo: slo ? {
            target: `${slo.target}ms`,
            acceptable: `${slo.acceptable}ms`,
            alert: `${slo.alert}ms`,
            violations: data.sloViolations
          } : null
        };
        return acc;
      }, {})
    };

    // Add hybrid cache stats if provided
    if (cacheStats) {
      result.hybridCaches = cacheStats;
    }

    // Add data freshness if provided
    if (dataFreshness) {
      result.dataFreshness = dataFreshness;
    }

    return result;
  }
}

const logger = new Logger();

// ========== HYBRID CACHE ==========
const CACHE_DIR = path.join(__dirname, "cache");

class HybridCache {
  constructor(name, options = {}) {
    this.name = name;
    this.memory = new Map();
    this.MAX_MEMORY = options.maxEntries || 500;
    this.DEFAULT_TTL = options.ttl || 24 * 60 * 60 * 1000; // 24 hours
    this.DISK_WRITE_PROBABILITY = options.diskWriteProbability || 0.1; // 10% disk writes
    this.diskDir = path.join(CACHE_DIR, name);
    this.ensureDir();
  }

  ensureDir() {
    try {
      if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
      }
      if (!fs.existsSync(this.diskDir)) {
        fs.mkdirSync(this.diskDir, { recursive: true });
      }
    } catch (err) {
      logger.warn('cache', `Failed to create cache directory: ${err.message}`);
    }
  }

  normalizeKey(key) {
    return key.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 100);
  }

  isExpired(entry) {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  get(key) {
    const normalized = this.normalizeKey(key);

    // Check memory first
    const memEntry = this.memory.get(normalized);
    if (memEntry && !this.isExpired(memEntry)) {
      logger.recordCacheHit();
      return memEntry.value;
    }
    this.memory.delete(normalized);

    // Check disk
    try {
      const diskPath = path.join(this.diskDir, `${normalized}.json`);
      if (fs.existsSync(diskPath)) {
        const diskEntry = JSON.parse(fs.readFileSync(diskPath, 'utf-8'));
        if (!this.isExpired(diskEntry)) {
          // Restore to memory
          this.memory.set(normalized, diskEntry);
          logger.recordCacheHit();
          logger.info('cache', `Restored from disk: ${this.name}/${normalized}`);
          return diskEntry.value;
        }
        // Clean up expired disk entry
        fs.unlinkSync(diskPath);
      }
    } catch (err) {
      // Disk read failed, continue gracefully
    }

    logger.recordCacheMiss();
    return null;
  }

  set(key, value, ttl = this.DEFAULT_TTL) {
    const normalized = this.normalizeKey(key);

    const entry = {
      key: normalized,
      value,
      timestamp: Date.now(),
      ttl
    };

    // Store in memory
    this.memory.set(normalized, entry);
    logger.info('cache', `Memory write: ${this.name}/${normalized}`, {
      diskProb: this.DISK_WRITE_PROBABILITY
    });

    // Evict oldest if over capacity (LRU-like)
    if (this.memory.size > this.MAX_MEMORY) {
      const oldestKey = this.memory.keys().next().value;
      this.memory.delete(oldestKey);
    }

    // Write to disk (always for stdio MCP servers)
    if (Math.random() < this.DISK_WRITE_PROBABILITY) {
      this.writeToDisk(normalized, entry);
    }
  }

  writeToDisk(key, entry) {
    try {
      const diskPath = path.join(this.diskDir, `${key}.json`);
      fs.writeFileSync(diskPath, JSON.stringify(entry, null, 2));
      logger.info('cache', `Disk write success: ${this.name}/${key}`);
    } catch (err) {
      logger.warn('cache', `Disk write failed: ${err.message}`, { path: this.diskDir, key });
    }
  }

  cleanup() {
    let memoryCleared = 0;
    let diskCleared = 0;

    // Memory cleanup
    for (const [key, entry] of this.memory.entries()) {
      if (this.isExpired(entry)) {
        this.memory.delete(key);
        memoryCleared++;
      }
    }

    // Disk cleanup
    try {
      const files = fs.readdirSync(this.diskDir);
      for (const file of files) {
        try {
          const diskPath = path.join(this.diskDir, file);
          const entry = JSON.parse(fs.readFileSync(diskPath, 'utf-8'));
          if (this.isExpired(entry)) {
            fs.unlinkSync(diskPath);
            diskCleared++;
          }
        } catch (err) {
          // Skip invalid files
        }
      }
    } catch (err) {
      // Disk cleanup failed, continue
    }

    if (memoryCleared > 0 || diskCleared > 0) {
      logger.info('cache', `Cleanup: ${memoryCleared} memory, ${diskCleared} disk entries removed`);
    }
  }

  stats() {
    let diskEntries = 0;
    try {
      diskEntries = fs.readdirSync(this.diskDir).length;
    } catch (err) {
      // Ignore
    }

    return {
      name: this.name,
      memoryEntries: this.memory.size,
      diskEntries,
      maxMemory: this.MAX_MEMORY
    };
  }
}

// Initialize caches
// Note: For stdio MCP servers (spawned per-call), use higher disk probability
// Memory cache is within-session, disk cache persists across sessions
const searchCache = new HybridCache('search', {
  maxEntries: 200,
  ttl: 6 * 60 * 60 * 1000,  // 6 hours for search
  diskWriteProbability: 1.0  // Always write to disk for stdio MCP
});
const endpointCache = new HybridCache('endpoints', {
  maxEntries: 100,
  ttl: 24 * 60 * 60 * 1000,  // 24 hours for endpoints
  diskWriteProbability: 1.0  // Always write to disk for stdio MCP
});

// Periodic cleanup (every hour)
let cleanupInterval = null;
function startCacheCleanup() {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(() => {
    searchCache.cleanup();
    endpointCache.cleanup();
  }, 60 * 60 * 1000); // 1 hour
}

function stopCacheCleanup() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

function getAllCacheStats() {
  return {
    search: searchCache.stats(),
    endpoints: endpointCache.stats()
  };
}

// ========== INPUT VALIDATION ==========
const VALIDATION = {
  QUERY_MAX_LENGTH: 500,
  QUERY_MIN_LENGTH: 1,
  ENDPOINT_PATTERN: /^[a-zA-Z0-9_\-]+$/,
  GUIDE_NAMES: ['pricing', 'qps_limits', 'tweet_filter_rules', 'changelog', 'introduction', 'authentication', 'readme'],
  CATEGORIES: ['user', 'tweet', 'community', 'webhook', 'stream', 'action', 'dm', 'list', 'trend', 'other']
};

function validateQuery(query) {
  if (!query || typeof query !== 'string') {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: 'Query cannot be empty',
        suggestion: 'Try: "user info", "advanced search", "rate limits", "webhook"',
        retryable: false
      }
    };
  }

  const trimmed = query.trim();

  if (trimmed.length < VALIDATION.QUERY_MIN_LENGTH) {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: 'Query too short',
        suggestion: 'Enter at least 1 character. Examples: "tweet", "user", "search"',
        retryable: false
      }
    };
  }

  if (trimmed.length > VALIDATION.QUERY_MAX_LENGTH) {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: `Query too long (${trimmed.length} chars, max ${VALIDATION.QUERY_MAX_LENGTH})`,
        suggestion: 'Use fewer, more specific keywords',
        retryable: false
      }
    };
  }

  return { valid: true, value: trimmed };
}

function validateEndpointName(name) {
  if (!name || typeof name !== 'string') {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: 'Endpoint name cannot be empty',
        suggestion: 'Use list_twitterapi_endpoints to see available endpoints',
        retryable: false
      }
    };
  }

  const trimmed = name.trim();

  if (!VALIDATION.ENDPOINT_PATTERN.test(trimmed)) {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: 'Invalid endpoint name format',
        suggestion: 'Use format like: get_user_info, tweet_advanced_search, add_webhook_rule',
        retryable: false
      }
    };
  }

  return { valid: true, value: trimmed };
}

function validateGuideName(name) {
  if (!name || typeof name !== 'string') {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: 'Guide name cannot be empty',
        suggestion: `Available guides: ${VALIDATION.GUIDE_NAMES.join(', ')}`,
        retryable: false
      }
    };
  }

  const trimmed = name.trim().toLowerCase();

  if (!VALIDATION.GUIDE_NAMES.includes(trimmed)) {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: `Unknown guide: "${trimmed}"`,
        suggestion: `Available guides: ${VALIDATION.GUIDE_NAMES.join(', ')}`,
        retryable: false
      }
    };
  }

  return { valid: true, value: trimmed };
}

function validateCategory(category) {
  if (!category) {
    return { valid: true, value: null }; // Optional parameter
  }

  const trimmed = category.trim().toLowerCase();

  if (!VALIDATION.CATEGORIES.includes(trimmed)) {
    return {
      valid: false,
      error: {
        type: ErrorType.INPUT_VALIDATION,
        message: `Unknown category: "${trimmed}"`,
        suggestion: `Available categories: ${VALIDATION.CATEGORIES.join(', ')}`,
        retryable: false
      }
    };
  }

  return { valid: true, value: trimmed };
}

// ========== DATA LOADING ==========
let cachedDocs = null;
let lastModified = 0;

// Data freshness configuration
const DATA_FRESHNESS = {
  WARNING_THRESHOLD: 24 * 60 * 60 * 1000,  // 24 hours
  STALE_THRESHOLD: 72 * 60 * 60 * 1000,     // 72 hours
};

function loadDocs() {
  try {
    const stat = fs.statSync(DOCS_PATH);
    const mtime = stat.mtimeMs;

    if (!cachedDocs || mtime > lastModified) {
      logger.info('docs_loader', 'Loading documentation from disk');
      const content = fs.readFileSync(DOCS_PATH, "utf-8");
      cachedDocs = JSON.parse(content);
      lastModified = mtime;
      logger.recordCacheMiss();

      const endpointCount = Object.keys(cachedDocs.endpoints || {}).length;
      const pageCount = Object.keys(cachedDocs.pages || {}).length;
      logger.info('docs_loader', 'Documentation loaded', { endpoints: endpointCount, pages: pageCount });
    } else {
      logger.recordCacheHit();
    }

    return cachedDocs;
  } catch (err) {
    logger.error('docs_loader', 'Failed to load documentation', err);
    return { endpoints: {}, pages: {}, blogs: {}, authentication: {}, meta: {} };
  }
}

/**
 * Get data freshness information
 * Returns object with age, status (fresh/warning/stale), and human-readable age
 */
function getDataFreshness() {
  try {
    const stat = fs.statSync(DOCS_PATH);
    const ageMs = Date.now() - stat.mtimeMs;
    const ageHours = ageMs / (60 * 60 * 1000);
    const ageDays = ageHours / 24;

    let status = 'fresh';
    if (ageMs > DATA_FRESHNESS.STALE_THRESHOLD) {
      status = 'stale';
      logger.warn('data_freshness', 'Documentation is STALE', {
        ageHours: ageHours.toFixed(1),
        threshold: DATA_FRESHNESS.STALE_THRESHOLD / (60 * 60 * 1000)
      });
    } else if (ageMs > DATA_FRESHNESS.WARNING_THRESHOLD) {
      status = 'warning';
    }

    return {
      lastModified: new Date(stat.mtimeMs).toISOString(),
      ageMs,
      ageHuman: ageDays >= 1
        ? `${ageDays.toFixed(1)} days`
        : `${ageHours.toFixed(1)} hours`,
      status,
      thresholds: {
        warning: `${DATA_FRESHNESS.WARNING_THRESHOLD / (60 * 60 * 1000)}h`,
        stale: `${DATA_FRESHNESS.STALE_THRESHOLD / (60 * 60 * 1000)}h`
      }
    };
  } catch (err) {
    logger.error('data_freshness', 'Failed to check data freshness', err);
    return {
      lastModified: null,
      ageMs: null,
      ageHuman: 'unknown',
      status: 'error',
      error: err.message
    };
  }
}

// ========== SEARCH FUNCTIONS ==========
/**
 * Advanced tokenizer with camelCase and compound word support
 * Examples:
 *   "getUserInfo" → ["get", "user", "info"]
 *   "get_user_info" → ["get", "user", "info"]
 *   "OAuth2Token" → ["oauth", "2", "token"]
 */
function tokenize(text) {
  // Step 1: Split camelCase and PascalCase
  // "getUserInfo" → "get User Info"
  // "OAuth2Token" → "O Auth 2 Token"
  let processed = text.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Step 2: Split numbers from letters
  // "OAuth2Token" → "OAuth 2 Token"
  processed = processed.replace(/([a-zA-Z])(\d)/g, '$1 $2');
  processed = processed.replace(/(\d)([a-zA-Z])/g, '$1 $2');

  // Step 3: Replace separators with spaces
  processed = processed
    .toLowerCase()
    .replace(/[_\-\/\.]/g, ' ')
    .replace(/[^a-z0-9\s]/g, '');

  // Step 4: Split and filter
  const tokens = processed
    .split(/\s+/)
    .filter(t => t.length > 1);

  // Step 5: Deduplicate while preserving order
  return [...new Set(tokens)];
}

/**
 * Generates n-grams from tokens for fuzzy matching
 */
function generateNGrams(tokens, n = 2) {
  const ngrams = [];
  for (const token of tokens) {
    if (token.length >= n) {
      for (let i = 0; i <= token.length - n; i++) {
        ngrams.push(token.slice(i, i + n));
      }
    }
  }
  return ngrams;
}

/**
 * Advanced scoring algorithm with weighted matching
 * Score breakdown:
 *   - Exact token match: 1.0
 *   - Prefix match: 0.8
 *   - Substring match: 0.6
 *   - N-gram match: 0.3
 *   - Multiple token bonus: +0.5 per additional match
 */
function calculateScore(searchText, queryTokens) {
  const textLower = searchText.toLowerCase();
  const textTokens = tokenize(searchText);
  const textNGrams = new Set(generateNGrams(textTokens));
  let score = 0;
  let matchCount = 0;

  for (const token of queryTokens) {
    let tokenScore = 0;

    // Exact token match (highest weight)
    if (textTokens.includes(token)) {
      tokenScore = 10;
      matchCount++;
    }
    // Prefix match
    else if (textTokens.some(t => t.startsWith(token))) {
      tokenScore = 8;
      matchCount++;
    }
    // Suffix/substring match
    else if (textTokens.some(t => t.includes(token) || token.includes(t))) {
      tokenScore = 6;
      matchCount++;
    }
    // Direct text inclusion (handles compound words)
    else if (textLower.includes(token)) {
      tokenScore = 5;
      matchCount++;
    }
    // N-gram fuzzy match
    else {
      const queryNGrams = generateNGrams([token]);
      const ngramMatches = queryNGrams.filter(ng => textNGrams.has(ng)).length;
      if (ngramMatches > 0) {
        tokenScore = Math.min(3, ngramMatches * 0.5);
      }
    }

    score += tokenScore;
  }

  // Multi-token bonus: reward results that match multiple query terms
  if (matchCount > 1) {
    score += matchCount * 5;
  }

  // Position bonus: boost if match appears in first word (likely endpoint name)
  if (textTokens.length > 0 && queryTokens.some(t => textTokens[0].includes(t))) {
    score += 3;
  }

  return score;
}

function searchInDocs(query, maxResults = 20) {
  const data = loadDocs();
  const queryTokens = tokenize(query);
  const results = [];

  // Search endpoints
  for (const [name, item] of Object.entries(data.endpoints || {})) {
    const searchText = [
      name,
      item.title || "",
      item.description || "",
      item.method || "",
      item.path || "",
      item.curl_example || "",
      item.raw_text || "",
      (item.parameters || []).map(p => p.name + ' ' + p.description).join(' '),
    ].join(" ");

    const score = calculateScore(searchText, queryTokens);
    if (score > 0) {
      results.push({
        type: "endpoint",
        name,
        title: item.title,
        description: item.description,
        method: item.method,
        path: item.path,
        url: item.url,
        score,
      });
    }
  }

  // Search pages
  for (const [name, item] of Object.entries(data.pages || {})) {
    const searchText = [
      name,
      item.title || "",
      item.description || "",
      item.raw_text || "",
      (item.paragraphs || []).join(" "),
      (item.list_items || []).join(" "),
      (item.headers || []).map(h => h.text).join(" "),
    ].join(" ");

    const score = calculateScore(searchText, queryTokens);
    if (score > 0) {
      results.push({
        type: "page",
        name,
        title: item.title,
        description: item.description,
        url: item.url,
        category: item.category,
        score,
      });
    }
  }

  // Search blogs
  for (const [name, item] of Object.entries(data.blogs || {})) {
    const searchText = [
      name,
      item.title || "",
      item.description || "",
      item.raw_text || "",
      (item.paragraphs || []).join(" "),
    ].join(" ");

    const score = calculateScore(searchText, queryTokens);
    if (score > 0) {
      results.push({
        type: "blog",
        name,
        title: item.title,
        description: item.description,
        url: item.url,
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, maxResults);
}

// ========== MCP SERVER ==========
const server = new Server(
  {
    name: "twitterapi-docs",
    version: "1.0.2",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// ========== TOOL DEFINITIONS (LLM-OPTIMIZED) ==========
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_twitterapi_docs",
      description: `Search TwitterAPI.io documentation: API endpoints, guides (pricing, rate limits, filter rules), and blog posts.

USE THIS WHEN: You need to find information across the entire documentation.
RETURNS: Ranked results with endpoint paths, descriptions, and relevance scores.

Examples:
- "advanced search" → finds tweet search endpoints
- "rate limit" → finds QPS limits and pricing info
- "webhook" → finds webhook setup endpoints
- "getUserInfo" → finds user info endpoints (supports camelCase)`,
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query (1-500 chars). Use English keywords like: 'search', 'user', 'tweet', 'webhook', 'pricing', 'rate limit'. Supports camelCase and underscore formats.",
            minLength: 1,
            maxLength: 500
          },
          max_results: {
            type: "integer",
            description: "Number of results to return. Use higher values (15-20) for comprehensive research, lower values (3-5) for quick lookups.",
            minimum: 1,
            maximum: 20,
            default: 10
          }
        },
        required: ["query"],
      },
      outputSchema: {
        type: "object",
        properties: {
          content: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: {
                  type: "string",
                  description: "Markdown formatted search results with sections: API Endpoints (name, method, path, description), Guides (name, title, url), Blog Posts (title, url)"
                }
              }
            }
          }
        }
      }
    },
    {
      name: "get_twitterapi_endpoint",
      description: `Get complete documentation for a specific TwitterAPI.io endpoint.

USE THIS WHEN: You know the exact endpoint name (e.g., from search results).
RETURNS: Full details including path, parameters, cURL example, and code snippets.

Common endpoints:
- get_user_info, get_user_followers, get_user_following
- tweet_advanced_search, get_tweet_by_id
- add_webhook_rule, get_webhook_rules`,
      inputSchema: {
        type: "object",
        properties: {
          endpoint_name: {
            type: "string",
            description: "Exact endpoint name (use underscores). Examples: 'get_user_info', 'tweet_advanced_search', 'add_webhook_rule'",
          },
        },
        required: ["endpoint_name"],
      },
      outputSchema: {
        type: "object",
        properties: {
          content: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: {
                  type: "string",
                  description: "Markdown with: Title, Endpoint Details (method, path, full URL, doc link), Description, Parameters list (name, required, description), cURL Example, Code Examples, Full Documentation"
                }
              }
            }
          }
        }
      }
    },
    {
      name: "list_twitterapi_endpoints",
      description: `List all TwitterAPI.io API endpoints organized by category.

USE THIS WHEN: You need to browse available endpoints or find endpoints by category.
CATEGORIES: user, tweet, community, webhook, stream, action, dm, list, trend

RETURNS: Endpoint names with HTTP method and path for each category.`,
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Optional filter: user, tweet, community, webhook, stream, action, dm, list, trend",
            enum: ["user", "tweet", "community", "webhook", "stream", "action", "dm", "list", "trend"]
          },
        },
      },
      outputSchema: {
        type: "object",
        properties: {
          content: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: {
                  type: "string",
                  description: "Markdown list organized by category (USER, TWEET, WEBHOOK, etc.) with endpoint format: name: METHOD /path"
                }
              }
            }
          }
        }
      }
    },
    {
      name: "get_twitterapi_guide",
      description: `Get TwitterAPI.io guide pages for conceptual topics.

USE THIS WHEN: You need information about pricing, rate limits, authentication, or filter rules.
AVAILABLE GUIDES: pricing, qps_limits, tweet_filter_rules, changelog, introduction, authentication, readme

RETURNS: Full guide content with headers, paragraphs, and code examples.`,
      inputSchema: {
        type: "object",
        properties: {
          guide_name: {
            type: "string",
            description: "Guide name: pricing, qps_limits, tweet_filter_rules, changelog, introduction, authentication, readme",
            enum: ["pricing", "qps_limits", "tweet_filter_rules", "changelog", "introduction", "authentication", "readme"]
          },
        },
        required: ["guide_name"],
      },
      outputSchema: {
        type: "object",
        properties: {
          content: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: {
                  type: "string",
                  description: "Markdown with: Title, URL, Overview, Table of Contents, Content paragraphs, Key Points list, Code Examples, Full Content"
                }
              }
            }
          }
        }
      }
    },
    {
      name: "get_twitterapi_pricing",
      description: `Get TwitterAPI.io pricing information: credit system, endpoint costs, QPS limits.

USE THIS WHEN: You need to know API costs, credit calculations, or rate limits.
RETURNS: Pricing tiers, credit costs per endpoint, QPS limits by balance level.`,
      inputSchema: {
        type: "object",
        properties: {},
      },
      outputSchema: {
        type: "object",
        properties: {
          content: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: {
                  type: "string",
                  description: "Markdown with: Credit System (USD to credits), Endpoint Costs table, Minimum Charge, QPS Limits by balance level, Important Notes, Cost Comparison"
                }
              }
            }
          }
        }
      }
    },
    {
      name: "get_twitterapi_auth",
      description: `Get TwitterAPI.io authentication guide: API key usage, headers, code examples.

USE THIS WHEN: You need to set up authentication or see request examples.
RETURNS: API key header format, base URL, cURL/Python/JavaScript examples.`,
      inputSchema: {
        type: "object",
        properties: {},
      },
      outputSchema: {
        type: "object",
        properties: {
          content: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: {
                  type: "string",
                  description: "Markdown with: API Key Usage header name, Base URL, Getting Your API Key steps, Request Examples (cURL, Python, JavaScript code blocks)"
                }
              }
            }
          }
        }
      }
    },
  ],
}));

// ========== TOOL HANDLERS ==========
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const startTime = Date.now();
  let success = true;

  try {
    const result = await handleToolCall(name, args);
    const duration = Date.now() - startTime;
    logger.recordToolCall(name, duration, !result.isError);
    logger.info('tool_call', `${name} completed`, { duration, isError: result.isError });
    return result;
  } catch (error) {
    success = false;
    const duration = Date.now() - startTime;
    logger.recordToolCall(name, duration, false);
    logger.error('tool_call', `${name} failed`, error);

    return formatToolError({
      type: ErrorType.INTERNAL_ERROR,
      message: 'An unexpected error occurred',
      suggestion: 'Try again or use a different query',
      retryable: true
    });
  }
});

async function handleToolCall(name, args) {
  const data = loadDocs();

  switch (name) {
    case "search_twitterapi_docs": {
      // Validate input
      const validation = validateQuery(args.query);
      if (!validation.valid) {
        return formatToolError(validation.error);
      }

      // Validate and set max_results (default: 10, range: 1-20)
      const maxResults = Math.min(20, Math.max(1, args.max_results || 10));

      // Check cache first (include maxResults in cache key)
      const cacheKey = `search_${validation.value}_${maxResults}`;
      const cachedOutput = searchCache.get(cacheKey);
      if (cachedOutput) {
        logger.info('search', 'Cache hit', { query: validation.value, maxResults });
        return formatToolSuccess(cachedOutput + '\n\n*[Cached result]*');
      }

      const results = searchInDocs(validation.value, maxResults);

      if (results.length === 0) {
        const allEndpoints = Object.keys(data.endpoints || {}).slice(0, 15);
        return formatToolSuccess(`No results for "${validation.value}".

**Suggestions:**
- Try different terms: "search", "user", "tweet", "webhook", "stream"
- Use English keywords
- Try broader terms

**Available endpoints (sample):**
${allEndpoints.map(e => `- ${e}`).join('\n')}

**Guide pages:**
- pricing, qps_limits, tweet_filter_rules, changelog, authentication`);
      }

      const grouped = {
        endpoint: results.filter(r => r.type === "endpoint"),
        page: results.filter(r => r.type === "page"),
        blog: results.filter(r => r.type === "blog"),
      };

      let output = `## "${validation.value}" - ${results.length} results (showing up to ${maxResults}):\n\n`;

      if (grouped.endpoint.length > 0) {
        output += `### API Endpoints (${grouped.endpoint.length})\n`;
        output += grouped.endpoint.slice(0, 15).map((r, i) =>
          `${i + 1}. **${r.name}** - ${r.method || "GET"} ${r.path || ""}\n   ${r.description || r.title || ""}`
        ).join("\n\n");
        output += "\n\n";
      }

      if (grouped.page.length > 0) {
        output += `### Guides (${grouped.page.length})\n`;
        output += grouped.page.slice(0, 10).map((r, i) =>
          `${i + 1}. **${r.name}** - ${r.title || ""}\n   ${r.url || ""}`
        ).join("\n\n");
        output += "\n\n";
      }

      if (grouped.blog.length > 0) {
        output += `### Blog Posts (${grouped.blog.length})\n`;
        output += grouped.blog.slice(0, 5).map((r, i) =>
          `${i + 1}. **${r.title || r.name}**\n   ${r.url || ""}`
        ).join("\n\n");
      }

      // Cache the result
      searchCache.set(cacheKey, output);

      return formatToolSuccess(output);
    }

    case "get_twitterapi_endpoint": {
      // Validate input
      const validation = validateEndpointName(args.endpoint_name);
      if (!validation.valid) {
        return formatToolError(validation.error);
      }

      // Check cache first
      const cacheKey = `endpoint_${validation.value}`;
      const cachedOutput = endpointCache.get(cacheKey);
      if (cachedOutput) {
        logger.info('endpoint', 'Cache hit', { endpoint: validation.value });
        return formatToolSuccess(cachedOutput);
      }

      const endpoint = data.endpoints?.[validation.value];

      if (!endpoint) {
        const available = Object.keys(data.endpoints || {});
        const suggestions = available
          .filter(e => e.includes(validation.value.split('_')[0]) || validation.value.includes(e.split('_')[0]))
          .slice(0, 10);

        return formatToolError({
          type: ErrorType.NOT_FOUND,
          message: `Endpoint "${validation.value}" not found`,
          suggestion: suggestions.length > 0
            ? `Similar endpoints: ${suggestions.join(', ')}`
            : `Use list_twitterapi_endpoints to see all ${available.length} available endpoints`,
          retryable: false
        });
      }

      const info = `# ${endpoint.title || validation.value}

## Endpoint Details
- **Method:** ${endpoint.method || "GET"}
- **Path:** ${endpoint.path || "Unknown"}
- **Full URL:** https://api.twitterapi.io${endpoint.path || ""}
- **Documentation:** ${endpoint.url}

## Description
${endpoint.description || "No description available."}

${endpoint.parameters?.length > 0 ? `## Parameters
${endpoint.parameters.map(p => `- **${p.name}**${p.required ? ' (required)' : ''}: ${p.description}`).join('\n')}` : ''}

## cURL Example
\`\`\`bash
${endpoint.curl_example || `curl --request ${endpoint.method || 'GET'} \\
  --url https://api.twitterapi.io${endpoint.path || ''} \\
  --header 'x-api-key: YOUR_API_KEY'`}
\`\`\`

${endpoint.code_snippets?.length > 0 ? `## Code Examples
\`\`\`
${endpoint.code_snippets.join("\n")}
\`\`\`` : ""}

## Full Documentation
${endpoint.raw_text || "No additional content available."}`;

      // Cache the result
      endpointCache.set(cacheKey, info);

      return formatToolSuccess(info);
    }

    case "list_twitterapi_endpoints": {
      // Validate category (optional)
      const validation = validateCategory(args.category);
      if (!validation.valid) {
        return formatToolError(validation.error);
      }

      const endpoints = Object.entries(data.endpoints || {});

      const categories = {
        user: [], tweet: [], list: [], community: [], trend: [],
        dm: [], action: [], webhook: [], stream: [], other: [],
      };

      for (const [name, ep] of endpoints) {
        if (name.includes("user") || name.includes("follow")) {
          categories.user.push({ name, ...ep });
        } else if (name.includes("tweet") || name.includes("search") || name.includes("article")) {
          categories.tweet.push({ name, ...ep });
        } else if (name.includes("list")) {
          categories.list.push({ name, ...ep });
        } else if (name.includes("community")) {
          categories.community.push({ name, ...ep });
        } else if (name.includes("trend")) {
          categories.trend.push({ name, ...ep });
        } else if (name.includes("dm")) {
          categories.dm.push({ name, ...ep });
        } else if (name.includes("webhook") || name.includes("rule")) {
          categories.webhook.push({ name, ...ep });
        } else if (name.includes("monitor") || name.includes("stream")) {
          categories.stream.push({ name, ...ep });
        } else if (["login", "like", "retweet", "create", "delete", "upload"].some(k => name.includes(k))) {
          categories.action.push({ name, ...ep });
        } else {
          categories.other.push({ name, ...ep });
        }
      }

      if (validation.value && categories[validation.value]) {
        const filtered = categories[validation.value];
        return formatToolSuccess(`## ${validation.value.toUpperCase()} Endpoints (${filtered.length})

${filtered.map((e) => `- **${e.name}**: ${e.method || "GET"} ${e.path || ""}\n  ${e.description || ""}`).join("\n\n")}`);
      }

      let output = `# TwitterAPI.io Endpoints (Total: ${endpoints.length})\n\n`;
      for (const [cat, eps] of Object.entries(categories)) {
        if (eps.length > 0) {
          output += `## ${cat.toUpperCase()} (${eps.length})\n`;
          output += eps.map((e) => `- **${e.name}**: ${e.method || "GET"} ${e.path || ""}`).join("\n");
          output += "\n\n";
        }
      }
      return formatToolSuccess(output);
    }

    case "get_twitterapi_guide": {
      // Validate input
      const validation = validateGuideName(args.guide_name);
      if (!validation.valid) {
        return formatToolError(validation.error);
      }

      const page = data.pages?.[validation.value];

      if (!page) {
        return formatToolError({
          type: ErrorType.NOT_FOUND,
          message: `Guide "${validation.value}" not found`,
          suggestion: `Available guides: ${Object.keys(data.pages || {}).join(', ')}`,
          retryable: false
        });
      }

      let output = `# ${page.title || validation.value}\n\n`;
      output += `**URL:** ${page.url || "N/A"}\n\n`;

      if (page.description) {
        output += `## Overview\n${page.description}\n\n`;
      }

      if (page.headers?.length > 0) {
        output += `## Table of Contents\n`;
        output += page.headers.map(h => `${"  ".repeat(h.level - 1)}- ${h.text}`).join("\n");
        output += "\n\n";
      }

      if (page.paragraphs?.length > 0) {
        output += `## Content\n`;
        output += page.paragraphs.join("\n\n");
        output += "\n\n";
      }

      if (page.list_items?.length > 0) {
        output += `## Key Points\n`;
        output += page.list_items.map(li => `- ${li}`).join("\n");
        output += "\n\n";
      }

      if (page.code_snippets?.length > 0) {
        output += `## Code Examples\n\`\`\`\n`;
        output += page.code_snippets.join("\n");
        output += "\n```\n\n";
      }

      output += `## Full Content\n${page.raw_text || "No additional content."}`;

      return formatToolSuccess(output);
    }

    case "get_twitterapi_pricing": {
      const pricing = data.pricing || {};
      const qps = data.qps_limits || {};

      return formatToolSuccess(`# TwitterAPI.io Pricing

## Credit System
- **1 USD = ${pricing.credits_per_usd?.toLocaleString() || "100,000"} Credits**

## Endpoint Costs
${Object.entries(pricing.costs || {}).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}

## Minimum Charge
${pricing.minimum_charge || "15 credits ($0.00015) per request"}

## QPS (Queries Per Second) Limits

### Free Users
${qps.free || "1 request per 5 seconds"}

### By Balance Level
${Object.entries(qps.paid || {}).map(([k, v]) => `- **${k.replace(/_/g, " ")}**: ${v}`).join("\n")}

## Important Notes
- Credits never expire
- Bonus credits valid for 30 days
- Up to 5% discount on bulk purchases
- List endpoints: 150 credits/request

## Cost Comparison
TwitterAPI.io is **~97% cheaper** than official Twitter API.
- Twitter Pro: $5,000/month
- TwitterAPI.io equivalent: ~$150/month`);
    }

    case "get_twitterapi_auth": {
      const auth = data.authentication || {};

      return formatToolSuccess(`# TwitterAPI.io Authentication

## API Key Usage
All requests require the \`${auth.header || "x-api-key"}\` header.

## Base URL
\`${auth.base_url || "https://api.twitterapi.io"}\`

## Getting Your API Key
1. Go to ${auth.dashboard_url || "https://twitterapi.io/dashboard"}
2. Sign up / Log in
3. Copy your API key from the dashboard

## Request Examples

### cURL
\`\`\`bash
curl -X GET "${auth.base_url || "https://api.twitterapi.io"}/twitter/user/info?userName=elonmusk" \\
  -H "${auth.header || "x-api-key"}: YOUR_API_KEY"
\`\`\`

### Python
\`\`\`python
import requests

response = requests.get(
    "${auth.base_url || "https://api.twitterapi.io"}/twitter/user/info",
    params={"userName": "elonmusk"},
    headers={"${auth.header || "x-api-key"}": "YOUR_API_KEY"}
)
print(response.json())
\`\`\`

### JavaScript
\`\`\`javascript
const response = await fetch(
  "${auth.base_url || "https://api.twitterapi.io"}/twitter/user/info?userName=elonmusk",
  { headers: { "${auth.header || "x-api-key"}": "YOUR_API_KEY" } }
);
const data = await response.json();
\`\`\``);
    }

    default:
      return formatToolError({
        type: ErrorType.NOT_FOUND,
        message: `Unknown tool: ${name}`,
        suggestion: 'Available tools: search_twitterapi_docs, get_twitterapi_endpoint, list_twitterapi_endpoints, get_twitterapi_guide, get_twitterapi_pricing, get_twitterapi_auth',
        retryable: false
      });
  }
}

// ========== RESOURCES ==========
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    // Documentation resources
    {
      uri: "twitterapi://docs/all",
      mimeType: "application/json",
      name: "All TwitterAPI.io Documentation",
      description: "52 endpoints + guide pages + blog posts",
    },
    {
      uri: "twitterapi://docs/endpoints",
      mimeType: "application/json",
      name: "API Endpoint List",
      description: "Summary of all API endpoints",
    },
    {
      uri: "twitterapi://docs/guides",
      mimeType: "application/json",
      name: "Guide Pages",
      description: "Pricing, QPS limits, filter rules, etc.",
    },
    // Static guide resources (Phase 2)
    {
      uri: "twitterapi://guides/pricing",
      mimeType: "text/markdown",
      name: "Pricing Guide",
      description: "Credit system, endpoint costs, QPS limits",
    },
    {
      uri: "twitterapi://guides/authentication",
      mimeType: "text/markdown",
      name: "Authentication Guide",
      description: "API key setup, headers, code examples",
    },
    {
      uri: "twitterapi://guides/qps_limits",
      mimeType: "text/markdown",
      name: "Rate Limits Guide",
      description: "QPS limits by balance level",
    },
    {
      uri: "twitterapi://guides/tweet_filter_rules",
      mimeType: "text/markdown",
      name: "Tweet Filter Rules",
      description: "Advanced search filter syntax",
    },
    // Monitoring resources
    {
      uri: "twitterapi://metrics",
      mimeType: "application/json",
      name: "Server Metrics",
      description: "Performance metrics, SLO tracking, cache stats",
    },
    {
      uri: "twitterapi://health",
      mimeType: "application/json",
      name: "Health Check",
      description: "Server health status and data freshness",
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  const data = loadDocs();

  // Documentation resources
  if (uri === "twitterapi://docs/all") {
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(data, null, 2),
      }],
    };
  }

  if (uri === "twitterapi://docs/endpoints") {
    const summary = Object.entries(data.endpoints || {}).map(([name, ep]) => ({
      name,
      method: ep.method,
      path: ep.path,
      description: ep.description,
    }));
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(summary, null, 2),
      }],
    };
  }

  if (uri === "twitterapi://docs/guides") {
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify({ pages: data.pages, blogs: data.blogs }, null, 2),
      }],
    };
  }

  // Static guide resources (Phase 2 - pre-rendered markdown for quick access)
  if (uri === "twitterapi://guides/pricing") {
    const pricing = data.pricing || {};
    const qps = data.qps_limits || {};
    return {
      contents: [{
        uri,
        mimeType: "text/markdown",
        text: `# TwitterAPI.io Pricing

## Credit System
- **1 USD = ${pricing.credits_per_usd?.toLocaleString() || "100,000"} Credits**

## Endpoint Costs
${Object.entries(pricing.costs || {}).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}

## QPS Limits by Balance Level
${Object.entries(qps.paid || {}).map(([k, v]) => `- **${k.replace(/_/g, " ")}**: ${v}`).join("\n")}

## Important Notes
- Credits never expire
- Bonus credits valid for 30 days
- ~97% cheaper than official Twitter API`,
      }],
    };
  }

  if (uri === "twitterapi://guides/authentication") {
    const auth = data.authentication || {};
    return {
      contents: [{
        uri,
        mimeType: "text/markdown",
        text: `# TwitterAPI.io Authentication

## API Key Header
\`${auth.header || "x-api-key"}: YOUR_API_KEY\`

## Base URL
\`${auth.base_url || "https://api.twitterapi.io"}\`

## Quick Example
\`\`\`bash
curl -X GET "${auth.base_url || "https://api.twitterapi.io"}/twitter/user/info?userName=elonmusk" \\
  -H "${auth.header || "x-api-key"}: YOUR_API_KEY"
\`\`\``,
      }],
    };
  }

  if (uri === "twitterapi://guides/qps_limits") {
    const qps = data.qps_limits || {};
    return {
      contents: [{
        uri,
        mimeType: "text/markdown",
        text: `# TwitterAPI.io Rate Limits (QPS)

## Free Users
${qps.free || "1 request per 5 seconds"}

## Paid Users by Balance
${Object.entries(qps.paid || {}).map(([k, v]) => `- **${k.replace(/_/g, " ")}**: ${v}`).join("\n")}`,
      }],
    };
  }

  if (uri === "twitterapi://guides/tweet_filter_rules") {
    const page = data.pages?.tweet_filter_rules || {};
    return {
      contents: [{
        uri,
        mimeType: "text/markdown",
        text: `# Tweet Filter Rules

${page.raw_text || page.description || "Filter rules documentation not available."}`,
      }],
    };
  }

  // Monitoring resources
  if (uri === "twitterapi://metrics") {
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(logger.getMetrics(getAllCacheStats(), getDataFreshness()), null, 2),
      }],
    };
  }

  if (uri === "twitterapi://health") {
    const freshness = getDataFreshness();
    const health = {
      status: freshness.status === 'stale' ? 'degraded' : 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      dataFreshness: freshness,
      cache: {
        search: searchCache.stats(),
        endpoints: endpointCache.stats()
      },
      sloStatus: {
        violations: logger.metrics.sloViolations,
        healthy: logger.metrics.sloViolations.alert === 0
      }
    };
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(health, null, 2),
      }],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// ========== SERVER STARTUP ==========
async function main() {
  try {
    logger.info('init', 'Starting TwitterAPI.io Docs MCP Server v1.0.2');

    // Validate docs file exists
    if (!fs.existsSync(DOCS_PATH)) {
      throw new Error(`Documentation file not found: ${DOCS_PATH}`);
    }

    // Pre-load documentation
    const docs = loadDocs();
    const endpointCount = Object.keys(docs.endpoints || {}).length;
    const pageCount = Object.keys(docs.pages || {}).length;
    logger.info('init', 'Documentation validated', { endpoints: endpointCount, pages: pageCount });

    // Check data freshness
    const freshness = getDataFreshness();
    logger.info('init', 'Data freshness check', freshness);
    if (freshness.status === 'stale') {
      logger.warn('init', 'WARNING: Documentation data is stale! Consider refreshing.');
    }

    // Start cache cleanup scheduler
    startCacheCleanup();
    logger.info('init', 'Cache cleanup scheduler started (hourly)');

    // Log SLO configuration
    logger.info('init', 'SLO targets configured', {
      tools: Object.keys(SLO).length,
      targets: Object.entries(SLO).map(([t, s]) => `${t}: ${s.target}ms`)
    });

    // Connect transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    logger.info('init', 'MCP Server ready on stdio', {
      version: '1.0.2',
      features: ['max_results', 'camelCase', 'SLO tracking', 'MCP Resources', 'data freshness', 'trusted publishing']
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      logger.info('shutdown', 'Received SIGINT, shutting down...');
      stopCacheCleanup();
      logger.info('shutdown', 'Final metrics', logger.getMetrics(getAllCacheStats(), getDataFreshness()));
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      logger.info('shutdown', 'Received SIGTERM, shutting down...');
      stopCacheCleanup();
      logger.info('shutdown', 'Final metrics', logger.getMetrics(getAllCacheStats(), getDataFreshness()));
      process.exit(0);
    });

  } catch (error) {
    logger.error('init', 'Fatal error during initialization', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('[FATAL] Unexpected error:', error);
  process.exit(1);
});
