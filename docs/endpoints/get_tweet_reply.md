# Get Tweet Reply
Source: https://docs.twitterapi.io/api-reference/endpoint/get_tweet_reply

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/replies`
- API URL: `https://api.twitterapi.io/twitter/tweet/replies`

## Description

get tweet replies by tweet id. Each page returns up to 20 replies(Sometimes less than 20,because we will filter out ads or other not  tweets). Use cursor for pagination. Order by reply time desc

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/replies \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "replies": [
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

_Scraped at: 2025-12-18T10:06:20.515Z_
