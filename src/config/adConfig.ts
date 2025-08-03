/**
 * Centralized Ad Configuration System
 * Designed for easy management and future Sanity CMS integration
 */

export interface AdConfig {
  id: string;
  type: 'leaderboard' | 'sidebar' | 'hero' | 'inline' | 'banner';
  placement: string;
  active: boolean;
  priority: number;
  title: string;
  description: string;
  cta: string;
  ctaUrl: string;
  badge?: string;
  icon?: string;
  image?: string;
  dimensions: {
    width: number;
    height: number;
  };
  targeting?: {
    categories?: string[];
    pages?: string[];
    excludePages?: string[];
  };
  styling: {
    theme: 'gradient' | 'solid' | 'minimal';
    colors: {
      primary: string;
      secondary: string;
      accent?: string;
    };
    animation?: 'wave' | 'sparkle' | 'glow' | 'none';
  };
  analytics: {
    trackingId: string;
    eventCategory: string;
    eventAction: string;
  };
  schedule?: {
    startDate?: string;
    endDate?: string;
    timezone?: string;
  };
  revenue: {
    cpm: number;
    estimatedMonthlyRevenue: number;
    adNetwork?: string;
  };
}

// Current Ad Configurations
export const adConfigs: AdConfig[] = [
  {
    id: 'leaderboard-main',
    type: 'leaderboard',
    placement: 'homepage-after-shortcuts',
    active: true,
    priority: 1,
    title: 'Supercharge Your AI Journey',
    description: 'Discover premium AI tools that successful entrepreneurs use to scale their businesses',
    cta: 'Explore Now',
    ctaUrl: '#',
    badge: 'PREMIUM',
    icon: '⭐',
    dimensions: {
      width: 728,
      height: 90
    },
    targeting: {
      pages: ['/', '/marketing', '/business', '/ai-agents']
    },
    styling: {
      theme: 'gradient',
      colors: {
        primary: '#00c4ef',
        secondary: '#0056ef'
      },
      animation: 'wave'
    },
    analytics: {
      trackingId: 'leaderboard-main',
      eventCategory: 'ads',
      eventAction: 'click'
    },
    revenue: {
      cpm: 25,
      estimatedMonthlyRevenue: 800,
      adNetwork: 'direct'
    }
  },
  {
    id: 'hero-premium-top',
    type: 'hero',
    placement: 'hero-sidebar-top',
    active: true,
    priority: 2,
    title: 'Boost Your AI Workflow',
    description: 'Discover premium AI tools that successful entrepreneurs use to scale their businesses faster',
    cta: 'Explore Tools',
    ctaUrl: '#',
    badge: 'FEATURED',
    icon: '🚀',
    dimensions: {
      width: 300,
      height: 200
    },
    targeting: {
      pages: ['/']
    },
    styling: {
      theme: 'gradient',
      colors: {
        primary: '#00d4ff',
        secondary: '#0066ff'
      },
      animation: 'sparkle'
    },
    analytics: {
      trackingId: 'hero-premium-top',
      eventCategory: 'ads',
      eventAction: 'click'
    },
    revenue: {
      cpm: 30,
      estimatedMonthlyRevenue: 1200,
      adNetwork: 'direct'
    }
  },
  {
    id: 'sidebar-premium-spotlight',
    type: 'sidebar',
    placement: 'category-sidebar-top',
    active: true,
    priority: 3,
    title: 'AI Tool Spotlight',
    description: 'Featured premium AI tools for entrepreneurs',
    cta: 'Get Started',
    ctaUrl: '#',
    badge: 'FEATURED',
    icon: '💎',
    dimensions: {
      width: 300,
      height: 250
    },
    targeting: {
      categories: ['marketing', 'business', 'ai-agents', 'productivity', 'creative', 'ecommerce']
    },
    styling: {
      theme: 'gradient',
      colors: {
        primary: '#3b82f6',
        secondary: '#1d4ed8'
      },
      animation: 'glow'
    },
    analytics: {
      trackingId: 'sidebar-premium-spotlight',
      eventCategory: 'ads',
      eventAction: 'click'
    },
    revenue: {
      cpm: 20,
      estimatedMonthlyRevenue: 600,
      adNetwork: 'direct'
    }
  },
  {
    id: 'sidebar-newsletter-promo',
    type: 'sidebar',
    placement: 'category-sidebar-newsletter',
    active: true,
    priority: 4,
    title: 'AI Tools Weekly',
    description: 'Get the latest AI tools and trends delivered to your inbox',
    cta: 'Subscribe Free',
    ctaUrl: '#newsletter-signup',
    badge: 'FREE',
    icon: '📧',
    dimensions: {
      width: 300,
      height: 150
    },
    targeting: {
      categories: ['marketing', 'business', 'ai-agents', 'productivity', 'creative', 'ecommerce']
    },
    styling: {
      theme: 'gradient',
      colors: {
        primary: '#10b981',
        secondary: '#059669'
      },
      animation: 'none'
    },
    analytics: {
      trackingId: 'sidebar-newsletter-promo',
      eventCategory: 'newsletter',
      eventAction: 'subscribe'
    },
    revenue: {
      cpm: 0,
      estimatedMonthlyRevenue: 300, // Affiliate revenue potential
      adNetwork: 'affiliate'
    }
  },
  {
    id: 'sidebar-trending-news',
    type: 'sidebar',
    placement: 'category-sidebar-trending',
    active: true,
    priority: 5,
    title: 'Trending AI News',
    description: 'Stay updated with the latest AI developments',
    cta: 'Read More',
    ctaUrl: '/trending',
    icon: '📈',
    dimensions: {
      width: 300,
      height: 200
    },
    targeting: {
      categories: ['marketing', 'business', 'ai-agents', 'productivity', 'creative', 'ecommerce']
    },
    styling: {
      theme: 'minimal',
      colors: {
        primary: '#6366f1',
        secondary: '#4f46e5'
      },
      animation: 'none'
    },
    analytics: {
      trackingId: 'sidebar-trending-news',
      eventCategory: 'content',
      eventAction: 'click'
    },
    revenue: {
      cpm: 5,
      estimatedMonthlyRevenue: 200, // Native advertising potential
      adNetwork: 'native'
    }
  }
];

