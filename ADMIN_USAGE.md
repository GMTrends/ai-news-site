# Admin System Usage Guide

## Quick Start

### 1. Start Sanity Studio
```bash
# Option 1: Use the npm script
npm run sanity

# Option 2: Use npx directly
npx sanity dev
```

### 2. Access Admin Dashboard
- Go to: `http://localhost:4321/admin`
- This is your main admin dashboard

### 3. Access Sanity Studio
- Once Sanity is running, go to: `http://localhost:3333`
- This is where you'll manage all your content

## What Each Button Does

### Primary Actions
- **Open Sanity Studio** - Opens Sanity CMS in a new tab
- **View Published Site** - Takes you to your public blog
- **Site Information** - Shows technical details about your site

### Content Management
- **Articles Management** - Opens Sanity Studio (articles section)
- **Authors Management** - Opens Sanity Studio (authors section)  
- **Categories Management** - Opens Sanity Studio (categories section)

### Business Tools
- **Analytics Dashboard** - Goes to `/admin/analytics`
- **Ad Configuration** - Goes to `/admin/ad-config`
- **Site Information** - Shows site details

## Troubleshooting

### If Sanity Studio Won't Start
1. Make sure you're in the project directory
2. Check that Node.js is installed
3. Try: `npx sanity dev --port 3333`
4. Check for any error messages in the terminal

### If Buttons Don't Work
1. Make sure Sanity Studio is running (`http://localhost:3333`)
2. Check browser console for errors
3. Try refreshing the admin page

## File Structure
```
src/pages/admin/
├── admin.astro          # Main admin dashboard
├── analytics.astro      # Analytics page
├── authors.astro        # Authors management
└── ad-config.astro     # Ad configuration
```

## Sanity Studio Features
- **Articles**: Create, edit, and manage blog posts
- **Authors**: Manage contributor profiles
- **Categories**: Organize content with tags
- **Media**: Upload and manage images/videos
- **Site Settings**: Configure global preferences

## Next Steps
1. Start Sanity Studio with `npm run sanity`
2. Access admin at `http://localhost:4321/admin`
3. Use Sanity Studio for all content management
4. Customize schemas in `sanity.config.ts` if needed
