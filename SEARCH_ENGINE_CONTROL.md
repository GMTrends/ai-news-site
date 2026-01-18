# 🔍 Search Engine Control Guide

## 🚫 Preventing Search Engine Crawling (Development Phase)

### Option 1: Environment Variable (Recommended)
1. **Create a `.env` file** in your project root:
   ```bash
   PUBLIC_NOINDEX=true
   ```

2. **This will automatically add** `noindex, nofollow` to all pages

3. **When ready for SEO**, change to:
   ```bash
   PUBLIC_NOINDEX=false
   ```

### Option 2: robots.txt (Already Created)
- Located at: `public/robots.txt`
- Currently blocks all search engines
- **To allow crawling**, change `Disallow: /` to `Allow: /`

### Option 3: Individual Page Control
- Add `noindex={true}` to any page component:
  ```astro
  <MainLayout 
    title="Page Title" 
    description="Page description"
    noindex={true}
  >
  ```

---

## 🌐 Domain Setup

### Adding Custom Domain to Netlify:
1. **Deploy your site** to Netlify
2. **Go to Site Settings** → Domain Management
3. **Add custom domain** (e.g., `aibuzzmedia.com`)
4. **Update DNS** at your domain registrar:
   - A record: Point to Netlify's IP
   - CNAME: `www` → your Netlify site
5. **Wait 24-48 hours** for DNS propagation

---

## 📊 When Ready for SEO

### 1. Enable Search Engine Crawling
```bash
# In your .env file
PUBLIC_NOINDEX=false
```

### 2. Update robots.txt
```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### 3. Submit to Search Engines
- **Google Search Console**: Add your domain
- **Bing Webmaster Tools**: Add your domain
- **Submit sitemap** to both platforms

### 4. Monitor Indexing
- Check Google Search Console for indexing status
- Monitor crawl errors and fix them
- Submit new articles for indexing

---

## ⚡ Quick Commands

```bash
# Block search engines (development)
echo "PUBLIC_NOINDEX=true" > .env

# Allow search engines (production)
echo "PUBLIC_NOINDEX=false" > .env

# Restart dev server after changes
npm run dev
```

---

## 🔒 Security Note
- The `robots.txt` file is public and can be ignored by malicious bots
- Always use `noindex` meta tags for complete protection
- Consider using Netlify's password protection for staging sites 