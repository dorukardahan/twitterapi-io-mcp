# Login By Email Or Username
Source: https://docs.twitterapi.io/api-reference/endpoint/login_by_email_or_username

## Endpoint

- Method: `POST`
- Path: `/twitter/login_by_email_or_username`
- API URL: `'https://api.twitterapi.io/twitter/login_by_email_or_username'`

## Description

Login Step 1: by email or username.Recommend to use email.Trial operation price: $0.003 per call. Please read the guide: https://twitterapi.io/blog/twitter-login-and-post-api-guide

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/login_by_email_or_username' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

## Body Parameters

- `username_or_email` (string, required): User name or email.If you can't log in with your email, use your username. If you can't log in with your username, use your email instead.ref:https://twitterapi.io/blog/twitter-login-and-post-api-guide
- `password` (string, required): The password of the user
- `proxy` (string, required): The proxy to use.Please use high-quality residential proxies and avoid free proxies.Required.Example: http://username:password@ip:port . You can get proxy from: https://www.webshare.io/?referral_code=4e0q1n00a504

_Scraped at: 2026-04-10T04:07:53.670656Z_
