# 🔒 AI News Site - Backup Retention Policy

## 📋 Overview

This document defines the backup retention policy for the AI News Site to ensure optimal storage management while maintaining adequate backup coverage.

## 🎯 Retention Rules

### **Primary Rule: Keep Latest 5 Backups**
- **Maximum Backups**: 5 local backup directories
- **Retention Period**: Latest 5 backups by creation timestamp
- **Cleanup Trigger**: Automatic cleanup when backup count exceeds 5
- **Storage Optimization**: Prevents unlimited backup accumulation

### **Backup Types Covered**
- ✅ **Local Directory Backups**: `backup-YYYY-MM-DDTHH-mm-ss-fffZ/`
- ✅ **Compressed Archives**: `backup-YYYY-MM-DDTHH-mm-ss-fffZ.zip`
- ✅ **Backup Manifests**: `backup-manifest.json` files

### **Excluded from Cleanup**
- 🔒 **Non-backup directories**: `extracted-backup/`, `temp-backup/`, etc.
- 🔒 **Git repository**: `.git/` directory
- 🔒 **Dependencies**: `node_modules/` directory
- 🔒 **Build outputs**: `dist/`, `.astro/` directories

## 🛠️ Implementation

### **Automated Cleanup Script**
```powershell
# Run cleanup manually
.\cleanup-backups.ps1

# Or with custom parameters
.\cleanup-backups.ps1 -MaxBackups 5 -BackupDir ".\backups"
```

### **Backup System Integration**
The retention policy is integrated into the main backup system:
- **File**: `backup-system.js`
- **Setting**: `maxBackups: 5`
- **Automatic**: Cleanup runs after each backup creation

## 📊 Current Backup Status

After implementing the retention policy:
- **Total Backups**: 5 (within limit)
- **Oldest Backup**: `backup-2025-08-17T22-21-33-115Z`
- **Newest Backup**: `backup-2025-08-24T13-34-52-795Z`
- **Storage Optimized**: 2 old backups removed

## 🔄 Cleanup Process

### **1. Assessment Phase**
- Count current backup directories
- Identify backups exceeding retention limit
- Sort by creation timestamp (newest first)

### **2. Selection Phase**
- **Keep**: Latest 5 backup directories
- **Remove**: All older backup directories
- **Preserve**: Corresponding zip files (if they exist)

### **3. Execution Phase**
- Remove old backup directories recursively
- Remove corresponding zip archives
- Update backup manifest and logs

### **4. Verification Phase**
- Confirm successful removal
- Display remaining backup list
- Log cleanup operations

## 📁 Backup Directory Structure

```
backups/
├── backup-2025-08-24T13-34-52-795Z/     # [KEEP] Latest
├── backup-2025-08-21T00-17-38-436Z/     # [KEEP] 2nd newest
├── backup-2025-08-21T00-14-37-228Z/     # [KEEP] 3rd newest
├── backup-2025-08-20T00-53-48-853Z/     # [KEEP] 4th newest
├── backup-2025-08-17T22-21-33-115Z/     # [KEEP] 5th newest (oldest kept)
├── extracted-backup/                      # [EXCLUDED] Not a backup
├── temp-backup/                          # [EXCLUDED] Not a backup
└── temp-backup-2/                        # [EXCLUDED] Not a backup
```

## 🚀 Usage Examples

### **Manual Cleanup**
```powershell
# Standard cleanup (keep 5 backups)
.\cleanup-backups.ps1

# Custom retention (keep 3 backups)
.\cleanup-backups.ps1 -MaxBackups 3

# Custom backup directory
.\cleanup-backups.ps1 -BackupDir ".\custom-backups"
```

### **Automated Integration**
```javascript
// In backup-system.js
const CONFIG = {
  backupDir: './backups',
  maxBackups: 5,  // Retention policy setting
  // ... other settings
};
```

## 📈 Benefits

### **Storage Management**
- **Prevents**: Unlimited backup accumulation
- **Optimizes**: Disk space utilization
- **Maintains**: Consistent backup coverage

### **Performance**
- **Faster**: Backup operations
- **Reduced**: File system overhead
- **Improved**: Directory listing performance

### **Maintenance**
- **Simplified**: Backup management
- **Automated**: Cleanup process
- **Predictable**: Storage requirements

## 🔍 Monitoring

### **Backup Count Check**
```powershell
# Check current backup count
(Get-ChildItem "backups" -Directory | Where-Object {$_.Name -like "backup-*"}).Count
```

### **Storage Usage**
```powershell
# Check backup directory sizes
Get-ChildItem "backups" -Directory | Where-Object {$_.Name -like "backup-*"} | 
    ForEach-Object {
        $size = (Get-ChildItem $_.FullName -Recurse | Measure-Object -Property Length -Sum).Sum
        [PSCustomObject]@{
            Name = $_.Name
            SizeMB = [math]::Round($size / 1MB, 2)
            LastWriteTime = $_.LastWriteTime
        }
    } | Sort-Object LastWriteTime -Descending
```

## 📝 Change Log

- **2025-08-24**: Initial retention policy implementation
- **2025-08-24**: Cleanup script created and tested
- **2025-08-24**: Documentation updated with retention rules

## 🎯 Next Steps

1. **Automate**: Integrate cleanup into backup workflow
2. **Monitor**: Set up backup count alerts
3. **Optimize**: Fine-tune retention based on usage patterns
4. **Document**: Update main backup system guide

---

**Policy Owner**: AI News Site Development Team  
**Last Updated**: 2025-08-24  
**Next Review**: 2025-09-24
