# twitterapi.io - Twitter data, 96% cheaper. No auth, no limits, just API.
Source: https://docs.twitterapi.io/api-reference/endpoint/get_community_members

## Endpoint

- Method: `GET`
- Path: `/twitter/community/members`
- API URL: `https://api.twitterapi.io/twitter/community/members`

## Description

Get members of a community. Page size is 20.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/community/members \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "members": [
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

_Scraped at: 2025-12-13T03:07:23.734Z_
