import { createClient } from '@sanity/client'

// Test Sanity connection and check category slugs
const sanityClient = createClient({
  projectId: 'crtekmb2',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: 'skSVD1GXFMQmyjpYBtCyCOoeTpRkX26tmDk2IYcrRBVqEYuqbk3G4WssqQzEZnAJBCcNXWgjp2p7efoXHYnoRNusNum0147N5phOGqOR14hEMBZDglG57fIaqRxgifLc5qcRp5DeuTRotRrqi87heWf1cvcUEKNJxcLekTtFdQ5BlyU2CAhw'
})

async function testCategorySlugs() {
  try {
    console.log('🔍 Testing Sanity connection and category slugs...')
    
    // Test 1: Get all articles with their category information
    const allArticlesQuery = `*[_type == "article" && 
      (status == "published" || (status == "scheduled" && publishedAt <= now()))
    ] | order(publishedAt desc)[0...10] {
      _id,
      title,
      "slug": slug.current,
      status,
      "category": category->{name, "slug": slug.current, displayName}
    }`
    
    const allArticles = await sanityClient.fetch(allArticlesQuery)
    console.log('✅ All articles found:', allArticles.length)
    
    if (allArticles.length > 0) {
      console.log('📝 Sample articles with categories:')
      allArticles.forEach((article, index) => {
        console.log(`  ${index + 1}. "${article.title}" - Category: ${article.category?.name || 'No category'} (Slug: ${article.category?.slug || 'No slug'})`)
      })
    }
    
    // Test 2: Check specifically for creative category
    const creativeQuery = `*[_type == "article" && 
      (status == "published" || (status == "scheduled" && publishedAt <= now())) &&
      category->slug.current == "creative"
    ] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      status,
      "category": category->{name, "slug": slug.current}
    }`
    
    const creativeArticles = await sanityClient.fetch(creativeQuery)
    console.log(`\n🔍 Creative category query results: ${creativeArticles.length} articles`)
    
    if (creativeArticles.length > 0) {
      console.log('📝 Creative articles found:')
      creativeArticles.forEach((article, index) => {
        console.log(`  ${index + 1}. "${article.title}"`)
      })
    } else {
      console.log('⚠️  No creative articles found with slug "creative"')
    }
    
    // Test 3: Check what category slugs actually exist
    const categorySlugsQuery = `*[_type == "category"] {
      name,
      "slug": slug.current,
      displayName
    } | order(name asc)`
    
    const categories = await sanityClient.fetch(categorySlugsQuery)
    console.log(`\n🏷️  Available categories in Sanity: ${categories.length}`)
    
    if (categories.length > 0) {
      console.log('📝 Categories:')
      categories.forEach((category, index) => {
        console.log(`  ${index + 1}. ${category.name} (Slug: ${category.slug})`)
      })
    }
    
    // Test 4: Check if there are any articles with different category slugs
    const articlesWithCategoriesQuery = `*[_type == "article" && 
      (status == "published" || (status == "scheduled" && publishedAt <= now()))
    ] {
      title,
      "categorySlug": category->slug.current
    } | order(categorySlug asc)`
    
    const articlesWithCategories = await sanityClient.fetch(articlesWithCategoriesQuery)
    console.log(`\n📊 Articles by category slug:`)
    
    const categoryCounts = {}
    articlesWithCategories.forEach(article => {
      const slug = article.categorySlug || 'uncategorized'
      categoryCounts[slug] = (categoryCounts[slug] || 0) + 1
    })
    
    Object.entries(categoryCounts).forEach(([slug, count]) => {
      console.log(`  ${slug}: ${count} articles`)
    })
    
  } catch (error) {
    console.error('❌ Sanity connection failed:', error)
  }
}

testCategorySlugs()
