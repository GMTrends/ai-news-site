#!/usr/bin/env node

/**
 * AI Buzz Media - Automated Backup System
 * 
 * This script creates automated backups of your website including:
 * - Content files (articles, authors, categories)
 * - Configuration files
 * - Build outputs
 * - Database dumps (if applicable)
 * 
 * Usage:
 * - Manual: node backup-system.js
 * - Automated: Add to cron job or GitHub Actions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  backupDir: './backups',
  maxBackups: 5, // Keep last 5 backups
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
    'astro.config.mjs',
    'package.json',
    'package-lock.json',
    'netlify.toml',
    'tsconfig.json',
    'env.example',
    'README.md',
    'DEPLOYMENT_GUIDE.md',
    'TESTING_CHECKLIST.md'
  ],
  excludeFiles: [
    'node_modules/**/*',
    'dist/**/*',
    '.astro/**/*',
    '.netlify/**/*',
    'backups/**/*',
    '*.log',
    '.env*',
    '.DS_Store',
    'Thumbs.db'
  ]
};

class BackupSystem {
  constructor() {
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupName = `backup-${this.timestamp}`;
    this.backupPath = path.join(CONFIG.backupDir, this.backupName);
  }

  // Create backup directory
  createBackupDir() {
    console.log('📁 Creating backup directory...');
    if (!fs.existsSync(CONFIG.backupDir)) {
      fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    }
    fs.mkdirSync(this.backupPath, { recursive: true });
    console.log(`✅ Backup directory created: ${this.backupPath}`);
  }

  // Get Git status and commit hash
  getGitInfo() {
    try {
      const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
      
      return {
        commitHash,
        branch,
        hasUncommittedChanges: status.length > 0,
        status
      };
    } catch (error) {
      console.warn('⚠️ Git information not available');
      return null;
    }
  }

