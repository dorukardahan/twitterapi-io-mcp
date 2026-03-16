# Get User Followers
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_followers

## Endpoint

- Method: `GET`
- Path: `/twitter/user/followers`
- API URL: `'https://api.twitterapi.io/twitter/user/followers?userName=USERNAME&cursor=CURSOR&pageSize=PAGESIZE'`

## Description

Get user followers in reverse chronological order (newest first). Returns exactly 200 followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/followers?userName=USERNAME&cursor=CURSOR&pageSize=PAGESIZE' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
