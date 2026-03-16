# Check Follow Relationship
Source: https://docs.twitterapi.io/api-reference/endpoint/check_follow_relationship

## Endpoint

- Method: `GET`
- Path: `/twitter/user/check_follow_relationship`
- API URL: `'https://api.twitterapi.io/twitter/user/check_follow_relationship?source_user_name=SOURCE_USER_NAME&target_user_name=TARGET_USER_NAME'`

## Description

Check if the user is following/followed by the target user. Trial operation price: 100 credits per call.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/check_follow_relationship?source_user_name=SOURCE_USER_NAME&target_user_name=TARGET_USER_NAME' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
