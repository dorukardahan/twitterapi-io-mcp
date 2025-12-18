# Changelog | TwitterAPI.io - Latest Updates and New Features
Source: https://twitterapi.io/changelog

## Description

Stay up-to-date with the latest features and improvements to TwitterAPI.io. View our changelog for detailed information about new endpoints, performance improvements, and more.

## Sections

- [object Object]


## Content

Loading... twitterapi.io Enterprise-grade public data API that powers your decision-making with real-time social intelligence.

We donate a portion of every sale to fund carbon removal technologies.

© 2025 twitterapi.io. All rights reserved. This site is unaffiliated with X Corp. (Twitter).

Stay up-to-date with the latest features, improvements, and bug fixes for TwitterAPI.io

Two new endpoints for accessing Twitter list data

Get List Members - Retrieve members of any Twitter list Get List Followers - Access followers of any Twitter list ✓ May 22, 2025 Update New Feature Low Balance Warning Notifications Automatic email alerts when your account credits are running low

We've implemented an automatic notification system that sends warning emails when your account balance is running low. This helps prevent unexpected service interruptions and ensures your API access remains uninterrupted.

Sample Email Preview Subject: [Action Required] Your TwitterAPI.io balance is running low

Hello [Username],

Your TwitterAPI.io account balance is currently at 10% of your typical monthly usage. To avoid service interruption, we recommend adding credits to your account.

Current Balance: $5.25 Estimated Remaining API Calls: ~3,500 Estimated Days Remaining: 3

[Add Credits Now]

You can customize notification thresholds and frequency in your account settings . By default, all accounts have this feature enabled.

For any questions about this feature, please contact our support team .

Check if two users follow each other with a single API call

Added new API check_follow_relationship that allows you to determine if two users follow each other with just one API call.

Check Follow Relationship Benefits Efficiency : Get bidirectional follow status with a single API call instead of two separate requests Cost Savings : Reduce API usage and associated costs by 50% for follow relationship checks Simplified Logic : Streamline your code with a single endpoint that returns comprehensive relationship data Example Response { "status": "success", "message": "check follow relationship success", "data": { "following": false, "followed_by": true } } Use Cases This endpoint is particularly useful for social graph analysis, mutual connection discovery, and building more efficient user relationship features in your applications.

For implementation examples, check our developer resources .

Fetch complete conversation context in a single API call

Our latest endpoint allows developers to fetch the complete conversation context for any tweet - including parent tweets and direct replies in a single call.

Get Tweet Thread Context Benefits Simplified Data Retrieval : Get entire conversation threads with a single API call instead of multiple requests Complete Context : Access parent tweets, the target tweet, and direct replies in one structured response Improved Performance : Reduce API calls and latency when analyzing conversations Use Cases This endpoint is particularly valuable for conversation analysis, sentiment tracking across threads, and building more context-aware social media monitoring tools. It enables developers to create richer user experiences by presenting complete conversation flows.

New endpoints for sending tweets and interacting with content

Login by Email or Username Login by 2FA Create Tweet Like Tweet Benefits These new endpoints enable developers to create more interactive applications that can not only read Twitter data but also publish content and engage with tweets. This opens up new possibilities for social media management tools, automated content publishing, and engagement analytics.

For any questions about these new features, please contact our support team .

More updates coming soon. Stay tuned!


## Lists

- Changelog | TwitterAPI.io - Latest Updates and New Features (self.__next_s=self.__next_s||[]).push([0,{"children":"\n window.__turnstileReady = false;\n window.turnstileOnLoad = function () {\n window.__turnstileReady = true;\n window.dispatchEvent(new Event('turnstile-loaded'));\n };\n ","id":"cf-turnstile-onload"}]) (self.__next_s=self.__next_s||[]).push(["https://challenges.cloudflare.com/turnstile/v0/api.js?onload=turnstileOnLoad",{}]) try { const urlParams = new URLSearchParams(window.location.search); const refCode = urlParams.get('ref'); const gclidFromURL = urlParams.get('gclid'); if (refCode) { localStorage.setItem('referral_code', refCode); let chromeUid = localStorage.getItem('chrome_uid'); if (!chromeUid) { console.info("no uid will new.",refCode) function uuidv4() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); } chromeUid = uuidv4(); localStorage.setItem('chrome_uid', chromeUid); fetch(`https://api.twitterapi.io/backend/user/log_affiliate_click?referral_code=${refCode}&chrome_uid=${chromeUid}`) .then(response => { if (!response.ok) { console.error('Failed to log affiliate click:', response.status); } }) .catch(error => { console.error('Error logging affiliate click:', error); }); } } } catch (e) { console.error('Error handling referral:', e); } if(gclidFromURL){ localStorage.setItem('gclidfrom_url', gclidFromURL); } twitterapi.io Affiliate Loading... twitterapi.io Enterprise-grade public data API that powers your decision-making with real-time social intelligence. Social Responsibility 🌱 Stripe Climate Commitment We donate a portion of every sale to fund carbon removal technologies.
- Contact Us
- Payment
- Privacy Policy
- Terms of Service
- Acceptable Use Policy
- Get List Members - Retrieve members of any Twitter list
- Get List Followers - Access followers of any Twitter list
- Threshold Monitoring : The system continuously monitors your account balance
- Tiered Alerts : You'll receive notifications at different threshold levels (25%, 10%, and 5% of your typical monthly usage)
- Actionable Information : Each email includes your current balance, estimated remaining API calls, and a direct link to add credits
- Prevent Service Interruptions : Never run out of credits unexpectedly
- Better Planning : Forecast your API usage and budget more effectively
- Peace of Mind : Automated monitoring means one less thing to worry about
- Check Follow Relationship
- Efficiency : Get bidirectional follow status with a single API call instead of two separate requests
- Cost Savings : Reduce API usage and associated costs by 50% for follow relationship checks
- Simplified Logic : Streamline your code with a single endpoint that returns comprehensive relationship data
- Get Tweet Thread Context
- Simplified Data Retrieval : Get entire conversation threads with a single API call instead of multiple requests
- Complete Context : Access parent tweets, the target tweet, and direct replies in one structured response
- Improved Performance : Reduce API calls and latency when analyzing conversations
- Send Tweets : Create and publish tweets directly through the API
- Like Tweets : Interact with tweets by liking them via API endpoints
- Login by Email or Username
- Login by 2FA
- Create Tweet
- Like Tweet


_Scraped at: 2025-12-13T03:07:07.726Z_
