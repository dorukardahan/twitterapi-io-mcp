# Create Tweet V2
Source: https://docs.twitterapi.io/api-reference/endpoint/create_tweet_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/create_tweet_v2`
- API URL: `'https://api.twitterapi.io/twitter/create_tweet_v2'`

## Description

Create a tweet. You must set the login_cookie. You can get the login_cookie from /twitter/user_login_v2. Trial operation price: $0.003 per call.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/create_tweet_v2' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

## Body Parameters

- `login_cookies` (string, required): The login cookies of the user.You can get the login_cookie from /twitter/user_login_v2.Must be set
- `tweet_text` (string, required): The text of the tweet.Must be set
- `reply_to_tweet_id` (string, optional): The id of the tweet to reply to.Optional
- `attachment_url` (string, optional): The url of quote tweet.Optional.eg.https://x.com/sama/status/1947640330318156074
- `community_id` (string, optional): The id of the community to post to.Optional
- `is_note_tweet` (boolean, optional): If this option is set to True, tweets longer than 280 characters can be posted (Twitter Premium only).
- `media_ids` (array, optional): List of media IDs (strings) to attach. Optional. Obtain each from /twitter/upload_media_v2.
- `quote_tweet_id` (string, optional): ID of a tweet to quote. Optional. Alternative to attachment_url.
- `schedule_for` (string, optional): Schedule the tweet to be sent at a future time. Optional. Format: ISO-8601 with milliseconds, e.g. 2026-01-20T10:00:00.000Z
- `proxy` (string, required): The proxy to use.Please use high-quality residential proxies and avoid free proxies.Required.Example: http://username:password@ip:port . You can get proxy from: https://www.webshare.io/?referral_code=4e0q1n00a504

_Scraped at: 2026-03-16T02:37:54.445Z_
