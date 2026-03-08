# Get Article
Source: https://docs.twitterapi.io/api-reference/endpoint/get_article

## Endpoint

- Path: `/twitter/article`

## Description

get article by tweet id. cost 100 credit per article

## Example Response

```json
{
  &quot;article&quot;: {
    &quot;author&quot;: {
      &quot;type&quot;: &quot;user&quot;,
      &quot;userName&quot;: &quot;&lt;string&gt;&quot;,
      &quot;url&quot;: &quot;&lt;string&gt;&quot;,
      &quot;id&quot;: &quot;&lt;string&gt;&quot;,
      &quot;name&quot;: &quot;&lt;string&gt;&quot;,
      &quot;isBlueVerified&quot;: true,
      &quot;verifiedType&quot;: &quot;&lt;string&gt;&quot;,
      &quot;profilePicture&quot;: &quot;&lt;string&gt;&quot;,
      &quot;coverPicture&quot;: &quot;&lt;string&gt;&quot;,
      &quot;description&quot;: &quot;&lt;string&gt;&quot;,
      &quot;location&quot;: &quot;&lt;string&gt;&quot;,
      &quot;followers&quot;: 123,
      &quot;following&quot;: 123,
      &quot;canDm&quot;: true,
      &quot;createdAt&quot;: &quot;&lt;string&gt;&quot;,
      &quot;favouritesCount&quot;: 123,
      &quot;hasCustomTimelines&quot;: true,
      &quot;isTranslator&quot;: true,
      &quot;mediaCount&quot;: 123,
      &quot;statusesCount&quot;: 123,
      &quot;withheldInCountries&quot;: [
        &quot;&lt;string&gt;&quot;
      ],
      &quot;affiliatesHighlightedLabel&quot;: {},
      &quot;possiblySensitive&quot;: true,
      &quot;pinnedTweetIds&quot;: [
        &quot;&lt;string&gt;&quot;
      ],
      &quot;isAutomated&quot;: true,
      &quot;automatedBy&quot;: &quot;&lt;string&gt;&quot;,
      &quot;unavailable&quot;: true,
      &quot;message&quot;: &quot;&lt;string&gt;&quot;,
      &quot;unavailableReason&quot;: &quot;&lt;string&gt;&quot;,
      &quot;profile_bio&quot;: {
        &quot;description&quot;: &quot;&lt;string&gt;&quot;,
        &quot;entities&quot;: {
          &quot;description&quot;: {
            &quot;urls&quot;: [
              {
                &quot;display_url&quot;: &quot;&lt;string&gt;&quot;,
                &quot;expanded_url&quot;: &quot;&lt;string&gt;&quot;,
                &quot;indices&quot;: [
                  123
                ],
                &quot;url&quot;: &quot;&lt;string&gt;&quot;
              }
            ]
          },
          &quot;url&quot;: {
            &quot;urls&quot;: [
              {
                &quot;display_url&quot;: &quot;&lt;string&gt;&quot;,
                &quot;expanded_url&quot;: &quot;&lt;string&gt;&quot;,
                &quot;indices&quot;: [
                  123
                ],
                &quot;url&quot;: &quot;&lt;string&gt;&quot;
              }
            ]
          }
        }
      }
    },
    &quot;replyCount&quot;: 123,
    &quot;likeCount&quot;: 123,
    &quot;quoteCount&quot;: 123,
    &quot;viewCount&quot;: 123,
    &quot;createdAt&quot;: &quot;&lt;string&gt;&quot;,
    &quot;title&quot;: &quot;&lt;string&gt;&quot;,
    &quot;preview_text&quot;: &quot;&lt;string&gt;&quot;,
    &quot;cover_media_img_url&quot;: &quot;&lt;string&gt;&quot;,
    &quot;contents&quot;: [
      {
        &quot;text&quot;: &quot;&lt;string&gt;&quot;
      }
    ]
  },
  &quot;status&quot;: &quot;success&quot;,
  &quot;message&quot;: &quot;&lt;string&gt;&quot;
}
```

_Scraped at: 2026-02-21T05:47:49.281Z_
