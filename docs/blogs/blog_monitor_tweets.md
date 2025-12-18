# Affordable, Real-Time X (Twitter) API — No Limits
Source: https://twitterapi.io/blog/how-to-monitor-twitter-accounts-for-new-tweets-in-real-time

## Description

Build with an affordable, real-time X (Twitter) API. Get instant access to timelines, tweets, and write actions with predictable pricing and no limits.

## Sections

- [object Object]


## Content

Loading... How to Monitor Twitter Accounts for New Tweets in Real-Time Published on December 6, 2025

✓ Real-Time Twitter Account Monitoring Staying up-to-date with specific Twitter accounts is essential for market intelligence, competitive analysis, and trend spotting. This guide shows you how to set up automated monitoring for new tweets from any Twitter account using TwitterAPI.io's powerful Advanced Search API.

Real-time monitoring of Twitter accounts offers numerous advantages:

Let's see how you can implement this with just a few lines of code.

First, you'll need to create an account on TwitterAPI.io and get your API key. New accounts receive $1 in free credits to test the service.

For Python users, ensure you have the requests library installed:

pip install requests Step 2: Create the Monitoring Script Set Time Window since_time / until_time Make API Request advanced_search Process Tweets Parse Response Update Last Check Store timestamp Take Action Alert/Store/Process Wait Interval Sleep until next check Tweet Monitoring Process Flow Optimize this cycle frequency to balance timely updates and API costs Here's a complete script that checks for new tweets from a specific account:

import requests import time from datetime import datetime, timedelta # Configuration API_KEY = "Your API Key" # TODO Replace with your TwitterAPI.io API key. You can find it in https://twitterapi.io/dashboard. TARGET_ACCOUNT = "elonmusk" # The account you want to monitor CHECK_INTERVAL = 300 # Check every 5 minutes (300 seconds) LAST_CHECKED_TIME = datetime.utcnow() - timedelta(hours=1) # Start by checking the last hour def check_for_new_tweets(): global LAST_CHECKED_TIME # Format times for the API query until_time = datetime.utcnow() since_time = LAST_CHECKED_TIME # Format times as strings in the format Twitter's API expects since_str = since_time.strftime("%Y-%m-%d_%H:%M:%S_UTC") until_str = until_time.strftime("%Y-%m-%d_%H:%M:%S_UTC") # Construct the query query = f"from:{TARGET_ACCOUNT} since:{since_str} until:{until_str} include:nativeretweets" #Please refer to this document for detailed Twitter advanced search syntax. https://github.com/igorbrigadir/twitter-advanced-search # API endpoint url = "https://api.twitterapi.io/twitter/tweet/advanced_search" # Request parameters params = { "query": query, "queryType": "Latest" } # Headers with API key headers = { "X-API-Key": API_KEY } # Make the request and handle pagination all_tweets = [] next_cursor = None while True: # Add cursor to params if we have one if next_cursor: params["cursor"] = next_cursor response = requests.get(url, headers=headers, params=params) # Parse the response if response.status_code == 200: data = response.json() tweets = data.get("tweets", []) if tweets: all_tweets.extend(tweets) # Check if there are more pages if data.get("has_next_page", False) and data.get("next_cursor","") != "": next_cursor = data.get("next_cursor") continue else: break else: print(f"Error: {response.status_code} - {response.text}") break # Process all collected tweets if all_tweets: print(f"Found {len(all_tweets)} total tweets from {TARGET_ACCOUNT}!") for tweet in all_tweets: print(f"[{tweet['createdAt']}] {tweet['text']}") # Here you could send notifications, save to database, etc. else: print(f"No new tweets from {TARGET_ACCOUNT} since last check.") # Update the last checked time LAST_CHECKED_TIME = until_time # Main monitoring loop def main(): print(f"Starting to monitor tweets from @{TARGET_ACCOUNT}") print(f"Checking every {CHECK_INTERVAL} seconds") try: while True: check_for_new_tweets() time.sleep(CHECK_INTERVAL) except KeyboardInterrupt: print("Monitoring stopped.") if __name__ == "__main__": main() Optimize Your Monitoring Frequency The script above checks for new tweets every 5 minutes. You can adjust the CHECK_INTERVAL variable based on your needs:

1-5 minutes

15-30 minutes

Remember that more frequent checks will increase your API usage and costs.

