/**
 * Hero Migration Test Script
 * Validates the migration components and setup
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Hero Migration Setup...\n');

// Test 1: Check if new hero component exists
const heroRedesignedPath = path.join(__dirname, 'src/components/HeroRedesigned.astro');
if (fs.existsSync(heroRedesignedPath)) {
  console.log('✅ HeroRedesigned.astro component exists');
} else {
  console.log('❌ HeroRedesigned.astro component missing');
}

// Test 2: Check if toggle component exists
const heroTogglePath = path.join(__dirname, 'src/components/HeroToggle.astro');
if (fs.existsSync(heroTogglePath)) {
  console.log('✅ HeroToggle.astro component exists');
} else {
  console.log('❌ HeroToggle.astro component missing');
}

// Test 3: Check if test page exists
const testPagePath = path.join(__dirname, 'src/pages/hero-test.astro');
if (fs.existsSync(testPagePath)) {
  console.log('✅ hero-test.astro test page exists');
} else {
  console.log('❌ hero-test.astro test page missing');
}

// Test 4: Check if homepage was updated
const homepagePath = path.join(__dirname, 'src/pages/index.astro');
if (fs.existsSync(homepagePath)) {
  const homepageContent = fs.readFileSync(homepagePath, 'utf8');
  if (homepageContent.includes('HeroToggle')) {
    console.log('✅ Homepage updated to use HeroToggle');
  } else {
    console.log('❌ Homepage not updated to use HeroToggle');
  }
} else {
  console.log('❌ Homepage file missing');
}

// Test 5: Check if migration guide exists
const guidePath = path.join(__dirname, 'HERO_MIGRATION_GUIDE.md');
if (fs.existsSync(guidePath)) {
  console.log('✅ Migration guide exists');
} else {
  console.log('❌ Migration guide missing');
}

console.log('\n🎯 Migration Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Visit http://localhost:4321/hero-test to test the new hero');
console.log('2. Add PUBLIC_USE_NEW_HERO=true to your .env file to enable on homepage');
console.log('3. Visit http://localhost:4321/ to see the new hero in action');
console.log('4. Set PUBLIC_USE_NEW_HERO=false to rollback if needed');
console.log('\n📖 See HERO_MIGRATION_GUIDE.md for detailed instructions');
