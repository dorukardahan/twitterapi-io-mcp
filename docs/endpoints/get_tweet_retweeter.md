# Get Tweet Retweeter
Source: https://docs.twitterapi.io/api-reference/endpoint/get_tweet_retweeter

## Endpoint

- Method: `GET`
- Path: `/twitter/tweet/retweeters`
- API URL: `https://api.twitterapi.io/twitter/tweet/retweeters`

## Description

get tweet retweeters by tweet id. Each page returns about 100 retweeters. Use cursor for pagination. Order by retweet time desc

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/tweet/retweeters \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "users": [
    {
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
    }
  ],
  "has_next_page": true,
  "next_cursor": "<string>",
  "status": "success",
  "message": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:27.196Z_
