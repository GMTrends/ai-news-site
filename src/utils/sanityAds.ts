/**
 * Sanity CMS Integration for Ads
 * Fetches ad configurations from Sanity and converts them to AdConfig format
 */

import type { AdConfig } from '../config/adConfig';

// Sanity client configuration (you'll need to set up your Sanity client)
// This is a placeholder - replace with your actual Sanity client setup
let sanityClient: any = null;
let clientInitialized = false;

// Lazy initialization function for Sanity client
async function initializeSanityClient() {
  if (clientInitialized) return sanityClient;
  
  try {
    // Import Sanity client if available
    const { createClient } = await import('@sanity/client');
    
    sanityClient = createClient({
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'crtekmb2',
      dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
      useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true' || false,
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
      token: import.meta.env.VITE_SANITY_TOKEN, // Only for write operations
    });
    clientInitialized = true;
  } catch (error) {
    console.warn('Sanity client not available, falling back to local config');
    clientInitialized = true; // Mark as initialized even if failed
  }
  
  return sanityClient;
}

// GROQ query to fetch all active ads
const adsQuery = `
  *[_type == "ad" && active == true] | order(priority asc) {
    id,
    title,
    description,
    active,
    priority,
    type,
    placement,
    cta,
    ctaUrl,
    badge,
    icon,
    "imageUrl": image.asset->url,
    dimensions,
    targeting,
    styling,
    analytics,
    schedule,
    revenue,
    _updatedAt
  }
`;

// GROQ query to fetch ads by placement
const adsByPlacementQuery = `
  *[_type == "ad" && active == true && placement == $placement] | order(priority asc) {
    id,
    title,
    description,
    active,
    priority,
    type,
    placement,
    cta,
    ctaUrl,
    badge,
    icon,
    "imageUrl": image.asset->url,
    dimensions,
    targeting,
    styling,
    analytics,
    schedule,
    revenue,
    _updatedAt
  }
`;

// GROQ query to fetch ads by type
const adsByTypeQuery = `
  *[_type == "ad" && active == true && type == $type] | order(priority asc) {
    id,
    title,
    description,
    active,
    priority,
    type,
    placement,
    cta,
    ctaUrl,
    badge,
    icon,
    "imageUrl": image.asset->url,
    dimensions,
    targeting,
    styling,
    analytics,
    schedule,
    revenue,
    _updatedAt
  }
`;

/**
 * Convert Sanity ad document to AdConfig format
 * Enhanced mapping with robust defaults and validation
 */
