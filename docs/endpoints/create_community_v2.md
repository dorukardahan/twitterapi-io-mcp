# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/create_community_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/create_community_v2`
- API URL: `https://api.twitterapi.io/twitter/create_community_v2`

## Description

Create a community.You must set the login_cookies.You can get the login_cookies from /twitter/user_login_v2.Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/create_community_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "login_cookies": "<string>",
  "name": "<string>",
  "description": "<string>",
  "proxy": "<string>"
}
'
```

## Example Response

```json
{
  "community_id": "<string>",
  "status": "<string>",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:20.630Z_
