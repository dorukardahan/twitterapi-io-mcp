# Get Webhook Rules
Source: https://docs.twitterapi.io/api-reference/endpoint/get_webhook_rules

## Endpoint

- Method: `GET`
- Path: `/oapi/tweet_filter/get_rules`
- API URL: `'https://api.twitterapi.io/oapi/tweet_filter/get_rules'`

## Description

Get all tweet filter rules. Rule can be used in webhook and websocket. You can also modify the rule in our web page.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/oapi/tweet_filter/get_rules' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.446Z_