function convertSanityAdToConfig(sanityAd: any): AdConfig {
  // Validate required fields
  if (!sanityAd.id || !sanityAd.type || !sanityAd.placement) {
    throw new Error(`Invalid Sanity ad data: missing required fields (id: ${sanityAd.id}, type: ${sanityAd.type}, placement: ${sanityAd.placement})`);
  }

  // Map dimensions with type-specific defaults
  const getDefaultDimensions = (type: string) => {
    switch (type) {
      case 'leaderboard': return { width: 728, height: 90 };
      case 'sidebar': return { width: 300, height: 250 };
      case 'hero': return { width: 400, height: 300 };
      case 'banner': return { width: 468, height: 60 };
      case 'inline': return { width: 320, height: 100 };
      default: return { width: 300, height: 250 };
    }
  };

  // Map styling with enhanced defaults
  const getDefaultStyling = (type: string) => {
    const baseColors = {
      primary: '#00c4ef',
      secondary: '#0056ef',
      accent: '#ffffff'
    };
    
    return {
      theme: 'gradient' as const,
      colors: baseColors,
      animation: type === 'leaderboard' ? 'wave' as const : 'none' as const
    };
  };

  // Map analytics with proper defaults
  const getAnalytics = (sanityAd: any) => {
    return {
      trackingId: sanityAd.analytics?.trackingId || sanityAd.id,
      eventCategory: sanityAd.analytics?.eventCategory || 'partner_content',
      eventAction: sanityAd.analytics?.eventAction || 'click'
    };
  };

  // Map targeting with proper array handling
  const getTargeting = (sanityAd: any) => {
    const targeting = sanityAd.targeting || {};
    return {
      categories: Array.isArray(targeting.categories) ? targeting.categories : [],
      pages: Array.isArray(targeting.pages) ? targeting.pages : [],
      excludePages: Array.isArray(targeting.excludePages) ? targeting.excludePages : []
    };
  };

  // Map scheduling with proper date handling
  const getSchedule = (sanityAd: any) => {
    if (!sanityAd.schedule) return undefined;
    
    return {
      startDate: sanityAd.schedule.startDate || undefined,
      endDate: sanityAd.schedule.endDate || undefined,
      timezone: sanityAd.schedule.timezone || 'America/New_York'
    };
  };

  // Map revenue with proper defaults
  const getRevenue = (sanityAd: any) => {
    return {
      cpm: sanityAd.revenue?.cpm || 0,
      estimatedMonthlyRevenue: sanityAd.revenue?.estimatedMonthlyRevenue || 0,
      adNetwork: sanityAd.revenue?.adNetwork || 'direct'
    };
  };

  // Map styling with deep merge of defaults
  const getStyling = (sanityAd: any) => {
    const defaultStyling = getDefaultStyling(sanityAd.type);
    const sanityStyling = sanityAd.styling || {};
    
    return {
      theme: sanityStyling.theme || defaultStyling.theme,
      colors: {
        primary: sanityStyling.colors?.primary || defaultStyling.colors.primary,
        secondary: sanityStyling.colors?.secondary || defaultStyling.colors.secondary,
        accent: sanityStyling.colors?.accent || defaultStyling.colors.accent
      },
      animation: sanityStyling.animation || defaultStyling.animation
    };
  };

  return {
    id: sanityAd.id,
    type: sanityAd.type,
    placement: sanityAd.placement,
    active: sanityAd.active !== false, // Default to true if not explicitly false
    priority: sanityAd.priority || 10,
    title: sanityAd.title || 'Partner Content',
    description: sanityAd.description || 'Discover amazing AI tools for entrepreneurs',
    cta: sanityAd.cta || 'Learn More',
    ctaUrl: sanityAd.ctaUrl || '#',
    badge: sanityAd.badge || undefined,
    icon: sanityAd.icon || '🚀',
    image: sanityAd.imageUrl || undefined,
    dimensions: sanityAd.dimensions || getDefaultDimensions(sanityAd.type),
    targeting: getTargeting(sanityAd),
    styling: getStyling(sanityAd),
    analytics: getAnalytics(sanityAd),
    schedule: getSchedule(sanityAd),
    revenue: getRevenue(sanityAd)
  };
}

/**
 * Sanity Ad Manager - handles fetching ads from Sanity CMS
 */
export class SanityAdManager {
  /**
   * Check if Sanity client is available
   */
  static async isAvailable(): Promise<boolean> {
    const client = await initializeSanityClient();
    return client !== null;
  }

  /**
   * Fetch all active ads from Sanity
   */
  static async getAllAds(): Promise<AdConfig[]> {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error('Sanity client not available');
    }

