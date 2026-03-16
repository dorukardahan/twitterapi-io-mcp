#!/usr/bin/env node
/**
 * TwitterAPI.io Documentation Scraper v3.0 — OpenAPI-first
 *
 * Fetches endpoint data from the official OpenAPI JSON spec instead of
 * scraping HTML pages. This avoids Vercel Security Checkpoint issues,
 * eliminates ghost parameters (response fields leaking into query params),
 * and provides typed, structured parameter information.
 *
 * The OpenAPI spec at docs.twitterapi.io/api-reference/openapi.json is
 * not behind the Vercel checkpoint and returns structured JSON with:
 *   - All endpoint paths, methods, descriptions
 *   - Query/body parameters with name, type, required, description
 *   - Response schemas ($ref to Tweet, UserInfo, etc.)
 *   - Component schemas for reuse
 *
 * Blog/guide pages are NOT covered here — use scrape-all.cjs for those.
 *
 * Migration notes (v2 → v3):
 *   - Source: HTML scraping → OpenAPI JSON
 *   - Ghost params eliminated: response fields no longer leak into query_parameters
 *   - Parameter types now include: name, in, type, required, description
 *   - Response schemas preserved as structured refs
 *   - Backward compatible: output format matches v2 docs.json structure
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENAPI_URL = 'https://docs.twitterapi.io/api-reference/openapi.json';

// Endpoint name mapping: OpenAPI path → internal name used in docs.json
// This must match the keys used by index.js tools and docs/endpoints/ files.
const PATH_TO_NAME = {
  '/twitter/user/info': 'get_user_by_username',
  '/twitter/user_about': 'get_user_about',
  '/twitter/user/batch_info_by_ids': 'batch_get_user_by_userids',
  '/twitter/user/last_tweets': 'get_user_last_tweets',
  '/twitter/user/tweet_timeline': 'get_user_timeline',
  '/twitter/user/followers': 'get_user_followers',
  '/twitter/user/followings': 'get_user_followings',
  '/twitter/user/mentions': 'get_user_mention',
  '/twitter/user/verifiedFollowers': 'get_user_verified_followers',
  '/twitter/user/check_follow_relationship': 'check_follow_relationship',
  '/twitter/user/search': 'search_user',
  '/twitter/tweets': 'get_tweet_by_ids',
  '/twitter/tweet/replies': 'get_tweet_reply',
  '/twitter/tweet/replies/v2': 'get_tweet_replies_v2',
  '/twitter/tweet/quotes': 'get_tweet_quote',
  '/twitter/tweet/retweeters': 'get_tweet_retweeter',
  '/twitter/tweet/thread_context': 'get_tweet_thread_context',
  '/twitter/article': 'get_article',
  '/twitter/tweet/advanced_search': 'tweet_advanced_search',
  '/twitter/list/followers': 'get_list_followers',
  '/twitter/list/members': 'get_list_members',
  '/twitter/list/tweets_timeline': 'list_timeline',
  '/twitter/community/info': 'get_community_by_id',
  '/twitter/community/members': 'get_community_members',
  '/twitter/community/moderators': 'get_community_moderators',
  '/twitter/community/tweets': 'get_community_tweets',
  '/twitter/community/get_tweets_from_all_community': 'get_all_community_tweets',
  '/twitter/trends': 'get_trends',
  '/twitter/spaces/detail': 'get_space_detail',
  '/oapi/my/info': 'get_my_info',
  '/twitter/user_login_v2': 'user_login_v2',
  '/twitter/create_tweet_v2': 'create_tweet_v2',
  '/twitter/delete_tweet_v2': 'delete_tweet_v2',
  '/twitter/like_tweet_v2': 'like_tweet_v2',
  '/twitter/unlike_tweet_v2': 'unlike_tweet_v2',
  '/twitter/retweet_tweet_v2': 'retweet_tweet_v2',
  '/twitter/follow_user_v2': 'follow_user_v2',
  '/twitter/unfollow_user_v2': 'unfollow_user_v2',
  '/twitter/upload_media_v2': 'upload_media_v2',
  '/twitter/update_avatar_v2': 'update_avatar_v2',
  '/twitter/update_banner_v2': 'update_banner_v2',
  '/twitter/update_profile_v2': 'update_profile_v2',
  '/twitter/send_dm_to_user': 'send_dm_v2',
  '/twitter/create_community_v2': 'create_community_v2',
  '/twitter/delete_community_v2': 'delete_community_v2',
  '/twitter/join_community_v2': 'join_community_v2',
  '/twitter/leave_community_v2': 'leave_community_v2',
  '/oapi/tweet_filter/add_rule': 'add_webhook_rule',
  '/oapi/tweet_filter/get_rules': 'get_webhook_rules',
  '/oapi/tweet_filter/update_rule': 'update_webhook_rule',
  '/oapi/tweet_filter/delete_rule': 'delete_webhook_rule',
  '/oapi/x_user_stream/add_user_to_monitor_tweet': 'add_user_to_monitor_tweet',
  '/oapi/x_user_stream/remove_user_to_monitor_tweet': 'remove_user_to_monitor_tweet',
  '/oapi/x_user_stream/get_user_to_monitor_tweet': 'get_user_to_monitor_tweet',
};

// Paths to skip (deprecated V1, V3 beta, non-API)
const SKIP_PATHS = new Set([
  '/twitter/create_tweet',
  '/twitter/like_tweet',
  '/twitter/retweet_tweet',
  '/twitter/login_by_email_or_username',
  '/twitter/login_by_2fa',
  '/twitter/upload_image',
  '/twitter/get_dm_history_by_user_id',
  '/twitter/like_tweet_v3',
  '/twitter/retweet_v3',
  '/twitter/send_tweet_v3',
  '/twitter/user_login_v3',
  '/twitter/update_profile_v3',
  '/twitter/delete_my_x_account_v3',
  '/twitter/get_my_x_account_detail_v3',
  '/twitter/list/tweets',
  '/twitter/list/add_member',
  '/twitter/list/remove_member',
  '/plants/{id}',
]);

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function resolveRef(ref, spec) {
  if (!ref || !ref.startsWith('#/')) return null;
  const parts = ref.replace('#/', '').split('/');
  let obj = spec;
  for (const p of parts) {
    obj = obj?.[p];
    if (!obj) return null;
  }
  return obj;
}

function formatResponseSchema(responses, spec) {
  const ok = responses?.['200'];
  if (!ok) return null;

  const schema = ok.content?.['application/json']?.schema;
  if (!schema) return null;

  const result = {};

  // Resolve top-level properties
  const props = schema.properties || {};
  for (const [key, val] of Object.entries(props)) {
    if (val.$ref) {
      const resolved = resolveRef(val.$ref, spec);
      if (resolved) {
        result[key] = { type: 'object', ref: val.$ref.split('/').pop(), description: val.description || '' };
      }
    } else if (val.type === 'array' && val.items?.$ref) {
      const refName = val.items.$ref.split('/').pop();
      result[key] = { type: 'array', itemRef: refName, description: val.description || '' };
    } else {
      result[key] = { type: val.type || 'unknown', description: val.description || '' };
      if (val.enum) result[key].enum = val.enum;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

function buildCurlExample(method, apiPath, params, hasBody) {
  const baseUrl = 'https://api.twitterapi.io';
  const upperMethod = method.toUpperCase();

  if (upperMethod === 'GET') {
    const queryParams = (params || [])
      .filter(p => p.in === 'query')
      .map(p => `${p.name}=${p.name.toUpperCase()}`)
      .join('&');
    const url = queryParams ? `${baseUrl}${apiPath}?${queryParams}` : `${baseUrl}${apiPath}`;
    return `curl --request GET \\\n  --url '${url}' \\\n  --header 'X-API-Key: <api-key>'`;
  }

  let curl = `curl --request ${upperMethod} \\\n  --url '${baseUrl}${apiPath}' \\\n  --header 'X-API-Key: <api-key>'`;
  if (hasBody) {
    curl += ` \\\n  --header 'Content-Type: application/json'`;
  }
  return curl;
}

function convertEndpoint(apiPath, methodObj, httpMethod, spec) {
  const name = PATH_TO_NAME[apiPath];
  if (!name) return null;

  const params = (methodObj.parameters || []).map(p => ({
    name: p.name,
    in: p.in || 'query',
    type: p.schema?.type || 'string',
    format: p.schema?.format || null,
    required: p.required === true,
    description: p.description || '',
  }));

  // Extract body parameters from requestBody
  const bodyParams = {};
  const requestBody = methodObj.requestBody;
  if (requestBody) {
    const bodySchema = requestBody.content?.['application/json']?.schema;
    if (bodySchema?.properties) {
      const requiredFields = new Set(bodySchema.required || []);
      for (const [key, val] of Object.entries(bodySchema.properties)) {
        bodyParams[key] = {
          type: val.type || 'string',
          required: requiredFields.has(key),
          description: val.description || '',
        };
      }
    }
  }

  // Build query_parameters in v2 format for backward compatibility
  const queryParameters = {};
  for (const p of params) {
    if (p.in === 'query') {
      queryParameters[p.name] = `${p.name} ${p.type} ${p.required ? 'required' : ''}`.trim();
    }
  }

  const responseSchema = formatResponseSchema(methodObj.responses, spec);
  const hasBody = Object.keys(bodyParams).length > 0;
  const curlExample = buildCurlExample(httpMethod, apiPath, params, hasBody);

  return {
    name,
    url: `https://docs.twitterapi.io/api-reference/endpoint/${name}`,
    scraped_at: new Date().toISOString(),
    title: methodObj.summary || methodObj.description || name,
    description: methodObj.description || '',
    method: httpMethod.toUpperCase(),
    path: apiPath,
    // Structured parameters (new in v3)
    parameters: params.length > 0 ? params : undefined,
    // Legacy format for backward compatibility with index.js
    query_parameters: Object.keys(queryParameters).length > 0 ? queryParameters : undefined,
    // Body parameters for POST/PATCH/PUT/DELETE
    body: hasBody ? bodyParams : undefined,
    body_parameters: hasBody ? bodyParams : undefined,
    // Response schema
    response_schema: responseSchema,
    // cURL example
    curl_example: curlExample,
    code_snippets: [curlExample],
    // Raw text for search (description + params)
    raw_text: [
      methodObj.description || '',
      ...params.map(p => `${p.name}: ${p.description}`),
      ...Object.entries(bodyParams).map(([k, v]) => `${k}: ${v.description}`),
    ].filter(Boolean).join(' '),
  };
}

async function scrapeAll() {
  console.log('🚀 TwitterAPI.io Scraper v3.0 — OpenAPI-first\n');
  console.log('📥 OpenAPI spec çekiliyor...');

  const spec = await fetchJson(OPENAPI_URL);

  const paths = spec.paths || {};
  const allPaths = Object.keys(paths);
  console.log(`   ${allPaths.length} path bulundu\n`);

  // Load existing docs.json to preserve pages/blogs
  const existingDocsPath = path.join(__dirname, 'data', 'docs.json');
  let existingDocs = {};
  try {
    existingDocs = JSON.parse(fs.readFileSync(existingDocsPath, 'utf-8'));
    console.log(`📂 Mevcut docs.json yüklendi (${Object.keys(existingDocs.pages || {}).length} sayfa, ${Object.keys(existingDocs.blogs || {}).length} blog korunacak)\n`);
  } catch (e) {
    console.log('⚠️  Mevcut docs.json bulunamadı, sıfırdan oluşturuluyor\n');
  }

  const endpoints = {};
  let skipped = 0;
  let processed = 0;
  let unmapped = 0;

  for (const [apiPath, methods] of Object.entries(paths)) {
    if (SKIP_PATHS.has(apiPath)) {
      skipped++;
      continue;
    }

    for (const [httpMethod, methodObj] of Object.entries(methods)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(httpMethod)) continue;

      const name = PATH_TO_NAME[apiPath];
      if (!name) {
        console.log(`  ⚠️  Unmapped path: ${httpMethod.toUpperCase()} ${apiPath}`);
        unmapped++;
        continue;
      }

      const endpoint = convertEndpoint(apiPath, methodObj, httpMethod, spec);
      if (endpoint) {
        endpoints[name] = endpoint;
        processed++;
        process.stdout.write(`  ✅ ${name} (${httpMethod.toUpperCase()} ${apiPath})\n`);
      }
    }
  }

  // Build final docs.json, preserving existing pages/blogs
  const docs = {
    meta: {
      source: 'https://docs.twitterapi.io/api-reference/openapi.json',
      scraped_at: new Date().toISOString(),
      scraper_version: '3.0',
      total_endpoints: Object.keys(endpoints).length,
      total_pages: Object.keys(existingDocs.pages || {}).length,
      total_blogs: Object.keys(existingDocs.blogs || {}).length,
    },
    authentication: existingDocs.authentication || {
      header: 'x-api-key',
      header_value: 'YOUR_API_KEY',
      base_url: 'https://api.twitterapi.io',
    },
    qps_limits: existingDocs.qps_limits || {
      free: '1 request per 5 seconds',
      paid: {
        '1000_credits': '3 QPS',
        '5000_credits': '6 QPS',
        '10000_credits': '10 QPS',
        '50000_credits': '20 QPS',
      },
    },
    pricing: existingDocs.pricing || {
      credits_per_usd: 100000,
      costs: {
        tweets: '15 credits per tweet',
        profiles: '18 credits per user',
        followers: '15 credits per follower',
        list_calls: '150 credits per call',
      },
      minimum_charge: '15 credits ($0.00015) per request',
    },
    endpoints,
    pages: existingDocs.pages || {},
    blogs: existingDocs.blogs || {},
  };

  // Save component schemas for reference
  if (spec.components?.schemas) {
    docs.schemas = spec.components.schemas;
  }

  // Write output
  const outPath = path.join(__dirname, 'data', 'docs.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(docs, null, 2));

  console.log(`
✅ Scraping tamamlandı! (v3.0 — OpenAPI-first)
   - ${processed} endpoint (OpenAPI'den)
   - ${skipped} deprecated/V3 atlandı
   - ${unmapped} unmapped path
   - ${Object.keys(docs.pages).length} sayfa (korundu)
   - ${Object.keys(docs.blogs).length} blog (korundu)

📁 Kaydedildi: ${outPath}
`);
}

scrapeAll().catch(console.error);
