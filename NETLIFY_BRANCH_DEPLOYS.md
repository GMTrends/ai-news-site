# 🔍 Finding "Branch Deploys" in Netlify Dashboard

## Where to Find It

The "Branch deploys" setting is in a **different section** than the build settings you're currently viewing.

### Step-by-Step Navigation:

1. **From where you are now** (Build & deploy settings):
   - Look at the **left sidebar** in Netlify
   - You should see a menu with options like:
     - Site overview
     - Deploys
     - **Build & deploy** ← (You're here)
     - Domain settings
     - Environment variables
     - etc.

2. **Click on "Build & deploy"** in the left sidebar (if not already selected)

3. **Look for sub-sections** under "Build & deploy":
   - You should see tabs or sections like:
     - **Build settings** ← (This is what you're viewing now)
     - **Continuous Deployment** ← (This is where branch deploys are!)
     - Post processing
     - Deploy notifications

4. **Click on "Continuous Deployment"** tab/section

5. **You should now see**:
   - Production branch settings
   - **Deploy contexts** section
   - Options for:
     - ✅ Deploy previews (for pull requests)
     - ✅ Branch deploys (for feature branches)

## Alternative: Direct URL

If you can't find it, try going directly to:
```
https://app.netlify.com/sites/[your-site-name]/settings/deploys
```

Replace `[your-site-name]` with your actual Netlify site name (looks like it's `aibuzzmedia`).

## What to Enable

Once you find the "Continuous Deployment" section:

1. **Enable "Deploy previews"** ✅
   - This creates preview URLs for pull requests

2. **Enable "Branch deploys"** ✅
   - This creates preview URLs for feature branches

3. **Set "Production branch"** to `main`
   - This ensures only the `main` branch deploys to your live site

## If You Still Can't Find It

**Option 1: Check if it's already enabled**
- Branch deploys might be enabled by default
- Try creating a test branch and pushing it to see if Netlify creates a preview

**Option 2: Look for "Deploy contexts"**
- Some Netlify interfaces show this as "Deploy contexts" instead
- Look for settings about which branches to deploy

**Option 3: Check Netlify's UI version**
- Netlify sometimes updates their UI
- The setting might be in a slightly different location
- Try searching for "branch" in the settings page

## Quick Test

To verify if branch deploys are working:

```bash
# Create a test branch
git checkout -b test/preview-test
git commit --allow-empty -m "Test preview"
git push origin test/preview-test
```

Then check your Netlify dashboard → **Deploys** tab. You should see a new deploy for the `test/preview-test` branch with a unique preview URL.

## Still Stuck?

If you can't find it, you can also:
1. Check Netlify's documentation: https://docs.netlify.com/site-deploys/overview/#deploy-contexts
2. Contact Netlify support (they're very helpful)
3. The feature might already be enabled by default - try the test above!
