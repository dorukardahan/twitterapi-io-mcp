# Add Webhook Rule
Source: https://docs.twitterapi.io/api-reference/endpoint/add_webhook_rule

## Endpoint

- Method: `POST`
- Path: `/oapi/tweet_filter/add_rule`
- API URL: `'https://api.twitterapi.io/oapi/tweet_filter/add_rule'`

## Description

Add a tweet filter rule. Default rule is not activated. You must call update_rule to activate the rule.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/oapi/tweet_filter/add_rule' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

_Scraped at: 2026-03-16T02:37:54.446Z_
