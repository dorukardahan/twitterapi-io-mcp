# Get Tweet Replies V2
Source: https://docs.twitterapi.io/api-reference/endpoint/get_tweet_replies_v2

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/replies/v2`
- API URL: `'https://api.twitterapi.io/twitter/tweet/replies/v2?tweetId=TWEETID&cursor=CURSOR&queryType=QUERYTYPE'`

## Description

Get tweet replies by tweet id (V2). Each page returns up to 20 replies. Use cursor for pagination. Supports sorting by Relevance, Latest, or Likes.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/tweet/replies/v2?tweetId=TWEETID&cursor=CURSOR&queryType=QUERYTYPE' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.443Z_
