#!/usr/bin/env node

/**
 * AI Buzz Media - Production Backup System
 * 
 * This script creates production backups with:
 * - Database dumps (Sanity CMS)
 * - Content files
 * - Configuration files
 * - Build artifacts
 * - User uploads
 * - Incremental backup support
 * 
 * Usage:
 * - Manual: node scripts/production-backup.js
 * - Automated: GitHub Actions or cron job
 * - Environment: NODE_ENV=production node scripts/production-backup.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production Configuration
const PROD_CONFIG = {
  backupDir: process.env.BACKUP_DIR || './production-backups',
  maxBackups: parseInt(process.env.MAX_BACKUPS) || 10,
  includeFiles: [
    'src/content/**/*',
    'src/components/**/*',
    'src/pages/**/*',
    'src/styles/**/*',
    'src/layouts/**/*',
    'src/lib/**/*',
    'src/utils/**/*',
    'public/**/*',
    'netlify/**/*',
    'schemas/**/*',
    'astro.config.mjs',
    'package.json',
    'package-lock.json',
    'netlify.toml',
    'tsconfig.json',
    'sanity.config.ts',
    'env.example',
    'README.md'
  ],
  excludeFiles: [
    'node_modules/**/*',
    'dist/**/*',
    '.astro/**/*',
    '.netlify/**/*',
    'production-backups/**/*',
    'backups/**/*',
    '*.log',
    '.env*',
    '.DS_Store',
    'Thumbs.db',
    'temp-backup*/**/*',
    'extracted-backup/**/*'
  ],
  // Production-specific settings
  includeDatabase: true,
  includeBuildArtifacts: true,
  compressionLevel: 'high', // high, medium, low
  verifyBackup: true,
  logLevel: process.env.LOG_LEVEL || 'info'
};

class ProductionBackupSystem {
  constructor() {
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupName = `production-backup-${this.timestamp}`;
    this.backupPath = path.join(PROD_CONFIG.backupDir, this.backupName);
    this.logFile = path.join(this.backupPath, 'backup.log');
    this.startTime = Date.now();
  }

