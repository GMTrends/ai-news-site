# Environment Setup for Hero Migration

## 🚀 Quick Start

To enable the new hero section on your homepage, you need to set an environment variable.

## 📝 Option 1: Create .env File

Create a `.env` file in your project root:

```bash
# Hero Migration Feature Flag
PUBLIC_USE_NEW_HERO=true
```

## 📝 Option 2: Add to Existing .env

If you already have a `.env` file, add this line:

```bash
PUBLIC_USE_NEW_HERO=true
```

## 📝 Option 3: Command Line (Temporary)

For temporary testing, you can set it in your terminal:

### Windows (PowerShell)
```powershell
$env:PUBLIC_USE_NEW_HERO="true"
npm run dev
```

### Windows (Command Prompt)
```cmd
set PUBLIC_USE_NEW_HERO=true
npm run dev
```

### macOS/Linux
```bash
export PUBLIC_USE_NEW_HERO=true
npm run dev
```

## 🔄 Control Values

| Value | Result |
|-------|---------|
| `true` | New hero section enabled |
| `false` | Old hero section (default) |
| Not set | Old hero section (default) |

## 🧪 Testing

1. **Set the environment variable** (any method above)
2. **Start development server**: `npm run dev`
3. **Visit homepage**: `http://localhost:4321/`
4. **Verify**: You should see the new premium hero section

## 🚨 Rollback

To quickly rollback to the old hero:

```bash
# Set to false
PUBLIC_USE_NEW_HERO=false

# Or remove the line entirely from .env
```

## 📋 Environment File Example

Here's a complete `.env` file example:

```bash
# Hero Migration Feature Flag
PUBLIC_USE_NEW_HERO=true

# Other environment variables...
# SANITY_PROJECT_ID=your_project_id
# SANITY_DATASET=production
# PUBLIC_SITE_URL=http://localhost:4321
```

## 🔍 Verification

After setting the environment variable:

1. **Restart your development server**
2. **Check the homepage** - should show new hero
3. **Check the test page** - `http://localhost:4321/hero-test`
4. **Verify no CSS conflicts** - old styles should remain intact

---

**Note**: The `PUBLIC_` prefix makes this variable available to the client-side code in Astro.
