export interface SidebarConfig {
  newsletter: boolean;
  newsletterMessage?: string;
  adSpaces: number;
  customSections: string[];
  adTypes: string[];
  priority: 'high' | 'medium' | 'low';
}

export const sidebarConfigs: Record<string, SidebarConfig> = {
  'ai-news': {
    newsletter: false,
    adSpaces: 1,
    customSections: ['trending-topics', 'breaking-updates'],
    adTypes: ['brand-awareness'],
    priority: 'low'
  },
  'reviews': {
    newsletter: true,
    newsletterMessage: "🎯 Get exclusive AI tool reviews & discounts",
    adSpaces: 3,
    customSections: ['featured-reviews'],
    adTypes: ['tool-comparison', 'software-promotion', 'affiliate-product'],
    priority: 'high'
  },
  'ai-agents': {
    newsletter: true,
    newsletterMessage: "🤖 Stay ahead with cutting-edge AI agents",
    adSpaces: 2,
    customSections: ['trending-agents'],
    adTypes: ['platform-promotion', 'training-course'],
    priority: 'medium'
  },
  'tutorials': {
    newsletter: false,
    adSpaces: 1,
    customSections: ['learning-path', 'progress-tracker'],
    adTypes: ['educational-tools'],
    priority: 'low'
  },
  'business': {
    newsletter: true,
    newsletterMessage: "💼 Get business AI insights & case studies",
    adSpaces: 2,
    customSections: ['business-resources'],
    adTypes: ['b2b-solutions', 'enterprise-tools'],
    priority: 'medium'
  },
  'finance': {
    newsletter: true,
    newsletterMessage: "💰 Get AI trading tools & investment insights",
    adSpaces: 2,
    customSections: ['trading-tools'],
    adTypes: ['trading-platforms', 'investment-tools'],
    priority: 'medium'
  }
};

// Default config for unknown categories
export const defaultSidebarConfig: SidebarConfig = {
  newsletter: false,
  adSpaces: 1,
  customSections: ['related-articles'],
  adTypes: ['general'],
  priority: 'low'
};

export function getSidebarConfig(categorySlug: string): SidebarConfig {
  return sidebarConfigs[categorySlug] || defaultSidebarConfig;
} 