If the account you're monitoring posts many tweets, you may need to handle pagination. The API returns has_next_page and next_cursor fields to help you navigate through multiple pages of results.

TwitterAPI.io's pricing is straightforward, but it's important to understand how your monitoring strategy affects costs:

Let's compare different monitoring strategies for a 30-day month:

By optimizing your check frequency, you can significantly reduce costs while still capturing the tweets you need.

Each of these applications can be implemented using the monitoring script we've provided, with minor modifications to handle the specific requirements of your use case.

Setting up automated monitoring for Twitter accounts is straightforward with TwitterAPI.io's Advanced Search API. With just a few lines of code, you can create a robust system that keeps you informed about new tweets from any account in near real-time.

By carefully optimizing your monitoring frequency and implementing smart pagination handling, you can build a cost-effective solution that meets your specific needs.

Sign up for TwitterAPI.io today and get $1 in free credits to begin monitoring Twitter accounts immediately.

Enterprise-grade public data API that powers your decision-making with real-time social intelligence.

We donate a portion of every sale to fund carbon removal technologies.

© 2025 twitterapi.io. All rights reserved. This site is unaffiliated with X Corp. (Twitter).


## Lists

- Affordable, Real-Time X (Twitter) API — No Limits (self.__next_s=self.__next_s||[]).push([0,{"children":"\n window.__turnstileReady = false;\n window.turnstileOnLoad = function () {\n window.__turnstileReady = true;\n window.dispatchEvent(new Event('turnstile-loaded'));\n };\n ","id":"cf-turnstile-onload"}]) (self.__next_s=self.__next_s||[]).push(["https://challenges.cloudflare.com/turnstile/v0/api.js?onload=turnstileOnLoad",{}]) try { const urlParams = new URLSearchParams(window.location.search); const refCode = urlParams.get('ref'); const gclidFromURL = urlParams.get('gclid'); if (refCode) { localStorage.setItem('referral_code', refCode); let chromeUid = localStorage.getItem('chrome_uid'); if (!chromeUid) { console.info("no uid will new.",refCode) function uuidv4() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); } chromeUid = uuidv4(); localStorage.setItem('chrome_uid', chromeUid); fetch(`https://api.twitterapi.io/backend/user/log_affiliate_click?referral_code=${refCode}&chrome_uid=${chromeUid}`) .then(response => { if (!response.ok) { console.error('Failed to log affiliate click:', response.status); } }) .catch(error => { console.error('Error logging affiliate click:', error); }); } } } catch (e) { console.error('Error handling referral:', e); } if(gclidFromURL){ localStorage.setItem('gclidfrom_url', gclidFromURL); } twitterapi.io Affiliate Loading... How to Monitor Twitter Accounts for New Tweets in Real-Time Published on December 6, 2025 ✓ Real-Time Twitter Account Monitoring Staying up-to-date with specific Twitter accounts is essential for market intelligence, competitive analysis, and trend spotting. This guide shows you how to set up automated monitoring for new tweets from any Twitter account using TwitterAPI.io's powerful Advanced Search API. Table of Contents Why Monitor Specific Twitter Accounts?
- Implementation Guide: Monitoring New Tweets
- Optimize Your Monitoring Frequency
- Cost Considerations and Optimization
- Real-World Applications
- Conclusion
- Track competitors' product announcements
- Monitor industry influencers for breaking news
- Get instant alerts when key stakeholders mention your brand
- Automate responses to customer service tweets
- Identify trending topics within your niche
- Every hour Every 30 min Every 15 min Every 5 min Every 1 min $0 $1 $2 $3 $4 $5 Monitoring Frequency Monthly Cost ($) $0.09 $0.18 $0.36 $1.00 $5.00 Higher Frequency Costs: Every 10 seconds: $30/month Every 1 second: $300/month Monthly cost (30 days) API Pricing When tweets are found: $0.00015 per tweet returned
- When no tweets are found: $0.00012 per API call
- Adjust monitoring frequency based on account activity
- Use smart time windows for efficient checking
- Implement batch processing for multiple accounts
- 288 checks per day × 30 days = 8,640 API calls per month
- If 20% of calls find tweets (average 2 tweets each):
- - 1,728 calls with tweets: 1,728 × 2 tweets × $0.00015 = $0.5184
- - 6,912 calls without tweets: 6,912 × $0.00012 = $0.8294
- Total monthly cost: $1.3478
- 48 checks per day × 30 days = 1,440 API calls per month
- If 60% of calls find tweets (average 3 tweets each):
- - 864 calls with tweets: 864 × 3 tweets × $0.00015 = $0.3888
- - 576 calls without tweets: 576 × $0.00012 = $0.0691
- Total monthly cost: $0.4579
- Each of these applications can be implemented using the monitoring script we've provided, with minor modifications to handle the specific requirements of your use case. Conclusion Setting up automated monitoring for Twitter accounts is straightforward with TwitterAPI.io's Advanced Search API. With just a few lines of code, you can create a robust system that keeps you informed about new tweets from any account in near real-time. By carefully optimizing your monitoring frequency and implementing smart pagination handling, you can build a cost-effective solution that meets your specific needs. Ready to Get Started? Sign up for TwitterAPI.io today and get $1 in free credits to begin monitoring Twitter accounts immediately. Start Free Trial twitterapi.io Enterprise-grade public data API that powers your decision-making with real-time social intelligence. Social Responsibility 🌱 Stripe Climate Commitment We donate a portion of every sale to fund carbon removal technologies.
- Contact Us
- Payment
- Privacy Policy
- Terms of Service
- Acceptable Use Policy


