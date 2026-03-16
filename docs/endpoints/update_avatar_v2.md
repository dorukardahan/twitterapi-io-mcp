# Update Avatar V2
Source: https://docs.twitterapi.io/api-reference/endpoint/update_avatar_v2

## Endpoint

- Method: `PATCH`
- Path: `/twitter/update_avatar_v2`
- API URL: `'https://api.twitterapi.io/twitter/update_avatar_v2'`

## Description

Update your Twitter avatar/profile picture. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request PATCH \
  --url 'https://api.twitterapi.io/twitter/update_avatar_v2' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.447Z_
