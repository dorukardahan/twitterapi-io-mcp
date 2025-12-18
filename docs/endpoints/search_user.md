# Search User
Source: https://docs.twitterapi.io/api-reference/endpoint/search_user

## Endpoint

- Method: `GET`
- Path: `/twitter/user/search`
- API URL: `https://api.twitterapi.io/twitter/user/search`

## Description

Search user by keyword

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/search \
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
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:26.847Z_
