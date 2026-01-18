#!/usr/bin/env node

/**
 * Performance Baseline Testing Script
 * This script measures current performance metrics before optimization
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Performance Baseline Assessment');
console.log('=====================================\n');

// 1. File Size Analysis
function analyzeFileSize(dirPath, extension) {
  const files = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item.isFile() && item.name.endsWith(extension)) {
        const stats = fs.statSync(fullPath);
        files.push({
          name: path.relative(dirPath, fullPath),
          size: stats.size
        });
      }
    }
  }
  
  scanDirectory(dirPath);
  return files.sort((a, b) => b.size - a.size);
}

// 2. CSS Analysis
console.log('📊 CSS Files Analysis:');
const cssFiles = analyzeFileSize('./src', '.css');
let totalCssSize = 0;

cssFiles.forEach(file => {
  totalCssSize += file.size;
  console.log(`  ${file.name}: ${(file.size / 1024).toFixed(2)} KB`);
});

console.log(`  Total CSS Size: ${(totalCssSize / 1024).toFixed(2)} KB\n`);

// 3. Component Analysis
console.log('🧩 Component Files Analysis:');
const astroFiles = analyzeFileSize('./src/components', '.astro');
let totalComponentSize = 0;

astroFiles.slice(0, 10).forEach(file => {
  totalComponentSize += file.size;
  console.log(`  ${file.name}: ${(file.size / 1024).toFixed(2)} KB`);
});

console.log(`  Total Top 10 Components: ${(totalComponentSize / 1024).toFixed(2)} KB\n`);

// 4. Animation Analysis (scan for potentially heavy animations)
console.log('🎨 Animation Analysis:');
function analyzeAnimations(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const animations = [];
    
    // Look for keyframes
    const keyframeMatches = content.match(/@keyframes\s+[\w-]+/g);
    if (keyframeMatches) {
      animations.push(...keyframeMatches.map(match => match.replace('@keyframes ', '')));
    }
    
    // Look for will-change properties
    const willChangeMatches = content.match(/will-change:\s*[^;]+/g);
    const willChangeCount = willChangeMatches ? willChangeMatches.length : 0;
    
    // Look for transform animations
    const transformMatches = content.match(/transform:\s*[^;]+/g);
    const transformCount = transformMatches ? transformMatches.length : 0;
    
    return {
      keyframes: animations.length,
      willChange: willChangeCount,
      transforms: transformCount,
      animations: animations
    };
  } catch (error) {
    return { keyframes: 0, willChange: 0, transforms: 0, animations: [] };
  }
}

let totalAnimations = { keyframes: 0, willChange: 0, transforms: 0 };
const allAnimations = [];

[...cssFiles, ...astroFiles].forEach(file => {
  const fullPath = path.join('./src', file.name);
  if (fs.existsSync(fullPath)) {
    const analysis = analyzeAnimations(fullPath);
    totalAnimations.keyframes += analysis.keyframes;
    totalAnimations.willChange += analysis.willChange;
    totalAnimations.transforms += analysis.transforms;
    allAnimations.push(...analysis.animations);
    
    if (analysis.keyframes > 0 || analysis.willChange > 3) {
      console.log(`  ${file.name}:`);
      console.log(`    Keyframes: ${analysis.keyframes}`);
      console.log(`    will-change: ${analysis.willChange}`);
      console.log(`    transforms: ${analysis.transforms}`);
      if (analysis.animations.length > 0) {
        console.log(`    Animations: ${analysis.animations.join(', ')}`);
      }
    }
  }
});

console.log(`\n  Total Animation Summary:`);
console.log(`    Keyframes: ${totalAnimations.keyframes}`);
console.log(`    will-change properties: ${totalAnimations.willChange}`);
console.log(`    transform properties: ${totalAnimations.transforms}`);

// 5. Performance Recommendations
console.log('\n🚀 Performance Optimization Targets:');

if (totalCssSize > 50 * 1024) {
  console.log('  ⚠️  HIGH PRIORITY: CSS size > 50KB - consolidation needed');
}

if (totalAnimations.willChange > 20) {
  console.log('  ⚠️  HIGH PRIORITY: Too many will-change properties (' + totalAnimations.willChange + ') - causing layer creation');
}

if (totalAnimations.keyframes > 10) {
  console.log('  ⚠️  MEDIUM PRIORITY: Many animations (' + totalAnimations.keyframes + ') - consider reducing');
}

if (allAnimations.includes('floatRandom') || allAnimations.includes('randomParticle')) {
  console.log('  ⚠️  HIGH PRIORITY: Complex particle/floating animations detected - CPU intensive');
}

// 6. Save baseline report
const report = {
  timestamp: new Date().toISOString(),
  cssSize: totalCssSize,
  componentSize: totalComponentSize,
  animations: totalAnimations,
  files: {
    css: cssFiles.length,
    components: astroFiles.length
  }
};

fs.writeFileSync('./performance-baseline-report.json', JSON.stringify(report, null, 2));

console.log('\n✅ Baseline report saved to performance-baseline-report.json');
console.log('📋 Next steps: Begin with CSS consolidation and animation optimization');
