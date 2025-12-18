# Get Community By Id
Source: https://docs.twitterapi.io/api-reference/endpoint/get_community_by_id

## Endpoint

- Method: `GET`
- Path: `/twitter/community/info`
- API URL: `https://api.twitterapi.io/twitter/community/info`

## Description

Get community info by community id. Price: 20 credits per call. Note: This API is a bit slow, we are still optimizing it.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/community/info \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "community_info": {
    "id": "<string>",
    "name": "<string>",
    "description": "<string>",
    "question": "<string>",
    "member_count": 123,
    "moderator_count": 123,
    "created_at": "<string>",
    "join_policy": "<string>",
    "invites_policy": "<string>",
    "is_nsfw": true,
    "is_pinned": true,
    "role": "<string>",
    "primary_topic": {
      "id": "<string>",
      "name": "<string>"
    },
    "banner_url": "<string>",
    "search_tags": [
      "<string>"
    ],
    "rules": [
      {
        "id": "<string>",
        "name": "<string>",
        "description": "<string>"
      }
    ],
    "creator": {
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
    "admin": {
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
    "members_preview": [
      {}
    ]
  },
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:23.429Z_
