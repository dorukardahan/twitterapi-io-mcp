# Get User Last Tweets
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_last_tweets

## Endpoint

- Method: `GET`
- Path: `/twitter/user/last_tweets`
- API URL: `https://api.twitterapi.io/twitter/user/last_tweets`

## Description

Retrieve tweets by user name. Sort by created_at. Results are paginated, with each page returning up to 20 tweets. If you only need to fetch the latest tweets from a single user very frequently, do not use this API—it will cost you a lot. Instead, please refer to https://twitterapi. io/blog/how-to-monitor-twitter-accounts-for-new-tweets-in-real-time. If you have more than 20 Twitter accounts requiring real-time tweet updates, use https://twitterapi. io/twitter-stream which is the most cost-effective solution.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/last_tweets \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "tweets": [
    {
      "type": "tweet",
      "id": "<string>",
      "url": "<string>",
      "text": "<string>",
      "source": "<string>",
      "retweetCount": 123,
      "replyCount": 123,
      "likeCount": 123,
      "quoteCount": 123,
      "viewCount": 123,
      "createdAt": "<string>",
      "lang": "<string>",
      "bookmarkCount": 123,
      "isReply": true,
      "inReplyToId": "<string>",
      "conversationId": "<string>",
      "displayTextRange": [
        123
      ],
      "inReplyToUserId": "<string>",
      "inReplyToUsername": "<string>",
      "author": {
        "type": "user",
        "userName": "<string>",
        "url": "<string>",
        "id": "<string>",
        "name": "<string>",
        "isBlueVerified": true,
        "verifiedType": "<string>",
        "profilePicture": "<string>",
        "coverPicture": "<string>",
        "description": "<string>",
        "location": "<string>",
        "followers": 123,
        "following": 123,
        "canDm": true,
        "createdAt": "<string>",
        "favouritesCount": 123,
        "hasCustomTimelines": true,
        "isTranslator": true,
        "mediaCount": 123,
        "statusesCount": 123,
        "withheldInCountries": [
          "<string>"
        ],
        "affiliatesHighlightedLabel": {},
        "possiblySensitive": true,
        "pinnedTweetIds": [
          "<string>"
        ],
        "isAutomated": true,
        "automatedBy": "<string>",
        "unavailable": true,
        "message": "<string>",
        "unavailableReason": "<string>",
        "profile_bio": {
          "description": "<string>",
          "entities": {
            "description": {
              "urls": [
                {
                  "display_url": "<string>",
                  "expanded_url": "<string>",
                  "indices": [
                    123
                  ],
                  "url": "<string>"
                }
              ]
            },
            "url": {
              "urls": [
                {
                  "display_url": "<string>",
                  "expanded_url": "<string>",
                  "indices": [
                    123
                  ],
                  "url": "<string>"
                }
              ]
            }
          }
        }
      },
      "entities": {
        "hashtags": [
          {
            "indices": [
              123
            ],
            "text": "<string>"
          }
        ],
        "urls": [
          {
            "display_url": "<string>",
            "expanded_url": "<string>",
            "indices": [
              123
            ],
            "url": "<string>"
          }
        ],
        "user_mentions": [
          {
            "id_str": "<string>",
            "name": "<string>",
            "screen_name": "<string>"
          }
        ]
      },
      "quoted_tweet": "<unknown>",
      "retweeted_tweet": "<unknown>",
      "isLimitedReply": true
    }
  ],
  "has_next_page": true,
  "next_cursor": "<string>",
  "status": "success",
  "message": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:22.751Z_
