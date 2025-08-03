export interface AITool {
  id: string;
  name: string;
  category: 'marketing' | 'agents' | 'automation';
  subcategory: string;
  pricing: {
    free: boolean;
    starter: number | null;
    pro: number | null;
    enterprise: string | null;
  };
  features: string[];
  rating: number;
  reviewCount: number;
  bestFor: string[];
  pros: string[];
  cons: string[];
  affiliateLink: string;
  logoUrl: string;
  description: string;
  lastUpdated: string;
  popularity: number;
}

export const aiTools: AITool[] = [
  {
    id: 'jasper-ai',
    name: 'Jasper AI',
    category: 'marketing',
    subcategory: 'Content Creation',
    pricing: { free: false, starter: 39, pro: 99, enterprise: 'Custom' },
    features: ['AI Writing', 'Brand Voice', 'Templates', 'Plagiarism Checker', 'SEO Optimization'],
    rating: 4.5,
    reviewCount: 1250,
    bestFor: ['Content Teams', 'Marketing Agencies', 'Bloggers'],
    pros: ['High-quality output', 'Brand voice training', 'Extensive templates'],
    cons: ['Expensive for individuals', 'Learning curve'],
    affiliateLink: '#jasper-affiliate-placeholder',
    logoUrl: '/images/tools/jasper-logo.png',
    description: 'AI-powered content creation platform for marketing teams and agencies.',
    lastUpdated: '2024-01-15',
    popularity: 9
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    category: 'marketing',
    subcategory: 'Content Creation',
    pricing: { free: true, starter: 36, pro: 186, enterprise: 'Custom' },
    features: ['AI Copywriting', 'Workflows', 'Brand Kit', 'Collaboration', 'API Access'],
    rating: 4.3,
    reviewCount: 890,
    bestFor: ['Small Businesses', 'Freelancers', 'Startups'],
    pros: ['Generous free plan', 'User-friendly interface', 'Good value'],
    cons: ['Output quality varies', 'Limited advanced features'],
    affiliateLink: '#copy-ai-affiliate-placeholder',
    logoUrl: '/images/tools/copy-ai-logo.png',
    description: 'Versatile AI writing assistant with workflow automation capabilities.',
    lastUpdated: '2024-01-10',
    popularity: 8
  },
  {
    id: 'zapier-ai',
    name: 'Zapier AI',
    category: 'automation',
    subcategory: 'Business Automation',
    pricing: { free: true, starter: 19.99, pro: 49, enterprise: 'Custom' },
    features: ['AI Automation', 'Workflow Builder', '6000+ Integrations', 'Custom Logic', 'Error Handling'],
    rating: 4.6,
    reviewCount: 3200,
    bestFor: ['Business Automation', 'Workflow Optimization', 'Integration Management'],
    pros: ['Massive integration library', 'User-friendly', 'Reliable'],
    cons: ['Can get expensive', 'Complex workflows hard to debug'],
    affiliateLink: '#zapier-affiliate-placeholder',
    logoUrl: '/images/tools/zapier-logo.png',
    description: 'Leading automation platform with AI-powered workflow suggestions.',
    lastUpdated: '2024-01-14',
    popularity: 10
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'agents',
    subcategory: 'Coding Agents',
    pricing: { free: false, starter: 10, pro: 19, enterprise: '39' },
    features: ['AI Code Completion', 'Multi-language Support', 'Context Awareness', 'Code Suggestions', 'IDE Integration'],
    rating: 4.7,
    reviewCount: 5600,
    bestFor: ['Developers', 'Development Teams', 'Code Learning'],
    pros: ['Excellent code suggestions', 'Wide language support', 'IDE integration'],
    cons: ['Subscription required', 'Sometimes inaccurate suggestions'],
    affiliateLink: '#copilot-affiliate-placeholder',
    logoUrl: '/images/tools/copilot-logo.png',
    description: 'AI pair programmer that helps developers write code faster and more efficiently.',
    lastUpdated: '2024-01-16',
    popularity: 9
  },
  {
    id: 'seowriting',
    name: 'SEOWriting.ai',
    category: 'marketing',
    subcategory: 'content-creation',
    description: 'AI-powered SEO content writing tool that creates optimized articles, blog posts, and web copy.',
    pricing: {
      free: true,
      starter: 16,
      pro: 48,
      enterprise: null
    },
    features: ['SEO optimization', 'Bulk content generation', 'Keyword research', 'Content templates', 'Plagiarism checker', 'Multi-language support'],
    pros: ['Excellent SEO optimization', 'Bulk generation capabilities', 'Affordable pricing'],
    cons: ['Limited customization', 'Requires SEO knowledge'],
    rating: 4.3,
    reviewCount: 892,
    bestFor: ['SEO agencies', 'Content marketers', 'Bloggers'],
    affiliateLink: 'https://affiliate-placeholder.com/seowriting',
    logoUrl: '/logos/seowriting.png',
    lastUpdated: '2024-01-15',
    popularity: 85
  },
  {
    id: 'genspark',
    name: 'GenSpark',
    category: 'agents',
    subcategory: 'research',
    description: 'AI-powered research and content generation platform with advanced reasoning capabilities.',
    pricing: {
      free: true,
      starter: 20,
      pro: 50,
      enterprise: '150'
    },
    features: ['Advanced research', 'Multi-source analysis', 'Citation tracking', 'Content synthesis', 'Real-time data', 'Custom workflows'],
    pros: ['Excellent research quality', 'Real-time information', 'Citation accuracy'],
    cons: ['Learning curve', 'Premium features expensive'],
    rating: 4.6,
    reviewCount: 567,
    bestFor: ['Researchers', 'Analysts', 'Content creators'],
    affiliateLink: 'https://affiliate-placeholder.com/genspark',
    logoUrl: '/logos/genspark.png',
    lastUpdated: '2024-01-18',
    popularity: 78
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    category: 'agents',
    subcategory: 'general-purpose',
    description: 'Advanced AI assistant for analysis, writing, coding, and complex reasoning tasks.',
    pricing: {
      free: true,
      starter: 20,
      pro: 200,
      enterprise: null
    },
    features: ['Advanced reasoning', 'Code generation', 'Document analysis', 'Creative writing', 'Research assistance', 'Safety-focused'],
    pros: ['Excellent reasoning', 'Safety-focused', 'Versatile capabilities'],
    cons: ['Usage limits on free tier', 'Premium pricing'],
    rating: 4.8,
    reviewCount: 2341,
    bestFor: ['Developers', 'Researchers', 'Writers'],
    affiliateLink: 'https://affiliate-placeholder.com/claude',
    logoUrl: '/logos/claude.png',
    lastUpdated: '2024-01-20',
    popularity: 95
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'agents',
    subcategory: 'research',
    description: 'AI-powered search and research tool that provides accurate, cited answers to complex questions.',
    pricing: {
      free: true,
      starter: 20,
      pro: null,
      enterprise: null
    },
    features: ['Real-time search', 'Source citations', 'Follow-up questions', 'Academic mode', 'Image analysis', 'Mobile app'],
    pros: ['Accurate citations', 'Real-time information', 'Clean interface'],
    cons: ['Limited free queries', 'Subscription required for heavy use'],
    rating: 4.5,
    reviewCount: 1876,
    bestFor: ['Students', 'Researchers', 'Journalists'],
    affiliateLink: 'https://affiliate-placeholder.com/perplexity',
    logoUrl: '/logos/perplexity.png',
    lastUpdated: '2024-01-19',
    popularity: 88
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'marketing',
    subcategory: 'visual-content',
    description: 'AI image generation tool for creating stunning artwork, marketing visuals, and creative content.',
    pricing: {
      free: false,
      starter: 10,
      pro: 30,
      enterprise: '60'
    },
    features: ['High-quality images', 'Style variations', 'Upscaling', 'Custom prompts', 'Community gallery', 'Commercial license'],
    pros: ['Exceptional image quality', 'Creative flexibility', 'Active community'],
    cons: ['No free tier', 'Discord-based interface', 'Learning curve'],
    rating: 4.7,
    reviewCount: 3421,
    bestFor: ['Designers', 'Marketers', 'Content creators'],
    affiliateLink: 'https://affiliate-placeholder.com/midjourney',
    logoUrl: '/logos/midjourney.png',
    lastUpdated: '2024-01-17',
    popularity: 92
  },
  {
    id: 'runway',
    name: 'Runway ML',
    category: 'marketing',
    subcategory: 'visual-content',
    description: 'AI-powered video editing and generation platform for creating professional video content.',
    pricing: {
      free: true,
      starter: 15,
      pro: 35,
      enterprise: '76'
    },
    features: ['Video generation', 'AI editing tools', 'Green screen removal', 'Motion tracking', 'Style transfer', 'Collaboration tools'],
    pros: ['Cutting-edge video AI', 'Professional features', 'Regular updates'],
    cons: ['Resource intensive', 'Steep learning curve', 'Credit-based pricing'],
    rating: 4.4,
    reviewCount: 1234,
    bestFor: ['Video creators', 'Marketing teams', 'Filmmakers'],
    affiliateLink: 'https://affiliate-placeholder.com/runway',
    logoUrl: '/logos/runway.png',
    lastUpdated: '2024-01-16',
    popularity: 81
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    category: 'marketing',
    subcategory: 'content-creation',
    description: 'AI writing assistant for creating marketing copy, blog posts, and social media content.',
    pricing: {
      free: true,
      starter: 16,
      pro: 33,
      enterprise: null
    },
    features: ['AI article writer', 'Ad copy generator', 'Social media posts', 'Email templates', 'SEO optimization', 'Brand voice'],
    pros: ['Versatile templates', 'Good value for money', 'SEO features'],
    cons: ['Quality varies', 'Limited customization', 'Credit system'],
    rating: 4.2,
    reviewCount: 2156,
    bestFor: ['Small businesses', 'Marketers', 'Agencies'],
    affiliateLink: 'https://affiliate-placeholder.com/writesonic',
    logoUrl: '/logos/writesonic.png',
    lastUpdated: '2024-01-14',
    popularity: 79
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'automation',
    subcategory: 'workflow',
    description: 'Open-source workflow automation tool that connects different services and automates tasks.',
    pricing: {
      free: true,
      starter: 20,
      pro: 50,
      enterprise: null
    },
    features: ['Visual workflow builder', '400+ integrations', 'Self-hosted option', 'Custom nodes', 'Webhook support', 'Conditional logic'],
    pros: ['Open source', 'Highly customizable', 'Strong community'],
    cons: ['Technical setup required', 'Learning curve', 'Limited support on free tier'],
    rating: 4.5,
    reviewCount: 987,
    bestFor: ['Developers', 'Technical teams', 'SMBs'],
    affiliateLink: 'https://affiliate-placeholder.com/n8n',
    logoUrl: '/logos/n8n.png',
    lastUpdated: '2024-01-12',
    popularity: 73
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'agents',
    subcategory: 'coding',
    description: 'AI-powered code editor that helps developers write, edit, and debug code faster.',
    pricing: {
      free: true,
      starter: 20,
      pro: null,
      enterprise: null
    },
    features: ['AI code completion', 'Chat with codebase', 'Code generation', 'Bug fixing', 'Refactoring', 'Multi-language support'],
    pros: ['Excellent code understanding', 'Fast performance', 'Great UX'],
    cons: ['Limited to coding', 'Subscription for advanced features'],
    rating: 4.8,
    reviewCount: 1543,
    bestFor: ['Developers', 'Software teams', 'Freelancers'],
    affiliateLink: 'https://affiliate-placeholder.com/cursor',
    logoUrl: '/logos/cursor.png',
    lastUpdated: '2024-01-21',
    popularity: 89
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'marketing',
    subcategory: 'web-design',
    description: 'AI-powered website builder and design tool for creating professional websites without coding.',
    pricing: {
      free: true,
      starter: 5,
      pro: 15,
      enterprise: null
    },
    features: ['AI website generation', 'Responsive design', 'CMS integration', 'Custom domains', 'SEO optimization', 'Analytics'],
    pros: ['Beautiful designs', 'No-code approach', 'Fast deployment'],
    cons: ['Limited customization', 'Template-based', 'Hosting dependency'],
    rating: 4.6,
    reviewCount: 2876,
    bestFor: ['Designers', 'Small businesses', 'Startups'],
    affiliateLink: 'https://affiliate-placeholder.com/framer',
    logoUrl: '/logos/framer.png',
    lastUpdated: '2024-01-13',
    popularity: 84
  },
  {
    id: 'make',
    name: 'Make',
    category: 'automation',
    subcategory: 'workflow',
    description: 'Visual automation platform that connects apps and services to automate workflows without coding.',
    pricing: {
      free: true,
      starter: 9,
      pro: 16,
      enterprise: '29'
    },
    features: ['Visual workflow builder', '1000+ app integrations', 'Real-time execution', 'Error handling', 'Webhooks', 'Data transformation'],
    pros: ['User-friendly interface', 'Extensive integrations', 'Reliable execution'],
    cons: ['Can get expensive', 'Complex workflows need learning', 'Limited free tier'],
    rating: 4.6,
    reviewCount: 3247,
    bestFor: ['Small businesses', 'Marketing teams', 'Operations'],
    affiliateLink: 'https://affiliate-placeholder.com/make',
    logoUrl: '/logos/make.png',
    lastUpdated: '2024-01-22',
    popularity: 87
  },
  {
    id: 'adcreative',
    name: 'AdCreative.ai',
    category: 'marketing',
    subcategory: 'advertising',
    description: 'AI-powered ad creative generator that creates high-converting ad creatives for social media and display advertising.',
    pricing: {
      free: true,
      starter: 21,
      pro: 44,
      enterprise: '74'
    },
    features: ['AI ad generation', 'A/B testing insights', 'Brand customization', 'Multiple formats', 'Performance analytics', 'Creative scoring'],
    pros: ['High conversion rates', 'Time-saving automation', 'Data-driven insights'],
    cons: ['Limited free credits', 'Learning curve for optimization'],
    rating: 4.5,
    reviewCount: 1876,
    bestFor: ['Digital marketers', 'Agencies', 'E-commerce'],
    affiliateLink: 'https://affiliate-placeholder.com/adcreative',
    logoUrl: '/logos/adcreative.png',
    lastUpdated: '2024-01-23',
    popularity: 82
  },
  {
    id: 'arcards',
    name: 'Arcards.ai',
    category: 'marketing',
    subcategory: 'advertising',
    description: 'AI-powered platform for creating interactive and engaging ad cards and promotional content.',
    pricing: {
      free: true,
      starter: 15,
      pro: 35,
      enterprise: null
    },
    features: ['Interactive ad cards', 'Template library', 'Animation effects', 'Mobile optimization', 'Analytics tracking', 'Brand consistency'],
    pros: ['Engaging interactive content', 'Easy to use', 'Mobile-first design'],
    cons: ['Limited customization', 'Newer platform', 'Small template library'],
    rating: 4.2,
    reviewCount: 543,
    bestFor: ['Social media marketers', 'Small businesses', 'Content creators'],
    affiliateLink: 'https://affiliate-placeholder.com/arcards',
    logoUrl: '/logos/arcards.png',
    lastUpdated: '2024-01-20',
    popularity: 68
  },
  {
    id: 'aha-ads',
    name: 'Aha Ads',
    category: 'marketing',
    subcategory: 'advertising',
    description: 'AI-driven advertising platform that optimizes ad campaigns across multiple channels for maximum ROI.',
    pricing: {
      free: false,
      starter: 29,
      pro: 79,
      enterprise: '199'
    },
    features: ['Multi-channel optimization', 'Real-time bidding', 'Audience targeting', 'Campaign automation', 'ROI tracking', 'Creative testing'],
    pros: ['Excellent ROI optimization', 'Multi-platform support', 'Advanced targeting'],
    cons: ['No free tier', 'Complex setup', 'Requires ad spend budget'],
    rating: 4.4,
    reviewCount: 892,
    bestFor: ['Performance marketers', 'Large businesses', 'Ad agencies'],
    affiliateLink: 'https://affiliate-placeholder.com/aha-ads',
    logoUrl: '/logos/aha-ads.png',
    lastUpdated: '2024-01-21',
    popularity: 75
  },
  {
    id: 'buildyourstore',
    name: 'BuildYourStore',
    category: 'marketing',
    subcategory: 'ecommerce',
    description: 'AI-powered eCommerce store builder that creates optimized online stores with automated product research and setup.',
    pricing: {
      free: true,
      starter: 29,
      pro: 79,
      enterprise: '199'
    },
    features: ['AI store generation', 'Product research', 'SEO optimization', 'Payment integration', 'Inventory management', 'Marketing automation'],
    pros: ['Quick store setup', 'Built-in product research', 'SEO-optimized'],
    cons: ['Limited customization', 'Monthly fees', 'Learning curve'],
    rating: 4.3,
    reviewCount: 1234,
    bestFor: ['Dropshippers', 'New entrepreneurs', 'Small businesses'],
    affiliateLink: 'https://affiliate-placeholder.com/buildyourstore',
    logoUrl: '/logos/buildyourstore.png',
    lastUpdated: '2024-01-24',
    popularity: 76
  },
  {
    id: 'zik-analytics',
    name: 'Zik Analytics',
    category: 'marketing',
    subcategory: 'ecommerce',
    description: 'AI-driven product research and market analysis tool for eBay and eCommerce sellers.',
    pricing: {
      free: true,
      starter: 29,
      pro: 59,
      enterprise: '99'
    },
    features: ['Product research', 'Market analysis', 'Competitor tracking', 'Profit calculator', 'Trend analysis', 'Supplier finder'],
    pros: ['Comprehensive data', 'eBay integration', 'Profitable product finder'],
    cons: ['Primarily eBay focused', 'Data can be overwhelming', 'Subscription required'],
    rating: 4.4,
    reviewCount: 2156,
    bestFor: ['eBay sellers', 'Product researchers', 'Dropshippers'],
    affiliateLink: 'https://affiliate-placeholder.com/zik-analytics',
    logoUrl: '/logos/zik-analytics.png',
    lastUpdated: '2024-01-25',
    popularity: 79
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'marketing',
    subcategory: 'ecommerce',
    description: 'Leading eCommerce platform with AI-powered features for building and scaling online stores.',
    pricing: {
      free: false,
      starter: 29,
      pro: 79,
      enterprise: '299'
    },
    features: ['Store builder', 'Payment processing', 'Inventory management', 'AI recommendations', 'App ecosystem', 'Multi-channel selling'],
    pros: ['Industry leader', 'Extensive app store', 'Scalable platform'],
    cons: ['Transaction fees', 'Can get expensive', 'Learning curve for advanced features'],
    rating: 4.6,
    reviewCount: 15432,
    bestFor: ['All business sizes', 'Serious sellers', 'Growing brands'],
    affiliateLink: 'https://affiliate-placeholder.com/shopify',
    logoUrl: '/logos/shopify.png',
    lastUpdated: '2024-01-26',
    popularity: 95
  },
  {
    id: 'autods',
    name: 'AutoDS',
    category: 'automation',
    subcategory: 'ecommerce',
    description: 'AI-powered dropshipping automation platform that handles product sourcing, pricing, and order fulfillment.',
    pricing: {
      free: true,
      starter: 7,
      pro: 17,
      enterprise: '77'
    },
    features: ['Product sourcing', 'Price monitoring', 'Order automation', 'Inventory sync', 'Supplier integration', 'Analytics dashboard'],
    pros: ['Full automation', 'Multiple supplier support', 'Affordable pricing'],
    cons: ['Dropshipping focused', 'Requires supplier accounts', 'Learning curve'],
    rating: 4.5,
    reviewCount: 3421,
    bestFor: ['Dropshippers', 'Amazon sellers', 'eBay sellers'],
    affiliateLink: 'https://affiliate-placeholder.com/autods',
    logoUrl: '/logos/autods.png',
    lastUpdated: '2024-01-27',
    popularity: 83
  },
  {
    id: 'manus-ai',
    name: 'Manus AI',
    category: 'agents',
    subcategory: 'content-creation',
    description: 'AI-powered writing assistant and content creation agent that helps with research, writing, and editing tasks.',
    pricing: {
      free: true,
      starter: 19,
      pro: 49,
      enterprise: null
    },
    features: ['AI writing assistance', 'Research automation', 'Content editing', 'Citation management', 'Multiple formats', 'Collaboration tools'],
    pros: ['Excellent writing quality', 'Research integration', 'User-friendly interface'],
    cons: ['Limited free tier', 'Newer platform', 'Learning curve for advanced features'],
    rating: 4.3,
    reviewCount: 876,
    bestFor: ['Writers', 'Researchers', 'Content creators'],
    affiliateLink: 'https://affiliate-placeholder.com/manus-ai',
    logoUrl: '/logos/manus-ai.png',
    lastUpdated: '2024-01-28',
    popularity: 72
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'automation',
    subcategory: 'workflow',
    description: 'All-in-one workspace with AI writing, planning, and organization features for entrepreneurs and teams.',
    pricing: {
      free: true,
      starter: 8,
      pro: 15,
      enterprise: null
    },
    features: ['AI writing assistant', 'Project management', 'Note-taking', 'Database creation', 'Team collaboration', 'Template library'],
    pros: ['Ultimate flexibility', 'AI-powered content', 'Great for startups', 'Scales with business'],
    cons: ['Learning curve', 'Can be overwhelming', 'AI features cost extra'],
    rating: 4.7,
    reviewCount: 12543,
    bestFor: ['Entrepreneurs', 'Startups', 'Remote teams'],
    affiliateLink: 'https://affiliate-placeholder.com/notion',
    logoUrl: '/logos/notion.png',
    lastUpdated: '2024-01-29',
    popularity: 94
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'marketing',
    subcategory: 'visual-content',
    description: 'AI-powered design platform for creating professional graphics, presentations, and marketing materials.',
    pricing: {
      free: true,
      starter: 15,
      pro: 45,
      enterprise: null
    },
    features: ['AI design suggestions', 'Brand kit', 'Template library', 'Photo editing', 'Video creation', 'Print services'],
    pros: ['Beginner-friendly', 'Professional results', 'Huge template library', 'AI magic tools'],
    cons: ['Limited advanced features', 'Subscription for best features', 'Can look template-y'],
    rating: 4.8,
    reviewCount: 25678,
    bestFor: ['Non-designers', 'Small businesses', 'Social media managers'],
    affiliateLink: 'https://affiliate-placeholder.com/canva',
    logoUrl: '/logos/canva.png',
    lastUpdated: '2024-01-30',
    popularity: 96
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'agents',
    subcategory: 'content-creation',
    description: 'AI writing assistant that helps entrepreneurs communicate professionally across all platforms.',
    pricing: {
      free: true,
      starter: 12,
      pro: 15,
      enterprise: null
    },
    features: ['Grammar checking', 'Tone detection', 'Plagiarism detection', 'Writing suggestions', 'Browser extension', 'Mobile keyboard'],
    pros: ['Essential for professional communication', 'Works everywhere', 'Improves credibility'],
    cons: ['Can be overly cautious', 'Premium features costly', 'Sometimes misses context'],
    rating: 4.6,
    reviewCount: 8934,
    bestFor: ['All entrepreneurs', 'Non-native speakers', 'Professional writers'],
    affiliateLink: 'https://affiliate-placeholder.com/grammarly',
    logoUrl: '/logos/grammarly.png',
    lastUpdated: '2024-01-31',
    popularity: 91
  },
  {
    id: 'calendly',
    name: 'Calendly',
    category: 'automation',
    subcategory: 'workflow',
    description: 'AI-powered scheduling tool that eliminates back-and-forth emails and automates meeting bookings.',
    pricing: {
      free: true,
      starter: 8,
      pro: 12,
      enterprise: '16'
    },
    features: ['Smart scheduling', 'Calendar integration', 'Automated reminders', 'Meeting preferences', 'Team scheduling', 'Analytics'],
    pros: ['Saves massive time', 'Professional impression', 'Integrates with everything'],
    cons: ['Limited customization on free plan', 'Can seem impersonal', 'Timezone confusion'],
    rating: 4.7,
    reviewCount: 6789,
    bestFor: ['Service providers', 'Consultants', 'Sales teams'],
    affiliateLink: 'https://affiliate-placeholder.com/calendly',
    logoUrl: '/logos/calendly.png',
    lastUpdated: '2024-02-01',
    popularity: 88
  },
  {
    id: 'loom',
    name: 'Loom',
    category: 'marketing',
    subcategory: 'content-creation',
    description: 'AI-powered video messaging tool for creating quick explanations, tutorials, and personal communications.',
    pricing: {
      free: true,
      starter: 8,
      pro: 16,
      enterprise: null
    },
    features: ['Screen recording', 'AI transcription', 'Video editing', 'Custom thumbnails', 'Analytics', 'Team libraries'],
    pros: ['Incredibly easy to use', 'Personal touch', 'Great for remote work', 'AI transcription'],
    cons: ['Limited editing features', 'Storage limits', 'Video quality limits on free'],
    rating: 4.8,
    reviewCount: 4567,
    bestFor: ['Remote teams', 'Customer support', 'Sales outreach'],
    affiliateLink: 'https://affiliate-placeholder.com/loom',
    logoUrl: '/logos/loom.png',
    lastUpdated: '2024-02-02',
    popularity: 85
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'automation',
    subcategory: 'workflow',
    description: 'AI-enhanced team communication platform with smart notifications and workflow automation.',
    pricing: {
      free: true,
      starter: 8,
      pro: 15,
      enterprise: '23'
    },
    features: ['AI search', 'Channel organization', 'App integrations', 'Workflow automation', 'Voice/video calls', 'File sharing'],
    pros: ['Essential for remote teams', 'Huge integration ecosystem', 'AI-powered search'],
    cons: ['Can be distracting', 'Notification overload', 'Expensive for large teams'],
    rating: 4.5,
    reviewCount: 18765,
    bestFor: ['Remote teams', 'Tech startups', 'Growing companies'],
    affiliateLink: 'https://affiliate-placeholder.com/slack',
    logoUrl: '/logos/slack.png',
    lastUpdated: '2024-02-03',
    popularity: 92
  },
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'automation',
    subcategory: 'workflow',
    description: 'AI-powered database and project management tool that combines spreadsheets with database functionality.',
    pricing: {
      free: true,
      starter: 20,
      pro: 45,
      enterprise: null
    },
    features: ['AI-powered insights', 'Custom databases', 'Automation rules', 'Form creation', 'API access', 'Team collaboration'],
    pros: ['Incredibly flexible', 'No-code database', 'Great for CRM', 'Scales well'],
    cons: ['Learning curve', 'Can get expensive', 'Complex for simple needs'],
    rating: 4.6,
    reviewCount: 7891,
    bestFor: ['Data-driven entrepreneurs', 'Project managers', 'Growing teams'],
    affiliateLink: 'https://affiliate-placeholder.com/airtable',
    logoUrl: '/logos/airtable.png',
    lastUpdated: '2024-02-04',
    popularity: 86
  }
];

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'marketing', label: 'AI Marketing' },
  { value: 'agents', label: 'AI Agents' },
  { value: 'automation', label: 'Automation' }
];

export const subcategories = [
  { value: 'all', label: 'All Subcategories' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'visual-content', label: 'Visual Content' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'advertising', label: 'Advertising' },
  { value: 'ecommerce', label: 'eCommerce' },
  { value: 'general-purpose', label: 'General Purpose' },
  { value: 'coding', label: 'Coding' },
  { value: 'research', label: 'Research' },
  { value: 'workflow', label: 'Workflow' }
];

export const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: 'free', label: 'Free Available' },
  { value: 'under-25', label: 'Under $25/mo' },
  { value: '25-100', label: '$25-100/mo' },
  { value: 'over-100', label: 'Over $100/mo' }
];

export const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' }
];
