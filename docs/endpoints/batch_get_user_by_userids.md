# Batch Get User By Userids
Source: https://docs.twitterapi.io/api-reference/endpoint/batch_get_user_by_userids

## Endpoint

- Method: `GET`
- Path: `/twitter/user/batch_info_by_ids`
- API URL: `https://api.twitterapi.io/twitter/user/batch_info_by_ids`

## Description

Batch get user info by user ids. Pricing:

- Single user request: 18 credits per user
- Bulk request (100+ users): 10 credits per user

Note: For cost optimization, we recommend batching requests when fetching multiple user profiles.

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user/batch_info_by_ids \
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
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-13T03:07:20.013Z_