// Utility functions for ad management
export class AdManager {
  /**
   * Get ads by placement
   */
  static getAdsByPlacement(placement: string): AdConfig[] {
    return adConfigs
      .filter(ad => ad.placement === placement && ad.active)
      .sort((a, b) => a.priority - b.priority);
  }

  /**
   * Get ads by type
   */
  static getAdsByType(type: AdConfig['type']): AdConfig[] {
    return adConfigs
      .filter(ad => ad.type === type && ad.active)
      .sort((a, b) => a.priority - b.priority);
  }

  /**
   * Get ads for specific page/category
   */
  static getAdsForPage(pagePath: string, category?: string): AdConfig[] {
    return adConfigs.filter(ad => {
      if (!ad.active) return false;

      // Check if ad should be excluded from this page
      if (ad.targeting?.excludePages?.includes(pagePath)) return false;

      // Check page targeting
      if (ad.targeting?.pages && !ad.targeting.pages.includes(pagePath)) return false;

      // Check category targeting
      if (category && ad.targeting?.categories && !ad.targeting.categories.includes(category)) return false;

      return true;
    }).sort((a, b) => a.priority - b.priority);
  }

  /**
   * Get ad by ID
   */
  static getAdById(id: string): AdConfig | undefined {
    return adConfigs.find(ad => ad.id === id);
  }

  /**
   * Check if ad is currently scheduled to run
   */
  static isAdScheduled(ad: AdConfig): boolean {
    if (!ad.schedule) return true;

    const now = new Date();
    const startDate = ad.schedule.startDate ? new Date(ad.schedule.startDate) : null;
    const endDate = ad.schedule.endDate ? new Date(ad.schedule.endDate) : null;

    if (startDate && now < startDate) return false;
    if (endDate && now > endDate) return false;

    return true;
  }

  /**
   * Get total estimated monthly revenue
   */
  static getTotalEstimatedRevenue(): number {
    return adConfigs
      .filter(ad => ad.active)
      .reduce((total, ad) => total + ad.revenue.estimatedMonthlyRevenue, 0);
  }

  /**
   * Generate analytics tracking code
   */
  static generateTrackingCode(ad: AdConfig): string {
    return `
      gtag('event', '${ad.analytics.eventAction}', {
        'event_category': '${ad.analytics.eventCategory}',
        'event_label': '${ad.id}',
        'custom_parameter_1': '${ad.placement}',
        'custom_parameter_2': '${ad.type}'
      });
    `;
  }
}

// Export default configuration for easy access
export default adConfigs;
