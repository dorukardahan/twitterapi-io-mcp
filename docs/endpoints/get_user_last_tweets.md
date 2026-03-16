# Get User Last Tweets
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_last_tweets

## Endpoint

- Method: `GET`
- Path: `/twitter/user/last_tweets`
- API URL: `'https://api.twitterapi.io/twitter/user/last_tweets?userId=USERID&userName=USERNAME&cursor=CURSOR&includeReplies=INCLUDEREPLIES'`

## Description

Retrieve tweets by user name. Sort by created_at. Results are paginated, with each page returning up to 20 tweets. If you only need to fetch the latest tweets from a single user very frequently, do not use this API—it will cost you a lot. Instead, please refer to https://twitterapi. io/blog/how-to-monitor-twitter-accounts-for-new-tweets-in-real-time. If you have more than 20 Twitter accounts requiring real-time tweet updates, use https://twitterapi. io/twitter-stream which is the most cost-effective solution.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/last_tweets?userId=USERID&userName=USERNAME&cursor=CURSOR&includeReplies=INCLUDEREPLIES' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.443Z_
