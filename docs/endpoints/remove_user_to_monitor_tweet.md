# Remove User To Monitor Tweet
Source: https://docs.twitterapi.io/api-reference/endpoint/remove_user_to_monitor_tweet

## Endpoint

- Method: `POST`
- Path: `/oapi/x_user_stream/remove_user_to_monitor_tweet`
- API URL: `https://api.twitterapi.io/oapi/x_user_stream/remove_user_to_monitor_tweet`

## Description

Remove a user from monitor real-time tweets. Please ref:https://twitterapi. io/twitter-stream

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/x_user_stream/remove_user_to_monitor_tweet \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "id_for_user": "<string>"
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

_Scraped at: 2025-12-13T03:07:31.796Z_
