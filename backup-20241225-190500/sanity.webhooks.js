// Sanity Webhook Configuration
// This file contains webhook configurations for different content types

const webhooks = {
  // Production webhook for instant content updates
  production: {
    name: 'Netlify Production Deploy',
    url: 'https://your-site.netlify.app/.netlify/functions/sanity-webhook-simple',
    description: 'Triggers Netlify rebuild when content is published',
    dataset: 'production',
    filter: '_type in ["article", "author", "category"]',
    headers: {
      'Content-Type': 'application/json'
    }
  },

  // Development webhook (optional)
  development: {
    name: 'Netlify Development Deploy',
    url: 'https://your-dev-site.netlify.app/.netlify/functions/sanity-webhook-simple',
    description: 'Triggers Netlify rebuild for development environment',
    dataset: 'development',
    filter: '_type in ["article", "author", "category"]',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

// Webhook setup instructions
const setupInstructions = `
# Sanity Webhook Setup Instructions

## 1. Deploy to Netlify
First, deploy your site to Netlify and get your site URL.

## 2. Create Deploy Hook
1. Go to your Netlify dashboard
2. Navigate to Site settings > Build & deploy > Deploy hooks
3. Create a new deploy hook
4. Copy the deploy hook URL

## 3. Set Environment Variables
Add these environment variables to your Netlify site:
- NETLIFY_DEPLOY_HOOK: Your deploy hook URL
- SANITY_WEBHOOK_SECRET: A random secret for webhook verification (optional but recommended)

## 4. Configure Sanity Webhook
1. Go to your Sanity project dashboard
2. Navigate to API > Webhooks
3. Create a new webhook with these settings:
   - Name: Netlify Production Deploy
   - URL: https://your-site.netlify.app/.netlify/functions/sanity-webhook-simple
   - Dataset: production
   - Filter: _type in ["article", "author", "category"]
   - HTTP Method: POST
   - Headers: Content-Type: application/json

## 5. Test the Webhook
1. Publish a new article in Sanity
2. Check Netlify dashboard for new deployment
3. Verify the content appears on your site

## 6. Monitor Webhook Activity
Check Netlify function logs to monitor webhook activity:
- Go to Netlify dashboard > Functions
- Click on sanity-webhook-simple
- View function logs
`;

module.exports = {
  webhooks,
  setupInstructions
}; 