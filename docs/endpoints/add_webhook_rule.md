# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/add_webhook_rule

## Endpoint

- Method: `POST`
- Path: `/oapi/tweet_filter/add_rule`
- API URL: `https://api.twitterapi.io/oapi/tweet_filter/add_rule`

## Description

Add a tweet filter rule. Default rule is not activated.You must call update_rule to activate the rule.

## Example (curl)

```bash
curl --request POST \
  --url https://api.twitterapi.io/oapi/tweet_filter/add_rule \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "tag": "<string>",
  "value": "<string>",
  "interval_seconds": 123
}
'
```

## Example Response

```json
{
  "rule_id": "<string>",
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:19.688Z_
