import type { APIRoute } from 'astro'
import { sanityClient } from '../../lib/sanity'

export const GET: APIRoute = async () => {
  try {
    const articles = await sanityClient.fetch(`
      *[_type == "article" && 
        (status == "published" || 
         (status == "scheduled" && publishedAt <= now())
        )] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        "category": category->{name, "slug": slug.current},
        excerpt,
        publishedAt,
        "author": author->{name, slug}
      }
    `)

    return new Response(JSON.stringify(articles), {
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