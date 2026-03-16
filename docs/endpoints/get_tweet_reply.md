# Get Tweet Reply
Source: https://docs.twitterapi.io/api-reference/endpoint/get_tweet_reply

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/replies`
- API URL: `'https://api.twitterapi.io/twitter/tweet/replies?tweetId=TWEETID&sinceTime=SINCETIME&untilTime=UNTILTIME&cursor=CURSOR'`

## Description

get tweet replies by tweet id. Each page returns up to 20 replies(Sometimes less than 20,because we will filter out ads or other not  tweets). Use cursor for pagination. Order by reply time desc

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/tweet/replies?tweetId=TWEETID&sinceTime=SINCETIME&untilTime=UNTILTIME&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.443Z_
