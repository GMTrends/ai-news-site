import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'crtekmb2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Helper function to generate Sanity image URLs
export function urlFor(source: any) {
  if (!source?.asset?._ref) return null
  
  const ref = source.asset._ref
  const [_file, id, extension] = ref.split('-')
  
  return `https://cdn.sanity.io/images/crtekmb2/production/${id}-${extension}`
}

export async function getFeaturedArticles(limit: number = 3) {
    try {
      const featuredArticles = await sanityClient.fetch(`
        *[_type == "article" && 
          (status == "published" || 
           (status == "scheduled" && publishedAt <= now())
          ) && 
          featured == true] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          status,
          featured,
          "author": author->{name, slug},
          "category": category->{name, slug, icon, color},
          featuredImage,
          "imageUrl": featuredImage.asset->url
        }
      `)
      
      // Process images and limit
      const articlesWithImages = featuredArticles.map((article: any) => ({
        ...article,
        featuredImage: article.imageUrl || urlFor(article.featuredImage)
      })).slice(0, limit)
      
      return articlesWithImages
    } catch (error) {
      console.error('❌ Error fetching articles:', error)
      return []
    }
}  

export async function getArticlesByCategory(categorySlug: string, limit: number = 3) {
    try {
      const articles = await sanityClient.fetch(`
        *[_type == "article" && 
          (status == "published" || 
           (status == "scheduled" && publishedAt <= now())
          ) && 
          category->slug.current == $categorySlug] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          status,
          featured,
          "author": author->{name, slug},
          "category": category->{name, slug, icon, color},
          featuredImage,
          "imageUrl": featuredImage.asset->url
        }
      `, { categorySlug })
      
      // Process images and limit
      const articlesWithImages = articles.map((article: any) => ({
        ...article,
        featuredImage: article.imageUrl || urlFor(article.featuredImage)
      })).slice(0, limit)
      
      return articlesWithImages
    } catch (error) {
      console.error(`❌ Error fetching articles for category ${categorySlug}:`, error)
      return []
    }
}  

export async function getBreakingNews(limit: number = 2) {
  return await getArticlesByCategory('ai-news', limit)
}

export async function getNews(limit: number = 2) {
  try {
    const news = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || 
         (status == "scheduled" && publishedAt <= now())
        ) && 
        category->slug.current == "ai-news"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        status,
        featured,
        "author": author->{name, slug},
        "category": category->{name, slug, icon, color},
        featuredImage,
        "imageUrl": featuredImage.asset->url
      }
    `)
    
    const newsWithImages = news.map((article: any) => ({
      ...article,
      featuredImage: article.imageUrl || urlFor(article.featuredImage)
    })).slice(0, limit)
    
    return newsWithImages
  } catch (error) {
    console.error('❌ Error fetching news:', error)
    return []
  }
}

export async function getReviews(limit: number = 2) {
  try {
    const reviews = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || 
         (status == "scheduled" && publishedAt <= now())
        ) && 
        category->slug.current == "reviews"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        seoScore,
        "author": author->{name, slug},
        "category": category->{name, slug, icon, color},
        featuredImage,
        "imageUrl": featuredImage.asset->url
      }
    `)
    
    const reviewsWithImages = reviews.map((article: any) => ({
      ...article,
      featuredImage: article.imageUrl || urlFor(article.featuredImage)
    })).slice(0, limit)
    
    return reviewsWithImages
  } catch (error) {
    console.error('❌ Error fetching reviews:', error)
    return []
  }
}

export async function getInsights(limit: number = 3) {
  return await getArticlesByCategory('insights', limit)
}

export async function getTutorials(limit: number = 3) {
  return await getArticlesByCategory('tutorials', limit)
}

export async function getBusiness(limit: number = 3) {
  return await getArticlesByCategory('business', limit)
}

export async function getFinance(limit: number = 3) {
  return await getArticlesByCategory('finance', limit)
}

export async function getAIAgents(limit: number = 3) {
  return await getArticlesByCategory('ai-agents', limit)
}

export async function getAllAuthors() {
  try {
    const authors = await sanityClient.fetch(`
      *[_type == "author"] | order(name asc) {
        _id,
        name,
        slug,
        bio,
        expertise,
        credentials,
        image,
        "imageUrl": image.asset->url
      }
    `)
    
    const authorsWithImages = authors.map((author: any) => ({
      ...author,
      image: author.imageUrl || urlFor(author.image)
    }))
    
    return authorsWithImages
  } catch (error) {
    console.error('❌ Error fetching authors:', error)
    return []
  }
}

export async function getAuthorBySlug(slug: string) {
  try {
    const author = await sanityClient.fetch(`
      *[_type == "author" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        bio,
        expertise,
        credentials,
        image,
        "imageUrl": image.asset->url
      }
    `, { slug })
    
    if (author) {
      author.image = author.imageUrl || urlFor(author.image)
    }
    
    return author
  } catch (error) {
    console.error(`❌ Error fetching author ${slug}:`, error)
    return null
  }
}

export async function getArticlesByAuthor(authorId: string) {
  try {
    const articles = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || 
         (status == "scheduled" && publishedAt <= now())
        ) && 
        author._ref == $authorId] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        "author": author->{name, slug},
        "category": category->{name, slug, icon, color},
        featuredImage,
        "imageUrl": featuredImage.asset->url
      }
    `, { authorId })
    
    const articlesWithImages = articles.map((article: any) => ({
      ...article,
      featuredImage: article.imageUrl || urlFor(article.featuredImage)
    }))
    
    return articlesWithImages
  } catch (error) {
    console.error(`❌ Error fetching articles by author:`, error)
    return []
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
  
  if (diffHours < 24) {
    return `${diffHours} hours ago`
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }
}

// Add this function to get all categories
export async function getAllCategories() {
    try {
      const categories = await sanityClient.fetch(`
        *[_type == "category"] | order(sortOrder asc) {
          _id,
          name,
          slug,
          description,
          icon,
          color,
          featured,
          sortOrder,
          metaTitle,
          metaDescription
        }
      `)
      return categories
    } catch (error) {
      console.error('❌ Error fetching categories:', error)
      return []
    }
  }
  
  // Get featured categories only
  export async function getFeaturedCategories() {
    try {
      const categories = await sanityClient.fetch(`
        *[_type == "category" && featured == true] | order(sortOrder asc) {
          _id,
          name,
          slug,
          description,
          icon,
          color,
          featured,
          sortOrder
        }
      `)
      return categories
    } catch (error) {
      console.error('❌ Error fetching featured categories:', error)
      return []
    }
  }
