# Upload Image
Source: https://docs.twitterapi.io/api-reference/endpoint/upload_image

## Endpoint

- Method: `POST`
- Path: `/twitter/upload_image`
- API URL: `'https://api.twitterapi.io/twitter/upload_image'`

## Description

upload image to twitter.Need to login first. Trial operation price: $0.001 per call.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/upload_image' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

## Body Parameters

- `auth_session` (string, required): The session of the login. It's returned by /twitter/login_by_2fa
- `image_url` (string, optional): The url of the image to upload
- `proxy` (string, required): The proxy to use.Please use high-quality residential proxies and avoid free proxies.Required.Example: http://username:password@ip:port

_Scraped at: 2026-04-10T04:07:53.670830Z_
