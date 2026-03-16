# Get Community By Id
Source: https://docs.twitterapi.io/api-reference/endpoint/get_community_by_id

## Endpoint

- Method: `GET`
- Path: `/twitter/community/info`
- API URL: `'https://api.twitterapi.io/twitter/community/info?community_id=COMMUNITY_ID'`

## Description

Get community info by community id. Price: 20 credits per call. Note: This API is a bit slow, we are still optimizing it.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/community/info?community_id=COMMUNITY_ID' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.446Z_
