/**
 * Ad Management System - Central hub for strategic ad placement and revenue optimization
 * Designed to avoid ad-blocker detection while maximizing revenue potential
 */

export interface AdSlotConfig {
  id: string;
  name: string; // Never use "Ad" in names
  size: '300x250' | '336x280' | '728x90' | '320x50' | '300x600' | '970x250' | '340x-flex';
  position: 'hero-sidebar' | 'article-top' | 'article-middle' | 'article-bottom' | 'category-sidebar' | 'footer-banner' | 'homepage-leaderboard' | 'homepage-sidebar-top' | 'homepage-sidebar-bottom';
  priority: 'premium' | 'high' | 'medium' | 'low';
  cpmRange: string;
  targeting: string[];
  fallbackContent?: string;
  isActive: boolean;
}

export interface RevenueConfig {
  displayRevenue: number; // Monthly target from display ads
  affiliateRevenue: number; // Monthly target from affiliate marketing
  partnerRevenue: number; // Monthly target from partner content
  newsletterRevenue: number; // Monthly target from newsletter monetization
}

export class AdManager {
  private static instance: AdManager;
  private adSlots: Map<string, AdSlotConfig> = new Map();
  private revenueTargets: RevenueConfig;
  private performanceData: Map<string, any> = new Map();

  private constructor() {
    this.revenueTargets = {
      displayRevenue: 2000, // $800-2000/month
      affiliateRevenue: 3000, // $1500-4000/month
      partnerRevenue: 1000, // $500-1500/month
      newsletterRevenue: 350   // $200-500/month
    };
    this.initializeAdSlots();
  }

