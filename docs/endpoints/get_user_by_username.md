# Get User By Username
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_by_username

## Endpoint

- Method: `GET`
- Path: `/twitter/user/info`
- API URL: `https://api.twitterapi.io/twitter/user/info`

## Description

Get user info by screen name

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/info \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "data": {
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
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:21.804Z_