## Code

```text
pip install requests
```

```text
import requests
import time
from datetime import datetime, timedelta

# Configuration
API_KEY = "Your API Key"  # TODO Replace with your TwitterAPI.io API key. You can find it in https://twitterapi.io/dashboard.
TARGET_ACCOUNT = "elonmusk"  # The account you want to monitor
CHECK_INTERVAL = 300  # Check every 5 minutes (300 seconds)
LAST_CHECKED_TIME = datetime.utcnow() - timedelta(hours=1)  # Start by checking the last hour

def check_for_new_tweets():
    global LAST_CHECKED_TIME
    
    # Format times for the API query
    until_time = datetime.utcnow()
    since_time = LAST_CHECKED_TIME
    
    # Format times as strings in the format Twitter's API expects
    since_str = since_time.strftime("%Y-%m-%d_%H:%M:%S_UTC")
    until_str = until_time.strftime("%Y-%m-%d_%H:%M:%S_UTC")
    
    # Construct the query
    query = f"from:{TARGET_ACCOUNT} since:{since_str} until:{until_str} include:nativeretweets"
    #Please refer to this document for detailed Twitter advanced search syntax. https://github.com/igorbrigadir/twitter-advanced-search
    
    # API endpoint
    url = "https://api.twitterapi.io/twitter/tweet/advanced_search"
    
    # Request parameters
    params = {
        "query": query,
        "queryType": "Latest"
    }
    
    # Headers with API key
    headers = {
        "X-API-Key": API_KEY
    }
    
    # Make the request and handle pagination
    all_tweets = []
    next_cursor = None
    
    while True:
        # Add cursor to params if we have one
        if next_cursor:
            params["cursor"] = next_cursor
            
        response = requests.get(url, headers=headers, params=params)
        
        # Parse the response
        if response.status_code == 200:
            data = response.json()
            tweets = data.get("tweets", [])
            
            if tweets:
                all_tweets.extend(tweets)
            
            # Check if there are more pages
            if data.get("has_next_page", False) and data.get("next_cursor","") != "":
                next_cursor = data.get("next_cursor")
                continue
            else:
                break
        else:
            print(f"Error: {response.status_code} - {response.text}")
            break
            
    # Process all collected tweets
    if all_tweets:
        print(f"Found {len(all_tweets)} total tweets from {TARGET_ACCOUNT}!")
        for tweet in all_tweets:
            print(f"[{tweet['createdAt']}] {tweet['text']}")
            # Here you could send notifications, save to database, etc.
    else:
        print(f"No new tweets from {TARGET_ACCOUNT} since last check.")
    
    # Update the last checked time
    LAST_CHECKED_TIME = until_time

# Main monitoring loop
def main():
    print(f"Starting to monitor tweets from @{TARGET_ACCOUNT}")
    print(f"Checking every {CHECK_INTERVAL} seconds")
    
    try:
        while True:
            check_for_new_tweets()
            time.sleep(CHECK_INTERVAL)
    except KeyboardInterrupt:
        print("Monitoring stopped.")

if __name__ == "__main__":
    main()
```

_Scraped at: 2025-12-13T03:07:14.131Z_
