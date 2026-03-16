# List Timeline
Source: https://docs.twitterapi.io/api-reference/endpoint/list_timeline

## Endpoint

- Method: `GET`
- Path: `/twitter/list/tweets_timeline`
- API URL: `'https://api.twitterapi.io/twitter/list/tweets_timeline?listId=LISTID&cursor=CURSOR'`

## Description

Get timeline tweets  from list. Use cursor for pagination.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/list/tweets_timeline?listId=LISTID&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.445Z_
