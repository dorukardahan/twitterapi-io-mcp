# Login By Email Or Username
Source: https://docs.twitterapi.io/api-reference/endpoint/login_by_email_or_username

## Endpoint

- Method: `POST`
- Path: `/twitter/login_by_email_or_username`
- API URL: `https://api.twitterapi.io/twitter/login_by_email_or_username`

## Description

Login Step 1: by email or username. Recommend to use email. Trial operation price: $0.003 per call. Please read the guide: https://twitterapi. io/blog/twitter-login-and-post-api-guide

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/login_by_email_or_username \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "username_or_email": "<string>",
  "password": "<string>",
  "proxy": "<string>"
}
'
```

## Example Response

```json
{
  "hint": "<string>",
  "login_data": "<string>",
  "status": "<string>",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:25.622Z_
