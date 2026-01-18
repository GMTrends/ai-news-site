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

/**
 * Calculates accurate reading time for articles based on content length and type
 * @param article - Article object with content, excerpt, and other properties
 * @param wordsPerMinute - Reading speed (default: 200 WPM - industry standard)
 * @returns Estimated reading time in minutes
 */
export function calculateReadTime(article: {
  content?: any;
  excerpt?: string;
  body?: string;
  title?: string;
}, wordsPerMinute: number = 225): number {
  if (!article) return 1;

  let totalWords = 0;
  
  // Count words in title (if present)
  if (article.title) {
    totalWords += article.title.split(/\s+/).length;
  }
  
  // Count words in excerpt
  if (article.excerpt) {
    totalWords += article.excerpt.split(/\s+/).length;
  }
  
  // Count words in main content using the same approach as the original code
  if (article.content) {
    if (Array.isArray(article.content)) {
      // Handle Sanity Portable Text blocks exactly like the original portableTextToPlainText function
      totalWords += article.content
        .map((block: any) => {
          if (block._type === 'block' && Array.isArray(block.children)) {
            return block.children.map((child: any) => child.text).join(' ');
          }
          // Handle custom HTML blocks
          if (block._type === 'htmlBlock' && typeof block.html === 'string') {
            // Strip HTML tags and return text
            return block.html.replace(/<[^>]*>/g, ' ');
          }
          return '';
        })
        .join(' ')
        .split(/\s+/)
        .length;
    } else if (typeof article.content === 'string') {
      totalWords += article.content.split(/\s+/).length;
    }
  }
  
  // Fallback to body if content is not available
  if (article.body && typeof article.body === 'string') {
    totalWords += article.body.split(/\s+/).length;
  }
  
  // Calculate reading time and ensure minimum of 1 minute
  const readingTime = Math.ceil(totalWords / wordsPerMinute);
  return Math.max(1, readingTime);
}

/**
 * Calculates reading time from plain text content
 * @param text - Plain text content
 * @param wordsPerMinute - Reading speed (default: 200 WPM)
 * @returns Estimated reading time in minutes
 */
export function calculateReadTimeFromText(text: string | null | undefined, wordsPerMinute: number = 200): number {
  if (!text || typeof text !== 'string') {
    return 1;
  }
  
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime);
} 

 