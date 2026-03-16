# Tweet Advanced Search
Source: https://docs.twitterapi.io/api-reference/endpoint/tweet_advanced_search

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/advanced_search`
- API URL: `'https://api.twitterapi.io/twitter/tweet/advanced_search?query=QUERY&queryType=QUERYTYPE&cursor=CURSOR'`

## Description

Advanced search for tweets. Each page returns up to 20 replies(Sometimes less than 20,because we will filter out ads or other not  tweets). Use cursor for pagination.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/tweet/advanced_search?query=QUERY&queryType=QUERYTYPE&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
