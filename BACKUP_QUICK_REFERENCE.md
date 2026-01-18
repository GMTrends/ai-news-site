# 🚀 AI Buzz Media - Backup Quick Reference Guide

## 🎯 **When You Need a Backup**

### **✅ Good Times to Backup:**
- After completing major features
- Before deploying to production
- When you're done coding for the day
- Before making risky changes
- Weekly on Sundays (automatic)

### **❌ Bad Times to Backup:**
- While actively editing files
- During git operations
- When running development server
- While building the project

---

## 🚀 **Quick Backup Commands**

### **1. Production Backup (Recommended)**
```bash
npm run backup:prod
```
**What it does:** Full backup with verification, compression, and integrity checks
**When to use:** Before major deployments, weekly maintenance

### **2. Development Backup (Lightweight)**
```bash
npm run backup:dev
```
**What it does:** Quick backup of essential files only
**When to use:** Daily development work, quick saves

### **3. Staging Backup (Medium)**
```bash
npm run backup:staging
```
**What it does:** Balanced backup with some verification
**When to use:** Before testing new features

---

## 📋 **Backup Status & Management**

### **List All Backups**
```bash
npm run backup:list
```
**Shows:** Available backups, dates, sizes, file counts

### **Check Backup Health**
```bash
npm run backup:status
```
**Shows:** Latest backup status, disk space, next scheduled backup

---

## 🔄 **Recovery Commands**

### **Restore Entire Website**
```bash
npm run backup:restore <backup-name>
```
**Example:**
```bash
npm run backup:restore production-backup-2025-08-25T23-53-27-460Z
```

### **Restore Single File**
```bash
npm run backup:restore-file <backup-name> <file-path>
```
**Example:**
```bash
npm run backup:restore-file production-backup-2025-08-25T23-53-27-460Z src/components/Header.astro
```

### **Verify Backup Integrity**
```bash
npm run backup:verify <backup-name>
```
**Example:**
```bash
npm run backup:verify production-backup-2025-08-25T23-53-27-460Z
```

---

## ⏰ **Automatic Backup Schedule**

### **Daily (2 AM UTC)**
- **Production backups** run automatically
- **No action needed** from you
- **GitHub Actions** handles everything
- **Cloud storage** included

### **Weekly (Sundays 2 AM UTC)**
- **Staging backups** run automatically
- **Database exports** included
- **Build artifacts** backed up

### **Manual (When You Need It)**
- Use the quick commands above
- Run when you're not actively coding
- Perfect for pre-deployment backups

---

## 🆘 **Emergency Recovery Steps**

### **Website Down? Need to Restore?**

1. **List available backups:**
   ```bash
   npm run backup:list
   ```

2. **Find the most recent working backup:**
   - Look for backups with "completed" status
   - Check the date (most recent first)
   - Verify it has the files you need

3. **Restore the backup:**
   ```bash
   npm run backup:restore <backup-name>
   ```

4. **Verify the restore:**
   - Check that key files are present
   - Test the website functionality
   - Look for any error messages

### **Need Just One File?**

1. **Find the backup with the file:**
   ```bash
   npm run backup:list
   ```

2. **Restore the specific file:**
   ```bash
   npm run backup:restore-file <backup-name> <file-path>
   ```

3. **Check the restored file:**
   - Verify it's the right version
   - Check the file size and date

---

## 🛠️ **Troubleshooting Common Issues**

### **Backup Fails?**
```bash
# Check what went wrong
npm run backup:status

# Try again with debug info
LOG_LEVEL=debug npm run backup:prod

# Check disk space
dir
```

### **Can't Find a Backup?**
```bash
# List all backup locations
npm run backup:list

# Check if backups exist
dir production-backups
dir staging-backups
dir dev-backups
```

### **Restore Not Working?**
```bash
# Verify the backup first
npm run backup:verify <backup-name>

# Check backup contents
dir production-backups\<backup-name>
```

---

## 📱 **GitHub Actions Dashboard**

### **Check Automated Backups**
1. Go to your GitHub repository
2. Click **Actions** tab
3. Look for **Production Backup** workflow
4. Check the latest run status

### **Manual Trigger (If Needed)**
1. Go to **Actions** → **Production Backup**
2. Click **Run workflow**
3. Select environment (production/staging/development)
4. Click **Run workflow**

---

## 💾 **Backup Storage Locations**

### **Local Backups**
- **Production:** `./production-backups/`
- **Staging:** `./staging-backups/`
- **Development:** `./dev-backups/`

### **Cloud Storage**
- **GitHub Actions:** 30-90 day retention
- **Automatic cleanup** of old backups
- **Download artifacts** if needed

---

## 🎯 **Best Practices**

### **Daily Workflow**
1. **Start coding** - no backup needed
2. **Make changes** - work normally
3. **Finish coding** - run backup if needed
4. **Deploy** - automatic backup runs

### **Before Major Changes**
1. **Run production backup:**
   ```bash
   npm run backup:prod
   ```
2. **Verify backup success**
3. **Make your changes**
4. **Test everything works**

### **Weekly Maintenance**
1. **Check backup status:**
   ```bash
   npm run backup:status
   ```
2. **Review recent backups**
3. **Clean up old files if needed**

---

## 📞 **Need Help?**

### **Quick Commands Reference**
```bash
npm run backup:prod      # Full production backup
npm run backup:dev       # Lightweight development backup
npm run backup:staging   # Medium staging backup
npm run backup:list      # List all backups
npm run backup:status    # Check backup health
npm run backup:restore   # Restore entire backup
npm run backup:verify    # Verify backup integrity
```

### **Emergency Recovery**
```bash
# 1. List backups
npm run backup:list

# 2. Find working backup
# 3. Restore it
npm run backup:restore <backup-name>

# 4. Verify restore
# 5. Test website
```

---

## 🎉 **You're All Set!**

- **Automatic backups** run daily at 2 AM UTC
- **Manual backups** when you need them
- **Easy recovery** with simple commands
- **No more lost work** or broken websites

**Remember:** The best backup is the one you don't have to think about. Let the automated system handle the daily work, and use manual backups for special occasions!

---

*Last updated: August 25, 2025*
*Backup system version: 2.0*
