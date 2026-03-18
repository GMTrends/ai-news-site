var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { b as createAstro, d as createComponent, g as renderTemplate, e as addAttribute, m as maybeRenderHead, f as renderComponent, r as renderHead } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
/* empty css                                        */
import { AdManager as AdManager$1 } from "../../chunks/adConfig_CXa8_-6N.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
const _AdManager = class _AdManager {
  constructor() {
    __publicField(this, "adSlots", /* @__PURE__ */ new Map());
    __publicField(this, "revenueTargets");
    __publicField(this, "performanceData", /* @__PURE__ */ new Map());
    this.revenueTargets = {
      displayRevenue: 2e3,
      // $800-2000/month
      affiliateRevenue: 3e3,
      // $1500-4000/month
      partnerRevenue: 1e3,
      // $500-1500/month
      newsletterRevenue: 350
      // $200-500/month
    };
    this.initializeAdSlots();
  }
  static getInstance() {
    if (!_AdManager.instance) {
      _AdManager.instance = new _AdManager();
    }
    return _AdManager.instance;
  }
  initializeAdSlots() {
    this.addAdSlot({
      id: "hero-premium-top",
      name: "Hero Premium Spotlight",
      size: "300x250",
      position: "hero-sidebar",
      priority: "premium",
      cpmRange: "$20-30",
      targeting: ["ai-tools", "entrepreneurs", "saas", "premium"],
      isActive: true
    });
    this.addAdSlot({
      id: "premium-sidebar-1",
      name: "Premium AI Tools Showcase",
      size: "300x250",
      position: "hero-sidebar",
      priority: "premium",
      cpmRange: "$15-25",
      targeting: ["ai-tools", "saas", "enterprise", "productivity"],
      isActive: true
    });
    this.addAdSlot({
      id: "premium-sidebar-2",
      name: "Featured Solutions Hub",
      size: "300x250",
      position: "category-sidebar",
      priority: "premium",
      cpmRange: "$12-20",
      targeting: ["ai-software", "business-tools", "automation"],
      isActive: true
    });
    this.addAdSlot({
      id: "article-banner-top",
      name: "Article Header Spotlight",
      size: "728x90",
      position: "article-top",
      priority: "high",
      cpmRange: "$10-18",
      targeting: ["ai-news", "technology", "innovation"],
      isActive: true
    });
    this.addAdSlot({
      id: "article-content-middle",
      name: "Content Integration Zone",
      size: "300x250",
      position: "article-middle",
      priority: "high",
      cpmRange: "$8-15",
      targeting: ["ai-tools", "productivity", "business"],
      isActive: true
    });
    this.addAdSlot({
      id: "mobile-banner",
      name: "Mobile Solutions Bar",
      size: "320x50",
      position: "article-bottom",
      priority: "medium",
      cpmRange: "$5-12",
      targeting: ["mobile-ai", "apps", "tools"],
      isActive: true
    });
    this.addAdSlot({
      id: "homepage-leaderboard",
      name: "AI Journey Accelerator Banner",
      size: "728x90",
      position: "homepage-leaderboard",
      priority: "premium",
      cpmRange: "$15-25",
      targeting: ["ai-tools", "entrepreneurs", "business-growth", "saas"],
      isActive: true
    });
    this.addAdSlot({
      id: "footer-leaderboard",
      name: "Partner Showcase Banner",
      size: "970x250",
      position: "footer-banner",
      priority: "high",
      cpmRange: "$12-22",
      targeting: ["enterprise-ai", "business-solutions", "partnerships"],
      isActive: true
    });
    this.addAdSlot({
      id: "homepage-sidebar-top",
      name: "Homepage Sidebar Top Partner",
      size: "340x-flex",
      position: "homepage-sidebar-top",
      priority: "premium",
      cpmRange: "$18-28",
      targeting: ["ai-tools", "saas", "enterprise", "premium-partners"],
      fallbackContent: "Premium AI Solutions - Partner With Us",
      isActive: true
    });
    this.addAdSlot({
      id: "homepage-sidebar-bottom",
      name: "Homepage Sidebar Bottom Partner",
      size: "340x-flex",
      position: "homepage-sidebar-bottom",
      priority: "high",
      cpmRange: "$12-20",
      targeting: ["ai-innovation", "business-tools", "technology-partners"],
      fallbackContent: "AI Innovation Hub - Discover More",
      isActive: true
    });
  }
  addAdSlot(config) {
    this.adSlots.set(config.id, config);
  }
  getAdSlot(id) {
    return this.adSlots.get(id);
  }
  getSlotsByPosition(position) {
    return Array.from(this.adSlots.values()).filter(
      (slot) => slot.position === position && slot.isActive
    );
  }
  getHomepageSidebarSlots() {
    return Array.from(this.adSlots.values()).filter(
      (slot) => (slot.position === "homepage-sidebar-top" || slot.position === "homepage-sidebar-bottom") && slot.isActive
    );
  }
  getHighPerformingSlots() {
    return Array.from(this.adSlots.values()).filter((slot) => slot.priority === "premium" || slot.priority === "high").sort((a, b) => this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority));
  }
  getPriorityWeight(priority) {
    const weights = { premium: 4, high: 3, medium: 2, low: 1 };
    return weights[priority] || 1;
  }
  generateAdCode(slotId, targeting) {
    const slot = this.getAdSlot(slotId);
    if (!slot) return "";
    const targetingString = targeting?.join(",") || slot.targeting.join(",");
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
  generateSidebarAdCode(position, targeting) {
    const slots = this.getSlotsByPosition(position);
    const slot = slots[0];
    if (!slot) {
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
    const targetingString = targeting?.join(",") || slot.targeting.join(",");
    return `
      <!-- Homepage Sidebar Partner Space: ${slot.name} -->
      <div class="sidebar-partner-space ${position}" data-slot="${slot.id}" data-targeting="${targetingString}" data-size="340x-flex">
        <div class="partner-label">${slot.fallbackContent || "Partner Content"}</div>
        <div class="partner-content-area">
          <!-- Revenue-optimized sidebar placement -->
        </div>
      </div>
    `;
  }
  trackPerformance(slotId, metrics) {
    this.performanceData.set(slotId, {
      ...this.performanceData.get(slotId),
      ...metrics,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  getRevenueProjection() {
    const total = Object.values(this.revenueTargets).reduce((sum, value) => sum + value, 0);
    return { ...this.revenueTargets, total };
  }
  optimizeSlotPerformance(slotId) {
    const slot = this.getAdSlot(slotId);
    const performance = this.performanceData.get(slotId);
    if (!slot || !performance) return null;
    if (performance.ctr < 0.5) {
      slot.targeting.push("high-intent", "decision-makers");
    }
    if (performance.revenue < 100) {
      slot.priority = "premium";
    }
    return slot;
  }
  getActiveSlots() {
    return Array.from(this.adSlots.values()).filter((slot) => slot.isActive);
  }
  disableSlot(slotId) {
    const slot = this.getAdSlot(slotId);
    if (slot) {
      slot.isActive = false;
    }
  }
  enableSlot(slotId) {
    const slot = this.getAdSlot(slotId);
    if (slot) {
      slot.isActive = true;
    }
  }
};
__publicField(_AdManager, "instance");
let AdManager = _AdManager;
const adManager = AdManager.getInstance();
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro = createAstro("http://localhost:4321");
const $$RevenueAnalytics = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RevenueAnalytics;
  const {
    showDetailedMetrics = true,
    timeframe = "30d",
    className = ""
  } = Astro2.props;
  const revenueProjection = adManager.getRevenueProjection();
  adManager.getActiveSlots();
  adManager.getHighPerformingSlots();
  const currentProgress = {
    displayRevenue: 1200,
    // Current month so far
    affiliateRevenue: 2100,
    partnerRevenue: 650,
    newsletterRevenue: 280,
    totalRevenue: 4230
  };
  const progressPercentage = currentProgress.totalRevenue / revenueProjection.total * 100;
  const topSlots = [
    { id: "premium-sidebar-1", revenue: 850, ctr: 2.4, impressions: 35400 },
    { id: "article-banner-top", revenue: 620, ctr: 1.8, impressions: 34500 },
    { id: "premium-sidebar-2", revenue: 580, ctr: 2.1, impressions: 27600 },
    { id: "footer-leaderboard", revenue: 420, ctr: 1.5, impressions: 28e3 }
  ];
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", "<div", ' data-astro-cid-okxxo56y> <!-- Revenue Overview Header --> <div class="analytics-header" data-astro-cid-okxxo56y> <div class="header-content" data-astro-cid-okxxo56y> <h2 class="analytics-title" data-astro-cid-okxxo56y>Revenue Analytics Dashboard</h2> <div class="timeframe-selector" data-astro-cid-okxxo56y> <button class="timeframe-btn active" data-timeframe="7d" data-astro-cid-okxxo56y>7 Days</button> <button class="timeframe-btn" data-timeframe="30d" data-astro-cid-okxxo56y>30 Days</button> <button class="timeframe-btn" data-timeframe="90d" data-astro-cid-okxxo56y>90 Days</button> </div> </div> <div class="revenue-summary" data-astro-cid-okxxo56y> <div class="current-revenue" data-astro-cid-okxxo56y> <span class="revenue-amount" data-astro-cid-okxxo56y>$', '</span> <span class="revenue-label" data-astro-cid-okxxo56y>Current Month</span> </div> <div class="target-revenue" data-astro-cid-okxxo56y> <span class="target-amount" data-astro-cid-okxxo56y>$', '</span> <span class="target-label" data-astro-cid-okxxo56y>Monthly Target</span> </div> <div class="progress-indicator" data-astro-cid-okxxo56y> <div class="progress-bar" data-astro-cid-okxxo56y> <div class="progress-fill"', ' data-astro-cid-okxxo56y></div> </div> <span class="progress-text" data-astro-cid-okxxo56y>', '% Complete</span> </div> </div> </div> <!-- Revenue Breakdown Cards --> <div class="revenue-breakdown" data-astro-cid-okxxo56y> <div class="revenue-card display-ads" data-astro-cid-okxxo56y> <div class="card-header" data-astro-cid-okxxo56y> <h3 data-astro-cid-okxxo56y>Display Revenue</h3> <span class="revenue-icon" data-astro-cid-okxxo56y>📊</span> </div> <div class="card-metrics" data-astro-cid-okxxo56y> <div class="current-metric" data-astro-cid-okxxo56y> <span class="metric-value" data-astro-cid-okxxo56y>$', '</span> <span class="metric-change positive" data-astro-cid-okxxo56y>+18%</span> </div> <div class="target-metric" data-astro-cid-okxxo56y>\nTarget: $', ' </div> <div class="progress-mini" data-astro-cid-okxxo56y> <div class="progress-mini-fill"', ' data-astro-cid-okxxo56y></div> </div> </div> </div> <div class="revenue-card affiliate-revenue" data-astro-cid-okxxo56y> <div class="card-header" data-astro-cid-okxxo56y> <h3 data-astro-cid-okxxo56y>Affiliate Revenue</h3> <span class="revenue-icon" data-astro-cid-okxxo56y>🤝</span> </div> <div class="card-metrics" data-astro-cid-okxxo56y> <div class="current-metric" data-astro-cid-okxxo56y> <span class="metric-value" data-astro-cid-okxxo56y>$', '</span> <span class="metric-change positive" data-astro-cid-okxxo56y>+24%</span> </div> <div class="target-metric" data-astro-cid-okxxo56y>\nTarget: $', ' </div> <div class="progress-mini" data-astro-cid-okxxo56y> <div class="progress-mini-fill"', ' data-astro-cid-okxxo56y></div> </div> </div> </div> <div class="revenue-card partner-content" data-astro-cid-okxxo56y> <div class="card-header" data-astro-cid-okxxo56y> <h3 data-astro-cid-okxxo56y>Partner Content</h3> <span class="revenue-icon" data-astro-cid-okxxo56y>✨</span> </div> <div class="card-metrics" data-astro-cid-okxxo56y> <div class="current-metric" data-astro-cid-okxxo56y> <span class="metric-value" data-astro-cid-okxxo56y>$', '</span> <span class="metric-change positive" data-astro-cid-okxxo56y>+12%</span> </div> <div class="target-metric" data-astro-cid-okxxo56y>\nTarget: $', ' </div> <div class="progress-mini" data-astro-cid-okxxo56y> <div class="progress-mini-fill"', ' data-astro-cid-okxxo56y></div> </div> </div> </div> <div class="revenue-card newsletter-revenue" data-astro-cid-okxxo56y> <div class="card-header" data-astro-cid-okxxo56y> <h3 data-astro-cid-okxxo56y>Newsletter Revenue</h3> <span class="revenue-icon" data-astro-cid-okxxo56y>📧</span> </div> <div class="card-metrics" data-astro-cid-okxxo56y> <div class="current-metric" data-astro-cid-okxxo56y> <span class="metric-value" data-astro-cid-okxxo56y>$', '</span> <span class="metric-change positive" data-astro-cid-okxxo56y>+8%</span> </div> <div class="target-metric" data-astro-cid-okxxo56y>\nTarget: $', ' </div> <div class="progress-mini" data-astro-cid-okxxo56y> <div class="progress-mini-fill"', " data-astro-cid-okxxo56y></div> </div> </div> </div> </div> ", " </div> <script>\n  // Interactive functionality for the analytics dashboard\n  document.addEventListener('DOMContentLoaded', function() {\n    // Timeframe selector functionality\n    const timeframeBtns = document.querySelectorAll('.timeframe-btn');\n    timeframeBtns.forEach(function(btn) {\n      btn.addEventListener('click', function() {\n        timeframeBtns.forEach(function(b) { b.classList.remove('active'); });\n        btn.classList.add('active');\n        \n        // Here you would typically fetch new data based on timeframe\n        const timeframe = btn.getAttribute('data-timeframe');\n        console.log('Loading data for timeframe: ' + timeframe);\n        \n        // Simulate data refresh\n        updateAnalyticsData(timeframe || '30d');\n      });\n    });\n\n    // Real-time revenue tracking\n    function updateAnalyticsData(timeframe) {\n      // This would typically make an API call to get fresh data\n      const progressFill = document.querySelector('.progress-fill');\n      const progressText = document.querySelector('.progress-text');\n      \n      // Simulate slight progress increase\n      setTimeout(function() {\n        if (progressFill && progressText) {\n          const currentWidth = parseFloat(progressFill.style.width) || 66;\n          const newWidth = Math.min(currentWidth + Math.random() * 2, 100);\n          \n          progressFill.style.width = newWidth + '%';\n          progressText.textContent = Math.round(newWidth) + '% Complete';\n        }\n      }, 500);\n    }\n\n    // Auto-refresh analytics every 5 minutes\n    setInterval(function() {\n      updateAnalyticsData('current');\n    }, 300000);\n\n    // Track analytics page views\n    try {\n      if (window.gtag) {\n        window.gtag('event', 'analytics_view', {\n          'custom_parameter_1': 'revenue_dashboard',\n          'custom_parameter_2': 'admin_analytics'\n        });\n      }\n    } catch (e) {\n      console.log('Analytics tracking not available');\n    }\n  });\n<\/script> "])), maybeRenderHead(), addAttribute(`revenue-analytics ${className}`, "class"), currentProgress.totalRevenue.toLocaleString(), revenueProjection.total.toLocaleString(), addAttribute(`width: ${Math.min(progressPercentage, 100)}%`, "style"), Math.round(progressPercentage), currentProgress.displayRevenue, revenueProjection.displayRevenue, addAttribute(`width: ${currentProgress.displayRevenue / revenueProjection.displayRevenue * 100}%`, "style"), currentProgress.affiliateRevenue, revenueProjection.affiliateRevenue, addAttribute(`width: ${currentProgress.affiliateRevenue / revenueProjection.affiliateRevenue * 100}%`, "style"), currentProgress.partnerRevenue, revenueProjection.partnerRevenue, addAttribute(`width: ${currentProgress.partnerRevenue / revenueProjection.partnerRevenue * 100}%`, "style"), currentProgress.newsletterRevenue, revenueProjection.newsletterRevenue, addAttribute(`width: ${currentProgress.newsletterRevenue / revenueProjection.newsletterRevenue * 100}%`, "style"), showDetailedMetrics && renderTemplate`<div class="detailed-analytics" data-astro-cid-okxxo56y> <!-- Top Performing Slots --> <div class="performance-section" data-astro-cid-okxxo56y> <h3 class="section-title" data-astro-cid-okxxo56y>Top Performing Content Slots</h3> <div class="slots-table" data-astro-cid-okxxo56y> <div class="table-header" data-astro-cid-okxxo56y> <span data-astro-cid-okxxo56y>Slot Name</span> <span data-astro-cid-okxxo56y>Revenue</span> <span data-astro-cid-okxxo56y>CTR</span> <span data-astro-cid-okxxo56y>Impressions</span> <span data-astro-cid-okxxo56y>Status</span> </div> ${topSlots.map((slot) => {
    const slotConfig = adManager.getAdSlot(slot.id);
    return renderTemplate`<div class="table-row" data-astro-cid-okxxo56y> <span class="slot-name" data-astro-cid-okxxo56y>${slotConfig?.name || slot.id}</span> <span class="slot-revenue" data-astro-cid-okxxo56y>$${slot.revenue}</span> <span class="slot-ctr" data-astro-cid-okxxo56y>${slot.ctr}%</span> <span class="slot-impressions" data-astro-cid-okxxo56y>${slot.impressions.toLocaleString()}</span> <span class="slot-status active" data-astro-cid-okxxo56y>Active</span> </div>`;
  })} </div> </div> <!-- Optimization Recommendations --> <div class="optimization-section" data-astro-cid-okxxo56y> <h3 class="section-title" data-astro-cid-okxxo56y>Revenue Optimization Recommendations</h3> <div class="recommendations" data-astro-cid-okxxo56y> <div class="recommendation high-priority" data-astro-cid-okxxo56y> <div class="rec-icon" data-astro-cid-okxxo56y>🚀</div> <div class="rec-content" data-astro-cid-okxxo56y> <h4 data-astro-cid-okxxo56y>Increase Premium Sidebar Slots</h4> <p data-astro-cid-okxxo56y>Your sidebar slots are performing 40% above average. Consider adding more premium placements.</p> <span class="potential-revenue" data-astro-cid-okxxo56y>+$800/month potential</span> </div> </div> <div class="recommendation medium-priority" data-astro-cid-okxxo56y> <div class="rec-icon" data-astro-cid-okxxo56y>📈</div> <div class="rec-content" data-astro-cid-okxxo56y> <h4 data-astro-cid-okxxo56y>Optimize Article Middle Placement</h4> <p data-astro-cid-okxxo56y>A/B test different creative formats in article content areas for higher engagement.</p> <span class="potential-revenue" data-astro-cid-okxxo56y>+$400/month potential</span> </div> </div> <div class="recommendation medium-priority" data-astro-cid-okxxo56y> <div class="rec-icon" data-astro-cid-okxxo56y>🎯</div> <div class="rec-content" data-astro-cid-okxxo56y> <h4 data-astro-cid-okxxo56y>Enhanced Targeting Keywords</h4> <p data-astro-cid-okxxo56y>Add "enterprise AI" and "business automation" to targeting for higher CPM rates.</p> <span class="potential-revenue" data-astro-cid-okxxo56y>+$300/month potential</span> </div> </div> </div> </div> <!-- Revenue Forecast --> <div class="forecast-section" data-astro-cid-okxxo56y> <h3 class="section-title" data-astro-cid-okxxo56y>Revenue Forecast</h3> <div class="forecast-chart" data-astro-cid-okxxo56y> <div class="forecast-bars" data-astro-cid-okxxo56y> <div class="forecast-bar" data-astro-cid-okxxo56y> <div class="bar-fill current" style="height: 60%" data-astro-cid-okxxo56y></div> <span class="bar-label" data-astro-cid-okxxo56y>Current</span> <span class="bar-value" data-astro-cid-okxxo56y>$4.2K</span> </div> <div class="forecast-bar" data-astro-cid-okxxo56y> <div class="bar-fill projected" style="height: 85%" data-astro-cid-okxxo56y></div> <span class="bar-label" data-astro-cid-okxxo56y>Projected</span> <span class="bar-value" data-astro-cid-okxxo56y>$5.8K</span> </div> <div class="forecast-bar" data-astro-cid-okxxo56y> <div class="bar-fill target" style="height: 100%" data-astro-cid-okxxo56y></div> <span class="bar-label" data-astro-cid-okxxo56y>Target</span> <span class="bar-value" data-astro-cid-okxxo56y>$6.4K</span> </div> </div> <div class="forecast-insights" data-astro-cid-okxxo56y> <p data-astro-cid-okxxo56y>With current optimization trends, you're on track to reach <strong data-astro-cid-okxxo56y>91% of your revenue target</strong> this month.</p> <p data-astro-cid-okxxo56y>Implementing the above recommendations could push you to <strong data-astro-cid-okxxo56y>110% of target</strong>.</p> </div> </div> </div> </div>`);
}, "/workspaces/ai-news-site/src/components/RevenueAnalytics.astro", void 0);
var __freeze = Object.freeze;
var __defProp2 = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp2(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$AdConfig = createComponent(($$result, $$props, $$slots) => {
  const activeSlots = adManager.getActiveSlots();
  const revenueProjection = adManager.getRevenueProjection();
  const configAds = AdManager$1.getTotalEstimatedRevenue();
  const performanceData = {
    "premium-sidebar-1": { revenue: 850, ctr: 2.4, impressions: 35400 },
    "premium-sidebar-2": { revenue: 580, ctr: 2.1, impressions: 27600 },
    "article-banner-top": { revenue: 620, ctr: 1.8, impressions: 34500 },
    "article-content-middle": { revenue: 420, ctr: 1.5, impressions: 28e3 }
  };
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-jeeu5itk> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Content Placement Manager - AI Buzz Media</title><meta name="robots" content="noindex, nofollow">', '</head> <body data-astro-cid-jeeu5itk> <div class="admin-container" data-astro-cid-jeeu5itk> <header class="admin-header" data-astro-cid-jeeu5itk> <div class="header-content" data-astro-cid-jeeu5itk> <h1 data-astro-cid-jeeu5itk>🎯 Strategic Content Placement Manager</h1> <div class="header-stats" data-astro-cid-jeeu5itk> <div class="stat-item" data-astro-cid-jeeu5itk> <span class="stat-value" data-astro-cid-jeeu5itk>$', '</span> <span class="stat-label" data-astro-cid-jeeu5itk>Monthly Target</span> </div> <div class="stat-item" data-astro-cid-jeeu5itk> <span class="stat-value" data-astro-cid-jeeu5itk>', '</span> <span class="stat-label" data-astro-cid-jeeu5itk>Active Placements</span> </div> <div class="stat-item" data-astro-cid-jeeu5itk> <span class="stat-value" data-astro-cid-jeeu5itk>$', '</span> <span class="stat-label" data-astro-cid-jeeu5itk>Config Revenue</span> </div> </div> </div> </header> <section class="analytics-section" data-astro-cid-jeeu5itk> ', ' </section> <!-- Ad Creation Modal --> <div id="ad-modal" class="modal" data-astro-cid-jeeu5itk> <div class="modal-content" data-astro-cid-jeeu5itk> <div class="modal-header" data-astro-cid-jeeu5itk> <h2 id="modal-title" data-astro-cid-jeeu5itk>Create New Ad Placement</h2> <span class="close" data-astro-cid-jeeu5itk>&times;</span> </div> <form id="ad-form" data-astro-cid-jeeu5itk> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-title" data-astro-cid-jeeu5itk>Ad Title *</label> <input type="text" id="ad-title" name="title" required maxlength="60" placeholder="Enter ad title" data-astro-cid-jeeu5itk> </div> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-description" data-astro-cid-jeeu5itk>Description *</label> <textarea id="ad-description" name="description" required maxlength="150" rows="3" placeholder="Brief description of the offer" data-astro-cid-jeeu5itk></textarea> </div> <div class="form-row" data-astro-cid-jeeu5itk> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-cta" data-astro-cid-jeeu5itk>Call to Action *</label> <input type="text" id="ad-cta" name="cta" required maxlength="20" placeholder="e.g., Get Started" data-astro-cid-jeeu5itk> </div> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-url" data-astro-cid-jeeu5itk>CTA URL *</label> <input type="url" id="ad-url" name="url" required placeholder="https://example.com" data-astro-cid-jeeu5itk> </div> </div> <div class="form-row" data-astro-cid-jeeu5itk> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-type" data-astro-cid-jeeu5itk>Ad Type *</label> <select id="ad-type" name="type" required data-astro-cid-jeeu5itk> <option value="" data-astro-cid-jeeu5itk>Select ad type</option> <option value="sidebar" data-astro-cid-jeeu5itk>Sidebar (300x250)</option> <option value="leaderboard" data-astro-cid-jeeu5itk>Leaderboard (728x90)</option> <option value="hero" data-astro-cid-jeeu5itk>Hero Placement</option> <option value="inline" data-astro-cid-jeeu5itk>Inline Content</option> <option value="banner" data-astro-cid-jeeu5itk>Banner</option> </select> </div> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-placement" data-astro-cid-jeeu5itk>Placement Location *</label> <select id="ad-placement" name="placement" required data-astro-cid-jeeu5itk> <option value="" data-astro-cid-jeeu5itk>Select placement</option> <option value="homepage-sidebar-top" data-astro-cid-jeeu5itk>Homepage Sidebar - Top</option> <option value="homepage-sidebar-bottom" data-astro-cid-jeeu5itk>Homepage Sidebar - Bottom</option> <option value="category-sidebar-top" data-astro-cid-jeeu5itk>Category Sidebar - Top</option> <option value="article-top" data-astro-cid-jeeu5itk>Article - Top</option> <option value="article-middle" data-astro-cid-jeeu5itk>Article - Middle</option> <option value="homepage-leaderboard" data-astro-cid-jeeu5itk>Homepage Leaderboard</option> <option value="footer-banner" data-astro-cid-jeeu5itk>Footer Banner</option> </select> </div> </div> <div class="form-row" data-astro-cid-jeeu5itk> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-priority" data-astro-cid-jeeu5itk>Priority *</label> <select id="ad-priority" name="priority" required data-astro-cid-jeeu5itk> <option value="1" data-astro-cid-jeeu5itk>1 - Highest (Premium)</option> <option value="2" data-astro-cid-jeeu5itk>2 - High</option> <option value="3" data-astro-cid-jeeu5itk>3 - Medium</option> <option value="4" data-astro-cid-jeeu5itk>4 - Low</option> <option value="5" data-astro-cid-jeeu5itk>5 - Lowest</option> </select> </div> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-cpm" data-astro-cid-jeeu5itk>CPM Rate ($ per 1,000 views) *</label> <input type="number" id="ad-cpm" name="cpm" required min="1" max="100" step="0.01" placeholder="25.00" data-astro-cid-jeeu5itk> </div> </div> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-targeting" data-astro-cid-jeeu5itk>Targeting Categories</label> <div class="checkbox-group" data-astro-cid-jeeu5itk> <label class="checkbox-item" data-astro-cid-jeeu5itk> <input type="checkbox" name="targeting" value="ai-tools" data-astro-cid-jeeu5itk> AI Tools\n</label> <label class="checkbox-item" data-astro-cid-jeeu5itk> <input type="checkbox" name="targeting" value="entrepreneurs" data-astro-cid-jeeu5itk> Entrepreneurs\n</label> <label class="checkbox-item" data-astro-cid-jeeu5itk> <input type="checkbox" name="targeting" value="saas" data-astro-cid-jeeu5itk> SaaS\n</label> <label class="checkbox-item" data-astro-cid-jeeu5itk> <input type="checkbox" name="targeting" value="productivity" data-astro-cid-jeeu5itk> Productivity\n</label> <label class="checkbox-item" data-astro-cid-jeeu5itk> <input type="checkbox" name="targeting" value="business" data-astro-cid-jeeu5itk> Business\n</label> <label class="checkbox-item" data-astro-cid-jeeu5itk> <input type="checkbox" name="targeting" value="marketing" data-astro-cid-jeeu5itk> Marketing\n</label> </div> </div> <div class="form-group" data-astro-cid-jeeu5itk> <label for="ad-notes" data-astro-cid-jeeu5itk>Internal Notes</label> <textarea id="ad-notes" name="notes" rows="2" placeholder="Any internal notes about this ad" data-astro-cid-jeeu5itk></textarea> </div> <div class="form-actions" data-astro-cid-jeeu5itk> <button type="button" class="btn-secondary" id="cancel-ad" data-astro-cid-jeeu5itk>Cancel</button> <button type="submit" class="btn-primary" data-astro-cid-jeeu5itk>Create Ad</button> </div> </form> </div> </div> <section class="slot-management" data-astro-cid-jeeu5itk> <div class="section-header" data-astro-cid-jeeu5itk> <h2 data-astro-cid-jeeu5itk>Content Placement Configuration</h2> <button class="btn-primary" id="add-placement" data-astro-cid-jeeu5itk>+ Add New Placement</button> </div> <div class="slots-grid" data-astro-cid-jeeu5itk> ', ` </div> </section> <section class="optimization-tools" data-astro-cid-jeeu5itk> <div class="section-header" data-astro-cid-jeeu5itk> <h2 data-astro-cid-jeeu5itk>Revenue Optimization Tools</h2> </div> <div class="tools-grid" data-astro-cid-jeeu5itk> <div class="tool-card" data-astro-cid-jeeu5itk> <div class="tool-header" data-astro-cid-jeeu5itk> <h3 data-astro-cid-jeeu5itk>📈 CPM Optimizer</h3> <span class="tool-status active" data-astro-cid-jeeu5itk>Active</span> </div> <div class="tool-content" data-astro-cid-jeeu5itk> <p data-astro-cid-jeeu5itk>Automatically adjusts targeting and positioning to maximize CPM rates.</p> <div class="tool-metrics" data-astro-cid-jeeu5itk> <span class="improvement" data-astro-cid-jeeu5itk>+23% CPM increase</span> <span class="timeframe" data-astro-cid-jeeu5itk>Last 30 days</span> </div> <button class="tool-action" id="configure-cpm" data-astro-cid-jeeu5itk>Configure Settings</button> </div> </div> <div class="tool-card" data-astro-cid-jeeu5itk> <div class="tool-header" data-astro-cid-jeeu5itk> <h3 data-astro-cid-jeeu5itk>🛡️ Blocker Evasion</h3> <span class="tool-status active" data-astro-cid-jeeu5itk>Active</span> </div> <div class="tool-content" data-astro-cid-jeeu5itk> <p data-astro-cid-jeeu5itk>Dynamic class names and terminology to avoid detection.</p> <div class="tool-metrics" data-astro-cid-jeeu5itk> <span class="improvement" data-astro-cid-jeeu5itk>97% visibility rate</span> <span class="timeframe" data-astro-cid-jeeu5itk>Current</span> </div> <button class="tool-action" id="update-terms" data-astro-cid-jeeu5itk>Update Terms</button> </div> </div> </div> </section> <section class="quick-actions" data-astro-cid-jeeu5itk> <div class="section-header" data-astro-cid-jeeu5itk> <h2 data-astro-cid-jeeu5itk>Quick Actions</h2> </div> <div class="actions-grid" data-astro-cid-jeeu5itk> <button class="action-btn revenue-boost" id="revenue-boost" data-astro-cid-jeeu5itk> <span class="action-icon" data-astro-cid-jeeu5itk>🚀</span> <span class="action-text" data-astro-cid-jeeu5itk>Revenue Boost Mode</span> <span class="action-desc" data-astro-cid-jeeu5itk>Activate high-CPM placements</span> </button> <button class="action-btn emergency-disable" id="emergency-disable" data-astro-cid-jeeu5itk> <span class="action-icon" data-astro-cid-jeeu5itk>⏹️</span> <span class="action-text" data-astro-cid-jeeu5itk>Emergency Disable</span> <span class="action-desc" data-astro-cid-jeeu5itk>Disable all placements instantly</span> </button> </div> </section> </div> <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Modal functionality
      const modal = document.getElementById('ad-modal');
      const addBtn = document.getElementById('add-placement');
      const closeBtn = document.querySelector('.close');
      const cancelBtn = document.getElementById('cancel-ad');
      const adForm = document.getElementById('ad-form');
      const modalTitle = document.getElementById('modal-title');

      // Open modal
      addBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        modalTitle.textContent = 'Create New Ad Placement';
        adForm.reset();
      });

      // Close modal
      function closeModal() {
        modal.style.display = 'none';
      }

      closeBtn.addEventListener('click', closeModal);
      cancelBtn.addEventListener('click', closeModal);

      // Close modal when clicking outside
      window.addEventListener('click', function(event) {
        if (event.target === modal) {
          closeModal();
        }
      });

      // Handle form submission
      adForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(adForm);
        const adData = {
          title: formData.get('title'),
          description: formData.get('description'),
          cta: formData.get('cta'),
          url: formData.get('url'),
          type: formData.get('type'),
          placement: formData.get('placement'),
          priority: parseInt(formData.get('priority')),
          cpm: parseFloat(formData.get('cpm')),
          targeting: formData.getAll('targeting'),
          notes: formData.get('notes')
        };

        // Create the ad (this would integrate with your backend)
        createAd(adData);
        closeModal();
      });

      function createAd(adData) {
        // This is where you'd integrate with your actual ad system
        console.log('Creating new ad:', adData);
        
        // For now, just show a success message
        showNotification('Ad created successfully!', 'success');
        
        // In a real implementation, you'd:
        // 1. Send data to your backend
        // 2. Update the ad manager
        // 3. Refresh the page or update the UI
        // 4. Store in your database/CMS
      }

      // Slot management functionality
      const slotCards = document.querySelectorAll('.slot-card');
      slotCards.forEach(function(card) {
        const slotId = card.getAttribute('data-slot-id');
        
        const toggleBtn = card.querySelector('[data-action="toggle"]');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', function() {
            const isActive = toggleBtn.textContent && toggleBtn.textContent.trim() === '⏸️';
            if (toggleBtn.textContent) {
              toggleBtn.textContent = isActive ? '▶️' : '⏸️';
            }
            card.classList.toggle('inactive', isActive);
            
            // Update the ad status in your system
            if (isActive) {
              adManager.disableSlot(slotId);
            } else {
              adManager.enableSlot(slotId);
            }
            
            showNotification((isActive ? 'Disabled' : 'Enabled') + ' slot: ' + slotId, 'info');
          });
        }

        const editBtn = card.querySelector('[data-action="edit"]');
        if (editBtn) {
          editBtn.addEventListener('click', function() {
            // Open modal in edit mode
            modalTitle.textContent = 'Edit Ad Placement';
            // Populate form with existing data
            populateFormForEdit(slotId);
            modal.style.display = 'block';
          });
        }

        const optimizeBtn = card.querySelector('.btn-optimize');
        if (optimizeBtn) {
          optimizeBtn.addEventListener('click', function() {
            console.log('Optimizing slot: ' + slotId);
            const optimizedSlot = adManager.optimizeSlotPerformance(slotId);
            if (optimizedSlot) {
              showNotification('Optimization completed for slot: ' + slotId, 'success');
            } else {
              showNotification('No optimization needed for slot: ' + slotId, 'info');
            }
          });
        }

        const deleteBtn = card.querySelector('.btn-delete');
        if (deleteBtn) {
          deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this ad placement? This action cannot be undone.')) {
              adManager.disableSlot(slotId);
              card.remove();
              showNotification('Ad placement deleted', 'warning');
            }
          });
        }
      });

      // Quick actions
      const revenueBoostBtn = document.getElementById('revenue-boost');
      if (revenueBoostBtn) {
        revenueBoostBtn.addEventListener('click', function() {
          console.log('Activating revenue boost mode');
          // Activate all premium placements
          const premiumSlots = adManager.getHighPerformingSlots();
          premiumSlots.forEach(slot => {
            slot.isActive = true;
          });
          showNotification('Revenue boost mode activated! ' + premiumSlots.length + ' premium slots enabled', 'success');
        });
      }

      const emergencyDisableBtn = document.getElementById('emergency-disable');
      if (emergencyDisableBtn) {
        emergencyDisableBtn.addEventListener('click', function() {
          if (confirm('Are you sure you want to disable all placements? This will stop all advertising immediately.')) {
            console.log('Disabling all placements');
            const allSlots = adManager.getActiveSlots();
            allSlots.forEach(slot => {
              adManager.disableSlot(slot.id);
            });
            showNotification('All placements disabled', 'warning');
            // Refresh the page to show updated status
            setTimeout(() => location.reload(), 1000);
          }
        });
      }

      // Tool actions
      const configureCpmBtn = document.getElementById('configure-cpm');
      if (configureCpmBtn) {
        configureCpmBtn.addEventListener('click', function() {
          showNotification('CPM optimization settings opened', 'info');
          // This would open a configuration panel
        });
      }

      const updateTermsBtn = document.getElementById('update-terms');
      if (updateTermsBtn) {
        updateTermsBtn.addEventListener('click', function() {
          showNotification('Updating ad-blocker evasion terms', 'info');
          // This would update the terminology system
        });
      }

      function populateFormForEdit(slotId) {
        // This would populate the form with existing ad data
        // For now, just show a placeholder
        showNotification('Edit mode - populate with existing data', 'info');
      }

      function showNotification(message, type) {
        type = type || 'info';
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(function() { notification.classList.add('show'); }, 100);
        setTimeout(function() {
          notification.classList.remove('show');
          setTimeout(function() { 
            if (notification.parentNode) {
              document.body.removeChild(notification); 
            }
          }, 300);
        }, 3000);
      }
    });
  <\/script>  </body> </html>`])), renderHead(), revenueProjection.total.toLocaleString(), activeSlots.length, configAds.toLocaleString(), renderComponent($$result, "RevenueAnalytics", $$RevenueAnalytics, { "showDetailedMetrics": true, "data-astro-cid-jeeu5itk": true }), activeSlots.map((slot) => {
    const performance = performanceData[slot.id] || {};
    const revenue = performance.revenue || 0;
    const ctr = performance.ctr || 0;
    const impressions = performance.impressions || 0;
    return renderTemplate`<div class="slot-card"${addAttribute(slot.id, "data-slot-id")} data-astro-cid-jeeu5itk> <div class="slot-header" data-astro-cid-jeeu5itk> <div class="slot-info" data-astro-cid-jeeu5itk> <h3 class="slot-name" data-astro-cid-jeeu5itk>${slot.name}</h3> <span${addAttribute(`slot-priority priority-${slot.priority}`, "class")} data-astro-cid-jeeu5itk>${slot.priority.toUpperCase()}</span> </div> <div class="slot-controls" data-astro-cid-jeeu5itk> <button class="btn-edit" data-action="edit"${addAttribute(slot.id, "data-slot-id")} data-astro-cid-jeeu5itk>✏️</button> <button class="btn-toggle" data-action="toggle"${addAttribute(slot.id, "data-slot-id")} data-astro-cid-jeeu5itk> ${slot.isActive ? "⏸️" : "▶️"} </button> </div> </div> <div class="slot-metrics" data-astro-cid-jeeu5itk> <div class="metric" data-astro-cid-jeeu5itk> <span class="metric-value" data-astro-cid-jeeu5itk>$${revenue}</span> <span class="metric-label" data-astro-cid-jeeu5itk>Revenue</span> </div> <div class="metric" data-astro-cid-jeeu5itk> <span class="metric-value" data-astro-cid-jeeu5itk>${ctr}%</span> <span class="metric-label" data-astro-cid-jeeu5itk>CTR</span> </div> <div class="metric" data-astro-cid-jeeu5itk> <span class="metric-value" data-astro-cid-jeeu5itk>${impressions.toLocaleString()}</span> <span class="metric-label" data-astro-cid-jeeu5itk>Impressions</span> </div> </div> <div class="slot-details" data-astro-cid-jeeu5itk> <div class="detail-row" data-astro-cid-jeeu5itk> <span class="detail-label" data-astro-cid-jeeu5itk>Size:</span> <span class="detail-value" data-astro-cid-jeeu5itk>${slot.size}</span> </div> <div class="detail-row" data-astro-cid-jeeu5itk> <span class="detail-label" data-astro-cid-jeeu5itk>Position:</span> <span class="detail-value" data-astro-cid-jeeu5itk>${slot.position}</span> </div> <div class="detail-row" data-astro-cid-jeeu5itk> <span class="detail-label" data-astro-cid-jeeu5itk>CPM Range:</span> <span class="detail-value" data-astro-cid-jeeu5itk>${slot.cpmRange}</span> </div> </div> <div class="slot-targeting" data-astro-cid-jeeu5itk> <div class="targeting-header" data-astro-cid-jeeu5itk> <div class="targeting-title" data-astro-cid-jeeu5itk> <span class="targeting-icon" data-astro-cid-jeeu5itk>🎯</span> <span class="targeting-label" data-astro-cid-jeeu5itk>Targeting</span> </div> <span class="targeting-count" data-astro-cid-jeeu5itk>${slot.targeting && slot.targeting.length > 0 ? slot.targeting.length : 0} categories</span> </div> <div class="targeting-tags" data-astro-cid-jeeu5itk> ${slot.targeting && slot.targeting.length > 0 ? slot.targeting.map((tag, index) => renderTemplate`<span class="targeting-tag"${addAttribute(`Targets: ${tag.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`, "title")}${addAttribute(tag, "data-tag")} data-astro-cid-jeeu5itk> ${tag.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} ${index === 0 && slot.targeting.length > 3 && renderTemplate`<span class="tag-count" data-astro-cid-jeeu5itk>+${slot.targeting.length - 1}</span>`} </span>`).slice(0, 3) : renderTemplate`<span class="targeting-tag no-targeting" data-astro-cid-jeeu5itk>No targeting set</span>`} ${slot.targeting && slot.targeting.length > 3 && renderTemplate`<span class="targeting-tag more-tags"${addAttribute(`And ${slot.targeting.length - 3} more categories`, "title")} data-astro-cid-jeeu5itk>
+${slot.targeting.length - 3} more
</span>`} </div> </div> <div class="slot-actions" data-astro-cid-jeeu5itk> <button class="btn-optimize"${addAttribute(slot.id, "data-slot-id")} data-astro-cid-jeeu5itk>🚀 Optimize</button> <button class="btn-test"${addAttribute(slot.id, "data-slot-id")} data-astro-cid-jeeu5itk>🧪 A/B Test</button> <button class="btn-delete"${addAttribute(slot.id, "data-slot-id")} data-astro-cid-jeeu5itk>🗑️ Delete</button> </div> </div>`;
  }));
}, "/workspaces/ai-news-site/src/pages/admin/ad-config.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/admin/ad-config.astro";
const $$url = "/admin/ad-config";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$AdConfig,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
