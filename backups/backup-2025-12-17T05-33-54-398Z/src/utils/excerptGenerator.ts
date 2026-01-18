/**
 * Utility functions for generating excerpts from article content
 */

/**
 * Generates Lorem Ipsum filler text to reach desired length
 * @param targetLength - Target length for the final text
 * @param existingText - Existing text to build upon
 * @returns Text with Lorem Ipsum filler to reach target length
 */
export function generateLoremIpsumFiller(targetLength: number, existingText: string = ''): string {
  const loremWords = [
    'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'Ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
    'commodo', 'consequat', 'Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
    'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
    'pariatur', 'Excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
    'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est',
    'laborum', 'Sed', 'ut', 'perspiciatis', 'unde', 'omnis', 'iste', 'natus',
    'error', 'sit', 'voluptatem', 'accusantium', 'doloremque', 'laudantium',
    'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore',
    'veritatis', 'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt',
    'explicabo', 'Nemo', 'enim', 'ipsam', 'voluptatem', 'quia', 'voluptas',
    'sit', 'aspernatur', 'aut', 'odit', 'aut', 'fugit', 'sed', 'quia',
    'consequuntur', 'magni', 'dolores', 'eos', 'qui', 'ratione', 'voluptatem',
    'sequi', 'nesciunt', 'Neque', 'porro', 'quisquam', 'est', 'qui', 'dolorem',
    'ipsum', 'quia', 'dolor', 'sit', 'amet', 'consectetur', 'adipisci', 'velit'
  ];

  let result = existingText;
  
  while (result.length < targetLength) {
    const randomWords = [];
    const wordsToAdd = Math.min(5 + Math.floor(Math.random() * 10), loremWords.length);
    
    for (let i = 0; i < wordsToAdd; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      randomWords.push(loremWords[randomIndex]);
    }
    
    const newText = randomWords.join(' ');
    if (result.length + newText.length + 1 <= targetLength) {
      result += (result ? ' ' : '') + newText;
    } else {
      break;
    }
  }
  
  return result;
}

/**
 * Generates an excerpt from article body text
 * @param body - The article body text
 * @param maxLength - Maximum length of the excerpt (default: 400)
 * @returns Generated excerpt
 */
export function generateExcerpt(body: string, maxLength: number = 400): string {
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
 * @param useLoremIpsum - Whether to fill short content with Lorem Ipsum
 * @returns Article with guaranteed excerpt
 */
export function ensureExcerpt(article: {
  excerpt?: string;
  body?: string;
  content?: any;
}, maxLength: number = 400, useLoremIpsum: boolean = true): string {
  // If excerpt exists and is not empty, use it
  if (article.excerpt && article.excerpt.trim()) {
    const excerpt = article.excerpt.trim();
    // If using Lorem Ipsum and excerpt is shorter than maxLength, fill it
    if (useLoremIpsum && excerpt.length < maxLength) {
      return generateLoremIpsumFiller(maxLength, excerpt);
    }
    return excerpt;
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

  const generatedExcerpt = generateExcerpt(bodyText, maxLength);
  
  // If using Lorem Ipsum and generated excerpt is shorter than maxLength, fill it
  if (useLoremIpsum && generatedExcerpt.length < maxLength) {
    return generateLoremIpsumFiller(maxLength, generatedExcerpt);
  }
  
  return generatedExcerpt;
}

/**
 * Processes a collection of articles to ensure they all have excerpts
 * @param articles - Array of article objects
 * @param maxLength - Maximum length for generated excerpts
 * @param useLoremIpsum - Whether to fill short content with Lorem Ipsum
 * @returns Array of articles with guaranteed excerpts
 */
export function processArticlesWithExcerpts(articles: any[], maxLength: number = 400, useLoremIpsum: boolean = true): any[] {
  return articles.map(article => ({
    ...article,
    excerpt: ensureExcerpt(article, maxLength, useLoremIpsum)
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

 