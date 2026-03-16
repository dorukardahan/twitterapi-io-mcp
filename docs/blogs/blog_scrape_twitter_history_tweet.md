# Twitter Advanced Search API Guide
Source: https://twitterapi.io/blog/scrape-twitter-history-tweet

## Sections

- Twitter Advanced Search API Guide
- API Overview
- Comprehensive Data
- Advanced Search
- No Limits
- Implementation Examples
- Python Implementation
- Getting Started
- 1. Get API Key
- 2. Copy Code
- 3. Start Fetching
- Ready to Access Historical Twitter Data?


## Content

We donate a portion of every sale to fund carbon removal technologies.

© 2026 twitterapi.io. All rights reserved. This site is unaffiliated with X Corp. (Twitter).

Back to Blog Twitter Advanced Search API Guide Advanced Search Historical Data Python Node.js Java Use the Advanced Search API to retrieve historical tweets by keywords, users, hashtags, and more. Get comprehensive access to Twitter's data with simple API calls.

Comprehensive Data Access historical tweets with full metadata, engagement metrics, and user information.

Advanced Search Use Twitter's powerful search syntax to find exactly what you need.

No Limits Bypass Twitter's 800-1200 tweet pagination limit with our max_id implementation.

Why use max_id parameter? Twitter's search API typically returns only 800-1200 tweets per query due to pagination limits. By modifying the query with max_id, we can continue fetching older tweets beyond this limit, giving you access to comprehensive historical data. Implementation Examples Ready-to-use code examples for integrating with the TwitterAPI.io Advanced Search API. Copy and paste these examples to get started immediately.

Python Implementation Copy import requests import time from typing import List, Dict def fetch_all_tweets(query: str, api_key: str) -> List[Dict]: """ Fetches all tweets matching the given query from Twitter API, handling deduplication. Args: query (str): The search query for tweets api_key (str): Twitter API key for authentication Returns: List[Dict]: List of unique tweets matching the query Notes: - Handles pagination using cursor and max_id parameters - Deduplicates tweets based on tweet ID to handle max_id overlap - Implements rate limiting handling - Continues fetching beyond Twitter's initial 800-1200 tweet limit - Includes error handling for API failures """ base_url = "https://api.twitterapi.io/twitter/tweet/advanced_search" headers = {"x-api-key": api_key} all_tweets = [] seen_tweet_ids = set() # Set to track unique tweet IDs cursor = None last_min_id = None max_retries = 3 while True: # Prepare query parameters params = { "query": query, "queryType": "Latest" } # Add cursor if available (for regular pagination) if cursor: params["cursor"] = cursor elif last_min_id: # Add max_id if available (for fetching beyond initial limit) params["query"] = f"{query} max_id:{last_min_id}" retry_count = 0 while retry_count < max_retries: try: # Make API request response = requests.get(base_url, headers=headers, params=params) response.raise_for_status() # Raise exception for bad status codes data = response.json() # Extract tweets and metadata tweets = data.get("tweets", []) has_next_page = data.get("has_next_page", False) cursor = data.get("next_cursor", None) # Filter out duplicate tweets new_tweets = [tweet for tweet in tweets if tweet.get("id") not in seen_tweet_ids] # Add new tweet IDs to the set and tweets to the collection for tweet in new_tweets: seen_tweet_ids.add(tweet.get("id")) all_tweets.append(tweet) # If no new tweets and no next page, break the loop if not new_tweets and not has_next_page: return all_tweets # Update last_min_id from the last tweet if available if new_tweets: last_min_id = new_tweets[-1].get("id") # If no next page but we have new tweets, try with max_id if not has_next_page and new_tweets: cursor = None # Reset cursor for max_id pagination break # If has next page, continue with cursor if has_next_page: break except requests.exceptions.RequestException as e: retry_count += 1 if retry_count == max_retries: print(f"Failed to fetch tweets after {max_retries} attempts: {str(e)}") return all_tweets # Handle rate limiting if hasattr(response, 'status_code') and response.status_code == 429: #For users in the free trial period, the QPS is very low—only one API request can be made every 5 seconds. Once you complete the recharge, the QPS limit will be increased to 20. print("Rate limit reached. Waiting for 1 second...") time.sleep(1) # Wait 1 second for rate limit reset else: print(f"Error occurred: {str(e)}. Retrying {retry_count}/{max_retries}") time.sleep(2 ** retry_count) # Exponential backoff # If no more pages and no new tweets with max_id, we're done if not has_next_page and not new_tweets: break return all_tweets # Example usage if __name__ == "__main__": api_key = "your_api_key_here" # query by keywords query = "python programming" # Retrieving all tweets from a specific account within a specified time period.and you can also filter data based on the number of likes. # For the usage of query parameters, please refer to the relevant documentation. # https://github.com/igorbrigadir/twitter-advanced-search #query = "from:elonmusk since:2009-01-01 until:2019-01-01 min_faves:10" # tweets = fetch_all_tweets(query, api_key) print(f"Fetched {len(tweets)} unique tweets") # Save to file import json with open('tweets.json', 'w') as f: json.dump(tweets, f, indent=2) Getting Started 1. Get API Key Sign up for a free TwitterAPI.io account and get your API key from the dashboard.

