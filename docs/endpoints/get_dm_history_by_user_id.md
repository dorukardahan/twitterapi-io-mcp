# Get Dm History By User Id
Source: https://docs.twitterapi.io/api-reference/endpoint/get_dm_history_by_user_id

## Endpoint

- Method: `GET`
- Path: `/twitter/get_dm_history_by_user_id`
- API URL: `https://api.twitterapi.io/twitter/get_dm_history_by_user_id`

## Description

Get the direct message history with a user.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/get_dm_history_by_user_id \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "messages": [
    {
      "id": "<string>",
      "recipient_id": "<string>",
      "sender_id": "<string>",
      "text": "<string>",
      "time": "<string>"
    }
  ],
  "status": "<string>",
  "message": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:17.889Z_
