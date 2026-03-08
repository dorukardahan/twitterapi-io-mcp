# X/Twitter Platform Advisory — March 2026

> **Last updated**: 2026-03-08

## Search Operator Degradation

Around March 5, 2026, Twitter/X disabled or degraded several advanced search features. This affects ALL Twitter API providers (including TwitterAPI.io) because they proxy Twitter's search infrastructure.

### Affected Features

| Feature | Status | Details |
|---------|--------|---------|
| `since:DATE` / `until:DATE` | **DEGRADED** | Returns incomplete/inconsistent results. Often only 7-20 tweets regardless of actual volume. |
| Search pagination (cursor) | **BROKEN** | Returns the same page of results repeatedly instead of advancing to older tweets. |
| `since_time:UNIX` / `until_time:UNIX` | **WORKING** | Alternative format using Unix timestamps. Correctly filters by date range. |
| `within_time:Nh` | **WORKING** | Relative time window (e.g., `within_time:72h`). |
| User timeline pagination | **WORKING** | `GET /twitter/user/last_tweets` cursor pagination works normally. |
| Webhook filter rules | **WORKING** | Real-time keyword/user matching unaffected. |

### Root Cause

TwitterAPI.io's Telegram announcement (March 5):
> "For the last several days, due to the high usage, Twitter disabled some advanced search features like since, until and apparently they disabled pagination as well. [...] Our api doesn't have any custom logic or filtering, it returns you whatever it can get from Twitter by paginating."

Additionally, TwitterAPI.io founder Kaito reported an "accidental data deletion" event on March 6, requiring users to re-login. This caused:
- New API keys to be generated
- Webhook filter rules to be restored
- **Webhook URLs were NOT restored** — must be manually re-set in dashboard

### Workarounds

#### For date-range search queries

**Instead of** (broken):
```
$BTC since:2026-03-06_00:00:00_UTC until:2026-03-07_00:00:00_UTC
```

**Use** (working):
```
$BTC since_time:1741219200 until_time:1741305600
```

Convert dates: `python3 -c "from datetime import datetime,timezone; print(int(datetime(2026,3,6,tzinfo=timezone.utc).timestamp()))"`

#### For historical backfill (pagination broken)

Use **hourly time windows** with 1 page per window:
- Break 24h into 24 × 1-hour windows
- Each window returns unique tweets (~7-16 per coin)
- ~250 unique tweets per coin per day across all windows
- Skip pagination — it just returns duplicates

#### For user-specific backfill

Use `GET /twitter/user/last_tweets` with cursor pagination:
- This endpoint's pagination works normally
- Paginate backwards through user's timeline
- Client-side filter by `createdAt` date
- No dependency on broken search operators

### Webhook URL Advisory

When API keys are rotated (after data reset events, account re-login, etc.):
- Filter rules may be auto-restored
- **Webhook URL is NOT auto-restored**
- Always verify at https://twitterapi.io/tweet-filter-rules after key changes
- Monitor for collection gaps: if rules are active but 0 tweets arrive for 30+ min, check webhook URL

### Timeline

| Date | Event |
|------|-------|
| ~Mar 3 | TwitterAPI.io notices "intermittent data inconsistencies" on Tweet Search endpoint |
| ~Mar 5 | Twitter disables `since:` / `until:` operators and search pagination due to high usage |
| Mar 6 | TwitterAPI.io "accidental data deletion" — users asked to re-login, new API keys generated |
| Mar 8 | Workaround confirmed: `since_time:UNIX` format works, hourly windows bypass pagination |
