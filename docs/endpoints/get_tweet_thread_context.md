# Get Tweet Thread Context
Source: https://docs.twitterapi.io/api-reference/endpoint/get_tweet_thread_context

## Endpoint

- Path: `/twitter/tweet/thread_context`

## Description

Get the thread context of a tweet. Suppose a tweet thread consists of t1, t2 (replying to t1), t3 (replying to t2), and t4, t5, t6 (all replying to t3). If we provide an API where you input t3 and receive t1, t2, t3, t4, t5, t6. Pagination is supported. The pagination size cannot be set (due to Twitter&#x27;s limitations), and the data returned per page is not fixed.

_Scraped at: 2026-02-21T05:47:48.969Z_
