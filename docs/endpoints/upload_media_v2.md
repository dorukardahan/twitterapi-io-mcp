# Upload Media V2
Source: https://docs.twitterapi.io/api-reference/endpoint/upload_media_v2

## Endpoint

- Method: `POST`
- Path: `/twitter/upload_media_v2`
- API URL: `'https://api.twitterapi.io/twitter/upload_media_v2'`

## Description

Upload media to twitter.You must set the login_cookies.You can get the login_cookies from /twitter/user_login_v2.Price: 60 credits ($0.0006 per call). Long videos: if X is still processing the video after about 90 seconds, the response has status 'success', the media_id and processing_state ('pending' or 'in_progress'); wait about 30-60 seconds before attaching that media_id to a tweet.

## Response

Successful uploads return `media_id`, `status`, and `message`. Videos still processing on X also return `processing_state` (`pending` or `in_progress`); wait 30–60 seconds before attaching the `media_id` to a tweet.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/upload_media_v2' \
  --header 'X-API-Key: <api-key>'
```

_Scraped at: 2026-03-16T02:37:54.445Z_
