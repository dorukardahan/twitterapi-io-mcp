# Building an X Trading Card Generator with TwitterAPI.io
Source: https://twitterapi.io/blog/building-x-trading-card-generator

## Sections

- Building an X Trading Card Generator with TwitterAPI.io
- What's in our App
- Real-time Data
- Interactive 3D Effects
- Setting Up The Project
- Building the Application
- Key Features Explained
- Deploying the Application
- Conclusion
- Ready to Build Your Own X App?


## Content

Learn what it takes to build a modern, static-first, responsive trading card generator with real-time profile fetching, interactive 3D card effects, and a clean user interface.

Source Code What's in our App Our X trading card generator app will include these key features:

Real-time Data Fetch real-time X (Twitter) profile data including username, display name, bio, and statistics

Interactive 3D Effects Interactive 3D card effects that respond to mouse movements

In order to have access to the real-time X profile data, you will need to create an account and obtain your API key at TwitterAPI.io . This key will be used to authenticate your requests to the TwitterAPI.io API and fetch live profile information.

We will be configuring our application for static export. This allows the application to be deployed to any static hosting platform without requiring a server. This makes deployment simple.

To get live X profile data, we'll fetch data from the TwitterAPI.io API. Here's how to call the user info endpoint:

const fetchUserProfile = async (username: string) => { const apiKey = process.env.NEXT_PUBLIC_X_API_KEY; const url = `https://api.twitterapi.io/twitter/user/info?userName=${username}`; const response = await fetch(url, { headers: { "X-API-Key": apiKey, }, }); const data = await response.json(); return data.data; }; More information about the TwitterAPI.io API can be found in their documentation .

However, when building a static web application, we'll encounter CORS (Cross-Origin Resource Sharing) issues when trying to call API directly from the browser. This is where Corsfix CORS proxy comes to the rescue. It allows us to send request directly from the browser without any server setup.

Instead of calling the API directly, we prefix the URL with the Corsfix proxy:

const fetchUserProfile = async (username: string) => { const apiKey = process.env.NEXT_PUBLIC_X_API_KEY || "{{X_API_KEY}}"; const apiUrl = `https://api.twitterapi.io/twitter/user/info?userName=${username}`; const proxiedUrl = `https://proxy.corsfix.com/?${apiUrl}`; const response = await fetch(proxiedUrl, { headers: { "X-API-Key": apiKey, }, }); const data = await response.json(); return data.data; }; We will also store our secret securely in Corsfix, so you can use the app without exposing your API key in the client JavaScript code. Learn more about how to secure your API key with Corsfix .

When you enter an X username and submit, the app fetches the profile data and displays it as a trading card, ensuring a smooth user experience. It works by fetching the profile information from TwitterAPI.io and rendering it in an interactive card component.

The card displays profile stats like followers, following count, and total posts, along with the user's profile picture, display name, username, and bio. The card also features a 3D tilt effect that responds to mouse movements, creating an engaging and dynamic user experience similar to physical trading cards.

Since the app is configured for static export, it can be deployed to any static hosting service without server requirements. Popular hosting platforms like Cloudflare Pages, Vercel, Netlify, and GitHub Pages all support static deployments with automatic builds from your Git repository. The deployment process is typically as simple as connecting your repository and the platform will handle the build and deployment automatically whenever you push changes.

In this article, you've learned what it takes to build a comprehensive X trading card generator application that demonstrates several important concepts:

The resulting application provides a smooth, professional user experience while demonstrating best practices for handling external APIs in static web applications. See the complete source code on GitHub .

Get started with TwitterAPI.io today and access real-time X profile data for your applications.

twitterapi.io Enterprise-grade public data API that powers your decision-making with real-time social intelligence.

We donate a portion of every sale to fund carbon removal technologies.

© 2025 twitterapi.io. All rights reserved. This site is unaffiliated with X Corp. (Twitter).


## Lists

- CORS Solutions: Leveraging Corsfix to overcome browser limitations in static apps
- Interactive UI: Creating engaging 3D card effects for better user experience
- 🌱 Stripe Climate Commitment We donate a portion of every sale to fund carbon removal technologies.
- Contact Us
- Payment
- Privacy Policy
- Terms of Service
- Acceptable Use Policy


## Code

```text
const fetchUserProfile = async (username: string) => {
  const apiKey = process.env.NEXT_PUBLIC_X_API_KEY;
  const url = `https://api.twitterapi.io/twitter/user/info?userName=${username}`;

  const response = await fetch(url, {
    headers: {
      "X-API-Key": apiKey,
    },
  });
  const data = await response.json();

  return data.data;
};
```

```text
const fetchUserProfile = async (username: string) => {
  const apiKey = process.env.NEXT_PUBLIC_X_API_KEY || "{{X_API_KEY}}";
  const apiUrl = `https://api.twitterapi.io/twitter/user/info?userName=${username}`;
  const proxiedUrl = `https://proxy.corsfix.com/?${apiUrl}`;

  const response = await fetch(proxiedUrl, {
    headers: {
      "X-API-Key": apiKey,
    },
  });
  const data = await response.json();

  return data.data;
};
```

_Scraped at: 2025-12-18T10:06:04.536Z_
