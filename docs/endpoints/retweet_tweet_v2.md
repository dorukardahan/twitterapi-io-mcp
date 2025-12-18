# Retweet Tweet V2
Source: https://docs.twitterapi.io/api-reference/endpoint/retweet_tweet_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/retweet_tweet_v2`
- API URL: `https://api.twitterapi.io/twitter/retweet_tweet_v2`

## Description

Retweet a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.002 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/retweet_tweet_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "login_cookies": "<string>",
  "tweet_id": "<string>",
  "proxy": "<string>"
}
'
```

## Example Response

```json
{
  "status": "<string>",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:32.371Z_
