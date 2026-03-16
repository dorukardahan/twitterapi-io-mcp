# Get List Members
Source: https://docs.twitterapi.io/api-reference/endpoint/get_list_members

## Endpoint

- Method: `GET`
- Path: `/twitter/list/members`
- API URL: `'https://api.twitterapi.io/twitter/list/members?list_id=LIST_ID&cursor=CURSOR'`

## Description

Get members of a list. Page size is 20.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/list/members?list_id=LIST_ID&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.447Z_
