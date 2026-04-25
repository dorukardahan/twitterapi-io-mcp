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

## Body Parameters

- `login_cookies` (string, required): The login cookie of the user.You can get the login_cookies from /twitter/user_login_v2.Must be set
- `user_id` (string, required): The id of the user to send the direct message to.Must be set
- `text` (string, required): The text of the direct message.Must be set
- `media_id` (string, optional): ID of a single media asset to attach. Optional. Obtain from /twitter/upload_media_v2.
- `proxy` (string, required): The proxy to use.Please use high-quality residential proxies and avoid free proxies.Required.Example: http://username:password@ip:port . You can get proxy from: https://www.webshare.io/?referral_code=4e0q1n00a504
- `reply_to_message_id` (string, optional): The id of the message to reply to.Optional

_Scraped at: 2026-03-16T02:37:54.446Z_
