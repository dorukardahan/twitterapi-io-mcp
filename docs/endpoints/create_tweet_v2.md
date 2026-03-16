# Create Tweet V2
Source: https://docs.twitterapi.io/api-reference/endpoint/create_tweet_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/create_tweet_v2`
- API URL: `'https://api.twitterapi.io/twitter/create_tweet_v2'`

## Description

Create a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/create_tweet_v2' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

_Scraped at: 2026-03-16T02:37:54.445Z_
