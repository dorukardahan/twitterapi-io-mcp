# Get Community Tweets
Source: https://docs.twitterapi.io/api-reference/endpoint/get_community_tweets

## Endpoint

- Method: `GET`
- Path: `/twitter/community/tweets`
- API URL: `'https://api.twitterapi.io/twitter/community/tweets?community_id=COMMUNITY_ID&cursor=CURSOR'`

## Description

Get tweets of a community. Page size is 20. Order by creation time desc.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/community/tweets?community_id=COMMUNITY_ID&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.447Z_
