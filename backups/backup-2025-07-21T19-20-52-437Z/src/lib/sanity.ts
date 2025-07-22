import { createClient } from '@sanity/client'
import { ensureExcerpt } from '../utils/excerptGenerator'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'crtekmb2',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true' || false,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN, // Only for write operations
})

// Helper function to generate Sanity image URLs
export function urlFor(source: any) {
  if (!source?.asset?._ref) return null;
  // Example ref: image-662255fed9c98a09a9aa1076a5e8364f242f5c6a-1280x720-jpg
  const ref = source.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/crtekmb2/production/${id}-${dimensions}.${format}`;
}

// Enhanced image URL helper
export function getImageUrl(image: any) {
  if (!image) {
    return null
  }
  
  let url = null
  
  // If it's already a URL string, return it
  if (typeof image === 'string') {
    url = image
  }
  // If it has an asset with URL, use that
  else if (image.asset?.url) {
    url = image.asset.url
  }
  // If it has an asset reference, generate URL
  else if (image.asset?._ref) {
    url = urlFor(image)
  }
  // If it's an object with url property
  else if (image.url) {
    url = image.url
  }
  
  // Add cache-busting parameter if we have a URL
  if (url) {
    const separator = url.includes('?') ? '&' : '?'
    url = `${url}${separator}v=${Date.now()}`
  }
  
  return url
}

export async function getFeaturedArticles(limit: number = 12) {
  try {
    const featuredArticles = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || 
         (status == "scheduled" && publishedAt <= now())
        )
      ] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        status,
        heroPlacement,
        priority,
        revenueClassification,
        contentType,
        "author": author->{name, slug},
        "category": category->{name, displayName, slug, icon, color},
        "featuredImage": featuredImage{
          asset->{
            _id,
            url,
            metadata
          }
        },
        content
      }
    `)
    
    // Process images and limit
    const articlesWithImages = featuredArticles.map((article: any) => ({
      ...article,
      featuredImage: getImageUrl(article.featuredImage),
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      })
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
          "slug": slug.current,
          excerpt,
          publishedAt,
          status,
          featured,
          "author": author->{name, slug},
          "category": category->{name, displayName, slug, icon, color},
          "featuredImage": featuredImage{
            asset->{
              _id,
              url,
              metadata
            }
          },
          content
        }
      `, { categorySlug })
      
      // Process images and limit
      const articlesWithImages = articles.map((article: any) => ({
        ...article,
        featuredImage: getImageUrl(article.featuredImage),
        excerpt: ensureExcerpt({
          excerpt: article.excerpt,
          content: article.content
        })
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
        "slug": slug.current,
        excerpt,
        publishedAt,
        status,
        featured,
        "author": author->{name, slug},
        "category": category->{name, displayName, slug, icon, color},
        "featuredImage": featuredImage{
          asset->{
            _id,
            url,
            metadata
          }
        },
        content
      }
    `)
    
    const newsWithImages = news.map((article: any) => ({
      ...article,
      featuredImage: getImageUrl(article.featuredImage),
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      })
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
        "slug": slug.current,
        excerpt,
        publishedAt,
        seoScore,
        "author": author->{name, slug},
        "category": category->{name, displayName, slug, icon, color},
        "featuredImage": featuredImage{
          asset->{
            _id,
            url,
            metadata
          }
        },
        content
      }
    `)
    
    const reviewsWithImages = reviews.map((article: any) => ({
      ...article,
      featuredImage: getImageUrl(article.featuredImage),
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      })
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
        "slug": slug.current,
        bio,
        expertise,
        credentials,
        image,
        "imageUrl": image.asset->url
      }
    `)
    
    const authorsWithImages = authors.map((author: any) => ({
      ...author,
      image: author.imageUrl || getImageUrl(author.image)
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
        "slug": slug.current,
        bio,
        expertise,
        credentials,
        image,
        "imageUrl": image.asset->url
      }
    `, { slug })
    
    if (author) {
      return {
        ...author,
        image: author.imageUrl || getImageUrl(author.image)
      }
    }
    
    return null
  } catch (error) {
    console.error(`❌ Error fetching author by slug ${slug}:`, error)
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
        "slug": slug.current,
        excerpt,
        publishedAt,
        status,
        featured,
        "author": author->{name, slug},
        "category": category->{name, displayName, slug, icon, color},
        featuredImage,
        "imageUrl": featuredImage.asset->url,
        content
      }
    `, { authorId })
    
    const articlesWithImages = articles.map((article: any) => ({
      ...article,
      featuredImage: article.imageUrl || getImageUrl(article.featuredImage),
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      })
    }))
    
    return articlesWithImages
  } catch (error) {
    console.error(`❌ Error fetching articles by author ${authorId}:`, error)
    return []
  }
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown date'
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  } catch (error) {
    return 'Unknown date'
  }
}

export async function getAllCategories() {
  try {
    const categories = await sanityClient.fetch(`
      *[_type == "category"] | order(name asc) {
        _id,
        name,
        "slug": slug.current,
        description,
        icon,
        color
      }
    `)
    
    return categories
  } catch (error) {
    console.error('❌ Error fetching categories:', error)
    return []
  }
}

export async function getFeaturedCategories() {
  try {
    const categories = await sanityClient.fetch(`
      *[_type == "category" && featured == true] | order(name asc) {
        _id,
        name,
        "slug": slug.current,
        description,
        icon,
        color
      }
    `)
    
    return categories
  } catch (error) {
    console.error('❌ Error fetching featured categories:', error)
    return []
  }
}

export async function getAllArticles() {
  try {
    const articles = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || 
         (status == "scheduled" && publishedAt <= now())
        )
      ] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        status,
        featured,
        "author": author->{name, slug},
        "category": category->{name, displayName, slug, icon, color},
        body,
        content
      }
    `)
    return articles.map((article: any) => ({
      ...article,
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        content: article.content
      })
    }))
  } catch (error) {
    console.error('❌ Error fetching all articles:', error)
    return []
  }
} 