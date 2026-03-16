# Get Tweet Quote
Source: https://docs.twitterapi.io/api-reference/endpoint/get_tweet_quote

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/quotes`
- API URL: `'https://api.twitterapi.io/twitter/tweet/quotes?tweetId=TWEETID&sinceTime=SINCETIME&untilTime=UNTILTIME&includeReplies=INCLUDEREPLIES&cursor=CURSOR'`

## Description

get tweet quotes by tweet id. Each page returns exactly 20 quotes. Use cursor for pagination. Order by quote time desc

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/tweet/quotes?tweetId=TWEETID&sinceTime=SINCETIME&untilTime=UNTILTIME&includeReplies=INCLUDEREPLIES&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
