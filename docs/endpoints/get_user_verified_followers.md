# Get User Verified Followers
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_verified_followers

## Endpoint

- Method: `GET`
- Path: `/twitter/user/verifiedFollowers`
- API URL: `'https://api.twitterapi.io/twitter/user/verifiedFollowers?user_id=USER_ID&cursor=CURSOR'`

## Description

Get user verified followers in reverse chronological order (newest first). Returns exactly 20 verified followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.$0.3 per 1000 followers

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/verifiedFollowers?user_id=USER_ID&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
