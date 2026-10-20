# Batch Get User By Userids
Source: https://docs.twitterapi.io/api-reference/endpoint/batch_get_user_by_userids

## Endpoint

- Method: `GET`
- Path: `/twitter/user/batch_info_by_ids`
- API URL: `'https://api.twitterapi.io/twitter/user/batch_info_by_ids?userIds=USERIDS'`

## Description

Batch get user info by user ids. Pricing (per request, based on the number of users returned):

- 1-99 users: 18 credits per user
- 100 or more users: 1 credit per user

Note: For cost optimization, we recommend batching 100 or more user IDs per request.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/batch_info_by_ids?userIds=USERIDS' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.442Z_
