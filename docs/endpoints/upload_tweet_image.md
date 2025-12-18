# Upload Tweet Image
Source: https://docs.twitterapi.io/api-reference/endpoint/upload_tweet_image

## Endpoint

- Method: `POST`
- Path: `/twitter/upload_image`
- API URL: `https://api.twitterapi.io/twitter/upload_image`

## Description

upload image to twitter. Need to login first. Trial operation price: $0.001 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/upload_image \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "auth_session": "<string>",
  "proxy": "<string>",
  "image_url": "<string>"
}
'
```

## Example Response

```json
{
  "status": "<string>",
  "msg": "<string>",
  "media_id": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:29.081Z_
