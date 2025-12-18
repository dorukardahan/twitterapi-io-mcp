# Get Trends
Source: https://docs.twitterapi.io/api-reference/endpoint/get_trends

## Endpoint

- Method: `GET`
- Path: `/twitter/trends`
- API URL: `https://api.twitterapi.io/twitter/trends`

## Description

Get trends by woeid

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/trends \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "trends": [
    {
      "name": "<string>",
      "target": {
        "query": "<string>"
      },
      "rank": 123,
      "meta_description": "<string>"
    }
  ],
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:19.499Z_
