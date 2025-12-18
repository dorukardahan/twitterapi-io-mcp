# Add User To Monitor Tweet
Source: https://docs.twitterapi.io/api-reference/endpoint/add_user_to_monitor_tweet

## Endpoint

- Method: `POST`
- Path: `/oapi/x_user_stream/add_user_to_monitor_tweet`
- API URL: `https://api.twitterapi.io/oapi/x_user_stream/add_user_to_monitor_tweet`

## Description

Add a user to monitor real-time tweets. Monitor tweets from specified accounts, including directly sent tweets, quoted tweets, reply tweets, and retweeted tweets. Please ref:https://twitterapi. io/twitter-stream

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/x_user_stream/add_user_to_monitor_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "x_user_name": "<string>"
}
'
```

## Example Response

```json
{
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:19.384Z_
