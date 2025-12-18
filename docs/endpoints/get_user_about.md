# Get User About
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_about

## Endpoint

- Method: `GET`
- Path: `/twitter/user_about`
- API URL: `https://api.twitterapi.io/twitter/user_about`

## Description

Get user profile about by screen name

## Example (curl)

```bash
curl --request GET \
  --url https://api.twitterapi.io/twitter/user_about \
  --header 'X-API-Key: <api-key>'
```

## Example Response

```json
{
  "data": {
    "id": "<string>",
    "name": "<string>",
    "userName": "<string>",
    "createdAt": "<string>",
    "isBlueVerified": true,
    "protected": true,
    "affiliates_highlighted_label": {
      "label": {
        "badge": {
          "url": "<string>"
        },
        "description": "<string>",
        "url": {
          "url": "<string>",
          "urlType": "<string>"
        },
        "userLabelDisplayType": "<string>",
        "userLabelType": "<string>"
      }
    },
    "about_profile": {
      "account_based_in": "<string>",
      "location_accurate": true,
      "learn_more_url": "<string>",
      "affiliate_username": "<string>",
      "source": "<string>",
      "username_changes": {
        "count": "<string>"
      }
    },
    "identity_profile_labels_highlighted_label": {
      "label": {
        "description": "<string>",
        "badge": {
          "url": "<string>"
        },
        "url": {
          "url": "<string>",
          "urlType": "<string>"
        },
        "userLabelDisplayType": "<string>",
        "userLabelType": "<string>"
      }
    }
  },
  "status": "success",
  "msg": "<string>"
}
```

_Scraped at: 2025-12-18T10:06:21.496Z_
