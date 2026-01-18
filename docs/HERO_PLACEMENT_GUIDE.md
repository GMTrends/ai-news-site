# Hero Placement Guide

This guide explains how to use the new `heroPlacement` system to control which articles appear in your hero section.

## Overview

The hero section now properly filters articles based on their `heroPlacement` field in Sanity CMS, giving you editorial control over which articles appear where.

## How It Works

### 1. Main Article (Large Card - 70% width)
- **Fetches**: Articles with `heroPlacement = "large"`
- **Fallback**: If no large articles exist, uses the most recent published article
- **Purpose**: Your main featured story that gets prominent display

### 2. Sidebar Articles (Small Cards - 30% width)
- **Fetches**: Articles with `heroPlacement = "small"`
- **Fallback**: If no small articles exist, uses recent published articles
- **Purpose**: Supporting stories that complement the main feature

## Setting Up Articles in Sanity CMS

### Step 1: Edit an Article
1. Go to your Sanity Studio
2. Navigate to **Content** → **Articles**
3. Select an article you want to feature

### Step 2: Set Hero Placement
1. In the article editor, go to the **Analytics & Marketing** group
2. Find the **Homepage Placement** field
3. Choose one of these options:

| Option | Value | Description |
|--------|-------|-------------|
| 🌟 Featured (Large Card) | `large` | Article appears as the main story (70% width) |
| 📰 Small Cards | `small` | Article appears in the sidebar (30% width) |
| ❌ Not Featured | `none` | Article is excluded from the hero section |

### Step 3: Save and Publish
- Make sure the article status is **Published** or **Scheduled**
- The article will automatically appear in the appropriate section

## Best Practices

### For Large Cards (Main Story)
- Choose your most important, engaging content
- Articles with compelling headlines and images
- Breaking news or major announcements
- High-value content that drives engagement

### For Small Cards (Sidebar)
- Supporting stories that complement the main feature
- Quick reads and updates
- Related content that provides context
- Articles that can be consumed quickly

### Content Strategy
- **Balance**: Don't overload with too many large cards
- **Variety**: Mix different content types and categories
- **Freshness**: Regularly update your hero section
- **Testing**: Monitor which placements perform best

## Testing Your Setup

### Option 1: Browser Console
1. Open your hero page in development mode
2. Check the browser console for debug logs
3. Look for the "🎯 Hero Section Article Placement" message

### Option 2: Test Script
Run the test script to verify your Sanity setup:

```bash
node scripts/test-hero-placement.js
```

This will show you:
- How many articles have each placement
- Which articles are being selected
- Whether your setup is working correctly

## Troubleshooting

### No Articles Appearing
- Check that articles have `status = "published"`
- Verify `heroPlacement` is set to `"large"` or `"small"`
- Ensure articles have valid categories and content

### Fallback Behavior
- If no articles have specific placement, the system falls back to recent articles
- This ensures your hero section always has content
- Use this as a safety net while setting up your placement strategy

### Performance
- The new filtering is efficient and only fetches what's needed
- Large and small articles are fetched separately for optimal performance
- Fallback queries are minimal and only run when necessary

## Migration from Old System

### Before (Old System)
- All articles were fetched by publication date
- No editorial control over placement
- Main story was just the most recent article

### After (New System)
- Articles are filtered by `heroPlacement` field
- Full editorial control over hero section
- Intelligent fallbacks ensure content always displays
- Better content strategy and user experience

## Next Steps

1. **Set up your first articles** with proper `heroPlacement` values
2. **Test the system** using the browser console or test script
3. **Develop your content strategy** for large vs. small cards
4. **Monitor performance** and adjust your placement strategy
5. **Train your content team** on the new system

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Sanity CMS setup
3. Run the test script to diagnose problems
4. Check that all required fields are populated

---

**Note**: This system provides a foundation for more advanced features like A/B testing, personalized content, and dynamic hero layouts in the future.