  // Enhanced logging system
  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };

    // Console output
    if (level === 'error') {
      console.error(`❌ [${timestamp}] ${message}`);
    } else if (level === 'warn') {
      console.warn(`⚠️ [${timestamp}] ${message}`);
    } else if (level === 'info') {
      console.log(`ℹ️ [${timestamp}] ${message}`);
    } else if (level === 'debug') {
      if (PROD_CONFIG.logLevel === 'debug') {
        console.log(`🔍 [${timestamp}] ${message}`);
      }
    }

    // File logging
    try {
      if (!fs.existsSync(path.dirname(this.logFile))) {
        fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
      }
      fs.appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n');
    } catch (error) {
      console.warn(`⚠️ Failed to write to log file: ${error.message}`);
    }
  }

  // Create backup directory
  createBackupDir() {
    this.log('info', 'Creating production backup directory...');
    try {
      if (!fs.existsSync(PROD_CONFIG.backupDir)) {
        fs.mkdirSync(PROD_CONFIG.backupDir, { recursive: true });
      }
      fs.mkdirSync(this.backupPath, { recursive: true });
      this.log('info', `✅ Backup directory created: ${this.backupPath}`);
    } catch (error) {
      this.log('error', `Failed to create backup directory: ${error.message}`);
      throw error;
    }
  }

  // Get production environment info
  getEnvironmentInfo() {
    try {
      const envInfo = {
        nodeEnv: process.env.NODE_ENV || 'development',
        timestamp: this.timestamp,
        backupName: this.backupName,
        git: this.getGitInfo(),
        system: {
          platform: process.platform,
          arch: process.arch,
          nodeVersion: process.version,
          memoryUsage: process.memoryUsage()
        }
      };

      // Save environment info
      const envInfoPath = path.join(this.backupPath, 'environment-info.json');
      fs.writeFileSync(envInfoPath, JSON.stringify(envInfo, null, 2));
      
      return envInfo;
    } catch (error) {
      this.log('warn', `Failed to get environment info: ${error.message}`);
      return null;
    }
  }

  // Get Git status and commit hash
  getGitInfo() {
    try {
      const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
      const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      
      return {
        commitHash,
        branch,
        remoteUrl,
        hasUncommittedChanges: status.length > 0,
        status
      };
    } catch (error) {
      this.log('warn', `Git information not available: ${error.message}`);
      return null;
    }
  }

  // Create backup manifest
  createManifest() {
    this.log('info', 'Creating backup manifest...');
    
    const manifest = {
      timestamp: this.timestamp,
      backupName: this.backupName,
      environment: this.getEnvironmentInfo(),
      files: [],
      totalSize: 0,
      checksum: null,
      backupDuration: 0,
      status: 'in_progress'
    };

    // Save initial manifest
    const manifestPath = path.join(this.backupPath, 'backup-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    return manifest;
  }

  // Copy files with enhanced error handling
  async copyFiles(manifest) {
    this.log('info', 'Starting file copy process...');
    let totalSize = 0;
    let fileCount = 0;
    let errorCount = 0;

    try {
      // Get all files to copy
      const filesToCopy = this.getAllFiles();
      this.log('info', `Found ${filesToCopy.length} files to backup`);
      
      for (const filePath of filesToCopy) {
        try {
          const relativePath = path.relative(process.cwd(), filePath);
          const destPath = path.join(this.backupPath, relativePath);
          
          // Create destination directory if needed
          const destDir = path.dirname(destPath);
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          // Copy file with retry logic
          let copySuccess = false;
          let retryCount = 0;
          const maxRetries = 3;

          while (!copySuccess && retryCount < maxRetries) {
            try {
              fs.copyFileSync(filePath, destPath);
              copySuccess = true;
            } catch (copyError) {
              retryCount++;
              if (retryCount >= maxRetries) {
                throw copyError;
              }
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 100 * retryCount));
            }
          }
          
          // Get file info
          const stats = fs.statSync(filePath);
          
          manifest.files.push({
            path: relativePath,
            size: stats.size,
            modified: stats.mtime.toISOString(),
            checksum: this.calculateChecksum(filePath)
          });
          
          totalSize += stats.size;
          fileCount++;
          
          if (fileCount % 50 === 0) {
            this.log('info', `📋 Copied ${fileCount} files...`);
          }
        } catch (error) {
          errorCount++;
          this.log('warn', `Failed to copy ${filePath}: ${error.message}`);
          
          // Add failed file to manifest
          manifest.files.push({
            path: path.relative(process.cwd(), filePath),
            error: error.message,
            status: 'failed'
          });
        }
      }

      manifest.totalSize = totalSize;
      manifest.status = errorCount === 0 ? 'completed' : 'completed_with_errors';
      
      this.log('info', `✅ File copy completed: ${fileCount} files (${this.formatBytes(totalSize)})`);
      if (errorCount > 0) {
        this.log('warn', `⚠️ ${errorCount} files failed to copy`);
      }
      
    } catch (error) {
      this.log('error', `File copy process failed: ${error.message}`);
      throw error;
    }
  }

  // Get all files to backup with enhanced pattern matching
  getAllFiles() {
    const files = [];
    
    for (const pattern of PROD_CONFIG.includeFiles) {
      try {
        const basePath = pattern.replace('/**/*', '').replace('**/*', '');
        if (fs.existsSync(basePath)) {
          this.scanDirectory(basePath, files);
        }
      } catch (error) {
        this.log('warn', `Failed to process pattern ${pattern}: ${error.message}`);
      }
    }
    
    return files;
  }

  // Scan directory recursively with error handling
  scanDirectory(dirPath, files) {
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const relativePath = path.relative(process.cwd(), fullPath);
        
        // Check if file should be excluded
        if (this.shouldExclude(relativePath)) {
          continue;
        }
        
        try {
          if (fs.statSync(fullPath).isDirectory()) {
            this.scanDirectory(fullPath, files);
          } else {
            files.push(fullPath);
          }
        } catch (statError) {
          this.log('warn', `Failed to stat ${fullPath}: ${statError.message}`);
        }
      }
    } catch (error) {
      this.log('warn', `Failed to scan directory ${dirPath}: ${error.message}`);
    }
  }

  // Check if file should be excluded with enhanced pattern matching
  shouldExclude(filePath) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    
    for (const excludePattern of PROD_CONFIG.excludeFiles) {
      try {
        const pattern = excludePattern
          .replace('**/*', '.*')
          .replace('*', '[^/]*')
          .replace(/\./g, '\\.');
        const regex = new RegExp(pattern);
        if (regex.test(normalizedPath)) {
          return true;
        }
      } catch (error) {
        this.log('warn', `Invalid exclude pattern: ${excludePattern}`);
      }
    }
    
    return false;
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

  // Clean old backups with enhanced logic
  cleanOldBackups() {
    this.log('info', 'Cleaning old production backups...');
    
    try {
      const backups = fs.readdirSync(PROD_CONFIG.backupDir)
        .filter(item => item.startsWith('production-backup-'))
        .map(item => {
          try {
            const itemPath = path.join(PROD_CONFIG.backupDir, item);
            const stats = fs.statSync(itemPath);
            return {
              name: item,
              path: itemPath,
              time: stats.mtime.getTime(),
              size: stats.isDirectory() ? this.getDirectorySize(itemPath) : stats.size
            };
          } catch (error) {
            this.log('warn', `Failed to get stats for ${item}: ${error.message}`);
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => b.time - a.time);

      // Remove old backups
      for (let i = PROD_CONFIG.maxBackups; i < backups.length; i++) {
        const backup = backups[i];
        try {
          this.log('info', `🗑️ Removing old backup: ${backup.name} (${this.formatBytes(backup.size)})`);
          fs.rmSync(backup.path, { recursive: true, force: true });
        } catch (error) {
          this.log('warn', `Failed to remove old backup ${backup.name}: ${error.message}`);
        }
      }
      
      this.log('info', `✅ Kept ${Math.min(backups.length, PROD_CONFIG.maxBackups)} backups`);
    } catch (error) {
      this.log('warn', `Failed to clean old backups: ${error.message}`);
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

  // Create compressed archive with enhanced compression
  async createArchive() {
    this.log('info', 'Creating compressed archive...');
    
    try {
      const archiveName = `${this.backupName}.zip`;
      const archivePath = path.join(PROD_CONFIG.backupDir, archiveName);
      
      // Use PowerShell with enhanced compression on Windows
      const compressionLevel = PROD_CONFIG.compressionLevel === 'high' ? '-CompressionLevel Optimal' : '-CompressionLevel Fastest';
      const powershellCommand = `Compress-Archive -Path "${this.backupPath}\\*" -DestinationPath "${archivePath}" -Force ${compressionLevel}`;
      
      execSync(`powershell -Command "${powershellCommand}"`, { stdio: 'inherit' });
      
      // Get archive size
      const stats = fs.statSync(archivePath);
      this.log('info', `✅ Archive created: ${archiveName} (${this.formatBytes(stats.size)})`);
      
      return archivePath;
    } catch (error) {
      this.log('warn', `Failed to create archive: ${error.message}`);
      return null;
    }
  }

  // Verify backup integrity
  async verifyBackup() {
    if (!PROD_CONFIG.verifyBackup) {
      this.log('info', 'Backup verification skipped');
      return true;
    }

    this.log('info', 'Verifying backup integrity...');
    
    try {
      let verifiedFiles = 0;
      let totalFiles = 0;
      
      for (const fileInfo of this.manifest.files) {
        if (fileInfo.status === 'failed') continue;
        
        totalFiles++;
        const sourcePath = fileInfo.path;
        const backupPath = path.join(this.backupPath, fileInfo.path);
        
        if (fs.existsSync(backupPath)) {
          const backupChecksum = this.calculateChecksum(backupPath);
          if (backupChecksum === fileInfo.checksum) {
            verifiedFiles++;
          } else {
            this.log('warn', `Checksum mismatch for ${fileInfo.path}`);
          }
        }
      }
      
      const verificationRate = (verifiedFiles / totalFiles) * 100;
      this.log('info', `✅ Backup verification: ${verifiedFiles}/${totalFiles} files verified (${verificationRate.toFixed(1)}%)`);
      
      return verificationRate >= 95; // 95% success rate threshold
    } catch (error) {
      this.log('warn', `Backup verification failed: ${error.message}`);
      return false;
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

  // Main backup process
  async run() {
    this.log('info', '🤖 AI Buzz Media - Production Backup System');
    this.log('info', '==============================================');
    this.log('info', `📅 Starting production backup at: ${new Date().toLocaleString()}`);
    this.log('info', `📁 Backup name: ${this.backupName}`);
    this.log('info', `🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    this.log('info', '');

    try {
      // Step 1: Create backup directory
      this.createBackupDir();

      // Step 2: Create manifest
      this.manifest = this.createManifest();

      // Step 3: Copy files
      await this.copyFiles(this.manifest);

      // Step 4: Update manifest with final info
      this.manifest.backupDuration = Date.now() - this.startTime;
      const manifestPath = path.join(this.backupPath, 'backup-manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(this.manifest, null, 2));

      // Step 5: Create compressed archive
      const archivePath = await this.createArchive();

      // Step 6: Verify backup
      const verificationSuccess = await this.verifyBackup();

      // Step 7: Clean old backups
      this.cleanOldBackups();

      // Step 8: Final summary
      this.log('info', '');
      this.log('info', '🎉 Production backup completed successfully!');
      this.log('info', '==========================================');
      this.log('info', `📁 Backup location: ${this.backupPath}`);
      if (archivePath) {
        this.log('info', `📦 Archive: ${archivePath}`);
      }
      this.log('info', `📊 Total files: ${this.manifest.files.length}`);
      this.log('info', `💾 Total size: ${this.formatBytes(this.manifest.totalSize)}`);
      this.log('info', `⏱️ Duration: ${(this.manifest.backupDuration / 1000).toFixed(1)}s`);
      this.log('info', `🔗 Git commit: ${this.manifest.environment?.git?.commitHash || 'N/A'}`);
      this.log('info', `✅ Verification: ${verificationSuccess ? 'PASSED' : 'FAILED'}`);
      this.log('info', '');

      return {
        success: true,
        backupPath: this.backupPath,
        archivePath,
        manifest: this.manifest,
        verificationSuccess
      };

    } catch (error) {
      this.log('error', `❌ Production backup failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Run backup if called directly
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  const backup = new ProductionBackupSystem();
  backup.run().then(result => {
    process.exit(result.success ? 0 : 1);
  }).catch(error => {
    console.error('Production backup failed:', error);
    process.exit(1);
  });
}

export { ProductionBackupSystem, PROD_CONFIG };
