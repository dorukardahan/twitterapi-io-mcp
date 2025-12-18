# Login By 2fa
Source: https://docs.twitterapi.io/api-reference/endpoint/login_by_2fa

## Endpoint

- Method: `POST`
- Path: `/twitter/login_by_2fa`
- API URL: `https://api.twitterapi.io/twitter/login_by_2fa`

## Description

Deprecated soon. Please use login V2 instead, as it is more stable. Login Step 2: by 2fa code. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/login_by_2fa \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "login_data": "<string>",
  "2fa_code": "<string>",
  "proxy": "<string>"
}
'
```

## Example Response

```json
{
  "session": "<string>",
  "status": "<string>",
  "msg": "<string>",
  "user": {
    "id_str": "<string>",
    "screen_name": "<string>",
    "name": "<string>"
  }
}
```

_Scraped at: 2025-12-18T10:06:25.304Z_
