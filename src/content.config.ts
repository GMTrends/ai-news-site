import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		excerpt: z.string().optional(),
		content: z.string().optional(),
		author: z.string().optional(),
		category: z.string().optional(),
		publishedAt: z.string().optional(),
		featured: z.boolean().optional(),
		image: z.string().optional(),
		tags: z.array(z.string()).optional(),
		status: z.enum(['draft', 'published']).default('published'),
		// SEO Fields
		seoTitle: z.string().optional(),
		seoDescription: z.string().optional(),
		seoKeywords: z.array(z.string()).optional(),
		// AI-Specific Fields
		aiTools: z.array(z.string()).optional(),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
		readingTime: z.number().optional(),
		// E-E-A-T Fields
		expertVerified: z.boolean().optional(),
		factChecked: z.boolean().optional(),
		sources: z.array(z.string()).optional(),
	}),
});

const authors = defineCollection({
	schema: z.object({
		name: z.string(),
		slug: z.string(),
		bio: z.string().optional(),
		avatar: z.string().optional(),
		// Professional Information
		jobTitle: z.string().optional(),
		organization: z.string().optional(),
		// E-E-A-T Compliance Fields
		expertise: z.array(z.string()).optional(),
		credentials: z.string().optional(),
		experienceYears: z.number().optional(),
		verified: z.enum(['unverified', 'pending', 'verified']).optional(),
		verificationDate: z.string().optional(),
		// Social Media & Contact
		social: z.object({
			twitter: z.string().optional(),
			linkedin: z.string().optional(),
			github: z.string().optional(),
			website: z.string().optional(),
		}).optional(),
		email: z.string().optional(),
		// Professional Links
		publishedWorks: z.array(z.string()).optional(),
		speakingEngagements: z.array(z.string()).optional(),
		awards: z.array(z.string()).optional(),
	}),
});

const categories = defineCollection({
	schema: z.object({
		name: z.string(),
		slug: z.string(),
		description: z.string().optional(),
		image: z.string().optional(),
		// Visual Identity
		icon: z.string().optional(),
		color: z.string().optional(),
		// SEO
		seoTitle: z.string().optional(),
		seoDescription: z.string().optional(),
		seoKeywords: z.array(z.string()).optional(),
	}),
});

const pages = defineCollection({
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		content: z.string().optional(),
		meta: z.object({
			title: z.string().optional(),
			description: z.string().optional(),
			keywords: z.array(z.string()).optional(),
		}).optional(),
		// Page Settings
		showInNav: z.boolean().optional(),
		navOrder: z.number().optional(),
	}),
});

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.string().optional(),
		updatedDate: z.string().optional(),
		heroImage: z.string().optional(),
		category: z.string().optional(),
		authorName: z.string().optional(),
		authorSlug: z.string().optional(),
		categoryName: z.string().optional(),
		categorySlug: z.string().optional(),
	}),
});

// Site Settings Collection
const siteSettings = defineCollection({
	type: 'data',
	schema: z.object({
		siteTitle: z.string(),
		siteDescription: z.string(),
		siteLogo: z.string().optional(),
		favicon: z.string().optional(),
		googleAnalyticsId: z.string().optional(),
		facebookPixelId: z.string().optional(),
		twitterHandle: z.string().optional(),
		linkedinUrl: z.string().optional(),
		contactEmail: z.string().optional(),
		newsletterText: z.string().optional(),
		footerCopyright: z.string().optional(),
	}),
});

export const collections = { articles, authors, categories, pages, blog, siteSettings };
