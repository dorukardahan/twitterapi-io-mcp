# Get All Community Tweets
Source: https://docs.twitterapi.io/api-reference/endpoint/get_all_community_tweets

## Endpoint

- Method: `GET`
- Path: `/twitter/community/get_tweets_from_all_community`
- API URL: `'https://api.twitterapi.io/twitter/community/get_tweets_from_all_community?query=QUERY&queryType=QUERYTYPE&cursor=CURSOR'`

## Description

get tweets from all communities,each page returns up to 20 tweets. Use cursor for pagination.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/community/get_tweets_from_all_community?query=QUERY&queryType=QUERYTYPE&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.445Z_
