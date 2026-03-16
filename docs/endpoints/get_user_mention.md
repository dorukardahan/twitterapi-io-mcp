# Get User Mention
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_mention

## Endpoint

- Method: `GET`
- Path: `/twitter/user/mentions`
- API URL: `'https://api.twitterapi.io/twitter/user/mentions?userName=USERNAME&sinceTime=SINCETIME&untilTime=UNTILTIME&cursor=CURSOR'`

## Description

get tweet mentions by user screen name. Each page returns exactly 20 mentions. Use cursor for pagination. Order by mention time desc

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/mentions?userName=USERNAME&sinceTime=SINCETIME&untilTime=UNTILTIME&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.444Z_
