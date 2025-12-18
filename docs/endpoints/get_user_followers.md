# Get User Followers
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_followers

## Endpoint

- Method: `GET`
- Path: `/twitter/user/followers`
- API URL: `https://api.twitterapi.io/twitter/user/followers`

## Description

Get user followers in reverse chronological order (newest first). Returns exactly 200 followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/followers \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "followers": [
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
  "status": "success",
  "message": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:22.132Z_
