# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/like_tweet

## Endpoint

- Method: `POST`
- Path: `/twitter/like_tweet`
- API URL: `https://api.twitterapi.io/twitter/like_tweet`

## Description

Like a tweet.Need to login first. Trial operation price: $0.001 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/like_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "auth_session": "<string>",
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

_Scraped at: 2025-12-13T03:07:30.605Z_
