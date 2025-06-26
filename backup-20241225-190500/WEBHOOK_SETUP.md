# Webhook Setup for Instant Content Updates

This guide will help you set up automatic content updates using Sanity webhooks and Netlify functions.

## Overview

When you publish content in Sanity, a webhook will automatically trigger a new deployment on Netlify, making your content live instantly without manual intervention.

## Prerequisites

- Your site deployed to Netlify
- Sanity project with content
- Netlify account with deploy hooks access

## Step 1: Deploy Your Site to Netlify

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Deploy your site and note the URL (e.g., `https://your-site.netlify.app`)

## Step 2: Create a Netlify Deploy Hook

1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Build & deploy** > **Deploy hooks**
3. Click **Add deploy hook**
4. Give it a name like "Sanity Content Updates"
5. Copy the generated URL (it will look like `https://api.netlify.com/build_hooks/...`)

## Step 3: Set Environment Variables

1. In your Netlify dashboard, go to **Site settings** > **Environment variables**
2. Add these variables:
   - `NETLIFY_DEPLOY_HOOK`: Your deploy hook URL from step 2
   - `SANITY_WEBHOOK_SECRET`: A random secret string (optional but recommended)

## Step 4: Configure Sanity Webhook

1. Go to your Sanity project dashboard
2. Navigate to **API** > **Webhooks**
3. Click **Add webhook**
4. Configure with these settings:
   - **Name**: Netlify Production Deploy
   - **URL**: `https://your-site.netlify.app/.netlify/functions/sanity-webhook-simple`
   - **Dataset**: production
   - **Filter**: `_type in ["article", "author", "category"]`
   - **HTTP Method**: POST
   - **Headers**: `Content-Type: application/json`

## Step 5: Test the Webhook

1. Create a new article in Sanity
2. Set it to "Published" status
3. Check your Netlify dashboard for a new deployment
4. Verify the content appears on your live site

## Step 6: Monitor Webhook Activity

### Netlify Function Logs
1. Go to Netlify dashboard > **Functions**
2. Click on `sanity-webhook-simple`
3. View function logs to see webhook activity

### Sanity Webhook Logs
1. Go to Sanity dashboard > **API** > **Webhooks**
2. Click on your webhook
3. View delivery history and response codes

## Troubleshooting

### Webhook Not Triggering
- Check that the webhook URL is correct
- Verify the filter syntax in Sanity
- Ensure the content type matches the filter

### Deploy Hook Not Working
- Verify the `NETLIFY_DEPLOY_HOOK` environment variable is set
- Check that the deploy hook URL is valid
- Ensure your Netlify site is active

### Function Errors
- Check Netlify function logs for error details
- Verify all environment variables are set
- Test the function manually if needed

## Advanced Configuration

### Custom Filters
You can customize the webhook filter to trigger on specific conditions:

```groq
// Only trigger for published articles
_type == "article" && status == "published"

// Trigger for specific categories
_type == "article" && category->slug.current in ["news", "reviews"]

// Trigger for featured content
_type == "article" && featured == true
```

### Multiple Environments
Set up separate webhooks for different environments:
- Production: `https://your-site.netlify.app/.netlify/functions/sanity-webhook-simple`
- Staging: `https://your-staging-site.netlify.app/.netlify/functions/sanity-webhook-simple`

### Security
For additional security, set up webhook signature verification:
1. Generate a secret in Sanity webhook settings
2. Set the same secret as `SANITY_WEBHOOK_SECRET` in Netlify
3. The function will verify the webhook signature

## Benefits

✅ **Instant Updates**: Content goes live immediately when published  
✅ **No Manual Deployment**: Eliminates the need to manually trigger builds  
✅ **Reliable**: Automatic retry and error handling  
✅ **Scalable**: Works with any amount of content  
✅ **Cost-Effective**: Uses Netlify's free tier functions  

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Netlify function logs
3. Verify Sanity webhook delivery history
4. Test with a simple webhook first

## Next Steps

Once your webhook is working:
1. Set up monitoring and alerts
2. Consider adding more sophisticated filtering
3. Implement content preview functionality
4. Add analytics tracking for content updates 