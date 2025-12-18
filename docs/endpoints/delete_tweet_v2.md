# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/delete_tweet_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/delete_tweet_v2`
- API URL: `https://api.twitterapi.io/twitter/delete_tweet_v2`

## Description

Delete a tweet.You must set the login_cookie.You can get the login_cookie from /twitter/user_login_v2.Trial operation price: $0.002 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/delete_tweet_v2 \
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

_Scraped at: 2025-12-13T03:07:21.819Z_
