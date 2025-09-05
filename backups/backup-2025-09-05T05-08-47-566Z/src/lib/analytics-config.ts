/**
 * Analytics Configuration - Centralized settings for all analytics tools
 * This file contains configuration for Google Analytics, newsletter tracking, and other analytics services
 */

export interface AnalyticsConfig {
  googleAnalytics: {
    measurementId: string;
    enableEnhancedMeasurement: boolean;
    enableDemographics: boolean;
    enableAdPersonalization: boolean;
  };
  newsletter: {
    provider: 'emailoctopus' | 'mailchimp' | 'convertkit';
    trackingEnabled: boolean;
    listId?: string;
  };
  performance: {
    enableCoreWebVitals: boolean;
    enableUserTiming: boolean;
    enableResourceTiming: boolean;
  };
  privacy: {
    respectDNT: boolean;
    anonymizeIP: boolean;
    cookieConsentRequired: boolean;
  };
}

// Default configuration
export const defaultAnalyticsConfig: AnalyticsConfig = {
  googleAnalytics: {
    measurementId: 'G-70SLYWY20D', // Your current GA4 ID
    enableEnhancedMeasurement: true,
    enableDemographics: true,
    enableAdPersonalization: true,
  },
  newsletter: {
    provider: 'emailoctopus',
    trackingEnabled: true,
    listId: import.meta.env.EMAILOCTOPUS_LIST_ID,
  },
  performance: {
    enableCoreWebVitals: true,
    enableUserTiming: true,
    enableResourceTiming: true,
  },
  privacy: {
    respectDNT: true,
    anonymizeIP: true,
    cookieConsentRequired: true,
  },
};

// Get current configuration
export function getAnalyticsConfig(): AnalyticsConfig {
  return {
    ...defaultAnalyticsConfig,
    googleAnalytics: {
      ...defaultAnalyticsConfig.googleAnalytics,
      measurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID || defaultAnalyticsConfig.googleAnalytics.measurementId,
    },
    newsletter: {
      ...defaultAnalyticsConfig.newsletter,
      listId: import.meta.env.EMAILOCTOPUS_LIST_ID || defaultAnalyticsConfig.newsletter.listId,
    },
  };
}

// Analytics event types for consistent tracking
export const AnalyticsEvents = {
  // Page engagement
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  
  // Content engagement
  ARTICLE_READ: 'article_read',
  ARTICLE_SHARE: 'article_share',
  CATEGORY_VIEW: 'category_view',
  SEARCH_QUERY: 'search_query',
  
  // Newsletter
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  NEWSLETTER_OPEN: 'newsletter_open',
  NEWSLETTER_CLICK: 'newsletter_click',
  
  // Advertising
  AD_VIEW: 'ad_view',
  AD_CLICK: 'ad_click',
  AD_CONVERSION: 'ad_conversion',
  
  // User behavior
  EXTERNAL_LINK: 'external_link',
  DOWNLOAD: 'file_download',
  VIDEO_ENGAGEMENT: 'video_engagement',
} as const;

// Custom dimensions for GA4
export const CustomDimensions = {
  ARTICLE_CATEGORY: 'dimension1',
  ARTICLE_AUTHOR: 'dimension2',
  ARTICLE_TYPE: 'dimension3',
  USER_ROLE: 'dimension4',
  CONTENT_ENGAGEMENT: 'dimension5',
} as const;

// Custom metrics for GA4
export const CustomMetrics = {
  SCROLL_DEPTH: 'metric1',
  TIME_ON_PAGE: 'metric2',
  ENGAGEMENT_SCORE: 'metric3',
} as const;
