# Get Article
Source: https://docs.twitterapi.io/api-reference/endpoint/get_article

## Endpoint

- Method: `GET`
- Path: `/twitter/article`
- API URL: `https://api.twitterapi.io/twitter/article`

## Description

get article by tweet id. cost 100 credit per article

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/article \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "article": {
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
    "replyCount": 123,
    "likeCount": 123,
    "quoteCount": 123,
    "viewCount": 123,
    "createdAt": "<string>",
    "title": "<string>",
    "preview_text": "<string>",
    "cover_media_img_url": "<string>",
    "contents": [
      {
        "text": "<string>"
      }
    ]
  },
  "status": "success",
  "message": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:23.097Z_
