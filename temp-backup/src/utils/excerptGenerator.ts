/**
 * Utility functions for generating excerpts from article content
 */

/**
 * Generates an excerpt from article body text
 * @param body - The article body text
 * @param maxLength - Maximum length of the excerpt (default: 160)
 * @returns Generated excerpt
 */
export function generateExcerpt(body: string, maxLength: number = 160): string {
  if (!body || typeof body !== 'string') {
    return '';
  }

  // Clean the text by removing markdown syntax, HTML tags, and extra whitespace
  let cleanText = body
    // Remove markdown headers
    .replace(/^#+\s+/gm, '')
    // Remove markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Remove extra whitespace and newlines
    .replace(/\s+/g, ' ')
    .trim();

  // If text is shorter than maxLength, return it as is
  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  // Truncate to maxLength and find the last complete word
  let truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) { // Only break at word if it's not too early
    truncated = truncated.substring(0, lastSpace);
  }

  // Add ellipsis if we truncated
  return truncated + '...';
}

/**
 * Ensures an article has an excerpt, generating one from body if missing
 * @param article - Article object with excerpt and body properties
 * @param maxLength - Maximum length for generated excerpts
 * @returns Article with guaranteed excerpt
 */
export function ensureExcerpt(article: {
  excerpt?: string;
  body?: string;
  content?: any;
}, maxLength: number = 160): string {
  // If excerpt exists and is not empty, use it
  if (article.excerpt && article.excerpt.trim()) {
    return article.excerpt;
  }

  // Try to get body text from different possible sources
  let bodyText = '';

  if (article.body && typeof article.body === 'string') {
    bodyText = article.body;
  } else if (article.content) {
    // Handle Sanity content blocks
    if (Array.isArray(article.content)) {
      bodyText = article.content
        .filter((block: any) => block._type === 'block' && block.children)
        .map((block: any) => 
          block.children
            .filter((child: any) => child.text)
            .map((child: any) => child.text)
            .join(' ')
        )
        .join(' ');
    } else if (typeof article.content === 'string') {
      bodyText = article.content;
    }
  }

  return generateExcerpt(bodyText, maxLength);
}

/**
 * Processes a collection of articles to ensure they all have excerpts
 * @param articles - Array of article objects
 * @param maxLength - Maximum length for generated excerpts
 * @returns Array of articles with guaranteed excerpts
 */
export function processArticlesWithExcerpts(articles: any[], maxLength: number = 160): any[] {
  return articles.map(article => ({
    ...article,
    excerpt: ensureExcerpt(article, maxLength)
  }));
} 