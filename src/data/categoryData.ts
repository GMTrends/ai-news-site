export interface CategoryData {
  slug: string;
  title: string;
  description: string;
  icon: string;
  toolsCount: number;
  lastUpdated: string;
  keywords: string[];
  metaDescription: string;
}

export const categoryData: Record<string, CategoryData> = {
  'productivity': {
    slug: 'productivity',
    title: 'AI Productivity & Automation',
    description: 'Discover AI-powered productivity tools, automation workflows, and efficiency systems. Learn how AI can streamline your work and boost performance.',
    icon: '⚡',
    toolsCount: 85,
    lastUpdated: 'Weekly',
    keywords: ['AI productivity', 'automation tools', 'workflow optimization', 'AI efficiency', 'business automation'],
    metaDescription: 'Discover AI-powered productivity tools, automation workflows, and efficiency systems. Learn how AI can streamline your work and boost performance.'
  },
  'marketing': {
    slug: 'marketing',
    title: 'AI Marketing & Growth',
    description: 'Explore cutting-edge AI marketing tools, growth strategies, and customer engagement solutions. Transform your marketing with intelligent automation.',
    icon: '📈',
    toolsCount: 72,
    lastUpdated: 'Weekly',
    keywords: ['AI marketing', 'growth tools', 'customer engagement', 'marketing automation', 'AI analytics'],
    metaDescription: 'Explore cutting-edge AI marketing tools, growth strategies, and customer engagement solutions. Transform your marketing with intelligent automation.'
  },
  'ecommerce': {
    slug: 'ecommerce',
    title: 'AI E-commerce & Sales',
    description: 'Revolutionize your online business with AI-powered e-commerce tools, sales optimization, and customer experience enhancement.',
    icon: '🛒',
    toolsCount: 68,
    lastUpdated: 'Weekly',
    keywords: ['AI ecommerce', 'sales optimization', 'customer experience', 'online business', 'AI retail'],
    metaDescription: 'Revolutionize your online business with AI-powered e-commerce tools, sales optimization, and customer experience enhancement.'
  },
  'creative': {
    slug: 'creative',
    title: 'AI Creative & Design',
    description: 'Unleash your creativity with AI-powered design tools, content generation, and artistic solutions. Create stunning visuals and content effortlessly.',
    icon: '🎨',
    toolsCount: 94,
    lastUpdated: 'Weekly',
    keywords: ['AI design', 'creative tools', 'content generation', 'AI art', 'design automation'],
    metaDescription: 'Unleash your creativity with AI-powered design tools, content generation, and artistic solutions. Create stunning visuals and content effortlessly.'
  },
  'business': {
    slug: 'business',
    title: 'AI Business Intelligence',
    description: 'Leverage AI for strategic business insights, data analysis, and decision-making. Transform your business operations with intelligent solutions.',
    icon: '💼',
    toolsCount: 56,
    lastUpdated: 'Weekly',
    keywords: ['AI business', 'business intelligence', 'data analysis', 'strategic insights', 'AI decision making'],
    metaDescription: 'Leverage AI for strategic business insights, data analysis, and decision-making. Transform your business operations with intelligent solutions.'
  },
  'ai-agents': {
    slug: 'ai-agents',
    title: 'AI Agents & Automation',
    description: 'Discover intelligent AI agents and autonomous systems that can handle complex tasks, workflows, and decision-making processes.',
    icon: '🤖',
    toolsCount: 43,
    lastUpdated: 'Weekly',
    keywords: ['AI agents', 'autonomous systems', 'intelligent automation', 'AI workflows', 'smart assistants'],
    metaDescription: 'Discover intelligent AI agents and autonomous systems that can handle complex tasks, workflows, and decision-making processes.'
  }
};

export function getCategoryData(slug: string): CategoryData | null {
  return categoryData[slug] || null;
}

export function getAllCategories(): CategoryData[] {
  return Object.values(categoryData);
}
