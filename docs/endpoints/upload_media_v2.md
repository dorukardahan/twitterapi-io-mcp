# Upload Media V2
Source: https://docs.twitterapi.io/api-reference/endpoint/upload_media_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/upload_media_v2`
- API URL: `https://api.twitterapi.io/twitter/upload_media_v2`

## Description

Upload media to twitter. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/upload_media_v2 \
  --header 'Content-Type: multipart/form-data' \
  --header 'X-API-Key: <api-key>' \
  --form file='@example-file' \
  --form 'proxy=<string>' \
  --form 'login_cookies=<string>' \
  --form is_long_video=true
```

## Example Response

```json
{
  "media_id": "<string>",
  "status": "<string>",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:28.787Z_
