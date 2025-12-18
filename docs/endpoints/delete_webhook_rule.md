# Delete Webhook Rule
Source: https://docs.twitterapi.io/api-reference/endpoint/delete_webhook_rule

## Endpoint

- Method: `DELETE`
- Path: `/oapi/tweet_filter/delete_rule`
- API URL: `https://api.twitterapi.io/oapi/tweet_filter/delete_rule`

## Description

Delete a tweet filter rule. You must set all parameters.

## Example (curl)

```bash
curl --request DELETE \
  --url https://api.twitterapi.io/oapi/tweet_filter/delete_rule \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: <api-key>' \
  --data '
{
  "rule_id": "<string>"
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

_Scraped at: 2025-12-18T10:06:15.359Z_
