# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: 

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/replies/v2`
- API URL: `https://docs.twitterapi.io/api-reference/endpoint/get_tweet_replies_v2`

## Description

Get tweet replies by tweet id (V2). Each page returns up to 20 replies. Use cursor for pagination. Supports sorting by Relevance, Latest, or Likes.

## Example (curl)

```bash
curl --request GET \
  --url https://docs.twitterapi.io/api-reference/endpoint/get_tweet_replies_v2 \
  --header 'X-API-Key: <api-key>'
```
