# Using WebSocket for Real-Time Twitter Data: A Complete Guide
Source: https://twitterapi.io/blog/using-websocket-for-real-time-twitter-data

## Description

Learn how to use WebSocket to get real-time Twitter data through TwitterAPI.io. This guide covers setup, implementation, and best practices for efficient data streaming.

## Sections

- Using WebSocket for Real-Time Twitter Data: A Complete Guide
- Why Choose WebSocket for Twitter Data?
- Setting Up Twitter Data Filter Rules
- Method 1: Using the Web Interface
- Method 2: Managing Rules via API
- Implementing the WebSocket Client
- Python WebSocket Client
- Code Breakdown
- 1. Message Handling Function (on_message)
- 2. Error Handling (on_error)
- 3. Connection Close Handling (on_close)
- 4. Connection Establishment (on_open)
- 5. Main Function (main)
- Event Data Formats
- Tweet Event
- Tweet Event JSON
- Ping Event
- Ping Event JSON
- Best Practices
- Use Cases
- Conclusion


## Content

Traditional REST APIs require constant polling to fetch the latest data, leading to latency and increased server load. WebSocket, on the other hand, establishes a persistent connection, offering:

For applications monitoring keywords, specific users, or real-time trends, WebSocket is the ideal choice.

Before connecting to the WebSocket, we need to set up filter rules to specify the types of tweets we want to monitor. There are two methods to set rules:

Tweet Filter Rules Config

Rules can also be created, updated, deleted, and queried through the API. Refer to the API documentation for details.

Note: Billing starts once you set a rule to active, even if you haven't configured a webhook or WebSocket.

Here's a complete Python WebSocket client example for connecting to TwitterAPI.io's WebSocket service:

This callback function processes different types of messages received from the server:

Provides detailed error information, including:

Explains various closure status codes, aiding in debugging connection issues.

Callback function when the connection is successfully established.

Sets up WebSocket connection parameters and starts the client, including:

When a new tweet matches, the server sends JSON with the following fields:

{ "event_type": "tweet", "rule_id": "rule_12345", "rule_tag": "elon_musk_tweets", "tweets": [ { "id": "1234567890", "text": "This is a tweet matching your filter", "author": { "id": "12345", "username": "username", "name": "Display Name" }, "createdAt": "Sat Mar 15 05:31:28 +0000 2025", "retweetCount": 42, "likeCount": 420, "replyCount": 10 .... } ], "timestamp": 1642789123456 } For a complete example, refer to this pastebin .

The server periodically sends ping events to keep the connection active:

{ "event_type": "ping", "timestamp": 1642789123456 } Best Practices Connect only one client: Maintain only one active WebSocket connection per API key Handle disconnections properly: Wait at least 90 seconds before reconnecting after a disconnection Implement error retry logic: Automatically reconnect when encountering temporary network issues Handle all message types: Ensure your code can process all possible event types Monitor connection health: Use the ping/pong mechanism to confirm the connection is active Use Cases Typical applications for real-time Twitter data via WebSocket include:

With TwitterAPI.io's WebSocket interface, you can easily access real-time Twitter data without dealing with complex authentication and rate limits. Combined with customizable filter rules, you can focus on receiving truly relevant data and build responsive applications.

To get started, simply:

Our WebSocket service uses the same pricing model as our REST API, ensuring transparent and predictable costs.

Still have questions? Check out our API documentation or contact us .

Note: The example code requires the websocket-client library. You can install it via pip install websocket-client .

Enterprise-grade public data API that powers your decision-making with real-time social intelligence.

We donate a portion of every sale to fund carbon removal technologies.

© 2025 twitterapi.io. All rights reserved. This site is unaffiliated with X Corp. (Twitter).


## Lists

- Reduced network overhead - avoiding repetitive HTTP request headers
- Server push - latest data actively pushed by the server
- Lower latency - typically millisecond-level transmission
- Visit the TwitterAPI.io filter rules page
- Create new rules using the intuitive interface
- Set the polling interval for the rule (between 0.1 and 86400 seconds[1 day])
- Activate the rule to start monitoring
- connected event - Confirms successful connection
- ping event - Server's heartbeat to ensure the connection is active
- tweet event - Contains tweet data matching the filter rules
- Connection timeouts
- Server error status codes
- Connection refusals
- Setting the API key
- Configuring ping intervals to keep the connection alive
- Handling automatic reconnection
- Connect only one client: Maintain only one active WebSocket connection per API key
- Handle disconnections properly: Wait at least 90 seconds before reconnecting after a disconnection
- Implement error retry logic: Automatically reconnect when encountering temporary network issues
- Handle all message types: Ensure your code can process all possible event types
- Monitor connection health: Use the ping/pong mechanism to confirm the connection is active
- Brand monitoring: Real-time tracking of brand mentions
- Market sentiment analysis: Monitoring public sentiment on specific topics
- Crisis management: Quickly detecting and responding to negative comments
- Real-time dashboards: Building applications that display real-time social media data
- Event monitoring: Tracking specific hashtags or event-related content
- Obtain a TwitterAPI.io API key
- Set up filter rules on the filter rules page
- Use the provided code to connect to the WebSocket endpoint
- 🌱 Stripe Climate Commitment We donate a portion of every sale to fund carbon removal technologies.
- Contact Us
- Payment
- Privacy Policy
- Terms of Service
- Acceptable Use Policy


