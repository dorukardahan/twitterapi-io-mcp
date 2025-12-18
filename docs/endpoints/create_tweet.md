# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/create_tweet

## Endpoint

- Method: `POST`
- Path: `/twitter/create_tweet`
- API URL: `https://api.twitterapi.io/twitter/create_tweet`

## Description

Create a tweet.Need to login first.Trial operation price: $0.001 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/create_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "auth_session": "<string>",
  "tweet_text": "<string>",
  "proxy": "<string>",
  "quote_tweet_id": "<string>",
  "in_reply_to_tweet_id": "<string>",
  "media_id": "<string>"
}
'
```

## Example Response

```json
{
  "status": "<string>",
  "msg": "<string>",
  "data": {
    "create_tweet": {
      "tweet_result": {
        "result": {
          "rest_id": "<string>"
        }
      }
    }
  }
}
```

_Scraped at: 2025-12-13T03:07:20.934Z_
