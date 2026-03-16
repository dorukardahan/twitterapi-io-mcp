# Send Dm V2
Source: https://docs.twitterapi.io/api-reference/endpoint/send_dm_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/send_dm_to_user`
- API URL: `'https://api.twitterapi.io/twitter/send_dm_to_user'`

## Description

Send a direct message to a user. You must set the login_cookie.. You can get the login_cookie from /twitter/user_login_v2. You can only send DMs to those who have enabled DMs. Sometimes it may fail, so be prepared to retry. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/send_dm_to_user' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

_Scraped at: 2026-03-16T02:37:54.446Z_
