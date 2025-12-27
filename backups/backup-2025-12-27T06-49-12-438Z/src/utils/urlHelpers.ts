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
		'Marketing': '/categories/marketing',
		'Business': '/categories/business',
		'AI Agents': '/categories/ai-agents',
		'Creative': '/categories/creative',
		'eCommerce': '/categories/ecommerce',
		'Productivity': '/categories/productivity',
	};
	return categoryMap[categoryName] || '/categories/marketing';
}
  