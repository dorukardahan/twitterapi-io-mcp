# Get User Timeline
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_timeline

## Endpoint

- Method: `GET`
- Path: `/twitter/user/tweet_timeline`
- API URL: `'https://api.twitterapi.io/twitter/user/tweet_timeline?userId=USERID&includeReplies=INCLUDEREPLIES&includeParentTweet=INCLUDEPARENTTWEET&cursor=CURSOR'`

## Description

Retrieve tweets by user id. Sort by created_at. Results are paginated, with each page returning up to 20 tweets. The content you see is in the same order as the tweets on the user's profile in the Twitter app, and filtering by time is not supported.

## Example (curl)

```bash
curl --request GET \
  --url 'https://api.twitterapi.io/twitter/user/tweet_timeline?userId=USERID&includeReplies=INCLUDEREPLIES&includeParentTweet=INCLUDEPARENTTWEET&cursor=CURSOR' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.443Z_
