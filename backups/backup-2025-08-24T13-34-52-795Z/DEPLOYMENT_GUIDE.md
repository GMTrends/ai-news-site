# AI Buzz Media - Deployment Guide

This guide will walk you through deploying your AI news site to Netlify with full Decap CMS integration.

## Prerequisites

- GitHub account with your repository
- Netlify account
- Domain name (optional but recommended)
- SMTP email service (Gmail, SendGrid, etc.)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Complete AI news site with Decap CMS"
   git push origin main
   ```

2. **Verify your repository structure**
   ```
   ai-news-site/
   ├── public/
   │   ├── admin/
   │   │   ├── index.html
   │   │   └── config.yml
   │   └── robots.txt
   ├── netlify/
   │   └── functions/
   │       ├── subscribe.js
   │       └── contact.js
   ├── src/
   │   └── content/
   │       ├── articles/
   │       ├── authors/
   │       ├── categories/
   │       ├── pages/
   │       ├── site-settings/
   │       └── newsletter/
   ├── netlify.toml
   ├── package.json
   └── env.example
   ```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI

1. **Connect to GitHub**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select your repository

2. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

3. **Deploy the site**
   - Click "Deploy site"
   - Wait for the build to complete

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy**
   ```bash
   netlify login
   netlify deploy --prod
   ```

## Step 3: Configure Environment Variables

1. **Go to Site Settings > Environment Variables**
2. **Add the following variables** (copy from `env.example`):

### Required Variables
```
SITE_URL=https://your-site-name.netlify.app
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### Optional Variables
```
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=XXXXXXXXXX
TWITTER_HANDLE=@yourhandle
LINKEDIN_URL=https://linkedin.com/company/yourcompany
```

## Step 4: Set Up Git Gateway

1. **Enable Git Gateway**
   - Go to Site Settings > Identity
   - Click "Enable Identity"
   - Go to Services > Git Gateway
   - Click "Enable Git Gateway"

2. **Configure Git Gateway**
   - Choose your repository
   - Set branch to `main`
   - Save settings

3. **Get Git Gateway API Token**
   - Copy the API token from Git Gateway settings
   - Add it as environment variable: `GIT_GATEWAY_API_TOKEN`

## Step 5: Configure Identity (User Management)

1. **Set up Identity settings**
   - Go to Site Settings > Identity
   - Configure registration settings:
     - **Registration**: Invite only
     - **External providers**: Optional (Google, GitHub, etc.)

2. **Invite users**
   - Go to the Identity tab
   - Click "Invite users"
   - Add email addresses for your content team

3. **Set up email templates** (optional)
   - Customize invitation and recovery emails
   - Use your brand colors and messaging

## Step 6: Test Your Deployment

1. **Test the main site**
   - Visit your Netlify URL
   - Verify all pages load correctly
   - Test navigation and functionality

2. **Test the admin interface**
   - Go to `https://your-site.netlify.app/admin`
   - Log in with your credentials
   - Test creating/editing content

3. **Test forms**
   - Test newsletter signup
   - Test contact form
   - Verify email delivery

## Step 7: Configure Custom Domain (Optional)

1. **Add custom domain**
   - Go to Site Settings > Domain management
   - Click "Add custom domain"
   - Enter your domain name

2. **Configure DNS**
   - Add CNAME record pointing to your Netlify site
   - Or use Netlify DNS for easier management

3. **Update environment variables**
   - Change `SITE_URL` to your custom domain
   - Update any hardcoded URLs in your content

## Step 8: Set Up Analytics and Monitoring

1. **Google Analytics**
   - Create GA4 property
   - Add tracking ID to environment variables
   - Verify tracking is working

2. **Search Console**
   - Add your site to Google Search Console
   - Verify ownership
   - Submit sitemap

3. **Performance monitoring** (optional)
   - Set up Sentry for error tracking
   - Configure New Relic for performance monitoring

## Step 9: Security and Performance

1. **Security headers**
   - Already configured in `netlify.toml`
   - Verify headers are being applied

2. **SSL certificate**
   - Automatically provided by Netlify
   - Verify HTTPS is working

3. **Performance optimization**
   - Check Core Web Vitals
   - Optimize images and assets
   - Monitor build times

## Step 10: Content Migration

1. **Import existing content**
   - Use the admin interface to create articles
   - Import authors and categories
   - Set up site settings

2. **SEO optimization**
   - Add meta descriptions
   - Optimize images with alt text
   - Set up canonical URLs

3. **Social media setup**
   - Add Open Graph tags
   - Configure Twitter Cards
   - Set up social media accounts

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (should be 18)
   - Verify all dependencies are installed
   - Check for syntax errors in code

2. **Admin interface not working**
   - Verify Git Gateway is enabled
   - Check environment variables
   - Ensure Identity is configured

3. **Forms not sending emails**
   - Verify SMTP settings
   - Check environment variables
   - Test with different email providers

4. **Images not loading**
   - Check file paths
   - Verify images are in correct directories
   - Check for case sensitivity issues

### Getting Help

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Decap CMS Documentation**: [decapcms.org](https://decapcms.org)
- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)

## Maintenance

### Regular Tasks

1. **Update dependencies**
   ```bash
   npm update
   npm audit fix
   ```

2. **Backup content**
   - Your content is in Git, so it's automatically backed up
   - Consider additional backups for media files

3. **Monitor performance**
   - Check Netlify analytics
   - Monitor Core Web Vitals
   - Review error logs

### Security Updates

1. **Keep dependencies updated**
2. **Monitor security advisories**
3. **Regular security audits**
4. **Update environment variables as needed**

## Support

For technical support:
- Check the troubleshooting section above
- Review Netlify and Decap CMS documentation
- Contact your development team

---

**Congratulations!** Your AI news site is now live and ready for content creation. 🎉 