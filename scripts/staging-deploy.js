#!/usr/bin/env node

/**
 * AI Buzz Media - Staging Deployment Script
 * 
 * This script helps you safely deploy to staging for testing
 * before going to production. It ensures zero risk to live visitors.
 * 
 * Usage:
 * - Deploy to staging: node scripts/staging-deploy.js
 * - Deploy with custom branch: node scripts/staging-deploy.js --branch=feature/new-header
 * - Deploy with environment: node scripts/staging-deploy.js --env=staging
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StagingDeployment {
  constructor() {
    this.stagingUrl = process.env.STAGING_URL || 'https://your-staging-site.netlify.app';
    this.productionUrl = process.env.PRODUCTION_URL || 'https://your-production-site.com';
    this.stagingSiteId = process.env.STAGING_SITE_ID || 'your-staging-site-id';
    this.branch = this.getBranch();
    this.environment = process.env.NODE_ENV || 'staging';
  }

  // Get current git branch
  getBranch() {
    try {
      return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    } catch (error) {
      console.log('⚠️ Could not determine git branch, using current');
      return 'current';
    }
  }

  // Parse command line arguments
  parseArgs() {
    const args = process.argv.slice(2);
    for (const arg of args) {
      if (arg.startsWith('--branch=')) {
        this.branch = arg.split('=')[1];
      } else if (arg.startsWith('--env=')) {
        this.environment = arg.split('=')[1];
      }
    }
  }

  // Show deployment info
  showInfo() {
    console.log('🚀 AI Buzz Media - Staging Deployment');
    console.log('======================================');
    console.log('');
    console.log(`📁 Branch: ${this.branch}`);
    console.log(`🔧 Environment: ${this.environment}`);
    console.log(`🌐 Staging URL: ${this.stagingUrl}`);
    console.log(`🌐 Production URL: ${this.productionUrl}`);
    console.log('');
    console.log('⚠️  IMPORTANT: This will deploy to STAGING only');
    console.log('   Your live production site will NOT be affected');
    console.log('');
  }

  // Check prerequisites
  checkPrerequisites() {
    console.log('🔍 Checking prerequisites...');
    
    // Check if we're in a git repository
    if (!fs.existsSync('.git')) {
      throw new Error('❌ Not in a git repository. Please run this from your project root.');
    }

    // Check if Netlify CLI is installed
    try {
      execSync('netlify --version', { stdio: 'ignore' });
      console.log('✅ Netlify CLI installed');
    } catch (error) {
      throw new Error('❌ Netlify CLI not found. Please install with: npm install -g netlify-cli');
    }

    // Check if we have uncommitted changes
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
      if (status) {
        console.log('⚠️  Warning: You have uncommitted changes');
        console.log('   Consider committing or stashing them first');
        console.log('');
      } else {
        console.log('✅ No uncommitted changes');
      }
    } catch (error) {
      console.log('⚠️  Could not check git status');
    }

    console.log('✅ Prerequisites check completed');
    console.log('');
  }

  // Build the project
  async buildProject() {
    console.log('🔨 Building project...');
    
    try {
      // Install dependencies if needed
      if (!fs.existsSync('node_modules')) {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
      }

      // Build the project
      console.log('🏗️  Building with Astro...');
      execSync('npm run build', { stdio: 'inherit' });
      
      console.log('✅ Build completed successfully');
      console.log('');
    } catch (error) {
      throw new Error(`❌ Build failed: ${error.message}`);
    }
  }

  // Deploy to staging
  async deployToStaging() {
    console.log('🚀 Deploying to staging...');
    
    try {
      const deployCommand = `netlify deploy --dir=dist --site=${this.stagingSiteId} --prod`;
      console.log(`📡 Running: ${deployCommand}`);
      
      execSync(deployCommand, { stdio: 'inherit' });
      
      console.log('✅ Staging deployment completed!');
      console.log('');
    } catch (error) {
      throw new Error(`❌ Staging deployment failed: ${error.message}`);
    }
  }

  // Test staging deployment
  async testStaging() {
    console.log('🧪 Testing staging deployment...');
    
    try {
      // Wait a moment for deployment to settle
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      console.log(`🔍 Testing staging site: ${this.stagingUrl}`);
      
      // Basic health check
      try {
        const response = execSync(`curl -I ${this.stagingUrl}`, { encoding: 'utf8' });
        if (response.includes('200 OK')) {
          console.log('✅ Staging site is responding');
        } else {
          console.log('⚠️  Staging site response unclear');
        }
      } catch (error) {
        console.log('⚠️  Could not test staging site response');
      }
      
      console.log('');
      console.log('🎯 Manual Testing Checklist:');
      console.log('   • Visit the staging site');
      console.log('   • Test all major functionality');
      console.log('   • Check on different devices');
      console.log('   • Verify integrations work');
      console.log('   • Test performance');
      console.log('');
      
    } catch (error) {
      console.log(`⚠️  Testing incomplete: ${error.message}`);
    }
  }

  // Show next steps
  showNextSteps() {
    console.log('📋 Next Steps:');
    console.log('==============');
    console.log('');
    console.log('1. 🧪 Test your staging site thoroughly');
    console.log(`   URL: ${this.stagingUrl}`);
    console.log('');
    console.log('2. ✅ Verify everything works as expected');
    console.log('   • All pages load correctly');
    console.log('   • Forms and interactions work');
    console.log('   • Mobile responsiveness');
    console.log('   • Performance is good');
    console.log('');
    console.log('3. 🚀 When ready for production:');
    console.log('   git push origin main');
    console.log('   netlify deploy --prod');
    console.log('');
    console.log('4. 🔄 If issues found:');
    console.log('   • Fix the problems');
    console.log('   • Test again in staging');
    console.log('   • Only deploy to production when satisfied');
    console.log('');
    console.log('🎉 Your live production site is safe!');
    console.log('');
  }

  // Main deployment process
  async run() {
    try {
      // Parse arguments
      this.parseArgs();
      
      // Show deployment info
      this.showInfo();
      
      // Check prerequisites
      this.checkPrerequisites();
      
      // Build project
      await this.buildProject();
      
      // Deploy to staging
      await this.deployToStaging();
      
      // Test staging
      await this.testStaging();
      
      // Show next steps
      this.showNextSteps();
      
      return { success: true };
      
    } catch (error) {
      console.error(`❌ Staging deployment failed: ${error.message}`);
      console.log('');
      console.log('🛠️  Troubleshooting:');
      console.log('   • Check your internet connection');
      console.log('   • Verify Netlify credentials');
      console.log('   • Ensure build completes successfully');
      console.log('   • Check staging site ID is correct');
      console.log('');
      return { success: false, error: error.message };
    }
  }
}

// Run deployment if called directly
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  const deployment = new StagingDeployment();
  deployment.run().then(result => {
    process.exit(result.success ? 0 : 1);
  }).catch(error => {
    console.error('Staging deployment failed:', error);
    process.exit(1);
  });
}

export { StagingDeployment };
