# Testing Guide - Premium Header & Convert Hero

## 🎯 What We've Built

1. **Premium Header** (`HeaderPremium.astro`) - New header design with full search functionality
2. **Convert Hero** (`HeroConvert.astro`) - Conversion-focused hero section with animations
3. **Safe Toggle System** - Feature flags for easy switching and rollback

## 🚀 Quick Start Testing

### Step 1: Enable Premium Header

Create or update your `.env` file in the project root:

```bash
# Enable Premium Header
PUBLIC_USE_PREMIUM_HEADER=true
```

### Step 2: Enable Convert Hero

Add to your `.env` file:

```bash
# Enable Convert Hero
PUBLIC_USE_CONVERT_HERO=true
```

### Step 3: Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Visit Homepage

Open `http://localhost:4321/` in your browser

## 🧪 Testing Checklist

### Premium Header Testing

- [ ] **Visual Check**: Header matches the HTML design exactly
- [ ] **Logo**: Logo icon has glow effect on hover
- [ ] **Navigation**: All nav links display correctly
- [ ] **Search Icon**: Search icon appears at the far right
- [ ] **Search Functionality**:
  - [ ] Click search icon opens overlay
  - [ ] Search input appears and focuses
  - [ ] Type to search articles
  - [ ] Search results appear below input
  - [ ] Keyboard navigation works (Arrow Up/Down, Enter)
  - [ ] Click outside closes search
  - [ ] Escape key closes search
  - [ ] Close button works
- [ ] **Scroll Effect**: Header background changes on scroll
- [ ] **Mobile**: Mobile menu works correctly
- [ ] **Responsive**: Header adapts to different screen sizes

### Convert Hero Testing

- [ ] **Visual Check**: Hero matches the HTML design exactly
- [ ] **Background Animations**:
  - [ ] Blobs pulse and animate
  - [ ] Floating particles move around
  - [ ] Radial gradient follows mouse movement
- [ ] **Notification Badge**: Appears at top with animation
- [ ] **Headline**: Gradient text displays correctly
- [ ] **Benefits List**: All benefit items show with icons
- [ ] **Vault Card**:
  - [ ] Glow effect on hover
  - [ ] Limited spots badge displays
  - [ ] Bonus items list shows
  - [ ] Email form displays
- [ ] **Form Functionality**:
  - [ ] Email input accepts text
  - [ ] Submit button shows spinner on click
  - [ ] Success message appears
  - [ ] Spots remaining decreases
  - [ ] Form resets after 3 seconds
- [ ] **Testimonial**: Displays with stars and quote
- [ ] **Stats Cards**: All 3 stats display with hover effects
- [ ] **Trust Indicators**: Company logos display
- [ ] **Responsive**: Layout adapts on mobile

## 🔄 Feature Flag Control

### Enable Both Components

```bash
PUBLIC_USE_PREMIUM_HEADER=true
PUBLIC_USE_CONVERT_HERO=true
```

### Enable Only Header

```bash
PUBLIC_USE_PREMIUM_HEADER=true
PUBLIC_USE_CONVERT_HERO=false
```

### Enable Only Hero

```bash
PUBLIC_USE_PREMIUM_HEADER=false
PUBLIC_USE_CONVERT_HERO=true
```

### Disable Both (Use Old Components)

```bash
PUBLIC_USE_PREMIUM_HEADER=false
PUBLIC_USE_CONVERT_HERO=false
```

Or simply remove/comment out the lines.

## 🚨 Rollback Instructions

If something breaks, instantly rollback:

1. **Quick Rollback**: Set flags to `false` or remove them
2. **Restart Server**: Stop and restart `npm run dev`
3. **Verify**: Old components should appear

## 🐛 Troubleshooting

### Header Not Showing
- Check `.env` file exists in project root
- Verify `PUBLIC_USE_PREMIUM_HEADER=true` is set
- Restart development server
- Clear browser cache

### Hero Not Showing
- Check `.env` file exists in project root
- Verify `PUBLIC_USE_CONVERT_HERO=true` is set
- Restart development server
- Check browser console for errors

### Search Not Working
- Check browser console for JavaScript errors
- Verify `/api/search-articles.json` endpoint exists
- Check network tab for API calls

### Animations Not Working
- Check browser supports CSS animations
- Verify JavaScript is enabled
- Check for console errors

## 📊 Visual Comparison

Compare your site with the original HTML file:
- Colors should match exactly
- Hover effects should work
- Animations should be smooth
- Layout should be identical

## ✅ Success Criteria

Everything is working correctly when:
1. ✅ Premium header displays with search icon on the right
2. ✅ Search functionality works completely
3. ✅ Convert hero displays with all animations
4. ✅ Form submission works
5. ✅ All hover effects work
6. ✅ Responsive design works on mobile
7. ✅ No console errors
8. ✅ Visual parity with HTML file

## 🎉 Next Steps After Testing

Once everything is verified:
1. Test on different browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices
3. Test on different screen sizes
4. Monitor performance
5. Gather user feedback
6. Deploy to staging environment
7. Final production deployment

---

**Need Help?** Check the component files:
- `src/components/HeaderPremium.astro`
- `src/components/HeroConvert.astro`
- `src/components/HeaderToggle.astro`
- `src/components/HeroToggle.astro`

