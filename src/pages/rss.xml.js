import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { ensureExcerpt } from '../utils/excerptGenerator';

export async function GET(context) {
	const articles = await getCollection('articles');
	
	// Filter for published articles only
	const publishedArticles = articles.filter(article => article.data.status === 'published');
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: publishedArticles.map((article) => ({
			title: article.data.title,
			description: ensureExcerpt({
			excerpt: article.data.excerpt,
			body: article.data.content,
			content: article.data.content
		}, 250),
			pubDate: article.data.publishedAt ? new Date(article.data.publishedAt) : new Date(),
			link: `/articles/${article.slug}/`,
		})),
	});
}
