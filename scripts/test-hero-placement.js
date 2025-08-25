#!/usr/bin/env node

/**
 * Test script for heroPlacement filtering
 * Run with: node scripts/test-hero-placement.js
 */

import { createClient } from '@sanity/client';

// Create Sanity client (you'll need to set environment variables)
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'crtekmb2',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Use false for testing to get fresh data
  apiVersion: '2024-01-01',
});

async function testHeroPlacement() {
  console.log('🧪 Testing Hero Placement Filtering...\n');

  try {
    // Test 1: Get articles with 'large' placement
    console.log('📊 Testing Large Placement Articles:');
    const largeArticles = await client.fetch(`*[_type == "article" && 
      (status == "published" || (status == "scheduled" && publishedAt <= now())) &&
      heroPlacement == "large"
    ] | order(publishedAt desc) [0...3] {
      title,
      heroPlacement,
      status,
      publishedAt,
      "category": category->displayName
    }`);
    
    if (largeArticles.length > 0) {
      largeArticles.forEach((article, index) => {
        console.log(`  ${index + 1}. ${article.title}`);
        console.log(`     Category: ${article.category || 'N/A'}`);
        console.log(`     Status: ${article.status}`);
        console.log(`     Published: ${article.publishedAt || 'N/A'}\n`);
      });
    } else {
      console.log('  ❌ No articles found with "large" placement\n');
    }

    // Test 2: Get articles with 'small' placement
    console.log('📰 Testing Small Placement Articles:');
    const smallArticles = await client.fetch(`*[_type == "article" && 
      (status == "published" || (status == "scheduled" && publishedAt <= now())) &&
      heroPlacement == "small"
    ] | order(publishedAt desc) [0...5] {
      title,
      heroPlacement,
      status,
      publishedAt,
      "category": category->displayName
    }`);
    
    if (smallArticles.length > 0) {
      smallArticles.forEach((article, index) => {
        console.log(`  ${index + 1}. ${article.title}`);
        console.log(`     Category: ${article.category || 'N/A'}`);
        console.log(`     Status: ${article.status}`);
        console.log(`     Published: ${article.publishedAt || 'N/A'}\n`);
      });
    } else {
      console.log('  ❌ No articles found with "small" placement\n');
    }

    // Test 3: Get articles with no placement set
    console.log('❓ Testing Articles with No Placement Set:');
    const noPlacementArticles = await client.fetch(`*[_type == "article" && 
      (status == "published" || (status == "scheduled" && publishedAt <= now())) &&
      (!heroPlacement || heroPlacement == "none")
    ] | order(publishedAt desc) [0...3] {
      title,
      heroPlacement,
      status,
      publishedAt,
      "category": category->displayName
    }`);
    
    if (noPlacementArticles.length > 0) {
      noPlacementArticles.forEach((article, index) => {
        console.log(`  ${index + 1}. ${article.title}`);
        console.log(`     Category: ${article.category || 'N/A'}`);
        console.log(`     Status: ${article.status}`);
        console.log(`     Published: ${article.publishedAt || 'N/A'}\n`);
      });
    } else {
      console.log('  ❌ No articles found without placement\n');
    }

    // Test 4: Summary
    console.log('📈 Summary:');
    console.log(`  Large placement articles: ${largeArticles.length}`);
    console.log(`  Small placement articles: ${smallArticles.length}`);
    console.log(`  No placement articles: ${noPlacementArticles.length}`);
    
    if (largeArticles.length === 0 && smallArticles.length === 0) {
      console.log('\n⚠️  No articles have heroPlacement set!');
      console.log('   You need to go to Sanity CMS and set heroPlacement for your articles:');
      console.log('   - Set to "large" for main featured stories');
      console.log('   - Set to "small" for sidebar articles');
      console.log('   - Set to "none" to exclude from hero section');
    }

  } catch (error) {
    console.error('❌ Error testing hero placement:', error);
  }
}

// Run the test
testHeroPlacement();
