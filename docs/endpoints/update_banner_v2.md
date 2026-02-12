# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: 

## Endpoint

- Method: `PATCH`
- Path: `/twitter/update_banner_v2`
- API URL: `https://docs.twitterapi.io/api-reference/endpoint/update_banner_v2`

## Description

Update your Twitter banner/header image. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request PATCH \
  --url https://docs.twitterapi.io/api-reference/endpoint/update_banner_v2 \
  --header 'X-API-Key: <api-key>'
```
