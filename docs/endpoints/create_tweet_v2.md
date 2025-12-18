# Create Tweet V2
Source: https://docs.twitterapi.io/api-reference/endpoint/create_tweet_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/create_tweet_v2`
- API URL: `https://api.twitterapi.io/twitter/create_tweet_v2`

## Description

Create a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/twitter/create_tweet_v2 \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "login_cookies": "<string>",
  "tweet_text": "<string>",
  "proxy": "<string>",
  "reply_to_tweet_id": "<string>",
  "attachment_url": "<string>",
  "community_id": "<string>",
  "is_note_tweet": true,
  "media_ids": "<array>"
}
'
```

## Example Response

```json
{
  "tweet_id": "<string>",
  "status": "<string>",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:14.433Z_
