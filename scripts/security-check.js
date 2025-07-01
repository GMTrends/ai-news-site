#!/usr/bin/env node

/**
 * Security Check Script for AI Buzz Media
 * Runs automated security checks on the codebase
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Security check results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  checks: []
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const color = type === 'error' ? colors.red : 
                type === 'warning' ? colors.yellow : 
                type === 'success' ? colors.green : colors.blue;
  
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

function addResult(check, status, message, details = null) {
  const result = {
    check,
    status,
    message,
    details,
    timestamp: new Date().toISOString()
  };
  
  results.checks.push(result);
  
  if (status === 'PASS') {
    results.passed++;
    log(`✅ ${check}: ${message}`, 'success');
  } else if (status === 'FAIL') {
    results.failed++;
    log(`❌ ${check}: ${message}`, 'error');
  } else {
    results.warnings++;
    log(`⚠️  ${check}: ${message}`, 'warning');
  }
}

// Security checks
function checkEnvironmentVariables() {
  log('🔍 Checking environment variables...');
  
  const envFile = path.join(process.cwd(), '.env');
  const envExample = path.join(process.cwd(), 'env.example');
  
  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf8');
    
    // Check for hardcoded secrets
    const hardcodedSecrets = [
      /password\s*=\s*['"][^'"]+['"]/i,
      /secret\s*=\s*['"][^'"]+['"]/i,
      /token\s*=\s*['"][^'"]+['"]/i,
      /key\s*=\s*['"][^'"]+['"]/i
    ];
    
    let hasHardcodedSecrets = false;
    hardcodedSecrets.forEach(pattern => {
      if (pattern.test(envContent)) {
        hasHardcodedSecrets = true;
      }
    });
    
    if (hasHardcodedSecrets) {
      addResult('Environment Variables', 'FAIL', 'Hardcoded secrets found in .env file');
    } else {
      addResult('Environment Variables', 'PASS', 'No hardcoded secrets found');
    }
  } else {
    addResult('Environment Variables', 'WARN', '.env file not found - using defaults');
  }
}

function checkDependencies() {
  log('🔍 Checking npm dependencies...');
  
  try {
    const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
    const audit = JSON.parse(auditResult);
    
    if (audit.metadata.vulnerabilities.total > 0) {
      addResult('Dependencies', 'FAIL', 
        `${audit.metadata.vulnerabilities.total} vulnerabilities found in dependencies`);
    } else {
      addResult('Dependencies', 'PASS', 'No vulnerabilities found in dependencies');
    }
  } catch (error) {
    addResult('Dependencies', 'WARN', 'Could not run npm audit - check manually');
  }
}

function checkSecurityHeaders() {
  log('🔍 Checking security headers configuration...');
  
  const netlifyConfig = path.join(process.cwd(), 'netlify.toml');
  
  if (fs.existsSync(netlifyConfig)) {
    const config = fs.readFileSync(netlifyConfig, 'utf8');
    
    const requiredHeaders = [
      'X-Frame-Options',
      'X-XSS-Protection',
      'X-Content-Type-Options',
      'Referrer-Policy',
      'Content-Security-Policy'
    ];
    
    let missingHeaders = [];
    requiredHeaders.forEach(header => {
      if (!config.includes(header)) {
        missingHeaders.push(header);
      }
    });
    
    if (missingHeaders.length > 0) {
      addResult('Security Headers', 'FAIL', 
        `Missing security headers: ${missingHeaders.join(', ')}`);
    } else {
      addResult('Security Headers', 'PASS', 'All required security headers configured');
    }
  } else {
    addResult('Security Headers', 'FAIL', 'netlify.toml not found');
  }
}

function checkSensitiveFiles() {
  log('🔍 Checking for sensitive files...');
  
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    'package-lock.json',
    'yarn.lock',
    'node_modules'
  ];
  
  const gitignore = path.join(process.cwd(), '.gitignore');
  
  if (fs.existsSync(gitignore)) {
    const gitignoreContent = fs.readFileSync(gitignore, 'utf8');
    
    let unprotectedFiles = [];
    sensitiveFiles.forEach(file => {
      if (!gitignoreContent.includes(file)) {
        unprotectedFiles.push(file);
      }
    });
    
    if (unprotectedFiles.length > 0) {
      addResult('Sensitive Files', 'WARN', 
        `Files not in .gitignore: ${unprotectedFiles.join(', ')}`);
    } else {
      addResult('Sensitive Files', 'PASS', 'All sensitive files protected by .gitignore');
    }
  } else {
    addResult('Sensitive Files', 'FAIL', '.gitignore file not found');
  }
}

function checkCodeSecurity() {
  log('🔍 Checking code for security issues...');
  
  const srcDir = path.join(process.cwd(), 'src');
  
  if (fs.existsSync(srcDir)) {
    const files = getAllFiles(srcDir);
    
    let securityIssues = [];
    
    files.forEach(file => {
      if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.astro')) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for common security issues
        const issues = [
          { pattern: /eval\s*\(/, name: 'eval() usage' },
          { pattern: /innerHTML\s*=/, name: 'innerHTML assignment' },
          { pattern: /document\.write/, name: 'document.write usage' },
          { pattern: /localStorage\s*\[/, name: 'localStorage without validation' },
          { pattern: /sessionStorage\s*\[/, name: 'sessionStorage without validation' }
        ];
        
        issues.forEach(issue => {
          if (issue.pattern.test(content)) {
            securityIssues.push(`${file}: ${issue.name}`);
          }
        });
      }
    });
    
    if (securityIssues.length > 0) {
      addResult('Code Security', 'WARN', 
        `Potential security issues found: ${securityIssues.length} issues`);
      securityIssues.forEach(issue => {
        log(`  - ${issue}`, 'warning');
      });
    } else {
      addResult('Code Security', 'PASS', 'No obvious security issues found in code');
    }
  } else {
    addResult('Code Security', 'FAIL', 'src directory not found');
  }
}

function getAllFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else {
        files.push(fullPath);
      }
    });
  }
  
  traverse(dir);
  return files;
}

function checkSanityConfiguration() {
  log('🔍 Checking Sanity CMS configuration...');
  
  const sanityConfig = path.join(process.cwd(), 'sanity.config.ts');
  const sanityClient = path.join(process.cwd(), 'src/lib/sanity.ts');
  
  if (fs.existsSync(sanityConfig) && fs.existsSync(sanityClient)) {
    const configContent = fs.readFileSync(sanityConfig, 'utf8');
    const clientContent = fs.readFileSync(sanityClient, 'utf8');
    
    // Check if using environment variables
    const usesEnvVars = configContent.includes('process.env') || 
                       clientContent.includes('import.meta.env');
    
    if (usesEnvVars) {
      addResult('Sanity Configuration', 'PASS', 'Using environment variables for configuration');
    } else {
      addResult('Sanity Configuration', 'FAIL', 'Hardcoded configuration values found');
    }
  } else {
    addResult('Sanity Configuration', 'WARN', 'Sanity configuration files not found');
  }
}

function generateReport() {
  log('\n📊 SECURITY CHECK REPORT', 'info');
  log('='.repeat(50), 'info');
  
  log(`✅ Passed: ${results.passed}`, 'success');
  log(`❌ Failed: ${results.failed}`, 'error');
  log(`⚠️  Warnings: ${results.warnings}`, 'warning');
  
  const totalChecks = results.passed + results.failed + results.warnings;
  const score = totalChecks > 0 ? Math.round((results.passed / totalChecks) * 100) : 0;
  
  log(`\n🎯 Overall Security Score: ${score}/100`, score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error');
  
  if (results.failed > 0) {
    log('\n🚨 CRITICAL ISSUES TO FIX:', 'error');
    results.checks
      .filter(check => check.status === 'FAIL')
      .forEach(check => {
        log(`  - ${check.check}: ${check.message}`, 'error');
      });
  }
  
  if (results.warnings > 0) {
    log('\n⚠️  WARNINGS TO REVIEW:', 'warning');
    results.checks
      .filter(check => check.status === 'WARN')
      .forEach(check => {
        log(`  - ${check.check}: ${check.message}`, 'warning');
      });
  }
  
  // Save detailed report
  const reportPath = path.join(process.cwd(), 'security-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`, 'info');
  
  return results.failed === 0;
}

// Main execution
function main() {
  log('🔒 Starting Security Check for AI Buzz Media', 'info');
  log('='.repeat(50), 'info');
  
  try {
    checkEnvironmentVariables();
    checkDependencies();
    checkSecurityHeaders();
    checkSensitiveFiles();
    checkCodeSecurity();
    checkSanityConfiguration();
    
    const passed = generateReport();
    
    if (!passed) {
      log('\n❌ Security check failed - please fix critical issues', 'error');
      process.exit(1);
    } else {
      log('\n✅ Security check passed!', 'success');
    }
  } catch (error) {
    log(`❌ Security check failed with error: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Run if called directly
main(); 