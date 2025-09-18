# Modern Pet Store E-commerce Tem

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/atko-rocks/v0-modern-pet-store-e-commerce-tem)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/W4m5zvdgn5Z)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Auth0 Config

1. Go to Auth0.com and login in if you have an existing tenant or sign up to create a new one
2. Under Authentication Menu on the left - Click Database and make sure you have a Database Connection if not Create a DB Connection - Username-Password-Authentication
3. Under Applications Menu on the left - Click Create Application and choose - Regular Web Application
4. Under Branding Menu on the left - Click Universal Login and update as you want and remember to click Save
5. Under Security Menu on the left - Click Multifactor Auth
  - 1 - Enable a MFA Factor if you desire
  - 2 - Define a Policy
  - 3 - Click Save
6. Update the Application URIs (Make sure you click SAVE)
  - Application Login URI (This is your V0 App URL + the login route (e.g. https://v0-modern-pet-store-e-commerce-tem-self.vercel.app/auth/login)
  - Allowed Callback URLs (This is your V0 App URL + the callback route  (e.g. https://v0-modern-pet-store-e-commerce-tem-self.vercel.app/auth/callback)
  - Allowed Logout URLs (This is your V0 App URL (e.g. https://v0-modern-pet-store-e-commerce-tem-self.vercel.app)

## Set Your Vercel Environment Variables (Make sure you have completed the Auth0 Config Steps first)
1. When you are in V0 and on your project click Environment Variables on the Left Navaigation
2. If it does not exist create a variable called AUTH0_AUDIENCE and update it to your Auth0 tenant API URI (e.g https://dev-6--m6if2.us.auth0.com/api/v2/)
3. If it does not exist create a variable called APP_BASE_URL and update it to your V0 App URL (e.g https://retail.auth.rocks)
4. If it does not exist create a variable called AUTH0_SCOPE and update it to the scopes you wish to use, by default set to **openid profile email**
5. If it does not exist create a variable called AUTH0_DOMAIN and update it to your Auth0 tenant Domain (e.g dev-6--m6if2.us.auth0.com)
6. If it does not exist create a variable called AUTH0_CLIENT_SECRET which can be copied from going into your Auth0 tenant > Applications > Clicking on your App you created
7. If it does not exist create a variable called AUTH0_CLIENT_ID which can be copied from going into your Auth0 tenant > Applications > Clicking on your App you created
8. If it does not exist create a variable called AUTH0_SECRET by opening a terminal window and executing  **openssl rand -hex 32** and then copy the value


## Deployment

Your project is live at:

**[https://vercel.com/atko-rocks/v0-modern-pet-store-e-commerce-tem](https://vercel.com/atko-rocks/v0-modern-pet-store-e-commerce-tem)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/W4m5zvdgn5Z](https://v0.app/chat/projects/W4m5zvdgn5Z)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository






