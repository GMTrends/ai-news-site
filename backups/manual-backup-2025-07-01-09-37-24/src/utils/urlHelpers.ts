export function getArticleUrl(article: any) {
    const slug = typeof article.slug === 'string' ? article.slug : article.slug?.current;
    
    // Handle different category formats
    let categorySlug = 'news'; // default fallback
    
    if (article.category?.slug?.current) {
      categorySlug = article.category.slug.current;
    } else if (typeof article.category === 'string') {
      categorySlug = article.category.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
    } else if (article.category?.name) {
      categorySlug = article.category.name.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
    }
    
    return `/${categorySlug}/${slug}`;
  }
  
/**
 * Maps category names to their respective category page URLs
 */
export function getCategoryUrl(categoryName: string): string {
	const categoryMap: { [key: string]: string } = {
		'AI News': '/categories/ai-news',
		'News': '/categories/ai-news',
		'Reviews': '/categories/reviews',
		'Review': '/categories/reviews',
		'Tutorials': '/categories/tutorials',
		'Tutorial': '/categories/tutorials',
		'Business': '/categories/business',
		'Finance': '/categories/finance',
		'AI Agents': '/categories/ai-agents',
		'AI Agent': '/categories/ai-agents',
		'Uncategorized': '/categories/ai-news' // Default fallback
	};
	
	return categoryMap[categoryName] || '/categories/ai-news';
}
  