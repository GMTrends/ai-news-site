/**
 * Analytics Service - Centralized analytics tracking and reporting
 * Provides methods for tracking all metrics that advertisers need
 */

import { AnalyticsEvents, CustomDimensions, CustomMetrics } from './analytics-config';

export interface AnalyticsData {
  // Page performance
  pageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  
  // Content engagement
  topArticles: Array<{
    title: string;
    views: number;
    engagement: number;
    category: string;
  }>;
  
  // Audience demographics
  demographics: {
    ageRanges: Record<string, number>;
    gender: Record<string, number>;
    locations: Array<{
      country: string;
      city: string;
      visitors: number;
    }>;
    interests: Array<{
      category: string;
      affinity: number;
    }>;
  };
  
  // Newsletter metrics
  newsletter: {
    subscribers: number;
    openRate: number;
    clickRate: number;
    growthRate: number;
  };
  
  // Advertising performance
  advertising: {
    adImpressions: number;
    clickThroughRate: number;
    conversionRate: number;
    revenue: number;
  };
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  
  private constructor() {}
  
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }
  
  // Track page view with enhanced data
  public trackPageView(pageData: {
    title: string;
    url: string;
    category?: string;
    author?: string;
    publishDate?: string;
  }): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', AnalyticsEvents.PAGE_VIEW, {
        page_title: pageData.title,
        page_location: pageData.url,
        content_group1: pageData.category || 'General',
        content_group2: pageData.author || 'Unknown',
        custom_map: {
          [CustomDimensions.ARTICLE_CATEGORY]: pageData.category,
          [CustomDimensions.ARTICLE_AUTHOR]: pageData.author,
        },
      });
    }
  }
  
  // Track content engagement
  public trackContentEngagement(contentData: {
    type: 'article' | 'category' | 'newsletter';
    title: string;
    engagement: 'view' | 'read' | 'share' | 'download';
    value?: number;
  }): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'content_engagement', {
        event_category: 'content',
        event_label: contentData.title,
        content_type: contentData.type,
        engagement_type: contentData.engagement,
        value: contentData.value || 1,
        custom_map: {
          [CustomDimensions.CONTENT_ENGAGEMENT]: contentData.engagement,
        },
      });
    }
  }
  
  // Track newsletter signup
  public trackNewsletterSignup(source: string, category?: string): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', AnalyticsEvents.NEWSLETTER_SIGNUP, {
        event_category: 'conversion',
        event_label: 'Newsletter Subscription',
        signup_source: source,
        content_category: category,
        value: 1,
      });
    }
  }
  
  // Track advertising performance
  public trackAdPerformance(adData: {
    adId: string;
    placement: string;
    action: 'view' | 'click' | 'conversion';
    value?: number;
  }): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', `ad_${adData.action}`, {
        event_category: 'advertising',
        event_label: adData.adId,
        ad_placement: adData.placement,
        value: adData.value || 1,
      });
    }
  }
  
  // Track user behavior
  public trackUserBehavior(behaviorData: {
    action: 'search' | 'category_click' | 'external_link' | 'download';
    label: string;
    value?: number;
  }): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', behaviorData.action, {
        event_category: 'user_behavior',
        event_label: behaviorData.label,
        value: behaviorData.value || 1,
      });
    }
  }
  
  // Track scroll depth
  public trackScrollDepth(depth: number): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', AnalyticsEvents.SCROLL_DEPTH, {
        event_category: 'engagement',
        event_label: 'Scroll Depth',
        value: depth,
        custom_map: {
          [CustomMetrics.SCROLL_DEPTH]: depth,
        },
      });
    }
  }
  
  // Track time on page
  public trackTimeOnPage(timeInSeconds: number): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', AnalyticsEvents.TIME_ON_PAGE, {
        event_category: 'engagement',
        event_label: 'Time on Page',
        value: timeInSeconds,
        custom_map: {
          [CustomMetrics.TIME_ON_PAGE]: timeInSeconds,
        },
      });
    }
  }
  
  // Get analytics data for advertisers (placeholder - would integrate with GA4 API)
  public async getAnalyticsData(): Promise<AnalyticsData> {
    // This would integrate with Google Analytics 4 API to get real data
    // For now, returning mock data structure
    return {
      pageViews: 0,
      uniqueVisitors: 0,
      averageSessionDuration: 0,
      bounceRate: 0,
      topArticles: [],
      demographics: {
        ageRanges: {},
        gender: {},
        locations: [],
        interests: [],
      },
      newsletter: {
        subscribers: 0,
        openRate: 0,
        clickRate: 0,
        growthRate: 0,
      },
      advertising: {
        adImpressions: 0,
        clickThroughRate: 0,
        conversionRate: 0,
        revenue: 0,
      },
    };
  }
  
  // Get newsletter metrics
  public async getNewsletterMetrics(): Promise<{
    subscribers: number;
    openRate: number;
    clickRate: number;
    growthRate: number;
  }> {
    // This would integrate with your newsletter provider's API
    // For now, returning mock data
    return {
      subscribers: 0,
      openRate: 0,
      clickRate: 0,
      growthRate: 0,
    };
  }
  
  // Get content performance data
  public async getContentPerformance(): Promise<Array<{
    title: string;
    views: number;
    engagement: number;
    category: string;
  }>> {
    // This would integrate with GA4 API to get real content performance data
    return [];
  }
}

// Export singleton instance
export const analyticsService = AnalyticsService.getInstance();
