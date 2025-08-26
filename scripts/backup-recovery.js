#!/usr/bin/env node

/**
 * AI Buzz Media - Backup Recovery System
 * 
 * This script helps restore files from backups
 * 
 * Usage:
 * - List backups: node scripts/backup-recovery.js list
 * - Restore specific backup: node scripts/backup-recovery.js restore <backup-name>
 * - Restore specific file: node scripts/backup-recovery.js restore-file <backup-name> <file-path>
 * - Verify backup: node scripts/backup-recovery.js verify <backup-name>
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BackupRecoverySystem {
  constructor() {
    this.backupDirs = [
      './production-backups',
      './staging-backups', 
      './dev-backups',
      './backups'
    ];
  }

  // List all available backups
  listBackups() {
    console.log('🔍 Available Backups:');
    console.log('=====================');
    
    for (const backupDir of this.backupDirs) {
      if (fs.existsSync(backupDir)) {
        console.log(`\n📁 ${backupDir}:`);
        
        try {
          const items = fs.readdirSync(backupDir)
            .filter(item => item.startsWith('backup-') || item.startsWith('production-backup-'))
            .sort((a, b) => {
              const aPath = path.join(backupDir, a);
              const bPath = path.join(backupDir, b);
              try {
                const aStats = fs.statSync(aPath);
                const bStats = fs.statSync(bPath);
                return bStats.mtime.getTime() - aStats.mtime.getTime();
              } catch (error) {
                return 0;
              }
            });

          if (items.length === 0) {
            console.log('  No backups found');
          } else {
            for (const item of items) {
              const itemPath = path.join(backupDir, item);
              try {
                const stats = fs.statSync(itemPath);
                const size = stats.isDirectory() ? this.getDirectorySize(itemPath) : stats.size;
                const date = stats.mtime.toLocaleString();
                console.log(`  📦 ${item}`);
                console.log(`     📅 ${date}`);
                console.log(`     💾 ${this.formatBytes(size)}`);
                
                // Check if it's a directory with manifest
                if (stats.isDirectory()) {
                  const manifestPath = path.join(itemPath, 'backup-manifest.json');
                  if (fs.existsSync(manifestPath)) {
                    try {
                      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                      console.log(`     📊 ${manifest.files?.length || 0} files`);
                      console.log(`     🔗 Git: ${manifest.environment?.git?.commitHash?.substring(0, 8) || 'N/A'}`);
                    } catch (error) {
                      // Manifest parsing failed
                    }
                  }
                }
                console.log('');
              } catch (error) {
                console.log(`  ❌ ${item} - Error reading stats`);
              }
            }
          }
        } catch (error) {
          console.log(`  ❌ Error reading directory: ${error.message}`);
        }
      }
    }
  }

  // Get directory size recursively
  getDirectorySize(dirPath) {
    let totalSize = 0;
    try {
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        try {
          const stats = fs.statSync(fullPath);
          if (stats.isDirectory()) {
            totalSize += this.getDirectorySize(fullPath);
          } else {
            totalSize += stats.size;
          }
        } catch (error) {
          // Skip files we can't access
        }
      }
    } catch (error) {
      // Skip directories we can't access
    }
    return totalSize;
  }

  // Find backup by name
  findBackup(backupName) {
    for (const backupDir of this.backupDirs) {
      if (fs.existsSync(backupDir)) {
        const backupPath = path.join(backupDir, backupName);
        if (fs.existsSync(backupPath)) {
          return backupPath;
        }
      }
    }
    return null;
  }

  // Verify backup integrity
  verifyBackup(backupName) {
    console.log(`🔍 Verifying backup: ${backupName}`);
    
    const backupPath = this.findBackup(backupName);
    if (!backupPath) {
      console.error(`❌ Backup not found: ${backupName}`);
      return false;
    }

    const manifestPath = path.join(backupPath, 'backup-manifest.json');
    if (!fs.existsSync(manifestPath)) {
      console.error(`❌ Backup manifest not found: ${manifestPath}`);
      return false;
    }

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log(`📊 Backup info:`);
      console.log(`   📅 Created: ${manifest.timestamp}`);
      console.log(`   📁 Total files: ${manifest.files?.length || 0}`);
      console.log(`   💾 Total size: ${this.formatBytes(manifest.totalSize || 0)}`);
      console.log(`   🔗 Git commit: ${manifest.environment?.git?.commitHash || 'N/A'}`);

      if (manifest.files && manifest.files.length > 0) {
        console.log(`\n🔍 Verifying files...`);
        let verifiedFiles = 0;
        let totalFiles = 0;
        let errors = [];

        for (const fileInfo of manifest.files) {
          if (fileInfo.status === 'failed') continue;
          
          totalFiles++;
          const backupFilePath = path.join(backupPath, fileInfo.path);
          
          if (fs.existsSync(backupFilePath)) {
            try {
              const checksum = this.calculateChecksum(backupFilePath);
              if (checksum === fileInfo.checksum) {
                verifiedFiles++;
              } else {
                errors.push(`Checksum mismatch: ${fileInfo.path}`);
              }
            } catch (error) {
              errors.push(`Error reading: ${fileInfo.path} - ${error.message}`);
            }
          } else {
            errors.push(`File missing: ${fileInfo.path}`);
          }
        }

        const verificationRate = (verifiedFiles / totalFiles) * 100;
        console.log(`✅ Verification complete: ${verifiedFiles}/${totalFiles} files verified (${verificationRate.toFixed(1)}%)`);
        
        if (errors.length > 0) {
          console.log(`\n⚠️ Issues found:`);
          errors.slice(0, 10).forEach(error => console.log(`   ${error}`));
          if (errors.length > 10) {
            console.log(`   ... and ${errors.length - 10} more issues`);
          }
        }

        return verificationRate >= 95;
      } else {
        console.log(`❌ No files to verify`);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error verifying backup: ${error.message}`);
      return false;
    }
  }

  // Restore entire backup
  restoreBackup(backupName, targetDir = './restored-backup') {
    console.log(`🔄 Restoring backup: ${backupName}`);
    
    const backupPath = this.findBackup(backupName);
    if (!backupPath) {
      console.error(`❌ Backup not found: ${backupName}`);
      return false;
    }

    // Verify backup first
    if (!this.verifyBackup(backupName)) {
      console.error(`❌ Backup verification failed. Cannot restore.`);
      return false;
    }

    try {
      // Create target directory
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      console.log(`📁 Restoring to: ${targetDir}`);
      
      // Copy files
      const manifestPath = path.join(backupPath, 'backup-manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        
        let restoredFiles = 0;
        let totalFiles = 0;

        for (const fileInfo of manifest.files) {
          if (fileInfo.status === 'failed') continue;
          
          totalFiles++;
          const sourcePath = path.join(backupPath, fileInfo.path);
          const targetPath = path.join(targetDir, fileInfo.path);
          
          if (fs.existsSync(sourcePath)) {
            try {
              // Create target directory if needed
              const targetFileDir = path.dirname(targetPath);
              if (!fs.existsSync(targetFileDir)) {
                fs.mkdirSync(targetFileDir, { recursive: true });
              }

              // Copy file
              fs.copyFileSync(sourcePath, targetPath);
              restoredFiles++;
              
              if (restoredFiles % 50 === 0) {
                console.log(`📋 Restored ${restoredFiles} files...`);
              }
            } catch (error) {
              console.warn(`⚠️ Failed to restore ${fileInfo.path}: ${error.message}`);
            }
          }
        }

        console.log(`✅ Restore completed: ${restoredFiles}/${totalFiles} files restored`);
        
        // Copy manifest and environment info
        const filesToCopy = ['backup-manifest.json', 'environment-info.json', 'backup.log'];
        for (const file of filesToCopy) {
          const sourceFile = path.join(backupPath, file);
          if (fs.existsSync(sourceFile)) {
            fs.copyFileSync(sourceFile, path.join(targetDir, file));
          }
        }

        console.log(`📁 Restored backup available at: ${targetDir}`);
        return true;
      } else {
        console.error(`❌ Backup manifest not found`);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error restoring backup: ${error.message}`);
      return false;
    }
  }

  // Restore specific file from backup
  restoreFile(backupName, filePath, targetPath = null) {
    console.log(`🔄 Restoring file: ${filePath} from ${backupName}`);
    
    const backupPath = this.findBackup(backupName);
    if (!backupPath) {
      console.error(`❌ Backup not found: ${backupName}`);
      return false;
    }

    const sourcePath = path.join(backupPath, filePath);
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ File not found in backup: ${filePath}`);
      return false;
    }

    if (!targetPath) {
      targetPath = filePath;
    }

    try {
      // Create target directory if needed
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ File restored: ${targetPath}`);
      
      // Show file info
      const stats = fs.statSync(targetPath);
      console.log(`   📅 Modified: ${stats.mtime.toLocaleString()}`);
      console.log(`   💾 Size: ${this.formatBytes(stats.size)}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Error restoring file: ${error.message}`);
      return false;
    }
  }

  // Calculate file checksum
  calculateChecksum(filePath) {
    try {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('sha256').update(content).digest('hex');
    } catch (error) {
      return null;
    }
  }

  // Format bytes for display
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Show help
  showHelp() {
    console.log('🆘 Backup Recovery System - Help');
    console.log('================================');
    console.log('');
    console.log('Usage: node scripts/backup-recovery.js <command> [options]');
    console.log('');
    console.log('Commands:');
    console.log('  list                    - List all available backups');
    console.log('  verify <backup-name>    - Verify backup integrity');
    console.log('  restore <backup-name>   - Restore entire backup');
    console.log('  restore-file <backup> <file> [target] - Restore specific file');
    console.log('  help                    - Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/backup-recovery.js list');
    console.log('  node scripts/backup-recovery.js verify production-backup-2025-08-25T23-53-27-460Z');
    console.log('  node scripts/backup-recovery.js restore production-backup-2025-08-25T23-53-27-460Z');
    console.log('  node scripts/backup-recovery.js restore-file production-backup-2025-08-25T23-53-27-460Z src/components/Header.astro');
    console.log('');
  }
}

// Main execution
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  const recovery = new BackupRecoverySystem();
  const command = process.argv[2];

  switch (command) {
    case 'list':
      recovery.listBackups();
      break;
      
    case 'verify':
      const backupToVerify = process.argv[3];
      if (!backupToVerify) {
        console.error('❌ Please specify a backup name to verify');
        console.log('Usage: node scripts/backup-recovery.js verify <backup-name>');
        process.exit(1);
      }
      recovery.verifyBackup(backupToVerify);
      break;
      
    case 'restore':
      const backupToRestore = process.argv[3];
      const targetDir = process.argv[4] || './restored-backup';
      if (!backupToRestore) {
        console.error('❌ Please specify a backup name to restore');
        console.log('Usage: node scripts/backup-recovery.js restore <backup-name> [target-dir]');
        process.exit(1);
      }
      recovery.restoreBackup(backupToRestore, targetDir);
      break;
      
    case 'restore-file':
      const backupForFile = process.argv[3];
      const fileToRestore = process.argv[4];
      const targetFile = process.argv[5];
      if (!backupForFile || !fileToRestore) {
        console.error('❌ Please specify backup name and file path');
        console.log('Usage: node scripts/backup-recovery.js restore-file <backup-name> <file-path> [target-path]');
        process.exit(1);
      }
      recovery.restoreFile(backupForFile, fileToRestore, targetFile);
      break;
      
    case 'help':
    default:
      recovery.showHelp();
      break;
  }
}

export { BackupRecoverySystem };
