import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { createClient } from '@sanity/client';
import { gaAnalyticsService } from '../../../lib/ga-analytics-service';

// Create Sanity client for API route with proper configuration
const sanityClient = createClient({
  projectId: 'crtekmb2',
  dataset: 'production',
  useCdn: false, // Use false for API routes to get fresh data
  apiVersion: '2024-01-01',
  // Note: No token needed for read-only operations
});

// Define types for Sanity articles
interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string;
  author?: {
    name: string;
    slug: {
      current: string;
    };
  };
  category?: {
    name: string;
    slug: {
      current: string;
    };
  };
  views: number;
}

// Define types for author performance
interface AuthorPerformance {
  name: string;
  slug: string;
  articles: number;
  views: number;
  avgViews: number;
  status: string;
}

export const GET: APIRoute = async () => {
  try {
    // Get authors from local collection
    const authors = await getCollection('authors');
    
    // Fetch articles from Sanity CMS with simpler query first
    let sanityArticles: SanityArticle[] = [];
    try {
      // Start with a simple query to test the connection
      sanityArticles = await sanityClient.fetch(`
        *[_type == "article"] {
          _id,
          title,
          "slug": slug.current,
          status,
          publishedAt,
          "author": author->{name, slug},
          "category": category->{name, slug}
        }
      `);
      
      // Filter for published articles after fetching
      const publishedArticles = sanityArticles.filter(article => 
        article.status === 'published' || 
        (article.status === 'scheduled' && new Date(article.publishedAt) <= new Date())
      );
      
      sanityArticles = publishedArticles;
      
    } catch (sanityError) {
      console.error('Error fetching from Sanity:', sanityError);
      // Don't return mock data - let the error bubble up so we know there's an issue
      throw new Error(`Failed to fetch from Sanity: ${sanityError}`);
    }

    // Get Google Analytics data for views and engagement
    const overallMetrics = await gaAnalyticsService.getOverallMetrics();
    const authorMetrics = await gaAnalyticsService.getAuthorMetrics(
      authors.map((author: any) => ({ slug: author.slug, name: author.data.name }))
    );
    
    // Calculate analytics data from real Sanity data + GA views
    const analyticsData = {
      totalAuthors: authors.length,
      totalArticles: sanityArticles.length, // Real count from Sanity
      totalViews: overallMetrics.totalPageViews, // Real views from GA
      avgEngagement: overallMetrics.avgEngagementRate, // Real engagement from GA
      authorPerformance: authors.map((author: any) => {
        // Count articles by this author from Sanity
        const authorArticles = sanityArticles.filter((article: SanityArticle) => 
          article.author?.slug?.current === author.slug || 
          article.author?.name === author.data.name
        );
        
        const articleCount = authorArticles.length;
        
        // Get author metrics from GA
        const gaAuthorData = authorMetrics.find(ga => ga.authorSlug === author.slug);
        const totalViews = gaAuthorData?.totalViews || 0;
        const avgViews = articleCount > 0 ? Math.round(totalViews / articleCount) : 0;
        
        return {
          name: author.data.name,
          slug: author.slug,
          articles: articleCount, // Real count from Sanity
          views: totalViews, // Real views from GA
          avgViews: avgViews, // Calculated from real data
          status: 'Active'
        };
      })
    };

    return new Response(JSON.stringify(analyticsData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate' // Ensure fresh data every time
      }
    });

  } catch (error) {
    console.error('Critical error in analytics API:', error);
    
    // Return error response instead of mock data
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch analytics data',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
