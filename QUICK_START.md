# ⚡ Quick Start: Safe Deployment Workflow

## 🎯 Goal
Make changes to your live website **without any interruptions** or broken states visible to visitors.

## ✅ Setup (One-Time, 5 minutes)

### In Netlify Dashboard:
1. **Connect Repository** (if not done):
   - Netlify → Add site → Import from Git → Select your repo
   
2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Production branch: `main`

3. **Add Environment Variable**:
   - Site settings → Environment variables
   - Add: `PUBLIC_NOINDEX` = `true`

4. **Enable Branch Deploys**:
   - Site settings → Build & deploy → Continuous Deployment
   - Enable "Deploy previews" and "Branch deploys"

## 🔄 Daily Workflow (Making Changes)

### Simple 3-Step Process:

```bash
# Step 1: Create feature branch
git checkout main
git pull
git checkout -b feature/my-changes

# Step 2: Make changes, test locally
# Edit files...
npm run dev  # Test locally

# Step 3: Push for preview
git add .
git commit -m "My changes"
git push origin feature/my-changes
```

**Result**: Netlify creates a preview URL. Your live site stays unchanged.

### When Ready to Deploy:

```bash
# Merge to main
git checkout main
git merge feature/my-changes
git push origin main
```

**Result**: Netlify builds and deploys. If build fails, old version stays live.

## 🛡️ Why This is Safe

- ✅ **Preview URLs**: Test before going live
- ✅ **Atomic Deploys**: Site updates all at once
- ✅ **Build Checks**: Failed builds don't deploy
- ✅ **Rollback**: Revert in Netlify dashboard if needed

## 📋 Example Workflow

**Scenario**: You want to update the footer

```bash
# 1. Start fresh
git checkout main
git pull

# 2. Create branch
git checkout -b feature/update-footer

# 3. Edit Footer.astro
# ... make your changes ...

# 4. Test locally
npm run dev
# Check http://localhost:4321

# 5. Push for preview
git add src/components/Footer.astro
git commit -m "Update footer styling"
git push origin feature/update-footer

# 6. Check Netlify dashboard for preview URL
# Test the preview URL thoroughly

# 7. When satisfied, deploy
git checkout main
git merge feature/update-footer
git push origin main

# Done! Site updates automatically.
```

## 🚫 Search Engines Blocked

Your site is currently hidden from search engines:
- ✅ `robots.txt` blocks all crawlers
- ✅ `PUBLIC_NOINDEX=true` adds noindex tags

**To allow search engines later:**
1. Update `public/robots.txt` (instructions inside file)
2. Change `PUBLIC_NOINDEX` to `false` in Netlify
3. Deploy

## 💡 Pro Tips

1. **Always test previews** before merging to main
2. **Use descriptive branch names**: `feature/`, `fix/`, `update/`
3. **Check Netlify build logs** if something fails
4. **Keep main branch clean** - only merge tested features

## 🆘 Need Help?

- **Build fails?** Check Netlify build logs
- **Changes not showing?** Verify you're on the right branch
- **Want to rollback?** Netlify Dashboard → Deploys → Previous deploy → Publish

---

**That's it!** You now have a safe, interruption-free deployment workflow. 🎉
