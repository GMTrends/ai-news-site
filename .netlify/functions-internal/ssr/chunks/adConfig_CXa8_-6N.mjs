const adConfigs = [
  {
    id: "leaderboard-main",
    type: "leaderboard",
    placement: "homepage-after-shortcuts",
    active: true,
    priority: 1,
    title: "Supercharge Your AI Journey",
    description: "Discover premium AI tools that successful entrepreneurs use to scale their businesses",
    cta: "Explore Now",
    ctaUrl: "#",
    badge: "PREMIUM",
    icon: "⭐",
    dimensions: {
      width: 728,
      height: 90
    },
    targeting: {
      pages: ["/", "/marketing", "/business", "/ai-agents"]
    },
    styling: {
      theme: "gradient",
      colors: {
        primary: "#00c4ef",
        secondary: "#0056ef"
      },
      animation: "wave"
    },
    analytics: {
      trackingId: "leaderboard-main",
      eventCategory: "ads",
      eventAction: "click"
    },
    revenue: {
      cpm: 25,
      estimatedMonthlyRevenue: 800,
      adNetwork: "direct"
    }
  },
  {
    id: "hero-premium-top",
    type: "hero",
    placement: "hero-sidebar-top",
    active: true,
    priority: 2,
    title: "Boost Your AI Workflow",
    description: "Premium flexible hero ad - responsive width, optimized for sidebar integration",
    cta: "Explore Tools",
    ctaUrl: "#",
    badge: "FEATURED",
    icon: "🚀",
    dimensions: {
      width: 300,
      // Standard sidebar width (was 'flexible')
      height: 150
      // Adjusted height for better content fit
    },
    targeting: {
      pages: ["/"]
    },
    styling: {
      theme: "gradient",
      colors: {
        primary: "#00d4ff",
        secondary: "#0066ff"
      },
      animation: "sparkle"
    },
    analytics: {
      trackingId: "hero-premium-top",
      eventCategory: "ads",
      eventAction: "click"
    },
    revenue: {
      cpm: 30,
      estimatedMonthlyRevenue: 1200,
      adNetwork: "direct"
    }
  },
  {
    id: "sidebar-premium-spotlight",
    type: "sidebar",
    placement: "category-sidebar-top",
    active: true,
    priority: 3,
    title: "AI Tool Spotlight",
    description: "Featured premium AI tools for entrepreneurs",
    cta: "Get Started",
    ctaUrl: "#",
    badge: "FEATURED",
    icon: "💎",
    dimensions: {
      width: 300,
      height: 280
      // Adjusted height for better content fit
    },
    targeting: {
      categories: ["marketing", "business", "ai-agents", "productivity", "creative", "ecommerce"]
    },
    styling: {
      theme: "gradient",
      colors: {
        primary: "#3b82f6",
        secondary: "#1d4ed8"
      },
      animation: "glow"
    },
    analytics: {
      trackingId: "sidebar-premium-spotlight",
      eventCategory: "ads",
      eventAction: "click"
    },
    revenue: {
      cpm: 20,
      estimatedMonthlyRevenue: 600,
      adNetwork: "direct"
    }
  },
  {
    id: "sidebar-newsletter-promo",
    type: "sidebar",
    placement: "category-sidebar-newsletter",
    active: true,
    priority: 4,
    title: "AI Tools Weekly",
    description: "Get the latest AI tools and trends delivered to your inbox",
    cta: "Subscribe Free",
    ctaUrl: "#newsletter-signup",
    badge: "FREE",
    icon: "📧",
    dimensions: {
      width: 300,
      height: 180
      // Adjusted height for better content fit
    },
    targeting: {
      categories: ["marketing", "business", "ai-agents", "productivity", "creative", "ecommerce"]
    },
    styling: {
      theme: "gradient",
      colors: {
        primary: "#10b981",
        secondary: "#059669"
      },
      animation: "none"
    },
    analytics: {
      trackingId: "sidebar-newsletter-promo",
      eventCategory: "newsletter",
      eventAction: "subscribe"
    },
    revenue: {
      cpm: 0,
      estimatedMonthlyRevenue: 300,
      // Affiliate revenue potential
      adNetwork: "affiliate"
    }
  },
  {
    id: "sidebar-trending-news",
    type: "sidebar",
    placement: "category-sidebar-trending",
    active: true,
    priority: 5,
    title: "Trending AI News",
    description: "Stay updated with the latest AI developments",
    cta: "Read More",
    ctaUrl: "/trending",
    icon: "📈",
    dimensions: {
      width: 300,
      height: 230
      // Adjusted height for better content fit
    },
    targeting: {
      categories: ["marketing", "business", "ai-agents", "productivity", "creative", "ecommerce"]
    },
    styling: {
      theme: "minimal",
      colors: {
        primary: "#6366f1",
        secondary: "#4f46e5"
      },
      animation: "none"
    },
    analytics: {
      trackingId: "sidebar-trending-news",
      eventCategory: "content",
      eventAction: "click"
    },
    revenue: {
      cpm: 5,
      estimatedMonthlyRevenue: 200,
      // Native advertising potential
      adNetwork: "native"
    }
  },
  {
    id: "sidebar-general-ad",
    type: "sidebar",
    placement: "category-sidebar-general",
    active: true,
    priority: 6,
    // Lower priority than existing sidebar ads
    title: "Discover More AI Tools",
    description: "Explore a curated selection of AI solutions for your needs.",
    cta: "Explore Now",
    ctaUrl: "#",
    badge: "NEW",
    icon: "💡",
    dimensions: {
      width: 300,
      height: 180
    },
    targeting: {
      categories: ["business", "ai-agents", "productivity", "creative", "ecommerce"]
    },
    styling: {
      theme: "solid",
      colors: {
        primary: "#34495e",
        // Subtle dark grey
        secondary: "#2c3e50"
        // Slightly darker grey
      },
      animation: "none"
    },
    analytics: {
      trackingId: "sidebar-general-ad",
      eventCategory: "ads",
      eventAction: "click"
    },
    revenue: {
      cpm: 10,
      estimatedMonthlyRevenue: 400,
      adNetwork: "internal"
    }
  },
  {
    id: "sidebar-bottom-gradient-ad",
    type: "sidebar",
    placement: "category-sidebar-bottom",
    active: true,
    priority: 7,
    // Lower priority than general ad
    title: "Unlock Your AI Potential",
    description: "Premium insights and exclusive offers await you.",
    cta: "Get Access",
    ctaUrl: "#",
    badge: "EXCLUSIVE",
    icon: "🚀",
    dimensions: {
      width: 300,
      height: 200
    },
    targeting: {
      categories: ["marketing", "business", "ai-agents", "productivity", "creative", "ecommerce"]
    },
    styling: {
      theme: "gradient",
      colors: {
        primary: "#6a11cb",
        // Purple
        secondary: "#2575fc"
        // Blue
      },
      animation: "glow"
    },
    analytics: {
      trackingId: "sidebar-bottom-gradient-ad",
      eventCategory: "ads",
      eventAction: "click"
    },
    revenue: {
      cpm: 15,
      estimatedMonthlyRevenue: 500,
      adNetwork: "internal"
    }
  }
];
class AdManager {
  /**
   * Get ads by placement
   */
  static getAdsByPlacement(placement) {
    return adConfigs.filter((ad) => ad.placement === placement && ad.active).sort((a, b) => a.priority - b.priority);
  }
  /**
   * Get ads by type
   */
  static getAdsByType(type) {
    return adConfigs.filter((ad) => ad.type === type && ad.active).sort((a, b) => a.priority - b.priority);
  }
  /**
   * Get ads for specific page/category
   */
  static getAdsForPage(pagePath, category) {
    return adConfigs.filter((ad) => {
      if (!ad.active) return false;
      if (ad.targeting?.excludePages?.includes(pagePath)) return false;
      if (ad.targeting?.pages && !ad.targeting.pages.includes(pagePath)) return false;
      if (category && ad.targeting?.categories && !ad.targeting.categories.includes(category)) return false;
      return true;
    }).sort((a, b) => a.priority - b.priority);
  }
  /**
   * Get ad by ID
   */
  static getAdById(id) {
    return adConfigs.find((ad) => ad.id === id);
  }
  /**
   * Check if ad is currently scheduled to run
   */
  static isAdScheduled(ad) {
    if (!ad.schedule) return true;
    const now = /* @__PURE__ */ new Date();
    const startDate = ad.schedule.startDate ? new Date(ad.schedule.startDate) : null;
    const endDate = ad.schedule.endDate ? new Date(ad.schedule.endDate) : null;
    if (startDate && now < startDate) return false;
    if (endDate && now > endDate) return false;
    return true;
  }
  /**
   * Get total estimated monthly revenue
   */
  static getTotalEstimatedRevenue() {
    return adConfigs.filter((ad) => ad.active).reduce((total, ad) => total + ad.revenue.estimatedMonthlyRevenue, 0);
  }
  /**
   * Generate analytics tracking code
   */
  static generateTrackingCode(ad) {
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
export {
  AdManager,
  adConfigs,
  adConfigs as default
};
