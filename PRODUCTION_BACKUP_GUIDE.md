# 🚀 AI Buzz Media - Production Backup System Guide

## 📋 Overview

This guide covers the comprehensive backup system designed for production use. The system provides automated, reliable backups with minimal impact on development workflow.

## 🎯 **Why Production Backups Are Better**

### **Development vs Production Backups**

| Aspect | Development | Production |
|--------|-------------|------------|
| **Frequency** | Manual only | Automated daily |
| **Reliability** | Often crashes | Robust error handling |
| **File Locks** | High conflict | Low conflict |
| **Performance** | Slows development | Runs off-peak |
| **Verification** | Basic | Comprehensive |
| **Recovery** | Manual | Automated tools |

### **Key Benefits of Production Backups**

✅ **No Development Interruption** - Runs when you're not coding  
✅ **Automated Scheduling** - Daily backups at 2 AM UTC  
✅ **Cloud Storage** - GitHub Actions artifacts + optional cloud storage  
✅ **Integrity Verification** - Checksum validation for all files  
✅ **Easy Recovery** - One-command restore operations  
✅ **Environment Specific** - Different settings for dev/staging/prod  

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Development   │    │     Staging      │    │   Production    │
│                 │    │                  │    │                 │
│ • Manual only   │    │ • Weekly backups │    │ • Daily backups │
│ • 3 backups max │    │ • 5 backups max  │    │ • 10 backups max│
│ • No verification│   │ • Basic verify   │    │ • Full verify   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │  GitHub Actions  │
                    │                  │
                    │ • Automated runs │
                    │ • Cloud storage  │
                    │ • Notifications  │
                    └──────────────────┘
```

## 🚀 **Quick Start**

### **1. Test the Production Backup System**

```bash
# Run a production backup
NODE_ENV=production node scripts/production-backup.js

# List all backups
node scripts/backup-recovery.js list

# Verify a backup
node scripts/backup-recovery.js verify production-backup-YYYY-MM-DDTHH-MM-SS-sssZ
```

### **2. Manual Backup (When Needed)**

```bash
# Development backup (lightweight)
NODE_ENV=development node scripts/production-backup.js

# Staging backup (medium)
NODE_ENV=staging node scripts/production-backup.js

# Production backup (full)
NODE_ENV=production node scripts/production-backup.js
```

### **3. Restore from Backup**

```bash
# Restore entire backup
node scripts/backup-recovery.js restore production-backup-YYYY-MM-DDTHH-MM-SS-sssZ

# Restore specific file
node scripts/backup-recovery.js restore-file production-backup-YYYY-MM-DDTHH-MM-SS-sssZ src/components/Header.astro

# Restore to custom location
node scripts/backup-recovery.js restore production-backup-YYYY-MM-DDTHH-MM-SS-sssZ ./my-restored-site
```

## ⚙️ **Configuration**

### **Environment Variables**

```bash
# Backup Configuration
NODE_ENV=production                    # Environment (dev/staging/prod)
BACKUP_DIR=./production-backups        # Backup directory
MAX_BACKUPS=10                         # Maximum backups to keep
COMPRESSION_LEVEL=high                 # high/medium/low
VERIFY_BACKUP=true                     # Enable/disable verification
LOG_LEVEL=info                         # debug/info/warn/error

# Database Backup
INCLUDE_DATABASE=true                  # Include Sanity CMS data
INCLUDE_BUILD_ARTIFACTS=true          # Include build outputs

# Cloud Storage (Optional)
AWS_ACCESS_KEY_ID=your_key            # AWS S3 backup
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=your-bucket

# Notifications (Optional)
SLACK_WEBHOOK_URL=your_webhook        # Slack notifications
DISCORD_WEBHOOK_URL=your_webhook      # Discord notifications
```

### **Configuration Files**

- **`scripts/backup-config.js`** - Environment-specific settings
- **`.github/workflows/production-backup.yml`** - GitHub Actions workflow
- **`scripts/production-backup.js`** - Main backup script
- **`scripts/backup-recovery.js`** - Recovery and restore tools

## 📅 **Backup Schedules**

### **Automated Schedules**

| Environment | Frequency | Time | Retention |
|-------------|-----------|------|-----------|
| **Development** | Manual only | - | 3 backups, 7 days |
| **Staging** | Weekly | Sundays 2 AM UTC | 5 backups, 30 days |
| **Production** | Daily | 2 AM UTC | 10 backups, 90 days |

### **Manual Triggers**

```bash
# GitHub Actions manual trigger
# Go to: Actions → Production Backup → Run workflow

# Local manual backup
NODE_ENV=production node scripts/production-backup.js
```

## 🔍 **Backup Contents**

### **What Gets Backed Up**

✅ **Source Code**
- `src/` directory (components, pages, layouts)
- Configuration files (astro.config.mjs, package.json)
- TypeScript configs and schemas

✅ **Content & Assets**
- `public/` directory (images, fonts, icons)
- `src/content/` (articles, authors, categories)
- Sanity CMS schemas

✅ **Build & Deployment**
- `netlify/` functions and configuration
- `dist/` build outputs (production)
- `netlify.toml` deployment config

✅ **Database & CMS**
- Sanity CMS data (staging/production)
- Content exports and schemas

### **What's Excluded**

❌ **Development Files**
- `node_modules/`
- `.astro/` cache
- `.netlify/` local files
- Temporary backup directories

❌ **Sensitive Data**
- `.env*` files
- Log files
- System files (.DS_Store, Thumbs.db)

## 📊 **Backup Verification**

### **Integrity Checks**

```bash
# Verify backup integrity
node scripts/backup-recovery.js verify production-backup-YYYY-MM-DDTHH-MM-SS-sssZ
```

**Verification Process:**
1. **File Count Check** - Ensures all files are present
2. **Checksum Validation** - SHA256 hash verification
3. **Size Verification** - File size consistency
4. **Manifest Validation** - Backup metadata integrity

**Success Criteria:**
- ✅ 95%+ file verification rate
- ✅ All critical files present
- ✅ Checksum matches for all files
- ✅ Backup manifest complete

## 🔄 **Recovery Operations**

### **Full Site Recovery**

```bash
# Restore entire website
node scripts/backup-recovery.js restore production-backup-YYYY-MM-DDTHH-MM-SS-sssZ

