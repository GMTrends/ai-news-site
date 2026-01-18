# 🤖 AI Buzz Media - Backup System Guide

This guide explains how the automated backup system works for your website after migrating to Decap CMS.

## 📋 Overview

Your website now has a comprehensive backup system that protects:
- **Content files** (articles, authors, categories)
- **Configuration files** (Astro config, Netlify config)
- **Source code** (components, pages, styles)
- **Build outputs** and deployment files
- **Git history** and version control

## 🔄 How the Backup System Works

### **1. Git-Based Primary Backup**
- **Location**: Your GitHub repository
- **Frequency**: Every commit/push
- **What's backed up**: All source code and content
- **Recovery**: Clone repository and restore

### **2. Automated File System Backup**
- **Location**: `./backups/` directory
- **Frequency**: Daily (2 AM UTC) + on content changes
- **What's backed up**: Complete website snapshot
- **Recovery**: Extract backup files

### **3. Netlify Deployment Backups**
- **Location**: Netlify dashboard
- **Frequency**: Every deployment
- **What's backed up**: Live site snapshots
- **Recovery**: Rollback to previous deployment

### **4. Cloud Storage Backup** (Optional)
- **Location**: AWS S3 / Google Drive
- **Frequency**: Daily scheduled backups
- **What's backed up**: Compressed archives
- **Recovery**: Download and extract

## 📁 Backup Locations

```
ai-news-site/
├── backups/                    # Local backup directory
│   ├── backup-2024-12-25T.../ # Timestamped backup folders
│   ├── backup-2024-12-25T.../ # Each backup contains:
│   │   ├── src/               # Source code
│   │   ├── public/            # Public assets
│   │   ├── netlify/           # Netlify functions
│   │   ├── backup-manifest.json # Backup metadata
│   │   └── ...                # All other files
│   └── backup-*.tar.gz        # Compressed archives
├── .github/workflows/          # GitHub Actions
│   └── backup.yml             # Automated backup workflow
└── backup-system.js           # Backup script
```

## ⏰ Backup Schedule

### **Automatic Backups**
- **Daily**: 2:00 AM UTC (via GitHub Actions)
- **On Content Changes**: When you publish articles
- **On Code Changes**: When you push to main branch
- **On Manual Trigger**: Via GitHub Actions UI

### **Manual Backups**
```bash
# Run backup manually
node backup-system.js

# Or use npm script (if added to package.json)
npm run backup
```

## 🔧 Configuration

### **Backup System Settings** (`backup-system.js`)
```javascript
const CONFIG = {
  backupDir: './backups',        // Backup location
  maxBackups: 10,               // Keep last 10 backups
  includeFiles: [               // Files to backup
    'src/content/**/*',         // All content
    'src/components/**/*',      // All components
    'public/**/*',              // Public assets
    // ... more patterns
  ],
  excludeFiles: [               // Files to skip
    'node_modules/**/*',        // Dependencies
    'dist/**/*',                // Build output
    '.env*',                    // Environment files
    // ... more patterns
  ]
};
```

### **GitHub Actions Settings** (`.github/workflows/backup.yml`)
```yaml
on:
  schedule:
    - cron: '0 2 * * *'         # Daily at 2 AM UTC
  workflow_dispatch:            # Manual trigger
  push:
    branches: [ main ]          # On main branch push
    paths:                      # On content changes
      - 'src/content/**'
      - 'public/**'
```

## 📊 What Gets Backed Up

### **✅ Included Files**
- **Content**: Articles, authors, categories, pages
- **Code**: Components, pages, layouts, styles
- **Config**: Astro, Netlify, TypeScript configs
- **Assets**: Images, fonts, public files
- **Functions**: Netlify serverless functions
- **Documentation**: README, guides, checklists

### **❌ Excluded Files**
- **Dependencies**: `node_modules/`
- **Build Output**: `dist/`, `.astro/`
- **Environment**: `.env*` files
- **Logs**: `*.log` files
- **OS Files**: `.DS_Store`, `Thumbs.db`
- **Previous Backups**: `backups/` directory

## 🔍 Backup Verification

