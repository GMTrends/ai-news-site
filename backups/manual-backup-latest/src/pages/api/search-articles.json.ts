import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import { getAllArticles as getAllSanityArticles } from '../../lib/sanity'
import { ensureExcerpt } from '../../utils/excerptGenerator'
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    // Fetch local Markdown articles
    const articles = await getCollection('articles')
    
    // Helper to get the first 300 chars of the markdown body
    async function getBodySnippet(slug: string) {
      try {
        // Try to read the markdown file directly
        const filePath = path.join(process.cwd(), 'src', 'content', 'articles', `${slug}.md`);
        const file = await fs.readFile(filePath, 'utf8');
        // Remove frontmatter
        const body = file.replace(/^---[\s\S]*?---/, '').trim();
        return body.slice(0, 300);
      } catch (e) {
        return '';
      }
    }

    const localArticles = await Promise.all(articles.map(async (article: CollectionEntry<'articles'>) => {
      const bodySnippet = await getBodySnippet(article.slug);
      return {
        _id: article.id,
        title: article.data.title,
        slug: article.slug,
        category: {
          name: article.data.category || 'Uncategorized',
          slug: article.data.category || 'uncategorized'
        },
        excerpt: ensureExcerpt({
          excerpt: article.data.excerpt,
          body: bodySnippet
        }),
        publishedAt: article.data.publishedAt || new Date().toISOString(),
        author: {
          name: article.data.author || 'Unknown',
          slug: article.data.author || 'unknown'
        },
        body: bodySnippet
      };
    }));

    // Fetch all Sanity articles
    let sanityArticles: any[] = [];
    try {
      sanityArticles = await getAllSanityArticles();
    } catch (err) {
      sanityArticles = [];
    }
    const transformedSanityArticles = sanityArticles.map((article: any) => ({
      _id: article._id,
      title: article.title,
      slug: article.slug,
      category: article.category && typeof article.category === 'object' ? {
        name: article.category.name || 'Uncategorized',
        slug: article.category.slug || 'uncategorized'
      } : { name: article.category || 'Uncategorized', slug: article.category || 'uncategorized' },
      excerpt: ensureExcerpt({
        excerpt: article.excerpt,
        body: article.body,
        content: article.body // Sanity articles might have content in body field
      }),
      publishedAt: article.publishedAt || new Date().toISOString(),
      author: article.author && typeof article.author === 'object' ? {
        name: article.author.name || 'Unknown',
        slug: article.author.slug || 'unknown'
      } : { name: article.author || 'Unknown', slug: article.author || 'unknown' },
      body: article.body || ''
    }));

    // Merge and return all articles
    const allArticles = [...localArticles, ...transformedSanityArticles];

    return new Response(JSON.stringify(allArticles), {
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