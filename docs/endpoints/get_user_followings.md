# Get User Followings
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_followings

## Endpoint

- Method: `GET`
- Path: `/twitter/user/followings`
- API URL: `'https://api.twitterapi.io/twitter/user/followings?userName=USERNAME&cursor=CURSOR&pageSize=PAGESIZE'`

## Description

Get user followings. Each page returns exactly 200 followings. Use cursor for pagination. Sorted by follow date. Most recent followings appear on the first page.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/followings?userName=USERNAME&cursor=CURSOR&pageSize=PAGESIZE' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
