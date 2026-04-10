# Retweet Tweet
Source: https://docs.twitterapi.io/api-reference/endpoint/retweet_tweet

## Endpoint

- Method: `POST`
- Path: `/twitter/retweet_tweet`
- API URL: `'https://api.twitterapi.io/twitter/retweet_tweet'`

## Description

Retweet a tweet.Need to login first. Trial operation price: $0.001 per call.

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/retweet_tweet' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

## Body Parameters

- `auth_session` (string, required): The session of the login. It's returned by /twitter/login_by_2fa
- `tweet_id` (string, required): The id of the tweet to retweet
- `proxy` (string, required): The proxy to use.Please use high-quality residential proxies and avoid free proxies.Required.Example: http://username:password@ip:port.You can get proxy from: https://www.webshare.io/?referral_code=4e0q1n00a504

_Scraped at: 2026-04-10T04:07:53.671214Z_
