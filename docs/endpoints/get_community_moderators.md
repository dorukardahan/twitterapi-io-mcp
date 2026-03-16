# Get Community Moderators
Source: https://docs.twitterapi.io/api-reference/endpoint/get_community_moderators

## Endpoint

- Method: `GET`
- Path: `/twitter/community/moderators`
- API URL: `'https://api.twitterapi.io/twitter/community/moderators?community_id=COMMUNITY_ID&cursor=CURSOR'`

## Description

Get moderators of a community. Page size is 20.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/community/moderators?community_id=COMMUNITY_ID&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.447Z_
