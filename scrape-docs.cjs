#!/usr/bin/env node
/**
 * TwitterAPI.io Documentation Scraper
 * Bu script tüm endpoint dokümanlarını çeker ve JSON olarak kaydeder
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ENDPOINTS = [
  // User Endpoints
  'get_user_by_username',
  'batch_get_user_by_userids',
  'get_user_last_tweets',
  'get_user_followers',
  'get_user_followings',
  'get_user_mention',
  'get_user_verified_followers',
  'check_follow_relationship',
  'search_user',

  // Tweet Endpoints
  'get_tweet_by_ids',
  'get_tweet_reply',
  'get_tweet_quote',
  'get_tweet_retweeter',
  'get_tweet_thread_context',
  'get_article',
  'tweet_advanced_search',

  // List Endpoints
  'get_list_followers',
  'get_list_members',

  // Community Endpoints
  'get_community_by_id',
  'get_community_members',
  'get_community_moderators',
  'get_community_tweets',
  'get_all_community_tweets',

  // Trend Endpoints
  'get_trends',

  // My Account
  'get_my_info',

  // Post & Action V2
  'user_login_v2',
  'login_by_email_or_username',
  'login_by_2fa',
  'upload_media_v2',
  'upload_tweet_image',
  'create_tweet',
  'create_tweet_v2',
  'delete_tweet_v2',
  'send_dm_v2',
  'get_dm_history_by_user_id',
  'retweet_tweet',
  'retweet_tweet_v2',
  'like_tweet',
  'like_tweet_v2',
  'unlike_tweet_v2',
  'follow_user_v2',
  'unfollow_user_v2',
  'create_community_v2',
  'delete_community_v2',
  'join_community_v2',
  'leave_community_v2',

  // Webhook/Websocket
  'add_webhook_rule',
  'get_webhook_rules',
  'update_webhook_rule',
  'delete_webhook_rule',

  // Stream
  'add_user_to_monitor_tweet',
  'remove_user_to_monitor_tweet'
];

const BASE_URL = 'https://docs.twitterapi.io/api-reference/endpoint/';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractContent(html, endpointName) {
  // Basit HTML parsing - gerçek içeriği çıkar
  const result = {
    name: endpointName,
    url: BASE_URL + endpointName,
    scraped_at: new Date().toISOString()
  };

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) result.title = titleMatch[1].replace(' – Docs', '').trim();

  // Meta description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  if (descMatch) result.description = descMatch[1];

  // API method ve path bulmaya çalış
  const methodMatch = html.match(/(GET|POST|PUT|DELETE|PATCH)\s+(\/twitter\/[^\s<"]+)/i);
  if (methodMatch) {
    result.method = methodMatch[1];
    result.path = methodMatch[2];
  }

  // Code blocks
  const codeBlocks = html.match(/<code[^>]*>([^<]+)<\/code>/gi) || [];
  result.code_snippets = codeBlocks.slice(0, 10).map(block =>
    block.replace(/<\/?code[^>]*>/gi, '')
  );

  // JSON response örnekleri bul
  const jsonMatch = html.match(/\{[\s\S]*?"data"[\s\S]*?\}/);
  if (jsonMatch) result.response_example = jsonMatch[0].substring(0, 500);

  // Raw HTML'den text çıkar (basit)
  result.raw_text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .substring(0, 5000)
    .trim();

  return result;
}

async function scrapeAll() {
  console.log('🚀 TwitterAPI.io dokümanları scrape ediliyor...\n');

  const docs = {
    meta: {
      source: 'https://docs.twitterapi.io',
      scraped_at: new Date().toISOString(),
      total_endpoints: ENDPOINTS.length
    },
    authentication: {
      header: 'x-api-key',
      header_value: 'YOUR_API_KEY',
      base_url: 'https://api.twitterapi.io'
    },
    endpoints: {}
  };

  for (const endpoint of ENDPOINTS) {
    const url = BASE_URL + endpoint;
    process.stdout.write(`📄 ${endpoint}... `);

    try {
      const html = await fetchPage(url);
      docs.endpoints[endpoint] = extractContent(html, endpoint);
      console.log('✅');
    } catch (err) {
      console.log('❌', err.message);
      docs.endpoints[endpoint] = {
        name: endpoint,
        error: err.message,
        url
      };
    }

    // Rate limiting - 200ms bekle
    await new Promise(r => setTimeout(r, 200));
  }

  // Kaydet
  const outPath = path.join(__dirname, 'data', 'docs.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(docs, null, 2));

  console.log(`\n✅ ${Object.keys(docs.endpoints).length} endpoint kaydedildi: ${outPath}`);
}

scrapeAll().catch(console.error);
