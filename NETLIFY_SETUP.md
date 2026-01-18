# 🚀 Netlify Setup & Deployment Guide

## ✅ What's Already Configured

1. **Search Engine Blocking**: 
   - `robots.txt` blocks all crawlers
   - `PUBLIC_NOINDEX` environment variable (set in Netlify)
   - Meta tags with `noindex, nofollow`

2. **Netlify Configuration**: 
   - `netlify.toml` is configured
   - Build commands are set up
   - Security headers configured

## 🔧 Netlify Dashboard Configuration Steps

### Step 1: Connect Your Repository
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** (already authenticated)
4. Select your repository: `ai-news-site`
5. Click **"Import"**

### Step 2: Configure Build Settings
Netlify should auto-detect these, but verify:

- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Production branch**: `main`

### Step 3: Set Environment Variables
Go to **Site settings** → **Environment variables** and add:

```
PUBLIC_NOINDEX=true
NODE_ENV=production
```

This ensures search engines are blocked on all deployments.

### Step 4: Enable Branch Deploys
1. Go to **Site settings** → **Build & deploy** → **Continuous Deployment**
2. Under **Deploy contexts**, enable:
   - ✅ **Deploy previews** (for pull requests)
   - ✅ **Branch deploys** (for feature branches)

### Step 5: Set Production Branch
1. In **Build & deploy** → **Continuous Deployment**
2. Set **Production branch** to: `main`
3. This ensures only `main` branch deploys to your live site

## 🔄 Your Daily Workflow

### Making Changes (No Interruptions to Live Site)

```bash
# 1. Start from main (always up to date)
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-changes

# 3. Make your changes, test locally
npm run dev

# 4. Commit and push
git add .
git commit -m "Your change description"
git push origin feature/my-changes
```

**What happens:**
- Netlify creates a **preview URL** automatically
- Your live site stays unchanged
- Test the preview URL thoroughly

### Deploying to Production (When Ready)

```bash
# 1. Merge to main
git checkout main
git merge feature/my-changes
git push origin main
```

**What happens:**
- Netlify builds your site
- If build succeeds → deploys to production
- If build fails → old version stays live
- **Zero downtime** - visitors never see broken site

## 🛡️ Safety Features

1. **Preview Deployments**: Every branch/PR gets unique URL
2. **Atomic Deploys**: Site updates all at once (no partial states)
3. **Build Checks**: Failed builds don't deploy
4. **Rollback**: Can revert in Netlify dashboard (Deploys → Options → Publish deploy)

## 🔍 Monitoring Deployments

1. **Netlify Dashboard** → Your site → **Deploys** tab
2. See all deployments (production + previews)
3. Click any deploy to see:
   - Build logs
   - Preview URL
   - Deploy status

## 🚫 Keeping Search Engines Blocked

Your site is currently blocked via:
- `robots.txt` (blocks all crawlers)
- `PUBLIC_NOINDEX=true` (adds noindex meta tags)

**To allow search engines later:**
1. Update `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://aibuzzmedia.com/sitemap-index.xml
   ```

2. In Netlify: Change `PUBLIC_NOINDEX` to `false`

3. Deploy the changes

## 📋 Quick Checklist Before First Deploy

- [ ] Repository connected to Netlify
- [ ] Build settings configured (build: `npm run build`, publish: `dist`)
- [ ] Production branch set to `main`
- [ ] Environment variable `PUBLIC_NOINDEX=true` set
- [ ] Branch deploys enabled
- [ ] Deploy previews enabled
- [ ] Test a preview deployment first

## 🆘 Troubleshooting

**Build fails?**
- Check build logs in Netlify dashboard
- Test locally: `npm run build`
- Fix errors, push again

**Changes not showing?**
- Check which branch is deployed
- Verify build succeeded
- Clear browser cache

**Want to rollback?**
- Netlify Dashboard → Deploys
- Find previous working deploy
- Click "..." → "Publish deploy"

## 📞 Need Help?

- Netlify Docs: https://docs.netlify.com
- Build logs show detailed error messages
- Preview URLs let you test before going live
