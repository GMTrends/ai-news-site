/**
 * AI Buzz Media - Backup Configuration
 * 
 * Environment-specific backup configurations
 * Override these values with environment variables
 */

export const BACKUP_CONFIG = {
  // Development Environment
  development: {
    backupDir: './dev-backups',
    maxBackups: 3,
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
      'sanity.config.ts'
    ],
    excludeFiles: [
      'node_modules/**/*',
      'dist/**/*',
      '.astro/**/*',
      '.netlify/**/*',
      'dev-backups/**/*',
      'backups/**/*',
      'production-backups/**/*',
      '*.log',
      '.env*',
      '.DS_Store',
      'Thumbs.db',
      'temp-backup*/**/*',
      'extracted-backup/**/*'
    ],
    includeDatabase: false,
    includeBuildArtifacts: false,
    compressionLevel: 'low',
    verifyBackup: false,
    logLevel: 'debug'
  },

  // Staging Environment
  staging: {
    backupDir: './staging-backups',
    maxBackups: 5,
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
      'dist/**/*'
    ],
    excludeFiles: [
      'node_modules/**/*',
      '.astro/**/*',
      '.netlify/**/*',
      'staging-backups/**/*',
      'backups/**/*',
      'production-backups/**/*',
      'dev-backups/**/*',
      '*.log',
      '.env*',
      '.DS_Store',
      'Thumbs.db',
      'temp-backup*/**/*',
      'extracted-backup/**/*'
    ],
    includeDatabase: true,
    includeBuildArtifacts: true,
    compressionLevel: 'medium',
    verifyBackup: true,
    logLevel: 'info'
  },

  // Production Environment
  production: {
    backupDir: './production-backups',
    maxBackups: 10,
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
      'dist/**/*',
      'build/**/*'
    ],
    excludeFiles: [
      'node_modules/**/*',
      '.astro/**/*',
      '.netlify/**/*',
      'production-backups/**/*',
      'backups/**/*',
      'staging-backups/**/*',
      'dev-backups/**/*',
      '*.log',
      '.env*',
      '.DS_Store',
      'Thumbs.db',
      'temp-backup*/**/*',
      'extracted-backup/**/*'
    ],
    includeDatabase: true,
    includeBuildArtifacts: true,
    compressionLevel: 'high',
    verifyBackup: true,
    logLevel: 'info'
  }
};

// Get configuration based on environment
export function getBackupConfig(environment = process.env.NODE_ENV || 'development') {
  const config = BACKUP_CONFIG[environment] || BACKUP_CONFIG.development;
  
  // Override with environment variables
  return {
    ...config,
    backupDir: process.env.BACKUP_DIR || config.backupDir,
    maxBackups: parseInt(process.env.MAX_BACKUPS) || config.maxBackups,
    compressionLevel: process.env.COMPRESSION_LEVEL || config.compressionLevel,
    verifyBackup: process.env.VERIFY_BACKUP !== 'false' && config.verifyBackup,
    logLevel: process.env.LOG_LEVEL || config.logLevel,
    includeDatabase: process.env.INCLUDE_DATABASE !== 'false' && config.includeDatabase,
    includeBuildArtifacts: process.env.INCLUDE_BUILD_ARTIFACTS !== 'false' && config.includeBuildArtifacts
  };
}

// Environment-specific backup schedules
export const BACKUP_SCHEDULES = {
  development: {
    // No automatic backups in development
    cron: null,
    description: 'Manual backups only'
  },
  staging: {
    // Weekly backups for staging
    cron: '0 2 * * 0', // Sundays at 2 AM UTC
    description: 'Weekly backups on Sundays'
  },
  production: {
    // Daily backups for production
    cron: '0 2 * * *', // Daily at 2 AM UTC
    description: 'Daily backups at 2 AM UTC'
  }
};

// Backup retention policies
export const RETENTION_POLICIES = {
  development: {
    maxBackups: 3,
    maxAge: '7 days',
    description: 'Keep 3 backups, max 7 days old'
  },
  staging: {
    maxBackups: 5,
    maxAge: '30 days',
    description: 'Keep 5 backups, max 30 days old'
  },
  production: {
    maxBackups: 10,
    maxAge: '90 days',
    description: 'Keep 10 backups, max 90 days old'
  }
};

// Notification settings
export const NOTIFICATION_CONFIG = {
  slack: {
    enabled: process.env.SLACK_WEBHOOK_URL ? true : false,
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
    channel: process.env.SLACK_CHANNEL || '#backups'
  },
  discord: {
    enabled: process.env.DISCORD_WEBHOOK_URL ? true : false,
    webhookUrl: process.env.DISCORD_WEBHOOK_URL
  },
  email: {
    enabled: process.env.EMAIL_SMTP_HOST ? true : false,
    smtp: {
      host: process.env.EMAIL_SMTP_HOST,
      port: parseInt(process.env.EMAIL_SMTP_PORT) || 587,
      secure: process.env.EMAIL_SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS
      }
    },
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM
  }
};

// Database backup configuration
export const DATABASE_CONFIG = {
  sanity: {
    enabled: true,
    dataset: process.env.SANITY_DATASET || 'production',
    projectId: process.env.SANITY_PROJECT_ID,
    token: process.env.SANITY_TOKEN,
    exportFormat: 'json', // json, ndjson, csv
    includeAssets: true,
    includeDocuments: true
  }
};

// Cloud storage configuration
export const CLOUD_STORAGE_CONFIG = {
  aws: {
    enabled: process.env.AWS_ACCESS_KEY_ID ? true : false,
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  google: {
    enabled: process.env.GOOGLE_APPLICATION_CREDENTIALS ? true : false,
    bucket: process.env.GOOGLE_STORAGE_BUCKET,
    projectId: process.env.GOOGLE_CLOUD_PROJECT
  },
  azure: {
    enabled: process.env.AZURE_STORAGE_ACCOUNT ? true : false,
    accountName: process.env.AZURE_STORAGE_ACCOUNT,
    accountKey: process.env.AZURE_STORAGE_KEY,
    container: process.env.AZURE_STORAGE_CONTAINER
  }
};

export default {
  BACKUP_CONFIG,
  getBackupConfig,
  BACKUP_SCHEDULES,
  RETENTION_POLICIES,
  NOTIFICATION_CONFIG,
  DATABASE_CONFIG,
  CLOUD_STORAGE_CONFIG
};
