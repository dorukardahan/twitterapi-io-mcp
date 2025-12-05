#!/usr/bin/env node
/**
 * TwitterAPI.io Complete Documentation Scraper v2.0
 * Düzeltmeler:
 * - Path extraction bug fix (cURL'den doğru path çıkarma)
 * - İçerik truncation kaldırıldı
 * - Daha iyi parameter parsing
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Ana site sayfaları
const MAIN_SITE_PAGES = [
  { url: 'https://twitterapi.io/pricing', name: 'pricing', category: 'guide' },
  { url: 'https://twitterapi.io/qps-limits', name: 'qps_limits', category: 'guide' },
  { url: 'https://twitterapi.io/tweet-filter-rules', name: 'tweet_filter_rules', category: 'guide' },
  { url: 'https://twitterapi.io/changelog', name: 'changelog', category: 'guide' },
  { url: 'https://twitterapi.io/readme', name: 'readme', category: 'guide' },
  { url: 'https://twitterapi.io/affiliate-program', name: 'affiliate_program', category: 'info' },
  { url: 'https://twitterapi.io/buy-twitter-accounts', name: 'buy_twitter_accounts', category: 'info' },
  { url: 'https://twitterapi.io/twitter-stream', name: 'twitter_stream', category: 'guide' },
  { url: 'https://twitterapi.io/blog/twitter-api-pricing-2025', name: 'blog_pricing_2025', category: 'blog' },
  { url: 'https://twitterapi.io/blog/twitter-analytics-api-guide', name: 'blog_analytics_guide', category: 'blog' },
  { url: 'https://twitterapi.io/blog/apify-alternative-for-twitter', name: 'blog_apify_alternative', category: 'blog' },
  { url: 'https://twitterapi.io/blog/build-twitter-apps-with-kiro-ai-ide', name: 'blog_kiro_ai', category: 'blog' },
  { url: 'https://twitterapi.io/blog/resources-and-tools', name: 'blog_resources', category: 'blog' },
  { url: 'https://twitterapi.io/blog/how-to-monitor-twitter-accounts-for-new-tweets-in-real-time', name: 'blog_monitor_tweets', category: 'blog' },
];

// API Endpoint'leri (docs.twitterapi.io)
const API_ENDPOINTS = [
  'get_user_by_username', 'batch_get_user_by_userids', 'get_user_last_tweets',
  'get_user_followers', 'get_user_followings', 'get_user_mention',
  'get_user_verified_followers', 'check_follow_relationship', 'search_user',
  'get_tweet_by_ids', 'get_tweet_reply', 'get_tweet_quote', 'get_tweet_retweeter',
  'get_tweet_thread_context', 'get_article', 'tweet_advanced_search',
  'get_list_followers', 'get_list_members',
  'get_community_by_id', 'get_community_members', 'get_community_moderators',
  'get_community_tweets', 'get_all_community_tweets',
  'get_trends', 'get_my_info',
  'user_login_v2', 'login_by_email_or_username', 'login_by_2fa',
  'upload_media_v2', 'upload_tweet_image',
  'create_tweet', 'create_tweet_v2', 'delete_tweet_v2',
  'send_dm_v2', 'get_dm_history_by_user_id',
  'retweet_tweet', 'retweet_tweet_v2',
  'like_tweet', 'like_tweet_v2', 'unlike_tweet_v2',
  'follow_user_v2', 'unfollow_user_v2',
  'create_community_v2', 'delete_community_v2', 'join_community_v2', 'leave_community_v2',
  'add_webhook_rule', 'get_webhook_rules', 'update_webhook_rule', 'delete_webhook_rule',
  'add_user_to_monitor_tweet', 'remove_user_to_monitor_tweet'
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : require('http');
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&#x3C;/g, '<')
    .replace(/&#x3E;/g, '>')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");
}

function extractMainSiteContent(html, pageName) {
  const result = {
    name: pageName,
    scraped_at: new Date().toISOString(),
    type: 'page'
  };

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) result.title = decodeHtmlEntities(titleMatch[1].trim());

  // Meta description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  if (descMatch) result.description = decodeHtmlEntities(descMatch[1]);

  // H1, H2, H3 headers
  const headers = [];
  const h1Match = html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi);
  for (const m of h1Match) headers.push({ level: 1, text: decodeHtmlEntities(m[1].trim()) });
  const h2Match = html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi);
  for (const m of h2Match) headers.push({ level: 2, text: decodeHtmlEntities(m[1].trim()) });
  const h3Match = html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi);
  for (const m of h3Match) headers.push({ level: 3, text: decodeHtmlEntities(m[1].trim()) });
  if (headers.length) result.headers = headers;

  // Paragraphs - TÜM paragrafları al
  const paragraphs = [];
  const pMatch = html.matchAll(/<p[^>]*>([^<]+)<\/p>/gi);
  for (const m of pMatch) {
    const text = decodeHtmlEntities(m[1].trim());
    if (text.length > 10) paragraphs.push(text);
  }
  if (paragraphs.length) result.paragraphs = paragraphs; // Limit kaldırıldı

  // Code blocks - TÜM code bloklarını al
  const codeBlocks = [];
  const codeMatch = html.matchAll(/<code[^>]*>([^<]+)<\/code>/gi);
  for (const m of codeMatch) codeBlocks.push(decodeHtmlEntities(m[1]));
  if (codeBlocks.length) result.code_snippets = codeBlocks; // Limit kaldırıldı

  // Pre blocks (büyük kod blokları)
  const preBlocks = [];
  const preMatch = html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/gi);
  for (const m of preMatch) {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text.length > 10) preBlocks.push(decodeHtmlEntities(text));
  }
  if (preBlocks.length) result.pre_blocks = preBlocks;

  // Lists (li items) - TÜM list itemları al
  const listItems = [];
  const liMatch = html.matchAll(/<li[^>]*>([^<]+)<\/li>/gi);
  for (const m of liMatch) {
    const text = decodeHtmlEntities(m[1].trim());
    if (text.length > 3) listItems.push(text);
  }
  if (listItems.length) result.list_items = listItems; // Limit kaldırıldı

  // Raw text extraction - TAM metin, truncation YOK
  result.raw_text = decodeHtmlEntities(html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());

  return result;
}

function extractEndpointContent(html, endpointName) {
  const result = {
    name: endpointName,
    url: `https://docs.twitterapi.io/api-reference/endpoint/${endpointName}`,
    scraped_at: new Date().toISOString(),
    type: 'endpoint'
  };

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) result.title = decodeHtmlEntities(titleMatch[1].replace(' – Docs', '').trim());

  // Meta description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  if (descMatch) result.description = decodeHtmlEntities(descMatch[1]);

  // ========== BUG FIX v2.1: Path çıkarma - Mintlify HTML formatı ==========
  // Mintlify, Next.js SSR kullanıyor ve içerik span tag'leri içinde syntax-highlighted

  // Yöntem 1: JSON data içinden path çıkar (en güvenilir)
  // Format: "path":"/twitter/user/info"
  const jsonPathMatch = html.match(/"path"\s*:\s*"(\/twitter\/[^"]+)"/i);
  if (jsonPathMatch) {
    result.path = jsonPathMatch[1].trim();
  }

  // Yöntem 2: Span içindeki URL'den çıkar
  // Format: https://api.twitterapi.io/twitter/user/info</span>
  // veya: https://api.twitterapi.io/oapi/my/info</span>
  if (!result.path) {
    const spanUrlMatch = html.match(/https:\/\/api\.twitterapi\.io(\/(?:twitter|oapi)\/[^<\s"'\\]+)/i);
    if (spanUrlMatch) {
      result.path = spanUrlMatch[1].replace(/\\$/, '').trim();
    }
  }

  // Yöntem 3: Plain text URL (fallback)
  if (!result.path) {
    const plainUrlMatch = html.match(/--url\s+https?:\/\/api\.twitterapi\.io([^\s\\'"<]+)/i);
    if (plainUrlMatch) {
      result.path = plainUrlMatch[1].replace(/\\$/, '').trim();
    }
  }

  // Method'u bul - JSON veya text'ten
  // JSON format: "method":"GET"
  const jsonMethodMatch = html.match(/"method"\s*:\s*"(GET|POST|PUT|DELETE|PATCH)"/i);
  if (jsonMethodMatch) {
    result.method = jsonMethodMatch[1].toUpperCase();
  }

  // Fallback: cURL'deki --request'ten
  if (!result.method) {
    const curlMethodMatch = html.match(/--request\s+(GET|POST|PUT|DELETE|PATCH)/i);
    if (curlMethodMatch) {
      result.method = curlMethodMatch[1].toUpperCase();
    }
  }

  // Alternatif: Endpoint başlığından method ve path
  // Format: "GET / twitter / user / info"
  if (!result.path) {
    const endpointHeaderMatch = html.match(/(GET|POST|PUT|DELETE|PATCH)\s+\/\s*([a-z_\/\s]+)/i);
    if (endpointHeaderMatch) {
      if (!result.method) result.method = endpointHeaderMatch[1].toUpperCase();
      result.path = '/' + endpointHeaderMatch[2].replace(/\s+/g, '').trim();
    }
  }

  // ========== Query Parameters Çıkarma ==========
  const parameters = [];

  // Query Parameters section'ını bul
  const paramSection = html.match(/Query Parameters[\s\S]*?(?=Response|Authorizations|$)/i);
  if (paramSection) {
    // Parameter adlarını ve açıklamalarını çıkar
    const paramMatches = paramSection[0].matchAll(/(\w+)\s+string[^<]*(?:required)?[^<]*(?:<[^>]*>)*\s*([^<]+)/gi);
    for (const m of paramMatches) {
      const paramName = m[1].trim();
      const paramDesc = decodeHtmlEntities(m[2].trim());
      if (paramName && paramName !== 'string' && paramDesc.length > 5) {
        parameters.push({
          name: paramName,
          description: paramDesc,
          required: paramSection[0].toLowerCase().includes(paramName.toLowerCase() + '" required') ||
                   paramSection[0].toLowerCase().includes(paramName.toLowerCase() + ' required')
        });
      }
    }
  }
  if (parameters.length) result.parameters = parameters;

  // ========== Response Schema Çıkarma ==========
  const responseMatch = html.match(/Response\s+200[\s\S]*?(?=Response\s+\d{3}|Authorizations|$)/i);
  if (responseMatch) {
    const responseFields = [];
    const fieldMatches = responseMatch[0].matchAll(/(\w+)\.\s*(\w+)\s+(string|integer|boolean|object|array)/gi);
    for (const m of fieldMatches) {
      responseFields.push({
        parent: m[1],
        field: m[2],
        type: m[3]
      });
    }
    if (responseFields.length) result.response_fields = responseFields.slice(0, 50);
  }

  // Code blocks - TÜM code bloklarını al
  const codeBlocks = [];
  const codeMatch = html.matchAll(/<code[^>]*>([^<]+)<\/code>/gi);
  for (const m of codeMatch) {
    const code = decodeHtmlEntities(m[1]);
    if (code.length > 5) codeBlocks.push(code);
  }
  if (codeBlocks.length) result.code_snippets = codeBlocks;

  // cURL örneğini ayrıca sakla
  const curlExample = html.match(/curl\s+--request[^<]+/i);
  if (curlExample) {
    result.curl_example = decodeHtmlEntities(curlExample[0]
      .replace(/\\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim());
  }

  // Raw text - TAM içerik, truncation YOK
  result.raw_text = decodeHtmlEntities(html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());

  return result;
}

async function scrapeAll() {
  console.log('🚀 TwitterAPI.io v2.0 Scraper - Tüm içerikler çekiliyor...\n');

  const docs = {
    meta: {
      source: 'https://twitterapi.io + https://docs.twitterapi.io',
      scraped_at: new Date().toISOString(),
      version: '2.0',
      total_endpoints: API_ENDPOINTS.length,
      total_pages: MAIN_SITE_PAGES.length
    },
    authentication: {
      header: 'x-api-key',
      header_value: 'YOUR_API_KEY',
      base_url: 'https://api.twitterapi.io',
      dashboard_url: 'https://twitterapi.io/dashboard'
    },
    qps_limits: {
      free: '1 request per 5 seconds',
      paid: {
        '1000_credits': '3 QPS',
        '5000_credits': '6 QPS',
        '10000_credits': '10 QPS',
        '50000_credits': '20 QPS'
      }
    },
    pricing: {
      credits_per_usd: 100000,
      costs: {
        tweets: '15 credits per tweet',
        profiles: '18 credits per user',
        followers: '15 credits per follower',
        list_calls: '150 credits per call'
      },
      minimum_charge: '15 credits ($0.00015) per request'
    },
    endpoints: {},
    pages: {},
    blogs: {}
  };

  // 1. Ana site sayfalarını çek
  console.log('📄 Ana site sayfaları çekiliyor...\n');
  for (const page of MAIN_SITE_PAGES) {
    process.stdout.write(`  ${page.name}... `);
    try {
      const html = await fetchPage(page.url);
      const content = extractMainSiteContent(html, page.name);
      content.url = page.url;
      content.category = page.category;

      if (page.category === 'blog') {
        docs.blogs[page.name] = content;
      } else {
        docs.pages[page.name] = content;
      }
      console.log('✅');
    } catch (err) {
      console.log('❌', err.message);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  // 2. API Endpoint dokümanlarını çek
  console.log('\n📚 API Endpoint dokümanları çekiliyor...\n');
  for (const endpoint of API_ENDPOINTS) {
    const url = `https://docs.twitterapi.io/api-reference/endpoint/${endpoint}`;
    process.stdout.write(`  ${endpoint}... `);
    try {
      const html = await fetchPage(url);
      docs.endpoints[endpoint] = extractEndpointContent(html, endpoint);
      console.log('✅');
    } catch (err) {
      console.log('❌', err.message);
      docs.endpoints[endpoint] = { name: endpoint, error: err.message, url };
    }
    await new Promise(r => setTimeout(r, 150));
  }

  // 3. Giriş ve Authentication sayfalarını çek
  console.log('\n📖 Temel dokümanlar çekiliyor...\n');
  const basicDocs = [
    { url: 'https://docs.twitterapi.io/introduction', name: 'introduction' },
    { url: 'https://docs.twitterapi.io/authentication', name: 'authentication' }
  ];

  for (const doc of basicDocs) {
    process.stdout.write(`  ${doc.name}... `);
    try {
      const html = await fetchPage(doc.url);
      docs.pages[doc.name] = extractMainSiteContent(html, doc.name);
      docs.pages[doc.name].url = doc.url;
      docs.pages[doc.name].category = 'docs';
      console.log('✅');
    } catch (err) {
      console.log('❌', err.message);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  // Kaydet
  const outPath = path.join(__dirname, 'data', 'docs.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(docs, null, 2));

  const stats = {
    endpoints: Object.keys(docs.endpoints).length,
    pages: Object.keys(docs.pages).length,
    blogs: Object.keys(docs.blogs).length
  };

  console.log(`
✅ Scraping tamamlandı! (v2.0)
   - ${stats.endpoints} endpoint
   - ${stats.pages} sayfa
   - ${stats.blogs} blog yazısı

📁 Kaydedildi: ${outPath}
`);
}

scrapeAll().catch(console.error);
