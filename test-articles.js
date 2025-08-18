import { sanityClient } from './src/lib/sanity.ts';

async function testArticles() {
  try {
    console.log('🔍 Testing article availability...');
    
    // Get all articles with their categories
    const allArticles = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || (status == "scheduled" && publishedAt <= now()))
      ] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        "category": category->{name, "slug": slug.current}
      }
    `);
    
    console.log(`📊 Total articles found: ${allArticles.length}`);
    
    // Group by category
    const byCategory = {};
    allArticles.forEach(article => {
      const categorySlug = article.category?.slug || 'no-category';
      if (!byCategory[categorySlug]) {
        byCategory[categorySlug] = [];
      }
      byCategory[categorySlug].push(article);
    });
    
    console.log('\n📂 Articles by category:');
    Object.keys(byCategory).forEach(categorySlug => {
      console.log(`  ${categorySlug}: ${byCategory[categorySlug].length} articles`);
      if (categorySlug === 'creative') {
        console.log('    Creative articles:');
        byCategory[categorySlug].slice(0, 5).forEach((article, index) => {
          console.log(`    ${index + 1}. ${article.title}`);
        });
      }
    });
    
    // Specifically test creative category
    const creativeArticles = await sanityClient.fetch(`
      *[_type == "article" &&
        (status == "published" || (status == "scheduled" && publishedAt <= now())) &&
        category->slug.current == "creative"
      ] | order(publishedAt desc) {
        title,
        "slug": slug.current,
        "category": category->{name, "slug": slug.current}
      }
    `);
    
    console.log(`\n🎨 Creative category specific query: ${creativeArticles.length} articles`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testArticles();
