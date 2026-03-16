# Batch Get User By Userids
Source: https://docs.twitterapi.io/api-reference/endpoint/batch_get_user_by_userids

## Endpoint

- Method: `GET`
- Path: `/twitter/user/batch_info_by_ids`
- API URL: `'https://api.twitterapi.io/twitter/user/batch_info_by_ids?userIds=USERIDS'`

## Description

Batch get user info by user ids. Pricing:

- Single user request: 18 credits per user
- Bulk request (100+ users): 10 credits per user

Note: For cost optimization, we recommend batching requests when fetching multiple user profiles.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/batch_info_by_ids?userIds=USERIDS' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.442Z_