  // Create backup manifest
  createManifest() {
    const manifest = {
      timestamp: this.timestamp,
      backupName: this.backupName,
      git: this.getGitInfo(),
      files: [],
      totalSize: 0,
      checksum: null
    };

    // Save manifest
    const manifestPath = path.join(this.backupPath, 'backup-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    return manifest;
  }

  // Copy files with progress tracking
  async copyFiles(manifest) {
    console.log('📋 Copying files...');
    let totalSize = 0;
    let fileCount = 0;

    // Get all files to copy
    const filesToCopy = this.getAllFiles();
    
    for (const filePath of filesToCopy) {
      try {
        const relativePath = path.relative(process.cwd(), filePath);
        const destPath = path.join(this.backupPath, relativePath);
        
        // Create destination directory if needed
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // Copy file
        fs.copyFileSync(filePath, destPath);
        
        // Get file info
        const stats = fs.statSync(filePath);
        
        manifest.files.push({
          path: relativePath,
          size: stats.size,
          modified: stats.mtime.toISOString(),
          // checksum: this.calculateChecksum(filePath) // Skipped for speed
        });
        
        totalSize += stats.size;
        fileCount++;
        
        if (fileCount % 10 === 0) {
          console.log(`📋 Copied ${fileCount} files...`);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to copy ${filePath}: ${error.message}`);
      }
    }

    manifest.totalSize = totalSize;
    
    console.log(`✅ Copied ${fileCount} files (${this.formatBytes(totalSize)})`);
  }

  // Get all files to backup
  getAllFiles() {
    const files = [];
    
    for (const pattern of CONFIG.includeFiles) {
      const basePath = pattern.replace('/**/*', '').replace('**/*', '');
      if (fs.existsSync(basePath)) {
        this.scanDirectory(basePath, files);
      }
    }
    
    return files;
  }

  // Scan directory recursively
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
        
        if (fs.statSync(fullPath).isDirectory()) {
          this.scanDirectory(fullPath, files);
        } else {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️ Failed to scan directory ${dirPath}: ${error.message}`);
    }
  }

  // Check if file should be excluded
  shouldExclude(filePath) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    
    for (const excludePattern of CONFIG.excludeFiles) {
      const pattern = excludePattern.replace('**/*', '.*').replace('*', '[^/]*');
      const regex = new RegExp(pattern);
      if (regex.test(normalizedPath)) {
        return true;
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

  // Clean old backups
  cleanOldBackups() {
    console.log('🧹 Cleaning old backups...');
    
    try {
      const backups = fs.readdirSync(CONFIG.backupDir)
        .filter(item => item.startsWith('backup-'))
        .map(item => ({
          name: item,
          path: path.join(CONFIG.backupDir, item),
          time: fs.statSync(path.join(CONFIG.backupDir, item)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time);

      // Remove old backups
      for (let i = CONFIG.maxBackups; i < backups.length; i++) {
        const backup = backups[i];
        console.log(`🗑️ Removing old backup: ${backup.name}`);
        fs.rmSync(backup.path, { recursive: true, force: true });
      }
      
      console.log(`✅ Kept ${Math.min(backups.length, CONFIG.maxBackups)} backups`);
    } catch (error) {
      console.warn(`⚠️ Failed to clean old backups: ${error.message}`);
    }
  }

  // Create compressed archive (Windows compatible)
  async createArchive() {
    console.log('📦 Creating compressed archive...');
    
    try {
      const archiveName = `${this.backupName}.zip`;
      const archivePath = path.join(CONFIG.backupDir, archiveName);
      
      // Use PowerShell to create ZIP archive on Windows
      const powershellCommand = `Compress-Archive -Path "${this.backupPath}\\*" -DestinationPath "${archivePath}" -Force`;
      execSync(`powershell -Command "${powershellCommand}"`, { stdio: 'inherit' });
      
      // Get archive size
      const stats = fs.statSync(archivePath);
      console.log(`✅ Archive created: ${archiveName} (${this.formatBytes(stats.size)})`);
      
      return archivePath;
    } catch (error) {
      console.warn(`⚠️ Failed to create archive: ${error.message}`);
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

  // Main backup process
  async run() {
    console.log('🤖 AI Buzz Media - Automated Backup System');
    console.log('==========================================');
    console.log(`📅 Starting backup at: ${new Date().toLocaleString()}`);
    console.log(`📁 Backup name: ${this.backupName}`);
    console.log('');

    try {
      console.log('Step 1: Create backup directory');
      this.createBackupDir();

      console.log('Step 2: Create manifest');
      const manifest = this.createManifest();

      console.log('Step 3: Copy files');
      await this.copyFiles(manifest);
      console.log('Step 3 complete: Files copied');

      // Step 4: Update manifest with final info
      // manifest.checksum = this.calculateChecksum(this.backupPath); // Skipped for speed
      const manifestPath = path.join(this.backupPath, 'backup-manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

      console.log('Step 5: Create compressed archive');
      const archivePath = await this.createArchive();
      console.log('Step 5 complete: Archive created');

      console.log('Step 6: Clean old backups');
      this.cleanOldBackups();
      console.log('Step 6 complete: Old backups cleaned');

      // Step 7: Final summary
      console.log('');
      console.log('🎉 Backup completed successfully!');
      console.log('================================');
      console.log(`📁 Backup location: ${this.backupPath}`);
      if (archivePath) {
        console.log(`📦 Archive: ${archivePath}`);
      }
      console.log(`📊 Total files: ${manifest.files.length}`);
      console.log(`💾 Total size: ${this.formatBytes(manifest.totalSize)}`);
      console.log(`🔗 Git commit: ${manifest.git?.commitHash || 'N/A'}`);
      console.log('');

      return {
        success: true,
        backupPath: this.backupPath,
        archivePath,
        manifest
      };

    } catch (error) {
      console.error('❌ Backup failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Run backup if called directly
if (require.main === module) {
  const backup = new BackupSystem();
  backup.run().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = { BackupSystem, CONFIG }; 