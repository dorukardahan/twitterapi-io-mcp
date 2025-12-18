# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/check_follow_relationship

## Endpoint

- Method: `GET`
- Path: `/twitter/user/check_follow_relationship`
- API URL: `https://api.twitterapi.io/twitter/user/check_follow_relationship`

## Description

Check if the user is following/followed by the target user. Trial operation price: 100 credits per call.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/check_follow_relationship \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "data": {
    "following": true,
    "followed_by": true
  },
  "status": "success",
  "message": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:20.327Z_