  public static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager();
    }
    return AdManager.instance;
  }

  private initializeAdSlots(): void {
    // Hero premium placement - highest CPM slot
    this.addAdSlot({
      id: 'hero-premium-top',
      name: 'Hero Premium Spotlight',
      size: '300x250',
      position: 'hero-sidebar',
      priority: 'premium',
      cpmRange: '$20-30',
      targeting: ['ai-tools', 'entrepreneurs', 'saas', 'premium'],
      isActive: true
    });

    // Premium sidebar slots - highest CPM
    this.addAdSlot({
      id: 'premium-sidebar-1',
      name: 'Premium AI Tools Showcase',
      size: '300x250',
      position: 'hero-sidebar',
      priority: 'premium',
      cpmRange: '$15-25',
      targeting: ['ai-tools', 'saas', 'enterprise', 'productivity'],
      isActive: true
    });

    this.addAdSlot({
      id: 'premium-sidebar-2',
      name: 'Featured Solutions Hub',
      size: '300x250',
      position: 'category-sidebar',
      priority: 'premium',
      cpmRange: '$12-20',
      targeting: ['ai-software', 'business-tools', 'automation'],
      isActive: true
    });

    // Article placement slots
    this.addAdSlot({
      id: 'article-banner-top',
      name: 'Article Header Spotlight',
      size: '728x90',
      position: 'article-top',
      priority: 'high',
      cpmRange: '$10-18',
      targeting: ['ai-news', 'technology', 'innovation'],
      isActive: true
    });

    this.addAdSlot({
      id: 'article-content-middle',
      name: 'Content Integration Zone',
      size: '300x250',
      position: 'article-middle',
      priority: 'high',
      cpmRange: '$8-15',
      targeting: ['ai-tools', 'productivity', 'business'],
      isActive: true
    });

    // Mobile-optimized slots
    this.addAdSlot({
      id: 'mobile-banner',
      name: 'Mobile Solutions Bar',
      size: '320x50',
      position: 'article-bottom',
      priority: 'medium',
      cpmRange: '$5-12',
      targeting: ['mobile-ai', 'apps', 'tools'],
      isActive: true
    });

    // Homepage leaderboard - after category shortcuts
    this.addAdSlot({
      id: 'homepage-leaderboard',
      name: 'AI Journey Accelerator Banner',
      size: '728x90',
      position: 'homepage-leaderboard',
      priority: 'premium',
      cpmRange: '$15-25',
      targeting: ['ai-tools', 'entrepreneurs', 'business-growth', 'saas'],
      isActive: true
    });

    // Footer high-impact slot
    this.addAdSlot({
      id: 'footer-leaderboard',
      name: 'Partner Showcase Banner',
      size: '970x250',
      position: 'footer-banner',
      priority: 'high',
      cpmRange: '$12-22',
      targeting: ['enterprise-ai', 'business-solutions', 'partnerships'],
      isActive: true
    });

    // Homepage Sidebar Ad Slots - Custom dimensions for optimal layout
    this.addAdSlot({
      id: 'homepage-sidebar-top',
      name: 'Homepage Sidebar Top Partner',
      size: '340x-flex',
      position: 'homepage-sidebar-top',
      priority: 'premium',
      cpmRange: '$18-28',
      targeting: ['ai-tools', 'saas', 'enterprise', 'premium-partners'],
      fallbackContent: 'Premium AI Solutions - Partner With Us',
      isActive: true
    });

    this.addAdSlot({
      id: 'homepage-sidebar-bottom',
      name: 'Homepage Sidebar Bottom Partner',
      size: '340x-flex',
      position: 'homepage-sidebar-bottom',
      priority: 'high',
      cpmRange: '$12-20',
      targeting: ['ai-innovation', 'business-tools', 'technology-partners'],
      fallbackContent: 'AI Innovation Hub - Discover More',
      isActive: true
    });
  }

  public addAdSlot(config: AdSlotConfig): void {
    this.adSlots.set(config.id, config);
  }

  public getAdSlot(id: string): AdSlotConfig | undefined {
    return this.adSlots.get(id);
  }

  public getSlotsByPosition(position: string): AdSlotConfig[] {
    return Array.from(this.adSlots.values()).filter(slot => 
      slot.position === position && slot.isActive
    );
  }

  public getHomepageSidebarSlots(): AdSlotConfig[] {
    return Array.from(this.adSlots.values()).filter(slot => 
      (slot.position === 'homepage-sidebar-top' || slot.position === 'homepage-sidebar-bottom') && slot.isActive
    );
  }

  public getHighPerformingSlots(): AdSlotConfig[] {
    return Array.from(this.adSlots.values())
      .filter(slot => slot.priority === 'premium' || slot.priority === 'high')
      .sort((a, b) => this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority));
  }

  private getPriorityWeight(priority: string): number {
    const weights = { premium: 4, high: 3, medium: 2, low: 1 };
    return weights[priority as keyof typeof weights] || 1;
  }

  public generateAdCode(slotId: string, targeting?: string[]): string {
    const slot = this.getAdSlot(slotId);
    if (!slot) return '';

    const targetingString = targeting?.join(',') || slot.targeting.join(',');
    
    return `
      <!-- Strategic Content Placement: ${slot.name} -->
      <div class="content-spotlight" data-slot="${slotId}" data-targeting="${targetingString}">
        <div class="partner-label">Partner Content</div>
        <div class="content-area" data-size="${slot.size}">
          <!-- Revenue-optimized placement -->
        </div>
      </div>
    `;
  }

  public generateSidebarAdCode(position: 'homepage-sidebar-top' | 'homepage-sidebar-bottom', targeting?: string[]): string {
    const slots = this.getSlotsByPosition(position);
    const slot = slots[0]; // Get the first available slot for this position
    
    if (!slot) {
      // Fallback content if no ad slot is configured
      return `
        <div class="sidebar-partner-space ${position}" data-size="340x-flex">
          <div class="partner-placeholder">
            <div class="partner-icon">⭐</div>
            <h3 class="partner-title">Partner Space Available</h3>
            <p class="partner-description">Exclusive advertising opportunity for AI companies</p>
            <a href="/advertise" class="partner-cta">Partner With Us</a>
          </div>
        </div>
      `;
    }

    const targetingString = targeting?.join(',') || slot.targeting.join(',');
    
    return `
      <!-- Homepage Sidebar Partner Space: ${slot.name} -->
      <div class="sidebar-partner-space ${position}" data-slot="${slot.id}" data-targeting="${targetingString}" data-size="340x-flex">
        <div class="partner-label">${slot.fallbackContent || 'Partner Content'}</div>
        <div class="partner-content-area">
          <!-- Revenue-optimized sidebar placement -->
        </div>
      </div>
    `;
  }

  public trackPerformance(slotId: string, metrics: any): void {
    this.performanceData.set(slotId, {
      ...this.performanceData.get(slotId),
      ...metrics,
      lastUpdated: new Date().toISOString()
    });
  }

  public getRevenueProjection(): RevenueConfig & { total: number } {
    const total = Object.values(this.revenueTargets).reduce((sum, value) => sum + value, 0);
    return { ...this.revenueTargets, total };
  }

  public optimizeSlotPerformance(slotId: string): AdSlotConfig | null {
    const slot = this.getAdSlot(slotId);
    const performance = this.performanceData.get(slotId);
    
    if (!slot || !performance) return null;

    // Auto-optimization logic based on performance data
    if (performance.ctr < 0.5) {
      // Low CTR - adjust targeting or priority
      slot.targeting.push('high-intent', 'decision-makers');
    }

    if (performance.revenue < 100) {
      // Low revenue - try premium positioning
      slot.priority = 'premium';
    }

    return slot;
  }

  public getActiveSlots(): AdSlotConfig[] {
    return Array.from(this.adSlots.values()).filter(slot => slot.isActive);
  }

  public disableSlot(slotId: string): void {
    const slot = this.getAdSlot(slotId);
    if (slot) {
      slot.isActive = false;
    }
  }

  public enableSlot(slotId: string): void {
    const slot = this.getAdSlot(slotId);
    if (slot) {
      slot.isActive = true;
    }
  }
}

