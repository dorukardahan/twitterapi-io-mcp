# Bookmarks V2
Source: https://docs.twitterapi.io/api-reference/endpoint/bookmarks_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/bookmarks_v2`
- API URL: `'https://api.twitterapi.io/twitter/bookmarks_v2'`

## Description

Get the bookmarks list of the logged-in user. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Returns tweets in the same format as other tweet endpoints. Use cursor for pagination.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/bookmarks_v2' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

## Body Parameters

- `login_cookies` (string, required): The login cookies of the user. You can get the login_cookie from /twitter/user_login_v2. Must be set
- `proxy` (string, required): The proxy to use. Please use high-quality residential proxies and avoid free proxies. Required. Example: http://username:password@ip:port
- `count` (integer, optional): Number of bookmarks to return per page. Default is 20
- `cursor` (string, optional): Cursor for pagination. Use next_cursor from previous response to get next page

_Scraped at: 2026-04-10T04:07:53.670144Z_