## Code

```text
import threading
import time
import traceback
import websocket
import json

# Message handling callback
def on_message(ws, message):
    try:
        print(f"
Received message: {message}")
        # Convert to JSON
        result_json = json.loads(message)
        event_type = result_json.get("event_type")
        
        if event_type == "connected":
            print("Connection successful!")
            return
        if event_type == "ping":
            print("ping!")
            timestamp = result_json.get("timestamp")
            current_time_ms = time.time() * 1000
            current_time_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))

            # Calculate and format time difference
            diff_time_ms = current_time_ms - timestamp
            diff_time_seconds = diff_time_ms / 1000
            diff_time_formatted = f"{int(diff_time_seconds // 60)}min{int(diff_time_seconds % 60)}sec"

            # Format original timestamp
            timestamp_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timestamp/1000))

            # Print information
            print(f"Current time: {current_time_str}")
            print(f"Message timestamp: {timestamp_str}")
            print(f"Time difference: {diff_time_formatted} ({diff_time_ms:.0f} milliseconds)")
            return
        
        if event_type == "tweet":
            print("tweet!")
            # Extract fields
            rule_id = result_json.get("rule_id")
            rule_tag = result_json.get("rule_tag")
            event_type = result_json.get("event_type")
            tweets = result_json.get("tweets", [])
            timestamp = result_json.get("timestamp")
            
            # Print key information
            print(f"rule_id: {rule_id}")
            print(f"rule_tag: {rule_tag}")
            print(f"event_type: {event_type}")
            print(f"Number of tweets: {len(tweets)}")
            print(f"timestamp: {timestamp}")
            
            # Calculate time difference
            current_time_ms = time.time() * 1000
            current_time_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
            diff_time_ms = current_time_ms - timestamp
            diff_time_seconds = diff_time_ms / 1000
            diff_time_formatted = f"{int(diff_time_seconds // 60)}min{int(diff_time_seconds % 60)}sec"
            timestamp_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(timestamp/1000))

            print(f"Current time: {current_time_str}")
            print(f"Message timestamp: {timestamp_str}")
            print(f"Time difference: {diff_time_formatted} ({diff_time_ms:.0f} milliseconds)")
        
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}. traceback: {traceback.format_exc()}")
    except Exception as e:
        print(f"Error occurred while processing message: {e}. traceback: {traceback.format_exc()}")

# Error handling callback
def on_error(ws, error):
    print(f"
Error occurred: {error}, traceback: {traceback.format_exc()}")
    
    if isinstance(error, websocket.WebSocketTimeoutException):
        print("Connection timeout. Please check if server is running or network connection.")
    elif isinstance(error, websocket.WebSocketBadStatusException):
        print(f"Server returned error status code: {error}")
        print("Please check if API key and endpoint path are correct.")
    elif isinstance(error, ConnectionRefusedError):
        print("Connection refused. Please confirm server address and port are correct.")

# Connection close callback
def on_close(ws, close_status_code, close_msg):
    print(f"
Connection closed: status_code={close_status_code}, message={close_msg}")
    
    if close_status_code == 1000:
        print("Normal connection closure")
    elif close_status_code == 1001:
        print("Server is shutting down or client navigating away")
    elif close_status_code == 1002:
        print("Protocol error")
    elif close_status_code == 1003:
        print("Received unacceptable data type")
    elif close_status_code == 1006:
        print("Abnormal connection closure, possibly network issues")
    elif close_status_code == 1008:
        print("Policy violation")
    elif close_status_code == 1011:
        print("Server internal error")
    elif close_status_code == 1013:
        print("Server overloaded")

# Connection established callback
def on_open(ws):
    print("
Connection established!")

# Main function
def main(x_api_key):
    url = "wss://ws.twitterapi.io/twitter/tweet/websocket"
    headers = {"x-api-key": x_api_key}
    
    ws = websocket.WebSocketApp(
        url,
        header=headers,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
        on_open=on_open
    )
    
    ws.run_forever(ping_interval=40, ping_timeout=30, reconnect=90)

if __name__ == "__main__":
    x_api_key = "xxxx" # Replace with your own API key
    main(x_api_key)
```

```json
{
  "event_type": "tweet",
  "rule_id": "rule_12345",
  "rule_tag": "elon_musk_tweets",
  "tweets": [
    {
      "id": "1234567890",
      "text": "This is a tweet matching your filter",
      "author": {
        "id": "12345",
        "username": "username",
        "name": "Display Name"
      },
      "createdAt": "Sat Mar 15 05:31:28 +0000 2025",
      "retweetCount": 42,
      "likeCount": 420,
      "replyCount": 10
      ....
    }
  ],
  "timestamp": 1642789123456
}
```

```json
{
  "event_type": "ping",
  "timestamp": 1642789123456
}
```

_Scraped at: 2025-12-13T03:07:18.471Z_