### **Backup Manifest**
Each backup includes a `backup-manifest.json` file:
```json
{
  "timestamp": "2024-12-25T22:30:00.000Z",
  "backupName": "backup-2024-12-25T22-30-00-000Z",
  "git": {
    "commitHash": "abc123...",
    "branch": "main",
    "hasUncommittedChanges": false
  },
  "files": [
    {
      "path": "src/content/articles/example.md",
      "size": 2048,
      "modified": "2024-12-25T20:00:00.000Z",
      "checksum": "sha256-hash"
    }
  ],
  "totalSize": 1048576,
  "checksum": "backup-checksum"
}
```

### **Verification Commands**
```bash
# Check backup integrity
node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('backups/latest/backup-manifest.json'));
console.log('Backup verified:', manifest.files.length, 'files');
"

# List all backups
ls -la backups/

# Check backup size
du -sh backups/
```

## 🚀 Recovery Procedures

### **1. Full Site Recovery**
```bash
# Clone fresh repository
git clone https://github.com/yourusername/ai-news-site.git
cd ai-news-site

# Install dependencies
npm install

# Build the site
npm run build

# Deploy to Netlify
npm run deploy
```

### **2. Content Recovery**
```bash
# Extract specific backup
tar -xzf backups/backup-2024-12-25T22-30-00-000Z.tar.gz

# Copy content files
cp -r backup-2024-12-25T22-30-00-000Z/src/content/* src/content/

# Commit and push
git add .
git commit -m "Restore content from backup"
git push
```

### **3. Netlify Rollback**
1. Go to Netlify dashboard
2. Navigate to **Deploys**
3. Find the working deployment
4. Click **"Publish deploy"** to rollback

### **4. Cloud Storage Recovery**
```bash
# Download from S3
aws s3 sync s3://your-bucket/website-backups/ ./recovery/

# Download from Google Drive
rclone copy gdrive:website-backups/ ./recovery/
```

## 📈 Backup Monitoring

### **GitHub Actions Logs**
- Check **Actions** tab in your repository
- Monitor backup workflow runs
- Review failure notifications

### **Backup Health Checks**
```bash
# Check backup system status
node -e "
const { BackupSystem } = require('./backup-system.js');
const backup = new BackupSystem();
console.log('Backup system ready:', backup.backupName);
"

# Monitor backup directory
watch -n 60 'ls -la backups/ | tail -5'
```

### **Alert Notifications**
- **Slack**: Failed backup notifications
- **Email**: GitHub Actions notifications
- **Dashboard**: Netlify deployment status

## 🔐 Security Considerations

### **Backup Security**
- **Encryption**: Backups are not encrypted by default
- **Access Control**: GitHub repository permissions
- **Environment Variables**: Never backed up (`.env*` files)
- **Secrets**: Stored in GitHub Secrets, not in backups

### **Recovery Security**
- **Verification**: Checksums for file integrity
- **Git History**: Full audit trail of changes
- **Rollback**: Multiple recovery options
- **Testing**: Verify backups before relying on them

## 🛠️ Maintenance

### **Regular Tasks**
- **Monthly**: Review backup retention policy
- **Quarterly**: Test recovery procedures
- **Annually**: Update backup configuration
- **As Needed**: Clean up old backups

### **Backup Cleanup**
```bash
# Manual cleanup (keeps last 10)
node backup-system.js

# Force cleanup
rm -rf backups/backup-2024-01-*
```

## 📞 Support

### **Common Issues**
1. **Backup fails**: Check disk space and permissions
2. **Recovery fails**: Verify backup integrity
3. **Large backups**: Review included/excluded files
4. **Slow backups**: Optimize file patterns

### **Getting Help**
- **GitHub Issues**: Report backup problems
- **Documentation**: This guide and README
- **Community**: Astro and Netlify forums
- **Professional**: Consider managed backup services

## 🎯 Best Practices

### **Before Making Changes**
1. **Manual backup**: `node backup-system.js`
2. **Git commit**: `git add . && git commit -m "Before changes"`
3. **Test locally**: `npm run dev`

### **After Content Updates**
1. **Verify backup**: Check backup manifest
2. **Test recovery**: Practice restore procedure
3. **Monitor deployment**: Ensure site works correctly

### **Regular Maintenance**
1. **Review backups**: Check backup health monthly
2. **Update configuration**: Adjust backup settings as needed
3. **Test procedures**: Practice recovery quarterly

---

**💡 Pro Tip**: Your Decap CMS content is automatically backed up with every Git commit, so you have multiple layers of protection for your valuable content! 