# Restore to custom location
node scripts/backup-recovery.js restore production-backup-YYYY-MM-DDTHH-MM-SS-sssZ ./restored-site
```

### **Selective File Recovery**

```bash
# Restore specific component
node scripts/backup-recovery.js restore-file production-backup-YYYY-MM-DDTHH-MM-SS-sssZ src/components/Header.astro

# Restore with custom name
node scripts/backup-recovery.js restore-file production-backup-YYYY-MM-DDTHH-MM-SS-sssZ src/components/Header.astro ./Header-backup.astro
```

### **Recovery Verification**

```bash
# List available backups
node scripts/backup-recovery.js list

# Check backup details
node scripts/backup-recovery.js verify production-backup-YYYY-MM-DDTHH-MM-SS-sssZ
```

## ☁️ **Cloud Storage & GitHub Actions**

### **GitHub Actions Artifacts**

- **Backup Files**: 30-day retention
- **Compressed Archives**: 90-day retention
- **Automatic cleanup** of old artifacts

### **Optional Cloud Storage**

```bash
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=your-bucket
AWS_REGION=us-east-1

# Google Cloud Storage
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
GOOGLE_STORAGE_BUCKET=your-bucket
GOOGLE_CLOUD_PROJECT=your-project

# Azure Blob Storage
AZURE_STORAGE_ACCOUNT=your-account
AZURE_STORAGE_KEY=your-key
AZURE_STORAGE_CONTAINER=your-container
```

## 🚨 **Monitoring & Notifications**

### **Success Notifications**

- ✅ Backup completion status
- 📊 File count and size summary
- 🔗 Git commit information
- ⏱️ Backup duration

### **Failure Alerts**

- ❌ Backup failure notifications
- 🔍 Detailed error logs
- 🔗 GitHub Actions run URL
- 📅 Failure timestamp

### **Notification Channels**

- **Slack**: Webhook integration
- **Discord**: Webhook integration  
- **Email**: SMTP server integration
- **GitHub**: Built-in notifications

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **Backup Fails During Development**
```bash
# Solution: Use production backup system
NODE_ENV=production node scripts/production-backup.js

# Or wait for automated backup at 2 AM UTC
```

#### **File Lock Errors**
```bash
# Check if files are being edited
git status

# Wait for development to complete
# Run backup when not actively coding
```

#### **Permission Denied**
```bash
# Check file permissions
ls -la

# Ensure backup directory is writable
chmod 755 production-backups/
```

#### **Out of Disk Space**
```bash
# Check available space
df -h

# Clean old backups
node scripts/backup-recovery.js list
# Manually remove old backups if needed
```

### **Debug Mode**

```bash
# Enable debug logging
LOG_LEVEL=debug NODE_ENV=production node scripts/production-backup.js

# Check backup logs
cat production-backups/production-backup-YYYY-MM-DDTHH-MM-SS-sssZ/backup.log
```

## 📈 **Performance & Optimization**

### **Backup Performance**

| Environment | Expected Duration | File Count | Size |
|-------------|-------------------|------------|------|
| **Development** | 1-2 minutes | ~100 files | 5-10 MB |
| **Staging** | 3-5 minutes | ~150 files | 15-25 MB |
| **Production** | 5-10 minutes | ~200 files | 25-50 MB |

### **Optimization Tips**

1. **Run During Off-Peak Hours** - Automated backups at 2 AM UTC
2. **Use Compression** - High compression for production backups
3. **Exclude Unnecessary Files** - Skip temp files and caches
4. **Incremental Backups** - Only backup changed files (future feature)
5. **Parallel Processing** - Multiple file operations (future feature)

## 🔮 **Future Enhancements**

### **Planned Features**

- **Incremental Backups** - Only backup changed files
- **Database Dumps** - Sanity CMS data export
- **Cloud Sync** - Automatic cloud storage upload
- **Backup Encryption** - Secure backup storage
- **Web Dashboard** - Backup management interface
- **Scheduled Restores** - Automated recovery testing

### **Integration Possibilities**

- **Monitoring Tools** - Grafana, Prometheus
- **CI/CD Pipelines** - Pre-deployment backups
- **Disaster Recovery** - Multi-region backup storage
- **Compliance** - GDPR, SOC2 backup policies

## 📚 **Additional Resources**

### **Documentation**

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js File System](https://nodejs.org/api/fs.html)
- [PowerShell Compression](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.archive/)

### **Support**

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: This guide and inline code comments
- **Community**: AI Buzz Media development team

---

## 🎉 **Getting Started Checklist**

- [ ] **Install Dependencies** - Ensure Node.js 20+ is installed
- [ ] **Test Local Backup** - Run production backup script locally
- [ ] **Verify GitHub Actions** - Check workflow is working
- [ ] **Set Environment Variables** - Configure backup settings
- [ ] **Test Recovery** - Verify backup restore functionality
- [ ] **Monitor First Backup** - Check automated backup success
- [ ] **Configure Notifications** - Set up failure alerts
- [ ] **Document Procedures** - Team backup and recovery processes

---

**🎯 Remember**: Production backups are designed to run automatically without interfering with your development workflow. They provide reliable, verified backups that you can trust when you need them most.
