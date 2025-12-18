# Retweet Tweet
Source: https://docs.twitterapi.io/api-reference/endpoint/retweet_tweet

## Endpoint

- Method: `POST`
- Path: `/twitter/retweet_tweet`
- API URL: `https://api.twitterapi.io/twitter/retweet_tweet`

## Description

Retweet a tweet. Need to login first. Trial operation price: $0.001 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/retweet_tweet \
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

_Scraped at: 2025-12-18T10:06:26.231Z_
