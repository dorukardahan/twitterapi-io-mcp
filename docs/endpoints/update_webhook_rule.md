# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/update_webhook_rule

## Endpoint

- Method: `POST`
- Path: `/oapi/tweet_filter/update_rule`
- API URL: `https://api.twitterapi.io/oapi/tweet_filter/update_rule`

## Description

Update a tweet filter rule. You must set all parameters.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/tweet_filter/update_rule \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "rule_id": "<string>",
  "tag": "<string>",
  "value": "<string>",
  "interval_seconds": 123,
  "is_effect": 0
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

_Scraped at: 2025-12-13T03:07:34.204Z_