Choose your preferred language and copy the ready-to-use code examples above.

Replace the API key placeholder and query, then run your code to start collecting tweets.

Start using the Advanced Search API today. No setup complexity, no rate limits, just reliable access to comprehensive Twitter data.


## Lists

- Contact Us
- Payment
- Privacy Policy
- Terms of Service
- Acceptable Use Policy


## Code

```text
import requests
import time
from typing import List, Dict

def fetch_all_tweets(query: str, api_key: str) -> List[Dict]:
    """
    Fetches all tweets matching the given query from Twitter API, handling deduplication.

    Args:
        query (str): The search query for tweets
        api_key (str): Twitter API key for authentication

    Returns:
        List[Dict]: List of unique tweets matching the query

    Notes:
        - Handles pagination using cursor and max_id parameters
        - Deduplicates tweets based on tweet ID to handle max_id overlap
        - Implements rate limiting handling
        - Continues fetching beyond Twitter's initial 800-1200 tweet limit
        - Includes error handling for API failures
    """
    base_url = "https://api.twitterapi.io/twitter/tweet/advanced_search"
    headers = {"x-api-key": api_key}
    all_tweets = []
    seen_tweet_ids = set()  # Set to track unique tweet IDs
    cursor = None
    last_min_id = None
    max_retries = 3

    while True:
        # Prepare query parameters
        params = {
            "query": query,
            "queryType": "Latest"
        }

        # Add cursor if available (for regular pagination)
        if cursor:
            params["cursor"] = cursor
        elif last_min_id:
            # Add max_id if available (for fetching beyond initial limit)
            params["query"] = f"{query} max_id:{last_min_id}"

        retry_count = 0
        while retry_count < max_retries:
            try:
                # Make API request
                response = requests.get(base_url, headers=headers, params=params)
                response.raise_for_status()  # Raise exception for bad status codes
                data = response.json()

                # Extract tweets and metadata
                tweets = data.get("tweets", [])
                has_next_page = data.get("has_next_page", False)
                cursor = data.get("next_cursor", None)

                # Filter out duplicate tweets
                new_tweets = [tweet for tweet in tweets if tweet.get("id") not in seen_tweet_ids]
                
                # Add new tweet IDs to the set and tweets to the collection
                for tweet in new_tweets:
                    seen_tweet_ids.add(tweet.get("id"))
                    all_tweets.append(tweet)

                # If no new tweets and no next page, break the loop
                if not new_tweets and not has_next_page:
                    return all_tweets

                # Update last_min_id from the last tweet if available
                if new_tweets:
                    last_min_id = new_tweets[-1].get("id")

                # If no next page but we have new tweets, try with max_id
                if not has_next_page and new_tweets:
                    cursor = None  # Reset cursor for max_id pagination
                    break

                # If has next page, continue with cursor
                if has_next_page:
                    break

            except requests.exceptions.RequestException as e:
                retry_count += 1
                if retry_count == max_retries:
                    print(f"Failed to fetch tweets after {max_retries} attempts: {str(e)}")
                    return all_tweets

                # Handle rate limiting
                if hasattr(response, 'status_code') and response.status_code == 429:
                    #For users in the free trial period, the QPS is very low—only one API request can be made every 5 seconds. Once you complete the recharge, the QPS limit will be increased to 20.
                    print("Rate limit reached. Waiting for 1 second...")
                    time.sleep(1)  # Wait 1 second for rate limit reset
                else:
                    print(f"Error occurred: {str(e)}. Retrying {retry_count}/{max_retries}")
                    time.sleep(2 ** retry_count)  # Exponential backoff

        # If no more pages and no new tweets with max_id, we're done
        if not has_next_page and not new_tweets:
            break

    return all_tweets

# Example usage
if __name__ == "__main__":
    api_key = "your_api_key_here"

    # query by keywords
    query = "python programming"

    # Retrieving all tweets from a specific account within a specified time period.and you can also filter data based on the number of likes. 
    # For the usage of query parameters, please refer to the relevant documentation.
    # https://github.com/igorbrigadir/twitter-advanced-search 
    #query = "from:elonmusk since:2009-01-01 until:2019-01-01 min_faves:10"
    
    #

    tweets = fetch_all_tweets(query, api_key)
    
    print(f"Fetched {len(tweets)} unique tweets")
    
    # Save to file
    import json
    with open('tweets.json', 'w') as f:
        json.dump(tweets, f, indent=2)
```

_Scraped at: 2026-02-08T22:05:55.549Z_
