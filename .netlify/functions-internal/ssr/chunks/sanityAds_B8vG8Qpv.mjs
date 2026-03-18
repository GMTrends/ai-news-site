let sanityClient = null;
let clientInitialized = false;
async function initializeSanityClient() {
  if (clientInitialized) return sanityClient;
  try {
    const { createClient } = await import("@sanity/client");
    sanityClient = createClient({
      projectId: "crtekmb2",
      dataset: "production",
      useCdn: false,
      apiVersion: "2024-01-01",
      token: void 0
      // Only for write operations
    });
    clientInitialized = true;
  } catch (error) {
    console.warn("Sanity client not available, falling back to local config");
    clientInitialized = true;
  }
  return sanityClient;
}
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
function convertSanityAdToConfig(sanityAd) {
  if (!sanityAd.id || !sanityAd.type || !sanityAd.placement) {
    throw new Error(`Invalid Sanity ad data: missing required fields (id: ${sanityAd.id}, type: ${sanityAd.type}, placement: ${sanityAd.placement})`);
  }
  const getDefaultDimensions = (type) => {
    switch (type) {
      case "leaderboard":
        return { width: 728, height: 90 };
      case "sidebar":
        return { width: 300, height: 250 };
      case "hero":
        return { width: 400, height: 300 };
      case "banner":
        return { width: 468, height: 60 };
      case "inline":
        return { width: 320, height: 100 };
      default:
        return { width: 300, height: 250 };
    }
  };
  const getDefaultStyling = (type) => {
    const baseColors = {
      primary: "#00c4ef",
      secondary: "#0056ef",
      accent: "#ffffff"
    };
    return {
      theme: "gradient",
      colors: baseColors,
      animation: type === "leaderboard" ? "wave" : "none"
    };
  };
  const getAnalytics = (sanityAd2) => {
    return {
      trackingId: sanityAd2.analytics?.trackingId || sanityAd2.id,
      eventCategory: sanityAd2.analytics?.eventCategory || "partner_content",
      eventAction: sanityAd2.analytics?.eventAction || "click"
    };
  };
  const getTargeting = (sanityAd2) => {
    const targeting = sanityAd2.targeting || {};
    return {
      categories: Array.isArray(targeting.categories) ? targeting.categories : [],
      pages: Array.isArray(targeting.pages) ? targeting.pages : [],
      excludePages: Array.isArray(targeting.excludePages) ? targeting.excludePages : []
    };
  };
  const getSchedule = (sanityAd2) => {
    if (!sanityAd2.schedule) return void 0;
    return {
      startDate: sanityAd2.schedule.startDate || void 0,
      endDate: sanityAd2.schedule.endDate || void 0,
      timezone: sanityAd2.schedule.timezone || "America/New_York"
    };
  };
  const getRevenue = (sanityAd2) => {
    return {
      cpm: sanityAd2.revenue?.cpm || 0,
      estimatedMonthlyRevenue: sanityAd2.revenue?.estimatedMonthlyRevenue || 0,
      adNetwork: sanityAd2.revenue?.adNetwork || "direct"
    };
  };
  const getStyling = (sanityAd2) => {
    const defaultStyling = getDefaultStyling(sanityAd2.type);
    const sanityStyling = sanityAd2.styling || {};
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
    active: sanityAd.active !== false,
    // Default to true if not explicitly false
    priority: sanityAd.priority || 10,
    title: sanityAd.title || "Partner Content",
    description: sanityAd.description || "Discover amazing AI tools for entrepreneurs",
    cta: sanityAd.cta || "Learn More",
    ctaUrl: sanityAd.ctaUrl || "#",
    badge: sanityAd.badge || void 0,
    icon: sanityAd.icon || "🚀",
    image: sanityAd.imageUrl || void 0,
    dimensions: sanityAd.dimensions || getDefaultDimensions(sanityAd.type),
    targeting: getTargeting(sanityAd),
    styling: getStyling(sanityAd),
    analytics: getAnalytics(sanityAd),
    schedule: getSchedule(sanityAd),
    revenue: getRevenue(sanityAd)
  };
}
class SanityAdManager {
  /**
   * Check if Sanity client is available
   */
  static async isAvailable() {
    const client = await initializeSanityClient();
    return client !== null;
  }
  /**
   * Fetch all active ads from Sanity
   */
  static async getAllAds() {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error("Sanity client not available");
    }
    try {
      const sanityAds = await client.fetch(adsQuery);
      return sanityAds.map(convertSanityAdToConfig);
    } catch (error) {
      console.error("Error fetching ads from Sanity:", error);
      return [];
    }
  }
  /**
   * Fetch ads by placement from Sanity
   */
  static async getAdsByPlacement(placement) {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error("Sanity client not available");
    }
    try {
      const sanityAds = await client.fetch(adsByPlacementQuery, { placement });
      return sanityAds.map(convertSanityAdToConfig);
    } catch (error) {
      console.error("Error fetching ads by placement from Sanity:", error);
      return [];
    }
  }
  /**
   * Fetch ads by type from Sanity
   */
  static async getAdsByType(type) {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error("Sanity client not available");
    }
    try {
      const sanityAds = await client.fetch(adsByTypeQuery, { type });
      return sanityAds.map(convertSanityAdToConfig);
    } catch (error) {
      console.error("Error fetching ads by type from Sanity:", error);
      return [];
    }
  }
  /**
   * Fetch ads for specific page/category from Sanity
   */
  static async getAdsForPage(pagePath, category) {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error("Sanity client not available");
    }
    try {
      const allAds = await this.getAllAds();
      return allAds.filter((ad) => {
        if (!ad.active) return false;
        if (ad.targeting?.excludePages?.includes(pagePath)) return false;
        if (ad.targeting?.pages && !ad.targeting.pages.includes(pagePath)) return false;
        if (ad.targeting?.categories?.includes("ai-news")) return false;
        if (category && ad.targeting?.categories && !ad.targeting.categories.includes(category)) return false;
        if (!this.isAdScheduled(ad)) return false;
        return true;
      }).sort((a, b) => a.priority - b.priority);
    } catch (error) {
      console.error("Error fetching ads for page from Sanity:", error);
      return [];
    }
  }
  /**
   * Fetch single ad by ID from Sanity
   */
  static async getAdById(id) {
    const client = await initializeSanityClient();
    if (!client) {
      throw new Error("Sanity client not available");
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
      return sanityAd ? convertSanityAdToConfig(sanityAd) : void 0;
    } catch (error) {
      console.error("Error fetching ad by ID from Sanity:", error);
      return void 0;
    }
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
   * Get total estimated monthly revenue from Sanity ads
   */
  static async getTotalEstimatedRevenue() {
    try {
      const ads = await this.getAllAds();
      return ads.filter((ad) => ad.active).reduce((total, ad) => total + ad.revenue.estimatedMonthlyRevenue, 0);
    } catch (error) {
      console.error("Error calculating total revenue from Sanity:", error);
      return 0;
    }
  }
  /**
   * Refresh ad cache (useful for development)
   */
  static async refreshCache() {
    if (!sanityClient) {
      throw new Error("Sanity client not available");
    }
    try {
      const freshClient = sanityClient.config({ useCdn: false });
      await freshClient.fetch(adsQuery);
    } catch (error) {
      console.error("Error refreshing ad cache:", error);
    }
  }
}
class HybridAdManager {
  /**
   * Get ads by placement (Sanity first, then local fallback)
   */
  static async getAdsByPlacement(placement) {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdsByPlacement(placement);
      } catch (error) {
        console.warn("Sanity fetch failed, falling back to local config:", error);
      }
    }
    const { AdManager } = await import("./adConfig_CXa8_-6N.mjs");
    return AdManager.getAdsByPlacement(placement);
  }
  /**
   * Get ads by type (Sanity first, then local fallback)
   */
  static async getAdsByType(type) {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdsByType(type);
      } catch (error) {
        console.warn("Sanity fetch failed, falling back to local config:", error);
      }
    }
    const { AdManager } = await import("./adConfig_CXa8_-6N.mjs");
    return AdManager.getAdsByType(type);
  }
  /**
   * Get ads for specific page/category (Sanity first, then local fallback)
   */
  static async getAdsForPage(pagePath, category) {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdsForPage(pagePath, category);
      } catch (error) {
        console.warn("Sanity fetch failed, falling back to local config:", error);
      }
    }
    const { AdManager } = await import("./adConfig_CXa8_-6N.mjs");
    return AdManager.getAdsForPage(pagePath, category);
  }
  /**
   * Get ad by ID (Sanity first, then local fallback)
   */
  static async getAdById(id) {
    if (await SanityAdManager.isAvailable()) {
      try {
        return await SanityAdManager.getAdById(id);
      } catch (error) {
        console.warn("Sanity fetch failed, falling back to local config:", error);
      }
    }
    const { AdManager } = await import("./adConfig_CXa8_-6N.mjs");
    return AdManager.getAdById(id);
  }
}
export {
  HybridAdManager,
  SanityAdManager,
  HybridAdManager as default
};
