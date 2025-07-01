import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

export const GET: APIRoute = async () => {
  try {
    const articles = await getCollection('articles')
    
    // Transform articles to match the expected format
    const transformedArticles = articles.map((article: CollectionEntry<'articles'>) => ({
      _id: article.id,
      title: article.data.title,
      slug: article.slug,
      category: {
        name: article.data.category || 'Uncategorized',
        slug: article.data.category || 'uncategorized'
      },
      excerpt: article.data.excerpt || '',
      publishedAt: article.data.publishedAt || new Date().toISOString(),
      author: {
        name: article.data.author || 'Unknown',
        slug: article.data.author || 'unknown'
      }
    }))

    return new Response(JSON.stringify(transformedArticles), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Search API error:', error)
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}