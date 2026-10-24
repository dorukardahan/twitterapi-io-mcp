# Pin Tweet V2
Source: https://docs.twitterapi.io/api-reference/endpoint/pin_tweet_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/pin_tweet_v2`

## Description

Pin one of your own tweets to your profile. You can only pin tweets posted by the logged-in account. You must set the login_cookies. You can get the login_cookies from /twitter/user_login_v2. Price: 200 credits ($0.002 per call). If the call fails, the response has status "error", a message with the reason returned by X, and when available x_status (the HTTP status from X) and code (X's error code).

## Example (curl)

```bash
curl -s -X POST "https://api.twitterapi.io/twitter/pin_tweet_v2" \
  -H "X-API-Key: $TWITTERAPI_IO_KEY" \
  -H "Content-Type: application/json" \
  -d '{"login_cookies": "COOKIE", "tweet_id": "TWEET_ID", "proxy": "PROXY"}'
```

_Scraped at: 2026-10-24T04:03:36.908Z_
