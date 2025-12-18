# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/get_webhook_rules

## Endpoint

- Method: `GET`
- Path: `/oapi/tweet_filter/get_rules`
- API URL: `https://api.twitterapi.io/oapi/tweet_filter/get_rules`

## Description

Get all tweet filter rules.Rule can be used in webhook and websocket.You can also modify the rule in our web page.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/oapi/tweet_filter/get_rules \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "rules": [
    {
      "rule_id": "<string>",
      "tag": "<string>",
      "value": "<string>",
      "interval_seconds": 123
    }
  ],
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:29.692Z_