    try {
      const sanityAds = await client.fetch(adsQuery);
      return sanityAds.map(convertSanityAdToConfig);
    } catch (error) {
      console.error('Error fetching ads from Sanity:', error);
      return [];
    }
  }

  /**
   * Fetch ads by placement from Sanity
   */
  static async getAdsByPlacement(placement: string): Promise<AdConfig[]> {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error('Sanity client not available');
    }

    try {
      const sanityAds = await client.fetch(adsByPlacementQuery, { placement });
      return sanityAds.map(convertSanityAdToConfig);
    } catch (error) {
      console.error('Error fetching ads by placement from Sanity:', error);
      return [];
    }
  }

  /**
   * Fetch ads by type from Sanity
   */
  static async getAdsByType(type: AdConfig['type']): Promise<AdConfig[]> {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error('Sanity client not available');
    }

    try {
      const sanityAds = await client.fetch(adsByTypeQuery, { type });
      return sanityAds.map(convertSanityAdToConfig);
    } catch (error) {
      console.error('Error fetching ads by type from Sanity:', error);
      return [];
    }
  }

  /**
   * Fetch ads for specific page/category from Sanity
   */
  static async getAdsForPage(pagePath: string, category?: string): Promise<AdConfig[]> {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error('Sanity client not available');
    }

    try {
      const allAds = await this.getAllAds();
      
      return allAds.filter(ad => {
        if (!ad.active) return false;

        // Check if ad should be excluded from this page
        if (ad.targeting?.excludePages?.includes(pagePath)) return false;

        // Check page targeting
        if (ad.targeting?.pages && !ad.targeting.pages.includes(pagePath)) return false;

        // Check category targeting, explicitly exclude 'ai-news'
        if (ad.targeting?.categories?.includes('ai-news')) return false;
        if (category && ad.targeting?.categories && !ad.targeting.categories.includes(category)) return false;

        // Check scheduling
        if (!this.isAdScheduled(ad)) return false;

        return true;
      }).sort((a, b) => a.priority - b.priority);
    } catch (error) {
      console.error('Error fetching ads for page from Sanity:', error);
      return [];
    }
  }

  /**
   * Fetch single ad by ID from Sanity
   */
  static async getAdById(id: string): Promise<AdConfig | undefined> {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error('Sanity client not available');
    }

    try {
      const query = `*[_type == "ad" && id == $id][0] {
        id,
        title,
        description,
        active,
        priority,
        type,
        placement,
        cta,
        ctaUrl,
        badge,
        icon,
        "imageUrl": image.asset->url,
        dimensions,
        targeting,
        styling,
        analytics,
        schedule,
        revenue,
        _updatedAt
      }`;
      
      const sanityAd = await client.fetch(query, { id });
      return sanityAd ? convertSanityAdToConfig(sanityAd) : undefined;
    } catch (error) {
      console.error('Error fetching ad by ID from Sanity:', error);
      return undefined;
    }
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
   * Get total estimated monthly revenue from Sanity ads
   */
  static async getTotalEstimatedRevenue(): Promise<number> {
    try {
      const ads = await this.getAllAds();
      return ads
        .filter(ad => ad.active)
        .reduce((total, ad) => total + ad.revenue.estimatedMonthlyRevenue, 0);
    } catch (error) {
      console.error('Error calculating total revenue from Sanity:', error);
      return 0;
    }
  }

  /**
   * Refresh ad cache (useful for development)
   */
  static async refreshCache(): Promise<void> {
    if (!sanityClient) {
      throw new Error('Sanity client not available');
    }

    try {
      // Force fresh fetch by disabling CDN temporarily
      const freshClient = sanityClient.config({ useCdn: false });
      await freshClient.fetch(adsQuery);
      // Ad cache refreshed successfully
    } catch (error) {
      console.error('Error refreshing ad cache:', error);
    }
  }
}

/**
 * Hybrid Ad Manager - uses Sanity if available, falls back to local config
 */
export class HybridAdManager {
  /**
   * Get ads by placement (Sanity first, then local fallback)
   */
  static async getAdsByPlacement(placement: string): Promise<AdConfig[]> {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdsByPlacement(placement);
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to local config:', error);
      }
    }

    // Fallback to local configuration
    const { AdManager } = await import('../config/adConfig');
    return AdManager.getAdsByPlacement(placement);
  }

  /**
   * Get ads by type (Sanity first, then local fallback)
   */
  static async getAdsByType(type: AdConfig['type']): Promise<AdConfig[]> {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdsByType(type);
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to local config:', error);
      }
    }

    // Fallback to local configuration
    const { AdManager } = await import('../config/adConfig');
    return AdManager.getAdsByType(type);
  }

  /**
   * Get ads for specific page/category (Sanity first, then local fallback)
   */
  static async getAdsForPage(pagePath: string, category?: string): Promise<AdConfig[]> {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdsForPage(pagePath, category);
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to local config:', error);
      }
    }

    // Fallback to local configuration
    const { AdManager } = await import('../config/adConfig');
    return AdManager.getAdsForPage(pagePath, category);
  }

  /**
   * Get ad by ID (Sanity first, then local fallback)
   */
  static async getAdById(id: string): Promise<AdConfig | undefined> {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdById(id);
      } catch (error) {
        console.warn('Sanity fetch failed, falling back to local config:', error);
      }
    }

    // Fallback to local configuration
    const { AdManager } = await import('../config/adConfig');
    return AdManager.getAdById(id);
  }
}

// Export the hybrid manager as default for easy usage
export default HybridAdManager;
