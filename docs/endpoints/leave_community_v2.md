# Leave Community V2
Source: https://docs.twitterapi.io/api-reference/endpoint/leave_community_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/leave_community_v2`
- API URL: `https://api.twitterapi.io/twitter/leave_community_v2`

## Description

Leave a community. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/leave_community_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "login_cookie": "<string>",
  "community_id": "<string>",
  "proxy": "<string>"
}
'
```

## Example Response

```json
{
  "community_id": "<string>",
  "community_name": "<string>",
  "status": "<string>",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:24.326Z_
