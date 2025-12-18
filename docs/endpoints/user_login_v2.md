# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/user_login_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/user_login_v2`
- API URL: `https://api.twitterapi.io/twitter/user_login_v2`

## Description

Log in directly using your email, username, password, and 2FA secret key. And obtain the Login_cookie,  to post tweets, etc. Please note that the Login_cookie obtained through login_v2 can only be used for APIs with the "v2" suffix, such as create_tweet_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/user_login_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "user_name": "<string>",
  "email": "<string>",
  "password": "<string>",
  "proxy": "<string>",
  "totp_secret": "<string>"
}
'
```

## Example Response

```json
{
  "login_cookie": "<string>",
  "status": "<string>",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:35.119Z_
