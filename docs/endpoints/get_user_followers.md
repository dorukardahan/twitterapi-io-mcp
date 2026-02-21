# Get User Followers
Source: https://docs.twitterapi.io/api-reference/endpoint/get_user_followers

## Endpoint

- Path: `/twitter/user/followers`

## Description

Get user followers in reverse chronological order (newest first). Returns exactly 200 followers per page, sorted by follow date. Most recent followers appear on the first page. Use cursor for pagination through the complete followers list.

## Example Response

```json
{
  &quot;followers&quot;: [
    {
      &quot;type&quot;: &quot;user&quot;,
      &quot;userName&quot;: &quot;&lt;string&gt;&quot;,
      &quot;url&quot;: &quot;&lt;string&gt;&quot;,
      &quot;id&quot;: &quot;&lt;string&gt;&quot;,
      &quot;name&quot;: &quot;&lt;string&gt;&quot;,
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
    }
  ],
  &quot;status&quot;: &quot;success&quot;,
  &quot;message&quot;: &quot;&lt;string&gt;&quot;
}
```

_Scraped at: 2026-02-21T05:47:45.469Z_
