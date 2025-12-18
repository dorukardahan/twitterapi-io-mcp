# Get Space Detail
Source: https://docs.twitterapi.io/api-reference/endpoint/get_space_detail

## Endpoint

- Method: `GET`
- Path: `/twitter/spaces/detail`
- API URL: `https://api.twitterapi.io/twitter/spaces/detail`

## Description

Get spaces detail by space id

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/spaces/detail \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "data": {
    "id": "<string>",
    "title": "<string>",
    "state": "<string>",
    "created_at": "<string>",
    "scheduled_start": "<string>",
    "updated_at": "<string>",
    "media_key": "<string>",
    "is_subscribed": true,
    "settings": {
      "conversation_controls": 123,
      "disallow_join": true,
      "is_employee_only": true,
      "is_locked": true,
      "is_muted": true,
      "is_space_available_for_clipping": true,
      "is_space_available_for_replay": true,
      "no_incognito": true,
      "narrow_cast_space_type": 123,
      "max_guest_sessions": 123,
      "max_admin_capacity": 123
    },
    "stats": {
      "total_replay_watched": 123,
      "total_live_listeners": 123,
      "total_participants": 123
    },
    "creator": {
      "id": "<string>",
      "name": "<string>",
      "userName": "<string>",
      "location": "<string>",
      "url": "<string>",
      "description": "<string>",
      "protected": true,
      "isVerified": true,
      "isBlueVerified": true,
      "verifiedType": "<string>",
      "followers": 123,
      "following": 123,
      "favouritesCount": 123,
      "statusesCount": 123,
      "mediaCount": 123,
      "createdAt": "<string>",
      "coverPicture": "<string>",
      "profilePicture": "<string>",
      "canDm": true,
      "affiliatesHighlightedLabel": {},
      "isAutomated": true,
      "automatedBy": "<string>"
    },
    "participants": {
      "admins": [
        {
          "id": "<string>",
          "name": "<string>",
          "userName": "<string>",
          "location": "<string>",
          "url": "<string>",
          "description": "<string>",
          "protected": true,
          "isVerified": true,
          "isBlueVerified": true,
          "verifiedType": "<string>",
          "followers": 123,
          "following": 123,
          "favouritesCount": 123,
          "statusesCount": 123,
          "mediaCount": 123,
          "createdAt": "<string>",
          "coverPicture": "<string>",
          "profilePicture": "<string>",
          "canDm": true,
          "affiliatesHighlightedLabel": {},
          "isAutomated": true,
          "automatedBy": "<string>",
          "participant_info": {
            "periscope_user_id": "<string>",
            "start_time": "<string>",
            "is_muted_by_admin": true,
            "is_muted_by_guest": true
          }
        }
      ],
      "speakers": [
        {
          "id": "<string>",
          "name": "<string>",
          "userName": "<string>"
        }
      ],
      "listeners": [
        {
          "id": "<string>",
          "name": "<string>"
        }
      ]
    }
  },
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:19.166Z_