// Export singleton instance
export const adManager = AdManager.getInstance();

// Utility functions for ad-blocker evasion
export const AdBlockerEvasion = {
  // Generate random class names to avoid detection
  generateClassName: (): string => {
    const prefixes = ['content', 'feature', 'spotlight', 'showcase', 'partner', 'premium'];
    const suffixes = ['zone', 'area', 'section', 'block', 'container', 'widget'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}-${suffix}`;
  },

  // Generate ad-blocker friendly element IDs
  generateElementId: (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `content-${timestamp}-${random}`;
  },

  // Safe terminology for ad-related content
  getSafeTerms: () => ({
    ad: 'content',
    advertisement: 'partner showcase',
    banner: 'feature highlight',
    featured: 'partner content',
    promotion: 'featured solution'
  })
};

// Revenue tracking utilities
export const RevenueTracker = {
  trackClick: (slotId: string, revenue: number) => {
    adManager.trackPerformance(slotId, {
      clicks: (adManager.getAdSlot(slotId) as any)?.clicks + 1 || 1,
      revenue: revenue
    });
  },

  trackImpression: (slotId: string) => {
    adManager.trackPerformance(slotId, {
      impressions: (adManager.getAdSlot(slotId) as any)?.impressions + 1 || 1
    });
  },

  calculateCTR: (slotId: string): number => {
    const performance = adManager['performanceData'].get(slotId);
    if (!performance || !performance.impressions) return 0;
    return (performance.clicks / performance.impressions) * 100;
  }
};

// Sidebar Ad Management Utilities
export const SidebarAdManager = {
  // Get optimal ad dimensions for homepage sidebars
  getSidebarDimensions: () => ({
    width: '340px',
    height: 'flexible',
    minHeight: '200px',
    maxHeight: '400px'
  }),

  // Generate CSS for sidebar ad containers
  generateSidebarAdCSS: (position: 'top' | 'bottom') => `
    .sidebar-partner-space.${position === 'top' ? 'homepage-sidebar-top' : 'homepage-sidebar-bottom'} {
      width: 340px;
      min-height: 200px;
      max-height: 400px;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      border: 2px solid rgba(255, 193, 7, 0.3);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .sidebar-partner-space.${position === 'top' ? 'homepage-sidebar-top' : 'homepage-sidebar-bottom'}:hover {
      border-color: rgba(255, 193, 7, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 193, 7, 0.2);
    }
  `,

  // Validate sidebar ad dimensions
  validateSidebarAd: (width: number, height: number): boolean => {
    return width === 340 && height >= 200 && height <= 400;
  }
};
