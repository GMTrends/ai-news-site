# 🎯 Tracking Pixels Setup Guide
## Complete Setup for Facebook, TikTok, and Twitter Pixels

### ✅ **Current Status**
- **Facebook Pixel**: ✅ Already configured and working (ID: 733228089122455)
- **TikTok Pixel**: ❌ Need to set up
- **Twitter (X) Pixel**: ❌ Need to set up

---

## 🚀 **TikTok Pixel Setup**

### **Step 1: Access TikTok Ads Manager**
1. Go to [TikTok Ads Manager](https://ads.tiktok.com/)
2. Sign in with your TikTok account
3. Navigate to **Assets** → **Events** → **Web Events**

### **Step 2: Create Web Event**
1. Click **"Create Web Event"**
2. Select **"Web Event"** as event type
3. Choose **"Track Website Activity"**
4. Enter your website URL: `https://yourdomain.com`

### **Step 3: Get Pixel ID**
1. After creation, you'll get a **Pixel ID** (looks like: `C1234567890ABCDEF`)
2. Copy this ID and update your `.env` file:
   ```bash
   TIKTOK_PIXEL_ID=C1234567890ABCDEF
   ```

### **Step 4: Test Pixel**
1. Use TikTok's **Pixel Helper** browser extension
2. Visit your website and verify events are firing
3. Check TikTok Ads Manager for real-time data

---

## 🐦 **Twitter (X) Pixel Setup**

### **Step 1: Access Twitter Ads Manager**
1. Go to [Twitter Ads Manager](https://ads.twitter.com/)
2. Sign in with your Twitter account
3. Navigate to **Tools** → **Conversion Tracking**

### **Step 2: Create Website Tag**
1. Click **"Create Website Tag"**
2. Select **"Website Tag"** as tag type
3. Enter your website URL: `https://yourdomain.com`
4. Choose **"All conversions"** for tracking

### **Step 3: Get Pixel ID**
1. After creation, you'll get a **Pixel ID** (looks like: `abc123`)
2. Copy this ID and update your `.env` file:
   ```bash
   TWITTER_PIXEL_ID=abc123
   ```

### **Step 4: Test Pixel**
1. Use Twitter's **Pixel Helper** browser extension
2. Visit your website and verify events are firing
3. Check Twitter Ads Manager for real-time data

---

## 🔧 **Update Your Configuration**

### **1. Update .env file**
```bash
# Copy from env.example to .env
cp env.example .env

# Edit .env with your actual pixel IDs
TIKTOK_PIXEL_ID=your_actual_tiktok_pixel_id
TWITTER_PIXEL_ID=your_actual_twitter_pixel_id
```

### **2. Update TrackingPixels.astro**
Replace the placeholder IDs in `src/components/TrackingPixels.astro`:
```typescript
const TIKTOK_PIXEL_ID = 'your_actual_tiktok_pixel_id'
const TWITTER_PIXEL_ID = 'your_actual_twitter_pixel_id'
```

---

## 📊 **What Each Pixel Tracks**

### **Facebook Pixel (Already Working)**
- ✅ Page views and scroll depth
- ✅ Newsletter signups and form submissions
- ✅ Content engagement and time on page
- ✅ AI tool interactions
- ✅ Product views and conversions

### **TikTok Pixel (New)**
- 🆕 Page views and content engagement
- 🆕 Newsletter signups and lead generation
- 🆕 Scroll depth and time on page
- 🆕 Custom events for AI tools
- 🆕 Audience insights for retargeting

### **Twitter Pixel (New)**
- 🆕 Page views and content engagement
- 🆕 Newsletter signups and conversions
- 🆕 User behavior and interests
- 🆕 Custom events for engagement
- 🆕 Audience building for ads

---

## 🎯 **Why You Need All Three Pixels**

### **1. Audience Diversity**
- **Facebook**: Broad audience, great for brand awareness
- **TikTok**: Younger professionals, mobile-first users
- **Twitter**: Tech community, developers, AI researchers

### **2. Ad Platform Benefits**
- **Facebook**: Best for detailed targeting and retargeting
- **TikTok**: Lower cost-per-click, high engagement
- **Twitter**: Strong B2B audience, professional context

### **3. Data Insights**
- **Cross-platform audience analysis**
- **Better conversion attribution**
- **Improved ad performance optimization**

---

## 🧪 **Testing Your Pixels**

### **1. Use Browser Extensions**
- **Facebook Pixel Helper**: Chrome/Firefox extension
- **TikTok Pixel Helper**: Chrome extension
- **Twitter Pixel Helper**: Chrome extension

### **2. Test Events**
Visit your website and verify these events fire:
- ✅ PageView (all platforms)
- ✅ ViewContent (after 30 seconds)
- ✅ ScrollDepth (25%, 50%, 75%, 100%)
- ✅ Lead (newsletter signup)
- ✅ Search (search functionality)

### **3. Check Real-time Data**
- **Facebook**: Events Manager → Test Events
- **TikTok**: Ads Manager → Events → Real-time
- **Twitter**: Ads Manager → Conversion Tracking → Real-time

---

## 🚨 **Common Issues & Solutions**

### **1. Pixel Not Firing**
- Check browser console for JavaScript errors
- Verify pixel IDs are correct
- Ensure no ad blockers are active
- Check Content Security Policy (CSP) settings

### **2. Events Not Tracking**
- Verify event names match platform requirements
- Check parameter formatting
- Test with pixel helper extensions
- Review browser network tab for failed requests

### **3. Data Delays**
- **Facebook**: 1-2 hours delay
- **TikTok**: 2-4 hours delay
- **Twitter**: 1-3 hours delay

---

## 📈 **Next Steps After Setup**

### **1. Create Custom Audiences**
- **Facebook**: Retarget website visitors
- **TikTok**: Build lookalike audiences
- **Twitter**: Create interest-based audiences

### **2. Set Up Conversion Campaigns**
- **Lead Generation**: Newsletter signups
- **Brand Awareness**: Content engagement
- **Retargeting**: Previous visitors

### **3. Monitor Performance**
- Track conversion rates by platform
- Compare cost-per-acquisition
- Optimize ad creative and targeting

---

## 🔒 **Privacy & Compliance**

### **1. Cookie Consent**
- Implement cookie consent banner
- Respect user privacy preferences
- Comply with GDPR/CCPA requirements

### **2. Data Retention**
- Review data retention policies
- Implement data deletion requests
- Monitor privacy regulations

### **3. User Transparency**
- Update privacy policy
- Explain tracking purposes
- Provide opt-out options

---

## 📞 **Need Help?**

### **Platform Support**
- **Facebook**: [Facebook Business Help](https://www.facebook.com/business/help)
- **TikTok**: [TikTok Ads Help Center](https://ads.tiktok.com/help)
- **Twitter**: [Twitter Ads Help](https://business.twitter.com/en/help/ads-policies.html)

### **Testing Tools**
- **Facebook Pixel Helper**: Chrome Web Store
- **TikTok Pixel Helper**: Chrome Web Store
- **Twitter Pixel Helper**: Chrome Web Store

---

## ✅ **Setup Checklist**

- [ ] Get TikTok Pixel ID from TikTok Ads Manager
- [ ] Get Twitter Pixel ID from Twitter Ads Manager
- [ ] Update `.env` file with pixel IDs
- [ ] Update `TrackingPixels.astro` with pixel IDs
- [ ] Test pixels with browser extensions
- [ ] Verify events in platform dashboards
- [ ] Create custom audiences
- [ ] Set up conversion tracking
- [ ] Monitor performance metrics
- [ ] Update privacy policy

---

**🎯 Your Facebook pixel is already working perfectly! Adding TikTok and Twitter pixels will give you comprehensive audience coverage and better advertising ROI.**
