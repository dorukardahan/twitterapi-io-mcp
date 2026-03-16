# Get Tweet Retweeter
Source: https://docs.twitterapi.io/api-reference/endpoint/get_tweet_retweeter

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/retweeters`
- API URL: `'https://api.twitterapi.io/twitter/tweet/retweeters?tweetId=TWEETID&cursor=CURSOR'`

## Description

get tweet retweeters by tweet id. Each page returns about 100 retweeters. Use cursor for pagination. Order by retweet time desc

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/tweet/retweeters?tweetId=TWEETID&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
