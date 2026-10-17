# User Login V2
Source: https://docs.twitterapi.io/api-reference/endpoint/user_login_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/user_login_v2`
- API URL: `'https://api.twitterapi.io/twitter/user_login_v2'`

## Description

Log in directly using your email, username, password, and 2FA secret key. And obtain the login_cookies,  to post tweets, etc. Please note that the login_cookies obtained through login_v2 can only be used for APIs with the "v2" suffix, such as create_tweet_v2. Price: 10,000 credits ($0.10 per call). We highly recommend enabling 2FA for your login – otherwise, the login_cookies you obtain may be faulty, preventing you from posting tweets.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/user_login_v2' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

_Scraped at: 2026-03-16T02:37:54.445Z_
