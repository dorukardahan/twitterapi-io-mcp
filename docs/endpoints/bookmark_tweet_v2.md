# Bookmark Tweet V2
Source: https://docs.twitterapi.io/api-reference/endpoint/bookmark_tweet_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/bookmark_tweet_v2`
- API URL: `'https://api.twitterapi.io/twitter/bookmark_tweet_v2'`

## Description

Bookmark a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/bookmark_tweet_v2' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

## Body Parameters

- `login_cookies` (string, required): The login cookies of the user. You can get the login_cookie from /twitter/user_login_v2. Must be set
- `tweet_id` (string, required): The id of the tweet to bookmark. Must be set
- `proxy` (string, required): The proxy to use. Please use high-quality residential proxies and avoid free proxies. Required. Example: http://username:password@ip:port

_Scraped at: 2026-04-10T04:07:53.669713Z_
