# Get User Followings
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_followings

## Endpoint

- Method: `GET`
- Path: `/twitter/user/followings`
- API URL: `https://api.twitterapi.io/twitter/user/followings`

## Description

Get user followings. Each page returns exactly 200 followings. Use cursor for pagination. Sorted by follow date. Most recent followings appear on the first page.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/followings \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "followings": [
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

_Scraped at: 2025-12-18T10:06:22.426Z_
